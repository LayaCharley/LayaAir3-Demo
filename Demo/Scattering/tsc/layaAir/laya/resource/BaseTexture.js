import { Config } from "../../Config";
import { LayaGL } from "../layagl/LayaGL";
import { HDREncodeFormat } from "../RenderEngine/RenderEnum/HDREncodeFormat";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { Resource } from "./Resource";
export class BaseTexture extends Resource {
    constructor(width, height, format) {
        super();
        this._gammaSpace = false;
        this._width = width;
        this._height = height;
        this._format = format;
        this.destroyedImmediately = Config.destroyResourceImmediatelyDefault;
        this.hdrEncodeFormat = HDREncodeFormat.NONE;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    get dimension() {
        return this._dimension;
    }
    get format() {
        return this._format;
    }
    get mipmap() {
        return this._texture.mipmap;
    }
    get mipmapCount() {
        return this._texture.mipmapCount;
    }
    get anisoLevel() {
        return this._texture.anisoLevel;
    }
    set anisoLevel(value) {
        this._texture.anisoLevel = value;
    }
    get filterMode() {
        return this._texture.filterMode;
    }
    set filterMode(value) {
        this._texture.filterMode = value;
    }
    get wrapModeU() {
        return this._texture.wrapU;
    }
    set wrapModeU(value) {
        this._texture.wrapU = value;
    }
    get wrapModeV() {
        return this._texture.wrapV;
    }
    set wrapModeV(value) {
        this._texture.wrapV = value;
    }
    get wrapModeW() {
        return this._texture.wrapW;
    }
    set wrapModeW(value) {
        this._texture.wrapW = value;
    }
    get compareMode() {
        return this._texture.compareMode;
    }
    set compareMode(value) {
        this._texture.compareMode = LayaGL.textureContext.setTextureCompareMode(this._texture, value);
    }
    get gammaCorrection() {
        return this._texture.gammaCorrection;
    }
    set baseMipmapLevel(value) {
        this._texture.baseMipmapLevel = value;
    }
    get baseMipmapLevel() {
        return this._texture.baseMipmapLevel;
    }
    set maxMipmapLevel(value) {
        this._texture.maxMipmapLevel = value;
    }
    get maxMipmapLevel() {
        return this._texture.maxMipmapLevel;
    }
    get gammaSpace() {
        return this._texture.useSRGBLoad || this._texture.gammaCorrection > 1;
    }
    gpuCompressFormat() {
        let format = this._format;
        switch (format) {
            case TextureFormat.R8G8B8:
            case TextureFormat.R8G8B8A8:
            case TextureFormat.R16G16B16:
            case TextureFormat.R16G16B16A16:
            case TextureFormat.R32G32B32:
            case TextureFormat.R32G32B32A32:
            case TextureFormat.R5G6B5:
            case TextureFormat.Alpha8:
                return false;
            case TextureFormat.DXT1:
            case TextureFormat.DXT3:
            case TextureFormat.DXT5:
            case TextureFormat.ETC1RGB:
            case TextureFormat.ETC2RGB:
            case TextureFormat.ETC2RGBA:
            case TextureFormat.ETC2SRGB_Alpha8:
            case TextureFormat.ETC2SRGB:
            case TextureFormat.PVRTCRGB_2BPPV:
            case TextureFormat.PVRTCRGBA_2BPPV:
            case TextureFormat.PVRTCRGB_4BPPV:
            case TextureFormat.PVRTCRGBA_4BPPV:
            case TextureFormat.ASTC4x4:
            case TextureFormat.ASTC4x4SRGB:
            case TextureFormat.ASTC6x6:
            case TextureFormat.ASTC6x6SRGB:
            case TextureFormat.ASTC8x8:
            case TextureFormat.ASTC8x8SRGB:
            case TextureFormat.ASTC10x10:
            case TextureFormat.ASTC10x10SRGB:
            case TextureFormat.ASTC12x12:
            case TextureFormat.ASTC12x12SRGB:
                return true;
            default:
                return false;
        }
    }
    _getFormatByteCount() {
        switch (this._format) {
            case TextureFormat.R8G8B8:
                return 3;
            case TextureFormat.R8G8B8A8:
                return 4;
            case TextureFormat.R5G6B5:
                return 1;
            case TextureFormat.Alpha8:
                return 1;
            case TextureFormat.R16G16B16A16:
                return 2;
            case TextureFormat.R32G32B32A32:
                return 4;
            default:
                throw "Texture2D: unknown format.";
        }
    }
    _getSource() {
        return this._texture.resource;
    }
    get defaultTexture() {
        throw "defaulte";
    }
    _disposeResource() {
        this._texture.dispose();
    }
}

//# sourceMappingURL=BaseTexture.js.map
