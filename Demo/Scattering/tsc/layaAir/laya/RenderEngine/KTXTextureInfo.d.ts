import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
export declare class KTXTextureInfo {
    source: ArrayBuffer;
    compress: boolean;
    sRGB: boolean;
    dimension: TextureDimension;
    width: number;
    height: number;
    format: TextureFormat;
    mipmapCount: number;
    bytesOfKeyValueData: number;
    headerOffset: number;
    static getLayaFormat(glFormat: number, glInternalFormat: number, glType: number, glTypeSize: number): {
        format: TextureFormat;
        sRGB: boolean;
    };
    static getKTXTextureInfo(source: ArrayBuffer): KTXTextureInfo;
    static createKTX1Info(source: ArrayBuffer): KTXTextureInfo;
    constructor(source: ArrayBuffer, compress: boolean, sRGB: boolean, dimension: TextureDimension, width: number, height: number, format: TextureFormat, mipmapCount: number, bytesOfKeyValueData: number, headerOffset: number);
}
