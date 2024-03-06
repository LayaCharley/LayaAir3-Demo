import { Texture } from "./Texture";
import { Texture2D } from "./Texture2D";
import { Context } from "./Context";
import { Browser } from "../utils/Browser";
import { Resource } from "./Resource";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { LayaEnv } from "../../LayaEnv";
export class HTMLCanvas extends Resource {
    constructor(createCanvas = false) {
        super();
        if (createCanvas)
            this._source = Browser.createElement("canvas");
        else {
            this._source = this;
        }
        this.lock = true;
    }
    get source() {
        return this._source;
    }
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }
    _getSource() {
        return this._source;
    }
    clear() {
        if (this._ctx) {
            if (this._ctx.clear) {
                this._ctx.clear();
            }
            else {
                this._ctx.clearRect(0, 0, this._width, this._height);
            }
        }
        if (this._texture) {
            this._texture.destroy();
            this._texture = null;
        }
    }
    destroy() {
        super.destroy();
        this._setCPUMemory(0);
        this._ctx && this._ctx.destroy && this._ctx.destroy();
        this._ctx = null;
    }
    release() {
    }
    get context() {
        if (this._ctx)
            return this._ctx;
        if (this._source == this) {
            this._ctx = new Context();
        }
        else {
            this._ctx = this._source.getContext(LayaEnv.isConch ? 'layagl' : '2d');
        }
        this._ctx._canvas = this;
        return this._ctx;
    }
    _setContext(context) {
        this._ctx = context;
    }
    getContext(contextID, other = null) {
        return this.context;
    }
    getMemSize() {
        return 0;
    }
    size(w, h) {
        if (this._width != w || this._height != h || (this._source && (this._source.width != w || this._source.height != h))) {
            this._width = w;
            this._height = h;
            this._setCPUMemory(w * h * 4);
            this._ctx && this._ctx.size && this._ctx.size(w, h);
            if (this._source) {
                this._source.height = h;
                this._source.width = w;
            }
            if (this._texture) {
                this._texture.destroy();
                this._texture = null;
            }
        }
    }
    getTexture() {
        if (!this._texture) {
            var bitmap = new Texture2D(this.source.width, this.source.height, TextureFormat.R8G8B8A8, true, false, false);
            bitmap.setImageData(this.source, false, false);
            this._texture = new Texture(bitmap);
        }
        return this._texture;
    }
    toBase64(type, encoderOptions) {
        if (this._source) {
            if (LayaEnv.isConch) {
                var win = window;
                var width = this._ctx._targets.sourceWidth;
                var height = this._ctx._targets.sourceHeight;
                var data = this._ctx._targets.getData(0, 0, width, height);
                return win.conchToBase64FlipY ? win.conchToBase64FlipY(type, encoderOptions, data.buffer, width, height) : win.conchToBase64(type, encoderOptions, data.buffer, width, height);
            }
            else {
                return this._source.toDataURL(type, encoderOptions);
            }
        }
        return null;
    }
    toBase64Async(type, encoderOptions, callBack) {
        var width = this._ctx._targets.sourceWidth;
        var height = this._ctx._targets.sourceHeight;
        this._ctx._targets.getDataAsync(0, 0, width, height, function (data) {
            let win = window;
            var base64 = win.conchToBase64FlipY ? win.conchToBase64FlipY(type, encoderOptions, data.buffer, width, height) : win.conchToBase64(type, encoderOptions, data.buffer, width, height);
            callBack(base64);
        });
    }
}

//# sourceMappingURL=HTMLCanvas.js.map
