import { Node } from "laya/display/Node";
import { Sprite } from "laya/display/Sprite";
export declare class TraceTool {
    static _debugtrace: Function;
    constructor();
    static closeAllLog(): void;
    static emptyLog(): void;
    static tempArr: any[];
    static traceObj(obj: any): string;
    static traceObjR(obj: any): string;
    static traceSize(tar: any): void;
    static traceSplit(msg: string): void;
    static group(gName: any): void;
    static groupEnd(): void;
    static getCallStack(life?: number, s?: number): string;
    static Erroer: any;
    static getCallLoc(index?: number): string;
    static traceCallStack(): string;
    private static holderDic;
    static getPlaceHolder(len: number): string;
    static traceTree(tar: Node, depth?: number, isFirst?: boolean): void;
    static getClassName(tar: any): string;
    static traceSpriteInfo(tar: Sprite, showBounds?: boolean, showSize?: boolean, showTree?: boolean): void;
}
