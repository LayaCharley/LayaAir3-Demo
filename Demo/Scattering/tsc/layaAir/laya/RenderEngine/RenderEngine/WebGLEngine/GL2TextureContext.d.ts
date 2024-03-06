import { GLTextureContext } from "./GLTextureContext";
import { WebGLEngine } from "./WebGLEngine";
import { WebGLInternalTex } from "./WebGLInternalTex";
import { WebGLInternalRT } from "./WebGLInternalRT";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { HDRTextureInfo } from "../../HDRTextureInfo";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { TextureFormat } from "../../RenderEnum/TextureFormat";
import { KTXTextureInfo } from "../../KTXTextureInfo";
import { ITexture3DContext } from "../../RenderInterface/ITextureContext";
export declare class GL2TextureContext extends GLTextureContext implements ITexture3DContext {
    protected _gl: WebGL2RenderingContext;
    constructor(engine: WebGLEngine);
    protected getTarget(dimension: TextureDimension): number;
    glTextureParam(format: TextureFormat, useSRGB: boolean): {
        internalFormat: number;
        format: number;
        type: number;
    };
    glRenderBufferParam(format: RenderTargetFormat, useSRGB: boolean): {
        internalFormat: number;
        attachment: number;
    };
    glRenderTextureParam(format: RenderTargetFormat, useSRGB: boolean): {
        internalFormat: number;
        format: number;
        type: number;
    };
    getGLtexMemory(tex: WebGLInternalTex, depth?: number): number;
    supportSRGB(format: TextureFormat | RenderTargetFormat, mipmap: boolean): boolean;
    setTextureImageData(texture: WebGLInternalTex, source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, premultiplyAlpha: boolean, invertY: boolean): void;
    setTextureSubImageData(texture: WebGLInternalTex, source: HTMLImageElement | HTMLCanvasElement | ImageBitmap, x: number, y: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexturePixelsData(texture: WebGLInternalTex, source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexture3DImageData(texture: WebGLInternalTex, sources: HTMLImageElement[] | HTMLCanvasElement[] | ImageBitmap[], depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexture3DPixlesData(texture: WebGLInternalTex, source: ArrayBufferView, depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexture3DSubPixelsData(texture: WebGLInternalTex, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, zOffset: number, width: number, height: number, depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTextureHDRData(texture: WebGLInternalTex, hdrInfo: HDRTextureInfo): void;
    setTextureKTXData(texture: WebGLInternalTex, ktxInfo: KTXTextureInfo): void;
    setCubeImageData(texture: WebGLInternalTex, sources: (HTMLImageElement | HTMLCanvasElement | ImageBitmap)[], premultiplyAlpha: boolean, invertY: boolean): void;
    setCubePixelsData(texture: WebGLInternalTex, source: ArrayBufferView[], premultiplyAlpha: boolean, invertY: boolean): void;
    setCubeKTXData(texture: WebGLInternalTex, ktxInfo: KTXTextureInfo): void;
    getCubeKTXRGBMData(texture: WebGLInternalTex, ktxInfo: KTXTextureInfo): void;
    setTextureCompareMode(texture: WebGLInternalTex, compareMode: TextureCompareMode): TextureCompareMode;
    createRenderbuffer(width: number, height: number, internalFormat: number, samples: number): WebGLRenderbuffer;
    createRenderTextureInternal(dimension: TextureDimension, width: number, height: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): WebGLInternalTex;
    createRenderTargetInternal(width: number, height: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): WebGLInternalRT;
    createRenderTargetCubeInternal(size: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): WebGLInternalRT;
    createRenderTextureCubeInternal(dimension: TextureDimension, size: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): WebGLInternalTex;
    bindRenderTarget(renderTarget: WebGLInternalRT, faceIndex?: number): void;
    unbindRenderTarget(renderTarget: WebGLInternalRT): void;
}
