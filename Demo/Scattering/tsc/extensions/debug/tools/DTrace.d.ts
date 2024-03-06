export declare class DTrace {
    constructor();
    static getArgArr(arg: any[]): any[];
    static dTrace(...arg: any[]): void;
    static timeStart(sign: string): void;
    static timeEnd(sign: string): void;
    static traceTable(data: any[]): void;
}
