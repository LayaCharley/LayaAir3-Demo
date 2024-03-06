import { Laya } from "Laya";
import { Event } from "laya/events/Event";
import { Point } from "laya/maths/Point";
export class SimpleResizer {
    constructor() {
    }
    static setResizeAble(clickItem, tar, minWidth = 150, minHeight = 150) {
        clickItem.on(Event.MOUSE_DOWN, null, SimpleResizer.onMouseDown, [tar, minWidth, minHeight]);
    }
    static onMouseDown(tar, minWidth, minHeight, e) {
        SimpleResizer.clearEvents();
        if (!tar)
            return;
        SimpleResizer.preMousePoint.setTo(Laya.stage.mouseX, Laya.stage.mouseY);
        SimpleResizer.preTarSize.setTo(tar.width, tar.height);
        SimpleResizer.preScale.setTo(1, 1);
        var rTar;
        rTar = tar;
        while (rTar && rTar != Laya.stage) {
            SimpleResizer.preScale.x *= rTar.scaleX;
            SimpleResizer.preScale.y *= rTar.scaleY;
            rTar = rTar.parent;
        }
        Laya.stage.on(Event.MOUSE_UP, null, SimpleResizer.onMouseMoveEnd);
        Laya.timer.loop(100, null, SimpleResizer.onMouseMoving, [tar, minWidth, minHeight]);
    }
    static onMouseMoving(tar, minWidth, minHeight, e) {
        var tWidth = (Laya.stage.mouseX - SimpleResizer.preMousePoint.x) / SimpleResizer.preScale.x + SimpleResizer.preTarSize.x;
        var tHeight = (Laya.stage.mouseY - SimpleResizer.preMousePoint.y) / SimpleResizer.preScale.y + SimpleResizer.preTarSize.y;
        tar.width = tWidth > minWidth ? tWidth : minWidth;
        tar.height = tHeight > minHeight ? tHeight : minHeight;
    }
    static onMouseMoveEnd(e) {
        SimpleResizer.clearEvents();
    }
    static clearEvents() {
        Laya.timer.clear(null, SimpleResizer.onMouseMoving);
        Laya.stage.off(Event.MOUSE_UP, null, SimpleResizer.onMouseMoveEnd);
    }
}
SimpleResizer.preMousePoint = new Point();
SimpleResizer.preTarSize = new Point();
SimpleResizer.preScale = new Point();
