import { Vector4 } from "../maths/Vector4";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { Texture2D } from "../resource/Texture2D";
export declare class HDRTextureInfo {
    source: ArrayBuffer;
    byteOffset: number;
    decreaseX: boolean;
    decreaseY: boolean;
    width: number;
    height: number;
    format: TextureFormat;
    static HDRTEXTURE: string;
    static _parseHDRTexture(data: ArrayBuffer, propertyParams?: any, constructParams?: any[]): Texture2D;
    static getHDRInfo(source: ArrayBuffer): HDRTextureInfo;
    private static getLineString;
    constructor(source: ArrayBuffer, byteOffset: number, decreaseX: boolean, decreaseY: boolean, width: number, height: number, format: TextureFormat);
    get_32_bit_rle_rgbe(): ArrayBufferView;
    readScanLine(): ArrayBufferView;
    readcolors(scanlineArray: Uint8Array, getc: () => number, wrong: () => void): void;
    olddreadcolors(scanlineArray: Uint8Array, getc: () => number, r: number, g: number, b: number, e: number): void;
    color_color(col: Vector4, clr: Vector4): void;
}
