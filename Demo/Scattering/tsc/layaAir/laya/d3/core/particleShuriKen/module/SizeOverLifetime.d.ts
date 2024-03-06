import { GradientSize } from "./GradientSize";
import { IClone } from "../../../../utils/IClone";
export declare class SizeOverLifetime implements IClone {
    private _size;
    enable: boolean;
    get size(): GradientSize;
    constructor(size: GradientSize);
    cloneTo(destObject: any): void;
    clone(): any;
}
