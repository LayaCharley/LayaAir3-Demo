import { Point } from "../../maths/Point";
import { Rectangle } from "../../maths/Rectangle";
import { ClassUtils } from "../../utils/ClassUtils";
import { ColorUtils } from "../../utils/ColorUtils";
import { Pool } from "../../utils/Pool";
export class FillTextureCmd {
    constructor() {
        this.color = 0xffffffff;
    }
    static create(texture, x, y, width, height, type, offset, color) {
        var cmd = Pool.getItemByClass("FillTextureCmd", FillTextureCmd);
        cmd.texture = texture;
        cmd.x = x;
        cmd.y = y;
        cmd.width = width;
        cmd.height = height;
        cmd.type = type;
        cmd.offset = offset;
        cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
        return cmd;
    }
    recover() {
        this.texture = null;
        this.offset = null;
        Pool.recover("FillTextureCmd", this);
    }
    run(context, gx, gy) {
        if (this.texture) {
            if (this.percent && context.sprite) {
                let w = context.sprite.width;
                let h = context.sprite.height;
                context.fillTexture(this.texture, this.x * w + gx, this.y * h + gy, this.width * w, this.height * h, this.type, this.offset || Point.EMPTY, this.color);
            }
            else
                context.fillTexture(this.texture, this.x + gx, this.y + gy, this.width, this.height, this.type, this.offset || Point.EMPTY, this.color);
        }
    }
    get cmdID() {
        return FillTextureCmd.ID;
    }
    getBoundPoints(sp) {
        if (this.width && this.height)
            return Rectangle._getBoundPointS(this.x, this.y, this.width, this.height, this.percent ? sp : null);
        else
            return Rectangle._getBoundPointS(this.x, this.y, this.texture.width, this.texture.height);
    }
}
FillTextureCmd.ID = "FillTexture";
ClassUtils.regClass("FillTextureCmd", FillTextureCmd);

//# sourceMappingURL=FillTextureCmd.js.map
