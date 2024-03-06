import { IClone } from "../../utils/IClone";
export declare enum WeightedMode {
    None = 0,
    In = 1,
    Out = 2,
    Both = 3
}
export declare class Keyframe implements IClone {
    static defaultWeight: number;
    time: number;
    constructor();
    cloneTo(destObject: any): void;
    clone(): any;
}
