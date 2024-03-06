import { RenderTargetFormat } from "../../RenderEnum/RenderTargetFormat";
import { InternalRenderTarget } from "../../RenderInterface/InternalRenderTarget";
import { InternalTexture } from "../../RenderInterface/InternalTexture";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class WebGLInternalRT extends GLObject implements InternalRenderTarget {
    _gl: WebGLRenderingContext | WebGL2RenderingContext;
    _framebuffer: WebGLFramebuffer;
    _depthbuffer: WebGLRenderbuffer;
    _msaaFramebuffer: WebGLFramebuffer;
    _msaaRenderbuffer: WebGLRenderbuffer;
    _isCube: boolean;
    _samples: number;
    _generateMipmap: boolean;
    _textures: InternalTexture[];
    _depthTexture: InternalTexture;
    colorFormat: RenderTargetFormat;
    depthStencilFormat: RenderTargetFormat;
    isSRGB: boolean;
    _gpuMemory: number;
    get gpuMemory(): number;
    set gpuMemory(value: number);
    constructor(engine: WebGLEngine, colorFormat: RenderTargetFormat, depthStencilFormat: RenderTargetFormat, isCube: boolean, generateMipmap: boolean, samples: number);
    dispose(): void;
}
