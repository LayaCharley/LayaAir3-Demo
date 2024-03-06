import { Texture2D } from "./Texture2D";
import { LayaGL } from "../layagl/LayaGL";
import { BaseTexture } from "./BaseTexture";
import { BaseShader } from "../webgl/shader/BaseShader";
import { RenderState2D } from "../webgl/utils/RenderState2D";
import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderClearFlag } from "../RenderEngine/RenderEnum/RenderClearFlag";
import { NativeRenderTexture2D } from "./NativeRenderTexture2D";
import { Color } from "../maths/Color";
export class RenderTexture2D extends BaseTexture {
    constructor(width, height, format = RenderTargetFormat.R8G8B8, depthStencilFormat = RenderTargetFormat.None) {
        super(width, height, format);
        this._mgrKey = 0;
        this._invertY = false;
        this._colorFormat = format;
        this._depthStencilFormat = depthStencilFormat;
        if (width != 0 && height != 0) {
            this._create();
        }
        this.lock = true;
    }
    static get currentActive() {
        return RenderTexture2D._currentActive;
    }
    get depthStencilFormat() {
        return this._depthStencilFormat;
    }
    get defaultTexture() {
        return Texture2D.grayTexture;
    }
    getIsReady() {
        return true;
    }
    get sourceWidth() {
        return this._width;
    }
    get sourceHeight() {
        return this._height;
    }
    get offsetX() {
        return 0;
    }
    get offsetY() {
        return 0;
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
    _start() {
        throw new Error("Method not implemented.");
    }
    _end() {
        throw new Error("Method not implemented.");
    }
    _create() {
        this._renderTarget = LayaGL.textureContext.createRenderTargetInternal(this.width, this.height, this._colorFormat, this.depthStencilFormat, false, true, 1);
        this._texture = this._renderTarget._textures[0];
    }
    static pushRT() {
        RenderTexture2D.rtStack.push({ rt: RenderTexture2D._currentActive, w: RenderState2D.width, h: RenderState2D.height });
    }
    static popRT() {
        var top = RenderTexture2D.rtStack.pop();
        if (top) {
            if (RenderTexture2D._currentActive != top.rt) {
                if (top.rt) {
                    LayaGL.textureContext.bindRenderTarget(top.rt._renderTarget);
                    RenderState2D.InvertY = top.rt._invertY;
                }
                else {
                    LayaGL.textureContext.bindoutScreenTarget();
                    RenderState2D.InvertY = false;
                }
                RenderTexture2D._currentActive = top.rt;
            }
            LayaGL.renderEngine.viewport(0, 0, top.w, top.h);
            LayaGL.renderEngine.scissor(0, 0, top.w, top.h);
            RenderState2D.width = top.w;
            RenderState2D.height = top.h;
        }
    }
    start() {
        LayaGL.textureContext.bindRenderTarget(this._renderTarget);
        this._lastRT = RenderTexture2D._currentActive;
        RenderTexture2D._currentActive = this;
        RenderState2D.InvertY = this._invertY;
        LayaGL.renderEngine.viewport(0, 0, this._width, this._height);
        LayaGL.renderEngine.scissor(0, 0, this._width, this._height);
        this._lastWidth = RenderState2D.width;
        this._lastHeight = RenderState2D.height;
        RenderState2D.width = this._width;
        RenderState2D.height = this._height;
        BaseShader.activeShader = null;
    }
    end() {
        LayaGL.textureContext.unbindRenderTarget(this._renderTarget);
        RenderTexture2D._currentActive = null;
        RenderState2D.InvertY = false;
    }
    restore() {
        if (this._lastRT != RenderTexture2D._currentActive) {
            if (this._lastRT) {
                LayaGL.textureContext.bindRenderTarget(this._lastRT._renderTarget);
                RenderState2D.InvertY = this._lastRT._invertY;
            }
            else {
                LayaGL.textureContext.unbindRenderTarget(this._renderTarget);
                RenderState2D.InvertY = false;
            }
            RenderTexture2D._currentActive = this._lastRT;
        }
        LayaGL.renderEngine.viewport(0, 0, this._lastWidth, this._lastHeight);
        LayaGL.renderEngine.scissor(0, 0, this._lastWidth, this._lastHeight);
        RenderState2D.width = this._lastWidth;
        RenderState2D.height = this._lastHeight;
        BaseShader.activeShader = null;
    }
    clear(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
        RenderTexture2D._clearColor.r = r;
        RenderTexture2D._clearColor.g = g;
        RenderTexture2D._clearColor.b = b;
        RenderTexture2D._clearColor.a = a;
        RenderTexture2D._clearColor.toLinear(RenderTexture2D._clearLinearColor);
        LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Color | RenderClearFlag.Depth, RenderTexture2D._clearLinearColor, 1);
    }
    getData(x, y, width, height) {
        return LayaGL.textureContext.getRenderTextureData(this._renderTarget, x, y, width, height);
    }
    recycle() {
    }
    _disposeResource() {
        this._renderTarget && this._renderTarget.dispose();
    }
}
RenderTexture2D._clearColor = new Color(0, 0, 0, 0);
RenderTexture2D._clearLinearColor = new Color();
RenderTexture2D.rtStack = [];
RenderTexture2D.defuv = [0, 0, 1, 0, 1, 1, 0, 1];
RenderTexture2D.flipyuv = [0, 1, 1, 1, 1, 0, 0, 0];
if (window.conch && !window.conchConfig.conchWebGL) {
    RenderTexture2D = NativeRenderTexture2D;
}

//# sourceMappingURL=RenderTexture2D.js.map
