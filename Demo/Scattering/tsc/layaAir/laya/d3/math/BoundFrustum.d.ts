import { Plane } from "./Plane";
import { BoundBox } from "./BoundBox";
import { BoundSphere } from "./BoundSphere";
import { IClone } from "../../utils/IClone";
import { Bounds } from "./Bounds";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
export declare enum FrustumCorner {
    FarBottomLeft = 0,
    FarTopLeft = 1,
    FarTopRight = 2,
    FarBottomRight = 3,
    nearBottomLeft = 4,
    nearTopLeft = 5,
    nearTopRight = 6,
    nearBottomRight = 7,
    unknown = 8
}
export declare class BoundFrustum implements IClone {
    static getPlanesFromMatrix(m: Matrix4x4, np: Plane, fp: Plane, lp: Plane, rp: Plane, tp: Plane, bp: Plane): void;
    constructor(matrix: Matrix4x4);
    protected initBoundingPlane(): void;
    get matrix(): Matrix4x4;
    set matrix(matrix: Matrix4x4);
    get near(): Plane;
    get far(): Plane;
    get left(): Plane;
    get right(): Plane;
    get top(): Plane;
    get bottom(): Plane;
    equalsBoundFrustum(other: BoundFrustum): boolean;
    equalsObj(obj: any): boolean;
    getPlane(index: number): Plane;
    static get3PlaneInterPoint(p1: Plane, p2: Plane, p3: Plane, out: Vector3): void;
    getCorners(corners: Vector3[]): void;
    containsPoint(point: Vector3): number;
    intersects(box: BoundBox | Bounds): boolean;
    containsBoundBox(box: BoundBox | Bounds): number;
    containsBoundSphere(sphere: BoundSphere): number;
    cloneTo(dest: BoundFrustum): void;
    clone(): BoundFrustum;
}
