import { ClassUtils } from "../../utils/ClassUtils";
import { ColorUtils } from '../../utils/ColorUtils';
import { Pool } from "../../utils/Pool";
export class DrawTextureCmd {
    constructor() {
        this.color = 0xffffffff;
        this.uv = null;
    }
    static create(texture, x, y, width, height, matrix, alpha, color, blendMode, uv) {
        if (width == null)
            width = texture.sourceWidth;
        if (height == null)
            height = texture.sourceHeight;
        let wRate = width / texture.sourceWidth;
        let hRate = height / texture.sourceHeight;
        width = texture.width * wRate;
        height = texture.height * hRate;
        x += texture.offsetX * wRate;
        y += texture.offsetY * hRate;
        var cmd = Pool.getItemByClass("DrawTextureCmd", DrawTextureCmd);
        cmd.texture = texture;
        texture._addReference();
        cmd.x = x;
        cmd.y = y;
        cmd.width = width;
        cmd.height = height;
        cmd.matrix = matrix;
        cmd.alpha = alpha;
        cmd.blendMode = blendMode;
        cmd.uv = uv || null;
        cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
        return cmd;
    }
    recover() {
        this.texture && this.texture._removeReference();
        this.texture = null;
        this.matrix = null;
        Pool.recover("DrawTextureCmd", this);
    }
    run(context, gx, gy) {
        this.texture && context.drawTextureWithTransform(this.texture, this.x, this.y, this.width, this.height, this.matrix, gx, gy, this.alpha, this.blendMode, this.uv, this.color);
    }
    get cmdID() {
        return DrawTextureCmd.ID;
    }
}
DrawTextureCmd.ID = "DrawTexture";
ClassUtils.regClass("DrawTextureCmd", DrawTextureCmd);

//# sourceMappingURL=DrawTextureCmd.js.map
