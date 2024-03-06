import { Text } from "../display/Text";
import { Event } from "../events/Event";
import { UIComponent } from "./UIComponent";
import { UIEvent } from "./UIEvent";
import { Handler } from "../utils/Handler";
import { ILaya } from "../../ILaya";
export class TipManager extends UIComponent {
    constructor() {
        super();
        this._tipBox = new UIComponent();
        this._tipBox.addChild(this._tipText = new Text());
        this._tipText.x = this._tipText.y = 5;
        this._tipText.color = TipManager.tipTextColor;
        this._defaultTipHandler = this._showDefaultTip;
        ILaya.stage.on(UIEvent.SHOW_TIP, this, this._onStageShowTip);
        ILaya.stage.on(UIEvent.HIDE_TIP, this, this._onStageHideTip);
        this.zOrder = 1100;
    }
    _onStageHideTip(e) {
        ILaya.timer.clear(this, this._showTip);
        this.closeAll();
        this.removeSelf();
    }
    _onStageShowTip(data) {
        ILaya.timer.once(TipManager.tipDelay, this, this._showTip, [data], true);
    }
    _showTip(tip) {
        if (typeof (tip) == 'string') {
            var text = String(tip);
            if (Boolean(text)) {
                this._defaultTipHandler(text);
            }
        }
        else if (tip instanceof Handler) {
            tip.run();
        }
        else if (tip instanceof Function) {
            tip.apply();
        }
        if (true) {
            ILaya.stage.on(Event.MOUSE_MOVE, this, this._onStageMouseMove);
            ILaya.stage.on(Event.MOUSE_DOWN, this, this._onStageMouseDown);
        }
        this._onStageMouseMove(null);
    }
    _onStageMouseDown(e) {
        this.closeAll();
    }
    _onStageMouseMove(e) {
        this._showToStage(this, TipManager.offsetX, TipManager.offsetY);
    }
    _showToStage(dis, offX = 0, offY = 0) {
        var rec = dis.getBounds();
        dis.x = ILaya.stage.mouseX + offX;
        dis.y = ILaya.stage.mouseY + offY;
        if (dis._x + rec.width > ILaya.stage.width) {
            dis.x -= rec.width + offX;
        }
        if (dis._y + rec.height > ILaya.stage.height) {
            dis.y -= rec.height + offY;
        }
    }
    closeAll() {
        ILaya.timer.clear(this, this._showTip);
        ILaya.stage.off(Event.MOUSE_MOVE, this, this._onStageMouseMove);
        ILaya.stage.off(Event.MOUSE_DOWN, this, this._onStageMouseDown);
        this.removeChildren();
    }
    showDislayTip(tip) {
        this.addChild(tip);
        this._showToStage(this);
        ILaya.stage.addChild(this);
    }
    _showDefaultTip(text) {
        this._tipText.text = text;
        var g = this._tipBox.graphics;
        g.clear(true);
        g.drawRect(0, 0, this._tipText.width + 10, this._tipText.height + 10, TipManager.tipBackColor);
        this.addChild(this._tipBox);
        this._showToStage(this);
        ILaya.stage.addChild(this);
    }
    get defaultTipHandler() {
        return this._defaultTipHandler;
    }
    set defaultTipHandler(value) {
        this._defaultTipHandler = value;
    }
}
TipManager.offsetX = 10;
TipManager.offsetY = 15;
TipManager.tipTextColor = "#ffffff";
TipManager.tipBackColor = "#111111";
TipManager.tipDelay = 200;

//# sourceMappingURL=TipManager.js.map
