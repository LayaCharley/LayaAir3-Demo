import { LayaEnv } from "../../LayaEnv";
import { Graphics } from "../display/Graphics";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { ClassUtils } from "./ClassUtils";
const _rect = new Rectangle();
const _ptPoint = new Point();
export class HitArea {
    contains(x, y, sp) {
        if (!HitArea._isHitGraphic(x, y, sp, this._hit))
            return false;
        return !HitArea._isHitGraphic(x, y, sp, this._unHit);
    }
    static _isHitGraphic(x, y, sp, graphic) {
        if (!graphic)
            return false;
        let cmds = graphic.cmds;
        if (cmds.length == 0)
            return false;
        let len = cmds.length;
        for (let i = 0; i < len; i++) {
            let cmd = cmds[i];
            if (!cmd)
                continue;
            switch (cmd.cmdID) {
                case "Translate":
                    x -= cmd.tx;
                    y -= cmd.ty;
            }
            if (HitArea._isHitCmd(x, y, sp, cmd))
                return true;
        }
        return false;
    }
    static _isHitCmd(x, y, sp, cmd) {
        if (!cmd)
            return false;
        var rst = false;
        switch (cmd.cmdID) {
            case "DrawRect":
                if (cmd.percent)
                    _rect.setTo(cmd.x * sp.width, cmd.y * sp.height, cmd.width * sp.width, cmd.height * sp.height);
                else
                    _rect.setTo(cmd.x, cmd.y, cmd.width, cmd.height);
                rst = _rect.contains(x, y);
                break;
            case "DrawCircle":
                let r = cmd.radius;
                var d;
                if (cmd.percent) {
                    x -= cmd.x * sp.width;
                    y -= cmd.y * sp.height;
                    r *= sp.width;
                }
                else {
                    x -= cmd.x;
                    y -= cmd.y;
                }
                d = x * x + y * y;
                rst = d < r * r;
                break;
            case "DrawPoly":
                x -= cmd.x;
                y -= cmd.y;
                rst = HitArea._ptInPolygon(x, y, cmd.points);
                break;
        }
        return rst;
    }
    static _ptInPolygon(x, y, areaPoints) {
        var p = _ptPoint;
        p.setTo(x, y);
        var nCross = 0;
        var p1x, p1y, p2x, p2y;
        var len;
        len = areaPoints.length;
        for (var i = 0; i < len; i += 2) {
            p1x = areaPoints[i];
            p1y = areaPoints[i + 1];
            p2x = areaPoints[(i + 2) % len];
            p2y = areaPoints[(i + 3) % len];
            if (p1y == p2y)
                continue;
            if (p.y < Math.min(p1y, p2y))
                continue;
            if (p.y >= Math.max(p1y, p2y))
                continue;
            var tx = (p.y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x;
            if (tx > p.x)
                nCross++;
        }
        return (nCross % 2 == 1);
    }
    get hit() {
        if (!this._hit)
            this._hit = new Graphics();
        return this._hit;
    }
    set hit(value) {
        this._hit = value;
    }
    get unHit() {
        if (!this._unHit)
            this._unHit = new Graphics();
        return this._unHit;
    }
    set unHit(value) {
        this._unHit = value;
    }
    onAfterDeserialize() {
        if (LayaEnv.isPlaying) {
            if (this._hitCmds) {
                this.hit.cmds = this._hitCmds;
                delete this._hitCmds;
            }
            if (this._unHitCmds) {
                this.unHit.cmds = this._unHitCmds;
                delete this._unHitCmds;
            }
        }
    }
}
ClassUtils.regClass("HitArea", HitArea);

//# sourceMappingURL=HitArea.js.map
