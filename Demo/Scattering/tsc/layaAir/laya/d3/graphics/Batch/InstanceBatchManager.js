import { BatchMark } from "../../core/render/BatchMark";
export class InstanceBatchManager {
    constructor() {
        this._instanceBatchOpaqueMarks = [];
        this.updateCountMark = 0;
    }
    _getData(key, data, cls) {
        if (null == cls) {
            cls = Array;
        }
        if ("boolean" == typeof key) {
            return (data[key ? 0 : 1]) || (data[key ? 0 : 1] = new cls());
        }
        else {
            return data[key] || (data[key] = new cls());
        }
    }
    getInstanceBatchOpaquaMark(receiveShadow, materialID, subMeshID, invertFace, reflectionprob) {
        var data = this._getData(receiveShadow, this._instanceBatchOpaqueMarks);
        data = this._getData(materialID, data);
        data = this._getData(subMeshID, data);
        data = this._getData(invertFace, data);
        return this._getData(reflectionprob, data, BatchMark);
    }
}
InstanceBatchManager.instance = new InstanceBatchManager();

//# sourceMappingURL=InstanceBatchManager.js.map
