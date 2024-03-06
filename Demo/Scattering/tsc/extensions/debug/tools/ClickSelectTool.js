import { Notice } from "./Notice";
import { DisplayHook } from "./DisplayHook";
import { Laya } from "Laya";
import { DebugConsts } from "./DebugConsts";
import { DebugTool } from "../DebugTool";
import { DebugInfoLayer } from "../view/nodeInfo/DebugInfoLayer";
import { NodeUtils } from "../view/nodeInfo/NodeUtils";
import { Sprite } from "laya/display/Sprite";
import { Rectangle } from "laya/maths/Rectangle";
import { Browser } from "laya/utils/Browser";
export class ClickSelectTool {
    constructor() {
        this._selectTip = new Sprite();
        this._selectTip.setSelfBounds(new Rectangle(0, 0, 0, 0));
        Notice.listen(DisplayHook.ITEM_CLICKED, this, this.itemClicked);
    }
    static get I() {
        if (!ClickSelectTool._I)
            ClickSelectTool._I = new ClickSelectTool();
        return ClickSelectTool._I;
    }
    beginClickSelect(complete = null) {
        this.completeHandler = complete;
        ClickSelectTool.isClickSelectState = true;
        this.clickSelectChange();
    }
    clickSelectChange() {
        if (!Browser.onPC)
            return;
        this.tSelectTar = null;
        this.clearSelectTip();
        if (ClickSelectTool.isClickSelectState) {
            Laya.timer.loop(200, this, this.updateSelectTar, null, true);
        }
        else {
            Laya.timer.clear(this, this.updateSelectTar);
        }
    }
    clearSelectTip() {
        this._selectTip.removeSelf();
    }
    updateSelectTar() {
        this.clearSelectTip();
        this.tSelectTar = DisplayHook.instance.getDisUnderMouse();
        if (!this.tSelectTar) {
            return;
        }
        if (DebugInfoLayer.I.isDebugItem(this.tSelectTar))
            return;
        var g;
        g = this._selectTip.graphics;
        g.clear();
        var rec;
        rec = NodeUtils.getGRec(this.tSelectTar);
        DebugInfoLayer.I.popLayer.addChild(this._selectTip);
        g.drawRect(0, 0, rec.width, rec.height, null, DebugConsts.CLICK_SELECT_COLOR, 2);
        this._selectTip.pos(rec.x, rec.y);
    }
    itemClicked(tar) {
        if (!ClickSelectTool.isClickSelectState)
            return;
        if (ClickSelectTool.ignoreDebugTool) {
            if (DebugInfoLayer.I.isDebugItem(tar))
                return;
        }
        DebugTool.showDisBound(tar);
        if (this.completeHandler) {
            this.completeHandler.runWith(tar);
        }
        ClickSelectTool.isClickSelectState = false;
        this.clickSelectChange();
    }
}
ClickSelectTool.isClickSelectState = false;
ClickSelectTool.ignoreDebugTool = false;
