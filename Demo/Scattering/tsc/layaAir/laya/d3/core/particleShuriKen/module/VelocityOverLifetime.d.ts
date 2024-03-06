import { IClone } from "../../../../utils/IClone";
import { GradientVelocity } from "./GradientVelocity";
export declare class VelocityOverLifetime implements IClone {
    enable: boolean;
    space: number;
    get velocity(): GradientVelocity;
    constructor(velocity: GradientVelocity);
    cloneTo(destObject: any): void;
    clone(): any;
}
