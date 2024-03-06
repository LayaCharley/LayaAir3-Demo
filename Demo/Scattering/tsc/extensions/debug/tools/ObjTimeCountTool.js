import { IDTools } from "./IDTools";
import { ObjectTools } from "./ObjectTools";
export class ObjTimeCountTool {
    constructor() {
        this.timeDic = {};
        this.resultDic = {};
        this.countDic = {};
        this.resultCountDic = {};
        this.nodeDic = {};
        this.resultNodeDic = {};
    }
    addTime(sprite, time) {
        IDTools.idObj(sprite);
        var key;
        key = IDTools.getObjID(sprite);
        if (!this.timeDic.hasOwnProperty(key)) {
            this.timeDic[key] = 0;
        }
        this.timeDic[key] = this.timeDic[key] + time;
        if (!this.countDic.hasOwnProperty(key)) {
            this.countDic[key] = 0;
        }
        this.countDic[key] = this.countDic[key] + 1;
        this.nodeDic[key] = sprite;
    }
    getTime(sprite) {
        IDTools.idObj(sprite);
        var key;
        key = IDTools.getObjID(sprite);
        if (!this.resultDic[key])
            return 0;
        return this.resultDic[key];
    }
    getCount(sprite) {
        IDTools.idObj(sprite);
        var key;
        key = IDTools.getObjID(sprite);
        return this.resultCountDic[key];
    }
    reset() {
        var key;
        for (key in this.timeDic) {
            this.timeDic[key] = 0;
            this.countDic[key] = 0;
        }
        ObjectTools.clearObj(this.nodeDic);
    }
    updates() {
        ObjectTools.clearObj(this.resultDic);
        ObjectTools.insertValue(this.resultDic, this.timeDic);
        ObjectTools.clearObj(this.resultCountDic);
        ObjectTools.insertValue(this.resultCountDic, this.countDic);
        ObjectTools.insertValue(this.resultNodeDic, this.nodeDic);
        this.reset();
    }
}
