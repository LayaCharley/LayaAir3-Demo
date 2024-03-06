import { Filter } from "./Filter";
export declare class GlowFilter extends Filter {
    private _elements;
    private _color;
    constructor(color: string, blur?: number, offX?: number, offY?: number);
    get type(): number;
    get offY(): number;
    set offY(value: number);
    get offX(): number;
    set offX(value: number);
    get color(): string;
    set color(value: string);
    getColor(): any[];
    get blur(): number;
    set blur(value: number);
    getColorNative(): Float32Array;
    getBlurInfo1Native(): Float32Array;
    getBlurInfo2Native(): Float32Array;
}
