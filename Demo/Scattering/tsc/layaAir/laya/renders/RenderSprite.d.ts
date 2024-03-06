import { Sprite } from "../display/Sprite";
import { Context } from "../resource/Context";
import { RenderTexture2D } from "../resource/RenderTexture2D";
export interface _RenderFunction {
    (sp: Sprite, ctx: Context, x: number, y: number): void;
}
export declare class RenderSprite {
    static renders: RenderSprite[];
    protected static NORENDER: RenderSprite;
    private static _initRenderFun;
    private static _getTypeRender;
    constructor(type: number, next: RenderSprite | null);
    protected onCreate(type: number): void;
    _maskNative(sprite: Sprite, ctx: Context, x: number, y: number): void;
    static tmpTarget(ctx: Context, rt: RenderTexture2D, w: number, h: number): void;
    static recycleTarget(rt: RenderTexture2D): void;
    static setBlendMode(blendMode: string): void;
}
