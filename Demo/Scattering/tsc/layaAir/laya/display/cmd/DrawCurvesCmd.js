import { Bezier } from "../../maths/Bezier";
import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawCurvesCmd {
    static create(x, y, points, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawCurvesCmd", DrawCurvesCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.points = points;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        return cmd;
    }
    recover() {
        this.points = null;
        this.lineColor = null;
        Pool.recover("DrawCurvesCmd", this);
    }
    run(context, gx, gy) {
        if (this.points)
            context.drawCurves(this.x + gx, this.y + gy, this.points, this.lineColor, this.lineWidth);
    }
    get cmdID() {
        return DrawCurvesCmd.ID;
    }
    getBoundPoints(sp) {
        return Bezier.I.getBezierPoints(this.points);
    }
}
DrawCurvesCmd.ID = "DrawCurves";
ClassUtils.regClass("DrawCurvesCmd", DrawCurvesCmd);

//# sourceMappingURL=DrawCurvesCmd.js.map
