import { ColorUtils } from "../../utils/ColorUtils";
import { Pool } from "../../utils/Pool";
export class DrawImageCmd {
    constructor() {
        this.color = 0xffffffff;
    }
    static create(texture, x, y, width, height, color) {
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
        var cmd = Pool.getItemByClass("DrawImageCmd", DrawImageCmd);
        cmd.texture = texture;
        texture._addReference();
        cmd.x = x;
        cmd.y = y;
        cmd.width = width;
        cmd.height = height;
        cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
        return cmd;
    }
    recover() {
        this.texture && this.texture._removeReference();
        this.texture = null;
        Pool.recover("DrawImageCmd", this);
    }
    run(context, gx, gy) {
        if (this.texture) {
            context.drawTexture(this.texture, this.x + gx, this.y + gy, this.width, this.height, this.color);
        }
    }
    get cmdID() {
        return DrawImageCmd.ID;
    }
}
DrawImageCmd.ID = "DrawImage";

//# sourceMappingURL=DrawImageCmd.js.map
