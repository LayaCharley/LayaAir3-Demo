export class Burst {
    constructor(time = 0, minCount = 0, maxCount = 0) {
        this._time = time;
        this._minCount = minCount;
        this._maxCount = maxCount;
    }
    get time() {
        return this._time;
    }
    get minCount() {
        return this._minCount;
    }
    get maxCount() {
        return this._maxCount;
    }
    cloneTo(destObject) {
        var destBurst = destObject;
        destBurst._time = this._time;
        destBurst._minCount = this._minCount;
        destBurst._maxCount = this._maxCount;
    }
    clone() {
        var destBurst = new Burst(this._time, this._minCount, this._maxCount);
        this.cloneTo(destBurst);
        return destBurst;
    }
}

//# sourceMappingURL=Burst.js.map
