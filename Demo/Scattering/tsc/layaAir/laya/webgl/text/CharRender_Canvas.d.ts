import { CharRenderInfo } from "./CharRenderInfo";
import { ICharRender } from "./ICharRender";
export declare class CharRender_Canvas extends ICharRender {
    private static canvas;
    private ctx;
    private lastScaleX;
    private lastScaleY;
    private maxTexW;
    private maxTexH;
    private scaleFontSize;
    private showDbgInfo;
    private supportImageData;
    constructor(maxw: number, maxh: number, scalefont?: boolean, useImageData?: boolean, showdbg?: boolean);
    get canvasWidth(): number;
    set canvasWidth(w: number);
    getWidth(font: string, str: string): number;
    scale(sx: number, sy: number): void;
    getCharBmp(char: string, font: string, lineWidth: number, colStr: string, strokeColStr: string, cri: CharRenderInfo, margin_left: number, margin_top: number, margin_right: number, margin_bottom: number, rect?: any[] | null): ImageData | null;
    getCharCanvas(char: string, font: string, lineWidth: number, colStr: string, strokeColStr: string, cri: CharRenderInfo, margin_left: number, margin_top: number, margin_right: number, margin_bottom: number): ImageData;
}
