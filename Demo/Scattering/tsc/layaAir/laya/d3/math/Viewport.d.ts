import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
export declare class Viewport {
    static _tempViewport: Viewport;
    x: number;
    y: number;
    width: number;
    height: number;
    minDepth: number;
    maxDepth: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    project(source: Vector3, matrix: Matrix4x4, out: Vector4): void;
    unprojectFromMat(source: Vector3, matrix: Matrix4x4, out: Vector3): void;
    unprojectFromWVP(source: Vector3, projection: Matrix4x4, view: Matrix4x4, world: Matrix4x4, out: Vector3): void;
    set(x: number, y: number, width: number, height: number): void;
    cloneTo(out: Viewport): void;
}
