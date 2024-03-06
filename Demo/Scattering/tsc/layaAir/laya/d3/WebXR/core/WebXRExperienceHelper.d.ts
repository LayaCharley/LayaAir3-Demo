import { Camera } from "../../core/Camera";
import { WebXRCameraManager } from "./WebXRCameraManager";
import { WebXRInputManager } from "./WebXRInputManager";
import { WebXRSessionManager } from "./WebXRSessionManager";
export declare class WebXRCameraInfo {
    depthFar: number;
    depthNear: number;
    camera: any;
}
export declare class WebXRExperienceHelper {
    static glInstance: any;
    static xr_Manager: WebXRSessionManager;
    static supported: boolean;
    static canvasOptions: {
        antialias: boolean;
        depth: boolean;
        stencil: boolean;
        alpha: boolean;
        multiview: boolean;
        framebufferScaleFactor: number;
    };
    static supportXR(sessionMode: string): Promise<boolean>;
    static enterXRAsync(sessionMode: string, referenceSpaceType: string, cameraInfo: WebXRCameraInfo): Promise<WebXRSessionManager>;
    static setWebXRCamera(camera: Camera, manager: WebXRSessionManager): WebXRCameraManager;
    static setWebXRInput(sessionManager: WebXRSessionManager, cameraManager: WebXRCameraManager): WebXRInputManager;
}
