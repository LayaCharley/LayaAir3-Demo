import { Rectangle } from "../../maths/Rectangle";
import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawRectCmd {
    constructor() {
        this.lineWidth = 0;
    }
    static create(x, y, width, height, fillColor, lineColor, lineWidth, percent) {
        var cmd = Pool.getItemByClass("DrawRectCmd", DrawRectCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.width = width;
        cmd.height = height;
        cmd.fillColor = fillColor;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        cmd.percent = percent;
        return cmd;
    }
    recover() {
        this.fillColor = null;
        this.lineColor = null;
        Pool.recover("DrawRectCmd", this);
    }
    run(context, gx, gy) {
        let offset = (this.lineWidth >= 1 && this.lineColor) ? this.lineWidth / 2 : 0;
        let lineOffset = this.lineColor ? this.lineWidth : 0;
        if (this.percent && context.sprite) {
            let w = context.sprite.width;
            let h = context.sprite.height;
            context.drawRect(this.x * w + offset + gx, this.y * h + offset + gy, this.width * w - lineOffset, this.height * h - lineOffset, this.fillColor, this.lineColor, this.lineWidth);
        }
        else
            context.drawRect(this.x + offset + gx, this.y + offset + gy, this.width - lineOffset, this.height - lineOffset, this.fillColor, this.lineColor, this.lineWidth);
    }
    get cmdID() {
        return DrawRectCmd.ID;
    }
    getBoundPoints(sp) {
        return Rectangle._getBoundPointS(this.x, this.y, this.width, this.height, this.percent ? sp : null);
    }
}
DrawRectCmd.ID = "DrawRect";
ClassUtils.regClass("DrawRectCmd", DrawRectCmd);

//# sourceMappingURL=DrawRectCmd.js.map
