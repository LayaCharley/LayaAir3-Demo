import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawPolyCmd {
    static create(x, y, points, fillColor, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawPolyCmd", DrawPolyCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.points = points;
        cmd.fillColor = fillColor;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        return cmd;
    }
    recover() {
        this.points = null;
        this.fillColor = null;
        this.lineColor = null;
        Pool.recover("DrawPolyCmd", this);
    }
    run(context, gx, gy) {
        let isConvexPolygon = this.points.length <= 6;
        let offset = (this.lineWidth >= 1 && this.lineColor) ? (this.lineWidth % 2 === 0 ? 0 : 0.5) : 0;
        this.points && context._drawPoly(this.x + offset + gx, this.y + offset + gy, this.points, this.fillColor, this.lineColor, this.lineWidth, isConvexPolygon, 0);
    }
    get cmdID() {
        return DrawPolyCmd.ID;
    }
}
DrawPolyCmd.ID = "DrawPoly";
ClassUtils.regClass("DrawPolyCmd", DrawPolyCmd);

//# sourceMappingURL=DrawPolyCmd.js.map
