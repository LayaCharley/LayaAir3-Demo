import { Sprite } from "laya/display/Sprite";
export declare class ObjectTools {
    constructor();
    static sign: string;
    static getFlatKey(tKey: string, aKey: string): string;
    static flatObj(obj: any, rst?: any, tKey?: string): any;
    static recoverObj(obj: any): any;
    static differ(objA: any, objB: any): any;
    static traceDifferObj(obj: any): void;
    static setKeyValue(obj: any, flatKey: string, value: any): void;
    static clearObj(obj: any): void;
    static copyObjFast(obj: any): any;
    static copyObj(obj: any): any;
    static copyArr(arr: any[]): any[];
    static concatArr(src: any[], a: any[]): any[];
    static insertArrToArr(src: any[], insertArr: any[], pos?: number): any[];
    static clearArr(arr: any[]): any[];
    static removeFromArr(arr: any[], item: any): void;
    static setValueArr(src: any[], v: any[]): any[];
    static getFrom(rst: any[], src: any[], count: number): any[];
    static getFromR(rst: any[], src: any[], count: number): any[];
    static enableDisplayTree(dis: Sprite): void;
    static getJsonString(obj: any): string;
    static getObj(jsonStr: string): any;
    static getKeyArr(obj: any): any[];
    static getObjValues(dataList: any[], key: string): any[];
    static hasKeys(obj: any, keys: any[]): boolean;
    static copyValueByArr(tar: any, src: any, keys: any[]): void;
    static getNoSameArr(arr: any[]): any[];
    static insertValue(tar: any, src: any): void;
    static replaceValue(obj: any, replaceO: any): void;
    static setKeyValues(items: any[], key: string, value: any): void;
    static findItemPos(items: any[], sign: string, value: any): number;
    static setObjValue(obj: any, key: string, value: any): any;
    static setAutoTypeValue(obj: any, key: string, value: any): any;
    static getAutoValue(value: any): any;
    static isNumber(value: any): boolean;
    static isNaNS(value: any): boolean;
    static isNaN(value: any): boolean;
    static getStrTypedValue(value: string): any;
    static createKeyValueDic(dataList: any[], keySign: string): any;
}
