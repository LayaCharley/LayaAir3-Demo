import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Quaternion } from "../../maths/Quaternion";
import { Vector3 } from "../../maths/Vector3";
export declare class RaycastWheel {
    btWheelPtr: number;
    worldPos: Vector3;
    worldQuat: Quaternion;
    bt: any;
    private btMemory;
    worldMat: Matrix4x4;
    constructor(ptr: number);
    set engineForce(force: number);
    get engineForce(): number;
    set steeringValue(v: number);
    get steeringValue(): number;
    set brake(v: number);
    get brake(): number;
    get rotation(): any;
    get deltaRotation(): any;
    get transform(): Matrix4x4;
    getWorldTransform(): void;
}
