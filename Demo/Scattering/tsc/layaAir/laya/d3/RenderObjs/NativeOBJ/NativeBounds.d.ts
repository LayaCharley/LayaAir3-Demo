import { Vector3 } from "../../../maths/Vector3";
import { IClone } from "../../../utils/IClone";
import { BoundBox } from "../../math/BoundBox";
import { Bounds } from "../../math/Bounds";
export declare class NativeBounds implements IClone {
    static MemoryBlock_size: number;
    get min(): Vector3;
    set min(value: Vector3);
    get max(): Vector3;
    set max(value: Vector3);
    setMin(value: Vector3): void;
    getMin(): Vector3;
    setMax(value: Vector3): void;
    getMax(): Vector3;
    setCenter(value: Vector3): void;
    getCenter(): Vector3;
    setExtent(value: Vector3): void;
    getExtent(): Vector3;
    constructor(min?: Vector3, max?: Vector3);
    _getBoundBox(): BoundBox;
    calculateBoundsintersection(bounds: Bounds): number;
    cloneTo(destObject: any): void;
    clone(): any;
}
