import { Context } from "laya/resource/Context";
export declare class SpriteRenderHook {
    constructor();
    static I: SpriteRenderHook;
    static init(): void;
    static setRenderHook(): void;
    protected _repaint: number;
    _renderType: number;
    _x: number;
    _y: number;
    static ShowBorderSign: string;
    static showDisplayBorder(sprite: any, ifShowBorder?: boolean): void;
    static isDisplayShowBorder(sprite: any): boolean;
    render(context: Context, x: number, y: number): void;
}
