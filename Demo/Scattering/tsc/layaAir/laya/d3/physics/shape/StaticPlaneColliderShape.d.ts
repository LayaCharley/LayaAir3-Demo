import { ColliderShape } from "./ColliderShape";
import { Vector3 } from "../../../maths/Vector3";
export declare class StaticPlaneColliderShape extends ColliderShape {
    constructor(normal: Vector3, offset: number);
    clone(): any;
}
