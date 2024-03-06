export class CommandUniformMap {
    constructor(stateName) {
        this._idata = {};
        this._stateName = stateName;
    }
    hasPtrID(propertyID) {
        return !!(this._idata[propertyID] != null);
    }
    getMap() {
        return this._idata;
    }
    addShaderUniform(propertyID, propertyKey, uniformtype, block = null) {
        this._idata[propertyID] = { uniformtype: uniformtype, propertyName: propertyKey, block: block };
    }
    addShaderBlockUniform(propertyID, blockname, blockProperty) {
        this._idata[propertyID] = { propertyName: blockname, blockProperty: blockProperty };
        blockProperty.forEach(element => {
            this.addShaderUniform(element.id, element.propertyName, element.uniformtype, blockname);
        });
    }
}

//# sourceMappingURL=CommandUniformMap.js.map
