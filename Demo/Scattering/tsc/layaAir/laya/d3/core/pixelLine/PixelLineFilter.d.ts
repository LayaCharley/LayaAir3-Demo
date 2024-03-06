import { GeometryElement } from "../GeometryElement";
import { PixelLineData } from "./PixelLineData";
import { PixelLineRenderer } from "./PixelLineRenderer";
export declare class PixelLineFilter extends GeometryElement {
    private static _tempVector0;
    private static _tempVector1;
    constructor(owner: PixelLineRenderer, maxLineCount: number);
    _getLineData(index: number, out: PixelLineData): void;
    destroy(): void;
}
