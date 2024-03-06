import { EventDispatcher } from "../../../events/EventDispatcher";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { Ray } from "../../math/Ray";
import { ButtonGamepad, AxiGamepad } from "./WebXRGamepad";
export declare class WebXRInput extends EventDispatcher {
    static HANDNESS_LEFT: string;
    static HANDNESS_RIGHT: string;
    static EVENT_FRAMEUPDATA_WEBXRINPUT: string;
    private static tempQua;
    private preButtonEventList;
    private preAxisEventList;
    lastXRPose: any;
    handness: string;
    ray: Ray;
    position: Vector3;
    rotation: Quaternion;
    _lastXRPose: any;
    gamepadButton: Array<ButtonGamepad>;
    gamepadAxis: AxiGamepad;
    constructor(handness: string);
    private _handleProcessGamepad;
    addButtonEvent(index: number, type: string, caller: any, listener: Function): void;
    addAxisEvent(index: number, type: string, caller: any, listener: Function): void;
    offAxisEvent(index: number, type: string, caller: any, listener: Function): void;
    offButtonEvent(index: number, type: string, caller: any, listener: Function): void;
    destroy(): void;
}
