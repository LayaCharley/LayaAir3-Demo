import { Component } from "./Component";
import { HideFlags } from "../Const";
import { Event } from "../events/Event";
export class Widget extends Component {
    constructor() {
        super();
        this._top = null;
        this._bottom = null;
        this._left = null;
        this._right = null;
        this._centerX = null;
        this._centerY = null;
        this.runInEditor = true;
        this.hideFlags |= HideFlags.HideAndDontSave;
    }
    onReset() {
        this._top = this._bottom = this._left = this._right = this._centerX = this._centerY = null;
    }
    _onEnable() {
        if (this.owner.parent)
            this._onAdded();
        else
            this.owner.once(Event.ADDED, this, this._onAdded);
    }
    _onDisable() {
        this.owner.off(Event.ADDED, this, this._onAdded);
        if (this.owner.parent)
            this.owner.parent.off(Event.RESIZE, this, this._onParentResize);
    }
    _onAdded() {
        if (this.owner.parent)
            this.owner.parent.on(Event.RESIZE, this, this._onParentResize);
        this.resetLayoutX();
        this.resetLayoutY();
    }
    _onParentResize() {
        var flagX = this.resetLayoutX();
        var flagY = this.resetLayoutY();
        if (flagX || flagY)
            this.owner.event(Event.RESIZE);
    }
    resetLayoutX() {
        var owner = this.owner;
        if (!owner)
            return false;
        var parent = owner.parent;
        if (parent) {
            if (this._centerX != null) {
                owner.x = Math.round((parent.width - owner.displayWidth) * 0.5 + this._centerX + owner.pivotX * owner.scaleX);
            }
            else if (this._left != null) {
                owner.x = Math.round(this._left + owner.pivotX * owner.scaleX);
                if (this._right != null) {
                    if (!parent._width)
                        return false;
                    var temp = (parent._width - this._left - this._right) / (owner.scaleX || 0.01);
                    if (temp != owner._width) {
                        owner.width = temp;
                        return true;
                    }
                }
            }
            else if (this._right != null) {
                owner.x = Math.round(parent.width - owner.displayWidth - this._right + owner.pivotX * owner.scaleX);
            }
        }
        return false;
    }
    resetLayoutY() {
        var owner = this.owner;
        if (!owner)
            return false;
        var parent = owner.parent;
        if (parent) {
            if (this._centerY != null) {
                owner.y = Math.round((parent.height - owner.displayHeight) * 0.5 + this._centerY + owner.pivotY * owner.scaleY);
            }
            else if (this._top != null) {
                owner.y = Math.round(this._top + owner.pivotY * owner.scaleY);
                if (this._bottom != null) {
                    if (!parent._height)
                        return false;
                    var temp = (parent._height - this._top - this._bottom) / (owner.scaleY || 0.01);
                    if (temp != owner._height) {
                        owner.height = temp;
                        return true;
                    }
                }
            }
            else if (this._bottom != null) {
                owner.y = Math.round(parent.height - owner.displayHeight - this._bottom + owner.pivotY * owner.scaleY);
            }
        }
        return false;
    }
    resetLayout() {
        if (this.owner) {
            this.resetLayoutX();
            this.resetLayoutY();
        }
    }
    get top() {
        return this._top;
    }
    set top(value) {
        if (isNaN(value))
            value = null;
        if (this._top != value) {
            this._top = value;
            this.resetLayoutY();
        }
    }
    get bottom() {
        return this._bottom;
    }
    set bottom(value) {
        if (isNaN(value))
            value = null;
        if (this._bottom != value) {
            this._bottom = value;
            this.resetLayoutY();
        }
    }
    get left() {
        return this._left;
    }
    set left(value) {
        if (isNaN(value))
            value = null;
        if (this._left != value) {
            this._left = value;
            this.resetLayoutX();
        }
    }
    get right() {
        return this._right;
    }
    set right(value) {
        if (isNaN(value))
            value = null;
        if (this._right != value) {
            this._right = value;
            this.resetLayoutX();
        }
    }
    get centerX() {
        return this._centerX;
    }
    set centerX(value) {
        if (isNaN(value))
            value = null;
        if (this._centerX != value) {
            this._centerX = value;
            this.resetLayoutX();
        }
    }
    get centerY() {
        return this._centerY;
    }
    set centerY(value) {
        if (isNaN(value))
            value = null;
        if (this._centerY != value) {
            this._centerY = value;
            this.resetLayoutY();
        }
    }
}
Widget.EMPTY = null;
Widget.EMPTY = new Widget();

//# sourceMappingURL=Widget.js.map
