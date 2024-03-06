export declare class JsonTool {
    constructor();
    static singleLineKey: any;
    static getJsonString(obj: any, singleLine?: boolean, split?: string, depth?: number, Width?: number): string;
    private static wrapValue;
    private static getArrStr;
    static escapable: RegExp;
    meta: any;
    static quote(string: string): string;
    private static getValueStr;
    static emptyDic: any;
    static getEmptyStr(width: number): string;
}
