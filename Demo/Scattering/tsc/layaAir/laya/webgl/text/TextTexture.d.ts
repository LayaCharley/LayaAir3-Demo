import { Resource } from "../../resource/Resource";
import { CharRenderInfo } from "./CharRenderInfo";
export declare class TextTexture extends Resource {
    private static pool;
    private static poolLen;
    private static cleanTm;
    private _render2DContext;
    genID: number;
    bitmap: any;
    curUsedCovRate: number;
    curUsedCovRateAtlas: number;
    lastTouchTm: number;
    ri: CharRenderInfo;
    get gammaCorrection(): number;
    constructor(textureW: number, textureH: number);
    recreateResource(): void;
    addChar(data: ImageData, x: number, y: number, uv?: any[]): any[];
    addCharCanvas(canv: any, x: number, y: number, uv?: any[]): any[];
    fillWhite(): void;
    discard(): void;
    static getTextTexture(w: number, h: number): TextTexture;
    protected _disposeResource(): void;
    static clean(): void;
    touchRect(ri: CharRenderInfo, curloop: number): void;
    get texture(): any;
    drawOnScreen(x: number, y: number): void;
}
