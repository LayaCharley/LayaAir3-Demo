import { SoundChannel } from "../SoundChannel";
export declare class WebAudioSoundChannel extends SoundChannel {
    audioBuffer: any;
    private gain;
    private bufferSource;
    private _currentTime;
    private _volume;
    private _startTime;
    private _pauseTime;
    private context;
    private _onPlayEnd;
    private static _tryCleanFailed;
    static SetTargetDelay: number;
    constructor();
    play(): void;
    private __onPlayEnd;
    get position(): number;
    get duration(): number;
    private _clearBufferSource;
    private _tryClearBuffer;
    stop(): void;
    pause(): void;
    resume(): void;
    set volume(v: number);
    get volume(): number;
}
