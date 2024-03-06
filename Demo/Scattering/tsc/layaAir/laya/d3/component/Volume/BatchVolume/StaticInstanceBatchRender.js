import { SingletonList } from "../../../../utils/SingletonList";
import { RenderBitFlag } from "../../../core/render/BaseRender";
import { InstanceRenderElement } from "../../../core/render/InstanceRenderElement";
import { RenderElement } from "../../../core/render/RenderElement";
import { InstanceBatchManager } from "../../../graphics/Batch/InstanceBatchManager";
import { Bounds } from "../../../math/Bounds";
import { BatchRender } from "./BatchRender";
export class StaticInstanceBatchRender extends BatchRender {
    constructor() {
        super();
        this._insBatchMarksNums = [];
        this._insElementMarksArray = [];
        this._instanceBatchminNums = 10;
        this._updateChangeElement = [];
        this.checkLOD = true;
        this._batchManager = new InstanceBatchManager();
        this._RenderBitFlag = RenderBitFlag.RenderBitFlag_InstanceBatch;
    }
    _isRenderNodeAllCanInstanceBatch(render) {
        let elements = render._renderElements;
        for (var i = 0, n = elements.length; i < n; i++) {
            let element = elements[i];
            if (!element.material._shader._enableInstancing || element.render.lightmapIndex > 0) {
                return false;
            }
        }
        return true;
    }
    _sumInstanceBatch(render) {
        let elements = render._renderElements;
        for (var i = 0, n = elements.length; i < n; i++) {
            let element = elements[i];
            var insBatchMarks = this._batchManager.getInstanceBatchOpaquaMark(element.render.receiveShadow, element.material.id, element._geometry._id, element.transform ? element.transform._isFrontFaceInvert : false, element.render._probReflection ? element.render._probReflection.id : -1);
            if (insBatchMarks.indexInList == -1) {
                insBatchMarks.indexInList = this._insBatchMarksNums.length;
                this._insBatchMarksNums.push(0);
            }
            this._insBatchMarksNums[insBatchMarks.indexInList] += 1;
        }
    }
    _batchOneElement(element, render) {
        var insBatchMarks = this._batchManager.getInstanceBatchOpaquaMark(element.render.receiveShadow, element.material.id, element._geometry._id, element.transform ? element.transform._isFrontFaceInvert : false, element.render._probReflection ? element.render._probReflection.id : -1);
        if (insBatchMarks.indexInList == -1)
            return;
        let instanceelement = this._insElementMarksArray[insBatchMarks.indexInList];
        if (!instanceelement) {
            instanceelement = this._createInstanceElement(element, render, insBatchMarks);
        }
        let list = instanceelement._instanceBatchElementList;
        if (list.length == InstanceRenderElement.maxInstanceCount) {
            this._insBatchMarksNums.push(this._insBatchMarksNums[insBatchMarks.indexInList]);
            insBatchMarks.indexInList = this._insBatchMarksNums.length - 1;
            instanceelement = this._createInstanceElement(element, render, insBatchMarks);
            list = instanceelement._instanceBatchElementList;
        }
        if (list.indexof(element) == -1) {
            list.add(element);
            instanceelement._isUpdataData = true;
            (this._updateChangeElement.indexOf(instanceelement) == -1) && this._updateChangeElement.push(instanceelement);
            element._batchElement = instanceelement;
        }
    }
    _removeOneElement(element, render) {
        var insBatchMarks = this._batchManager.getInstanceBatchOpaquaMark(element.render.receiveShadow, element.material.id, element._geometry._id, element.transform ? element.transform._isFrontFaceInvert : false, element.render._probReflection ? element.render._probReflection.id : -1);
        if (insBatchMarks.indexInList == -1)
            return;
        let instanceelement = element._batchElement;
        if (!instanceelement || this._renderElements.indexOf(instanceelement) == -1) {
            return;
        }
        let list = instanceelement._instanceBatchElementList;
        if (list.indexof(element) != -1) {
            list.remove(element);
            instanceelement._isUpdataData = true;
            (this._updateChangeElement.indexOf(instanceelement) == -1) && this._updateChangeElement.push(instanceelement);
            element._batchElement = null;
        }
    }
    _updateOneElement(element, render) {
        let instanceelement = element._batchElement;
        if (!instanceelement || this._renderElements.indexOf(instanceelement) == -1) {
            return;
        }
        let list = instanceelement._instanceBatchElementList;
        if (list.indexof(element) != -1) {
            instanceelement._isUpdataData = true;
            (this._updateChangeElement.indexOf(instanceelement) == -1) && this._updateChangeElement.push(instanceelement);
        }
    }
    _createInstanceElement(element, render, batchMark) {
        let instanceRenderElement = new InstanceRenderElement();
        instanceRenderElement.render = render;
        instanceRenderElement.renderType = RenderElement.RENDERTYPE_INSTANCEBATCH;
        instanceRenderElement._geometry.subMesh = element._geometry;
        instanceRenderElement.material = element.material;
        instanceRenderElement.setTransform(null);
        instanceRenderElement.renderSubShader = element.renderSubShader;
        let list = instanceRenderElement._instanceBatchElementList;
        list.length = 0;
        list.add(element);
        this._insElementMarksArray[batchMark.indexInList] = instanceRenderElement;
        batchMark.batched = true;
        if (!this._lodInstanceRenderElement[render._LOD]) {
            this._lodInstanceRenderElement[render._LOD] = [];
        }
        this._lodInstanceRenderElement[render._LOD].push(instanceRenderElement);
        return instanceRenderElement;
    }
    _canBatch(render) {
        let elements = render._renderElements;
        for (var i = 0, n = elements.length; i < n; i++) {
            let element = elements[i];
            var insBatchMarks = this._batchManager.getInstanceBatchOpaquaMark(element.render.receiveShadow, element.material.id, element._geometry._id, element.transform ? element.transform._isFrontFaceInvert : false, element.render._probReflection ? element.render._probReflection.id : -1);
            if (this._insBatchMarksNums[insBatchMarks.indexInList] < this._instanceBatchminNums || element.material.renderQueue >= 3000) {
                return false;
            }
        }
        return true;
    }
    _calculateBoundingBox() {
        let bound = this._bounds;
        for (let i = 0, n = this._batchList.length; i < n; i++) {
            if (i == 0) {
                this._batchList.elements[i].bounds.cloneTo(bound);
            }
            else {
                Bounds.merge(bound, this._batchList.elements[i].bounds, bound);
            }
        }
        let extend = this._bounds.getExtent();
        this._lodsize = 2 * Math.max(extend.x, extend.y, extend.z);
        return this._bounds;
    }
    _onDestroy() {
        super._onDestroy();
    }
    _batchOneRender(render) {
        if (!this._canBatch(render))
            return false;
        this.boundsChange = true;
        let elements = render._renderElements;
        for (let i = 0, n = elements.length; i < n; i++) {
            let renderelement = elements[i];
            this._batchOneElement(renderelement, render);
        }
        render._batchRender = this;
        render.setRenderbitFlag(RenderBitFlag.RenderBitFlag_InstanceBatch, true);
        return true;
    }
    _removeOneRender(render) {
        if (!this._canBatch(render))
            return;
        if (this._batchList.indexof(render) != -1) {
            this.boundsChange = true;
            let elements = render._renderElements;
            for (let i = 0, n = elements.length; i < n; i++) {
                let renderelement = elements[i];
                this._removeOneElement(renderelement, render);
            }
            render._batchRender = null;
            render.setRenderbitFlag(RenderBitFlag.RenderBitFlag_InstanceBatch, false);
        }
    }
    _updateOneRender(render) {
        if (!this._canBatch(render))
            return;
        if (this._batchList.indexof(render) != -1) {
            this.boundsChange = true;
            let elements = render._renderElements;
            for (let i = 0, n = elements.length; i < n; i++) {
                let renderelement = elements[i];
                this._updateOneElement(renderelement, render);
            }
        }
    }
    _clear() {
        super._clear();
        this._insElementMarksArray.forEach(element => {
            element && element.destroy();
        });
        this._insElementMarksArray = [];
        this._updateChangeElement = [];
        this._insBatchMarksNums = [];
    }
    addList(renderNodes) {
        if (!this._batchList) {
            this._batchList = new SingletonList();
        }
        let renders = [];
        for (var i = 0; i < renderNodes.length; i++) {
            let baseRender = renderNodes[i];
            if (baseRender._batchRender) {
                continue;
            }
            if (this._isRenderNodeAllCanInstanceBatch(baseRender)) {
                renders.push(baseRender);
                this._sumInstanceBatch(baseRender);
            }
        }
        for (var i = 0, n = renders.length; i < n; i++) {
            let baseRender = renders[i];
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
}

//# sourceMappingURL=StaticInstanceBatchRender.js.map
