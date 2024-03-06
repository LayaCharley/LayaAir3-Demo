import { NodeRecInfo } from "./NodeRecInfo";
import { Laya } from "Laya";
import { ClassTool } from "../../../tools/ClassTool";
export class ReCacheRecInfo extends NodeRecInfo {
    constructor() {
        super();
        this.isWorking = false;
        this.mTime = 0;
        this.txt.fontSize = 12;
    }
    addCount(time = 0) {
        this.count++;
        this.mTime += time;
        if (!this.isWorking) {
            this.working = true;
        }
    }
    updates() {
        if (!this._tar["displayedInStage"]) {
            this.working = false;
            this.removeSelf();
        }
        this.txt.text = ClassTool.getNodeClassAndName(this._tar) + "\n" + "reCache:" + this.count + "\ntime:" + this.mTime;
        if (this.count > 0) {
            this.fresh();
            Laya.timer.clear(this, this.removeSelfLater);
        }
        else {
            this.working = false;
            Laya.timer.once(ReCacheRecInfo.showTime, this, this.removeSelfLater);
        }
        this.count = 0;
        this.mTime = 0;
    }
    removeSelfLater() {
        this.working = false;
        this.removeSelf();
    }
    set working(v) {
        this.isWorking = v;
        if (v) {
            Laya.timer.loop(1000, this, this.updates);
        }
        else {
            Laya.timer.clear(this, this.updates);
        }
    }
}
ReCacheRecInfo.showTime = 3000;
