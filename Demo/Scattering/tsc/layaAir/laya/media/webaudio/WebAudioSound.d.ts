import { WebAudioSoundChannel } from "./WebAudioSoundChannel";
import { EventDispatcher } from "../../events/EventDispatcher";
import { SoundChannel } from "../SoundChannel";
export declare class WebAudioSound extends EventDispatcher {
    static ctx: AudioContext;
    static _miniBuffer: any;
    private static _unlocked;
    url: string;
    loaded: boolean;
    audioBuffer: AudioBuffer;
    private __toPlays;
    private _disposed;
    private static _playEmptySound;
    private static _unlock;
    static initWebAudio(): void;
    load(url: string): void;
    private _loaded;
    private __playAfterLoaded;
    play(startTime?: number, loops?: number, channel?: WebAudioSoundChannel): SoundChannel;
    get duration(): number;
    dispose(): void;
}
