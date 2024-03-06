import { Vector3 } from "../../maths/Vector3";
export declare class Ray {
    origin: Vector3;
    direction: Vector3;
    constructor(origin: Vector3, direction: Vector3);
    at(t: number, out: Vector3): void;
}
