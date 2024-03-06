import { BaseTexture } from "../resource/BaseTexture";
import { LayaGL } from "../layagl/LayaGL";
import { ILaya } from "../../ILaya";
import { Utils } from "../utils/Utils";
import { URL } from "../net/URL";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { FilterMode } from "../RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "../RenderEngine/RenderEnum/WrapMode";
import { LayaEnv } from "../../LayaEnv";
import { Texture2D } from "../resource/Texture2D";
import { AssetDb } from "../resource/AssetDb";
import { Event as LayaEvent } from "../events/Event";
import { Browser } from "../utils/Browser";
export class VideoTexture extends BaseTexture {
    constructor() {
        let ele = ILaya.Browser.createElement("video");
        super(ele.videoWidth, ele.videoHeight, RenderTargetFormat.R8G8B8);
        this._frameRender = true;
        this._isLoaded = false;
        this._needUpdate = false;
        this.immediatelyPlay = false;
        this.element = ele;
        this._listeningEvents = {};
        this._dimension = TextureDimension.Tex2D;
        var style = this.element.style;
        style.position = 'absolute';
        style.top = '0px';
        style.left = '0px';
        ele.setAttribute('crossorigin', 'anonymous');
        if (ILaya.Browser.onMobile) {
            ele["x5-playsInline"] = true;
            ele["x5-playsinline"] = true;
            ele.x5PlaysInline = true;
            ele.playsInline = true;
            ele["webkit-playsInline"] = true;
            ele["webkit-playsinline"] = true;
            ele.webkitPlaysInline = true;
            ele.playsinline = true;
            ele.style.playsInline = true;
            ele.crossOrigin = "anonymous";
            ele.setAttribute('playsinline', 'true');
            ele.setAttribute('x5-playsinline', 'true');
            ele.setAttribute('webkit-playsinline', 'true');
            ele.autoplay = true;
        }
        ele.addEventListener("loadedmetadata", () => {
            this.loadedmetadata();
        });
        const scope = this;
        function updateVideo() {
            scope._needUpdate = true;
            ele.requestVideoFrameCallback(updateVideo);
        }
        if ('requestVideoFrameCallback' in ele) {
            ele.requestVideoFrameCallback(updateVideo);
        }
        if (ILaya.Browser.onWeiXin) {
            this.loadedmetadata();
        }
    }
    isNeedUpdate() {
        return this._needUpdate;
    }
    loadedmetadata() {
        if (this._isLoaded)
            return;
        this._width = this.element.videoWidth;
        this._height = this.element.videoHeight;
        this._texture = LayaGL.textureContext.createTextureInternal(this._dimension, this.element.videoWidth, this.element.videoHeight, TextureFormat.R8G8B8, false, false);
        this.wrapModeU = WrapMode.Clamp;
        this.wrapModeV = WrapMode.Clamp;
        this.filterMode = FilterMode.Bilinear;
        LayaGL.textureContext.initVideoTextureData(this._texture);
        this._texture.gammaCorrection = 2.2;
        if (this.immediatelyPlay) {
            this.play();
        }
        this._isLoaded = true;
        this.event(LayaEvent.READY, this);
    }
    get source() {
        return this._source;
    }
    get gammaCorrection() {
        return 2.2;
    }
    set source(url) {
        this._source = url;
        if (!url)
            return;
        AssetDb.inst.resolveURL(url, url => {
            while (this.element.childElementCount)
                this.element.firstChild.remove();
            if (url.startsWith("blob:"))
                this.element.src = url;
            else
                this.appendSource(url);
        });
    }
    appendSource(source) {
        var sourceElement = ILaya.Browser.createElement("source");
        sourceElement.src = URL.postFormatURL(URL.formatURL(source));
        let extension = Utils.getFileExtension(source);
        sourceElement.type = extension == "m3u8" ? "application/vnd.apple.mpegurl" : ("video/" + extension);
        this.element.appendChild(sourceElement);
    }
    render() {
        if (this.element.readyState == 0)
            return;
        if (this.isNeedUpdate() || Browser.onLayaRuntime) {
            LayaGL.textureContext.updateVideoTexture(this._texture, this.element, false, false);
            this._needUpdate = false;
        }
    }
    set frameRender(value) {
        if (this._frameRender && !value) {
            ILaya.timer.clear(this, this.render);
        }
        if (!this._frameRender && value) {
            ILaya.timer.frameLoop(1, this, this.render);
        }
        this._frameRender = value;
    }
    get frameRender() {
        return this._frameRender;
    }
    play() {
        if (!this._texture) {
            this.immediatelyPlay = true;
        }
        else {
            this.element.play().catch(() => {
                this.event("NotAllowedError");
            });
            if (this._frameRender) {
                ILaya.timer.frameLoop(1, this, this.render);
            }
        }
    }
    _getSource() {
        return this._texture ? this._texture.resource : null;
    }
    get defaultTexture() {
        return Texture2D.whiteTexture;
    }
    pause() {
        this.element.pause();
        if (this._frameRender) {
            ILaya.timer.clear(this, this.render);
        }
    }
    load() {
        this.element.load();
    }
    canPlayType(type) {
        type = type == "m3u8" ? "application/vnd.apple.mpegurl" : ("video/" + type);
        return this.element.canPlayType(type);
    }
    get buffered() {
        return this.element.buffered;
    }
    get currentSrc() {
        return this.element.currentSrc;
    }
    get currentTime() {
        return this.element.currentTime;
    }
    set currentTime(value) {
        if (!this.element)
            return;
        this.element.currentTime = value;
        this.render();
    }
    set volume(value) {
        if (!this.element)
            return;
        this.element.volume = value;
    }
    get volume() {
        return this.element.volume;
    }
    get readyState() {
        return this.element.readyState;
    }
    get videoWidth() {
        return this.element.videoWidth;
    }
    get videoHeight() {
        return this.element.videoHeight;
    }
    get duration() {
        return this.element.duration;
    }
    get ended() {
        return this.element.ended;
    }
    get error() {
        return this.element.error;
    }
    get loop() {
        return this.element.loop;
    }
    set loop(value) {
        if (!this.element)
            return;
        this.element.loop = value;
    }
    get playbackRate() {
        return this.element.playbackRate;
    }
    set playbackRate(value) {
        if (!this.element)
            return;
        this.element.playbackRate = value;
    }
    get muted() {
        return this.element.muted;
    }
    set muted(value) {
        if (!this.element)
            return;
        this.element.muted = value;
    }
    get paused() {
        return this.element.paused;
    }
    get preload() {
        return this.element.preload;
    }
    set preload(value) {
        if (!this.element)
            return;
        this.element.preload = value;
    }
    get seekable() {
        return this.element.seekable;
    }
    get seeking() {
        return this.element.seeking;
    }
    onStartListeningToType(type) {
        if (videoEvents.has(type)) {
            let func = this._listeningEvents[type];
            if (!func)
                func = this._listeningEvents[type] = () => {
                    this.event(type);
                };
            this.element.addEventListener(type, func);
        }
    }
    destroy() {
        var isConchApp = LayaEnv.isConch;
        if (isConchApp) {
            this.element._destroy();
        }
        ILaya.timer.clear(this, this.render);
        super.destroy();
    }
}
const videoEvents = new Set([
    "abort", "canplay", "canplaythrough", "durationchange", "emptied", "error", "loadeddata",
    "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking",
    "stalled", "suspend", "timeupdate", "volumechange", "waiting", "ended"
]);

//# sourceMappingURL=VideoTexture.js.map
