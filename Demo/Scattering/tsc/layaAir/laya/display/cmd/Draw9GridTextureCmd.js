import { ClassUtils } from "../../utils/ClassUtils";
import { ColorUtils } from "../../utils/ColorUtils";
import { Pool } from "../../utils/Pool";
export class Draw9GridTextureCmd {
    constructor() {
        this.color = 0xffffffff;
    }
    static create(texture, x, y, width, height, sizeGrid, percent = false, color = null) {
        let cmd = Pool.getItemByClass("Draw9GridTextureCmd", Draw9GridTextureCmd);
        cmd.texture = texture;
        texture._addReference();
        cmd.x = x;
        cmd.y = y;
        cmd.width = width;
        cmd.height = height;
        cmd.sizeGrid = sizeGrid;
        cmd.percent = percent;
        cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
        return cmd;
    }
    recover() {
        this.texture._removeReference();
        Pool.recover("Draw9GridTextureCmd", this);
    }
    run(context, gx, gy) {
        if (this.texture) {
            let sizeGrid = this.sizeGrid || this.texture._sizeGrid || EMPTY_SIZE_GRID;
            if (this.percent && context.sprite) {
                let w = context.sprite.width;
                let h = context.sprite.height;
                context.drawTextureWithSizeGrid(this.texture, this.x * w, this.y * h, this.width * w, this.height * h, sizeGrid, gx, gy, this.color);
            }
            else
                context.drawTextureWithSizeGrid(this.texture, this.x, this.y, this.width, this.height, sizeGrid, gx, gy, this.color);
        }
    }
    get cmdID() {
        return Draw9GridTextureCmd.ID;
    }
    getBoundPoints(sp) {
        let minx = this.x;
        let miny = this.y;
        let maxx = this.width;
        let maxy = this.height;
        if (this.percent) {
            minx *= sp.width;
            miny *= sp.height;
            maxx *= sp.width;
            maxy *= sp.height;
        }
        return [minx, miny, maxx, miny, maxx, maxy, minx, maxy];
    }
}
Draw9GridTextureCmd.ID = "Draw9GridTexture";
const EMPTY_SIZE_GRID = [0, 0, 0, 0, 0];
ClassUtils.regClass("Draw9GridTextureCmd", Draw9GridTextureCmd);

//# sourceMappingURL=Draw9GridTextureCmd.js.map
