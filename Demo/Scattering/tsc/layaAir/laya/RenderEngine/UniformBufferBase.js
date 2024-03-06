export class UniformBufferBase {
    constructor(name, pointer, single) {
        this._mapArray = [];
        this._blockName = name;
        this._singgle = single;
        this._glPointerID = pointer;
    }
    add(buffer) {
        let index = this._mapArray.indexOf(buffer);
        if (index == -1)
            this._mapArray.push(buffer);
    }
    splitBuffer(buffer) {
        let index = this._mapArray.indexOf(buffer);
        if (index != -1)
            this._mapArray.splice(index, 1);
    }
}

//# sourceMappingURL=UniformBufferBase.js.map
