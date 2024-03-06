import { Event as LayaEvent } from "../../events/Event";
import { SoundChannel } from "../SoundChannel";
import { Browser } from "../../utils/Browser";
import { ILaya } from "../../../ILaya";
import { Pool } from "../../utils/Pool";
import { LayaEnv } from "../../../LayaEnv";
import { SoundManager } from "../SoundManager";
import { AudioSound } from "./AudioSound";
export class AudioSoundChannel extends SoundChannel {
    constructor(audio) {
        super();
        this._audio = null;
        this._onEnd = this.__onEnd.bind(this);
        this._resumePlay = this.__resumePlay.bind(this);
        audio.addEventListener("ended", this._onEnd);
        this._audio = audio;
        this._src = audio.src;
    }
    __onEnd(evt) {
        if (this.loops == 1) {
            if (this.completeHandler) {
                ILaya.systemTimer.once(10, this, this.__runComplete, [this.completeHandler], false);
                this.completeHandler = null;
            }
            this.stop();
            this.event(LayaEvent.COMPLETE);
            return;
        }
        if (this.loops > 0) {
            this.loops--;
        }
        this.startTime = 0;
        this.play();
    }
    __resumePlay() {
        if (this._audio)
            this._audio.removeEventListener("canplay", this._resumePlay);
        if (this.isStopped)
            return;
        try {
            this._audio.currentTime = this.startTime;
            Browser.container.appendChild(this._audio);
            this._audio.play();
        }
        catch (e) {
            this.event(LayaEvent.ERROR);
        }
    }
    play() {
        this.isStopped = false;
        try {
            this._audio.playbackRate = SoundManager.playbackRate;
            this._audio.currentTime = this.startTime;
        }
        catch (e) {
            this._audio.addEventListener("canplay", this._resumePlay);
            return;
        }
        SoundManager.addChannel(this);
        Browser.container.appendChild(this._audio);
        if ("play" in this._audio) {
            let p = this._audio.play();
            if (p)
                p.catch(e => { });
        }
    }
    get position() {
        if (!this._audio)
            return 0;
        return this._audio.currentTime;
    }
    get duration() {
        if (!this._audio)
            return 0;
        return this._audio.duration;
    }
    stop() {
        super.stop();
        this.isStopped = true;
        SoundManager.removeChannel(this);
        this.completeHandler = null;
        if (!this._audio)
            return;
        if ("pause" in this._audio)
            if (LayaEnv.isConch) {
                this._audio.stop();
            }
        this._audio.pause();
        this._audio.removeEventListener("ended", this._onEnd);
        this._audio.removeEventListener("canplay", this._resumePlay);
        if (!ILaya.Browser.onIE) {
            if (this._audio != AudioSound._musicAudio) {
                Pool.recover("audio:" + this.url, this._audio);
            }
        }
        Browser.removeElement(this._audio);
        this._audio = null;
        if (SoundManager.autoReleaseSound)
            SoundManager.disposeSoundLater(this.url);
    }
    pause() {
        this.isStopped = true;
        SoundManager.removeChannel(this);
        if (!this._audio)
            return;
        if ("pause" in this._audio)
            this._audio.pause();
        if (SoundManager.autoReleaseSound)
            SoundManager.disposeSoundLater(this.url);
    }
    resume() {
        var audio = this._audio;
        if (!audio)
            return;
        this.isStopped = false;
        if (audio.readyState == 0) {
            audio.src = this._src;
            audio.addEventListener("canplay", this._resumePlay);
            audio.load();
        }
        SoundManager.addChannel(this);
        if ("play" in audio) {
            audio.play();
        }
    }
    set volume(v) {
        if (!this._audio)
            return;
        this._audio.volume = v;
    }
    get volume() {
        if (!this._audio)
            return 1;
        return this._audio.volume;
    }
}

//# sourceMappingURL=AudioSoundChannel.js.map
