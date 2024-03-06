import { SingletonList } from "../../../../utils/SingletonList";
import { Stat } from "../../../../utils/Stat";
import { FrustumCulling } from "../../../graphics/FrustumCulling";
import { CullPassBase } from "../../../RenderObjs/RenderObj/CullPass";
import { RenderContext3D } from "../../render/RenderContext3D";
export class BVHCullPass extends CullPassBase {
    constructor() {
        super(...arguments);
        this._cullList = new SingletonList();
    }
    get cullList() {
        return this._cullList;
    }
    cullByCameraCullInfo(cameraCullInfo, renderManager) {
        this._cullList.length = 0;
        renderManager.bvhSpatial.getItemByCameraCullInfo(cameraCullInfo, this._cullList);
        var renderList = renderManager.otherList;
        var renders = renderList.elements;
        var boundFrustum = cameraCullInfo.boundFrustum;
        var cullMask = cameraCullInfo.cullingMask;
        let staticMask = cameraCullInfo.staticMask;
        let context = RenderContext3D._instance;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var render = renders[i];
            var canPass;
            canPass = (Math.pow(2, render.renderNode.layer) & cullMask) != 0 && render._enabled && (render.renderbitFlag == 0);
            canPass = canPass && ((render.renderNode.staticMask & staticMask) != 0);
            if (canPass) {
                Stat.frustumCulling++;
                if (!cameraCullInfo.useOcclusionCulling || render._needRender(boundFrustum, context)) {
                    this.cullList.add(render);
                }
            }
        }
    }
    cullByShadowCullInfo(cullInfo, renderManager) {
        this._cullList.length = 0;
        renderManager.bvhSpatial.getItemBySCI(cullInfo, this._cullList);
        var renderList = renderManager.otherList;
        var renders = renderList.elements;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var render = renders[i];
            var canPass = render.castShadow && render._enabled && (render.renderbitFlag == 0);
            if (canPass) {
                Stat.frustumCulling++;
                let pass = FrustumCulling.cullingRenderBounds(render.bounds, cullInfo);
                pass && this._cullList.add(render);
            }
        }
    }
    cullingSpotShadow(cameraCullInfo, renderManager) {
    }
}

//# sourceMappingURL=BVHCullPass.js.map
