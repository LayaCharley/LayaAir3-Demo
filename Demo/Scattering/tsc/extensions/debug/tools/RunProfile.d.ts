import { CountTool } from "./CountTool";
export declare class RunProfile {
    constructor();
    private static infoDic;
    static run(funName: string, callLen?: number): void;
    private static _runShowDic;
    static showClassCreate(funName: string): void;
    static hideClassCreate(funName: string): void;
    static getRunInfo(funName: string): CountTool;
    static runTest(fun: Function, count: number, sign?: string): void;
    static runTest2(fun: Function, count: number, sign?: string): number;
}
