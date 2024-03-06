export declare class Pool {
    private static _CLSID;
    private static POOLSIGN;
    private static _poolDic;
    static getPoolBySign(sign: string): any[];
    static clearBySign(sign: string): void;
    static recover(sign: string, item: any): void;
    static recoverByClass(instance: any): void;
    private static _getClassSign;
    static createByClass<T>(cls: new () => T): T;
    static getItemByClass<T>(sign: string, cls: new () => T): T;
    static getItemByCreateFun(sign: string, createFun: Function, caller?: any): any;
    static getItem(sign: string): any;
}
