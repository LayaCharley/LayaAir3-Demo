import { Vector3 } from "../../maths/Vector3";
import { PhysicsComponent } from "./PhysicsComponent";
export declare class HitResult {
    succeeded: boolean;
    collider: PhysicsComponent;
    point: Vector3;
    normal: Vector3;
    hitFraction: number;
    constructor();
}
