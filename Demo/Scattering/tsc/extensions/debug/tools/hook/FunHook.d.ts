export declare class FunHook {
    constructor();
    static hook(obj: any, funName: string, preFun?: Function, aftFun?: Function): void;
    static special: any;
    static hookAllFun(obj: any): void;
    private static getTraceMsg;
    static hookFuns(obj: any, funName: string, funList: any[], rstI?: number): void;
    static removeHook(obj: any, funName: string): void;
    static debugHere(): void;
    static traceLoc(level?: number, msg?: string): void;
    static getLocFun(level?: number, msg?: string): Function;
}
