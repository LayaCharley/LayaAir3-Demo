export class AnimatorPlayState2D {
    constructor() {
        this._currentState = null;
        this._frontPlay = true;
    }
    get duration() {
        return this._duration;
    }
    get animatorState() {
        return this._currentState;
    }
    _resetPlayState(startTime, clipDuration) {
        this._finish = false;
        this._startPlayTime = startTime;
        this._elapsedTime = startTime;
        this._lastIsFront = true;
        this._parentPlayTime = null;
        this._playNum = 0;
        this._parentPlayTime = null;
        this._playAllTime = 0;
        var playTime = (this._elapsedTime / clipDuration) % 1.0;
        this._normalizedPlayTime = playTime < 0 ? playTime + 1.0 : playTime;
        this._frontPlay = true;
    }
    _cloneTo(dest) {
        dest._finish = this._finish;
        dest._startPlayTime = this._startPlayTime;
        dest._elapsedTime = this._elapsedTime;
        dest._playNum = this._playNum;
        dest._parentPlayTime = this._parentPlayTime;
        dest._normalizedPlayTime = this._normalizedPlayTime;
        dest._lastIsFront = this._lastIsFront;
        dest._frontPlay = this._frontPlay;
        dest._playAllTime = this._playAllTime;
    }
}

//# sourceMappingURL=AnimatorPlayState2D.js.map
