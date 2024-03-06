import { Component } from "../../../components/Component";
import { NodeFlags } from "../../../Const";
import { Loader } from "../../../net/Loader";
import { Stat } from "../../../utils/Stat";
import { Material } from "../../core/material/Material";
import { Utils3D } from "../../utils/Utils3D";
import { AnimatorControllerLayer } from "./AnimatorControllerLayer";
import { AnimatorResource } from "./AnimatorResource";
import { AnimatorState } from "./AnimatorState";
import { AvatarMask } from "./AvatarMask";
import { KeyframeNodeOwner, KeyFrameValueType } from "./KeyframeNodeOwner";
import { Color } from "../../../maths/Color";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { AnimatorUpdateMode } from "../../../components/AnimatorUpdateMode";
import { AnimatorStateCondition } from "../../../components/AnimatorStateCondition";
export class Animator extends Component {
    constructor() {
        super();
        this._keyframeNodeOwners = [];
        this._updateMode = AnimatorUpdateMode.Normal;
        this._lowUpdateDelty = 20;
        this._animatorParams = {};
        this._linkAvatarSpritesData = {};
        this._linkAvatarSprites = [];
        this._renderableSprites = [];
        this.cullingMode = Animator.CULLINGMODE_CULLCOMPLETELY;
        this._finishSleep = false;
        this._controllerLayers = [];
        this._speed = 1.0;
        this._keyframeNodeOwnerMap = {};
        this._updateMark = 0;
    }
    set controller(val) {
        this._controller = val;
        if (this._controller) {
            this._controller.updateTo(this);
        }
    }
    get controller() {
        return this._controller;
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    set updateMode(value) {
        this._updateMode = value;
    }
    set lowUpdateDelty(value) {
        this._lowUpdateDelty = value;
    }
    get controllerLayerCount() {
        return this._controllerLayers.length;
    }
    set animatorParams(values) {
        this._animatorParams = values;
    }
    get animatorParams() {
        return this._animatorParams;
    }
    set sleep(value) {
        this._finishSleep = value;
    }
    get sleep() {
        return this._finishSleep;
    }
    _addKeyframeNodeOwner(clipOwners, node, propertyOwner) {
        var nodeIndex = node._indexInList;
        var fullPath = node.fullPath;
        var keyframeNodeOwner = this._keyframeNodeOwnerMap[fullPath];
        let mat = false;
        if (keyframeNodeOwner) {
            keyframeNodeOwner.referenceCount++;
            clipOwners[nodeIndex] = keyframeNodeOwner;
        }
        else {
            var property = propertyOwner;
            for (var i = 0, n = node.propertyCount; i < n; i++) {
                property = property[node.getPropertyByIndex(i)];
                if (property instanceof Material) {
                    mat = true;
                }
                if (!property)
                    break;
            }
            keyframeNodeOwner = this._keyframeNodeOwnerMap[fullPath] = new KeyframeNodeOwner();
            keyframeNodeOwner.isMaterial = mat;
            keyframeNodeOwner.fullPath = fullPath;
            keyframeNodeOwner.indexInList = this._keyframeNodeOwners.length;
            keyframeNodeOwner.referenceCount = 1;
            keyframeNodeOwner.propertyOwner = propertyOwner;
            keyframeNodeOwner.nodePath = node.nodePath;
            keyframeNodeOwner.callbackFunData = node.callbackFunData;
            keyframeNodeOwner.callParams = node.callParams;
            keyframeNodeOwner.getCallbackNode();
            var propertyCount = node.propertyCount;
            var propertys = [];
            for (i = 0; i < propertyCount; i++)
                propertys[i] = node.getPropertyByIndex(i);
            keyframeNodeOwner.property = propertys;
            keyframeNodeOwner.type = node.type;
            if (property) {
                if (node.type === 0) {
                    keyframeNodeOwner.defaultValue = property;
                }
                else {
                    var defaultValue = new property.constructor();
                    property.cloneTo(defaultValue);
                    keyframeNodeOwner.defaultValue = defaultValue;
                    keyframeNodeOwner.value = new property.constructor();
                    keyframeNodeOwner.crossFixedValue = new property.constructor();
                }
            }
            this._keyframeNodeOwners.push(keyframeNodeOwner);
            clipOwners[nodeIndex] = keyframeNodeOwner;
        }
    }
    _removeKeyframeNodeOwner(nodeOwners, node) {
        var fullPath = node.fullPath;
        var keyframeNodeOwner = this._keyframeNodeOwnerMap[fullPath];
        if (keyframeNodeOwner) {
            keyframeNodeOwner.referenceCount--;
            if (keyframeNodeOwner.referenceCount === 0) {
                delete this._keyframeNodeOwnerMap[fullPath];
                this._keyframeNodeOwners.splice(this._keyframeNodeOwners.indexOf(keyframeNodeOwner), 1);
            }
            nodeOwners[node._indexInList] = null;
        }
    }
    _getOwnersByClip(clipStateInfo) {
        if (!clipStateInfo._clip)
            return;
        var frameNodes = clipStateInfo._clip._nodes;
        var frameNodesCount = frameNodes.count;
        var nodeOwners = clipStateInfo._nodeOwners;
        nodeOwners.length = frameNodesCount;
        for (var i = 0; i < frameNodesCount; i++) {
            var node = frameNodes.getNodeByIndex(i);
            var property = this.owner;
            for (var j = 0, m = node.ownerPathCount; j < m; j++) {
                var ownPat = node.getOwnerPathByIndex(j);
                if (ownPat === "") {
                    break;
                }
                else {
                    property = property.getChildByName(ownPat);
                    if (!property)
                        break;
                }
            }
            if (property) {
                var propertyOwner = node.propertyOwner;
                const oriProperty = property;
                (propertyOwner) && (property = property[propertyOwner]);
                if (!property) {
                    property = AnimatorResource.getAnimatorResource(oriProperty, propertyOwner);
                }
                property && this._addKeyframeNodeOwner(nodeOwners, node, property);
            }
        }
    }
    _updatePlayer(animatorState, playState, elapsedTime, islooping, layerIndex) {
        var clipDuration = animatorState._clip._duration * (animatorState.clipEnd - animatorState.clipStart);
        var lastElapsedTime = playState._elapsedTime;
        var elapsedPlaybackTime = lastElapsedTime + elapsedTime;
        playState._lastElapsedTime = lastElapsedTime;
        playState._elapsedTime = elapsedPlaybackTime;
        var normalizedTime = elapsedPlaybackTime / clipDuration;
        playState._normalizedTime = normalizedTime;
        var playTime = normalizedTime % 1.0;
        playState._normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
        playState._duration = clipDuration;
        if ((!islooping && elapsedPlaybackTime >= clipDuration)) {
            playState._finish = true;
            playState._elapsedTime = clipDuration;
            playState._normalizedPlayTime = 1.0;
        }
        (!playState._finish) && animatorState._eventStateUpdate(playState._normalizedPlayTime);
        this._applyTransition(animatorState, layerIndex, animatorState._eventtransition(playState._normalizedPlayTime, this.animatorParams));
        return;
    }
    _applyTransition(state, layerindex, transition) {
        if (!transition || transition == state.curTransition)
            return;
        state.curTransition = transition;
        this.crossFade(transition.destState.name, transition.transduration, layerindex, transition.transstartoffset);
    }
    _updateStateFinish(animatorState, playState) {
        if (playState._finish) {
            animatorState._eventExit();
        }
    }
    _eventScript(events, eventIndex, endTime, front, startTime = 0) {
        let scripts = this.owner.components;
        if (front) {
            endTime += startTime;
            for (let n = events.length; eventIndex < n; eventIndex++) {
                let event = events[eventIndex];
                if (event.time <= endTime) {
                    if (event.time >= startTime) {
                        for (let j = 0, m = scripts.length; j < m; j++) {
                            let script = scripts[j];
                            if (script._isScript()) {
                                let fun = script[event.eventName];
                                (fun) && (fun.apply(script, event.params));
                            }
                        }
                    }
                }
                else {
                    break;
                }
            }
        }
        else {
            for (; eventIndex >= 0; eventIndex--) {
                let event = events[eventIndex];
                if (event.time >= endTime) {
                    for (let j = 0, m = scripts.length; j < m; j++) {
                        let script = scripts[j];
                        if (script._isScript()) {
                            let fun = script[event.eventName];
                            (fun) && (fun.apply(script, event.params));
                        }
                    }
                }
                else {
                    break;
                }
            }
        }
        return eventIndex;
    }
    _updateEventScript(stateInfo, playStateInfo) {
        if (!this.owner._getBit(NodeFlags.HAS_SCRIPT))
            return;
        let clip = stateInfo._clip;
        let events = clip._animationEvents;
        let clipDuration = clip._duration;
        let elapsedTime = playStateInfo._elapsedTime;
        let time = elapsedTime % clipDuration;
        let loopCount = Math.abs(Math.floor(elapsedTime / clipDuration) - Math.floor(playStateInfo._lastElapsedTime / clipDuration));
        let frontPlay = playStateInfo._elapsedTime >= playStateInfo._lastElapsedTime;
        if (playStateInfo._lastIsFront !== frontPlay) {
            if (frontPlay)
                playStateInfo._playEventIndex++;
            else
                playStateInfo._playEventIndex--;
            playStateInfo._lastIsFront = frontPlay;
        }
        let preEventIndex = playStateInfo._playEventIndex;
        if (frontPlay) {
            let startTime = 0;
            if (playStateInfo.animatorState && 0 != playStateInfo.animatorState.clipStart) {
                startTime = playStateInfo.animatorState._clip._duration * playStateInfo.animatorState.clipStart;
            }
            let newEventIndex = this._eventScript(events, playStateInfo._playEventIndex, loopCount > 0 ? clipDuration : time, true, startTime);
            (preEventIndex === playStateInfo._playEventIndex) && (playStateInfo._playEventIndex = newEventIndex);
            for (let i = 0, n = loopCount - 1; i < n; i++)
                this._eventScript(events, 0, clipDuration, true, startTime);
            (loopCount > 0 && time > 0) && (playStateInfo._playEventIndex = this._eventScript(events, 0, time, true, startTime));
        }
        else {
            let newEventIndex = this._eventScript(events, playStateInfo._playEventIndex, loopCount > 0 ? 0 : time, false);
            (preEventIndex === playStateInfo._playEventIndex) && (playStateInfo._playEventIndex = newEventIndex);
            let eventIndex = events.length - 1;
            for (let i = 0, n = loopCount - 1; i < n; i++)
                this._eventScript(events, eventIndex, 0, false);
            (loopCount > 0 && time > 0) && (playStateInfo._playEventIndex = this._eventScript(events, eventIndex, time, false));
        }
    }
    _updateClipDatas(animatorState, addtive, playStateInfo, animatorMask = null) {
        var clip = animatorState._clip;
        var clipDuration = clip._duration;
        var curPlayTime = animatorState.clipStart * clipDuration + playStateInfo._normalizedPlayTime * playStateInfo._duration;
        var currentFrameIndices = animatorState._currentFrameIndices;
        var frontPlay = playStateInfo._elapsedTime > playStateInfo._lastElapsedTime;
        clip._evaluateClipDatasRealTime(clip._nodes, curPlayTime, currentFrameIndices, addtive, frontPlay, animatorState._realtimeDatas, animatorMask);
    }
    _applyFloat(defaultValue, nodeOwner, additive, weight, isFirstLayer, data) {
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                defaultValue += weight * data;
            }
            else {
                var oriValue = defaultValue;
                defaultValue = oriValue + weight * (data - oriValue);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive)
                    defaultValue = nodeOwner.defaultValue + data;
                else
                    defaultValue = data;
            }
            else {
                if (additive) {
                    defaultValue = nodeOwner.defaultValue + weight * (data);
                }
                else {
                    var defValue = nodeOwner.defaultValue;
                    defaultValue = defValue + weight * (data - defValue);
                }
            }
        }
        return defaultValue;
    }
    _applyVec2(defaultValue, nodeOwner, additive, weight, isFirstLayer, data) {
        if (!defaultValue)
            return null;
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                defaultValue.x += weight * data.x;
                defaultValue.y += weight * data.y;
            }
            else {
                var oriValue = defaultValue;
                defaultValue.x = oriValue.x + weight * (data.x - oriValue.x);
                defaultValue.y = oriValue.y + weight * (data.y - oriValue.y);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + data.x;
                    defaultValue.y = nodeOwner.defaultValue.y + data.y;
                }
                else
                    data.cloneTo(defaultValue);
            }
            else {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + weight * (data.x);
                    defaultValue.y = nodeOwner.defaultValue.y + weight * (data.y);
                }
                else {
                    var defValue = nodeOwner.defaultValue;
                    defaultValue.x = defValue.x + weight * (data.x - defValue.x);
                    defaultValue.y = defValue.y + weight * (data.y - defValue.y);
                }
            }
        }
        return defaultValue;
    }
    _applyVec3(defaultValue, nodeOwner, additive, weight, isFirstLayer, data) {
        if (!defaultValue)
            return null;
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                defaultValue.x += weight * data.x;
                defaultValue.y += weight * data.y;
                defaultValue.z += weight * data.z;
            }
            else {
                var oriValue = defaultValue;
                defaultValue.x = oriValue.x + weight * (data.x - oriValue.x);
                defaultValue.y = oriValue.y + weight * (data.y - oriValue.y);
                defaultValue.z = oriValue.z + weight * (data.z - oriValue.z);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + data.x;
                    defaultValue.y = nodeOwner.defaultValue.y + data.y;
                    defaultValue.z = nodeOwner.defaultValue.z + data.z;
                }
                else
                    data.cloneTo(defaultValue);
            }
            else {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + weight * (data.x);
                    defaultValue.y = nodeOwner.defaultValue.y + weight * (data.y);
                    defaultValue.z = nodeOwner.defaultValue.z + weight * (data.z);
                }
                else {
                    var defValue = nodeOwner.defaultValue;
                    defaultValue.x = defValue.x + weight * (data.x - defValue.x);
                    defaultValue.y = defValue.y + weight * (data.y - defValue.y);
                    defaultValue.z = defValue.z + weight * (data.z - defValue.z);
                }
            }
        }
        return defaultValue;
    }
    _applyVec4(defaultValue, nodeOwner, additive, weight, isFirstLayer, data) {
        if (!defaultValue)
            return null;
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                defaultValue.x += weight * data.x;
                defaultValue.y += weight * data.y;
                defaultValue.z += weight * data.z;
                defaultValue.w += weight * data.w;
            }
            else {
                var oriValue = defaultValue;
                defaultValue.x = oriValue.x + weight * (data.x - oriValue.x);
                defaultValue.y = oriValue.y + weight * (data.y - oriValue.y);
                defaultValue.z = oriValue.z + weight * (data.z - oriValue.z);
                defaultValue.w = oriValue.w + weight * (data.w - oriValue.w);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + data.x;
                    defaultValue.y = nodeOwner.defaultValue.y + data.y;
                    defaultValue.z = nodeOwner.defaultValue.z + data.z;
                    defaultValue.w = nodeOwner.defaultValue.w + data.w;
                }
                else
                    data.cloneTo(defaultValue);
            }
            else {
                if (additive) {
                    defaultValue.x = nodeOwner.defaultValue.x + weight * (data.x);
                    defaultValue.y = nodeOwner.defaultValue.y + weight * (data.y);
                    defaultValue.z = nodeOwner.defaultValue.z + weight * (data.z);
                    defaultValue.w = nodeOwner.defaultValue.w + weight * (data.w);
                }
                else {
                    var defValue = nodeOwner.defaultValue;
                    defaultValue.x = defValue.x + weight * (data.x - defValue.x);
                    defaultValue.y = defValue.y + weight * (data.y - defValue.y);
                    defaultValue.z = defValue.z + weight * (data.z - defValue.z);
                    defaultValue.w = defValue.w + weight * (data.w - defValue.w);
                }
            }
        }
        return defaultValue;
    }
    _applyColor(defaultValue, nodeOwner, additive, weight, isFirstLayer, data) {
        if (!defaultValue)
            return null;
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                defaultValue.r += weight * data.x;
                defaultValue.g += weight * data.y;
                defaultValue.b += weight * data.z;
                defaultValue.a += weight * data.w;
            }
            else {
                var oriValue = defaultValue;
                defaultValue.r = oriValue.r + weight * (data.x - oriValue.r);
                defaultValue.g = oriValue.g + weight * (data.y - oriValue.g);
                defaultValue.b = oriValue.b + weight * (data.z - oriValue.b);
                defaultValue.a = oriValue.a + weight * (data.w - oriValue.a);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    defaultValue.r = nodeOwner.defaultValue.r + data.x;
                    defaultValue.g = nodeOwner.defaultValue.g + data.y;
                    defaultValue.b = nodeOwner.defaultValue.b + data.z;
                    defaultValue.a = nodeOwner.defaultValue.a + data.w;
                }
                else {
                    defaultValue.setValue(data.x, data.y, data.z, data.w);
                }
            }
            else {
                if (additive) {
                    defaultValue.r = nodeOwner.defaultValue.r + weight * (data.x);
                    defaultValue.g = nodeOwner.defaultValue.g + weight * (data.y);
                    defaultValue.b = nodeOwner.defaultValue.b + weight * (data.z);
                    defaultValue.a = nodeOwner.defaultValue.a + weight * (data.w);
                }
                else {
                    var defValue = nodeOwner.defaultValue;
                    defaultValue.r = defValue.r + weight * (data.x - defValue.r);
                    defaultValue.g = defValue.g + weight * (data.y - defValue.g);
                    defaultValue.b = defValue.b + weight * (data.z - defValue.b);
                    defaultValue.a = defValue.a + weight * (data.w - defValue.a);
                }
            }
        }
        return defaultValue;
    }
    _applyPositionAndRotationEuler(nodeOwner, additive, weight, isFirstLayer, data, out) {
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                out.x += weight * data.x;
                out.y += weight * data.y;
                out.z += weight * data.z;
            }
            else {
                var oriX = out.x;
                var oriY = out.y;
                var oriZ = out.z;
                out.x = oriX + weight * (data.x - oriX);
                out.y = oriY + weight * (data.y - oriY);
                out.z = oriZ + weight * (data.z - oriZ);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    var defValue = nodeOwner.defaultValue;
                    out.x = defValue.x + data.x;
                    out.y = defValue.y + data.y;
                    out.z = defValue.z + data.z;
                }
                else {
                    out.x = data.x;
                    out.y = data.y;
                    out.z = data.z;
                }
            }
            else {
                defValue = nodeOwner.defaultValue;
                if (additive) {
                    out.x = defValue.x + weight * data.x;
                    out.y = defValue.y + weight * data.y;
                    out.z = defValue.z + weight * data.z;
                }
                else {
                    var defX = defValue.x;
                    var defY = defValue.y;
                    var defZ = defValue.z;
                    out.x = defX + weight * (data.x - defX);
                    out.y = defY + weight * (data.y - defY);
                    out.z = defZ + weight * (data.z - defZ);
                }
            }
        }
    }
    _applyRotation(nodeOwner, additive, weight, isFirstLayer, clipRot, localRotation) {
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                var tempQuat = Animator._tempQuaternion1;
                Utils3D.quaternionWeight(clipRot, weight, tempQuat);
                tempQuat.normalize(tempQuat);
                Quaternion.multiply(localRotation, tempQuat, localRotation);
            }
            else {
                Quaternion.lerp(localRotation, clipRot, weight, localRotation);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    var defaultRot = nodeOwner.defaultValue;
                    Quaternion.multiply(defaultRot, clipRot, localRotation);
                }
                else {
                    localRotation.x = clipRot.x;
                    localRotation.y = clipRot.y;
                    localRotation.z = clipRot.z;
                    localRotation.w = clipRot.w;
                }
            }
            else {
                defaultRot = nodeOwner.defaultValue;
                if (additive) {
                    tempQuat = Animator._tempQuaternion1;
                    Utils3D.quaternionWeight(clipRot, weight, tempQuat);
                    tempQuat.normalize(tempQuat);
                    Quaternion.multiply(defaultRot, tempQuat, localRotation);
                }
                else {
                    Quaternion.lerp(defaultRot, clipRot, weight, localRotation);
                }
            }
        }
    }
    _applyScale(nodeOwner, additive, weight, isFirstLayer, clipSca, localScale) {
        if (nodeOwner.updateMark === this._updateMark) {
            if (additive) {
                var scale = Animator._tempVector31;
                Utils3D.scaleWeight(clipSca, weight, scale);
                localScale.x = localScale.x * scale.x;
                localScale.y = localScale.y * scale.y;
                localScale.z = localScale.z * scale.z;
            }
            else {
                Utils3D.scaleBlend(localScale, clipSca, weight, localScale);
            }
        }
        else {
            if (isFirstLayer) {
                if (additive) {
                    var defaultSca = nodeOwner.defaultValue;
                    localScale.x = defaultSca.x * clipSca.x;
                    localScale.y = defaultSca.y * clipSca.y;
                    localScale.z = defaultSca.z * clipSca.z;
                }
                else {
                    localScale.x = clipSca.x;
                    localScale.y = clipSca.y;
                    localScale.z = clipSca.z;
                }
            }
            else {
                defaultSca = nodeOwner.defaultValue;
                if (additive) {
                    scale = Animator._tempVector31;
                    Utils3D.scaleWeight(clipSca, weight, scale);
                    localScale.x = defaultSca.x * scale.x;
                    localScale.y = defaultSca.y * scale.y;
                    localScale.z = defaultSca.z * scale.z;
                }
                else {
                    Utils3D.scaleBlend(defaultSca, clipSca, weight, localScale);
                }
            }
        }
    }
    _applyCrossData(nodeOwner, additive, weight, isFirstLayer, srcValue, desValue, crossWeight) {
        var pro = nodeOwner.propertyOwner;
        let lastpro;
        if (pro) {
            switch (nodeOwner.type) {
                case KeyFrameValueType.Float:
                    var proPat = nodeOwner.property;
                    var m = proPat.length - 1;
                    for (var j = 0; j < m; j++) {
                        pro = pro[proPat[j]];
                        if (!pro)
                            break;
                    }
                    var crossValue = srcValue + crossWeight * (desValue - srcValue);
                    nodeOwner.value = crossValue;
                    lastpro = proPat[m];
                    if (!nodeOwner.isMaterial) {
                        pro && (pro[lastpro] = this._applyFloat(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, crossValue));
                    }
                    else {
                        pro && pro.setFloat(lastpro, this._applyFloat(pro.getFloat(lastpro), nodeOwner, additive, weight, isFirstLayer, crossValue));
                    }
                    if (nodeOwner.callbackFun) {
                        nodeOwner.animatorDataSetCallBack();
                    }
                    break;
                case KeyFrameValueType.Position:
                    var localPos = pro.localPosition;
                    var position = nodeOwner.value;
                    var srcX = srcValue.x, srcY = srcValue.y, srcZ = srcValue.z;
                    position.x = srcX + crossWeight * (desValue.x - srcX);
                    position.y = srcY + crossWeight * (desValue.y - srcY);
                    position.z = srcZ + crossWeight * (desValue.z - srcZ);
                    this._applyPositionAndRotationEuler(nodeOwner, additive, weight, isFirstLayer, position, localPos);
                    pro.localPosition = localPos;
                    break;
                case KeyFrameValueType.Rotation:
                    var localRot = pro.localRotation;
                    var rotation = nodeOwner.value;
                    Quaternion.lerp(srcValue, desValue, crossWeight, rotation);
                    this._applyRotation(nodeOwner, additive, weight, isFirstLayer, rotation, localRot);
                    pro.localRotation = localRot;
                    break;
                case KeyFrameValueType.Scale:
                    var localSca = pro.localScale;
                    var scale = nodeOwner.value;
                    Utils3D.scaleBlend(srcValue, desValue, crossWeight, scale);
                    this._applyScale(nodeOwner, additive, weight, isFirstLayer, scale, localSca);
                    pro.localScale = localSca;
                    break;
                case KeyFrameValueType.RotationEuler:
                    var localEuler = pro.localRotationEuler;
                    var rotationEuler = nodeOwner.value;
                    srcX = srcValue.x, srcY = srcValue.y, srcZ = srcValue.z;
                    rotationEuler.x = srcX + crossWeight * (desValue.x - srcX);
                    rotationEuler.y = srcY + crossWeight * (desValue.y - srcY);
                    rotationEuler.z = srcZ + crossWeight * (desValue.z - srcZ);
                    this._applyPositionAndRotationEuler(nodeOwner, additive, weight, isFirstLayer, rotationEuler, localEuler);
                    pro.localRotationEuler = localEuler;
                    break;
                case KeyFrameValueType.Color:
                    var proPat = nodeOwner.property;
                    var m = proPat.length - 1;
                    for (var j = 0; j < m; j++) {
                        pro = pro[proPat[j]];
                        if (!pro)
                            break;
                    }
                    let v44 = nodeOwner.value;
                    v44.x = srcValue.r + crossWeight * (desValue.r - srcValue.r);
                    v44.y = srcValue.g + crossWeight * (desValue.g - srcValue.g);
                    v44.z = srcValue.b + crossWeight * (desValue.b - srcValue.b);
                    v44.w = srcValue.a + crossWeight * (desValue.a - srcValue.a);
                    nodeOwner.value = v44;
                    lastpro = proPat[m];
                    if (!nodeOwner.isMaterial) {
                        pro && (pro[lastpro] = this._applyColor(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, v44));
                    }
                    else {
                        pro && pro.setColor(lastpro, this._applyColor(pro.getColor(lastpro), nodeOwner, additive, weight, isFirstLayer, v44));
                    }
                    if (nodeOwner.callbackFun) {
                        nodeOwner.animatorDataSetCallBack();
                    }
                    break;
                case KeyFrameValueType.Vector2:
                    var proPat = nodeOwner.property;
                    var m = proPat.length - 1;
                    for (var j = 0; j < m; j++) {
                        pro = pro[proPat[j]];
                        if (!pro)
                            break;
                    }
                    let v2 = nodeOwner.value;
                    v2.x = srcValue.r + crossWeight * (desValue.r - srcValue.r);
                    v2.y = srcValue.g + crossWeight * (desValue.g - srcValue.g);
                    nodeOwner.value = v2;
                    lastpro = proPat[m];
                    if (!nodeOwner.isMaterial) {
                        pro && (pro[lastpro] = this._applyVec2(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, v2));
                    }
                    else {
                        pro && pro.setVector2(lastpro, this._applyVec2(pro.getVector2(lastpro), nodeOwner, additive, weight, isFirstLayer, v2));
                    }
                    if (nodeOwner.callbackFun) {
                        nodeOwner.animatorDataSetCallBack();
                    }
                    break;
                case KeyFrameValueType.Vector4:
                    var proPat = nodeOwner.property;
                    var m = proPat.length - 1;
                    for (var j = 0; j < m; j++) {
                        pro = pro[proPat[j]];
                        if (!pro)
                            break;
                    }
                    let v4 = nodeOwner.value;
                    v4.x = srcValue.x + crossWeight * (desValue.x - srcValue.x);
                    v4.y = srcValue.y + crossWeight * (desValue.y - srcValue.y);
                    v4.z = srcValue.z + crossWeight * (desValue.z - srcValue.z);
                    nodeOwner.value = v4;
                    lastpro = proPat[m];
                    if (!nodeOwner.isMaterial) {
                        pro && (pro[lastpro] = this._applyVec4(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, v4));
                    }
                    else {
                        pro && pro.setVector4(lastpro, this._applyVec4(pro.getVector4(lastpro), nodeOwner, additive, weight, isFirstLayer, v4));
                    }
                    if (nodeOwner.callbackFun) {
                        nodeOwner.animatorDataSetCallBack();
                    }
                    break;
                case KeyFrameValueType.Vector3:
                    var proPat = nodeOwner.property;
                    var m = proPat.length - 1;
                    for (var j = 0; j < m; j++) {
                        pro = pro[proPat[j]];
                        if (!pro)
                            break;
                    }
                    let v3 = nodeOwner.value;
                    v3.x = srcValue.x + crossWeight * (desValue.x - srcValue.x);
                    v3.y = srcValue.y + crossWeight * (desValue.y - srcValue.y);
                    v3.z = srcValue.z + crossWeight * (desValue.z - srcValue.z);
                    nodeOwner.value = v3;
                    lastpro = proPat[m];
                    if (!nodeOwner.isMaterial) {
                        pro && (pro[lastpro] = this._applyVec3(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, v3));
                    }
                    else {
                        pro && pro.setVector3(lastpro, this._applyVec3(pro.getVector3(lastpro), nodeOwner, additive, weight, isFirstLayer, v3));
                    }
                    if (nodeOwner.callbackFun) {
                        nodeOwner.animatorDataSetCallBack();
                    }
                    break;
            }
            nodeOwner.updateMark = this._updateMark;
        }
    }
    _setClipDatasToNode(stateInfo, additive, weight, isFirstLayer, controllerLayer = null) {
        var realtimeDatas = stateInfo._realtimeDatas;
        var nodes = stateInfo._clip._nodes;
        var nodeOwners = stateInfo._nodeOwners;
        for (var i = 0, n = nodes.count; i < n; i++) {
            var nodeOwner = nodeOwners[i];
            if (nodeOwner) {
                var node = nodes.getNodeByIndex(i);
                if (controllerLayer.avatarMask && (!controllerLayer.avatarMask.getTransformActive(node.nodePath))) {
                    continue;
                }
                var pro = nodeOwner.propertyOwner;
                let value;
                if (pro) {
                    switch (nodeOwner.type) {
                        case KeyFrameValueType.Float:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            let lastpro = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[lastpro] = this._applyFloat(pro[lastpro], nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.setFloat(lastpro, this._applyFloat(0, nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                            }
                            break;
                        case KeyFrameValueType.Position:
                            var localPos = pro.localPosition;
                            this._applyPositionAndRotationEuler(nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i], localPos);
                            pro.localPosition = localPos;
                            break;
                        case KeyFrameValueType.Rotation:
                            var localRot = pro.localRotation;
                            this._applyRotation(nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i], localRot);
                            pro.localRotation = localRot;
                            break;
                        case KeyFrameValueType.Scale:
                            var localSca = pro.localScale;
                            this._applyScale(nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i], localSca);
                            pro.localScale = localSca;
                            break;
                        case KeyFrameValueType.RotationEuler:
                            var localEuler = pro.localRotationEuler;
                            this._applyPositionAndRotationEuler(nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i], localEuler);
                            pro.localRotationEuler = localEuler;
                            break;
                        case KeyFrameValueType.Vector2:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = this._applyVec2(pro[value], nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector2(value) && pro.setVector2(value, this._applyVec2(pro.getVector2(value), nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                            }
                            break;
                        case KeyFrameValueType.Vector3:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = this._applyVec3(pro[value], nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector3(value) && pro.setVector3(value, this._applyVec3(pro.getVector3(value), nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                            }
                            break;
                        case KeyFrameValueType.Vector4:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = this._applyVec4(pro[value], nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector4(value) && pro.setVector4(value, this._applyVec4(pro.getVector4(value), nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                            }
                            break;
                        case KeyFrameValueType.Color:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = this._applyColor(pro[value], nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getColor(value) && pro.setColor(value, this._applyColor(pro.getColor(value), nodeOwner, additive, weight, isFirstLayer, realtimeDatas[i]));
                            }
                            break;
                    }
                    nodeOwner.updateMark = this._updateMark;
                }
            }
        }
    }
    _setCrossClipDatasToNode(controllerLayer, srcState, destState, crossWeight, isFirstLayer) {
        var nodeOwners = controllerLayer._crossNodesOwners;
        var ownerCount = controllerLayer._crossNodesOwnersCount;
        var additive = controllerLayer.blendingMode !== AnimatorControllerLayer.BLENDINGMODE_OVERRIDE;
        var weight = controllerLayer.defaultWeight;
        var destRealtimeDatas = destState._realtimeDatas;
        var destDataIndices = controllerLayer._destCrossClipNodeIndices;
        var destNodeOwners = destState._nodeOwners;
        var srcRealtimeDatas = srcState._realtimeDatas;
        var srcDataIndices = controllerLayer._srcCrossClipNodeIndices;
        var srcNodeOwners = srcState._nodeOwners;
        for (var i = 0; i < ownerCount; i++) {
            var nodeOwner = nodeOwners[i];
            if (nodeOwner) {
                var srcIndex = srcDataIndices[i];
                var destIndex = destDataIndices[i];
                var srcValue = srcIndex !== -1 ? srcRealtimeDatas[srcIndex] : destNodeOwners[destIndex].defaultValue;
                var desValue = destIndex !== -1 ? destRealtimeDatas[destIndex] : srcNodeOwners[srcIndex].defaultValue;
                if (!desValue) {
                    desValue = srcNodeOwners[srcIndex].defaultValue;
                }
                if (!controllerLayer.avatarMask || controllerLayer.avatarMask.getTransformActive(nodeOwner.nodePath)) {
                    this._applyCrossData(nodeOwner, additive, weight, isFirstLayer, srcValue, desValue, crossWeight);
                }
            }
        }
    }
    _setFixedCrossClipDatasToNode(controllerLayer, destState, crossWeight, isFirstLayer) {
        var nodeOwners = controllerLayer._crossNodesOwners;
        var ownerCount = controllerLayer._crossNodesOwnersCount;
        var additive = controllerLayer.blendingMode !== AnimatorControllerLayer.BLENDINGMODE_OVERRIDE;
        var weight = controllerLayer.defaultWeight;
        var destRealtimeDatas = destState._realtimeDatas;
        var destDataIndices = controllerLayer._destCrossClipNodeIndices;
        for (var i = 0; i < ownerCount; i++) {
            var nodeOwner = nodeOwners[i];
            if (nodeOwner) {
                var destIndex = destDataIndices[i];
                var srcValue = nodeOwner.crossFixedValue;
                var desValue;
                if (destIndex == -1 || !destRealtimeDatas[destIndex]) {
                    desValue = nodeOwner.defaultValue;
                }
                else {
                    desValue = destRealtimeDatas[destIndex];
                }
                this._applyCrossData(nodeOwner, additive, weight, isFirstLayer, srcValue, desValue, crossWeight);
            }
        }
    }
    _revertDefaultKeyframeNodes(clipStateInfo) {
        var nodeOwners = clipStateInfo._nodeOwners;
        for (var i = 0, n = nodeOwners.length; i < n; i++) {
            var nodeOwner = nodeOwners[i];
            if (nodeOwner) {
                var pro = nodeOwner.propertyOwner;
                let value;
                if (pro) {
                    switch (nodeOwner.type) {
                        case KeyFrameValueType.Float:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            let lastpro = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[lastpro] = nodeOwner.defaultValue);
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.setFloat(lastpro, nodeOwner.defaultValue);
                            }
                            break;
                        case KeyFrameValueType.Position:
                            var locPos = pro.localPosition;
                            var def = nodeOwner.defaultValue;
                            locPos.x = def.x;
                            locPos.y = def.y;
                            locPos.z = def.z;
                            pro.localPosition = locPos;
                            break;
                        case KeyFrameValueType.Rotation:
                            var locRot = pro.localRotation;
                            var defQua = nodeOwner.defaultValue;
                            locRot.x = defQua.x;
                            locRot.y = defQua.y;
                            locRot.z = defQua.z;
                            locRot.w = defQua.w;
                            pro.localRotation = locRot;
                            break;
                        case KeyFrameValueType.Scale:
                            var locSca = pro.localScale;
                            def = nodeOwner.defaultValue;
                            locSca.x = def.x;
                            locSca.y = def.y;
                            locSca.z = def.z;
                            pro.localScale = locSca;
                            break;
                        case KeyFrameValueType.RotationEuler:
                            var locEul = pro.localRotationEuler;
                            def = nodeOwner.defaultValue;
                            locEul.x = def.x;
                            locEul.y = def.y;
                            locEul.z = def.z;
                            pro.localRotationEuler = locEul;
                            break;
                        case KeyFrameValueType.Vector2:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = nodeOwner.defaultValue);
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector2(value) && pro.setVector2(value, nodeOwner.defaultValue);
                            }
                            break;
                        case KeyFrameValueType.Vector3:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = nodeOwner.defaultValue);
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector3(value) && pro.setVector3(value, nodeOwner.defaultValue);
                            }
                            break;
                        case KeyFrameValueType.Vector4:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = nodeOwner.defaultValue);
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getVector3(value) && pro.setVector3(value, nodeOwner.defaultValue);
                            }
                            break;
                        case KeyFrameValueType.Color:
                            var proPat = nodeOwner.property;
                            var m = proPat.length - 1;
                            for (var j = 0; j < m; j++) {
                                pro = pro[proPat[j]];
                                if (!pro)
                                    break;
                            }
                            value = proPat[m];
                            let tempColor = Animator._tempColor;
                            tempColor.r = nodeOwner.defaultValue.x;
                            tempColor.g = nodeOwner.defaultValue.y;
                            tempColor.b = nodeOwner.defaultValue.z;
                            tempColor.a = nodeOwner.defaultValue.w;
                            if (!nodeOwner.isMaterial) {
                                pro && (pro[value] = tempColor);
                                if (nodeOwner.callbackFun) {
                                    nodeOwner.animatorDataSetCallBack();
                                }
                            }
                            else {
                                pro && pro.getColor(value) && pro.setColor(value, tempColor);
                            }
                            break;
                        default:
                            throw "Animator:unknown type.";
                    }
                }
            }
        }
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
    _onEnable() {
        for (let i = 0, n = this._controllerLayers.length; i < n; i++) {
            if (this._controllerLayers[i].playOnWake) {
                let defaultClip = this.getDefaultState(i);
                (defaultClip) && (this.play(null, i, defaultClip.cycleOffset));
            }
        }
    }
    _onDestroy() {
        for (let i = 0, n = this._controllerLayers.length; i < n; i++)
            this._controllerLayers[i]._removeReference();
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
    _handleSpriteOwnersBySprite(isLink, path, sprite) {
        for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
            if (!this._controllerLayers[i].enable)
                continue;
            var clipStateInfos = this._controllerLayers[i]._states;
            for (var j = 0, m = clipStateInfos.length; j < m; j++) {
                var clipStateInfo = clipStateInfos[j];
                var clip = clipStateInfo._clip;
                var nodePath = path.join("/");
                var ownersNodes = clip._nodesMap[nodePath];
                if (ownersNodes) {
                    var nodeOwners = clipStateInfo._nodeOwners;
                    for (var k = 0, p = ownersNodes.length; k < p; k++) {
                        if (isLink)
                            this._addKeyframeNodeOwner(nodeOwners, ownersNodes[k], sprite);
                        else
                            this._removeKeyframeNodeOwner(nodeOwners, ownersNodes[k]);
                    }
                }
            }
        }
    }
    _parse(data) {
        var play = data.playOnWake;
        var layersData = data.layers;
        for (var i = 0; i < layersData.length; i++) {
            var layerData = layersData[i];
            var animatorLayer = new AnimatorControllerLayer(layerData.name);
            if (i === 0)
                animatorLayer.defaultWeight = 1.0;
            else
                animatorLayer.defaultWeight = layerData.weight;
            var blendingModeData = layerData.blendingMode;
            (blendingModeData) && (animatorLayer.blendingMode = blendingModeData);
            this.addControllerLayer(animatorLayer);
            var states = layerData.states;
            for (var j = 0, m = states.length; j < m; j++) {
                var state = states[j];
                var clipPath = state.clipPath;
                if (clipPath) {
                    var name = state.name;
                    var motion;
                    motion = Loader.getRes(clipPath);
                    if (motion) {
                        var animatorState = new AnimatorState();
                        animatorState.name = name;
                        animatorState.clip = motion;
                        state.speed && (animatorState.speed = state.speed);
                        animatorLayer.addState(animatorState);
                        (j === 0) && (this.getControllerLayer(i).defaultState = animatorState);
                    }
                }
            }
            (play !== undefined) && (animatorLayer.playOnWake = play);
            let layerMaskData = layerData.avatarMask;
            if (layerMaskData) {
                let avaMask = new AvatarMask();
                animatorLayer.avatarMask = avaMask;
                for (var bips in layerMaskData) {
                    avaMask.setTransformActive(bips, layerMaskData[bips]);
                }
            }
        }
        var cullingModeData = data.cullingMode;
        (cullingModeData !== undefined) && (this.cullingMode = cullingModeData);
    }
    onUpdate() {
        let timer = this.owner._scene.timer;
        let delta = timer._delta / 1000.0;
        delta = this._applyUpdateMode(delta);
        if (this._speed === 0 || delta === 0)
            return;
        if (!Stat.enableAnimatorUpdate)
            return;
        var needRender = true;
        var i, n;
        this._updateMark++;
        for (i = 0, n = this._controllerLayers.length; i < n; i++) {
            var controllerLayer = this._controllerLayers[i];
            if (!controllerLayer.enable)
                continue;
            var playStateInfo = controllerLayer._playStateInfo;
            if (this.sleep && playStateInfo._finish && controllerLayer._playType == 0) {
                continue;
            }
            var crossPlayStateInfo = controllerLayer._crossPlayStateInfo;
            addtive = controllerLayer.blendingMode !== AnimatorControllerLayer.BLENDINGMODE_OVERRIDE;
            switch (controllerLayer._playType) {
                case 0:
                    var animatorState = playStateInfo.currentState;
                    var clip = animatorState._clip;
                    var speed = this._speed * animatorState.speed;
                    var finish = playStateInfo._finish;
                    finish || this._updatePlayer(animatorState, playStateInfo, delta * speed, animatorState.islooping, i);
                    if (needRender) {
                        var addtive = controllerLayer.blendingMode !== AnimatorControllerLayer.BLENDINGMODE_OVERRIDE;
                        this._updateClipDatas(animatorState, addtive, playStateInfo, controllerLayer.avatarMask);
                        this._setClipDatasToNode(animatorState, addtive, controllerLayer.defaultWeight, i === 0, controllerLayer);
                        finish || this._updateEventScript(animatorState, playStateInfo);
                    }
                    finish || this._updateStateFinish(animatorState, playStateInfo);
                    break;
                case 1:
                    animatorState = playStateInfo.currentState;
                    clip = animatorState._clip;
                    var crossState = controllerLayer._crossPlayState;
                    var crossClip = crossState._clip;
                    var crossDuratuion = controllerLayer._crossDuration;
                    var startPlayTime = crossPlayStateInfo._startPlayTime;
                    var crossClipDuration = crossClip._duration - startPlayTime;
                    var crossScale = crossDuratuion > crossClipDuration ? crossClipDuration / crossDuratuion : 1.0;
                    var crossSpeed = this._speed * crossState.speed;
                    this._updatePlayer(crossState, crossPlayStateInfo, delta * crossScale * crossSpeed, crossClip.islooping, i);
                    var crossWeight = ((crossPlayStateInfo._elapsedTime - startPlayTime) / crossScale) / crossDuratuion;
                    var needUpdateFinishcurrentState = false;
                    if (crossWeight >= 1.0) {
                        if (needRender) {
                            this._updateClipDatas(crossState, addtive, crossPlayStateInfo, controllerLayer.avatarMask);
                            this._setClipDatasToNode(crossState, addtive, controllerLayer.defaultWeight, i === 0, controllerLayer);
                            controllerLayer._playType = 0;
                            playStateInfo.currentState = crossState;
                            crossPlayStateInfo._cloneTo(playStateInfo);
                        }
                    }
                    else {
                        if (!playStateInfo._finish) {
                            speed = this._speed * animatorState.speed;
                            needUpdateFinishcurrentState = true;
                            this._updatePlayer(animatorState, playStateInfo, delta * speed, animatorState.islooping, i);
                            if (needRender)
                                this._updateClipDatas(animatorState, addtive, playStateInfo, controllerLayer.avatarMask);
                        }
                        if (needRender) {
                            this._updateClipDatas(crossState, addtive, crossPlayStateInfo, controllerLayer.avatarMask);
                            this._setCrossClipDatasToNode(controllerLayer, animatorState, crossState, crossWeight, i === 0);
                        }
                    }
                    if (needRender) {
                        this._updateEventScript(animatorState, playStateInfo);
                        this._updateEventScript(crossState, crossPlayStateInfo);
                    }
                    this._updateStateFinish(crossState, crossPlayStateInfo);
                    needUpdateFinishcurrentState && this._updateStateFinish(playStateInfo.currentState, playStateInfo);
                    break;
                case 2:
                    crossState = controllerLayer._crossPlayState;
                    crossClip = crossState._clip;
                    crossDuratuion = controllerLayer._crossDuration;
                    startPlayTime = crossPlayStateInfo._startPlayTime;
                    crossClipDuration = crossClip._duration - startPlayTime;
                    crossScale = crossDuratuion > crossClipDuration ? crossClipDuration / crossDuratuion : 1.0;
                    crossSpeed = this._speed * crossState.speed;
                    this._updatePlayer(crossState, crossPlayStateInfo, delta * crossScale * crossSpeed, crossState.islooping, i);
                    if (needRender) {
                        crossWeight = ((crossPlayStateInfo._elapsedTime - startPlayTime) / crossScale) / crossDuratuion;
                        if (crossWeight >= 1.0) {
                            this._updateClipDatas(crossState, addtive, crossPlayStateInfo, controllerLayer.avatarMask);
                            this._setClipDatasToNode(crossState, addtive, 1.0, i === 0, controllerLayer);
                            controllerLayer._playType = 0;
                            playStateInfo.currentState = crossState;
                            crossPlayStateInfo._cloneTo(playStateInfo);
                        }
                        else {
                            this._updateClipDatas(crossState, addtive, crossPlayStateInfo, controllerLayer.avatarMask);
                            this._setFixedCrossClipDatasToNode(controllerLayer, crossState, crossWeight, i === 0);
                        }
                        this._updateEventScript(crossState, crossPlayStateInfo);
                    }
                    this._updateStateFinish(crossState, crossPlayStateInfo);
                    break;
            }
        }
    }
    _cloneTo(dest) {
        var animator = dest;
        animator.cullingMode = this.cullingMode;
        for (var i = 0, n = this._controllerLayers.length; i < n; i++) {
            var controllLayer = this._controllerLayers[i];
            animator.addControllerLayer(controllLayer.clone());
            var animatorStates = controllLayer._states;
            for (var j = 0, m = animatorStates.length; j < m; j++) {
                var state = animatorStates[j].clone();
                var cloneLayer = animator.getControllerLayer(i);
                cloneLayer.addState(state);
                (j == 0) && (cloneLayer.defaultState = state);
            }
        }
        animator.controller = this._controller;
    }
    getDefaultState(layerIndex = 0) {
        var controllerLayer = this._controllerLayers[layerIndex];
        return controllerLayer.defaultState;
    }
    addState(state, layerIndex = 0) {
        var controllerLayer = this._controllerLayers[layerIndex];
        controllerLayer.addState(state);
        console.warn("Animator:this function is discard,please use animatorControllerLayer.addState() instead.");
    }
    removeState(state, layerIndex = 0) {
        var controllerLayer = this._controllerLayers[layerIndex];
        controllerLayer.removeState(state);
        console.warn("Animator:this function is discard,please use animatorControllerLayer.removeState() instead.");
    }
    addControllerLayer(controllderLayer) {
        this._controllerLayers.push(controllderLayer);
        controllderLayer._animator = this;
        controllderLayer._addReference();
        var states = controllderLayer._states;
        for (var i = 0, n = states.length; i < n; i++)
            this._getOwnersByClip(states[i]);
    }
    getControllerLayer(layerInex = 0) {
        return this._controllerLayers[layerInex];
    }
    play(name = null, layerIndex = 0, normalizedTime = Number.NEGATIVE_INFINITY) {
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var defaultState = controllerLayer.defaultState;
            if (!name && !defaultState)
                throw new Error("Animator:must have default clip value,please set clip property.");
            var playStateInfo = controllerLayer._playStateInfo;
            var curPlayState = playStateInfo.currentState;
            var animatorState = name ? controllerLayer.getAnimatorState(name) : defaultState;
            if (!animatorState._clip)
                return;
            var clipDuration = animatorState._clip._duration;
            var calclipduration = animatorState._clip._duration * (animatorState.clipEnd - animatorState.clipStart);
            if (curPlayState !== animatorState) {
                if (normalizedTime !== Number.NEGATIVE_INFINITY)
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                else
                    playStateInfo._resetPlayState(0.0, calclipduration);
                (curPlayState !== null && curPlayState !== animatorState) && (this._revertDefaultKeyframeNodes(curPlayState));
                controllerLayer._playType = 0;
                playStateInfo.currentState = animatorState;
            }
            else {
                if (normalizedTime !== Number.NEGATIVE_INFINITY) {
                    playStateInfo._resetPlayState(clipDuration * normalizedTime, calclipduration);
                    controllerLayer._playType = 0;
                }
            }
            var scripts = animatorState._scripts;
            animatorState._eventStart(this, layerIndex);
        }
        else {
            console.warn("Invalid layerIndex " + layerIndex + ".");
        }
        if (this.owner._scene) {
            this.onUpdate();
        }
    }
    crossFade(name, transitionDuration, layerIndex = 0, normalizedTime = Number.NEGATIVE_INFINITY) {
        var controllerLayer = this._controllerLayers[layerIndex];
        if (controllerLayer) {
            var destAnimatorState = controllerLayer.getAnimatorState(name);
            if (destAnimatorState) {
                var playType = controllerLayer._playType;
                if (playType === -1) {
                    this.play(name, layerIndex, normalizedTime);
                    return;
                }
                var crossPlayStateInfo = controllerLayer._crossPlayStateInfo;
                var crossNodeOwners = controllerLayer._crossNodesOwners;
                var crossNodeOwnerIndicesMap = controllerLayer._crossNodesOwnersIndicesMap;
                var srcAnimatorState = controllerLayer._playStateInfo.currentState;
                var destNodeOwners = destAnimatorState._nodeOwners;
                var destCrossClipNodeIndices = controllerLayer._destCrossClipNodeIndices;
                var destClip = destAnimatorState._clip;
                var destNodes = destClip._nodes;
                var destNodesMap = destClip._nodesDic;
                var crossCount = 0;
                switch (playType) {
                    case 0:
                        var srcNodeOwners = srcAnimatorState._nodeOwners;
                        var scrCrossClipNodeIndices = controllerLayer._srcCrossClipNodeIndices;
                        var srcClip = srcAnimatorState._clip;
                        var srcNodes = srcClip._nodes;
                        var srcNodesMap = srcClip._nodesDic;
                        controllerLayer._playType = 1;
                        var crossMark = ++controllerLayer._crossMark;
                        crossCount = controllerLayer._crossNodesOwnersCount = 0;
                        for (var i = 0, n = srcNodes.count; i < n; i++) {
                            var srcNode = srcNodes.getNodeByIndex(i);
                            var srcIndex = srcNode._indexInList;
                            var srcNodeOwner = srcNodeOwners[srcIndex];
                            if (srcNodeOwner) {
                                var srcFullPath = srcNode.fullPath;
                                scrCrossClipNodeIndices[crossCount] = srcIndex;
                                var destNode = destNodesMap[srcFullPath];
                                if (destNode)
                                    destCrossClipNodeIndices[crossCount] = destNode._indexInList;
                                else
                                    destCrossClipNodeIndices[crossCount] = -1;
                                crossNodeOwnerIndicesMap[srcFullPath] = crossMark;
                                crossNodeOwners[crossCount] = srcNodeOwner;
                                crossCount++;
                            }
                        }
                        for (i = 0, n = destNodes.count; i < n; i++) {
                            destNode = destNodes.getNodeByIndex(i);
                            var destIndex = destNode._indexInList;
                            var destNodeOwner = destNodeOwners[destIndex];
                            if (destNodeOwner) {
                                var destFullPath = destNode.fullPath;
                                if (!srcNodesMap[destFullPath]) {
                                    scrCrossClipNodeIndices[crossCount] = -1;
                                    destCrossClipNodeIndices[crossCount] = destIndex;
                                    crossNodeOwnerIndicesMap[destFullPath] = crossMark;
                                    crossNodeOwners[crossCount] = destNodeOwner;
                                    crossCount++;
                                }
                            }
                        }
                        break;
                    case 1:
                    case 2:
                        controllerLayer._playType = 2;
                        for (i = 0, n = crossNodeOwners.length; i < n; i++) {
                            var nodeOwner = crossNodeOwners[i];
                            nodeOwner.saveCrossFixedValue();
                            destNode = destNodesMap[nodeOwner.fullPath];
                            if (destNode)
                                destCrossClipNodeIndices[i] = destNode._indexInList;
                            else
                                destCrossClipNodeIndices[i] = -1;
                        }
                        crossCount = controllerLayer._crossNodesOwnersCount;
                        crossMark = controllerLayer._crossMark;
                        for (i = 0, n = destNodes.count; i < n; i++) {
                            destNode = destNodes.getNodeByIndex(i);
                            destIndex = destNode._indexInList;
                            destNodeOwner = destNodeOwners[destIndex];
                            if (destNodeOwner) {
                                destFullPath = destNode.fullPath;
                                if (crossNodeOwnerIndicesMap[destFullPath] !== crossMark) {
                                    destCrossClipNodeIndices[crossCount] = destIndex;
                                    crossNodeOwnerIndicesMap[destFullPath] = crossMark;
                                    nodeOwner = destNodeOwners[destIndex];
                                    crossNodeOwners[crossCount] = nodeOwner;
                                    nodeOwner.saveCrossFixedValue();
                                    crossCount++;
                                }
                            }
                        }
                        break;
                    default:
                }
                controllerLayer._crossNodesOwnersCount = crossCount;
                controllerLayer._crossPlayState = destAnimatorState;
                controllerLayer._crossDuration = srcAnimatorState._clip._duration * transitionDuration;
                if (normalizedTime !== Number.NEGATIVE_INFINITY)
                    crossPlayStateInfo._resetPlayState(destClip._duration * normalizedTime, controllerLayer._crossDuration);
                else
                    crossPlayStateInfo._resetPlayState(0.0, controllerLayer._crossDuration);
                destAnimatorState._eventStart(this, layerIndex);
            }
            else {
                console.warn("Invalid name " + layerIndex + ".");
            }
        }
        else {
            console.warn("Invalid layerIndex " + layerIndex + ".");
        }
    }
    setParamsTrigger(name) {
        let id;
        if (typeof name == "number")
            id = name;
        else
            id = AnimatorStateCondition.conditionNameToID(name);
        this._animatorParams[id] = true;
    }
    setParamsNumber(name, value) {
        let id;
        if (typeof name == "number")
            id = name;
        else
            id = AnimatorStateCondition.conditionNameToID(name);
        this._animatorParams[id] = value;
    }
    setParamsBool(name, value) {
        let id;
        if (typeof name == "number")
            id = name;
        else
            id = AnimatorStateCondition.conditionNameToID(name);
        this._animatorParams[id] = value;
    }
    getParamsvalue(name) {
        let id;
        if (typeof name == "number")
            id = name;
        else
            id = AnimatorStateCondition.conditionNameToID(name);
        return this._animatorParams[id];
    }
    getCurrentAnimatorPlayState(layerInex = 0) {
        return this._controllerLayers[layerInex]._playStateInfo;
    }
}
Animator._tempVector31 = new Vector3();
Animator._tempColor = new Color();
Animator._tempQuaternion1 = new Quaternion();
Animator.CULLINGMODE_ALWAYSANIMATE = 0;
Animator.CULLINGMODE_CULLCOMPLETELY = 2;

//# sourceMappingURL=Animator.js.map
