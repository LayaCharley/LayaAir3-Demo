import { UIComponent } from "./UIComponent";
import { Texture } from "../resource/Texture";
import { Texture2D } from "../resource/Texture2D";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
export class OpenDataContextView extends UIComponent {
    constructor() {
        super();
        this._fps = 30;
        this._width = this._height = 200;
        let tex = new Texture(new Texture2D(this._width, this._height, TextureFormat.R8G8B8A8, false, false, true));
        tex.bitmap.lock = true;
        this.texture = tex;
    }
    get fps() {
        return this._fps;
    }
    set fps(value) {
        if (this._fps != value) {
            this._fps = value;
            if (LayaEnv.isPlaying && this.activeInHierarchy
                && window.wx && window.sharedCanvas) {
                ILaya.timer.clear(this, this._onLoop);
                ILaya.timer.loop(1000 / value, this, this._onLoop);
            }
        }
    }
    _onActive() {
        if (!LayaEnv.isPlaying)
            return;
        if (window.wx && window.sharedCanvas)
            ILaya.timer.loop(1000 / this._fps, this, this._onLoop);
    }
    _onInActive() {
        if (!LayaEnv.isPlaying)
            return;
        this.postMsg({ type: "close" });
        ILaya.timer.clear(this, this._onLoop);
    }
    _onLoop() {
        let tex = this.texture;
        let canvas = window.sharedCanvas;
        if (tex.width != canvas.width || tex.height != canvas.height) {
            tex.bitmap.destroy();
            tex.bitmap = new Texture2D(canvas.width, canvas.height, TextureFormat.R8G8B8A8, false, false, true);
            tex.bitmap.lock = true;
        }
        tex.bitmap.setImageData(canvas, true, false);
    }
    _setWidth(value) {
        super._setWidth(value);
        if (window.sharedCanvas)
            window.sharedCanvas.width = value;
        this.callLater(this.updateViewPort);
    }
    _setHeight(value) {
        super._setHeight(value);
        if (window.sharedCanvas)
            window.sharedCanvas.height = value;
        this.callLater(this.updateViewPort);
    }
    set x(value) {
        super.x = value;
        this.callLater(this.updateViewPort);
    }
    get x() {
        return super.x;
    }
    set y(value) {
        super.y = value;
        this.callLater(this.updateViewPort);
    }
    get y() {
        return super.y;
    }
    updateViewPort() {
        let stage = ILaya.stage;
        let sx = stage._canvasTransform.getScaleX() * this.globalScaleX * stage.transform.getScaleX();
        let sy = stage._canvasTransform.getScaleY() * this.globalScaleY * stage.transform.getScaleY();
        this.postMsg({
            type: "updateViewPort",
            box: {
                x: this.x * sx,
                y: this.y * sy,
                width: this.width * sx,
                height: this.height * sy,
            }
        });
    }
    postMsg(msg) {
        if (window.wx && window.wx.getOpenDataContext) {
            var openDataContext = window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }
}

//# sourceMappingURL=OpenDataContextView.js.map
