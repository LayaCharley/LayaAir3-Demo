import { Vector2 } from "../../maths/Vector2";
import { Keyframe } from "./Keyframe";
export declare class Vector2Keyframe extends Keyframe {
    inTangent: Vector2;
    outTangent: Vector2;
    value: Vector2;
    inWeight: Vector2;
    outWeight: Vector2;
    weightedMode: Vector2;
    constructor(weightMode?: boolean);
    cloneTo(dest: any): void;
}
