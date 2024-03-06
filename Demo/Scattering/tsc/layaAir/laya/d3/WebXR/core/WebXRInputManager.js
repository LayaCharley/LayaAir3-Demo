import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
import { WebXRInput } from "./WebXRInput";
import { WebXRSessionManager } from "./WebXRSessionManager";
export class WebXRInputManager {
    constructor(webxrManager, webXRCamera) {
        this.controllers = new Map();
        this.controllerHandMesh = new Map();
        this.controllerLineRender = new Map();
        this.lineColor = Color.RED;
        this.rayLength = 2;
        this.webXRSessionManager = webxrManager;
        this.webXRCameraManager = webXRCamera;
        this.webXRSessionManager.on(WebXRSessionManager.EVENT_MANAGER_END, this, this.destory);
        this.webXRSessionManager.on(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateFromXRFrame);
    }
    _updataMeshRender(xrInput) {
        const handness = xrInput.handness;
        if (this.controllerHandMesh.has(handness)) {
            let meshNode = this.controllerHandMesh.get(handness);
            meshNode.transform.position = xrInput.position;
            meshNode.transform.rotation = xrInput.rotation;
        }
        if (this.controllerLineRender.has(handness)) {
            let line = this.controllerLineRender.get(handness);
            line.clear();
            let ray = xrInput.ray;
            WebXRInputManager.tempVec.setValue(ray.origin.x, ray.origin.y, ray.origin.z);
            Vector3.scale(ray.direction, this.rayLength, WebXRInputManager.tempVec1);
            Vector3.add(WebXRInputManager.tempVec, WebXRInputManager.tempVec1, WebXRInputManager.tempVec1);
            line.addLine(WebXRInputManager.tempVec, WebXRInputManager.tempVec1, this.lineColor, this.lineColor);
        }
    }
    _updateFromXRFrame(xrFrame) {
        const session = this.webXRSessionManager.session;
        const refSpace = this.webXRSessionManager.referenceSpace;
        for (let inputSource of session.inputSources) {
            const key = inputSource.handedness;
            let xrInput;
            if (!this.controllers.has(key)) {
                xrInput = this.getController(key);
            }
            else
                xrInput = this.controllers.get(key);
            if (xrInput) {
                xrInput = this.controllers.get(key);
                xrInput._inputSource = inputSource;
                xrInput._updateByXRPose(xrFrame, refSpace);
            }
        }
    }
    bindMeshNode(meshSprite, handness) {
        this.controllerHandMesh.set(handness, meshSprite);
    }
    bindRayNode(lineSprite, handness) {
        this.controllerLineRender.set(handness, lineSprite);
    }
    getController(handness) {
        if (handness != "left" && handness != "right")
            return null;
        if (!this.controllers.has(handness)) {
            let value = new WebXRInput(handness);
            this.controllers.set(handness, value);
            value.on(WebXRInput.EVENT_FRAMEUPDATA_WEBXRINPUT, this, this._updataMeshRender);
        }
        return this.controllers.get(handness);
    }
    destory() {
        this.webXRSessionManager.off(WebXRSessionManager.EVENT_FRAME_LOOP, this, this._updateFromXRFrame);
        for (let key in this.controllers) {
            this.controllers.get(key).off("frameXRInputUpdate", this, this._updataMeshRender);
            this.controllers.get(key).destroy();
        }
        this.controllers = null;
        this.controllerHandMesh = null;
        this.controllerLineRender = null;
    }
}
WebXRInputManager.tempVec = new Vector3();
WebXRInputManager.tempVec1 = new Vector3();

//# sourceMappingURL=WebXRInputManager.js.map
