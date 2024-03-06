import { ObjTimeCountTool } from "./ObjTimeCountTool";
import { IDTools } from "./IDTools";
import { DebugConsts } from "./DebugConsts";
import { DebugTool } from "../DebugTool";
import { DebugInfoLayer } from "../view/nodeInfo/DebugInfoLayer";
import { ReCacheRecInfo } from "../view/nodeInfo/recinfos/ReCacheRecInfo";
export class CacheAnalyser {
    constructor() {
    }
    static renderLoopBegin() {
        DebugInfoLayer.I.cacheViewLayer.graphics.clear();
    }
    static get I() {
        if (!CacheAnalyser._instance) {
            CacheAnalyser._instance = new CacheAnalyser();
        }
        return CacheAnalyser._instance;
    }
    static set I(value) {
        CacheAnalyser._instance = value;
    }
    static getNodeInfoByNode(node) {
        IDTools.idObj(node);
        var key;
        key = IDTools.getObjID(node);
        if (!CacheAnalyser._nodeInfoDic[key]) {
            CacheAnalyser._nodeInfoDic[key] = new ReCacheRecInfo();
        }
        CacheAnalyser._nodeInfoDic[key].setTarget(node);
        return CacheAnalyser._nodeInfoDic[key];
    }
    renderCanvas(sprite, time = 0) {
        if (!CacheAnalyser.showCacheSprite)
            return;
        if (DebugInfoLayer.I.isDebugItem(sprite))
            return;
        DebugTool.showDisBoundToSprite(sprite, DebugInfoLayer.I.cacheViewLayer, DebugConsts.CANVAS_REC_COLOR, 4);
    }
    reCacheCanvas(sprite, time = 0) {
        if (!CacheAnalyser.showRecacheSprite)
            return;
        if (DebugInfoLayer.I.isDebugItem(sprite))
            return;
        var info;
        info = CacheAnalyser.getNodeInfoByNode(sprite);
        info.addCount(time);
        CacheAnalyser.counter.addTime(sprite, time);
        if (!info.parent) {
            DebugInfoLayer.I.nodeRecInfoLayer.addChild(info);
        }
    }
}
CacheAnalyser.counter = new ObjTimeCountTool();
CacheAnalyser._nodeInfoDic = {};
CacheAnalyser.showCacheSprite = false;
CacheAnalyser.showRecacheSprite = true;
