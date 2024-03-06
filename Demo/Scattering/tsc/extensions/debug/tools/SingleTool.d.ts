export declare class SingleTool {
    constructor();
    private static _instance;
    static get I(): SingleTool;
    static set I(value: SingleTool);
    private _objDic;
    getArr(sign: string): any[];
    getObject(sign: string): any;
    getByClass(sign: string, clzSign: string, clz: new () => any): any;
    getTypeDic(type: string): any;
}
