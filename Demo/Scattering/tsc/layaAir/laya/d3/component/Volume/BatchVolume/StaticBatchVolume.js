import { SingletonList } from "../../../../utils/SingletonList";
import { StaticFlag } from "../../../core/Sprite3D";
import { Volume } from "../Volume";
import { StaticInstanceBatchRender } from "./StaticInstanceBatchRender";
import { StatiVertexMergeBatchRender } from "./StatiVertexMergeBatchRender";
export class StaticBatchVolume extends Volume {
    constructor() {
        super();
        this._customBatchs = [];
        this.checkLOD = true;
        this._enableStaticInstanceBatch = false;
        this._enableStaticVertexMergeBatch = false;
        this._cacheRender = new SingletonList();
        this._batchRender = new SingletonList();
        this._enableCustomBatch = false;
    }
    _getStaticInstanceBatchRender() {
        let render = this.owner.getComponent(StaticInstanceBatchRender);
        if (!render) {
            render = this.owner.addComponent(StaticInstanceBatchRender);
        }
        return render;
    }
    _getStatiVertexMergeBatchRender() {
        let render = this.owner.getComponent(StatiVertexMergeBatchRender);
        if (!render) {
            render = this.owner.addComponent(StatiVertexMergeBatchRender);
        }
        return render;
    }
    get checkLOD() {
        return this._checkLOD;
    }
    set checkLOD(value) {
        this._checkLOD = value;
        if (this._enableStaticInstanceBatch) {
            this._instanceBatchRender.checkLOD = value;
        }
        if (this._enableStaticVertexMergeBatch) {
            this._vertexMergeBatchRender.checkLOD = value;
        }
        if (this._enableCustomBatch) {
            this._customBatchs.forEach(element => {
                element.checkLOD = value;
            });
        }
    }
    get enableStaticInstanceBatchRender() {
        return this._enableStaticInstanceBatch;
    }
    set enableStaticInstanceBatchRender(value) {
        if (!this._instanceBatchRender && value) {
            this._instanceBatchRender = this._getStaticInstanceBatchRender();
        }
        if (value == this._enableStaticInstanceBatch)
            return;
        if (value) {
            this._instanceBatchRender.enabled = true;
        }
        else {
            this._instanceBatchRender.enabled = false;
        }
        this._enableStaticInstanceBatch = value;
    }
    get enableMergeBatchRender() {
        return this._enableStaticVertexMergeBatch;
    }
    set enableMergeBatchRender(value) {
        if (!this._vertexMergeBatchRender && value) {
            this._vertexMergeBatchRender = this._getStatiVertexMergeBatchRender();
        }
        if (value == this._enableStaticVertexMergeBatch)
            return;
        if (value) {
            this._vertexMergeBatchRender.enabled = true;
        }
        else {
            this._vertexMergeBatchRender.enabled = false;
        }
        this._enableStaticVertexMergeBatch = value;
    }
    get enableCustomBatchRender() {
        return this._enableCustomBatch;
    }
    set enableCustomBatchRender(value) {
        this._enableCustomBatch = value;
        this._customBatchs.forEach(element => {
            element.enabled = value;
        });
    }
    set customBatchRenders(value) {
        if (this._customBatchs) {
            this._customBatchs.forEach(element => {
                this.owner._destroyComponent(element);
            });
        }
        this._customBatchs = value;
        this._customBatchs.forEach(element => {
            this.owner.addComponentInstance(element);
        });
        this.enableCustomBatchRender = this._enableCustomBatch;
    }
    get customBatchRenders() {
        return this._customBatchs;
    }
    _restorRenderNode() {
        if (this.enableCustomBatchRender) {
            this._customBatchs.forEach(element => {
                element._clear();
            });
        }
        if (this._enableStaticInstanceBatch) {
            this._instanceBatchRender._clear();
        }
        if (this.enableCustomBatchRender) {
            this._vertexMergeBatchRender._clear();
        }
    }
    __addRenderNodeToBatch(renderNode) {
        if (this.enableCustomBatchRender) {
            this._customBatchs.forEach(element => {
                if (element._batchOneRender(renderNode))
                    return;
            });
        }
        if (this._enableStaticInstanceBatch) {
            if (this._instanceBatchRender._batchOneRender(renderNode))
                return;
        }
        if (this.enableCustomBatchRender) {
            if (this._vertexMergeBatchRender._batchOneRender(renderNode))
                return;
        }
    }
    __removeRenderNodeFromBatch(renderNode) {
        renderNode._batchRender._removeOneRender(renderNode);
    }
    _onEnable() {
        super._onEnable();
        if (this._enableStaticInstanceBatch)
            this._instanceBatchRender && (this._instanceBatchRender.enabled = true);
        if (this._enableStaticVertexMergeBatch)
            this._vertexMergeBatchRender && (this._vertexMergeBatchRender.enabled = true);
        if (this.enableCustomBatchRender) {
            this._customBatchs.forEach(element => {
                element.enabled = true;
            });
        }
    }
    _onDisable() {
        super._onDisable();
        if (this._enableStaticInstanceBatch)
            this._instanceBatchRender && (this._instanceBatchRender.enabled = false);
        if (this._enableStaticVertexMergeBatch)
            this._vertexMergeBatchRender && (this._vertexMergeBatchRender.enabled = false);
        if (this.enableCustomBatchRender) {
            this._customBatchs.forEach(element => {
                element.enabled = false;
            });
        }
    }
    _addRenderNode(renderNode) {
        if (renderNode.renderNode.staticMask == StaticFlag.StaticBatch) {
            if (this._cacheRender.indexof(renderNode) != -1) {
                return;
            }
            this._cacheRender.add(renderNode);
            if (this._batchRender.length > 0) {
                this.__addRenderNodeToBatch(renderNode);
            }
        }
    }
    _removeRenderNode(renderNode) {
        if (renderNode.renderNode.staticMask == StaticFlag.StaticBatch) {
            if (this._batchRender.indexof(renderNode) != -1) {
                this.__removeRenderNodeFromBatch(renderNode);
                this._batchRender.remove(renderNode);
            }
        }
    }
    _VolumeChange() {
        super._VolumeChange();
        this._cacheRender.clear();
    }
    onStart() {
        this.reBatch();
    }
    reBatch() {
        this._cacheRender.elements.length = this._cacheRender.length;
        this._batchRender.clear();
        this._restorRenderNode();
        if (this.enableCustomBatchRender) {
            this._customBatchs.forEach(element => {
                element.addList(this._cacheRender.elements);
                element.reBatch();
            });
        }
        if (this._enableStaticInstanceBatch) {
            this._instanceBatchRender.addList(this._cacheRender.elements);
            this._instanceBatchRender.reBatch();
        }
        if (this.enableCustomBatchRender) {
            this._vertexMergeBatchRender.addList(this._cacheRender.elements);
            this._vertexMergeBatchRender.reBatch();
        }
        for (var i = 0, n = this._cacheRender.length; i < n; i++) {
            (this._cacheRender.elements[i]._batchRender) && this._batchRender.add(this._cacheRender.elements[i]);
        }
    }
}

//# sourceMappingURL=StaticBatchVolume.js.map
