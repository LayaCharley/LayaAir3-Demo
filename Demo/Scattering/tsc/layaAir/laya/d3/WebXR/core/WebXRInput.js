import { EventDispatcher } from "../../../events/EventDispatcher";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { Ray } from "../../math/Ray";
import { ButtonGamepad, AxiGamepad } from "./WebXRGamepad";
export class WebXRInput extends EventDispatcher {
    constructor(handness) {
        super();
        this.preButtonEventList = [];
        this.preAxisEventList = [];
        this.handness = handness;
        this.position = new Vector3();
        this.rotation = new Quaternion();
        this.ray = new Ray(new Vector3(), new Vector3());
    }
    _updateByXRPose(xrFrame, referenceSpace) {
        const rayPose = xrFrame.getPose(this._inputSource.targetRaySpace, referenceSpace);
        this._lastXRPose = rayPose;
        if (rayPose) {
            const pos = rayPose.transform.position;
            const orientation = rayPose.transform.orientation;
            WebXRInput.tempQua.setValue(orientation.x, orientation.y, orientation.z, orientation.w);
            this.ray.origin.setValue(pos.x, pos.y, pos.z);
            Vector3.transformQuat(Vector3.UnitZ, WebXRInput.tempQua, this.ray.direction);
            Vector3.scale(this.ray.direction, -1, this.ray.direction);
        }
        if (this._inputSource.gripSpace) {
            let meshPose = xrFrame.getPose(this._inputSource.gripSpace, referenceSpace);
            if (meshPose) {
                const pos = meshPose.transform.position;
                const orientation = meshPose.transform.orientation;
                this.position.setValue(pos.x, pos.y, pos.z);
                this.rotation.setValue(orientation.x, orientation.y, orientation.z, orientation.w);
            }
        }
        this.event(WebXRInput.EVENT_FRAMEUPDATA_WEBXRINPUT, [this]);
        this._handleProcessGamepad();
    }
    _handleProcessGamepad() {
        const gamepad = this._inputSource.gamepad;
        if (!this.gamepadAxis) {
            this.gamepadAxis = new AxiGamepad(this.handness, gamepad.axes.length);
            this.preAxisEventList.forEach(element => {
                this.gamepadAxis.on(element.eventnam, element.caller, element.listener);
            });
        }
        if (!this.gamepadButton) {
            this.gamepadButton = [];
            for (let i = 0; i < gamepad.buttons.length; ++i) {
                this.gamepadButton.push(new ButtonGamepad(this.handness, i));
            }
            this.preButtonEventList.forEach(element => {
                this.addButtonEvent(element.index, element.type, element.caller, element.listener);
            });
        }
        this.gamepadAxis.update(gamepad);
        for (let i = 0; i < gamepad.buttons.length; ++i) {
            let button = this.gamepadButton[i];
            button.update(gamepad.buttons[i]);
        }
    }
    addButtonEvent(index, type, caller, listener) {
        if (!this.gamepadButton) {
            this.preButtonEventList.push({
                "index": index,
                "type": type,
                "caller": caller,
                "listener": listener
            });
        }
        else {
            let button = this.gamepadButton[index];
            button.on(type, caller, listener);
        }
    }
    addAxisEvent(index, type, caller, listener) {
        if (!this.gamepadAxis) {
            this.preAxisEventList.push({
                "eventnam": type + index.toString(),
                "caller": caller,
                "listener": listener
            });
        }
        else {
            const eventnam = type + index.toString();
            this.gamepadAxis.on(eventnam, caller, listener);
        }
    }
    offAxisEvent(index, type, caller, listener) {
        if (this.gamepadAxis) {
            const eventnam = type + index.toString();
            this.gamepadAxis.off(eventnam, caller, listener);
        }
    }
    offButtonEvent(index, type, caller, listener) {
        if (this.gamepadButton) {
            let button = this.gamepadButton[index];
            button.off(type, caller, listener);
        }
    }
    destroy() {
        this.preButtonEventList = null;
        this.ray = null;
        this.position = null;
        this.rotation = null;
        this.gamepadAxis.destroy();
        this.gamepadButton.forEach(element => {
            element.destroy();
        });
    }
}
WebXRInput.HANDNESS_LEFT = "left";
WebXRInput.HANDNESS_RIGHT = "right";
WebXRInput.EVENT_FRAMEUPDATA_WEBXRINPUT = "frameXRInputUpdate";
WebXRInput.tempQua = new Quaternion();

//# sourceMappingURL=WebXRInput.js.map
