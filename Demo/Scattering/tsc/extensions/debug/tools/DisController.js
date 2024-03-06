import { RecInfo } from "./RecInfo";
import { DisControlTool } from "./DisControlTool";
import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Axis } from "./comps/Axis";
export class DisController {
    constructor() {
        DisController.init();
        this.arrowAxis = new Axis();
        this.arrowAxis.mouseEnabled = true;
    }
    static init() {
        if (DisController._container) {
            DisControlTool.setTop(DisController._container);
            return;
        }
        ;
        DisController._container = new Sprite();
        DisController._container.mouseEnabled = true;
        Laya.stage.addChild(DisController._container);
    }
    set target(target) {
        this._target = target;
        if (target) {
            DisController._container.addChild(this.arrowAxis);
            Laya.timer.loop(100, this, this.updateMe);
        }
        else {
            this.arrowAxis.removeSelf();
            Laya.timer.clear(this, this.updateMe);
        }
        this.arrowAxis.target = target;
        this.updateMe();
    }
    get target() {
        return this._target;
    }
    set type(lenType) {
        this.arrowAxis.type = lenType;
    }
    get type() {
        return this.arrowAxis.type;
    }
    switchType() {
        this.arrowAxis.switchType();
    }
    updateMe() {
        if (!this._target)
            return;
        this.recInfo = RecInfo.getGlobalRecInfo(this._target, 0, 0, 1, 0, 0, 1);
        console.log("rotation:", this.recInfo.rotation);
        console.log("pos:", this.recInfo.x, this.recInfo.y);
        console.log("scale:", this.recInfo.width, this.recInfo.height);
        this.arrowAxis.x = this.recInfo.x;
        this.arrowAxis.y = this.recInfo.y;
        this.arrowAxis.rotation = this.recInfo.rotation;
        this.arrowAxis.yAxis.rotation = this.recInfo.rotationV - this.recInfo.rotation;
    }
    static get I() {
        if (!DisController._instance) {
            DisController._instance = new DisController();
        }
        return DisController._instance;
    }
    static set I(value) {
        DisController._instance = value;
    }
}
