import { Laya } from "Laya";
import { Notice } from "./Notice";
import { DebugInfoLayer } from "../view/nodeInfo/DebugInfoLayer";
import { DButton } from "./debugUI/DButton";
import { Event } from "laya/events/Event";
import { Render } from "laya/renders/Render";
import { Matrix } from "laya/maths/Matrix";
import { Point } from "laya/maths/Point";
import { Rectangle } from "laya/maths/Rectangle";
import { DebugTool } from "../DebugTool";
export class DisplayHook {
    constructor() {
        this._matrix = new Matrix();
        this._point = new Point();
        this._rect = new Rectangle();
        this._event = new Event();
        this.isGetting = false;
        this._stage = Laya.stage;
        this.init(Render.context.canvas);
    }
    static initMe() {
        if (!DisplayHook.instance) {
            DisplayHook.instance = new DisplayHook();
            DisplayHook.selectNodeUnderMouse = DebugTool.selectNodeUnderMouse;
            DebugTool.selectNodeUnderMouse = () => {
                DisplayHook.instance.selectDisUnderMouse();
                DisplayHook.selectNodeUnderMouse();
            };
        }
    }
    init(canvas) {
        if (window.navigator.msPointerEnabled) {
            canvas.style['-ms-content-zooming'] = 'none';
            canvas.style['-ms-touch-action'] = 'none';
        }
        var _this = this;
        document.addEventListener('mousedown', (e) => {
            this._event._stoped = false;
            DisplayHook.isFirst = true;
            _this.check(_this._stage, e.offsetX, e.offsetY, _this.onMouseDown, true, false);
        }, true);
        document.addEventListener('touchstart', (e) => {
            this._event._stoped = false;
            DisplayHook.isFirst = true;
            var touches = e.changedTouches;
            for (var i = 0, n = touches.length; i < n; i++) {
                var touch = touches[i];
                initEvent(touch, e);
                _this.check(_this._stage, _this.mouseX, _this.mouseY, _this.onMouseDown, true, false);
            }
        }, true);
        function initEvent(e, event = null) {
            _this._event._stoped = false;
            _this._target = null;
            if (e.offsetX) {
                _this.mouseX = e.offsetX;
                _this.mouseY = e.offsetY;
            }
            else {
                _this.mouseX = e.clientX - Laya.stage.offset.x;
                _this.mouseY = e.clientY - Laya.stage.offset.y;
            }
        }
    }
    onMouseMove(ele, hit) {
        this.sendEvent(ele, Event.MOUSE_MOVE);
        return;
        if (hit && ele != this._stage && ele !== this._target) {
            if (this._target) {
                if (this._target.$_MOUSEOVER) {
                    this._target.$_MOUSEOVER = false;
                    this._target.event(Event.MOUSE_OUT);
                }
            }
            this._target = ele;
            if (!ele.$_MOUSEOVER) {
                ele.$_MOUSEOVER = true;
                this.sendEvent(ele, Event.MOUSE_OVER);
            }
        }
        else if (!hit && this._target && ele === this._target) {
            this._target = null;
            if (ele.$_MOUSEOVER) {
                ele.$_MOUSEOVER = false;
                this.sendEvent(ele, Event.MOUSE_OUT);
            }
        }
    }
    onMouseUp(ele, hit) {
        hit && this.sendEvent(ele, Event.MOUSE_UP);
    }
    onMouseDown(ele, hit) {
        if (hit) {
            ele.$_MOUSEDOWN = true;
            this.sendEvent(ele, Event.MOUSE_DOWN);
        }
    }
    sendEvent(ele, type) {
        if (!this._event._stoped) {
            ele.event(type, this._event.setTo(type, ele, ele));
            if (type === Event.MOUSE_UP && ele.$_MOUSEDOWN) {
                ele.$_MOUSEDOWN = false;
                ele.event(Event.CLICK, this._event.setTo(Event.CLICK, ele, ele));
            }
        }
    }
    selectDisUnderMouse() {
        DisplayHook.isFirst = true;
        this.check(Laya.stage, Laya.stage.mouseX, Laya.stage.mouseY, null, true, false);
    }
    getDisUnderMouse() {
        this.isGetting = true;
        DisplayHook.isFirst = true;
        DebugTool.target = null;
        this.check(Laya.stage, Laya.stage.mouseX, Laya.stage.mouseY, null, true, false);
        this.isGetting = false;
        return DebugTool.target;
    }
    check(sp, mouseX, mouseY, callBack, hitTest, mouseEnable) {
        if (sp == DebugTool.debugLayer)
            return false;
        if (sp == DebugInfoLayer.I)
            return false;
        if (this.isGetting && sp == DebugInfoLayer.I)
            return false;
        if (!sp.visible || sp.getSelfBounds().width <= 0)
            return false;
        var isHit = false;
        mouseEnable = true;
        if (mouseEnable) {
            var graphicHit = false;
            if (hitTest) {
                this._rect = sp.getBounds();
                isHit = this._rect.contains(mouseX, mouseY);
                this._point.setTo(mouseX, mouseY);
                sp.fromParentPoint(this._point);
                mouseX = this._point.x;
                mouseY = this._point.y;
            }
            if (isHit) {
                var flag = false;
                for (var i = sp._children.length - 1; i > -1; i--) {
                    var child = sp._children[i];
                    (flag = this.check(child, mouseX, mouseY, callBack, hitTest, true));
                    if (flag)
                        break;
                }
                graphicHit = sp.getGraphicBounds().contains(mouseX, mouseY);
                isHit = flag || graphicHit;
                if (isHit && !flag && DisplayHook.isFirst) {
                    DisplayHook.isFirst = false;
                    if (!(sp instanceof DButton)) {
                        DebugTool.target = sp;
                        if (!this.isGetting) {
                            DebugTool.autoWork();
                            Notice.notify(DisplayHook.ITEM_CLICKED, sp);
                        }
                    }
                }
            }
        }
        return isHit;
    }
}
DisplayHook.ITEM_CLICKED = "ItemClicked";
DisplayHook.isFirst = false;
