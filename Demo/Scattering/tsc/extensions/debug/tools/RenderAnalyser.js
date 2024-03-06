import { IDTools } from "./IDTools";
import { ObjectTools } from "./ObjectTools";
import { Laya } from "Laya";
import { NodeConsts } from "../view/nodeInfo/NodeConsts";
export class RenderAnalyser {
    constructor() {
        this.timeDic = {};
        this.resultDic = {};
        this.countDic = {};
        this.resultCountDic = {};
        this.nodeDic = {};
        this.isWorking = false;
        this.working = true;
    }
    static get I() {
        if (!RenderAnalyser._instance) {
            RenderAnalyser._instance = new RenderAnalyser();
        }
        return RenderAnalyser._instance;
    }
    static set I(value) {
        RenderAnalyser._instance = value;
    }
    render(sprite, time) {
        this.addTime(sprite, time);
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
        this.reset();
    }
    set working(v) {
        this.isWorking = v;
        if (v) {
            Laya.timer.loop(NodeConsts.RenderCostMaxTime, this, this.updates);
        }
        else {
            Laya.timer.clear(this, this.updates);
        }
    }
}
