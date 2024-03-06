import { Command } from "./Command";
import { RenderContext3D } from "../RenderContext3D";
import { Camera } from "../../Camera";
import { RenderTexture } from "../../../../resource/RenderTexture";
export class SetRenderTargetCMD extends Command {
    constructor() {
        super(...arguments);
        this._renderTexture = null;
    }
    static create(renderTexture) {
        var cmd;
        cmd = SetRenderTargetCMD._pool.length > 0 ? SetRenderTargetCMD._pool.pop() : new SetRenderTargetCMD();
        cmd._renderTexture = renderTexture;
        return cmd;
    }
    run() {
        (RenderTexture.currentActive) && (RenderTexture.currentActive._end());
        RenderContext3D._instance.destTarget = this._renderTexture;
        RenderContext3D._instance.changeScissor(0, 0, this._renderTexture.width, this._renderTexture.height);
        RenderContext3D._instance.changeViewport(0, 0, this._renderTexture.width, this._renderTexture.height);
        RenderContext3D._instance._contextOBJ.applyContext(Camera._updateMark);
    }
    recover() {
        SetRenderTargetCMD._pool.push(this);
        this._renderTexture = null;
    }
}
SetRenderTargetCMD._pool = [];

//# sourceMappingURL=SetRenderTargetCMD.js.map
