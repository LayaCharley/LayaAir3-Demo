import { Vector3 } from "../../maths/Vector3";
import { RaycastWheel } from "./RaycastWheel";
export declare class btVehicleTuning {
    suspensionStiffness: number;
    suspensionCompression: number;
    suspensionDamping: number;
    maxSuspensionTravelCm: number;
    frictionSlip: number;
    maxSuspensionForce: number;
}
export declare class RaycastVehicle {
    userdata: any;
    btVehiclePtr: number;
    tuing: btVehicleTuning;
    private wheels;
    constructor(btObj: number);
    addWheel(connectionPointCS0: Vector3, wheelDirectionCS0: Vector3, wheelAxleCS: Vector3, wheelRadius: number, suspensionRestLength: number, suspensionMaxTravel: number, suspensionStiffness: number, suspensionDamping: number, frictionSlip: number, isFrontWheel: boolean): RaycastWheel;
    getNumWheels(): any;
    getWheelInfo(i: number): any;
}
