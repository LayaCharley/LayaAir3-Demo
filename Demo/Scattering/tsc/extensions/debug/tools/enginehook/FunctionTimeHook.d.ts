import { CountTool } from "../CountTool";
export declare class FunctionTimeHook {
    static HookID: number;
    constructor();
    static hookFun(obj: any, funName: string): void;
    static counter: CountTool;
    static funPre: any;
    static funBegin(funKey: string): void;
    static funEnd(funKey: string): void;
    static TotalSign: string;
    static fresh(): void;
}
