import { Sprite } from "laya/display/Sprite";
export declare class CommonTools {
    constructor();
    static bind(fun: Function, scope: any): Function;
    private static count;
    static insertP(tar: Sprite, x: number, y: number, scaleX: number, scaleY: number, rotation: number): void;
    static insertChild(tar: Sprite, x: number, y: number, scaleX: number, scaleY: number, rotation: number, color?: string): Sprite;
    static createSprite(width: number, height: number, color?: string): Sprite;
    static createBtn(txt: string, width?: number, height?: number): Sprite;
}
