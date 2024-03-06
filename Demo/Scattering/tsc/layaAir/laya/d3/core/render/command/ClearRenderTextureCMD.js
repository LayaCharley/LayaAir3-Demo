import { LayaGL } from "../../../../layagl/LayaGL";
import { Color } from "../../../../maths/Color";
import { RenderClearFlag } from "../../../../RenderEngine/RenderEnum/RenderClearFlag";
import { Command } from "./Command";
export class ClearRenderTextureCMD extends Command {
    constructor() {
        super(...arguments);
        this._clearColor = false;
        this._clearDepth = false;
        this._backgroundColor = new Color();
        this._linearbackgroundColor = new Color();
        this._depth = 1;
    }
    static create(clearColor, clearDepth, backgroundColor, depth = 1, commandBuffer) {
        var cmd;
        cmd = ClearRenderTextureCMD._pool.length > 0 ? ClearRenderTextureCMD._pool.pop() : new ClearRenderTextureCMD();
        cmd._clearColor = clearColor;
        cmd._clearDepth = clearDepth;
        backgroundColor.cloneTo(cmd._backgroundColor);
        backgroundColor.toLinear(cmd._linearbackgroundColor);
        cmd._depth = depth;
        cmd._commandBuffer = commandBuffer;
        return cmd;
    }
    run() {
        var flag;
        let linearBgColor = this._linearbackgroundColor;
        if (this._clearDepth && this._clearColor) {
            LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Color | RenderClearFlag.Depth, linearBgColor, this._depth);
        }
        else if (this._clearDepth) {
            LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Depth, linearBgColor, this._depth);
        }
        else if (this._clearColor) {
            LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Color, linearBgColor, this._depth);
        }
    }
    recover() {
    }
}
ClearRenderTextureCMD._pool = [];

//# sourceMappingURL=ClearRenderTextureCMD.js.map
