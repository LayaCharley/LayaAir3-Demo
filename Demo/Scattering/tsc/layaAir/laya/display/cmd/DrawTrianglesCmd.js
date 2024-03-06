import { ClassUtils } from "../../utils/ClassUtils";
import { ColorUtils } from "../../utils/ColorUtils";
import { Pool } from "../../utils/Pool";
export class DrawTrianglesCmd {
    static create(texture, x, y, vertices, uvs, indices, matrix, alpha, color, blendMode) {
        var cmd = Pool.getItemByClass("DrawTrianglesCmd", DrawTrianglesCmd);
        cmd.texture = texture;
        cmd.x = x;
        cmd.y = y;
        cmd.vertices = vertices;
        cmd.uvs = uvs;
        cmd.indices = indices;
        cmd.matrix = matrix;
        cmd.alpha = alpha;
        cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
        cmd.blendMode = blendMode;
        return cmd;
    }
    recover() {
        this.texture = null;
        this.vertices = null;
        this.uvs = null;
        this.indices = null;
        this.matrix = null;
        Pool.recover("DrawTrianglesCmd", this);
    }
    run(context, gx, gy) {
        context.drawTriangles(this.texture, this.x + gx, this.y + gy, this.vertices, this.uvs, this.indices, this.matrix, this.alpha, this.blendMode, this.color);
    }
    get cmdID() {
        return DrawTrianglesCmd.ID;
    }
    getBoundPoints(sp) {
        let vert = this.vertices;
        var vnum = vert.length;
        if (vnum < 2)
            return [];
        var minx = vert[0];
        var miny = vert[1];
        var maxx = minx;
        var maxy = miny;
        for (var i = 2; i < vnum;) {
            var cx = vert[i++];
            var cy = vert[i++];
            if (minx > cx)
                minx = cx;
            if (miny > cy)
                miny = cy;
            if (maxx < cx)
                maxx = cx;
            if (maxy < cy)
                maxy = cy;
        }
        return [minx, miny, maxx, miny, maxx, maxy, minx, maxy];
    }
}
DrawTrianglesCmd.ID = "DrawTriangles";
ClassUtils.regClass("DrawTrianglesCmd", DrawTrianglesCmd);

//# sourceMappingURL=DrawTrianglesCmd.js.map
