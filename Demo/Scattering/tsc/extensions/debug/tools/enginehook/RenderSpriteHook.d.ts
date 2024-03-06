import { Sprite } from "laya/display/Sprite";
import { RenderSprite } from "laya/renders/RenderSprite";
import { Context } from "laya/resource/Context";
export declare class RenderSpriteHook {
    static IMAGE: number;
    static FILTERS: number;
    static ALPHA: number;
    static TRANSFORM: number;
    static CANVAS: number;
    static BLEND: number;
    static CLIP: number;
    static STYLE: number;
    static GRAPHICS: number;
    static CUSTOM: number;
    static ENABLERENDERMERGE: number;
    static CHILDS: number;
    static INIT: number;
    static renders: any[];
    _next: RenderSprite;
    _fun: Function;
    static _oldCanvas: Function;
    constructor();
    static I: RenderSpriteHook;
    static _preCreateFun: Function;
    static init(): void;
    _canvas(sprite: Sprite, context: Context, x: number, y: number): void;
}
