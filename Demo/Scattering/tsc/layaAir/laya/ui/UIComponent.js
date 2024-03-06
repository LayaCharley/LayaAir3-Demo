import { Widget } from "../components/Widget";
import { UIEvent } from "./UIEvent";
import { UIUtils } from "./UIUtils";
import { Sprite } from "../display/Sprite";
import { Event } from "../events/Event";
import { ILaya } from "../../ILaya";
export class UIComponent extends Sprite {
    constructor(createChildren = true) {
        super();
        this._widget = Widget.EMPTY;
        if (createChildren) {
            this.preinitialize();
            this.createChildren();
            this.initialize();
        }
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._dataSource = null;
        this._toolTip = null;
    }
    preinitialize() {
    }
    createChildren() {
    }
    initialize() {
    }
    get_width() {
        if (this._isWidthSet)
            return this._width;
        return this.measureWidth();
    }
    measureWidth() {
        var max = 0;
        this.commitMeasure();
        for (var i = this.numChildren - 1; i > -1; i--) {
            var comp = this.getChildAt(i);
            if (comp._visible) {
                max = Math.max(comp._x + comp.width * comp.scaleX, max);
            }
        }
        return max;
    }
    commitMeasure() {
    }
    get_height() {
        if (this._isHeightSet)
            return this._height;
        return this.measureHeight();
    }
    measureHeight() {
        var max = 0;
        this.commitMeasure();
        for (var i = this.numChildren - 1; i > -1; i--) {
            var comp = this.getChildAt(i);
            if (comp._visible) {
                max = Math.max(comp._y + comp.height * comp.scaleY, max);
            }
        }
        return max;
    }
    get dataSource() {
        return this.get_dataSource();
    }
    get_dataSource() {
        return this._dataSource;
    }
    set dataSource(value) {
        this.set_dataSource(value);
    }
    set_dataSource(value) {
        this._dataSource = value;
        for (var prop in this._dataSource) {
            if (prop in this && !(typeof (this[prop]) == 'function')) {
                this[prop] = this._dataSource[prop];
            }
        }
    }
    get top() {
        return this.get_top();
    }
    get_top() {
        return this._widget.top;
    }
    set top(value) {
        this.set_top(value);
    }
    set_top(value) {
        if (value != this._widget.top) {
            this._getWidget().top = value;
        }
    }
    get bottom() {
        return this.get_bottom();
    }
    get_bottom() {
        return this._widget.bottom;
    }
    set bottom(value) {
        this.set_bottom(value);
    }
    set_bottom(value) {
        if (value != this._widget.bottom) {
            this._getWidget().bottom = value;
        }
    }
    get left() {
        return this._widget.left;
    }
    set left(value) {
        if (value != this._widget.left) {
            this._getWidget().left = value;
        }
    }
    get right() {
        return this._widget.right;
    }
    set right(value) {
        if (value != this._widget.right) {
            this._getWidget().right = value;
        }
    }
    get centerX() {
        return this._widget.centerX;
    }
    set centerX(value) {
        if (value != this._widget.centerX) {
            this._getWidget().centerX = value;
        }
    }
    get centerY() {
        return this._widget.centerY;
    }
    set centerY(value) {
        if (value != this._widget.centerY) {
            this._getWidget().centerY = value;
        }
    }
    _shouldRefreshLayout() {
        super._shouldRefreshLayout();
        this.callLater(this._sizeChanged);
    }
    _sizeChanged() {
        this.event(Event.RESIZE);
        if (this._widget !== Widget.EMPTY)
            this._widget.resetLayout();
    }
    get toolTip() {
        return this._toolTip;
    }
    set toolTip(value) {
        if (this._toolTip != value) {
            this._toolTip = value;
            if (value != null) {
                this.on(Event.MOUSE_OVER, this, this.onMouseOver);
                this.on(Event.MOUSE_OUT, this, this.onMouseOut);
            }
            else {
                this.off(Event.MOUSE_OVER, this, this.onMouseOver);
                this.off(Event.MOUSE_OUT, this, this.onMouseOut);
            }
        }
    }
    onMouseOver(e) {
        ILaya.stage.event(UIEvent.SHOW_TIP, this._toolTip);
    }
    onMouseOut(e) {
        ILaya.stage.event(UIEvent.HIDE_TIP, this._toolTip);
    }
    get gray() {
        return this._gray;
    }
    set gray(value) {
        if (value !== this._gray) {
            this._gray = value;
            UIUtils.gray(this, value);
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        if (value !== this._disabled) {
            this.gray = this._disabled = value;
            this.mouseEnabled = !value;
        }
    }
    _getWidget() {
        this._widget === Widget.EMPTY && (this._widget = this.addComponent(Widget));
        return this._widget;
    }
    onCompResize() {
        this._sizeChanged();
    }
    _childChanged(child = null) {
        this.callLater(this._sizeChanged);
        super._childChanged(child);
    }
    freshLayout() {
        if (this._widget != Widget.EMPTY) {
            this._widget.resetLayout();
        }
    }
}

//# sourceMappingURL=UIComponent.js.map
