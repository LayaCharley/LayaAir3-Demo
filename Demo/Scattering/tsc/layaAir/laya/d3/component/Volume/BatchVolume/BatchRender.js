import { Vector3 } from "../../../../maths/Vector3";
import { SingletonList } from "../../../../utils/SingletonList";
import { BaseRender, RenderBitFlag } from "../../../core/render/BaseRender";
const tempVec = new Vector3();
const tempVec1 = new Vector3();
export class BatchRender extends BaseRender {
    constructor() {
        super();
        this._lodInstanceRenderElement = {};
        this._RenderBitFlag = RenderBitFlag.RenderBitFlag_Batch;
        this._renderElements = [];
        this._lodInstanceRenderElement[-1] = [];
        this._batchList = new SingletonList();
    }
    get checkLOD() {
        return this._checkLOD;
    }
    set checkLOD(value) {
        this._checkLOD = value;
    }
    set lodCullRateArray(value) {
        if (!this._checkLOD) {
            return;
        }
        value.sort((a, b) => b - a);
        this._lodRateArray = value;
    }
    get lodCullRateArray() {
        return this._lodRateArray;
    }
    _canBatch(render) {
        if (render._batchRender) {
            return false;
        }
        return false;
    }
    _onEnable() {
        super._onEnable();
        if (this._batchList) {
            for (let i = 0, n = this._batchList.length; i < n; i++) {
                this._batchList.elements[i].setRenderbitFlag(this._RenderBitFlag, true);
            }
        }
    }
    _onDisable() {
        super._onDisable();
        if (this._batchList) {
            for (let i = 0, n = this._batchList.length; i < n; i++) {
                this._batchList.elements[i].setRenderbitFlag(this._RenderBitFlag, false);
            }
        }
    }
    _changeLOD(lod) {
        if (this._cacheLod == lod) {
            return;
        }
        if (this._cacheLod == this.lodCullRateArray.length - 1) {
            lod = -1;
        }
        this._renderElements = this._lodInstanceRenderElement[lod];
        if (this._lodInstanceRenderElement[lod] && lod != -1) {
            this._renderElements || (this._renderElements = []);
            this._renderElements = this._renderElements.concat(this._lodInstanceRenderElement[-1]);
        }
        else {
            this._renderElements = this._lodInstanceRenderElement[-1];
        }
    }
    onPreRender() {
        if (!this.checkLOD || !this._lodRateArray || this._lodRateArray.length < 1) {
            this._changeLOD(0);
        }
        else {
            let checkCamera = this.owner.scene.cullInfoCamera;
            let maxYDistance = checkCamera.maxlocalYDistance;
            Vector3.subtract(this._bounds.getCenter(), checkCamera.transform.position, tempVec);
            let length = tempVec.length();
            let rateYDistance = length / checkCamera.farPlane * maxYDistance;
            let rate = (this._lodsize / rateYDistance);
            for (let i = 0; i < this._lodRateArray.length; i++) {
                if (rate < this._lodRateArray[i])
                    continue;
                this._changeLOD(i);
                break;
            }
        }
    }
    _batchOneRender(render) {
        return false;
    }
    _removeOneRender(render) {
    }
    _updateOneRender(render) {
    }
    addList(renderNode) {
        for (var i = 0, n = renderNode.length; i < n; i++) {
            let baseRender = renderNode[i];
            if (this._canBatch(baseRender)) {
                this._batchList.add(baseRender);
            }
        }
    }
    reBatch() {
        let renderNums = this._batchList.length;
        let renders = this._batchList.elements;
        for (var i = 0; i < renderNums; i++) {
            let render = renders[i];
            this._batchOneRender(render);
        }
    }
    _restorRenderNode() {
        for (let i = 0, n = this._batchList.length; i < n; i++) {
            this._removeOneRender(this._batchList.elements[i]);
        }
    }
    _clear() {
        this._restorRenderNode();
        this._renderElements = [];
        this._batchList.destroy();
        this._batchList = new SingletonList();
        this._lodInstanceRenderElement = {};
        this._lodInstanceRenderElement[-1] = [];
    }
}

//# sourceMappingURL=BatchRender.js.map
