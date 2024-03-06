import { GradientDataNumber } from "./GradientDataNumber";
import { IClone } from "../../../../utils/IClone";
import { Vector3 } from "../../../../maths/Vector3";
export declare class GradientAngularVelocity implements IClone {
    static createByConstant(constant: number): GradientAngularVelocity;
    static createByConstantSeparate(separateConstant: Vector3): GradientAngularVelocity;
    static createByGradient(gradient: GradientDataNumber): GradientAngularVelocity;
    static createByGradientSeparate(gradientX: GradientDataNumber, gradientY: GradientDataNumber, gradientZ: GradientDataNumber): GradientAngularVelocity;
    static createByRandomTwoConstant(constantMin: number, constantMax: number): GradientAngularVelocity;
    static createByRandomTwoConstantSeparate(separateConstantMin: Vector3, separateConstantMax: Vector3): GradientAngularVelocity;
    static createByRandomTwoGradient(gradientMin: GradientDataNumber, gradientMax: GradientDataNumber): GradientAngularVelocity;
    static createByRandomTwoGradientSeparate(gradientXMin: GradientDataNumber, gradientXMax: GradientDataNumber, gradientYMin: GradientDataNumber, gradientYMax: GradientDataNumber, gradientZMin: GradientDataNumber, gradientZMax: GradientDataNumber, gradientWMin: GradientDataNumber, gradientWMax: GradientDataNumber): GradientAngularVelocity;
    private _type;
    private _separateAxes;
    private _constant;
    private _constantSeparate;
    private _gradient;
    private _gradientX;
    private _gradientY;
    private _gradientZ;
    private _gradientW;
    private _constantMin;
    private _constantMax;
    private _constantMinSeparate;
    private _constantMaxSeparate;
    private _gradientMin;
    private _gradientMax;
    private _gradientXMin;
    private _gradientXMax;
    private _gradientYMin;
    private _gradientYMax;
    private _gradientZMin;
    private _gradientZMax;
    private _gradientWMin;
    private _gradientWMax;
    get type(): number;
    get separateAxes(): boolean;
    get constant(): number;
    get constantSeparate(): Vector3;
    get gradient(): GradientDataNumber;
    get gradientX(): GradientDataNumber;
    get gradientY(): GradientDataNumber;
    get gradientZ(): GradientDataNumber;
    get gradientW(): GradientDataNumber;
    get constantMin(): number;
    get constantMax(): number;
    get constantMinSeparate(): Vector3;
    get constantMaxSeparate(): Vector3;
    get gradientMin(): GradientDataNumber;
    get gradientMax(): GradientDataNumber;
    get gradientXMin(): GradientDataNumber;
    get gradientXMax(): GradientDataNumber;
    get gradientYMin(): GradientDataNumber;
    get gradientYMax(): GradientDataNumber;
    get gradientZMin(): GradientDataNumber;
    get gradientZMax(): GradientDataNumber;
    get gradientWMin(): GradientDataNumber;
    get gradientWMax(): GradientDataNumber;
    constructor();
    cloneTo(destObject: any): void;
    clone(): any;
}