import { Keyframe } from "./Keyframe";
export declare class FloatKeyframe extends Keyframe {
    inTangent: number;
    outTangent: number;
    value: number;
    inWeight: number;
    outWeight: number;
    weightedMode: number;
    constructor();
    cloneTo(destObject: any): void;
    clone(): FloatKeyframe;
}
