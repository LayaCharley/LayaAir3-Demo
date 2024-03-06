import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { NativeGLObject } from "./NativeGLObject";
export class NativeGLTextureContext extends NativeGLObject {
    constructor(engine, native) {
        super(engine);
        this._native = native;
    }
    createTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
        return this._native.createTextureInternal(dimension, width, height, format, generateMipmap, sRGB);
    }
    setTextureImageData(texture, source, premultiplyAlpha, invertY) {
        this._native.setTextureImageData(texture, source._nativeObj.conchImgId, premultiplyAlpha, invertY);
    }
    setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
        this._native.setTexturePixelsData(texture, source, premultiplyAlpha, invertY);
    }
    initVideoTextureData(texture) {
        this._native.initVideoTextureData(texture);
    }
    setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        this._native.setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }
    setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
        throw new Error("setTextureSubImageData Method not implemented.");
    }
    setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
        this._native.setTexture3DImageData(texture, source.map(function (s) { return s._nativeObj; }), depth, premultiplyAlpha, invertY);
    }
    setTexture3DPixlesData(texture, source, depth, premultiplyAlpha, invertY) {
        this._native.setTexture3DPixlesData(texture, source, depth, premultiplyAlpha, invertY);
    }
    setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
        this._native.setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY);
    }
    setTextureHDRData(texture, hdrInfo) {
        let sourceData = hdrInfo.readScanLine();
        throw new Error("setTextureHDRData Method not implemented.");
        this.setTexturePixelsData(texture, sourceData, false, false);
    }
    setTextureDDSData(texture, ddsInfo) {
        this._native.setTextureKTXData(texture, ddsInfo);
    }
    setTextureKTXData(texture, ktxInfo) {
        this._native.setTextureKTXData(texture, ktxInfo);
    }
    setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
        var images = [];
        var length = sources.length;
        for (let index = 0; index < length; index++) {
            images.push(sources[index]._nativeObj);
        }
        this._native.setCubeImageData(texture, images, premultiplyAlpha, invertY);
    }
    setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
        this._native.setCubePixelsData(texture, source, premultiplyAlpha, invertY);
    }
    setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
        this._native.setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }
    setCubeDDSData(texture, ddsInfo) {
        this._native.setCubeDDSData(texture, ddsInfo);
    }
    setCubeKTXData(texture, ktxInfo) {
        this._native.setCubeKTXData(texture, ktxInfo);
    }
    setTextureCompareMode(texture, compareMode) {
        return this._native.setTextureCompareMode(texture, compareMode);
    }
    bindRenderTarget(renderTarget, faceIndex = 0) {
        this._native.bindRenderTarget(renderTarget, faceIndex);
    }
    bindoutScreenTarget() {
        this._native.bindoutScreenTarget();
    }
    unbindRenderTarget(renderTarget) {
        this._native.unbindRenderTarget(renderTarget);
    }
    createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
        return this._native.createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB);
    }
    createRenderTargetInternal(width, height, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
        return this._native.createRenderTargetInternal(width, height, colorFormat, depthStencilFormat ? depthStencilFormat : RenderTargetFormat.None, generateMipmap, sRGB, multiSamples);
    }
    createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
        return this._native.createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples);
    }
    createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB) {
        throw new Error("createRenderTextureCubeInternal Method not implemented.");
    }
    setupRendertargetTextureAttachment(renderTarget, texture) {
        this._native.setupRendertargetTextureAttachment(renderTarget, texture);
    }
    readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
        return this._native.readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out);
    }
    updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
        this._native.updateVideoTexture(texture, video._nativeObj.conchImgId, premultiplyAlpha, invertY);
    }
    getRenderTextureData(internalTex, x, y, width, height) {
        return this._native.getRenderTextureData(internalTex, x, y, width, height);
    }
}

//# sourceMappingURL=NativeGLTextureContext.js.map
