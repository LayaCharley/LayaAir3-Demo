import { Text } from "laya/display/Text";
export declare class DebugTxt {
    constructor();
    static _txt: Text;
    static I: DebugTxt;
    static init(): void;
    static getArgArr(arg: any[]): any[];
    static dTrace(...arg: any[]): void;
    private static getTimeStr;
    static traceTime(msg: string): void;
    static show(...arg: any[]): void;
}
