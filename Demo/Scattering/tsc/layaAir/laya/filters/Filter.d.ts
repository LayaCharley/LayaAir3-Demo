import { IFilter } from "./IFilter";
import { Sprite } from "../display/Sprite";
import { RenderSprite } from "../renders/RenderSprite";
import { Context } from "../resource/Context";
export declare class Filter implements IFilter {
    static BLUR: number;
    static COLOR: number;
    static GLOW: number;
    constructor();
    get type(): number;
    static _filter: (this: RenderSprite, sprite: Sprite, context: Context, x: number, y: number) => void;
}
