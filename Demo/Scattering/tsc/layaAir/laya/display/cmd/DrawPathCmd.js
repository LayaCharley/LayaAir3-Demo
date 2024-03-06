import { ClassUtils } from "../../utils/ClassUtils";
import { Pool } from "../../utils/Pool";
export class DrawPathCmd {
    static create(x, y, paths, brush, pen) {
        var cmd = Pool.getItemByClass("DrawPathCmd", DrawPathCmd);
        cmd.x = x;
        cmd.y = y;
        cmd.paths = paths;
        cmd.brush = brush;
        cmd.pen = pen;
        return cmd;
    }
    recover() {
        this.paths = null;
        this.brush = null;
        this.pen = null;
        Pool.recover("DrawPathCmd", this);
    }
    run(context, gx, gy) {
        this.paths && context._drawPath(this.x + gx, this.y + gy, this.paths, this.brush, this.pen);
    }
    get cmdID() {
        return DrawPathCmd.ID;
    }
    getBoundPoints(sp) {
        let rst = _tempPoints;
        rst.length = 0;
        let paths = this.paths;
        let len = paths.length;
        for (let i = 0; i < len; i++) {
            let tCMD = paths[i];
            if (tCMD.length > 1) {
                rst.push(tCMD[1], tCMD[2]);
                if (tCMD.length > 3) {
                    rst.push(tCMD[3], tCMD[4]);
                }
            }
        }
        return rst;
    }
}
DrawPathCmd.ID = "DrawPath";
const _tempPoints = [];
ClassUtils.regClass("DrawPathCmd", DrawPathCmd);

//# sourceMappingURL=DrawPathCmd.js.map
