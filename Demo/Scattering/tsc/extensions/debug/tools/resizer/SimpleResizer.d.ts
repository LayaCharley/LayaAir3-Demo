import { Sprite } from "laya/display/Sprite";
export declare class SimpleResizer {
    constructor();
    static setResizeAble(clickItem: Sprite, tar: Sprite, minWidth?: number, minHeight?: number): void;
    private static onMouseDown;
    private static preMousePoint;
    private static preTarSize;
    private static preScale;
    private static onMouseMoving;
    private static onMouseMoveEnd;
    private static clearEvents;
}
