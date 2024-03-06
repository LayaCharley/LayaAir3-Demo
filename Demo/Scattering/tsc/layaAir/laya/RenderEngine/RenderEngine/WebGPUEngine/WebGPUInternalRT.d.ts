import { Color } from "../../../maths/Color";
import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { InternalRenderTarget } from "../../RenderInterface/InternalRenderTarget";
import { WebGPUEngine } from "./WebGPUEngine";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
import { WebGPUObject } from "./WebGPUObject";
interface WGPRenderPassDesCache {
    clearFlag: number;
    clearColor: Color;
    clearDepth: number;
}
export interface GPURTSourceGroup {
    texture: WebGPUInternalTex;
    view: GPUTextureView;
}
export declare class WebGPUInternalRT extends WebGPUObject implements InternalRenderTarget {
    _isCube: boolean;
    _samples: number;
    _generateMipmap: boolean;
    _textures: WebGPUInternalTex[];
    _depthTexture: WebGPUInternalTex;
    colorFormat: RenderTargetFormat;
    depthStencilFormat: RenderTargetFormat;
    gpuMemory: number;
    isSRGB: boolean;
    loadClear: boolean;
    clearDes: WGPRenderPassDesCache;
    isOffscreenRT: boolean;
    constructor(engine: WebGPUEngine, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, isCube: boolean, generateMipmap: boolean, samples: number);
    dispose(): void;
}
export {};
