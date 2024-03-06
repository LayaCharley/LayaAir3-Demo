import { UnifromBufferData } from "./UniformBufferData";
export class SubUniformBufferData extends UnifromBufferData {
    constructor(uniformParamsStat, bufferOffset) {
        super(uniformParamsStat);
        this._isInPool = false;
        this._needUpdate = false;
        this._realByte = 0;
        this._offset = bufferOffset;
        this._realByte = this._bytelength;
        this._bytelength = Math.ceil(this._bytelength / 256) * 256;
    }
}

//# sourceMappingURL=SubUniformBufferData.js.map
