import { IClone } from "../../../utils/IClone";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
export declare class ColliderShape implements IClone {
    static SHAPEORIENTATION_UPX: number;
    static SHAPEORIENTATION_UPY: number;
    static SHAPEORIENTATION_UPZ: number;
    needsCustomCollisionCallback: boolean;
    get type(): number;
    get localOffset(): Vector3;
    set localOffset(value: Vector3);
    get localRotation(): Quaternion;
    set localRotation(value: Quaternion);
    constructor();
    updateLocalTransformations(): void;
    cloneTo(destObject: any): void;
    clone(): any;
    destroy(): void;
}
