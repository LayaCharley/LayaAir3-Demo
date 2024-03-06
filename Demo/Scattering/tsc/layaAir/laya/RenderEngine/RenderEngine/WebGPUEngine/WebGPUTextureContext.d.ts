import { DDSTextureInfo } from "../../DDSTextureInfo";
import { HDRTextureInfo } from "../../HDRTextureInfo";
import { KTXTextureInfo } from "../../KTXTextureInfo";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { TextureCompareMode } from "../../RenderEnum/TextureCompareMode";
import { TextureDimension } from "../../RenderEnum/TextureDimension";
import { TextureFormat } from "../../RenderEnum/TextureFormat";
import { InternalRenderTarget } from "../../RenderInterface/InternalRenderTarget";
import { InternalTexture } from "../../RenderInterface/InternalTexture";
import { ITextureContext } from "../../RenderInterface/ITextureContext";
import { WebGPUEngine } from "./WebGPUEngine";
import { WebGPUInternalRT } from "./WebGPUInternalRT";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
import { WebGPUObject } from "./WebGPUObject";
declare enum GPUTextureViewDimension {
    VD1d = "1d",
    VD2d = "2d",
    VD2d_array = "2d-array",
    VDcube = "cube",
    VDcube_array = "cube-array",
    VD3d = "3d"
}
export declare enum GPUTextureFormat {
    r8unorm = "r8unorm",
    r8snorm = "r8snorm",
    r8uint = "r8uint",
    r8sint = "r8sint",
    r16uint = "r16uint",
    r16sint = "r16sint",
    r16float = "r16float",
    rg8unorm = "rg8unorm",
    rg8snorm = "rg8snorm",
    rg8uint = "rg8uint",
    rg8sint = "rg8sint",
    r32uint = "r32uint",
    r32sint = "r32sint",
    r32float = "r32float",
    rg16uint = "rg16uint",
    rg16sint = "rg16sint",
    rg16float = "rg16float",
    rgba8unorm = "rgba8unorm",
    rgba8unorm_srgb = "rgba8unorm-srgb",
    rgba8snorm = "rgba8snorm",
    rgba8uint = "rgba8uint",
    rgba8sint = "rgba8sint",
    bgra8unorm = "bgra8unorm",
    bgra8unorm_srgb = "bgra8unorm-srgb",
    rgb9e5ufloat = "rgb9e5ufloat",
    rgb10a2unorm = "rgb10a2unorm",
    rg11b10ufloat = "rg11b10ufloat",
    rg32uint = "rg32uint",
    rg32sint = "rg32sint",
    rg32float = "rg32float",
    rgba16uint = "rgba16uint",
    rgba16sint = "rgba16sint",
    rgba16float = "rgba16float",
    rgba32uint = "rgba32uint",
    rgba32sint = "rgba32sint",
    rgba32float = "rgba32float",
    stencil8 = "stencil8",
    depth16unorm = "depth16unorm",
    depth24plus = "depth24plus",
    depth24plus_stencil8 = "depth24plus-stencil8",
    depth32float = "depth32float",
    depth32float_stencil8 = "depth32float-stencil8",
    bc1_rgba_unorm = "bc1-rgba-unorm",
    bc1_rgba_unorm_srgb = "bc1-rgba-unorm-srgb",
    bc2_rgba_unorm = "bc2-rgba-unorm",
    bc2_rgba_unorm_srgb = "bc2-rgba-unorm-srgb",
    bc3_rgba_unorm = "bc3-rgba-unorm",
    bc3_rgba_unorm_srgb = "bc3-rgba-unorm-srgb",
    bc4_r_unorm = "bc4-r-unorm",
    bc4_r_snorm = "bc4-r-snorm",
    bc5_rg_unorm = "bc5-rg-unorm",
    bc5_rg_snorm = "bc5-rg-snorm",
    bc6h_rgb_ufloat = "bc6h-rgb-ufloat",
    bc6h_rgb_float = "bc6h-rgb-float",
    bc7_rgba_unorm = "bc7-rgba-unorm",
    bc7_rgba_unorm_srgb = "bc7-rgba-unorm-srgb",
    etc2_rgb8unorm = "etc2-rgb8unorm",
    etc2_rgb8unorm_srgb = "etc2-rgb8unorm-srgb",
    etc2_rgb8a1unorm = "etc2-rgb8a1unorm",
    etc2_rgb8a1unorm_srgb = "etc2-rgb8a1unorm-srgb",
    etc2_rgba8unorm = "etc2-rgba8unorm",
    etc2_rgba8unorm_srgb = "etc2-rgba8unorm-srgb",
    astc_4x4_unorm = "astc-4x4-unorm",
    astc_4x4_unorm_srgb = "astc-4x4-unorm-srgb",
    astc_5x4_unorm = "astc-5x4-unorm",
    astc_5x4_unorm_srgb = "astc-5x4-unorm-srgb",
    astc_5x5_unorm = "astc-5x5-unorm",
    astc_5x5_unorm_srgb = "astc-5x5-unorm-srgb",
    astc_6x5_unorm = "astc-6x5-unorm",
    astc_6x5_unorm_srgb = "astc-6x5-unorm-srgb",
    astc_6x6_unorm = "astc-6x6-unorm",
    astc_6x6_unorm_srgb = "astc-6x6-unorm-srgb",
    astc_8x5_unorm = "astc-8x5-unorm",
    astc_8x5_unorm_srgb = "astc-8x5-unorm-srgb",
    astc_8x6_unorm = "astc-8x6-unorm",
    astc_8x6_unorm_srgb = "astc-8x6-unorm-srgb",
    astc_8x8_unorm = "astc-8x8-unorm",
    astc_8x8_unorm_srgb = "astc-8x8-unorm-srgb",
    astc_10x5_unorm = "astc-10x5-unorm",
    astc_10x5_unorm_srgb = "astc-10x5-unorm-srgb",
    astc_10x6_unorm = "astc-10x6-unorm",
    astc_10x6_unorm_srgb = "astc-10x6-unorm-srgb",
    astc_10x8_unorm = "astc-10x8-unorm",
    astc_10x8_unorm_srgb = "astc-10x8-unorm-srgb",
    astc_10x10_unorm = "astc-10x10-unorm",
    astc_10x10_unorm_srgb = "astc-10x10-unorm-srgb",
    astc_12x10_unorm = "astc-12x10-unorm",
    astc_12x10_unorm_srgb = "astc-12x10-unorm-srgb",
    astc_12x12_unorm = "astc-12x12-unorm",
    astc_12x12_unorm_srgb = "astc-12x12-unorm-srgb"
}
export declare enum GPUTextureUsage {
    COPY_SRC = 1,
    COPY_DST = 2,
    TEXTURE_BINDING = 4,
    STORAGE_BINDING = 8,
    RENDER_ATTACHMENT = 16
}
export declare class WebGPUTextureContext extends WebGPUObject implements ITextureContext {
    curBindWGPURT: WebGPUInternalRT;
    constructor(engine: WebGPUEngine);
    setTexture3DImageData(texture: InternalTexture, source: HTMLImageElement[] | HTMLCanvasElement[] | ImageBitmap[], depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexture3DPixlesData(texture: InternalTexture, source: ArrayBufferView, depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexture3DSubPixelsData(texture: InternalTexture, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, zOffset: number, width: number, height: number, depth: number, premultiplyAlpha: boolean, invertY: boolean): void;
    getGPUTextureFormat(format: TextureFormat, useSRGB: boolean): GPUTextureFormat;
    private isCompressTexture;
    getGPURenderTargetFormat(format: RenderTargetFormat, useSRGB: boolean): GPUTextureFormat.rgba8unorm | GPUTextureFormat.rgba8unorm_srgb | GPUTextureFormat.rgba16float | GPUTextureFormat.rgba32float | GPUTextureFormat.stencil8 | GPUTextureFormat.depth16unorm | GPUTextureFormat.depth24plus | GPUTextureFormat.depth24plus_stencil8 | GPUTextureFormat.depth32float;
    getTextureViewDimension(demension: TextureDimension): GPUTextureViewDimension;
    getGLtexMemory(tex: WebGPUInternalTex, depth?: number): number;
    private _generateMipmaps;
    createTextureInternal(dimension: TextureDimension, width: number, height: number, format: TextureFormat, generateMipmap: boolean, sRGB: boolean): WebGPUInternalTex;
    private getGPUTextureDescriptor;
    createRenderTextureInternal(dimension: TextureDimension, width: number, height: number, format: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean): WebGPUInternalTex;
    createRenderTargetInternal(width: number, height: number, format: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): WebGPUInternalRT;
    setTextureImageData(texture: WebGPUInternalTex, source: HTMLCanvasElement | HTMLImageElement | ImageBitmap, premultiplyAlpha: boolean, invertY: boolean): void;
    setTextureSubImageData(texture: InternalTexture, source: HTMLCanvasElement | HTMLImageElement | ImageBitmap, x: number, y: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setTexturePixelsData(texture: WebGPUInternalTex, source: ArrayBufferView, premultiplyAlpha: boolean, invertY: boolean): void;
    setTextureSubPixelsData(texture: WebGPUInternalTex, source: ArrayBufferView, mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void;
    initVideoTextureData(texture: WebGPUInternalTex): void;
    setTextureDDSData(texture: WebGPUInternalTex, ddsInfo: DDSTextureInfo): void;
    setTextureKTXData(texture: WebGPUInternalTex, ktxInfo: KTXTextureInfo): void;
    setTextureHDRData(texture: WebGPUInternalTex, hdrInfo: HDRTextureInfo): void;
    setCubeImageData(texture: WebGPUInternalTex, sources: (HTMLCanvasElement | HTMLImageElement | ImageBitmap)[], premultiplyAlpha: boolean, invertY: boolean): void;
    setCubePixelsData(texture: WebGPUInternalTex, source: ArrayBufferView[], premultiplyAlpha: boolean, invertY: boolean): void;
    setCubeSubPixelData(texture: WebGPUInternalTex, source: ArrayBufferView[], mipmapLevel: number, generateMipmap: boolean, xOffset: number, yOffset: number, width: number, height: number, premultiplyAlpha: boolean, invertY: boolean): void;
    setCubeDDSData(texture: WebGPUInternalTex, ddsInfo: DDSTextureInfo): void;
    setCubeKTXData(texture: WebGPUInternalTex, ktxInfo: KTXTextureInfo): void;
    setTextureCompareMode(texture: WebGPUInternalTex, compareMode: TextureCompareMode): TextureCompareMode;
    createRenderTargetCubeInternal(size: number, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, generateMipmap: boolean, sRGB: boolean, multiSamples: number): InternalRenderTarget;
    setupRendertargetTextureAttachment(renderTarget: InternalRenderTarget, texture: InternalTexture): void;
    bindRenderTarget(renderTarget: InternalRenderTarget, faceIndex?: number): void;
    bindoutScreenTarget(): void;
    unbindRenderTarget(renderTarget: InternalRenderTarget): void;
    readRenderTargetPixelData(renderTarget: InternalRenderTarget, xOffset: number, yOffset: number, width: number, height: number, out: ArrayBufferView): ArrayBufferView;
    updateVideoTexture(texture: InternalTexture, video: HTMLVideoElement, premultiplyAlpha: boolean, invertY: boolean): void;
    getRenderTextureData(internalTex: InternalRenderTarget, x: number, y: number, width: number, height: number): ArrayBufferView;
}
export {};
