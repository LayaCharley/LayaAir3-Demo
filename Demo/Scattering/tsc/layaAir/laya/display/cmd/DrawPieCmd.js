import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawPieCmd {
    constructor() {
        this.radius = 0;
        this.lineWidth = 0;
    }
    static create(x, y, radius, startAngle, endAngle, fillColor, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawPieCmd", DrawPieCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.radius = radius;
        cmd._startAngle = startAngle;
        cmd._endAngle = endAngle;
        cmd.fillColor = fillColor;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        return cmd;
    }
    recover() {
        this.fillColor = null;
        this.lineColor = null;
        Pool.recover("DrawPieCmd", this);
    }
    run(context, gx, gy) {
        let offset = (this.lineWidth >= 1 && this.lineColor) ? this.lineWidth / 2 : 0;
        let lineOffset = this.lineColor ? this.lineWidth : 0;
        context._drawPie(this.x + offset + gx, this.y + offset + gy, this.radius - lineOffset, this._startAngle, this._endAngle, this.fillColor, this.lineColor, this.lineWidth, 0);
    }
    get cmdID() {
        return DrawPieCmd.ID;
    }
    get startAngle() {
        return this._startAngle * 180 / Math.PI;
    }
    set startAngle(value) {
        this._startAngle = value * Math.PI / 180;
    }
    get endAngle() {
        return this._endAngle * 180 / Math.PI;
    }
    set endAngle(value) {
        this._endAngle = value * Math.PI / 180;
    }
    getBoundPoints(sp) {
        let rst = _tempPoints;
        _tempPoints.length = 0;
        let k = Math.PI / 180;
        let d1 = this.endAngle - this.startAngle;
        let x = this.x, y = this.y, radius = this.radius;
        if (d1 >= 360 || d1 <= -360) {
            rst.push(x - radius, y - radius);
            rst.push(x + radius, y - radius);
            rst.push(x + radius, y + radius);
            rst.push(x - radius, y + radius);
            return rst;
        }
        rst.push(x, y);
        var delta = d1 % 360;
        if (delta < 0)
            delta += 360;
        var end1 = this.startAngle + delta;
        var st = this.startAngle * k;
        var ed = end1 * k;
        rst.push(x + radius * Math.cos(st), y + radius * Math.sin(st));
        rst.push(x + radius * Math.cos(ed), y + radius * Math.sin(ed));
        var s1 = Math.ceil(this.startAngle / 90) * 90;
        var s2 = Math.floor(end1 / 90) * 90;
        for (var cs = s1; cs <= s2; cs += 90) {
            var csr = cs * k;
            rst.push(x + radius * Math.cos(csr), y + radius * Math.sin(csr));
        }
        return rst;
    }
}
DrawPieCmd.ID = "DrawPie";
const _tempPoints = [];
ClassUtils.regClass("DrawPieCmd", DrawPieCmd);

//# sourceMappingURL=DrawPieCmd.js.map
