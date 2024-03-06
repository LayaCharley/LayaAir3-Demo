import { LayaGL } from "../../../layagl/LayaGL";
import { WebXRCameraManager } from "./WebXRCameraManager";
import { WebXRInputManager } from "./WebXRInputManager";
import { WebXRSessionManager } from "./WebXRSessionManager";
export class WebXRCameraInfo {
}
export class WebXRExperienceHelper {
    static supportXR(sessionMode) {
        return WebXRExperienceHelper.xr_Manager.isSessionSupportedAsync(sessionMode).then(value => {
            WebXRExperienceHelper.supported = value;
            return value;
        });
    }
    static enterXRAsync(sessionMode, referenceSpaceType, cameraInfo) {
        if (sessionMode === "immersive-ar" && referenceSpaceType !== "unbounded") {
            console.warn("We recommend using 'unbounded' reference space type when using 'immersive-ar' session mode");
        }
        return WebXRExperienceHelper.xr_Manager.initializeSessionAsync(sessionMode).then(() => {
            return WebXRExperienceHelper.xr_Manager.setReferenceSpaceTypeAsync(referenceSpaceType);
        }).then(() => {
            return WebXRExperienceHelper.xr_Manager.initializeXRGL(sessionMode, LayaGL.renderEngine._gl);
        }).then(() => {
            WebXRExperienceHelper.glInstance = LayaGL.renderEngine._gl;
            return WebXRExperienceHelper.xr_Manager.updateRenderStateAsync({
                depthFar: cameraInfo.depthFar,
                depthNear: cameraInfo.depthNear,
                baseLayer: new XRWebGLLayer(WebXRExperienceHelper.xr_Manager.session, LayaGL.instance),
            });
        }).then(() => {
            WebXRExperienceHelper.xr_Manager.runXRRenderLoop();
            return WebXRExperienceHelper.xr_Manager;
        });
    }
    static setWebXRCamera(camera, manager) {
        return new WebXRCameraManager(camera, manager);
    }
    static setWebXRInput(sessionManager, cameraManager) {
        return new WebXRInputManager(sessionManager, cameraManager);
    }
}
WebXRExperienceHelper.xr_Manager = new WebXRSessionManager();
WebXRExperienceHelper.supported = false;
WebXRExperienceHelper.canvasOptions = {
    antialias: true,
    depth: true,
    stencil: false,
    alpha: true,
    multiview: false,
    framebufferScaleFactor: 1,
};

//# sourceMappingURL=WebXRExperienceHelper.js.map
