import { SoundManager } from "./SoundManager";
import { Sprite } from "../display/Sprite";
import { Event } from "../events/Event";
import { LayaEnv } from "../../LayaEnv";
export class SoundNode extends Sprite {
    constructor() {
        super();
        this._loop = 1;
        this.on(Event.ADDED, this, this._onParentChange);
        this.on(Event.REMOVED, this, this._onParentChange);
    }
    get source() {
        return this._source;
    }
    set source(value) {
        this._source = value;
        if (value) {
            if (this._autoPlay && (!this._channel || this._channel.isStopped) && LayaEnv.isPlaying)
                this.play();
        }
        else
            this.stop();
    }
    get isMusic() {
        return this._isMusic;
    }
    set isMusic(value) {
        this._isMusic = value;
    }
    get loop() {
        return this._loop;
    }
    set loop(value) {
        this._loop = value;
    }
    get autoPlay() {
        return this._autoPlay;
    }
    set autoPlay(value) {
        this._autoPlay = value;
        if (value && this._source && (!this._channel || this._channel.isStopped) && LayaEnv.isPlaying)
            this.play();
    }
    _onParentChange() {
        this.target = this.parent;
    }
    play(loops, complete) {
        if (!this._source)
            return;
        if (loops == null || isNaN(loops))
            loops = this._loop;
        this.stop();
        if (this._isMusic)
            this._channel = SoundManager.playMusic(this._source, loops, complete);
        else
            this._channel = SoundManager.playSound(this._source, loops, complete);
    }
    stop() {
        if (this._channel && !this._channel.isStopped) {
            this._channel.stop();
        }
        this._channel = null;
    }
    _setPlayAction(tar, event, action, add = true) {
        if (!this[action])
            return;
        if (!tar)
            return;
        if (add) {
            tar.on(event, this, this[action]);
        }
        else {
            tar.off(event, this, this[action]);
        }
    }
    _setPlayActions(tar, events, action, add = true) {
        if (!tar)
            return;
        if (!events)
            return;
        let eventArr = events.split(",");
        let len = eventArr.length;
        for (let i = 0; i < len; i++) {
            this._setPlayAction(tar, eventArr[i], action, add);
        }
    }
    set playEvent(events) {
        this._playEvents = events;
        if (!events)
            return;
        if (this._tar) {
            this._setPlayActions(this._tar, events, "play");
        }
    }
    set target(tar) {
        if (this._tar) {
            this._setPlayActions(this._tar, this._playEvents, "play", false);
            this._setPlayActions(this._tar, this._stopEvents, "stop", false);
        }
        this._tar = tar;
        if (this._tar) {
            this._setPlayActions(this._tar, this._playEvents, "play", true);
            this._setPlayActions(this._tar, this._stopEvents, "stop", true);
        }
    }
    set stopEvent(events) {
        this._stopEvents = events;
        if (!events)
            return;
        if (this._tar) {
            this._setPlayActions(this._tar, events, "stop");
        }
    }
}

//# sourceMappingURL=SoundNode.js.map
