import { SoundChannel } from "./SoundChannel";
import { Handler } from "../utils/Handler";
export declare class SoundManager {
    static musicVolume: number;
    static soundVolume: number;
    static playbackRate: number;
    private static _useAudioMusic;
    private static _muted;
    private static _soundMuted;
    private static _musicMuted;
    static _musicChannel: SoundChannel;
    private static _channels;
    private static _autoStopMusic;
    private static _blurPaused;
    private static _isActive;
    private static _lastSoundUsedTimeDic;
    private static _isCheckingDispose;
    private static _soundCache;
    static autoReleaseSound: boolean;
    static addChannel(channel: SoundChannel): void;
    static removeChannel(channel: SoundChannel): void;
    static disposeSoundLater(url: string): void;
    private static _checkDisposeSound;
    static disposeSoundIfNotUsed(url: string): void;
    static set autoStopMusic(v: boolean);
    static get autoStopMusic(): boolean;
    private static _visibilityChange;
    private static _stageOnBlur;
    private static _recoverWebAudio;
    private static _stageOnFocus;
    static set muted(value: boolean);
    static get muted(): boolean;
    static set soundMuted(value: boolean);
    static get soundMuted(): boolean;
    static set musicMuted(value: boolean);
    static get musicMuted(): boolean;
    static get useAudioMusic(): boolean;
    static set useAudioMusic(value: boolean);
    static playSound(url: string, loops?: number, complete?: Handler, soundClass?: new () => any, startTime?: number): SoundChannel;
    static destroySound(url: string): void;
    static playMusic(url: string, loops?: number, complete?: Handler, startTime?: number): SoundChannel;
    static stopSound(url: string): void;
    static stopAll(): void;
    static stopAllSound(): void;
    static stopMusic(): void;
    static setSoundVolume(volume: number, url?: string): void;
    static setMusicVolume(volume: number): void;
    private static _setVolume;
}
