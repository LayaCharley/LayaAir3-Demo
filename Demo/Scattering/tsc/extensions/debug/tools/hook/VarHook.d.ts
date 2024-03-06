export declare class VarHook {
    constructor();
    static hookVar(obj: any, name: string, setHook?: any[], getHook?: any[]): void;
    static getLocFun(msg?: string, level?: number): Function;
}
