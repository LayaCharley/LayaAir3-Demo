import { Sprite } from "../display/Sprite";
import { Handler } from "../utils/Handler";
export declare class SoundNode extends Sprite {
    private _channel;
    private _tar;
    private _playEvents;
    private _stopEvents;
    private _source;
    private _isMusic;
    private _autoPlay;
    private _loop;
    constructor();
    get source(): string;
    set source(value: string);
    get isMusic(): boolean;
    set isMusic(value: boolean);
    get loop(): number;
    set loop(value: number);
    get autoPlay(): boolean;
    set autoPlay(value: boolean);
    private _onParentChange;
    play(loops?: number, complete?: Handler): void;
    stop(): void;
    private _setPlayAction;
    private _setPlayActions;
    set playEvent(events: string);
    set target(tar: Sprite);
    set stopEvent(events: string);
}
