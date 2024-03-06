import { Matrix } from "laya/maths/Matrix";
import { Sprite } from "laya/display/Sprite";
export declare class JSTools {
    constructor();
    static showToBody(el: any, x?: number, y?: number): void;
    static showToParent(el: any, x?: number, y?: number, parent?: any): void;
    static addToBody(el: any): void;
    static setPos(el: any, x: number, y: number): void;
    static setSize(el: any, width: number, height: number): void;
    static setTransform(el: any, mat: Matrix): void;
    static noMouseEvent(el: any): void;
    static setMouseEnable(el: any, enable: boolean): void;
    static setZIndex(el: any, zIndex: number): void;
    static showAboveSprite(el: any, sprite: Sprite, dx?: number, dy?: number): void;
    static removeElement(el: any): void;
    static isElementInDom(el: any): boolean;
    static getImageSpriteByFile(file: any, width?: number, height?: number): Sprite;
    private static _pixelRatio;
    static getPixelRatio(): number;
}
