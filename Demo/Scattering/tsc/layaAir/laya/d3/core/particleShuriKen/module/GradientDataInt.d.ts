import { IClone } from "../../../../utils/IClone";
export declare class GradientDataInt implements IClone {
    private _currentLength;
    get gradientCount(): number;
    constructor();
    add(key: number, value: number): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
