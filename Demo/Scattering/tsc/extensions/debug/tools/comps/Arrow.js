import { Sprite } from "laya/display/Sprite";
export class Arrow extends Sprite {
    constructor() {
        super();
        this.drawMe();
    }
    drawMe() {
        var g;
        g = this.graphics;
        g.clear();
        g.drawLine(0, 0, -1, -1, "#ff0000");
        g.drawLine(0, 0, 1, -1, "#ff0000");
    }
}
