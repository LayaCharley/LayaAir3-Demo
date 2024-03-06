import { Vector3 } from "../../../maths/Vector3";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { GeometryElement } from "../../core/GeometryElement";
import { Bounds } from "../../math/Bounds";
export class StaticBatchSubInfo {
    constructor() {
        this.indexStart = 0;
        this.indexCount = 0;
        this.meshBounds = new Bounds(new Vector3(), new Vector3());
        this.needRender = false;
    }
}
export class StaticBatchSubMesh extends GeometryElement {
    constructor() {
        super(MeshTopology.Triangles, DrawType.DrawElement);
        this.subInfos = [];
    }
    addSubMesh(indexCount, indexStart, bounds) {
        let info = new StaticBatchSubInfo();
        info.indexCount = indexCount;
        info.indexStart = indexStart;
        bounds.cloneTo(info.meshBounds);
        this.subInfos.push(info);
    }
    _getType() {
        return StaticBatchSubMesh._type;
    }
    _updateRenderParams(state) {
        this.clearRenderParams();
        let cameraPos = state.camera.transform.position;
        this.subInfos.sort((a, b) => {
            let centerA = a.meshBounds.getCenter();
            let distanceA = Vector3.distanceSquared(centerA, cameraPos);
            let centerB = b.meshBounds.getCenter();
            let distanceB = Vector3.distanceSquared(centerB, cameraPos);
            return distanceA - distanceB;
        });
        for (const info of this.subInfos) {
            if (info.needRender) {
                this.setDrawElemenParams(info.indexCount, info.indexStart * this.indexByteCount);
            }
        }
    }
    _prepareRender(state) {
        return !!this.subInfos.find(info => info.needRender);
    }
    destroy() {
        for (const info of this.subInfos) {
        }
        this.subInfos = null;
    }
}
StaticBatchSubMesh._type = GeometryElement._typeCounter++;

//# sourceMappingURL=StaticBatchSubMesh.js.map
