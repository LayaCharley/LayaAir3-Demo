import { DDSTextureInfo } from "../RenderEngine/DDSTextureInfo";
import { KTXTextureInfo } from "../RenderEngine/KTXTextureInfo";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { BaseTexture } from "./BaseTexture";
export declare enum TextureCubeFace {
    PositiveX = 0,
    NegativeX = 1,
    PositiveY = 2,
    NegativeY = 3,
    PositiveZ = 4,
    NegativeZ = 5
}
export declare class TextureCube extends BaseTexture {
    private static _blackTexture;
    private static _grayTexture;
    private static _whiteTexture;
    private static _errorTexture;
    static get blackTexture(): TextureCube;
    static get grayTexture(): TextureCube;
    static get whiteTexture(): TextureCube;
    static get errorTexture(): TextureCube;
    constructor(size: number, format: TextureFormat, mipmap?: boolean, sRGB?: boolean);
    setImageData(source: (HTMLImageElement | HTMLCanvasElement | ImageBitmap)[], premultiplyAlpha: boolean, invertY: boolean): void;
    setPixelsData(source: ArrayBufferView[], premultiplyAlpha: boolean, invertY: boolean): void;
    updateSubPixelsData(source: ArrayBufferView[], xOffset: number, yOffset: number, width: number, height: number, mipmapLevel: number, generateMipmap: boolean, premultiplyAlpha: boolean, invertY: boolean): void;
    setDDSData(ddsInfo: DDSTextureInfo): void;
    setKTXData(ktxInfo: KTXTextureInfo): void;
    get defaultTexture(): BaseTexture;
}
