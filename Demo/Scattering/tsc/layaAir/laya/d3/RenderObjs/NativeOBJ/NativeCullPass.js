import { SingletonList } from "../../../utils/SingletonList";
import { Stat } from "../../../utils/Stat";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { FrustumCulling } from "../../graphics/FrustumCulling";
export class NativeCullPassBase {
    constructor() {
        this._nativeObj = new window.conchCullPass();
        this._tempRenderList = new SingletonList();
    }
    get cullList() {
        this._tempRenderList.elements = this._nativeObj.cullList;
        this._tempRenderList.length = this._nativeObj.cullList.length;
        return this._tempRenderList;
    }
    cullByCameraCullInfo(cameraCullInfo, renderManager) {
        cameraCullInfo.serialize();
        Stat.frustumCulling += this._nativeObj.cullByCameraCullInfo(cameraCullInfo._nativeObj, renderManager._sceneManagerOBJ._nativeObj);
        var customRenderList = renderManager._sceneManagerOBJ._customCullList;
        var boundFrustum = cameraCullInfo.boundFrustum;
        var cullMask = cameraCullInfo.cullingMask;
        let staticMask = cameraCullInfo.staticMask;
        var renders = customRenderList.elements;
        let context = RenderContext3D._instance;
        for (var i = 0, n = customRenderList.length; i < n; i++) {
            var render = renders[i];
            var canPass;
            canPass = (Math.pow(2, render.renderNode.layer & cullMask) != 0) && render._enabled && (render.renderbitFlag == 0);
            canPass = canPass && ((render.renderNode.staticMask & staticMask) != 0);
            if (canPass) {
                Stat.frustumCulling++;
                if (!cameraCullInfo.useOcclusionCulling || render._needRender(boundFrustum, context)) {
                    this._nativeObj.cullList.push(render);
                }
            }
        }
    }
    cullByShadowCullInfo(cullInfo, renderManager) {
        Stat.frustumCulling += this._nativeObj.cullByShadowCullInfo(cullInfo._nativeObj, renderManager._sceneManagerOBJ._nativeObj);
        var customRenderList = renderManager._sceneManagerOBJ._customCullList;
        var renders = customRenderList.elements;
        for (var i = 0, n = customRenderList.length; i < n; i++) {
            var render = renders[i];
            var canPass = render.castShadow && render._enabled && (render.renderbitFlag == 0);
            if (canPass) {
                Stat.frustumCulling++;
                let pass = FrustumCulling.cullingRenderBounds(render.bounds, cullInfo);
                pass && this._nativeObj.cullList.push(render);
            }
        }
    }
    cullingSpotShadow(cameraCullInfo, renderManager) {
        cameraCullInfo.serialize();
        Stat.frustumCulling += this._nativeObj.cullingSpotShadow(cameraCullInfo._nativeObj, renderManager._sceneManagerOBJ._nativeObj);
        var customRenderList = renderManager._sceneManagerOBJ._customCullList;
        var renders = customRenderList.elements;
        let context = RenderContext3D._instance;
        for (var i = 0, n = customRenderList.length; i < n; i++) {
            var render = renders[i];
            var canPass = render.castShadow && render._enabled && (render.renderbitFlag == 0);
            if (canPass) {
                Stat.frustumCulling++;
                var render = renders[i];
                if (render._needRender(cameraCullInfo.boundFrustum, context))
                    this._nativeObj.cullList.push(render);
            }
        }
    }
}

//# sourceMappingURL=NativeCullPass.js.map
