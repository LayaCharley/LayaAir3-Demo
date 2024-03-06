import { IFilter } from "./IFilter";
import { Sprite } from "../display/Sprite";
import { RenderSprite } from "../renders/RenderSprite";
export declare class NativeFilter implements IFilter {
    static BLUR: number;
    static COLOR: number;
    static GLOW: number;
    constructor();
    get type(): number;
    static _filter: (this: RenderSprite, sprite: Sprite, context: any, x: number, y: number) => void;
}
