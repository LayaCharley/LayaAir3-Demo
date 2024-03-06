import { Sprite } from "../display/Sprite";
import { Texture } from "../resource/Texture";
import { ILaya } from "../../ILaya";
import { Browser } from "../utils/Browser";
import { VideoTexture } from "./VideoTexture";
import { LayaEnv } from "../../LayaEnv";
import { SpriteUtils } from "../utils/SpriteUtils";
import { Event } from "../events/Event";
export class VideoNode extends Sprite {
    constructor() {
        super();
        this.texture = this._internalTex = new Texture();
        if (LayaEnv.isPlaying && ILaya.Browser.onMobile) {
            let func = () => {
                ILaya.Browser.document.removeEventListener("touchend", func);
                if (!this._videoTexture)
                    return;
                if (Browser.onIOS) {
                    this._videoTexture.load();
                }
                else {
                    this._videoTexture.play();
                    this._videoTexture.pause();
                }
            };
            ILaya.Browser.document.addEventListener("touchend", func);
        }
    }
    get videoTexture() {
        return this._videoTexture;
    }
    set videoTexture(value) {
        if (this._videoTexture) {
            this._videoTexture._removeReference();
            this._videoTexture.off(Event.READY, this, this.onVideoMetaLoaded);
        }
        this._videoTexture = value;
        if (value) {
            this._videoTexture._addReference();
            this._videoTexture.on(Event.READY, this, this.onVideoMetaLoaded);
            if (this._videoTexture._isLoaded)
                this._internalTex.setTo(this._videoTexture);
        }
        else {
            this._internalTex.setTo(null);
        }
    }
    get source() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.source;
    }
    set source(value) {
        if (value) {
            if (!this._videoTexture)
                this.videoTexture = new VideoTexture();
            this._videoTexture.source = value;
        }
        else if (this._videoTexture)
            this._videoTexture.source = value;
    }
    load(url) {
        this.source = url;
    }
    play() {
        if (!this._videoTexture)
            return;
        this._videoTexture.play();
    }
    pause() {
        if (!this._videoTexture)
            return;
        this._videoTexture.pause();
    }
    reload() {
        if (!this._videoTexture)
            return;
        this._videoTexture.load();
    }
    canPlayType(type) {
        if (!this._videoTexture)
            this.videoTexture = new VideoTexture();
        return this._videoTexture.canPlayType(type);
    }
    onVideoMetaLoaded() {
        this._internalTex.setTo(this._videoTexture);
    }
    get buffered() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.buffered;
    }
    get currentSrc() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.currentSrc;
    }
    get currentTime() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.currentTime;
    }
    set currentTime(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.currentTime = value;
    }
    set volume(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.volume = value;
    }
    get volume() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.volume;
    }
    get readyState() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.readyState;
    }
    get videoWidth() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.videoWidth;
    }
    get videoHeight() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.videoHeight;
    }
    get duration() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.duration;
    }
    get ended() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.ended;
    }
    get error() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.error;
    }
    get loop() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.loop;
    }
    set loop(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.loop = value;
    }
    get playbackRate() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.playbackRate;
    }
    set playbackRate(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.playbackRate = value;
    }
    get muted() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.muted;
    }
    set muted(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.muted = value;
    }
    get paused() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.paused;
    }
    get preload() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.preload;
    }
    set preload(value) {
        if (!this._videoTexture)
            return;
        this._videoTexture.preload = value;
    }
    get seekable() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.seekable;
    }
    get seeking() {
        var _a;
        return (_a = this._videoTexture) === null || _a === void 0 ? void 0 : _a.seeking;
    }
    _setX(value) {
        super._setX(value);
        if (this._videoTexture && LayaEnv.isConch) {
            var transform = SpriteUtils.getTransformRelativeToWindow(this, 0, 0);
            this._videoTexture.element.style.left = transform.x;
        }
    }
    _setY(value) {
        super._setY(value);
        if (this._videoTexture && LayaEnv.isConch) {
            var transform = SpriteUtils.getTransformRelativeToWindow(this, 0, 0);
            this._videoTexture.element.style.top = transform.y;
        }
    }
    set_width(value) {
        super.set_width(value);
        if (!this._videoTexture)
            return;
        if (LayaEnv.isConch) {
            var transform = SpriteUtils.getTransformRelativeToWindow(this, 0, 0);
            this._videoTexture.element.width = value * transform.scaleX;
        }
        else {
            this._videoTexture.element.width = this.width / ILaya.Browser.pixelRatio;
        }
    }
    set_height(value) {
        super.set_height(value);
        if (!this._videoTexture)
            return;
        if (LayaEnv.isConch) {
            var transform = SpriteUtils.getTransformRelativeToWindow(this, 0, 0);
            this._videoTexture.element.height = value * transform.scaleY;
        }
        else {
            this._videoTexture.element.height = this.height / ILaya.Browser.pixelRatio;
        }
    }
    destroy(detroyChildren = true) {
        this.videoTexture = null;
        super.destroy(detroyChildren);
    }
}

//# sourceMappingURL=VideoNode.js.map
