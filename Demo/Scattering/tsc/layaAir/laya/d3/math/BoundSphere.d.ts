import { Ray } from "./Ray";
import { IClone } from "../../utils/IClone";
import { Vector3 } from "../../maths/Vector3";
export declare class BoundSphere implements IClone {
    private static _tempVector3;
    _center: Vector3;
    _radius: number;
    set center(value: Vector3);
    get center(): Vector3;
    set radius(value: number);
    get radius(): number;
    constructor(center?: Vector3, radius?: number);
    toDefault(): void;
    static createFromSubPoints(points: Vector3[], start: number, count: number, out: BoundSphere): void;
    static createfromPoints(points: Vector3[], out: BoundSphere): void;
    intersectsRayDistance(ray: Ray): number;
    intersectsRayPoint(ray: Ray, outPoint: Vector3): number;
    cloneTo(destObject: any): void;
    clone(): any;
}
