import { AnimationTemplet } from "./AnimationTemplet";
import { EventDispatcher } from "../events/EventDispatcher";
export declare class AnimationPlayer extends EventDispatcher {
    isCache: boolean;
    playbackRate: number;
    returnToZeroStopped: boolean;
    get templet(): AnimationTemplet;
    set templet(value: AnimationTemplet);
    get playStart(): number;
    get playEnd(): number;
    get playDuration(): number;
    get overallDuration(): number;
    get currentAnimationClipIndex(): number;
    get currentKeyframeIndex(): number;
    get currentPlayTime(): number;
    get currentFrameTime(): number;
    get cachePlayRate(): number;
    set cachePlayRate(value: number);
    get cacheFrameRate(): number;
    set cacheFrameRate(value: number);
    set currentTime(value: number);
    get paused(): boolean;
    set paused(value: boolean);
    get cacheFrameRateInterval(): number;
    get state(): number;
    get destroyed(): boolean;
    constructor();
    private _setPlayParams;
    private _setPlayParamsWhenStop;
    play(index?: number, playbackRate?: number, overallDuration?: number, playStart?: number, playEnd?: number): void;
    playByFrame(index?: number, playbackRate?: number, overallDuration?: number, playStartFrame?: number, playEndFrame?: number, fpsIn3DBuilder?: number): void;
    stop(immediate?: boolean): void;
    destroy(): void;
}
