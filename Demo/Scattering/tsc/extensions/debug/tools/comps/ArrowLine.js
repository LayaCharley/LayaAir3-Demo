import { Rect } from "./Rect";
import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Event } from "laya/events/Event";
import { ValueChanger } from "../ValueChanger";
export class ArrowLine extends Sprite {
    constructor(sign = "X") {
        super();
        this.lineLen = 160;
        this.arrowLen = 10;
        this.lenControl = new Rect();
        this.rotationControl = new Rect();
        this.sign = "Y";
        this.lenChanger = ValueChanger.create(this, "lineLen");
        this.lenControlXChanger = ValueChanger.create(this.lenControl, "x");
        this._isMoving = false;
        this.sign = sign;
        this.addChild(this.lenControl);
        this.addChild(this.rotationControl);
        this.lenControl.on(Event.MOUSE_DOWN, this, this.controlMouseDown);
        this.drawMe();
    }
    drawMe() {
        var g;
        g = this.graphics;
        g.clear();
        g.drawLine(0, 0, this.lineLen, 0, "#ffff00");
        g.drawLine(this.lineLen, 0, this.lineLen - this.arrowLen, -this.arrowLen, "#ff0000");
        g.drawLine(this.lineLen, 0, this.lineLen - this.arrowLen, this.arrowLen, "#ff0000");
        g.fillText(this.sign, 50, -5, "", "#ff0000", "left");
        if (this._isMoving && this._targetChanger) {
            g.fillText(this._targetChanger.key + ":" + this._targetChanger.value.toFixed(2), this.lineLen - 15, -25, "", "#ffff00", "center");
        }
        this.lenControl.posTo(this.lineLen - 15, 0);
        this.rotationControl.posTo(this.lineLen + 10, 0);
        this.size(this.arrowLen, this.lineLen);
    }
    set targetChanger(changer) {
        if (this._targetChanger) {
            this._targetChanger.dispose();
        }
        this._targetChanger = changer;
    }
    get targetChanger() {
        return this._targetChanger;
    }
    clearMoveEvents() {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.stageMouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.stageMouseUp);
    }
    controlMouseDown(e) {
        this.clearMoveEvents();
        this.lenControlXChanger.record();
        this.lenChanger.record();
        if (this.targetChanger) {
            this.targetChanger.record();
        }
        this._isMoving = true;
        Laya.stage.on(Event.MOUSE_MOVE, this, this.stageMouseMove);
        Laya.stage.on(Event.MOUSE_UP, this, this.stageMouseUp);
    }
    stageMouseMove(e) {
        this.lenControlXChanger.value = this.mouseX;
        this.lenChanger.showValueByScale(this.lenControlXChanger.scaleValue);
        if (this.targetChanger) {
            this.targetChanger.showValueByScale(this.lenControlXChanger.scaleValue);
        }
        this.drawMe();
    }
    stageMouseUp(e) {
        this._isMoving = false;
        this.noticeChange();
        this.clearMoveEvents();
        this.lenControlXChanger.recover();
        this.lenChanger.recover();
        this.drawMe();
    }
    noticeChange() {
        var dLen;
        dLen = this.lenChanger.dValue;
        console.log("lenChange:", dLen);
    }
}
