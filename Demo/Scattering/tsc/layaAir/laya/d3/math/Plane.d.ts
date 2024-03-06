import { Vector3 } from "../../maths/Vector3";
export declare class Plane {
    static PlaneIntersectionType_Back: number;
    static PlaneIntersectionType_Front: number;
    static PlaneIntersectionType_Intersecting: number;
    constructor(normal?: Vector3, d?: number);
    set normal(value: Vector3);
    get normal(): Vector3;
    set distance(value: number);
    get distance(): number;
    static createPlaneBy3P(point0: Vector3, point1: Vector3, point2: Vector3, out: Plane): void;
    normalize(): void;
    cloneTo(destObject: any): void;
    clone(): Plane;
}
