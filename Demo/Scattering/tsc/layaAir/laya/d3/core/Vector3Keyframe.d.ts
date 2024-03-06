import { Vector3 } from "../../maths/Vector3";
import { Keyframe } from "./Keyframe";
export declare class Vector3Keyframe extends Keyframe {
    inTangent: Vector3;
    outTangent: Vector3;
    value: Vector3;
    inWeight: Vector3;
    outWeight: Vector3;
    weightedMode: Vector3;
    constructor(weightMode?: boolean);
    cloneTo(dest: any): void;
}
