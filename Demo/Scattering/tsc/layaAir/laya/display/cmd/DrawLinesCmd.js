import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawLinesCmd {
    constructor() {
        this.lineWidth = 0;
    }
    static create(x, y, points, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawLinesCmd", DrawLinesCmd);
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
        Pool.recover("DrawLinesCmd", this);
    }
    run(context, gx, gy) {
        let offset = (this.lineWidth < 1 || this.lineWidth % 2 === 0) ? 0 : 0.5;
        this.points && context._drawLines(this.x + offset + gx, this.y + offset + gy, this.points, this.lineColor, this.lineWidth, 0);
    }
    get cmdID() {
        return DrawLinesCmd.ID;
    }
}
DrawLinesCmd.ID = "DrawLines";
ClassUtils.regClass("DrawLinesCmd", DrawLinesCmd);

//# sourceMappingURL=DrawLinesCmd.js.map
