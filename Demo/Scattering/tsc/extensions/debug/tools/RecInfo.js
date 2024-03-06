import { Point } from "laya/maths/Point";
export class RecInfo {
    constructor() {
        this.oX = 0;
        this.oY = 0;
        this.hX = 1;
        this.hY = 0;
        this.vX = 0;
        this.vY = 1;
    }
    get x() {
        return this.oX;
    }
    get y() {
        return this.oY;
    }
    get width() {
        return Math.sqrt((this.hX - this.oX) * (this.hX - this.oX) + (this.hY - this.oY) * (this.hY - this.oY));
    }
    get height() {
        return Math.sqrt((this.vX - this.oX) * (this.vX - this.oX) + (this.vY - this.oY) * (this.vY - this.oY));
    }
    get rotation() {
        return this.rotationRad / Math.PI * 180;
    }
    get rotationRad() {
        var dx = this.hX - this.oX;
        var dy = this.hY - this.oY;
        return Math.atan2(dy, dx);
    }
    get rotationV() {
        return this.rotationRadV / Math.PI * 180;
    }
    get rotationRadV() {
        var dx = this.vX - this.oX;
        var dy = this.vY - this.oY;
        return Math.atan2(dy, dx);
    }
    initByPoints(oPoint, ePoint, vPoint) {
        this.oX = oPoint.x;
        this.oY = oPoint.y;
        this.hX = ePoint.x;
        this.hY = ePoint.y;
        this.vX = vPoint.x;
        this.vY = vPoint.y;
    }
    static createByPoints(oPoint, ePoint, vPoint) {
        var rst;
        rst = new RecInfo();
        rst.initByPoints(oPoint, ePoint, vPoint);
        return rst;
    }
    static getGlobalPoints(sprite, x, y) {
        return sprite.localToGlobal(new Point(x, y));
    }
    static getGlobalRecInfo(sprite, x0 = 0, y0 = 0, x1 = 1, y1 = 0, x2 = 0, y2 = 1) {
        return RecInfo.createByPoints(RecInfo.getGlobalPoints(sprite, x0, y0), RecInfo.getGlobalPoints(sprite, x1, y1), RecInfo.getGlobalPoints(sprite, x2, y2));
    }
}
