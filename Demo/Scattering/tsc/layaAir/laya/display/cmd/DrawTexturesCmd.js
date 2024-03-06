import { Pool } from "../../utils/Pool";
export class DrawTexturesCmd {
    static create(texture, pos, colors) {
        var cmd = Pool.getItemByClass("DrawTexturesCmd", DrawTexturesCmd);
        cmd.texture = texture;
        texture._addReference();
        cmd.pos = pos;
        cmd.colors = colors || [];
        return cmd;
    }
    recover() {
        this.texture._removeReference();
        this.texture = null;
        this.pos = null;
        Pool.recover("DrawTexturesCmd", this);
    }
    run(context, gx, gy) {
        context.drawTextures(this.texture, this.pos, gx, gy, this.colors);
    }
    get cmdID() {
        return DrawTexturesCmd.ID;
    }
}
DrawTexturesCmd.ID = "DrawTextures";

//# sourceMappingURL=DrawTexturesCmd.js.map
