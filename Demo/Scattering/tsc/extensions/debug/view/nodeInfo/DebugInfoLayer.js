import { Laya } from "Laya";
import { Event } from "laya/events/Event";
import { DisControlTool } from "../../tools/DisControlTool";
import { Sprite } from "laya/display/Sprite";
export class DebugInfoLayer extends Sprite {
    constructor() {
        super();
        this.nodeRecInfoLayer = new Sprite();
        this.lineLayer = new Sprite();
        this.txtLayer = new Sprite();
        this.popLayer = new Sprite();
        this.graphicLayer = new Sprite();
        this.cacheViewLayer = new Sprite();
        this.nodeRecInfoLayer.name = "nodeRecInfoLayer";
        this.lineLayer.name = "lineLayer";
        this.txtLayer.name = "txtLayer";
        this.popLayer.name = "popLayer";
        this.graphicLayer.name = "graphicLayer";
        this.cacheViewLayer.name = "cacheViewLayer";
        this.addChild(this.lineLayer);
        this.addChild(this.cacheViewLayer);
        this.addChild(this.nodeRecInfoLayer);
        this.addChild(this.txtLayer);
        this.addChild(this.popLayer);
        this.addChild(this.graphicLayer);
        DebugInfoLayer.I = this;
        this.zOrder = 999;
        Laya.stage.on(Event.DOUBLE_CLICK, this, this.setTop);
    }
    static init() {
        if (!DebugInfoLayer.I) {
            new DebugInfoLayer();
            Laya.stage.addChild(DebugInfoLayer.I);
        }
    }
    setTop() {
        DisControlTool.setTop(this);
    }
    isDebugItem(sprite) {
        return DisControlTool.isInTree(this, sprite);
    }
}
