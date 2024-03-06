export class DefineDatas {
    constructor() {
        this._mask = [];
        this._length = 0;
    }
    _intersectionDefineDatas(define) {
        var unionMask = define._mask;
        var mask = this._mask;
        for (var i = this._length - 1; i >= 0; i--) {
            var value = mask[i] & unionMask[i];
            if (value == 0 && i == this._length - 1)
                this._length--;
            else
                mask[i] = value;
        }
    }
    add(define) {
        var index = define._index;
        var size = index + 1;
        var mask = this._mask;
        var maskStart = this._length;
        if (maskStart < size) {
            (mask.length < size) && (mask.length = size);
            for (; maskStart < index; maskStart++)
                mask[maskStart] = 0;
            mask[index] = define._value;
            this._length = size;
        }
        else {
            mask[index] |= define._value;
        }
    }
    remove(define) {
        var index = define._index;
        var mask = this._mask;
        var endIndex = this._length - 1;
        if (index > endIndex)
            return;
        var newValue = mask[index] & ~define._value;
        if (index == endIndex && newValue === 0)
            this._length--;
        else
            mask[index] = newValue;
    }
    addDefineDatas(define) {
        var addMask = define._mask;
        var size = define._length;
        var mask = this._mask;
        var maskStart = this._length;
        if (maskStart < size) {
            mask.length = size;
            for (var i = 0; i < maskStart; i++)
                mask[i] |= addMask[i];
            for (; i < size; i++)
                mask[i] = addMask[i];
            this._length = size;
        }
        else {
            for (var i = 0; i < size; i++) {
                mask[i] |= addMask[i];
            }
        }
    }
    removeDefineDatas(define) {
        var removeMask = define._mask;
        var mask = this._mask;
        var endIndex = this._length - 1;
        var i = Math.min(define._length, endIndex);
        for (; i >= 0; i--) {
            var newValue = mask[i] & ~removeMask[i];
            if (i == endIndex && newValue === 0) {
                endIndex--;
                this._length--;
            }
            else {
                mask[i] = newValue;
            }
        }
    }
    has(define) {
        var index = define._index;
        if (index >= this._length)
            return false;
        return (this._mask[index] & define._value) !== 0;
    }
    clear() {
        this._length = 0;
    }
    cloneTo(destObject) {
        var destDefineData = destObject;
        var destMask = destDefineData._mask;
        var mask = this._mask;
        var count = this._length;
        destMask.length = count;
        for (var i = 0; i < count; i++)
            destMask[i] = mask[i];
        destDefineData._length = count;
    }
    clone() {
        var dest = new DefineDatas();
        this.cloneTo(dest);
        return dest;
    }
    destroy() {
        delete this._mask;
    }
}

//# sourceMappingURL=DefineDatas.js.map
