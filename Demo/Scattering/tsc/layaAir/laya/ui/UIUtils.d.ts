import { Sprite } from "../display/Sprite";
export declare class UIUtils {
    private static grayFilter;
    static fillArray(arr: any[], str: string, type?: typeof Number | typeof String): any[];
    static toColor(color: number): string;
    static gray(target: Sprite, isGray?: boolean): void;
    private static _funMap;
    static getBindFun(value: string): Function;
}
