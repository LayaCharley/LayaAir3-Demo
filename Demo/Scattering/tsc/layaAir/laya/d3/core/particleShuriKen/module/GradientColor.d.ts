import { Gradient } from "../../Gradient";
import { IClone } from "../../../../utils/IClone";
import { Vector4 } from "../../../../maths/Vector4";
export declare class GradientColor implements IClone {
    static createByConstant(constant: Vector4): GradientColor;
    static createByGradient(gradient: Gradient): GradientColor;
    static createByRandomTwoConstant(minConstant: Vector4, maxConstant: Vector4): GradientColor;
    static createByRandomTwoGradient(minGradient: Gradient, maxGradient: Gradient): GradientColor;
    private _type;
    private _constant;
    private _constantMin;
    private _constantMax;
    private _gradient;
    private _gradientMin;
    private _gradientMax;
    get type(): number;
    get constant(): Vector4;
    get constantMin(): Vector4;
    get constantMax(): Vector4;
    get gradient(): Gradient;
    get gradientMin(): Gradient;
    get gradientMax(): Gradient;
    constructor();
    cloneTo(destObject: any): void;
    clone(): any;
}
