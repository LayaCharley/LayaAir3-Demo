import { GradientAngularVelocity } from "./GradientAngularVelocity";
import { IClone } from "../../../../utils/IClone";
export declare class RotationOverLifetime implements IClone {
    private _angularVelocity;
    enable: boolean;
    get angularVelocity(): GradientAngularVelocity;
    constructor(angularVelocity: GradientAngularVelocity);
    cloneTo(destObject: any): void;
    clone(): any;
}
