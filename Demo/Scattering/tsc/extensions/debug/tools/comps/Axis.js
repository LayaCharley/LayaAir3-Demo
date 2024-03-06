import { ArrowLine } from "./ArrowLine";
import { Rect } from "./Rect";
import { Laya } from "Laya";
import { Sprite } from "laya/display/Sprite";
import { Event } from "laya/events/Event";
import { MathUtil } from "laya/maths/MathUtil";
import { Point } from "laya/maths/Point";
import { DisControlTool } from "../DisControlTool";
import { ValueChanger } from "../ValueChanger";
export class Axis extends Sprite {
    constructor() {
        super();
        this.xAxis = new ArrowLine("X");
        this.yAxis = new ArrowLine("Y");
        this.controlBox = new Rect();
        this._lenType = [["width", "height"],
            ["scaleX", "scaleY"]];
        this._type = 1;
        this._point = new Point();
        this.oPoint = new Point();
        this.myRotationChanger = ValueChanger.create(this, "rotation");
        this.targetRotationChanger = ValueChanger.create(null, "rotation");
        this.stageMouseRotationChanger = new ValueChanger();
        this.mouseEnabled = true;
        this.size(1, 1);
        this.initMe();
        this.xAxis.rotationControl.on(Event.MOUSE_DOWN, this, this.controlMouseDown);
        this.yAxis.rotationControl.on(Event.MOUSE_DOWN, this, this.controlMouseDown);
        this.controlBox.on(Event.MOUSE_DOWN, this, this.controlBoxMouseDown);
        this.on(Event.DRAG_MOVE, this, this.dragging);
    }
    set target(tar) {
        this._target = tar;
        this.updateChanges();
    }
    updateChanges() {
        if (this._target) {
            var params;
            params = this._lenType[this._type];
            this.xAxis.targetChanger = ValueChanger.create(this._target, params[0]);
            this.yAxis.targetChanger = ValueChanger.create(this._target, params[1]);
        }
    }
    set type(lenType) {
        this._type = lenType;
        this.updateChanges();
    }
    get type() {
        return this._type;
    }
    switchType() {
        this._type++;
        this._type = this._type % this._lenType.length;
        this.type = this._type;
    }
    controlBoxMouseDown(e) {
        this.startDrag();
    }
    dragging() {
        if (this._target) {
            this._point.setTo(this.x, this.y);
            DisControlTool.transPoint(this.parent, this._target.parent, this._point);
            this._target.pos(this._point.x, this._point.y);
        }
    }
    get target() {
        return this._target;
    }
    initMe() {
        this.addChild(this.xAxis);
        this.addChild(this.yAxis);
        this.yAxis.rotation = 90;
        this.addChild(this.controlBox);
        this.controlBox.posTo(0, 0);
    }
    clearMoveEvents() {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.stageMouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.stageMouseUp);
    }
    controlMouseDown(e) {
        this.targetRotationChanger.target = this.target;
        this.clearMoveEvents();
        this.oPoint.setTo(0, 0);
        this.myRotationChanger.record();
        this.oPoint = this.localToGlobal(this.oPoint);
        this.stageMouseRotationChanger.value = this.getStageMouseRatation();
        this.stageMouseRotationChanger.record();
        this.targetRotationChanger.record();
        Laya.stage.on(Event.MOUSE_MOVE, this, this.stageMouseMove);
        Laya.stage.on(Event.MOUSE_UP, this, this.stageMouseUp);
    }
    getStageMouseRatation() {
        return MathUtil.getRotation(this.oPoint.x, this.oPoint.y, Laya.stage.mouseX, Laya.stage.mouseY);
    }
    stageMouseMove(e) {
        this.stageMouseRotationChanger.value = this.getStageMouseRatation();
        var dRotation;
        dRotation = -this.stageMouseRotationChanger.dValue;
        if (this.target) {
            this.targetRotationChanger.showValueByAdd(dRotation);
        }
        else {
            this.myRotationChanger.showValueByAdd(dRotation);
        }
    }
    stageMouseUp(e) {
        this.noticeChange();
        this.clearMoveEvents();
    }
    noticeChange() {
        console.log("rotate:", -this.stageMouseRotationChanger.dValue);
    }
}
