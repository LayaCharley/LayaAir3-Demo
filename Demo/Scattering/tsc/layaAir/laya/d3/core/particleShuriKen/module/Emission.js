export class Emission {
    constructor() {
        this._emissionRate = 10;
        this._emissionRateOverDistance = 0;
        this._destroyed = false;
        this._bursts = [];
    }
    set emissionRate(value) {
        if (value < 0)
            throw new Error("ParticleBaseShape:emissionRate value must large or equal than 0.");
        this._emissionRate = value;
    }
    get emissionRate() {
        return this._emissionRate;
    }
    get emissionRateOverDistance() {
        return this._emissionRateOverDistance;
    }
    set emissionRateOverDistance(value) {
        value = Math.max(0, value);
        this._emissionRateOverDistance = value;
    }
    get destroyed() {
        return this._destroyed;
    }
    destroy() {
        this._bursts = null;
        this._destroyed = true;
    }
    getBurstsCount() {
        return this._bursts.length;
    }
    getBurstByIndex(index) {
        return this._bursts[index];
    }
    addBurst(burst) {
        var burstsCount = this._bursts.length;
        if (burstsCount > 0)
            for (var i = 0; i < burstsCount; i++) {
                if (this._bursts[i].time > burst.time)
                    this._bursts.splice(i, 0, burst);
            }
        this._bursts.push(burst);
    }
    removeBurst(burst) {
        var index = this._bursts.indexOf(burst);
        if (index !== -1) {
            this._bursts.splice(index, 1);
        }
    }
    removeBurstByIndex(index) {
        this._bursts.splice(index, 1);
    }
    clearBurst() {
        this._bursts.length = 0;
    }
    cloneTo(destObject) {
        var destEmission = destObject;
        var destBursts = destEmission._bursts;
        destBursts.length = this._bursts.length;
        for (var i = 0, n = this._bursts.length; i < n; i++) {
            var destBurst = destBursts[i];
            if (destBurst)
                this._bursts[i].cloneTo(destBurst);
            else
                destBursts[i] = this._bursts[i].clone();
        }
        destEmission._emissionRate = this._emissionRate;
        destEmission._emissionRateOverDistance = this._emissionRateOverDistance;
        destEmission.enable = this.enable;
    }
    clone() {
        var destEmission = new Emission();
        this.cloneTo(destEmission);
        return destEmission;
    }
}

//# sourceMappingURL=Emission.js.map
