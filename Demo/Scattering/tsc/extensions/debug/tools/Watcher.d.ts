export declare class Watcher {
    constructor();
    static watch(obj: any, name: string, funs: any[]): void;
    static traceChange(obj: any, name: string, sign?: string): void;
    static debugChange(obj: any, name: string): void;
    static differChange(obj: any, name: string, sign: string, msg?: string): void;
    static getDifferFun(obj: any, name: string, sign: string, msg?: string): Function;
    static traceValue(value: any): void;
    static getTraceValueFun(name: string): Function;
}
