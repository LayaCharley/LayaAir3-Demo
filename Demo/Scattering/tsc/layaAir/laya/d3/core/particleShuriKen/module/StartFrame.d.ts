import { IClone } from "../../../../utils/IClone";
export declare class StartFrame implements IClone {
    static createByConstant(constant?: number): StartFrame;
    static createByRandomTwoConstant(constantMin?: number, constantMax?: number): StartFrame;
    private _type;
    private _constant;
    private _constantMin;
    private _constantMax;
    get type(): number;
    get constant(): number;
    get constantMin(): number;
    get constantMax(): number;
    constructor();
    cloneTo(destObject: any): void;
    clone(): any;
}
