import { PixelLineRenderer } from "./PixelLineRenderer";
import { PixelLineData } from "./PixelLineData";
import { RenderableSprite3D } from "../RenderableSprite3D";
import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
export declare class PixelLineSprite3D extends RenderableSprite3D {
    private _isRenderActive;
    private _isInRenders;
    get maxLineCount(): number;
    set maxLineCount(value: number);
    get lineCount(): number;
    get pixelLineRenderer(): PixelLineRenderer;
    constructor(maxCount?: number, name?: string);
    addLine(startPosition: Vector3, endPosition: Vector3, startColor: Color, endColor: Color): void;
    addLines(lines: PixelLineData[]): void;
    removeLine(index: number): void;
    setLine(index: number, startPosition: Vector3, endPosition: Vector3, startColor: Color, endColor: Color): void;
    getLine(index: number, out: PixelLineData): void;
    clear(): void;
}
