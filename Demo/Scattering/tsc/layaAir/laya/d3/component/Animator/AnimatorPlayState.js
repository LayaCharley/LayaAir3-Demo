export class AnimatorPlayState {
    constructor() {
        this._currentState = null;
    }
    get currentState() {
        return this._currentState;
    }
    set currentState(value) {
        this._currentState = value;
        this._currentState.curTransition = null;
    }
    get normalizedTime() {
        return this._normalizedTime;
    }
    get duration() {
        return this._duration;
    }
    get animatorState() {
        return this._currentState;
    }
    _resetPlayState(startTime, clipDuration) {
        this._finish = false;
        this._playEventIndex = 0;
        this._startPlayTime = startTime;
        this._elapsedTime = startTime;
        this._lastIsFront = true;
        this._normalizedTime = this._elapsedTime / clipDuration;
        var playTime = this._normalizedTime % 1.0;
        this._normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
    }
    _cloneTo(dest) {
        dest._finish = this._finish;
        dest._startPlayTime = this._startPlayTime;
        dest._playEventIndex = this._playEventIndex;
        dest._elapsedTime = this._elapsedTime;
        dest._normalizedTime = this._normalizedTime;
        dest._normalizedPlayTime = this._normalizedPlayTime;
        dest._lastIsFront = this._lastIsFront;
    }
}

//# sourceMappingURL=AnimatorPlayState.js.map
