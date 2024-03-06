import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderTexture } from "../../../resource/RenderTexture";
import { WebXRExperienceHelper } from "./WebXRExperienceHelper";
export class WebXRRenderTexture extends RenderTexture {
    constructor() {
        super(1, 1, 1, RenderTargetFormat.STENCIL_8, false, 1);
        this.frameLoop = -1;
    }
    set frameBuffer(value) {
        this._frameBuffer = value;
    }
    _create(width, height) {
    }
    _start() {
        var gl = WebXRExperienceHelper.glInstance;
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        RenderTexture._currentActive = this;
    }
    _end() {
        var gl = WebXRExperienceHelper.glInstance;
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        RenderTexture._currentActive = null;
    }
}

//# sourceMappingURL=WebXRRenderTexture.js.map
