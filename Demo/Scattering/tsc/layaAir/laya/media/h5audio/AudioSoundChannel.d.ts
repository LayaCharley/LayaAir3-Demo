import { SoundChannel } from "../SoundChannel";
export declare class AudioSoundChannel extends SoundChannel {
    private _audio;
    private _onEnd;
    private _resumePlay;
    private _src;
    constructor(audio: HTMLAudioElement);
    private __onEnd;
    private __resumePlay;
    play(): void;
    get position(): number;
    get duration(): number;
    stop(): void;
    pause(): void;
    resume(): void;
    set volume(v: number);
    get volume(): number;
}
