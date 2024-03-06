import { Handler } from "../utils/Handler";
import { BaseTexture } from "./BaseTexture";
import { FilterMode } from "../RenderEngine/RenderEnum/FilterMode";
import { DDSTextureInfo } from "../RenderEngine/DDSTextureInfo";
import { HDRTextureInfo } from "../RenderEngine/HDRTextureInfo";
import { KTXTextureInfo } from "../RenderEngine/KTXTextureInfo";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { HDREncodeFormat } from "../RenderEngine/RenderEnum/HDREncodeFormat";
export interface TexturePropertyParams {
    wrapModeU?: number;
    wrapModeV?: number;
    filterMode?: FilterMode;
    anisoLevel?: number;
    premultiplyAlpha?: boolean;
    hdrEncodeFormat?: HDREncodeFormat;
}
export declare type TextureConstructParams = ConstructorParameters<typeof Texture2D>;
export declare class Texture2D extends BaseTexture {
    static TEXTURE2D: string;
    static grayTexture: Texture2D;
    static whiteTexture: Texture2D;
    static blackTexture: Texture2D;
    static normalTexture: Texture2D;
    static errorTexture: Texture2D;
    static defalutUITexture: Texture2D;
    static load(url: string, complete: Handler): void;
    constructor(width: number, height: number, format: TextureFormat, mipmap: boolean, canRead: boolean, sRGB?: boolean);
    setImageData(source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, premultiplyAlpha: boolean, invertY: boolean): void;
    setPixelsData(source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean): void;
    setSubPixelsData(xOffset: number, yOffset: number, width: number, height: number, pixels: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, premultiplyAlpha: boolean, invertY: boolean): void;
    setDDSData(ddsInfo: DDSTextureInfo): void;
    setKTXData(ktxInfo: KTXTextureInfo): void;
    setHDRData(hdrInfo: HDRTextureInfo): void;
    get defaultTexture(): BaseTexture;
    getPixels(): Uint8Array;
}
