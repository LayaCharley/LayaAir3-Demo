import { IClone } from "../../utils/IClone";
import { Color } from "../../maths/Color";
export declare class Gradient implements IClone {
    private _mode;
    private _maxColorRGBKeysCount;
    private _maxColorAlphaKeysCount;
    private _colorRGBKeysCount;
    private _colorAlphaKeysCount;
    get mode(): number;
    set mode(value: number);
    get colorRGBKeysCount(): number;
    get colorAlphaKeysCount(): number;
    get maxColorRGBKeysCount(): number;
    get maxColorAlphaKeysCount(): number;
    constructor(maxColorRGBKeyCount: number, maxColorAlphaKeyCount: number);
    addColorRGB(key: number, value: Color): void;
    addColorAlpha(key: number, value: number): void;
    updateColorRGB(index: number, key: number, value: Color): void;
    updateColorAlpha(index: number, key: number, value: number): void;
    evaluateColorRGB(lerpFactor: number, out: Color, startSearchIndex?: number, reverseSearch?: boolean): number;
    evaluateColorAlpha(lerpFactor: number, outColor: Color, startSearchIndex?: number, reverseSearch?: boolean): number;
    cloneTo(destObject: any): void;
    clone(): any;
}
