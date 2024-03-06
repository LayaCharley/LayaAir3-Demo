import { AnimatorPlayState } from "./AnimatorPlayState";
export class AnimatorControllerLayer {
    constructor(name) {
        this._referenceCount = 0;
        this._playType = -1;
        this._crossDuration = -1;
        this._crossMark = 0;
        this._crossNodesOwnersCount = 0;
        this._crossNodesOwners = [];
        this._crossNodesOwnersIndicesMap = {};
        this._srcCrossClipNodeIndices = [];
        this._destCrossClipNodeIndices = [];
        this._states = [];
        this._playStateInfo = new AnimatorPlayState();
        this._crossPlayStateInfo = new AnimatorPlayState();
        this.blendingMode = AnimatorControllerLayer.BLENDINGMODE_OVERRIDE;
        this.defaultWeight = 1.0;
        this.playOnWake = true;
        this.enable = true;
        this.name = name;
    }
    get defaultState() {
        return this._defaultState;
    }
    set defaultState(value) {
        this._defaultState = value;
    }
    get avatarMask() {
        return this._avatarMask;
    }
    set avatarMask(value) {
        this._avatarMask = value;
    }
    get defaultStateName() {
        if (!this._defaultState) {
            return null;
        }
        return this._defaultState.name;
    }
    set defaultStateName(value) {
        this._defaultState = this.getAnimatorState(value);
        if (null == this._defaultState) {
            if (0 == this._states.length) {
                this._defaultStateNameCatch = value;
            }
            else {
                for (var i = this._states.length - 1; i >= 0; i--) {
                    if (this._states[i].name == value) {
                        this._defaultState = this._states[i];
                        break;
                    }
                }
            }
        }
    }
    get states() {
        return this._states;
    }
    set states(states) {
        if (this._states === states)
            return;
        if (this._states.length > 0) {
            let removed = this._states.filter(s => states.indexOf(s) == -1);
            for (let state of removed)
                this.removeState(state);
        }
        if (states.length > 0) {
            let newAdded = states.filter(s => this._states.indexOf(s) == -1);
            for (let state of newAdded)
                this.addState(state);
        }
        this._states.length = 0;
        this._states.push(...states);
    }
    _removeClip(clipStateInfos, index, state) {
        var clip = state._clip;
        var clipStateInfo = clipStateInfos[index];
        clipStateInfos.splice(index, 1);
        if (this._animator) {
            var frameNodes = clip._nodes;
            var nodeOwners = clipStateInfo._nodeOwners;
            clip._removeReference();
            for (var i = 0, n = frameNodes.count; i < n; i++)
                this._animator._removeKeyframeNodeOwner(nodeOwners, frameNodes.getNodeByIndex(i));
        }
    }
    _getReferenceCount() {
        return this._referenceCount;
    }
    _addReference(count = 1) {
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
    getAnimatorState(name) {
        var state;
        ;
        for (let i = 0; i < this._states.length; i++) {
            if (this._states[i].name == name) {
                state = this._states[i];
                break;
            }
        }
        return state ? state : null;
    }
    addState(state) {
        var stateName = state.name;
        if (this.getAnimatorState(stateName)) {
            throw "AnimatorControllerLayer:this stat's name has exist.";
        }
        else {
            this._states.push(state);
            if (stateName == this._defaultStateNameCatch) {
                this._defaultState = state;
                this._defaultStateNameCatch = null;
            }
            if (this._animator) {
                (state._clip) && (state._clip._addReference());
                this._animator._getOwnersByClip(state);
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
        if (index !== -1)
            this._removeClip(states, index, state);
    }
    destroy() {
        this._clearReference();
        this._states = [];
        this._playStateInfo = null;
        this._crossPlayStateInfo = null;
        this._defaultState = null;
    }
    cloneTo(destObject) {
        var dest = destObject;
        dest.name = this.name;
        dest.blendingMode = this.blendingMode;
        dest.defaultWeight = this.defaultWeight;
        dest.playOnWake = this.playOnWake;
        this.avatarMask && (dest.avatarMask = this._avatarMask.clone());
    }
    clone() {
        var dest = new AnimatorControllerLayer(this.name);
        this.cloneTo(dest);
        return dest;
    }
}
AnimatorControllerLayer.BLENDINGMODE_OVERRIDE = 0;
AnimatorControllerLayer.BLENDINGMODE_ADDTIVE = 1;

//# sourceMappingURL=AnimatorControllerLayer.js.map
