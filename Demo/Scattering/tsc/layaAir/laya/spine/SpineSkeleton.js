import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
import { Sprite } from "../display/Sprite";
import { Event } from "../events/Event";
import { SoundManager } from "../media/SoundManager";
import { Loader } from "../net/Loader";
import { Handler } from "../utils/Handler";
import { SpineSkeletonRenderer } from "./SpineSkeletonRenderer";
export class SpineSkeleton extends Sprite {
    constructor() {
        super();
        this._currentPlayTime = 0;
        this._pause = true;
        this._currAniName = null;
        this._playbackRate = 1.0;
        this._playAudio = true;
        this._soundChannelArr = [];
        this.trackIndex = 0;
        this._skinName = "default";
        this._animationName = "";
        this._loop = true;
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (value) {
            ILaya.loader.load(value, Loader.SPINE).then((templet) => {
                if (!this._source || templet && !templet.isCreateFromURL(this._source))
                    return;
                this.templet = templet;
            });
        }
        else
            this.templet = null;
    }
    get skinName() {
        return this._skinName;
    }
    set skinName(value) {
        this._skinName = value;
        if (this._templet)
            this.showSkinByName(value);
    }
    get animationName() {
        return this._animationName;
    }
    set animationName(value) {
        this._animationName = value;
        if (this._templet)
            this.play(value, this._loop, true);
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
        if (this._templet)
            this.play(this._animationName, this._loop, true);
    }
    get templet() {
        return this._templet;
    }
    set templet(value) {
        this.init(value);
    }
    set currentTime(value) {
        if (!this._currAniName || !this._templet)
            return;
        value /= 1000;
        if (value < this._playStart || (!!this._playEnd && value > this._playEnd) || value > this._duration)
            throw new Error("AnimationPlayer: value must large than playStartTime,small than playEndTime.");
        this._state.update(value - this._currentPlayTime);
        this._currentPlayTime = value;
    }
    get playState() {
        if (!this._currAniName)
            return SpineSkeleton.STOPPED;
        if (this._pause)
            return SpineSkeleton.PAUSED;
        return SpineSkeleton.PLAYING;
    }
    init(templet) {
        if (this._templet) {
            this.reset();
            this.graphics.clear();
        }
        this._templet = templet;
        if (!this._templet)
            return;
        this._templet._addReference();
        this._skeleton = new templet.ns.Skeleton(this._templet.skeletonData);
        this._stateData = new templet.ns.AnimationStateData(this._skeleton.data);
        this._state = new templet.ns.AnimationState(this._stateData);
        this._renerer = new SpineSkeletonRenderer(templet, false);
        this._timeKeeper = new templet.ns.TimeKeeper();
        let skinIndex = this._templet.getSkinIndexByName(this._skinName);
        if (skinIndex != -1)
            this.showSkinByIndex(skinIndex);
        this._state.addListener({
            start: (entry) => {
            },
            interrupt: (entry) => {
            },
            end: (entry) => {
            },
            dispose: (entry) => {
            },
            complete: (entry) => {
                if (entry.loop) {
                    this.event(Event.COMPLETE);
                }
                else {
                    this._currAniName = null;
                    this.event(Event.STOPPED);
                }
            },
            event: (entry, event) => {
                let eventData = {
                    audioValue: event.data.audioPath,
                    audioPath: event.data.audioPath,
                    floatValue: event.floatValue,
                    intValue: event.intValue,
                    name: event.data.name,
                    stringValue: event.stringValue,
                    time: event.time * 1000,
                    balance: event.balance,
                    volume: event.volume
                };
                this.event(Event.LABEL, eventData);
                if (this._playAudio && eventData.audioValue) {
                    let channel = SoundManager.playSound(templet.basePath + eventData.audioValue, 1, Handler.create(this, this._onAniSoundStoped), null, (this._currentPlayTime * 1000 - eventData.time) / 1000);
                    SoundManager.playbackRate = this._playbackRate;
                    channel && this._soundChannelArr.push(channel);
                }
            },
        });
        this.event(Event.READY);
        if (LayaEnv.isPlaying && this._animationName)
            this.play(this._animationName, this._loop, true);
    }
    play(nameOrIndex, loop, force = true, start = 0, end = 0, freshSkin = true, playAudio = true) {
        this._playAudio = playAudio;
        start /= 1000;
        end /= 1000;
        let animationName = nameOrIndex;
        if (start < 0 || end < 0)
            throw new Error("SpineSkeleton: start and end must large than zero.");
        if ((end !== 0) && (start > end))
            throw new Error("SpineSkeleton: start must less than end.");
        if (typeof animationName == "number") {
            animationName = this.getAniNameByIndex(nameOrIndex);
        }
        if (force || this._pause || this._currAniName != animationName) {
            this._currAniName = animationName;
            this._state.setAnimation(this.trackIndex, animationName, loop);
            let trackEntry = this._state.getCurrent(this.trackIndex);
            trackEntry.animationStart = start;
            if (!!end && end < trackEntry.animationEnd)
                trackEntry.animationEnd = end;
            let animationDuration = trackEntry.animation.duration;
            this._duration = animationDuration;
            this._playStart = start;
            this._playEnd = end <= animationDuration ? end : animationDuration;
            if (this._pause) {
                this._pause = false;
                this.timer.frameLoop(1, this, this._update, null, true);
            }
            this._update();
        }
    }
    _update() {
        this._timeKeeper.update();
        let delta = this._timeKeeper.delta * this._playbackRate;
        let trackEntry = this._state.getCurrent(this.trackIndex);
        this._state.update(delta);
        this._state.apply(this._skeleton);
        let animationLast = trackEntry.animationLast;
        this._currentPlayTime = Math.max(0, animationLast);
        if (!this._state || !this._skeleton) {
            return;
        }
        this._skeleton.updateWorldTransform();
        this.graphics.clear();
        this._renerer.draw(this._skeleton, this.graphics, -1, -1);
    }
    getAnimNum() {
        return this._templet.skeletonData.animations.length;
    }
    getAniNameByIndex(index) {
        return this._templet.getAniNameByIndex(index);
    }
    getSlotByName(slotName) {
        return this._skeleton.findSlot(slotName);
    }
    playbackRate(value) {
        this._playbackRate = value;
    }
    showSkinByName(name) {
        this.showSkinByIndex(this._templet.getSkinIndexByName(name));
    }
    showSkinByIndex(skinIndex) {
        let newSkine = this._skeleton.data.skins[skinIndex];
        this._skeleton.setSkin(newSkine);
        this._skeleton.setSlotsToSetupPose();
    }
    stop() {
        if (!this._pause) {
            this._pause = true;
            this._currAniName = null;
            this.timer.clear(this, this._update);
            this._state.update(-this._currentPlayTime);
            this._currentPlayTime = 0;
            this.event(Event.STOPPED);
            if (this._soundChannelArr.length > 0) {
                this._onAniSoundStoped(true);
            }
        }
    }
    paused() {
        if (!this._pause) {
            this._pause = true;
            this.timer.clear(this, this._update);
            this.event(Event.PAUSED);
            if (this._soundChannelArr.length > 0) {
                for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                    let channel = this._soundChannelArr[i];
                    if (!channel.isStopped) {
                        channel.pause();
                    }
                }
            }
        }
    }
    resume() {
        if (this._pause) {
            this._pause = false;
            this.timer.frameLoop(1, this, this._update, null, true);
            if (this._soundChannelArr.length > 0) {
                for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
                    let channel = this._soundChannelArr[i];
                    if (channel.audioBuffer) {
                        channel.resume();
                    }
                }
            }
        }
    }
    _onAniSoundStoped(force) {
        for (let len = this._soundChannelArr.length, i = 0; i < len; i++) {
            let channel = this._soundChannelArr[i];
            if (channel.isStopped || force) {
                !channel.isStopped && channel.stop();
                this._soundChannelArr.splice(i, 1);
                len--;
                i--;
            }
        }
    }
    reset() {
        this._templet._removeReference(1);
        this._templet = null;
        this._timeKeeper = null;
        this._skeleton = null;
        this._state.clearListeners();
        this._state = null;
        this._renerer = null;
        this._currAniName = null;
        this._pause = true;
        this.timer.clear(this, this._update);
        if (this._soundChannelArr.length > 0)
            this._onAniSoundStoped(true);
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        if (this._templet)
            this.reset();
    }
    addAnimation(nameOrIndex, loop = false, delay = 0) {
        delay /= 1000;
        let animationName = nameOrIndex;
        if (typeof animationName == "number") {
            animationName = this.getAniNameByIndex(animationName);
        }
        this._currAniName = animationName;
        this._state.addAnimation(this.trackIndex, animationName, loop, delay);
    }
    setMix(fromNameOrIndex, toNameOrIndex, duration) {
        duration /= 1000;
        let fromName = fromNameOrIndex;
        if (typeof fromName == "number") {
            fromName = this.getAniNameByIndex(fromName);
        }
        let toName = toNameOrIndex;
        if (typeof toName == "number") {
            toName = this.getAniNameByIndex(toName);
        }
        this._stateData.setMix(fromName, toName, duration);
    }
    getBoneByName(boneName) {
        return this._skeleton.findBone(boneName);
    }
    getSkeleton() {
        return this._skeleton;
    }
    setSlotAttachment(slotName, attachmentName) {
        this._skeleton.setAttachment(slotName, attachmentName);
    }
}
SpineSkeleton.STOPPED = 0;
SpineSkeleton.PAUSED = 1;
SpineSkeleton.PLAYING = 2;

//# sourceMappingURL=SpineSkeleton.js.map
