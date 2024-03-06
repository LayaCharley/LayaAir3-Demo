import { RenderElement } from "./RenderElement";
import { Event } from "../../../events/Event";
export class SubMeshRenderElement extends RenderElement {
    constructor() {
        super();
        this._dynamicWorldPositionNormalNeedUpdate = true;
        this._canBatch = true;
    }
    _onWorldMatrixChanged() {
        this._dynamicWorldPositionNormalNeedUpdate = true;
    }
    setTransform(transform) {
        if (this.transform !== transform) {
            (this.transform) && (this.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatrixChanged));
            (transform) && (transform.on(Event.TRANSFORM_CHANGED, this, this._onWorldMatrixChanged));
            this._dynamicWorldPositionNormalNeedUpdate = true;
            this.transform = transform;
        }
    }
    setGeometry(geometry) {
        if (this._geometry !== geometry) {
            this._geometry = geometry;
            this._renderElementOBJ._geometry = geometry._geometryElementOBj;
        }
    }
    destroy() {
        if (!this._renderElementOBJ)
            return;
        (this.transform) && this.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatrixChanged);
        super.destroy();
        this.staticBatch = null;
        this.instanceSubMesh = null;
        this.staticBatchElementList && this.staticBatchElementList.destroy();
        this.instanceBatchElementList && this.instanceBatchElementList.destroy();
        this.vertexBatchElementList && this.vertexBatchElementList.destroy();
        this.vertexBatchVertexDeclaration = null;
    }
}

//# sourceMappingURL=SubMeshRenderElement.js.map
