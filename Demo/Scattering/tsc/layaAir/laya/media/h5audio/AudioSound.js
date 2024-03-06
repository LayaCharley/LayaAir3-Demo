import { AudioSoundChannel } from "./AudioSoundChannel";
import { Event } from "../../events/Event";
import { EventDispatcher } from "../../events/EventDispatcher";
import { URL } from "../../net/URL";
import { Browser } from "../../utils/Browser";
import { Pool } from "../../utils/Pool";
import { LayaEnv } from "../../../LayaEnv";
import { SoundManager } from "../SoundManager";
import { AssetDb } from "../../resource/AssetDb";
export class AudioSound extends EventDispatcher {
    constructor() {
        super(...arguments);
        this.loaded = false;
    }
    dispose() {
        var ad = AudioSound._audioCache[this.url];
        Pool.clearBySign("audio:" + this.url);
        if (ad) {
            if (!LayaEnv.isConch) {
                ad.src = "";
            }
            delete AudioSound._audioCache[this.url];
        }
    }
    static _initMusicAudio() {
        if (AudioSound._musicAudio)
            return;
        if (!AudioSound._musicAudio)
            AudioSound._musicAudio = Browser.createElement("audio");
        if (!LayaEnv.isConch) {
            Browser.document.addEventListener("mousedown", AudioSound._makeMusicOK);
        }
    }
    static _makeMusicOK() {
        Browser.document.removeEventListener("mousedown", AudioSound._makeMusicOK);
        if (!AudioSound._musicAudio.src) {
            AudioSound._musicAudio.src = "";
            AudioSound._musicAudio.load();
        }
        else {
            AudioSound._musicAudio.play();
        }
    }
    load(url) {
        this.url = url;
        var ad;
        if (url == SoundManager._bgMusic) {
            AudioSound._initMusicAudio();
            ad = AudioSound._musicAudio;
            if (ad.originalUrl != url) {
                delete AudioSound._audioCache[ad.originalUrl];
                ad = null;
            }
        }
        else {
            ad = AudioSound._audioCache[url];
        }
        if (ad && ad.readyState >= 2) {
            this.event(Event.COMPLETE);
            return;
        }
        if (!ad) {
            if (url == SoundManager._bgMusic) {
                AudioSound._initMusicAudio();
                ad = AudioSound._musicAudio;
            }
            else {
                ad = Browser.createElement("audio");
            }
            AudioSound._audioCache[url] = ad;
            AssetDb.inst.resolveURL(url, url => {
                ad.src = URL.postFormatURL(URL.formatURL(url));
            });
        }
        ad.originalUrl = url;
        ad.addEventListener("canplaythrough", onLoaded);
        ad.addEventListener("error", onErr);
        var me = this;
        function onLoaded() {
            offs();
            me.loaded = true;
            me.event(Event.COMPLETE);
        }
        function onErr() {
            ad.load = null;
            offs();
            me.event(Event.ERROR);
        }
        function offs() {
            ad.removeEventListener("canplaythrough", onLoaded);
            ad.removeEventListener("error", onErr);
        }
        this.audio = ad;
        if (ad.load) {
            ad.load();
        }
        else {
            onErr();
        }
    }
    play(startTime = 0, loops = 0) {
        if (!this.url)
            return null;
        var ad;
        if (this.url == SoundManager._bgMusic) {
            ad = AudioSound._musicAudio;
            if (ad.src != "" && ad.originalUrl != this.url) {
                delete AudioSound._audioCache[ad.originalUrl];
                AudioSound._audioCache[this.url] = ad;
            }
        }
        else {
            ad = AudioSound._audioCache[this.url];
        }
        if (!ad)
            return null;
        var tAd;
        tAd = Pool.getItem("audio:" + this.url);
        if (LayaEnv.isConch) {
            if (!tAd) {
                tAd = Browser.createElement("audio");
                AssetDb.inst.resolveURL(this.url, url => {
                    tAd.src = URL.postFormatURL(URL.formatURL(url));
                });
            }
        }
        else {
            if (this.url == SoundManager._bgMusic) {
                AudioSound._initMusicAudio();
                tAd = AudioSound._musicAudio;
                AssetDb.inst.resolveURL(this.url, url => {
                    tAd.src = URL.postFormatURL(URL.formatURL(url));
                });
            }
            else {
                tAd = tAd ? tAd : ad.cloneNode(true);
            }
        }
        tAd.originalUrl = this.url;
        var channel = new AudioSoundChannel(tAd);
        channel.url = this.url;
        channel.loops = loops;
        channel.startTime = startTime;
        channel.play();
        SoundManager.addChannel(channel);
        return channel;
    }
    get duration() {
        var ad;
        ad = AudioSound._audioCache[this.url];
        if (!ad)
            return 0;
        return ad.duration;
    }
}
AudioSound._audioCache = {};

//# sourceMappingURL=AudioSound.js.map
