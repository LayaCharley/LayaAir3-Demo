import { DrawType } from "../../RenderEngine/RenderEnum/DrawType";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { GeometryElement } from "../core/GeometryElement";
export class MeshInstanceGeometry extends GeometryElement {
    constructor(subMesh) {
        super(subMesh ? subMesh._geometryElementOBj.mode : MeshTopology.Triangles, DrawType.DrawElementInstance);
        this._subMesh = subMesh;
        if (subMesh)
            this.indexFormat = subMesh._mesh.indexFormat;
    }
    set subMesh(value) {
        this._subMesh = value;
        if (value)
            this.indexFormat = value._mesh.indexFormat;
        this.mode = value._geometryElementOBj.mode;
    }
    get subMesh() {
        return this._subMesh;
    }
    _updateRenderParams(state) {
        this.clearRenderParams();
        this.setDrawElemenParams(this._subMesh.indexCount, this._subMesh._indexStart * 2);
    }
}

//# sourceMappingURL=MeshInstanceGeometry.js.map
