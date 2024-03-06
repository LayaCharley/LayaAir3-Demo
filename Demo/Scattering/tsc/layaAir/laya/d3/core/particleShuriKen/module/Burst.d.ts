import { IClone } from "../../../../utils/IClone";
export declare class Burst implements IClone {
    private _time;
    private _minCount;
    private _maxCount;
    get time(): number;
    get minCount(): number;
    get maxCount(): number;
    constructor(time?: number, minCount?: number, maxCount?: number);
    cloneTo(destObject: any): void;
    clone(): any;
}
