import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawLineCmd {
    constructor() {
        this.lineWidth = 0;
    }
    static create(fromX, fromY, toX, toY, lineColor, lineWidth) {
        var cmd = Pool.getItemByClass("DrawLineCmd", DrawLineCmd);
        cmd.fromX = fromX;
        cmd.fromY = fromY;
        cmd.toX = toX;
        cmd.toY = toY;
        cmd.lineColor = lineColor;
        cmd.lineWidth = lineWidth;
        return cmd;
    }
    recover() {
        Pool.recover("DrawLineCmd", this);
    }
    run(context, gx, gy) {
        let offset = (this.lineWidth < 1 || this.lineWidth % 2 === 0) ? 0 : 0.5;
        if (this.percent && context.sprite) {
            let w = context.sprite.width;
            let h = context.sprite.height;
            context._drawLine(gx, gy, this.fromX * w + offset, this.fromY * h + offset, this.toX * w + offset, this.toY * h + offset, this.lineColor, this.lineWidth, 0);
        }
        else
            context._drawLine(gx, gy, this.fromX + offset, this.fromY + offset, this.toX + offset, this.toY + offset, this.lineColor, this.lineWidth, 0);
    }
    get cmdID() {
        return DrawLineCmd.ID;
    }
    getBoundPoints(sp) {
        _tempPoints.length = 0;
        let lineWidth;
        lineWidth = this.lineWidth * 0.5;
        let fromX = this.fromX, fromY = this.fromY, toX = this.toX, toY = this.toY;
        if (this.percent) {
            fromX *= sp.width;
            fromY *= sp.height;
            toX *= sp.width;
            toY *= sp.height;
        }
        if (fromX == toX) {
            _tempPoints.push(fromX + lineWidth, fromY, toX + lineWidth, toY, fromX - lineWidth, fromY, toX - lineWidth, toY);
        }
        else if (fromY == toY) {
            _tempPoints.push(fromX, fromY + lineWidth, toX, toY + lineWidth, fromX, fromY - lineWidth, toX, toY - lineWidth);
        }
        else {
            _tempPoints.push(fromX, fromY, toX, toY);
        }
        return _tempPoints;
    }
}
DrawLineCmd.ID = "DrawLine";
const _tempPoints = [];
ClassUtils.regClass("DrawLineCmd", DrawLineCmd);

//# sourceMappingURL=DrawLineCmd.js.map
