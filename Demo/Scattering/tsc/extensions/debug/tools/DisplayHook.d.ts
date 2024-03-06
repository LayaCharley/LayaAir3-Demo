import { Sprite } from "laya/display/Sprite";
export declare class DisplayHook {
    constructor();
    static ITEM_CLICKED: string;
    static instance: DisplayHook;
    private static selectNodeUnderMouse;
    mouseX: number;
    mouseY: number;
    private _stage;
    private _matrix;
    private _point;
    private _rect;
    private _event;
    private _target;
    static initMe(): void;
    init(canvas: any): void;
    private onMouseMove;
    private onMouseUp;
    private onMouseDown;
    private sendEvent;
    selectDisUnderMouse(): void;
    private isGetting;
    getDisUnderMouse(): Sprite;
    static isFirst: boolean;
    private check;
}
