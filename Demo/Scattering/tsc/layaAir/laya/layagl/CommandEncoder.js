export class CommandEncoder {
    constructor() {
        this._idata = [];
    }
    getArrayData() {
        return this._idata;
    }
    getCount() {
        return this._idata.length;
    }
    addShaderUniform(variable) {
        this._idata.push(variable);
    }
}

//# sourceMappingURL=CommandEncoder.js.map
