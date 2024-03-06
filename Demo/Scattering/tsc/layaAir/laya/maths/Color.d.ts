import { IClone } from "../utils/IClone";
export declare class Color implements IClone {
    static RED: Color;
    static GREEN: Color;
    static BLUE: Color;
    static CYAN: Color;
    static YELLOW: Color;
    static MAGENTA: Color;
    static GRAY: Color;
    static WHITE: Color;
    static BLACK: Color;
    static CLEAR: Color;
    static gammaToLinearSpace(value: number): number;
    static linearToGammaSpace(value: number): number;
    r: number;
    g: number;
    b: number;
    a: number;
    constructor(r?: number, g?: number, b?: number, a?: number);
    equal(c: Color): boolean;
    toLinear(out: Color): void;
    toGamma(out: Color): void;
    cloneTo(destObject: any): void;
    scale(value: number): Color;
    setValue(r: number, g: number, b: number, a: number): void;
    fromArray(array: any[], offset?: number): void;
    toArray(): Array<number>;
    clone(): any;
}
