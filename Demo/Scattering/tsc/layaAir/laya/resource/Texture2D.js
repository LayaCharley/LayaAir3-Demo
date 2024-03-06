import { ILaya } from "../../ILaya";
import { LayaGL } from "../layagl/LayaGL";
import { BaseTexture } from "./BaseTexture";
import { Byte } from "../utils/Byte";
import { HalfFloatUtils } from "../utils/HalfFloatUtils";
import { FilterMode } from "../RenderEngine/RenderEnum/FilterMode";
import { DDSTextureInfo } from "../RenderEngine/DDSTextureInfo";
import { KTXTextureInfo } from "../RenderEngine/KTXTextureInfo";
import { RenderCapable } from "../RenderEngine/RenderEnum/RenderCapable";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { LayaEnv } from "../../LayaEnv";
export class Texture2D extends BaseTexture {
    constructor(width, height, format, mipmap = true, canRead, sRGB = false) {
        super(width, height, format);
        this._canRead = false;
        this._dimension = TextureDimension.Tex2D;
        this._gammaSpace = sRGB;
        this._canRead = canRead;
        this._texture = LayaGL.textureContext.createTextureInternal(this._dimension, width, height, format, mipmap, sRGB);
        return;
    }
    static __init__() {
        var pixels = new Uint8Array(4);
        pixels[0] = 128;
        pixels[1] = 128;
        pixels[2] = 128;
        pixels[3] = 255;
        Texture2D.grayTexture = new Texture2D(1, 1, TextureFormat.R8G8B8A8, false, false);
        Texture2D.grayTexture.setPixelsData(pixels, false, false);
        Texture2D.grayTexture.lock = true;
        Texture2D.grayTexture.name = "Default_Gray";
        pixels[0] = 255;
        pixels[1] = 255;
        pixels[2] = 255;
        pixels[3] = 255;
        Texture2D.whiteTexture = new Texture2D(1, 1, TextureFormat.R8G8B8A8, false, false);
        Texture2D.whiteTexture.setPixelsData(pixels, false, false);
        Texture2D.whiteTexture.lock = true;
        Texture2D.whiteTexture.name = "Default_White";
        pixels[0] = 0;
        pixels[1] = 0;
        pixels[2] = 0;
        pixels[3] = 255;
        Texture2D.blackTexture = new Texture2D(1, 1, TextureFormat.R8G8B8A8, false, false);
        Texture2D.blackTexture.setPixelsData(pixels, false, false);
        Texture2D.blackTexture.lock = true;
        Texture2D.blackTexture.name = "Default_Black";
        if (LayaGL.renderEngine.getCapable(RenderCapable.TextureFormat_R16G16B16A16)) {
            let floatPixle = new Uint16Array(4);
            floatPixle[0] = 14336;
            floatPixle[1] = 14336;
            floatPixle[2] = 15360;
            floatPixle[3] = 15360;
            Texture2D.normalTexture = new Texture2D(1, 1, TextureFormat.R16G16B16A16, false, false, false);
            Texture2D.normalTexture.setPixelsData(floatPixle, false, false);
        }
        else {
            pixels[0] = 128;
            pixels[1] = 128;
            pixels[2] = 255;
            pixels[3] = 255;
            Texture2D.normalTexture = new Texture2D(1, 1, TextureFormat.R8G8B8A8, false, false, false);
            Texture2D.normalTexture.setPixelsData(pixels, false, false);
        }
        Texture2D.normalTexture.lock = true;
        Texture2D.normalTexture.name = "Default_Normal";
        pixels = new Uint8Array(12);
        pixels[0] = 255;
        pixels[1] = 255;
        pixels[2] = 255;
        pixels[3] = 255;
        pixels[4] = 255;
        pixels[5] = 255;
        pixels[6] = 128;
        pixels[7] = 255;
        pixels[8] = 128;
        pixels[9] = 128;
        pixels[10] = 0;
        pixels[11] = 255;
        Texture2D.defalutUITexture = new Texture2D(1, 3, TextureFormat.R8G8B8, false, false);
        Texture2D.defalutUITexture.setPixelsData(pixels, false, false);
        Texture2D.defalutUITexture.lock = true;
        Texture2D.errorTexture = Texture2D.whiteTexture;
    }
    static _SimpleAnimatorTextureParse(data, propertyParams = null, constructParams = null) {
        var byte = new Byte(data);
        var version = byte.readUTFString();
        var texture;
        var pixelDataArrays;
        var usePixelData;
        switch (version) {
            case "LAYAANIMATORTEXTURE:0000":
                var textureWidth = byte.readInt32();
                var pixelDataLength = byte.readInt32();
                pixelDataArrays = new Float32Array(textureWidth * textureWidth * 4);
                usePixelData = new Float32Array(byte.readArrayBuffer(pixelDataLength * 4));
                pixelDataArrays.set(usePixelData, 0);
                var texture = new Texture2D(textureWidth, textureWidth, TextureFormat.R32G32B32A32, false, false);
                texture.setPixelsData(pixelDataArrays, false, false);
                texture.filterMode = FilterMode.Point;
                break;
            case "LAYACOMPRESSANIMATORTEXTURE:0000":
                var textureWidth = byte.readInt32();
                var pixelDataLength = byte.readInt32();
                pixelDataArrays = new Uint16Array(byte.readArrayBuffer(pixelDataLength * 2));
                if (!LayaGL.renderEngine.getCapable(RenderCapable.TextureFormat_R16G16B16A16)) {
                    console.log("The platform does not support 16-bit floating-point textures");
                    if (!LayaGL.renderEngine.getCapable(RenderCapable.TextureFormat_R32G32B32A32))
                        console.error("The platform does not support 32-bit floating-point textures");
                    usePixelData = new Float32Array(textureWidth * textureWidth * 4);
                    for (var i = 0, n = pixelDataArrays.length; i < n; i++) {
                        usePixelData[i] = HalfFloatUtils.convertToNumber(pixelDataArrays[i]);
                    }
                    texture = new Texture2D(textureWidth, textureWidth, TextureFormat.R32G32B32A32, false, false);
                    texture.setPixelsData(usePixelData, false, false);
                    texture.filterMode = FilterMode.Point;
                }
                else {
                    usePixelData = new Uint16Array(textureWidth * textureWidth * 4);
                    usePixelData.set(pixelDataArrays, 0);
                    texture = new Texture2D(textureWidth, textureWidth, TextureFormat.R16G16B16A16, false, false);
                    texture.setPixelsData(usePixelData, false, false);
                    texture.filterMode = FilterMode.Point;
                }
                break;
            default:
                throw "Laya3D:unknow version.";
        }
        return texture;
    }
    static _parseImage(imageSource, propertyParams = null, constructParams = null) {
        let format = constructParams ? constructParams[2] : TextureFormat.R8G8B8A8;
        let mipmap = constructParams ? constructParams[3] : true;
        let canread = constructParams ? constructParams[4] : false;
        let srgb = constructParams ? constructParams[5] : false;
        let texture = new Texture2D(imageSource.width, imageSource.height, format, mipmap, canread, srgb);
        if (propertyParams) {
            let pma = propertyParams.premultiplyAlpha;
            texture.setImageData(imageSource, pma, false);
            texture.setProperties(propertyParams);
        }
        else
            texture.setImageData(imageSource, false, false);
        if (canread) {
            if (LayaEnv.isConch && imageSource._nativeObj) {
                texture._pixels = new Uint8Array(imageSource._nativeObj.getImageData(0, 0, imageSource.width, imageSource.height));
            }
            else {
                ILaya.Browser.canvas.size(imageSource.width, imageSource.height);
                ILaya.Browser.canvas.clear();
                ILaya.Browser.context.drawImage(imageSource, 0, 0, imageSource.width, imageSource.height);
                texture._pixels = new Uint8Array(ILaya.Browser.context.getImageData(0, 0, imageSource.width, imageSource.height).data.buffer);
            }
        }
        return texture;
    }
    static _parseDDS(data, propertyParams = null, constructParams = null) {
        let ddsInfo = DDSTextureInfo.getDDSTextureInfo(data);
        let texture = new Texture2D(ddsInfo.width, ddsInfo.height, ddsInfo.format, ddsInfo.mipmapCount > 1, false, false);
        texture.setDDSData(ddsInfo);
        if (propertyParams)
            texture.setProperties(propertyParams);
        return texture;
    }
    static _parseKTX(data, propertyParams = null, constructParams = null) {
        let ktxInfo = KTXTextureInfo.getKTXTextureInfo(data);
        let texture = new Texture2D(ktxInfo.width, ktxInfo.height, ktxInfo.format, ktxInfo.mipmapCount > 1, false, ktxInfo.sRGB);
        texture.setKTXData(ktxInfo);
        if (propertyParams)
            texture.setProperties(propertyParams);
        return texture;
    }
    static _parsePVR(data, propertyParams = null, constructParams = null) {
        throw "pvr !";
    }
    static load(url, complete) {
        ILaya.loader.load(url, complete, null, ILaya.Loader.TEXTURE2D);
    }
    setImageData(source, premultiplyAlpha, invertY) {
        let texture = this._texture;
        LayaGL.textureContext.setTextureImageData(texture, source, premultiplyAlpha, invertY);
    }
    setPixelsData(source, premultiplyAlpha, invertY) {
        let texture = this._texture;
        LayaGL.textureContext.setTexturePixelsData(texture, source, premultiplyAlpha, invertY);
    }
    setSubPixelsData(xOffset, yOffset, width, height, pixels, mipmapLevel, generateMipmap, premultiplyAlpha, invertY) {
        let texture = this._texture;
        LayaGL.textureContext.setTextureSubPixelsData(texture, pixels, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }
    setDDSData(ddsInfo) {
        let texture = this._texture;
        LayaGL.textureContext.setTextureDDSData(texture, ddsInfo);
    }
    setKTXData(ktxInfo) {
        let texture = this._texture;
        LayaGL.textureContext.setTextureKTXData(texture, ktxInfo);
    }
    setHDRData(hdrInfo) {
        let texture = this._texture;
        LayaGL.textureContext.setTextureHDRData(texture, hdrInfo);
    }
    get defaultTexture() {
        return Texture2D.grayTexture;
    }
    getPixels() {
        if (this._canRead && this._pixels) {
            return this._pixels;
        }
        else {
            throw new Error("Texture2D: must set texture canRead is true.");
        }
    }
    setProperties(propertyParams) {
        if (propertyParams) {
            if (propertyParams.wrapModeU != null)
                this.wrapModeU = propertyParams.wrapModeU;
            if (propertyParams.wrapModeV != null)
                this.wrapModeV = propertyParams.wrapModeV;
            if (propertyParams.filterMode != null)
                this.filterMode = propertyParams.filterMode;
            if (propertyParams.anisoLevel != null)
                this.anisoLevel = propertyParams.anisoLevel;
        }
    }
}
Texture2D.TEXTURE2D = "TEXTURE2D";
Texture2D.grayTexture = null;
Texture2D.whiteTexture = null;
Texture2D.blackTexture = null;
Texture2D.normalTexture = null;
Texture2D.errorTexture = null;
Texture2D.defalutUITexture = null;

//# sourceMappingURL=Texture2D.js.map
