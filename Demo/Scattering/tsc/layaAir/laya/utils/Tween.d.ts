import { Handler } from "./Handler";
export declare class Tween {
    private static tweenMap;
    private _complete;
    private _target;
    private _ease;
    private _props;
    private _duration;
    private _delay;
    private _startTimer;
    private _usedTimer;
    private _usedPool;
    private _delayParam;
    gid: number;
    update: Handler;
    repeat: number;
    private _count;
    static to(target: any, props: any, duration: number, ease?: Function | null, complete?: Handler | null, delay?: number, coverBefore?: boolean, autoRecover?: boolean): Tween;
    static from(target: any, props: any, duration: number, ease?: Function, complete?: Handler, delay?: number, coverBefore?: boolean, autoRecover?: boolean): Tween;
    to(target: any, props: any, duration: number, ease?: Function, complete?: Handler, delay?: number, coverBefore?: boolean): Tween;
    from(target: any, props: any, duration: number, ease?: Function | null, complete?: Handler | null, delay?: number, coverBefore?: boolean): Tween;
    private firstStart;
    private _initProps;
    private _beginLoop;
    private _doEase;
    set progress(v: number);
    complete(): void;
    pause(): void;
    setStartTime(startTime: number): void;
    static clearAll(target: any): void;
    static clear(tween: Tween): void;
    static clearTween(target: any): void;
    clear(): void;
    recover(): void;
    private _remove;
    restart(): void;
    resume(): void;
    private static easeNone;
}
