import { EventDispatcher } from "../../../events/EventDispatcher";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { KeyFrameValueType } from "./KeyframeNodeOwner";
export class AnimatorState extends EventDispatcher {
    constructor() {
        super();
        this._referenceCount = 0;
        this._clip = null;
        this._nodeOwners = [];
        this._currentFrameIndices = null;
        this._isLooping = 0;
        this._realtimeDatas = [];
        this._scripts = null;
        this._transitions = [];
        this._soloTransitions = [];
        this.speed = 1.0;
        this.clipStart = 0.0;
        this.clipEnd = 1.0;
        this.cycleOffset = 0;
    }
    get clip() {
        return this._clip;
    }
    set clip(value) {
        if (this._clip !== value) {
            if (this._clip)
                (this._referenceCount > 0) && (this._clip._removeReference(this._referenceCount));
            if (value) {
                var realtimeDatas = this._realtimeDatas;
                var clipNodes = value._nodes;
                var count = clipNodes.count;
                this._currentFrameIndices = new Int16Array(count);
                this._resetFrameIndices();
                (this._referenceCount > 0) && (value._addReference(this._referenceCount));
                this._realtimeDatas.length = count;
                for (var i = 0; i < count; i++) {
                    switch (clipNodes.getNodeByIndex(i).type) {
                        case KeyFrameValueType.Float:
                            break;
                        case KeyFrameValueType.Position:
                        case KeyFrameValueType.Scale:
                        case KeyFrameValueType.RotationEuler:
                        case KeyFrameValueType.Vector3:
                            realtimeDatas[i] = new Vector3();
                            break;
                        case KeyFrameValueType.Rotation:
                            realtimeDatas[i] = new Quaternion();
                            break;
                        case KeyFrameValueType.Vector2:
                            realtimeDatas[i] = new Vector2();
                            break;
                        case KeyFrameValueType.Vector4:
                        case KeyFrameValueType.Color:
                            realtimeDatas[i] = new Vector4();
                            break;
                        default:
                            throw "AnimationClipParser04:unknown type.";
                    }
                }
            }
            this._clip = value;
        }
    }
    get islooping() {
        if (0 != this._isLooping) {
            return 1 == this._isLooping;
        }
        return this._clip.islooping;
    }
    get transitions() {
        return this._transitions;
    }
    set transitions(value) {
        this._transitions = value;
    }
    get soloTransitions() {
        return this._soloTransitions;
    }
    set soloTransitions(value) {
        this._soloTransitions = value;
    }
    _eventStart(animator, layerIndex) {
        this.event(AnimatorState.EVENT_OnStateEnter);
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++) {
                this._scripts[i].setPlayScriptInfo(animator, layerIndex, this);
                this._scripts[i].onStateEnter();
            }
        }
    }
    _eventExit() {
        this.event(AnimatorState.EVENT_OnStateExit);
        this.curTransition = null;
        if (this._scripts) {
            for (let i = 0, n = this._scripts.length; i < n; i++) {
                this._scripts[i].onStateExit();
            }
        }
    }
    _eventStateUpdate(value) {
        this.event(AnimatorState.EVENT_OnStateUpdate, value);
        if (this._scripts) {
            for (var i = 0, n = this._scripts.length; i < n; i++)
                this._scripts[i].onStateUpdate(value);
        }
    }
    _eventtransition(normalizeTime, paramsMap) {
        let soloNums = this._soloTransitions.length;
        if (soloNums > 0) {
            for (var i = 0; i < soloNums; i++) {
                if (this._soloTransitions[i].check(normalizeTime, paramsMap))
                    return this._soloTransitions[i];
            }
            return null;
        }
        let transNums = this._transitions.length;
        for (var i = 0; i < transNums; i++) {
            if (this._transitions[i].check(normalizeTime, paramsMap))
                return this._transitions[i];
        }
        return null;
    }
    _getReferenceCount() {
        return this._referenceCount;
    }
    _addReference(count = 1) {
        (this._clip) && (this._clip._addReference(count));
        this._referenceCount += count;
    }
    _removeReference(count = 1) {
        (this._clip) && (this._clip._removeReference(count));
        this._referenceCount -= count;
    }
    _clearReference() {
        this._removeReference(-this._referenceCount);
    }
    _resetFrameIndices() {
        for (var i = 0, n = this._currentFrameIndices.length; i < n; i++)
            this._currentFrameIndices[i] = -1;
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
    cloneTo(destObject) {
        var dest = destObject;
        dest.name = this.name;
        dest.speed = this.speed;
        dest.clipStart = this.clipStart;
        dest.clipEnd = this.clipEnd;
        dest.clip = this._clip;
    }
    clone() {
        var dest = new AnimatorState();
        this.cloneTo(dest);
        return dest;
    }
}
AnimatorState.EVENT_OnStateEnter = "OnStartEnter";
AnimatorState.EVENT_OnStateUpdate = "OnStateUpdate";
AnimatorState.EVENT_OnStateExit = "OnStateExit";

//# sourceMappingURL=AnimatorState.js.map
