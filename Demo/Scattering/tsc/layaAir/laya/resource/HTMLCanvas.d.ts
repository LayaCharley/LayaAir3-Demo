import { Texture } from "./Texture";
import { Context } from "./Context";
import { RenderTexture2D } from "./RenderTexture2D";
import { Resource } from "./Resource";
export declare class HTMLCanvas extends Resource {
    private _ctx;
    protected _width: number;
    protected _height: number;
    get source(): HTMLCanvasElement;
    get width(): number;
    set width(width: number);
    get height(): number;
    set height(height: number);
    constructor(createCanvas?: boolean);
    clear(): void;
    destroy(): void;
    release(): void;
    get context(): Context;
    getContext(contextID: string, other?: any): Context;
    getMemSize(): number;
    size(w: number, h: number): void;
    getTexture(): Texture | null | RenderTexture2D;
    toBase64(type: string, encoderOptions: number): string | null;
    toBase64Async(type: string, encoderOptions: number, callBack: Function): void;
}
