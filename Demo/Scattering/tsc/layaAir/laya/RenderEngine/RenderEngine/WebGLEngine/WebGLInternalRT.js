import { RenderStatisticsInfo } from "../../RenderEnum/RenderStatInfo";
import { GLObject } from "./GLObject";
export class WebGLInternalRT extends GLObject {
    constructor(engine, colorFormat, depthStencilFormat, isCube, generateMipmap, samples) {
        super(engine);
        this._gpuMemory = 0;
        this.colorFormat = colorFormat;
        this.depthStencilFormat = depthStencilFormat;
        this._isCube = isCube;
        this._generateMipmap = generateMipmap;
        this._samples = samples;
        this._textures = [];
        this._depthTexture = null;
        this._framebuffer = this._gl.createFramebuffer();
        if (samples > 1) {
            this._msaaFramebuffer = this._gl.createFramebuffer();
        }
    }
    get gpuMemory() {
        return this._gpuMemory;
    }
    set gpuMemory(value) {
        this._gpuMemory = value;
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, this._gpuMemory);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.RenderTextureMemory, this._gpuMemory);
    }
    dispose() {
        this._textures.forEach(tex => {
            tex && tex.dispose();
        });
        this._textures = null;
        this._depthTexture && this._depthTexture.dispose();
        this._depthTexture = null;
        this._framebuffer && this._gl.deleteFramebuffer(this._framebuffer);
        this._framebuffer = null;
        this._depthbuffer && this._gl.deleteRenderbuffer(this._depthbuffer);
        this._depthbuffer = null;
        this._msaaFramebuffer && this._gl.deleteFramebuffer(this._msaaFramebuffer);
        this._msaaFramebuffer = null;
        this._msaaRenderbuffer && this._gl.deleteRenderbuffer(this._msaaRenderbuffer);
        this._msaaRenderbuffer = null;
        this._engine._addStatisticsInfo(RenderStatisticsInfo.GPUMemory, -this._gpuMemory);
        this._engine._addStatisticsInfo(RenderStatisticsInfo.RenderTextureMemory, -this._gpuMemory);
        this._gpuMemory = 0;
    }
}

//# sourceMappingURL=WebGLInternalRT.js.map
