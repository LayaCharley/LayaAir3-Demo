import { Sprite } from "laya/display/Sprite";
export declare class AutoFillRec extends Sprite {
    type: number;
    constructor(type: string);
    set width(value: number);
    set height(value: number);
    protected changeSize(): void;
    preX: number;
    preY: number;
    record(): void;
    getDx(): number;
    getDy(): number;
}
