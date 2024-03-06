import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
export declare class DDSTextureInfo {
    width: number;
    height: number;
    mipmapCount: number;
    isCube: boolean;
    bpp: number;
    blockBytes: number;
    format: TextureFormat;
    compressed: boolean;
    dataOffset: number;
    source: ArrayBuffer;
    constructor(width: number, height: number, mipmapCount: number, isCube: boolean, bpp: number, blockBytes: number, dataOffset: number, format: TextureFormat, compressed: boolean, sourceData: ArrayBuffer);
    static getDDSTextureInfo(source: ArrayBuffer): DDSTextureInfo;
}
