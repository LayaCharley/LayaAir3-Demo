import { Filter } from "./Filter";
import { IFilter } from "./IFilter";
export declare class ColorFilter extends Filter implements IFilter {
    _matrix: any[];
    constructor(mat?: any[]);
    gray(): ColorFilter;
    color(red?: number, green?: number, blue?: number, alpha?: number): ColorFilter;
    setColor(color: string): ColorFilter;
    setByMatrix(matrix: any[]): ColorFilter;
    get type(): number;
    adjustColor(brightness: number, contrast: number, saturation: number, hue: number): ColorFilter;
    adjustBrightness(brightness: number): ColorFilter;
    adjustContrast(contrast: number): ColorFilter;
    adjustSaturation(saturation: number): ColorFilter;
    adjustHue(hue: number): ColorFilter;
    reset(): ColorFilter;
    private _multiplyMatrix;
    private _clampValue;
    private _fixMatrix;
    private _copyMatrix;
    onAfterDeserialize(): void;
}
