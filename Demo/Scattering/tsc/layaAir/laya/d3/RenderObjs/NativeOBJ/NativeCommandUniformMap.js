import { CommandUniformMap } from "../../../RenderEngine/CommandUniformMap";
export class NativeCommandUniformMap extends CommandUniformMap {
    constructor(_nativeObj, stateName) {
        super(stateName);
        this._nativeObj = _nativeObj;
    }
    hasPtrID(propertyID) {
        return this._nativeObj.hasPtrID(propertyID);
    }
    getMap() {
        return this._idata;
    }
    addShaderUniform(propertyID, propertyKey) {
        this._nativeObj.addShaderUniform(propertyID, propertyKey);
    }
}

//# sourceMappingURL=NativeCommandUniformMap.js.map
