import { Sprite } from "laya/display/Sprite";
export class AutoSizeRec extends Sprite {
    constructor(type) {
        super();
        this._color = "#ffffff";
    }
    set height(value) {
        super.height = value;
        this.changeSize();
    }
    set width(value) {
        super.width = value;
        this.changeSize();
    }
    setColor(color) {
        this._color = color;
        this.reRender();
    }
    changeSize() {
        this.reRender();
    }
    reRender() {
        var g = this.graphics;
        g.clear();
        g.drawRect(0, 0, this.width, this.height, this._color);
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
