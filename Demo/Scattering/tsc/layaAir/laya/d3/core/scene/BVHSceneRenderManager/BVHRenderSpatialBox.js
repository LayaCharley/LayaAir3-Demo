import { Stat } from "../../../../utils/Stat";
import { FrustumCulling } from "../../../graphics/FrustumCulling";
import { RenderContext3D } from "../../render/RenderContext3D";
import { BVHSpatialBox } from "../bvh/BVHSpatialBox";
export class BVHRenderBox extends BVHSpatialBox {
    _creatChildNode() {
        return new BVHRenderBox(this._bvhmanager, this._config);
    }
    getItemByCameraCullInfo(cameraCullInfo, out) {
        var frustum = cameraCullInfo.boundFrustum;
        const result = frustum.containsBoundBox(this._bounds);
        if (result == 1) {
            this.traverseBoundsCell(out);
            Stat.frustumCulling++;
        }
        else if (result == 2) {
            if (this.isContentBox()) {
                var cullMask = cameraCullInfo.cullingMask;
                let staticMask = cameraCullInfo.staticMask;
                let context = RenderContext3D._instance;
                for (let i = 0; i < this._cellList.length; i++) {
                    var canPass;
                    let render = this._cellList[i];
                    canPass = (Math.pow(2, render.renderNode.layer) & cullMask) != 0 && render._enabled && (render.renderbitFlag == 0);
                    canPass = canPass && ((render.renderNode.staticMask & staticMask) != 0);
                    if (canPass) {
                        Stat.frustumCulling++;
                        if (!cameraCullInfo.useOcclusionCulling || render._needRender(frustum, context)) {
                            out.add(render);
                        }
                    }
                }
            }
            else {
                this._children0.getItemByCameraCullInfo(cameraCullInfo, out);
                this._children1.getItemByCameraCullInfo(cameraCullInfo, out);
            }
        }
    }
    getItemBySCI(sci, out) {
        const result = BVHSpatialBox.sciContainsBox(this._bounds, sci);
        if (result == 1)
            this.traverseBoundsCell(out);
        else if (result == 2) {
            if (this.isContentBox()) {
                for (let i = 0; i < this._cellList.length; i++) {
                    var render = this._cellList[i];
                    var canPass = render.shadowCullPass();
                    if (canPass) {
                        Stat.frustumCulling++;
                        let pass = FrustumCulling.cullingRenderBounds(render.bounds, sci);
                        pass && out.add(render);
                    }
                }
            }
            else {
                this._children0.getItemBySCI(sci, out);
                this._children1.getItemBySCI(sci, out);
            }
        }
    }
}

//# sourceMappingURL=BVHRenderSpatialBox.js.map
