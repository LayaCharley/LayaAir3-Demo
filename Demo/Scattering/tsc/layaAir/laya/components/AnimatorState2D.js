import { EventDispatcher } from "../events/EventDispatcher";
export class AnimatorState2D extends EventDispatcher {
    constructor() {
        super(...arguments);
        this._referenceCount = 0;
        this._clip = null;
        this._currentFrameIndices = null;
        this.cycleOffset = 0;
        this.speed = 1.0;
        this.clipStart = 0.0;
        this.clipEnd = 1.0;
        this.loop = -1;
        this.yoyo = false;
        this.transitions = [];
        this.soloTransitions = [];
        this._scripts = null;
        this._realtimeDatas = [];
    }
    get clip() {
        return this._clip;
    }
    set clip(value) {
        if (this._clip != value) {
            if (this._clip)
                (this._referenceCount > 0) && (this._clip._removeReference(this._referenceCount));
            if (value) {
                var clipNodes = value._nodes;
                var count = clipNodes.count;
                this._currentFrameIndices = new Int16Array(count);
                this._resetFrameIndices();
                (this._referenceCount > 0) && (value._addReference(this._referenceCount));
                this._realtimeDatas.length = count;
            }
            this._clip = value;
        }
    }
    _eventStateUpdate(value) {
        this.event(AnimatorState2D.EVENT_OnStateUpdate, value);
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++)
                this._scripts[i].onStateUpdate(value);
        }
    }
    _eventStart(animator, layerIndex) {
        this.event(AnimatorState2D.EVENT_OnStateEnter);
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                this._scripts[i].setPlayScriptInfo(animator, layerIndex, this);
                this._scripts[i].onStateEnter();
            }
        }
    }
    _eventExit() {
        this.event(AnimatorState2D.EVENT_OnStateExit);
        if (this._scripts) {
            for (let i = 0, n = this._scripts.length; i < n; i++) {
                this._scripts[i].onStateExit();
            }
        }
    }
    _eventtransition(normalizeTime, paramsMap, isReplay) {
        let soloNums = this.soloTransitions.length;
        if (soloNums > 0) {
            for (var i = 0; i < soloNums; i++) {
                if (this.soloTransitions[i].check(normalizeTime, paramsMap, isReplay))
                    return this.soloTransitions[i];
            }
            return null;
        }
        let transNums = this.transitions.length;
        for (var i = 0; i < transNums; i++) {
            if (this.transitions[i].check(normalizeTime, paramsMap, isReplay))
                return this.transitions[i];
        }
        return null;
    }
    _resetFrameIndices() {
        for (var i = 0, n = this._currentFrameIndices.length; i < n; i++)
            this._currentFrameIndices[i] = -1;
    }
    _getReferenceCount() {
        return this._referenceCount;
    }
    _addReference(count) {
        (this._clip) && (this._clip._addReference(count));
        this._referenceCount += count;
    }
    _removeReference(count) {
        (this._clip) && (this._clip._removeReference(count));
        this._referenceCount -= count;
    }
    _clearReference() {
        this._removeReference(-this._referenceCount);
    }
    addScript(type) {
        var script = new type();
        this._scripts = this._scripts || [];
        this._scripts.push(script);
        return script;
    }
    getScript(type) {
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                var script = this._scripts[i];
                if (script instanceof type)
                    return script;
            }
        }
        return null;
    }
    getScripts(type) {
        var coms = null;
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                var script = this._scripts[i];
                if (script instanceof type) {
                    coms = coms || [];
                    coms.push(script);
                }
            }
        }
        return coms;
    }
    clone() {
        var dest = new AnimatorState2D();
        this.cloneTo(dest);
        return dest;
    }
    cloneTo(destObject) {
        var dest = destObject;
        dest.name = this.name;
        dest.speed = this.speed;
        dest.clip = this._clip;
    }
    destroy() {
        this._clip = null;
        this._currentFrameIndices = null;
        this._scripts = null;
        this._realtimeDatas.length = 0;
    }
}
AnimatorState2D.EVENT_OnStateEnter = "OnStartEnter";
AnimatorState2D.EVENT_OnStateUpdate = "OnStateUpdate";
AnimatorState2D.EVENT_OnStateExit = "OnStateExit";

//# sourceMappingURL=AnimatorState2D.js.map
