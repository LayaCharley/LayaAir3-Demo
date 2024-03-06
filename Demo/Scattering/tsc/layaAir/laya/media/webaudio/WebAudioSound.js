import { WebAudioSoundChannel } from "./WebAudioSoundChannel";
import { Event } from "../../events/Event";
import { EventDispatcher } from "../../events/EventDispatcher";
import { SoundManager } from "../SoundManager";
import { ILaya } from "../../../ILaya";
import { Loader } from "../../net/Loader";
export class WebAudioSound extends EventDispatcher {
    constructor() {
        super(...arguments);
        this.loaded = false;
        this._disposed = false;
    }
    static _playEmptySound() {
        if (WebAudioSound.ctx == null) {
            return;
        }
        var source = WebAudioSound.ctx.createBufferSource();
        source.buffer = WebAudioSound._miniBuffer;
        source.connect(WebAudioSound.ctx.destination);
        source.start(0, 0, 0);
    }
    static _unlock() {
        if (WebAudioSound._unlocked) {
            return;
        }
        WebAudioSound._playEmptySound();
        if (WebAudioSound.ctx.state == "running") {
            window.document.removeEventListener("mousedown", WebAudioSound._unlock, true);
            window.document.removeEventListener("touchend", WebAudioSound._unlock, true);
            window.document.removeEventListener("touchstart", WebAudioSound._unlock, true);
            WebAudioSound._unlocked = true;
        }
    }
    static initWebAudio() {
        WebAudioSound.ctx = new (window["AudioContext"] || window["webkitAudioContext"] || window["mozAudioContext"])();
        if (WebAudioSound.ctx.state != "running") {
            WebAudioSound._unlock();
            window.document.addEventListener("mousedown", WebAudioSound._unlock, true);
            window.document.addEventListener("touchend", WebAudioSound._unlock, true);
            window.document.addEventListener("touchstart", WebAudioSound._unlock, true);
        }
    }
    load(url) {
        this.url = url;
        this.audioBuffer = ILaya.loader.getRes(url);
        if (this.audioBuffer) {
            this._loaded(this.audioBuffer);
            return;
        }
        ILaya.loader.load(url, Loader.SOUND).then(audioBuffer => this._loaded(audioBuffer));
    }
    _loaded(audioBuffer) {
        if (this._disposed)
            return;
        this.audioBuffer = audioBuffer;
        this.loaded = true;
        this.event(Event.COMPLETE);
    }
    __playAfterLoaded() {
        if (!this.__toPlays)
            return;
        var i, len;
        var toPlays;
        toPlays = this.__toPlays;
        len = toPlays.length;
        var tParams;
        for (i = 0; i < len; i++) {
            tParams = toPlays[i];
            if (tParams[2] && !tParams[2].isStopped) {
                this.play(tParams[0], tParams[1], tParams[2]);
            }
        }
        this.__toPlays.length = 0;
    }
    play(startTime = 0, loops = 0, channel = null) {
        channel = channel ? channel : new WebAudioSoundChannel();
        if (!this.audioBuffer) {
            if (this.url) {
                if (!this.__toPlays)
                    this.__toPlays = [];
                this.__toPlays.push([startTime, loops, channel]);
                this.once(Event.COMPLETE, this, this.__playAfterLoaded);
                this.load(this.url);
            }
        }
        channel.url = this.url;
        channel.loops = loops;
        channel.audioBuffer = this.audioBuffer;
        channel.startTime = startTime;
        channel.play();
        SoundManager.addChannel(channel);
        return channel;
    }
    get duration() {
        if (this.audioBuffer) {
            return this.audioBuffer.duration;
        }
        return 0;
    }
    dispose() {
        this._disposed = true;
        if (this.audioBuffer) {
            ILaya.loader.clearRes(this.url, this.audioBuffer);
            this.audioBuffer = null;
        }
        this.__toPlays = [];
    }
}
WebAudioSound._miniBuffer = WebAudioSound.ctx ? WebAudioSound.ctx.createBuffer(1, 1, 22050) : undefined;
WebAudioSound._unlocked = false;

//# sourceMappingURL=WebAudioSound.js.map
