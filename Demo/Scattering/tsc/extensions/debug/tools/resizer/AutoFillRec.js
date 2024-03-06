import { Sprite } from "laya/display/Sprite";
export class AutoFillRec extends Sprite {
    constructor(type) {
        super();
    }
    set width(value) {
        super.width = value;
        this.changeSize();
    }
    set height(value) {
        super.height = value;
        this.changeSize();
    }
    changeSize() {
        var g = this.graphics;
        g.clear();
        g.drawRect(0, 0, this.width, this.height, "#33c5f5");
    }
    record() {
        this.preX = this.x;
        this.preY = this.y;
    }
    getDx() {
        return this.x - this.preX;
    }
    getDy() {
        return this.y - this.preY;
    }
}
