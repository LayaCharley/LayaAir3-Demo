import { IClone } from "../utils/IClone";
export interface TypeAniKey {
    f: number;
    val: number | string | boolean;
    tweenType?: string;
    extend?: any;
    tweenInfo?: TypeTweenInfo;
}
export interface TypeTweenInfo {
    outTangent?: number;
    outWeight?: number;
    inTangent?: number;
    inWeight?: number;
    inWeightLock?: boolean;
    outWeightLock?: boolean;
    broken?: boolean;
}
export declare class Keyframe2D implements IClone {
    static defaultWeight: number;
    time: number;
    data: TypeAniKey;
    clone(): Keyframe2D;
    cloneTo(destObject: any): void;
}
