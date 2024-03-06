import { Handler } from "laya/utils/Handler";
export declare class Base64Atlas {
    data: any;
    replaceO: any;
    idKey: string;
    constructor(data: any, idKey?: string);
    private init;
    getAdptUrl(url: string): string;
    private _loadedHandler;
    preLoad(completeHandler?: Handler): void;
    private preloadEnd;
    replaceRes(uiObj: any): void;
}
