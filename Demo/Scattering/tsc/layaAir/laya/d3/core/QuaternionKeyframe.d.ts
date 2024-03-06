import { Quaternion } from "../../maths/Quaternion";
import { Vector4 } from "../../maths/Vector4";
import { Keyframe } from "./Keyframe";
export declare class QuaternionKeyframe extends Keyframe {
    inTangent: Vector4;
    outTangent: Vector4;
    value: Quaternion;
    inWeight: Vector4;
    outWeight: Vector4;
    weightedMode: Vector4;
    constructor(weightMode?: boolean);
    cloneTo(dest: any): void;
}