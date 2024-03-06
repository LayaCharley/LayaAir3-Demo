import { Sprite } from "laya/display/Sprite";
export declare class AutoSizeRec extends Sprite {
    type: number;
    constructor(type: string);
    set height(value: number);
    set width(value: number);
    private _color;
    setColor(color: string): void;
    protected changeSize(): void;
    private reRender;
    preX: number;
    preY: number;
    record(): void;
    getDx(): number;
    getDy(): number;
}
