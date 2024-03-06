import { Event } from "../events/Event";
import { AudioSound } from "./h5audio/AudioSound";
import { WebAudioSound } from "./webaudio/WebAudioSound";
import { ILaya } from "../../ILaya";
import { Browser } from "../utils/Browser";
import { LayaEnv } from "../../LayaEnv";
export class SoundManager {
    static __init__() {
        var win = ILaya.Browser.window;
        var supportWebAudio = win["AudioContext"] || win["webkitAudioContext"] || win["mozAudioContext"] ? true : false;
        if (supportWebAudio)
            WebAudioSound.initWebAudio();
        SoundManager._soundClass = supportWebAudio ? WebAudioSound : AudioSound;
        if (!Browser.onTBMiniGame) {
            AudioSound._initMusicAudio();
        }
        SoundManager._musicClass = AudioSound;
        return supportWebAudio;
    }
    static addChannel(channel) {
        if (SoundManager._channels.indexOf(channel) >= 0)
            return;
        SoundManager._channels.push(channel);
    }
    static removeChannel(channel) {
        for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
            if (SoundManager._channels[i] == channel) {
                SoundManager._channels.splice(i, 1);
            }
        }
    }
    static disposeSoundLater(url) {
        SoundManager._lastSoundUsedTimeDic[url] = ILaya.Browser.now();
        if (!SoundManager._isCheckingDispose) {
            SoundManager._isCheckingDispose = true;
            ILaya.timer.loop(5000, null, SoundManager._checkDisposeSound);
        }
    }
    static _checkDisposeSound() {
        let tTime = ILaya.Browser.now();
        let hasCheck = false;
        for (let key in SoundManager._lastSoundUsedTimeDic) {
            if (tTime - SoundManager._lastSoundUsedTimeDic[key] > 30000) {
                delete SoundManager._lastSoundUsedTimeDic[key];
                SoundManager.disposeSoundIfNotUsed(key);
            }
            else {
                hasCheck = true;
            }
        }
        if (!hasCheck) {
            SoundManager._isCheckingDispose = false;
            ILaya.timer.clear(null, SoundManager._checkDisposeSound);
        }
    }
    static disposeSoundIfNotUsed(url) {
        for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
            if (SoundManager._channels[i].url == url) {
                return;
            }
        }
        SoundManager.destroySound(url);
    }
    static set autoStopMusic(v) {
        ILaya.stage.off(Event.BLUR, null, SoundManager._stageOnBlur);
        ILaya.stage.off(Event.FOCUS, null, SoundManager._stageOnFocus);
        ILaya.stage.off(Event.VISIBILITY_CHANGE, null, SoundManager._visibilityChange);
        SoundManager._autoStopMusic = v;
        if (v) {
            ILaya.stage.on(Event.BLUR, null, SoundManager._stageOnBlur);
            ILaya.stage.on(Event.FOCUS, null, SoundManager._stageOnFocus);
            ILaya.stage.on(Event.VISIBILITY_CHANGE, null, SoundManager._visibilityChange);
        }
    }
    static get autoStopMusic() {
        return SoundManager._autoStopMusic;
    }
    static _visibilityChange() {
        if (ILaya.stage.isVisibility) {
            SoundManager._stageOnFocus();
        }
        else {
            SoundManager._stageOnBlur();
        }
    }
    static _stageOnBlur() {
        SoundManager._isActive = false;
        if (SoundManager._musicChannel) {
            if (!SoundManager._musicChannel.isStopped) {
                SoundManager._blurPaused = true;
                SoundManager._musicChannel.pause();
            }
        }
        SoundManager.stopAllSound();
        ILaya.stage.once(Event.MOUSE_DOWN, null, SoundManager._stageOnFocus);
    }
    static _recoverWebAudio() {
        if (WebAudioSound.ctx && WebAudioSound.ctx.state != "running" && WebAudioSound.ctx.resume)
            WebAudioSound.ctx.resume();
    }
    static _stageOnFocus() {
        SoundManager._isActive = true;
        SoundManager._recoverWebAudio();
        ILaya.stage.off(Event.MOUSE_DOWN, null, SoundManager._stageOnFocus);
        if (SoundManager._blurPaused) {
            if (SoundManager._musicChannel && SoundManager._musicChannel.isStopped) {
                SoundManager._blurPaused = false;
                SoundManager._musicChannel.resume();
            }
        }
    }
    static set muted(value) {
        if (value == SoundManager._muted)
            return;
        if (value) {
            SoundManager.stopAllSound();
        }
        SoundManager.musicMuted = value;
        SoundManager._muted = value;
    }
    static get muted() {
        return SoundManager._muted;
    }
    static set soundMuted(value) {
        SoundManager._soundMuted = value;
    }
    static get soundMuted() {
        return SoundManager._soundMuted;
    }
    static set musicMuted(value) {
        if (value == SoundManager._musicMuted)
            return;
        if (value) {
            if (SoundManager._bgMusic) {
                if (SoundManager._musicChannel && !SoundManager._musicChannel.isStopped) {
                    if (LayaEnv.isConch) {
                        if (SoundManager._musicChannel._audio)
                            SoundManager._musicChannel._audio.muted = true;
                        ;
                    }
                    else {
                        SoundManager._musicChannel.pause();
                    }
                }
                else {
                    SoundManager._musicChannel = null;
                }
            }
            else {
                SoundManager._musicChannel = null;
            }
            SoundManager._musicMuted = value;
        }
        else {
            SoundManager._musicMuted = value;
            if (SoundManager._bgMusic) {
                if (SoundManager._musicChannel) {
                    if (LayaEnv.isConch) {
                        if (SoundManager._musicChannel._audio)
                            SoundManager._musicChannel._audio.muted = false;
                        ;
                    }
                    else {
                        SoundManager._musicChannel.resume();
                    }
                }
            }
        }
    }
    static get musicMuted() {
        return SoundManager._musicMuted;
    }
    static get useAudioMusic() {
        return SoundManager._useAudioMusic;
    }
    static set useAudioMusic(value) {
        SoundManager._useAudioMusic = value;
        if (value) {
            SoundManager._musicClass = AudioSound;
        }
        else {
            SoundManager._musicClass = null;
        }
    }
    static playSound(url, loops = 1, complete = null, soundClass = null, startTime = 0) {
        if (!SoundManager._isActive || !url)
            return null;
        if (SoundManager._muted)
            return null;
        SoundManager._recoverWebAudio();
        if (url == SoundManager._bgMusic) {
            if (SoundManager._musicMuted)
                return null;
        }
        else {
            if (SoundManager._soundMuted)
                return null;
        }
        let tSound;
        if (!Browser._isMiniGame) {
            tSound = SoundManager._soundCache[url];
        }
        if (!soundClass)
            soundClass = SoundManager._soundClass;
        if (!tSound) {
            tSound = new soundClass();
            tSound.load(url);
            if (!Browser._isMiniGame) {
                SoundManager._soundCache[url] = tSound;
            }
        }
        let channel = tSound.play(startTime, loops);
        if (!channel)
            return null;
        channel.url = url;
        channel.volume = (url == SoundManager._bgMusic) ? SoundManager.musicVolume : SoundManager.soundVolume;
        channel.completeHandler = complete;
        return channel;
    }
    static destroySound(url) {
        let tSound = SoundManager._soundCache[url];
        if (tSound) {
            delete SoundManager._soundCache[url];
            tSound.dispose();
        }
    }
    static playMusic(url, loops = 0, complete = null, startTime = 0) {
        SoundManager._bgMusic = url;
        if (SoundManager._musicChannel)
            SoundManager._musicChannel.stop();
        return SoundManager._musicChannel = SoundManager.playSound(url, loops, complete, SoundManager._musicClass, startTime);
    }
    static stopSound(url) {
        for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
            let channel = SoundManager._channels[i];
            if (channel.url == url) {
                channel.stop();
            }
        }
    }
    static stopAll() {
        SoundManager._bgMusic = null;
        var i;
        var channel;
        for (i = SoundManager._channels.length - 1; i >= 0; i--) {
            channel = SoundManager._channels[i];
            channel.stop();
        }
    }
    static stopAllSound() {
        for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
            let channel = SoundManager._channels[i];
            if (channel.url != SoundManager._bgMusic) {
                channel.stop();
            }
        }
    }
    static stopMusic() {
        if (SoundManager._musicChannel)
            SoundManager._musicChannel.stop();
        SoundManager._bgMusic = null;
    }
    static setSoundVolume(volume, url = null) {
        if (url) {
            SoundManager._setVolume(url, volume);
        }
        else {
            SoundManager.soundVolume = volume;
            for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
                let channel = SoundManager._channels[i];
                if (channel.url != SoundManager._bgMusic) {
                    channel.volume = volume;
                }
            }
        }
    }
    static setMusicVolume(volume) {
        SoundManager.musicVolume = volume;
        SoundManager._setVolume(SoundManager._bgMusic, volume);
    }
    static _setVolume(url, volume) {
        for (let i = SoundManager._channels.length - 1; i >= 0; i--) {
            let channel = SoundManager._channels[i];
            if (channel.url == url) {
                channel.volume = volume;
            }
        }
    }
}
SoundManager.musicVolume = 1;
SoundManager.soundVolume = 1;
SoundManager.playbackRate = 1;
SoundManager._useAudioMusic = true;
SoundManager._muted = false;
SoundManager._soundMuted = false;
SoundManager._musicMuted = false;
SoundManager._bgMusic = null;
SoundManager._musicChannel = null;
SoundManager._channels = [];
SoundManager._blurPaused = false;
SoundManager._isActive = true;
SoundManager._lastSoundUsedTimeDic = {};
SoundManager._isCheckingDispose = false;
SoundManager._soundCache = {};
SoundManager.autoReleaseSound = true;

//# sourceMappingURL=SoundManager.js.map
