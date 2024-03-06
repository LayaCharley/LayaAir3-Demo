import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { SubUniformBufferData } from "../../RenderEngine/SubUniformBufferData";
export class TransLargeUBOUtils {
    constructor(UBO, paramsMap, defautSubData) {
        this.currentlength = 0;
        this.bindUBO = UBO;
        this.defaultSubData = defautSubData;
        UBO._reset(TransLargeUBOUtils.configStartLength * this.defaultSubData.getbyteLength());
        this.subDataParamMap = paramsMap;
        this.maxlength = TransLargeUBOUtils.configStartLength;
        this.subDataMap = [];
        this.pool = [];
        this.subDataMap.push(defautSubData);
        this.currentlength++;
    }
    create() {
        if (this.pool.length > 0) {
            const re = this.pool.pop();
            re._isInPool = false;
            return re;
        }
        if (this.maxlength == this.currentlength)
            this.reset();
        let uniformMap = new Map();
        this.subDataParamMap.forEach((value, key) => {
            uniformMap.set(Shader3D.propertyNameToID(key), value);
        });
        let subdata = new SubUniformBufferData(uniformMap, this.currentlength++);
        this.subDataMap.push(subdata);
        return subdata;
    }
    recover(subModuleData) {
        if (!subModuleData._isInPool) {
            this.pool.push(subModuleData);
            subModuleData._isInPool = true;
        }
    }
    reset() {
        this.maxlength += TransLargeUBOUtils.addStep;
        this.bindUBO._reset(this.maxlength * this.defaultSubData.getbyteLength());
        this.subDataMap.forEach(element => {
            this.bindUBO.setDataByByUniformBufferDataOffset(element, element._offset);
        });
    }
    updateSubData(data) {
        this.bindUBO.setDataByByUniformBufferDataOffset(data, data._offset);
        data._needUpdate = false;
    }
    updateBindRange(data) {
        let bytelenth = data.getbyteLength();
        this.bindUBO._bindBufferRange(data._offset * bytelenth, bytelenth);
    }
    destroy() {
        this.subDataMap.forEach(element => {
            element.destroy();
        });
        delete this.subDataMap;
        delete this.pool;
        this.subDataMap = null;
        this.pool = null;
    }
}
TransLargeUBOUtils.configStartLength = 1024;
TransLargeUBOUtils.addStep = 512;

//# sourceMappingURL=TransLargeUBOUtils.js.map
