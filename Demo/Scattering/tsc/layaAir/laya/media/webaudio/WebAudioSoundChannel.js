import { Event } from "../../events/Event";
import { SoundChannel } from "../SoundChannel";
import { Browser } from "../../utils/Browser";
import { ILaya } from "../../../ILaya";
import { SoundManager } from "../SoundManager";
import { WebAudioSound } from "./WebAudioSound";
export class WebAudioSoundChannel extends SoundChannel {
    constructor() {
        super();
        this.bufferSource = null;
        this._currentTime = 0;
        this._volume = 1;
        this._startTime = 0;
        this._pauseTime = 0;
        this.context = WebAudioSound.ctx;
        this._onPlayEnd = this.__onPlayEnd.bind(this);
        if (this.context["createGain"]) {
            this.gain = this.context["createGain"]();
        }
        else {
            this.gain = this.context["createGainNode"]();
        }
    }
    play() {
        SoundManager.addChannel(this);
        this.isStopped = false;
        this._clearBufferSource();
        if (!this.audioBuffer)
            return;
        if (this.startTime >= this.duration)
            return this.stop();
        var context = this.context;
        var gain = this.gain;
        var bufferSource = context.createBufferSource();
        this.bufferSource = bufferSource;
        bufferSource.buffer = this.audioBuffer;
        bufferSource.connect(gain);
        if (gain)
            gain.disconnect();
        gain.connect(context.destination);
        bufferSource.onended = this._onPlayEnd;
        this._startTime = Browser.now();
        if (this.gain.gain.setTargetAtTime) {
            this.gain.gain.setTargetAtTime(this._volume, this.context.currentTime, WebAudioSoundChannel.SetTargetDelay);
        }
        else
            this.gain.gain.value = this._volume;
        if (this.loops == 0) {
            bufferSource.loop = true;
        }
        if (bufferSource.playbackRate.setTargetAtTime) {
            bufferSource.playbackRate.setTargetAtTime(SoundManager.playbackRate, this.context.currentTime, WebAudioSoundChannel.SetTargetDelay);
        }
        else
            bufferSource.playbackRate.value = SoundManager.playbackRate;
        bufferSource.start(0, this.startTime);
        this._currentTime = 0;
    }
    __onPlayEnd() {
        if (this.loops == 1) {
            if (this.completeHandler) {
                ILaya.timer.once(10, this, this.__runComplete, [this.completeHandler], false);
                this.completeHandler = null;
            }
            this.stop();
            this.event(Event.COMPLETE);
            return;
        }
        if (this.loops > 0) {
            this.loops--;
        }
        this.startTime = 0;
        this.play();
    }
    get position() {
        if (this.bufferSource) {
            return (Browser.now() - this._startTime) / 1000 + this.startTime;
        }
        return 0;
    }
    get duration() {
        if (this.audioBuffer) {
            return this.audioBuffer.duration;
        }
        return 0;
    }
    _clearBufferSource() {
        if (this.bufferSource) {
            var sourceNode = this.bufferSource;
            if (sourceNode.stop) {
                sourceNode.stop(0);
            }
            else {
                sourceNode.noteOff(0);
            }
            sourceNode.disconnect(0);
            sourceNode.onended = null;
            if (!WebAudioSoundChannel._tryCleanFailed)
                this._tryClearBuffer(sourceNode);
            this.bufferSource = null;
        }
    }
    _tryClearBuffer(sourceNode) {
        try {
            sourceNode.buffer = null;
        }
        catch (e) {
            WebAudioSoundChannel._tryCleanFailed = true;
        }
    }
    stop() {
        super.stop();
        this._clearBufferSource();
        this.audioBuffer = null;
        if (this.gain)
            this.gain.disconnect();
        this.isStopped = true;
        SoundManager.removeChannel(this);
        this.completeHandler = null;
        if (SoundManager.autoReleaseSound)
            SoundManager.disposeSoundLater(this.url);
    }
    pause() {
        if (!this.isStopped) {
            this._pauseTime = this.position;
        }
        this._clearBufferSource();
        if (this.gain)
            this.gain.disconnect();
        this.isStopped = true;
        SoundManager.removeChannel(this);
        if (SoundManager.autoReleaseSound)
            SoundManager.disposeSoundLater(this.url);
    }
    resume() {
        this.startTime = this._pauseTime;
        this.play();
    }
    set volume(v) {
        this._volume = v;
        if (this.isStopped) {
            return;
        }
        if (this.gain.gain.setTargetAtTime) {
            this.gain.gain.setTargetAtTime(v, this.context.currentTime, WebAudioSoundChannel.SetTargetDelay);
        }
        else
            this.gain.gain.value = v;
    }
    get volume() {
        return this._volume;
    }
}
WebAudioSoundChannel._tryCleanFailed = false;
WebAudioSoundChannel.SetTargetDelay = 0.001;

//# sourceMappingURL=WebAudioSoundChannel.js.map
