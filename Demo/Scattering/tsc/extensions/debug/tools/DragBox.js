import { Sprite } from "laya/display/Sprite";
import { Point } from "laya/maths/Point";
import { Event } from "laya/events/Event";
import { Laya } from "Laya";
export class DragBox extends Sprite {
    constructor(type) {
        super();
        this._left = this.drawBlock();
        this._right = this.drawBlock();
        this._top = this.drawBlock();
        this._bottom = this.drawBlock();
        this._topLeft = this.drawBlock();
        this._topRight = this.drawBlock();
        this._bottomLeft = this.drawBlock();
        this._bottomRight = this.drawBlock();
        this._lastPoint = new Point();
        this._type = type = 3;
        this.addChild(this._box = this.drawBorder(0, 0, 0xff0000));
        if (type == 1 || type == 3) {
            this.addChild(this._left);
            this.addChild(this._right);
        }
        if (type == 2 || type == 3) {
            this.addChild(this._top);
            this.addChild(this._bottom);
        }
        if (type == 3) {
            this.addChild(this._topLeft);
            this.addChild(this._topRight);
            this.addChild(this._bottomLeft);
            this.addChild(this._bottomRight);
        }
        this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
        this.mouseThrough = true;
    }
    onMouseDown(e) {
        this._currDir = e.target;
        if (e.shiftKey) {
            this.initFixScale();
        }
        if (this._currDir != this) {
            this._lastPoint.x = Laya.stage.mouseX;
            this._lastPoint.y = Laya.stage.mouseY;
            Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
            Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
            e.stopPropagation();
        }
    }
    onMouseUp(e) {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
        Laya.stage.off(Event.MOUSE_UP, this, this.onMouseUp);
    }
    initFixScale() {
        this.fixScale = this._target.height / this._target.width;
    }
    onMouseMove(e) {
        var scale = 1;
        var tx = (Laya.stage.mouseX - this._lastPoint.x) / scale;
        var ty = (Laya.stage.mouseY - this._lastPoint.y) / scale;
        var sameScale = false;
        var adptX;
        var adptY;
        if (e.shiftKey) {
            if (this.fixScale < 0)
                this.initFixScale();
            adptY = tx * this.fixScale;
            adptX = ty / this.fixScale;
            sameScale = true;
            switch (this._currDir) {
                case this._topLeft:
                case this._bottomLeft:
                    this._currDir = this._left;
                    break;
                case this._topRight:
                case this._bottomRight:
                    this._currDir = this._right;
                    break;
            }
        }
        if (tx != 0 || ty != 0) {
            this._lastPoint.x += tx * scale;
            this._lastPoint.y += ty * scale;
            var tw = tx / this._target.scaleX;
            var th = ty / this._target.scaleY;
            if (this._currDir == this._left) {
                this._target.x += tx;
                this._target.width -= tw;
                if (sameScale) {
                    this._target.height = this._target.width * this.fixScale;
                }
            }
            else if (this._currDir == this._right) {
                this._target.width += tw;
                if (sameScale) {
                    this._target.height = this._target.width * this.fixScale;
                }
            }
            else if (this._currDir == this._top) {
                this._target.y += ty;
                this._target.height -= th;
                if (sameScale) {
                    this._target.width = this._target.height / this.fixScale;
                }
            }
            else if (this._currDir == this._bottom) {
                this._target.height += th;
                if (sameScale) {
                    this._target.width = this._target.height / this.fixScale;
                }
            }
            else if (this._currDir == this._topLeft) {
                this._target.x += tx;
                this._target.y += ty;
                this._target.width -= tw;
                this._target.height -= th;
            }
            else if (this._currDir == this._topRight) {
                this._target.y += ty;
                this._target.width += tw;
                this._target.height -= th;
            }
            else if (this._currDir == this._bottomLeft) {
                this._target.x += tx;
                this._target.width -= tw;
                this._target.height += th;
            }
            else if (this._currDir == this._bottomRight) {
                this._target.width += tw;
                this._target.height += th;
            }
            if (this._target.width < 1) {
                this._target.width = 1;
            }
            if (this._target.height < 1) {
                this._target.height = 1;
            }
            this._target.width = Math.round(this._target.width);
            this._target.x = Math.round(this._target.x);
            this._target.y = Math.round(this._target.y);
            this._target.height = Math.round(this._target.height);
            this.refresh();
        }
    }
    drawBorder(width, height, color, alpha = 1) {
        var box = new Sprite();
        var g = box.graphics;
        g.clear();
        g.drawRect(0, 0, width, height, null, "#" + color);
        return box;
    }
    drawBlock() {
        var box = new Sprite();
        var g = box.graphics;
        g.clear();
        box.width = DragBox.BLOCK_WIDTH;
        box.height = DragBox.BLOCK_WIDTH;
        g.drawRect(-DragBox.BLOCK_WIDTH * 0.5, -DragBox.BLOCK_WIDTH * 0.5, DragBox.BLOCK_WIDTH, DragBox.BLOCK_WIDTH, "#ffffff", "#ff0000", 1);
        box.mouseEnabled = true;
        box.mouseThrough = true;
        return box;
    }
    setTarget(target) {
        this._target = target;
        this.refresh();
    }
    refresh() {
        this.changePoint();
        this.changeSize();
    }
    changePoint() {
        var p = this._target.localToGlobal(new Point());
        var np = this.parent.globalToLocal(p);
        this.x = np.x;
        this.y = np.y;
    }
    changeSize() {
        var width = this._target.width * this._target.scaleX;
        var height = this._target.height * this._target.scaleY;
        console.log("change size");
        this.rotation = this._target.rotation;
        if (this._box.width != width || this._box.height != height) {
            this._box.graphics.clear();
            this._box.graphics.drawRect(0, 0, Math.abs(width), Math.abs(height), null, "#ff0000");
            this._box.size(width, height);
            this.size(width, height);
            this._box.scaleX = Math.abs(this._box.scaleX) * (this._target.scaleX > 0 ? 1 : -1);
            this._box.scaleY = Math.abs(this._box.scaleY) * (this._target.scaleY > 0 ? 1 : -1);
            this._left.x = 0;
            this._left.y = height * 0.5;
            this._right.x = width;
            this._right.y = height * 0.5;
            this._top.x = width * 0.5;
            this._top.y = 0;
            this._bottom.x = width * 0.5;
            this._bottom.y = height;
            this._topLeft.x = this._topLeft.y = 0;
            this._topRight.x = width;
            this._topRight.y = 0;
            this._bottomLeft.x = 0;
            this._bottomLeft.y = height;
            this._bottomRight.x = width;
            this._bottomRight.y = height;
        }
    }
}
DragBox.BLOCK_WIDTH = 6;
