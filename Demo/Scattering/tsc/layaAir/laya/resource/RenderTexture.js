import { Config3D } from "../../Config3D";
import { LayaGL } from "../layagl/LayaGL";
import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { BaseTexture } from "./BaseTexture";
export class RenderTexture extends BaseTexture {
    constructor(width, height, colorFormat, depthFormat, generateMipmap = false, multiSamples = 1, generateDepthTexture = false, sRGB = false) {
        super(width, height, colorFormat);
        this._inPool = false;
        this._isCameraTarget = false;
        this._generateDepthTexture = false;
        this._gammaSpace = sRGB;
        this._depthStencilFormat = (depthFormat == null ? RenderTargetFormat.None : depthFormat);
        this._generateMipmap = generateMipmap;
        this._multiSamples = multiSamples;
        this._generateDepthTexture = generateDepthTexture;
        this._createRenderTarget();
    }
    static get currentActive() {
        return RenderTexture._currentActive;
    }
    static configRenderContextInstance(value) {
        RenderTexture._configInstance = value;
    }
    static createFromPool(width, height, colorFormat, depthFormat, mipmap = false, multiSamples = 1, depthTexture = false, sRGB = false) {
        mipmap = mipmap && (width & (width - 1)) === 0 && (height & (height - 1)) === 0;
        let n = RenderTexture._pool.length;
        for (let index = 0; index < n; index++) {
            let rt = RenderTexture._pool[index];
            if (rt.width == width && rt.height == height && rt.colorFormat == colorFormat && rt.depthStencilFormat == depthFormat && rt._generateMipmap == mipmap && rt.multiSamples == multiSamples && rt.generateDepthTexture == depthTexture && rt._gammaSpace == sRGB) {
                rt._inPool = false;
                let end = RenderTexture._pool[n - 1];
                RenderTexture._pool[index] = end;
                RenderTexture._pool.length -= 1;
                RenderTexture._poolMemory -= (rt._renderTarget.gpuMemory / 1024 / 1024);
                return rt;
            }
        }
        let rt = new RenderTexture(width, height, colorFormat, depthFormat, mipmap, multiSamples, depthTexture, sRGB);
        rt.lock = true;
        return rt;
    }
    static recoverToPool(rt) {
        if (rt._inPool || rt.destroyed)
            return;
        RenderTexture._pool.push(rt);
        RenderTexture._poolMemory += (rt._renderTarget.gpuMemory / 1024 / 1024);
        rt._inPool = true;
    }
    static clearPool() {
        if (RenderTexture._poolMemory < Config3D.defaultCacheRTMemory) {
            return;
        }
        for (var i in RenderTexture._pool) {
            RenderTexture._pool[i].destroy();
        }
        RenderTexture._pool = [];
        RenderTexture._poolMemory = 0;
    }
    static get bindCanvasRender() {
        return RenderTexture._bindCanvasRender;
    }
    static set bindCanvasRender(value) {
        if (value != this._bindCanvasRender)
            this._bindCanvasRender = value;
    }
    get generateDepthTexture() {
        return this._generateDepthTexture;
    }
    set generateDepthTexture(value) {
        if (value && !this._depthStencilTexture) {
            this._depthStencilTexture = new BaseTexture(this.width, this.height, this.depthStencilFormat);
            this._depthStencilTexture._dimension = TextureDimension.Tex2D;
            this._depthStencilTexture._texture = LayaGL.textureContext.createRenderTextureInternal(TextureDimension.Tex2D, this.width, this.height, this.depthStencilFormat, false, false);
            LayaGL.textureContext.setupRendertargetTextureAttachment(this._renderTarget, this._depthStencilTexture._texture);
        }
        this._generateDepthTexture = value;
    }
    get depthStencilTexture() {
        return this._depthStencilTexture;
    }
    get colorFormat() {
        return this._renderTarget.colorFormat;
    }
    get depthStencilFormat() {
        return this._renderTarget.depthStencilFormat;
    }
    get multiSamples() {
        return this._renderTarget._samples;
    }
    get isCube() {
        return this._renderTarget._isCube;
    }
    get samples() {
        return this._renderTarget._samples;
    }
    get generateMipmap() {
        return this._renderTarget._generateMipmap;
    }
    _createRenderTarget() {
        this._dimension = TextureDimension.Tex2D;
        this._renderTarget = LayaGL.textureContext.createRenderTargetInternal(this.width, this.height, this._format, this._depthStencilFormat, this._generateMipmap, this._gammaSpace, this._multiSamples);
        this._generateMipmap = this._renderTarget._generateMipmap;
        this._texture = this._renderTarget._textures[0];
        this.generateDepthTexture = this._generateDepthTexture;
    }
    recreate(width, height, colorFormat, depthFormat, generateMipmap = false, multiSamples = 1, generateDepthTexture = false, sRGB = false) {
        this._width = width;
        this._height = height;
        this._format = colorFormat;
        this._gammaSpace = sRGB;
        this._depthStencilFormat = (depthFormat == null ? RenderTargetFormat.None : depthFormat);
        this._generateMipmap = generateMipmap;
        this._multiSamples = multiSamples;
        this._generateDepthTexture = generateDepthTexture;
        this._disposeResource();
        this._createRenderTarget();
    }
    _start() {
        RenderTexture._configInstance.invertY = this._isCameraTarget;
        if (RenderTexture._currentActive != this) {
            RenderTexture._currentActive && RenderTexture._currentActive._end();
            RenderTexture._currentActive = this;
            LayaGL.textureContext.bindRenderTarget(this._renderTarget);
        }
    }
    _end() {
        RenderTexture._currentActive = null;
        LayaGL.textureContext.unbindRenderTarget(this._renderTarget);
        (this._isCameraTarget) && (RenderTexture._configInstance.invertY = false);
    }
    getData(xOffset, yOffset, width, height, out) {
        LayaGL.textureContext.readRenderTargetPixelData(this._renderTarget, xOffset, yOffset, width, height, out);
        return out;
    }
    _disposeResource() {
        var _a;
        if (RenderTexture._currentActive == this) {
            this._end();
        }
        this._renderTarget.dispose();
        this._renderTarget = null;
        (_a = this._depthStencilTexture) === null || _a === void 0 ? void 0 : _a.destroy();
        this._depthStencilTexture = null;
    }
}
RenderTexture._currentActive = null;
RenderTexture._configInstance = {};
RenderTexture._pool = [];
RenderTexture._poolMemory = 0;

//# sourceMappingURL=RenderTexture.js.map
