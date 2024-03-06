export class LightQueue {
    constructor() {
        this._length = 0;
        this._elements = [];
    }
    add(light) {
        let index = this._elements.indexOf(light);
        if (index != -1 && index < this._length) {
            return;
        }
        if (this._length === this._elements.length)
            this._elements.push(light);
        else
            this._elements[this._length] = light;
        this._length++;
    }
    remove(light) {
        var index = this._elements.indexOf(light);
        if (index == -1)
            return;
        this._length--;
        if (index !== this._length) {
            var end = this._elements[this._length];
            this._elements[index] = end;
        }
    }
    shift() {
        this._length--;
        return this._elements.shift();
    }
    getBrightestLight() {
        var maxIntIndex;
        var maxIntensity = -1;
        var elements = this._elements;
        for (var i = 0; i < this._length; i++) {
            var intensity = elements[i]._intensity;
            if (maxIntensity < intensity) {
                maxIntensity = intensity;
                maxIntIndex = i;
            }
        }
        return maxIntIndex;
    }
    normalLightOrdering(brightestIndex) {
        var firstLight = this._elements[0];
        this._elements[0] = this._elements[brightestIndex];
        this._elements[brightestIndex] = firstLight;
    }
}
export class AlternateLightQueue extends LightQueue {
    remove(light) {
        var index = this._elements.indexOf(light);
        this._elements.splice(index, 1);
        this._length--;
    }
}

//# sourceMappingURL=LightQueue.js.map
