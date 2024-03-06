import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { WebXRCamera } from "./WebXRCamera";
import { WebXRRenderTexture } from "./WebXRRenderTexture";
import { WebXRSessionManager } from "./WebXRSessionManager";
export class WebXRCameraManager {
    constructor(camera, manager = null) {
        this._referenceQuaternion = new Quaternion();
        this._referencedPosition = new Vector3();
        this._firstFrame = true;
        this._XRRenderTexture = new WebXRRenderTexture();
        this._rigCameras = new Array();
        this._position = new Vector3();
        this.owner = camera;
        this.owner.enableRender = false;
        if (!this.owner.aspectRatio) {
            console.warn("owner is not Camera");
        }
        this._webXRSessionManager = manager;
        this._webXRSessionManager.on(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateFromXRSession);
        this._webXRSessionManager.on(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateReferenceSpace);
        this._webXRSessionManager.on(WebXRSessionManager.EVENT_MANAGER_END, this, this.destroy);
    }
    get position() {
        return this._position;
    }
    set position(newPosition) {
        newPosition.cloneTo(this._position);
    }
    set rotationQuaternion(value) {
        value.cloneTo(this._referenceQuaternion);
    }
    get rotationQuaternion() {
        return this._referenceQuaternion;
    }
    get rigCameras() {
        return this._rigCameras;
    }
    _updateFromXRSession() {
        let pose = this._webXRSessionManager.currentFrame && this._webXRSessionManager.currentFrame.getViewerPose(this._webXRSessionManager.referenceSpace);
        const pos = pose.transform.position;
        const orientation = pose.transform.orientation;
        this._referenceQuaternion.setValue(orientation.x, orientation.y, orientation.z, orientation.w);
        this._referencedPosition.setValue(pos.x, pos.y, pos.z);
        if (this._firstFrame) {
            this._firstFrame = false;
            this.position.y += this._referencedPosition.y;
            this._referenceQuaternion.setValue(0, 0, 0, 1);
        }
        else {
            this.rotationQuaternion = this._referenceQuaternion;
            this.position = this._referencedPosition;
        }
        if (this.rigCameras.length !== pose.views.length) {
            this._updateNumberOfRigCameras(pose.views.length);
        }
        pose.views.forEach((view, i) => {
            const currentRig = this.rigCameras[i];
            if (view.eye === "right")
                currentRig.name = "right";
            else if (view.eye === "left")
                currentRig.name = "left";
            const pos = view.transform.position;
            const orientation = view.transform.orientation;
            currentRig.transform.position.setValue(pos.x, pos.y, pos.z);
            currentRig.transform.rotation.setValue(orientation.x, orientation.y, orientation.z, orientation.w);
            currentRig.transform.position = currentRig.transform.position;
            currentRig.transform.rotation = currentRig.transform.rotation;
            if (this._webXRSessionManager.session.renderState.baseLayer) {
                var viewport = this._webXRSessionManager.session.renderState.baseLayer.getViewport(view);
                var width = this._webXRSessionManager.session.renderState.baseLayer.framebufferWidth;
                var height = this._webXRSessionManager.session.renderState.baseLayer.framebufferHeight;
                this._XRRenderTexture.frameBuffer = this._webXRSessionManager.session.renderState.baseLayer.framebuffer;
                currentRig.renderTarget = this._XRRenderTexture;
                currentRig.clientWidth = width;
                currentRig.clientHeight = height;
                var cameraViewPort = currentRig.viewport;
                cameraViewPort.x = viewport.x;
                cameraViewPort.y = viewport.y;
                cameraViewPort.width = viewport.width;
                cameraViewPort.height = viewport.height;
                currentRig.viewport = cameraViewPort;
                currentRig.projectionMatrix.cloneByArray(view.projectionMatrix);
            }
        });
    }
    _updateNumberOfRigCameras(viewCount = 1) {
        while (this.rigCameras.length < viewCount) {
            var xrcamera = new WebXRCamera(this.owner.aspectRatio, this.owner.nearPlane, this.owner.farPlane);
            xrcamera.clearFlag = this.owner.clearFlag;
            xrcamera.clearColor = this.owner.clearColor;
            this.owner.addChild(xrcamera);
            this.rigCameras.push(xrcamera);
        }
        while (this.rigCameras.length > viewCount) {
            let xrcamera = this.rigCameras.pop();
            this.owner.removeChild(xrcamera);
        }
    }
    _updateReferenceSpace() {
    }
    destroy() {
        this.owner.enableRender = true;
        this._webXRSessionManager.off(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateFromXRSession);
        this._webXRSessionManager.off(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateReferenceSpace);
        this._webXRSessionManager.off(WebXRSessionManager.EVENT_MANAGER_END, this, this.destroy);
        this._rigCameras.forEach(element => {
            element.destroy();
        });
        this._rigCameras = null;
        this._XRRenderTexture.destroy();
    }
}

//# sourceMappingURL=WebXRCameraManager.js.map
