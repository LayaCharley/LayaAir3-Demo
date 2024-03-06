import { ObjTimeCountTool } from "./ObjTimeCountTool";
import { Sprite } from "laya/display/Sprite";
import { ReCacheRecInfo } from "../view/nodeInfo/recinfos/ReCacheRecInfo";
export declare class CacheAnalyser {
    constructor();
    static renderLoopBegin(): void;
    static counter: ObjTimeCountTool;
    private static _instance;
    static get I(): CacheAnalyser;
    static set I(value: CacheAnalyser);
    private static _nodeInfoDic;
    static showCacheSprite: boolean;
    static showRecacheSprite: boolean;
    static getNodeInfoByNode(node: Sprite): ReCacheRecInfo;
    renderCanvas(sprite: Sprite, time?: number): void;
    reCacheCanvas(sprite: Sprite, time?: number): void;
}
