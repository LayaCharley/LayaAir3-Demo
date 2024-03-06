import { Sprite } from "laya/display/Sprite";
export declare class DisResizer {
    static Side: number;
    static Vertical: number;
    static Horizon: number;
    constructor();
    private static _up;
    private static _down;
    private static _left;
    private static _right;
    private static _barList;
    private static _tar;
    static barWidth: number;
    static useGetBounds: boolean;
    static init(): void;
    private static stageDown;
    static clear(): void;
    private static addEvent;
    private static tBar;
    private static barDown;
    private static draging;
    private static dragEnd;
    private static clearDragEvents;
    static setUp(dis: Sprite, force?: boolean): void;
    static updates(): void;
}
