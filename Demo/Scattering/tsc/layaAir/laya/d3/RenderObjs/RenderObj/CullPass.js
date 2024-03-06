import { Vector3 } from "../../../maths/Vector3";
import { SingletonList } from "../../../utils/SingletonList";
import { Stat } from "../../../utils/Stat";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { FrustumCulling } from "../../graphics/FrustumCulling";
export class CullPassBase {
    constructor() {
        this._cullList = new SingletonList();
    }
    get cullList() {
        return this._cullList;
    }
    static cullDistanceVolume(context, render) {
        let camera = context.camera;
        if (!camera || !camera.transform)
            return false;
        let bound = render.bounds;
        let center = bound.getCenter();
        let exten = bound.getExtent();
        let dis = Vector3.distance(camera.transform.position, center);
        let volum = Math.max(exten.x, exten.y, exten.z);
        if (volum / dis < render._ratioIgnor) {
            return false;
        }
        return true;
    }
    cullByCameraCullInfo(cameraCullInfo, renderManager) {
        this._cullList.length = 0;
        var renders = renderManager.list.elements;
        var boundFrustum = cameraCullInfo.boundFrustum;
        var cullMask = cameraCullInfo.cullingMask;
        let staticMask = cameraCullInfo.staticMask;
        let context = RenderContext3D._instance;
        for (var i = 0, n = renderManager.list.length; i < n; i++) {
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
        var renderList = renderManager.list;
        var renders = renderList.elements;
        for (var i = 0, n = renderList.length; i < n; i++) {
            var render = renders[i];
            var canPass = render.shadowCullPass();
            if (canPass) {
                Stat.frustumCulling++;
                let pass = FrustumCulling.cullingRenderBounds(render.bounds, cullInfo);
                pass && this._cullList.add(render);
            }
        }
    }
    cullingSpotShadow(cameraCullInfo, renderManager) {
        this._cullList.length = 0;
        let renders = renderManager.list.elements;
        let boundFrustum = cameraCullInfo.boundFrustum;
        let context = RenderContext3D._instance;
        for (let i = 0, n = renderManager.list.length; i < n; i++) {
            let render = renders[i];
            let canPass = render.castShadow && render._enabled && (render.renderbitFlag == 0);
            if (canPass) {
                Stat.frustumCulling++;
                if (render._needRender(boundFrustum, context))
                    this._cullList.add(render);
            }
        }
    }
}

//# sourceMappingURL=CullPass.js.map
