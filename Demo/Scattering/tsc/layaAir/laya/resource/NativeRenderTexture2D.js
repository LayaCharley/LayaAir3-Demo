import { Texture2D } from "./Texture2D";
import { BaseTexture } from "./BaseTexture";
import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { Color } from "../maths/Color";
import { LayaGL } from "../layagl/LayaGL";
export class NativeRenderTexture2D extends BaseTexture {
    constructor(width, height, format = RenderTargetFormat.R8G8B8, depthStencilFormat = RenderTargetFormat.DEPTH_16, create = true) {
        super(width, height, format);
        this._mgrKey = 0;
        this._colorFormat = format;
        this._depthStencilFormat = depthStencilFormat;
        if (width != 0 && height != 0 && create) {
            this._create();
        }
        this.lock = true;
    }
    static get currentActive() {
        return NativeRenderTexture2D._currentActive;
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
        return this._nativeObj.isCube;
    }
    get samples() {
        return this._nativeObj.samples;
    }
    get generateMipmap() {
        return this._nativeObj.generateMipmap;
    }
    _start() {
        throw new Error("Method not implemented.");
    }
    _end() {
        throw new Error("Method not implemented.");
    }
    _create() {
        this._nativeObj = new window.conchRenderTexture2D(LayaGL.renderEngine._nativeObj, this.width, this.height, this._colorFormat, this.depthStencilFormat);
        this._texture = this._nativeObj._renderTarget._textures[0];
    }
    static pushRT() {
        throw new Error("Method not implemented.");
    }
    static popRT() {
        throw new Error("Method not implemented.");
    }
    start() {
        this._nativeObj.start();
    }
    end() {
        this._nativeObj.end();
    }
    restore() {
        this._nativeObj.restore();
    }
    clear(r = 0.0, g = 0.0, b = 0.0, a = 1.0) {
        this._nativeObj.clear(r, g, b, a);
    }
    getData(x, y, width, height) {
        return this._nativeObj.getData(x, y, width, height);
    }
    recycle() {
    }
    _disposeResource() {
        this._nativeObj._disposeResource();
    }
}
NativeRenderTexture2D._clearColor = new Color(0, 0, 0, 0);
NativeRenderTexture2D.rtStack = [];
NativeRenderTexture2D.defuv = [0, 0, 1, 0, 1, 1, 0, 1];
NativeRenderTexture2D.flipyuv = [0, 1, 1, 1, 1, 0, 0, 0];

//# sourceMappingURL=NativeRenderTexture2D.js.map
