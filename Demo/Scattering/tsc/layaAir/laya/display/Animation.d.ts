import { AnimationBase } from "./AnimationBase";
import { Handler } from "../utils/Handler";
export declare class Animation extends AnimationBase {
    static framesMap: any;
    protected _frames: any[];
    private _source;
    private _autoPlay;
    constructor();
    destroy(destroyChild?: boolean): void;
    play(start?: any, loop?: boolean, name?: string): void;
    protected _setFramesFromCache(name: string, showWarn?: boolean): boolean;
    private _copyLabels;
    protected _frameLoop(): void;
    protected _displayToIndex(value: number): void;
    get frames(): any[];
    set frames(value: any[]);
    get source(): string;
    set source(value: string);
    set autoPlay(value: boolean);
    get autoPlay(): boolean;
    clear(): AnimationBase;
    loadImages(urls: any[], cacheName?: string): Animation;
    loadAtlas(url: string, loaded?: Handler, cacheName?: string): Animation;
    loadAnimation(url: string, loaded?: Handler, atlas?: string): Animation;
    private _loadAnimationData;
    static createFrames(url: string | string[], name: string): any[];
    static clearCache(key: string): void;
}
