export class ValueChanger {
    constructor() {
        this.preValue = 0;
    }
    get value() {
        if (this.target) {
            this._tValue = this.target[this.key];
        }
        return this._tValue;
    }
    set value(nValue) {
        this._tValue = nValue;
        if (this.target) {
            this.target[this.key] = nValue;
        }
    }
    get dValue() {
        return this.value - this.preValue;
    }
    get scaleValue() {
        return this.value / this.preValue;
    }
    record() {
        this.preValue = this.value;
    }
    showValueByAdd(addValue) {
        this.value = this.preValue + addValue;
    }
    showValueByScale(scale) {
        this.value = this.preValue * scale;
    }
    recover() {
        this.value = this.preValue;
    }
    dispose() {
        this.target = null;
    }
    static create(target, key) {
        var rst;
        rst = new ValueChanger();
        rst.target = target;
        rst.key = key;
        return rst;
    }
}
