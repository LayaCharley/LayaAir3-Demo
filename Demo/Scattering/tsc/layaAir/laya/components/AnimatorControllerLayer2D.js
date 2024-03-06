import { AnimatorPlayState2D } from "./AnimatorPlayState2D";
export class AnimatorControllerLayer2D {
    constructor(name) {
        this._referenceCount = 0;
        this._playStateInfo = new AnimatorPlayState2D();
        this._crossPlayStateInfo = new AnimatorPlayState2D();
        this._crossMark = 0;
        this._crossNodesOwnersCount = 0;
        this._crossNodesOwnersIndicesMap = {};
        this._srcCrossClipNodeIndices = [];
        this._destCrossClipNodeIndices = [];
        this.playOnWake = true;
        this.defaultWeight = 1.0;
        this.blendingMode = AnimatorControllerLayer2D.BLENDINGMODE_OVERRIDE;
        this.enable = true;
        this._states = [];
        this._playType = -1;
        this.name = name;
    }
    set states(states) {
        if (this._states === states)
            return;
        for (let i = this.states.length - 1; i >= 0; i--) {
            this.removeState(this.states[i]);
        }
        for (let i = states.length - 1; i >= 0; i--) {
            this.addState(states[i]);
        }
    }
    get states() {
        return this._states;
    }
    set defaultStateName(str) {
        this._defaultState = this.getStateByName(str);
        if (null == this._defaultState) {
            if (0 == this._states.length) {
                this._defaultStateNameCatch = str;
            }
            else {
                for (var i = this._states.length - 1; i >= 0; i--) {
                    if (this._states[i].name == str) {
                        this._defaultState = this._states[i];
                        break;
                    }
                }
            }
        }
    }
    get defaultStateName() {
        if (!this._defaultState) {
            return null;
        }
        return this._defaultState.name;
    }
    get defaultState() {
        return this._defaultState;
    }
    set defaultState(value) {
        this._defaultState = value;
    }
    _removeClip(clipStateInfos, index, state) {
        clipStateInfos.splice(index, 1);
    }
    _getReferenceCount() {
        return this._referenceCount;
    }
    _addReference(count) {
        for (var i = 0, n = this._states.length; i < n; i++)
            this._states[i]._addReference(count);
        this._referenceCount += count;
    }
    _removeReference(count = 1) {
        for (var i = 0, n = this._states.length; i < n; i++)
            this._states[i]._removeReference(count);
        this._referenceCount -= count;
    }
    _clearReference() {
        this._removeReference(-this._referenceCount);
    }
    getCurrentPlayState() {
        return this._playStateInfo;
    }
    getStateByName(str) {
        for (let i = this._states.length - 1; i >= 0; i--) {
            if (this._states[i].name == str) {
                return this._states[i];
            }
        }
        return null;
    }
    addState(state) {
        var stateName = state.name;
        if (this.getStateByName(stateName)) {
            throw "AnimatorControllerLayer:this stat's name has exist.";
        }
        else {
            this._states.push(state);
            if (stateName == this._defaultStateNameCatch) {
                this._defaultState = state;
                this._defaultStateNameCatch = null;
            }
        }
    }
    removeState(state) {
        var states = this._states;
        var index = -1;
        for (var i = 0, n = states.length; i < n; i++) {
            if (states[i] === state) {
                index = i;
                break;
            }
        }
        if (-1 != index)
            this._removeClip(states, index, state);
    }
    clone() {
        var dest = new AnimatorControllerLayer2D(this.name);
        this.cloneTo(dest);
        return dest;
    }
    cloneTo(destObject) {
        var dest = destObject;
        dest.name = this.name;
    }
    destroy() {
        this._removeReference();
        for (var i = 0, n = this._states.length; i < n; i++) {
            this._states[i].destroy();
        }
        this._states.length = 0;
    }
}
AnimatorControllerLayer2D.BLENDINGMODE_OVERRIDE = 0;
AnimatorControllerLayer2D.BLENDINGMODE_ADDTIVE = 1;

//# sourceMappingURL=AnimatorControllerLayer2D.js.map
