import { Vector3 } from "../../maths/Vector3";
import { PhysicsComponent } from "./PhysicsComponent";
export declare class ContactPoint {
    colliderA: PhysicsComponent;
    colliderB: PhysicsComponent;
    distance: number;
    normal: Vector3;
    positionOnA: Vector3;
    positionOnB: Vector3;
    constructor();
}
