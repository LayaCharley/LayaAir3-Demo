export declare class ColorTool {
    constructor();
    red: number;
    green: number;
    blue: number;
    static toHexColor(color: number): string;
    static getRGBByRGBStr(str: string): any[];
    static getColorBit(value: number): string;
    static getRGBStr(rgb: any[], coefficient?: number): string;
    static traseHSB(hsb: any[]): void;
    static rgb2hsb(rgbR: number, rgbG: number, rgbB: number): any[];
    static hsb2rgb(h: number, s: number, v: number): any[];
}
