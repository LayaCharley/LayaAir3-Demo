import { Sprite } from "laya/display/Sprite";
export class Rect extends Sprite {
    constructor() {
        super();
        this.recWidth = 10;
        this.drawMe();
    }
    drawMe() {
        var g;
        g = this.graphics;
        g.clear();
        g.drawRect(0, 0, this.recWidth, this.recWidth, "#22ff22");
        this.size(this.recWidth, this.recWidth);
    }
    posTo(x, y) {
        this.x = x - this.recWidth * 0.5;
        this.y = y - this.recWidth * 0.5;
    }
}
