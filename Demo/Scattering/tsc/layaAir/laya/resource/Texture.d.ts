import { Handler } from "../utils/Handler";
import { BaseTexture } from "./BaseTexture";
import { Resource } from "./Resource";
export declare class Texture extends Resource {
    static readonly DEF_UV: Float32Array;
    static readonly NO_UV: Float32Array;
    static readonly INV_UV: Float32Array;
    uvrect: any[];
    private _bitmap;
    private _w;
    private _h;
    offsetX: number;
    offsetY: number;
    sourceWidth: number;
    sourceHeight: number;
    url: string;
    uuid: string;
    scaleRate: number;
    _sizeGrid?: Array<number>;
    _stateNum?: number;
    static create(source: Texture | BaseTexture, x: number, y: number, width: number, height: number, offsetX?: number, offsetY?: number, sourceWidth?: number, sourceHeight?: number): Texture;
    static createFromTexture(texture: Texture, x: number, y: number, width: number, height: number): Texture;
    get uv(): ArrayLike<number>;
    set uv(value: ArrayLike<number>);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    get bitmap(): BaseTexture;
    set bitmap(value: BaseTexture);
    constructor(source?: Texture | BaseTexture, uv?: ArrayLike<number>, sourceWidth?: number, sourceHeight?: number);
    setTo(bitmap?: BaseTexture, uv?: ArrayLike<number>, sourceWidth?: number, sourceHeight?: number): void;
    load(url: string, complete?: Handler): Promise<void>;
    getTexturePixels(x: number, y: number, width: number, height: number): Uint8Array;
    getPixels(x: number, y: number, width: number, height: number): Uint8Array;
    recoverBitmap(onok?: () => void): void;
    disposeBitmap(): void;
    get valid(): boolean;
    get obsolute(): boolean;
    set obsolute(value: boolean);
    protected _disposeResource(): void;
    getCachedClip(x: number, y: number, width: number, height: number): Texture;
}