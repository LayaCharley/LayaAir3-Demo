export declare class StringTool {
    constructor();
    static toUpCase(str: string): string;
    static toLowCase(str: string): string;
    static toUpHead(str: string): string;
    static toLowHead(str: string): string;
    static packageToFolderPath(packageName: string): string;
    static insert(str: string, iStr: string, index: number): string;
    static insertAfter(str: string, iStr: string, tarStr: string, isLast?: boolean): string;
    static insertBefore(str: string, iStr: string, tarStr: string, isLast?: boolean): string;
    static insertParamToFun(funStr: string, params: any[]): string;
    static trim(str: string, vList?: any[]): string;
    static emptyStrDic: any;
    static isEmpty(str: string): boolean;
    static trimLeft(str: string): string;
    static trimRight(str: string): string;
    static trimSide(str: string): string;
    static specialChars: any;
    static isOkFileName(fileName: string): boolean;
    static trimButEmpty(str: string): string;
    static removeEmptyStr(strArr: any[]): any[];
    static ifNoAddToTail(str: string, sign: string): string;
    static trimEmptyLine(str: string): string;
    static isEmptyLine(str: string): boolean;
    static removeCommentLine(lines: any[]): any[];
    static addIfNotEmpty(arr: any[], str: string): void;
    static trimExt(str: string, vars: any[]): string;
    static getBetween(str: string, left: string, right: string, ifMax?: boolean): string;
    static getSplitLine(line: string, split?: string): any[];
    static getLeft(str: string, sign: string): string;
    static getRight(str: string, sign: string): string;
    static delelteItem(arr: any[]): void;
    static getWords(line: string): any[];
    static getLinesI(startLine: number, endLine: number, lines: any[]): any[];
    static structfy(str: string, inWidth?: number, removeEmpty?: boolean): string;
    static emptyDic: any;
    static getEmptyStr(width: number): string;
    static getPariCount(str: string, inChar?: string, outChar?: string): number;
    static readInt(str: string, startI?: number): number;
    static getReplace(str: string, oStr: string, nStr: string): string;
    static getWordCount(str: string, findWord: string): number;
    static getResolvePath(path: string, basePath: string): string;
    static isAbsPath(path: string): boolean;
    static removeLastSign(str: string, sign: string): string;
    static getParamArr(str: string): any[];
    static copyStr(str: string): string;
    static ArrayToString(arr: any[]): string;
    static getArrayItems(arr: any[]): string;
    static parseItem(item: any): string;
    static alphaSigns: any;
    static initAlphaSign(): void;
    static addSign(ss: string, e: string, tar: any): void;
    static isPureAlphaNum(str: string): boolean;
}