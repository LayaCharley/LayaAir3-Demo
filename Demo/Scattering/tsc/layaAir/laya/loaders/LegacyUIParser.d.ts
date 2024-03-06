import { Node } from "../display/Node";
import { Sprite } from "../display/Sprite";
import { Handler } from "laya/utils/Handler";
export declare class LegacyUIParser {
    private static _funMap;
    private static _parseWatchData;
    private static _parseKeyWord;
    static parse(data: any, options: any): Sprite;
    static getBindFun(value: string): Function;
    static createByData(root: Sprite, uiView: any): Sprite;
    static createInitTool(): InitTool;
    static createComp(uiView: any, comp?: Sprite, view?: Sprite, dataMap?: any[], initTool?: InitTool): any;
    private static setCompValue;
    static getCompInstance(json: any): any;
    static collectResourceLinks(uiView: any): string[];
    static createByJson(json: any, node?: any, root?: Node, customHandler?: Handler, instanceHandler?: Handler): any;
    private static _getGraphicsFromSprite;
    private static _getTransformData;
    private static _addGraphicToGraphics;
    private static _adptLineData;
    private static _adptTextureData;
    private static _adptLinesData;
    private static _getParams;
    private static DrawTypeDic;
    private static _temParam;
    private static _tM;
    private static _alpha;
    private static _getObjVar;
}
declare class InitTool {
    private _nodeRefList;
    private _initList;
    reset(): void;
    recover(): void;
    static create(): InitTool;
    addNodeRef(node: any, prop: string, referStr: string): void;
    setNodeRef(): void;
    getReferData(referStr: string): any;
    addInitItem(item: any): void;
    doInits(): void;
    finish(): void;
}
export {};
