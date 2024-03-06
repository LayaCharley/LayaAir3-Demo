import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { BaseTexture } from "./BaseTexture";
export declare class Texture2DArray extends BaseTexture {
    readonly depth: number;
    constructor(width: number, height: number, depth: number, format: TextureFormat, mipmap: boolean, canRead: boolean, sRGB?: boolean);
    setImageData(sources: HTMLImageElement[] | HTMLCanvasElement[] | ImageBitmap[], premultiplyAlpha: boolean, invertY: boolean): void;
    setPixlesData(source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean): void;
    setSubPixelsData(xOffset: number, yOffset: number, zOffset: number, width: number, height: number, depth: number, pixels: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, premultiplyAlpha: boolean, invertY: boolean): void;
}
