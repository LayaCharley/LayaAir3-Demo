import { Sprite } from "../../display/Sprite";
import { Handler } from "../../utils/Handler";
export declare class MovieClip extends Sprite {
    basePath: string;
    private _source;
    interval: number;
    loop: boolean;
    constructor(parentMovieClip?: MovieClip);
    destroy(destroyChild?: boolean): void;
    updates(): void;
    get index(): number;
    set index(value: number);
    addLabel(label: string, index: number): void;
    removeLabel(label: string): void;
    get count(): number;
    get playing(): boolean;
    stop(): void;
    gotoAndStop(index: number): void;
    play(index?: number, loop?: boolean): void;
    get source(): string;
    set source(value: string);
    load(url: string, atlas?: boolean, atlasPath?: string): void;
    playTo(start: number, end: number, complete?: Handler): void;
}
