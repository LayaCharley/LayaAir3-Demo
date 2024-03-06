import { Stat } from "../utils/Stat";
import { AnimatorControllerLayer2D } from "./AnimatorControllerLayer2D";
import { Component } from "./Component";
import { ClassUtils } from "../utils/ClassUtils";
import { AniParmType } from "./AnimatorControllerParse";
import { AnimatorUpdateMode } from "./AnimatorUpdateMode";
export class Animator2D extends Component {
    constructor() {
        super();
        this._speed = 1;
        this._updateMode = AnimatorUpdateMode.Normal;
        this._lowUpdateDelty = 20;
        this._isPlaying = true;
        this._controllerLayers = [];
        this._parameters = {};
    }
    set controller(val) {
        this._controller = val;
        if (val) {
            val.updateTo(this);
        }
    }
    get controller() {
        return this._controller;
    }
    set parameters(val) {
        this._parameters = val;
    }
    get parameters() {
        return this._parameters;
    }
    set speed(num) {
        this._speed = num;
    }
    get speed() {
        return this._speed;
    }
    get isPlaying() {
        return this._isPlaying;
    }
    _updateStateFinish(animatorState, playState) {
        if (playState._finish) {
            animatorState._eventExit();
        }
    }
    _setClipDatasToNode(stateInfo, additive, weight, isFirstLayer, controllerLayer = null) {
        var realtimeDatas = stateInfo._realtimeDatas;
        var nodes = stateInfo._clip._nodes;
        for (var i = 0, n = nodes.count; i < n; i++) {
            if (null == realtimeDatas[i])
                continue;
            var node = nodes.getNodeByIndex(i);
            var o = this.getOwner(node);
            o && this._applyFloat(o, additive, weight, isFirstLayer, realtimeDatas[i]);
        }
    }
    _applyFloat(o, additive, weight, isFirstLayer, data) {
        var pro = o.pro;
        if (pro && pro.ower) {
            if (additive && "number" == typeof data) {
                pro.ower[pro.key] = pro.defVal + weight * data;
            }
            else if ("number" == typeof data) {
                pro.ower[pro.key] = weight * data;
            }
            else {
                pro.ower[pro.key] = data;
            }
        }
    }
    getOwner(node) {
        var ret;
        if (this._ownerMap) {
            ret = this._ownerMap.get(node);
            if (ret) {
                return ret;
            }
        }
        var property = this.owner;
        for (var j = 0, m = node.ownerPathCount; j < m; j++) {
            var ownPat = node.getOwnerPathByIndex(j);
            if ("" == ownPat) {
                continue;
            }
            else {
                property = property.getChildByName(ownPat);
                if (!property)
                    break;
            }
        }
        ret = { ower: property };
        if (property) {
            var pobj = property;
            var propertyCount = node.propertyCount;
            if (1 == propertyCount) {
                var pname = node.getPropertyByIndex(0);
                ret.pro = { ower: property, key: pname, defVal: property[pname] };
            }
            else {
                for (var i = 0; i < propertyCount; i++) {
                    var pname = node.getPropertyByIndex(i);
                    if (i == propertyCount - 1 || null == pobj) {
                        ret.pro = { ower: pobj, key: pname, defVal: pobj ? pobj[pname] : null };
                        break;
                    }
                    if (null == pobj[pname] && property == pobj) {
                        pobj = null;
                        var classObj = ClassUtils.getClass(pname);
                        if (classObj) {
                            pobj = property.getComponent(classObj);
                        }
                    }
                    else {
                        pobj = pobj[pname];
                    }
                }
            }
        }
        if (null == this._ownerMap) {
            this._ownerMap = new Map();
        }
        this._ownerMap.set(node, ret);
        return ret;
    }
    _updateClipDatas(animatorState, addtive, playStateInfo) {
        var clip = animatorState._clip;
        var clipDuration = clip._duration;
        var curPlayTime = animatorState.clipStart * clipDuration + playStateInfo._normalizedPlayTime * playStateInfo._duration;
        var currentFrameIndices = animatorState._currentFrameIndices;
        let frontPlay = true;
        clip._evaluateClipDatasRealTime(curPlayTime, currentFrameIndices, addtive, frontPlay, animatorState._realtimeDatas);
    }
    _updatePlayer(animatorState, playState, elapsedTime, loop, layerIndex) {
        let isReplay = false;
        var clipDuration = animatorState._clip._duration * (animatorState.clipEnd - animatorState.clipStart);
        var lastElapsedTime = playState._elapsedTime;
        let pAllTime = playState._playAllTime;
        playState._playAllTime += Math.abs(elapsedTime);
        elapsedTime = lastElapsedTime + elapsedTime;
        playState._lastElapsedTime = lastElapsedTime;
        playState._elapsedTime = elapsedTime;
        var normalizedTime = elapsedTime / clipDuration;
        let scale = 1;
        if (animatorState.yoyo) {
            scale = 2;
        }
        let pTime = playState._playAllTime / (clipDuration * scale);
        if (Math.floor(pAllTime / (clipDuration * scale)) < Math.floor(pTime)) {
            isReplay = true;
        }
        var playTime = normalizedTime % 1.0;
        let normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
        playState._normalizedPlayTime = normalizedPlayTime;
        playState._duration = clipDuration;
        if (1 != scale) {
            normalizedTime = playState._playAllTime / (clipDuration * scale);
            playTime = normalizedTime % 1.0;
            normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
            if (animatorState.yoyo) {
                if (0.5 > normalizedPlayTime) {
                    if (!playState._frontPlay) {
                        if (0 > animatorState.speed) {
                            playState._elapsedTime = animatorState.clipEnd * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipEnd;
                        }
                        else {
                            playState._elapsedTime = animatorState.clipStart * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipStart;
                        }
                        playState._frontPlay = true;
                    }
                }
                else {
                    if (playState._frontPlay) {
                        playState._frontPlay = false;
                        if (0 > animatorState.speed) {
                            playState._elapsedTime = animatorState.clipStart * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipStart;
                        }
                        else {
                            playState._elapsedTime = animatorState.clipEnd * pAllTime;
                            playState._normalizedPlayTime = animatorState.clipEnd;
                        }
                    }
                }
            }
        }
        animatorState._eventStateUpdate(normalizedPlayTime);
        let ret = this._applyTransition(layerIndex, animatorState._eventtransition(normalizedPlayTime, this.parameters, isReplay));
        if (!ret && isReplay) {
            let absTime = playState._playAllTime / (clipDuration * scale);
            if (0 < loop && loop <= absTime) {
                playState._finish = true;
                if (0 > animatorState.speed) {
                    if (animatorState.yoyo) {
                        playState._elapsedTime = animatorState.clipEnd * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipEnd;
                    }
                    else {
                        playState._elapsedTime = animatorState.clipStart * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipStart;
                    }
                }
                else {
                    if (animatorState.yoyo) {
                        playState._elapsedTime = animatorState.clipStart * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipStart;
                    }
                    else {
                        playState._elapsedTime = animatorState.clipEnd * pAllTime;
                        playState._normalizedPlayTime = animatorState.clipEnd;
                    }
                }
                return;
            }
        }
    }
    _updateEventScript(stateInfo, playStateInfo) {
        let clip = stateInfo._clip;
        let events = clip._animationEvents;
        if (!events || 0 == events.length)
            return;
        let clipDuration = clip._duration;
        let time = playStateInfo._normalizedPlayTime * clipDuration;
        let frontPlay = playStateInfo._frontPlay;
        let parentPlayTime = playStateInfo._parentPlayTime;
        if (null == parentPlayTime) {
            if (frontPlay) {
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipStart;
            }
            else {
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipEnd;
            }
        }
        if (frontPlay) {
            if (time < parentPlayTime) {
                this._eventScript(events, parentPlayTime, clipDuration * playStateInfo.animatorState.clipEnd, frontPlay);
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipStart;
            }
        }
        else {
            if (time > parentPlayTime) {
                this._eventScript(events, parentPlayTime, clipDuration * playStateInfo.animatorState.clipStart, frontPlay);
                parentPlayTime = clipDuration * playStateInfo.animatorState.clipEnd;
            }
        }
        this._eventScript(events, parentPlayTime, time, frontPlay);
        playStateInfo._parentPlayTime = time;
    }
    _eventScript(events, parentPlayTime, currPlayTime, frontPlay) {
        let scripts = this.owner.components;
        if (frontPlay) {
            for (let i = 0, len = events.length; i < len; i++) {
                let e = events[i];
                if (e.time > parentPlayTime && e.time <= currPlayTime) {
                    for (let j = 0, m = scripts.length; j < m; j++) {
                        let script = scripts[j];
                        if (script._isScript()) {
                            let fun = script[e.eventName];
                            (fun) && (fun.apply(script, e.params));
                        }
                    }
                }
                else if (e.time > currPlayTime) {
                    break;
                }
            }
        }
        else {
            for (let i = events.length - 1; i >= 0; i--) {
                let e = events[i];
                if (e.time < parentPlayTime && e.time >= currPlayTime) {
                    for (let j = 0, m = scripts.length; j < m; j++) {
                        let script = scripts[j];
                        if (script._isScript()) {
                            let fun = script[e.eventName];
                            (fun) && (fun.apply(script, e.params));
                        }
                    }
                }
                else if (e.time < currPlayTime) {
                    break;
                }
            }
        }
    }
    _applyTransition(layerindex, transition) {
        if (!transition)
            return false;
        return this.crossFade(transition.destState.name, transition.transduration, layerindex, transition.transstartoffset);
    }
    _applyUpdateMode(delta) {
        let ret;
        switch (this._updateMode) {
            case AnimatorUpdateMode.Normal:
                ret = delta;
                break;
            case AnimatorUpdateMode.LowFrame:
                ret = (Stat.loopCount % this._lowUpdateDelty == 0) ? delta * this._lowUpdateDelty : 0;
                break;
            case AnimatorUpdateMode.UnScaleTime:
                ret = 0;
                break;
        }
        return ret;
    }
    play(name, layerIndex = 0, normalizedTime = Number.NEGATIVE_INFINITY) {
        if (this._checkEnterIndex) {
            let i = this._checkEnterIndex.indexOf(layerIndex);
            if (0 <= i) {
                this._checkEnterIndex.splice(i, 1);
            }
        }
        this._isPlaying = true;
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var defaultState = controllerLayer.defaultState;
            if (!name && !defaultState)
                throw new Error("Animator:must have default clip value,please set clip property.");
            var playStateInfo = controllerLayer._playStateInfo;
            var curPlayState = playStateInfo._currentState;
            var animatorState = name ? controllerLayer.getStateByName(name) : defaultState;
            if (!animatorState._clip)
                return;
            var clipDuration = animatorState._clip._duration;
            var calclipduration = animatorState._clip._duration * (animatorState.clipEnd - animatorState.clipStart);
            if (curPlayState !== animatorState) {
                if (normalizedTime !== Number.NEGATIVE_INFINITY)
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                else
                    playStateInfo._resetPlayState(0.0, calclipduration);
                (curPlayState !== null && curPlayState !== animatorState);
                controllerLayer._playType = 0;
                playStateInfo._currentState = animatorState;
            }
            else {
                if (normalizedTime !== Number.NEGATIVE_INFINITY) {
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                    controllerLayer._playType = 0;
                }
            }
            animatorState._eventStart(this, layerIndex);
        }
    }
    stop() {
        this._isPlaying = false;
    }
    onUpdate() {
        if (!this._isPlaying)
            return;
        if (this._checkEnterIndex) {
            for (let i = this._checkEnterIndex.length - 1; i >= 0; i--) {
                let index = this._checkEnterIndex[i];
                let enterTransition = this._controllerLayers[index]._enterTransition;
                if (enterTransition.check(0, this.parameters, true)) {
                    var defaultClip = this.getDefaultState(index);
                    this.play(null, index, defaultClip.cycleOffset);
                }
            }
        }
        var delta = this.owner.timer._delta / 1000.0;
        delta = this._applyUpdateMode(delta);
        if (0 == this.speed || 0 == delta)
            return;
        var needRender = true;
        for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
            var controllerLayer = this._controllerLayers[i];
            if (!controllerLayer.enable)
                continue;
            var playStateInfo = controllerLayer._playStateInfo;
            var addtive = controllerLayer.blendingMode != AnimatorControllerLayer2D.BLENDINGMODE_OVERRIDE;
            switch (controllerLayer._playType) {
                case 0:
                    var animatorState = playStateInfo._currentState;
                    var speed = this._speed * animatorState.speed;
                    var finish = playStateInfo._finish;
                    var loop = animatorState.loop;
                    if (-1 >= loop) {
                        var clip = animatorState._clip;
                        if (clip.islooping) {
                            loop = 0;
                        }
                        else {
                            loop = 1;
                        }
                    }
                    let dir = 1;
                    if (!playStateInfo._frontPlay) {
                        dir = -1;
                    }
                    finish || this._updatePlayer(animatorState, playStateInfo, delta * speed * dir, loop, i);
                    playStateInfo = controllerLayer._playStateInfo;
                    animatorState = playStateInfo._currentState;
                    if (needRender) {
                        this._updateClipDatas(animatorState, addtive, playStateInfo);
                        if (!finish) {
                            this._setClipDatasToNode(animatorState, addtive, controllerLayer.defaultWeight, i == 0, controllerLayer);
                            this._updateEventScript(animatorState, playStateInfo);
                        }
                    }
                    finish || this._updateStateFinish(animatorState, playStateInfo);
                    break;
            }
        }
    }
    addControllerLayer(controllderLayer) {
        this._controllerLayers.push(controllderLayer);
    }
    crossFade(name, transitionDuration, layerIndex = 0, normalizedTime = Number.NEGATIVE_INFINITY) {
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var destAnimatorState = controllerLayer.getStateByName(name);
            if (destAnimatorState) {
                this.play(name, layerIndex, normalizedTime);
                return true;
            }
            else {
                console.warn("Invalid layerIndex " + layerIndex + ".");
            }
        }
        return false;
    }
    onAfterDeserialize() {
        let arr = this.controllerLayers;
        if (!arr || null != this.controller)
            return;
        delete this.controllerLayers;
        this._controllerLayers.length = 0;
        for (let layer of arr) {
            this.addControllerLayer(layer);
        }
    }
    onEnable() {
        if (this._checkEnterIndex)
            this._checkEnterIndex.length = 0;
        else
            this._checkEnterIndex = [];
        if (this._isPlaying) {
            for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
                if (this._controllerLayers[i].playOnWake) {
                    var defaultClip = this.getDefaultState(i);
                    if (defaultClip) {
                        let enterTransition = this._controllerLayers[i]._enterTransition;
                        if (enterTransition) {
                            this._isPlaying = true;
                            if (enterTransition.check(0, this.parameters, true)) {
                                this.play(null, i, defaultClip.cycleOffset);
                            }
                            else {
                                this._checkEnterIndex.push(i);
                            }
                        }
                        else {
                            this.play(null, i, defaultClip.cycleOffset);
                        }
                    }
                }
            }
        }
    }
    getDefaultState(layerIndex = 0) {
        var controllerLayer = this._controllerLayers[layerIndex];
        return controllerLayer.defaultState;
    }
    setParamsTrigger(name) {
        this._parameters[name] = { name: name, type: AniParmType.Trigger, value: true };
    }
    setParamsNumber(name, value) {
        this._parameters[name] = { name: name, type: AniParmType.Float, value: value };
    }
    setParamsBool(name, value) {
        this._parameters[name] = { name: name, type: AniParmType.Float, value: value };
    }
    getParamsvalue(name) {
        let parm = this._parameters[name];
        if (parm) {
            return parm.value;
        }
        return null;
    }
    onDestroy() {
        for (var i = 0, n = this._controllerLayers.length; i < n; i++)
            this._controllerLayers[i].destroy();
        this._controllerLayers.length = 0;
        this._isPlaying = false;
        this._parameters = null;
    }
}

//# sourceMappingURL=Animator2D.js.map
