import { BaseTexture } from "../resource/BaseTexture";
import { Texture2D } from "../resource/Texture2D";
export declare class VideoTexture extends BaseTexture {
    readonly element: HTMLVideoElement;
    private _source;
    private _listeningEvents;
    private immediatelyPlay;
    private _frameRender;
    _isLoaded: boolean;
    _needUpdate: boolean;
    constructor();
    private isNeedUpdate;
    loadedmetadata(): void;
    get source(): string;
    get gammaCorrection(): number;
    set source(url: string);
    private appendSource;
    set frameRender(value: boolean);
    get frameRender(): boolean;
    play(): void;
    _getSource(): any;
    get defaultTexture(): Texture2D;
    pause(): void;
    load(): void;
    canPlayType(type: string): CanPlayTypeResult;
    get buffered(): any;
    get currentSrc(): string;
    get currentTime(): number;
    set currentTime(value: number);
    set volume(value: number);
    get volume(): number;
    get readyState(): any;
    get videoWidth(): number;
    get videoHeight(): number;
    get duration(): number;
    get ended(): boolean;
    get error(): MediaError;
    get loop(): boolean;
    set loop(value: boolean);
    get playbackRate(): number;
    set playbackRate(value: number);
    get muted(): boolean;
    set muted(value: boolean);
    get paused(): boolean;
    get preload(): string;
    set preload(value: string);
    get seekable(): any;
    get seeking(): boolean;
    protected onStartListeningToType(type: string): void;
    destroy(): void;
}