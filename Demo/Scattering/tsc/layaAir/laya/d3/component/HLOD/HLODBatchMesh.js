import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { GeometryElement } from "../../core/GeometryElement";
export class HLODBatchMesh extends GeometryElement {
    constructor() {
        super(MeshTopology.Triangles, DrawType.DrawElement);
    }
    set batchMesh(mesh) {
        if (this._mesh != mesh) {
            this._mesh && (this._mesh._removeReference());
            this.indexFormat = mesh.indexFormat;
            this._mesh = mesh;
            this._mesh._addReference();
        }
    }
    get batchMesh() {
        return this._mesh;
    }
    set batchSubMeshInfo(value) {
        this._batchSubMeshInfos = value;
    }
    get batchSubMeshInfo() {
        return this._batchSubMeshInfos;
    }
    set drawSubMeshs(value) {
        this._drawSubMeshs = value;
    }
    get drawSubMeshs() {
        return this._drawSubMeshs;
    }
    _prepareRender(state) {
        this._mesh._uploadVerticesData();
        return true;
    }
    _updateRenderParams(state) {
        var mesh = this._mesh;
        var byteCount;
        switch (mesh.indexFormat) {
            case IndexFormat.UInt32:
                byteCount = 4;
                break;
            case IndexFormat.UInt16:
                byteCount = 2;
                break;
            case IndexFormat.UInt8:
                byteCount = 1;
                break;
        }
        this.clearRenderParams();
        this.bufferState = mesh._bufferState;
        if (this._drawSubMeshs) {
            this._drawSubMeshs.forEach(element => {
                this.setDrawElemenParams(element.drawPramas.y, element.drawPramas.x * byteCount);
            });
        }
    }
    destroy() {
        this._mesh && this._mesh._removeReference();
        delete this._batchSubMeshInfos;
        delete this._drawSubMeshs;
    }
}

//# sourceMappingURL=HLODBatchMesh.js.map
