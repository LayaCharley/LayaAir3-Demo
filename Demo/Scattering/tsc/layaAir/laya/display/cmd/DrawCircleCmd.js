import { Rectangle } from "../../maths/Rectangle";
import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawCircleCmd {
    constructor() {
        this.lineWidth = 0;
    }
    static create(x, y, radius, fillColor, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawCircleCmd", DrawCircleCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.radius = radius;
        cmd.fillColor = fillColor;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        return cmd;
    }
    recover() {
        this.fillColor = null;
        this.lineColor = null;
        Pool.recover("DrawCircleCmd", this);
    }
    run(context, gx, gy) {
        let offset = (this.lineWidth >= 1 && this.lineColor) ? this.lineWidth / 2 : 0;
        if (this.percent && context.sprite) {
            let w = context.sprite.width;
            let h = context.sprite.height;
            context._drawCircle(this.x * w + gx, this.y * h + gy, this.radius * Math.min(w, h) - offset, this.fillColor, this.lineColor, this.lineWidth, 0);
        }
        else
            context._drawCircle(this.x + gx, this.y + gy, this.radius - offset, this.fillColor, this.lineColor, this.lineWidth, 0);
    }
    get cmdID() {
        return DrawCircleCmd.ID;
    }
    getBoundPoints(sp) {
        return Rectangle._getBoundPointS(this.x - this.radius, this.y - this.radius, this.radius + this.radius, this.radius + this.radius, this.percent ? sp : null);
    }
}
DrawCircleCmd.ID = "DrawCircle";
ClassUtils.regClass("DrawCircleCmd", DrawCircleCmd);

//# sourceMappingURL=DrawCircleCmd.js.map
