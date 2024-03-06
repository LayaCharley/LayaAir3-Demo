import { LayaGL } from "../../../layagl/LayaGL";
import { Vector4 } from "../../../maths/Vector4";
import { Viewport } from "../../math/Viewport";
export class RenderContext3DOBJ {
    constructor() {
        this.invertY = false;
        this.viewPort = new Viewport(0, 0, 0, 0);
        this.scissor = new Vector4();
        this.pipelineMode = "Forward";
    }
    end() {
    }
    applyContext(cameraUpdateMark) {
        this.destTarget && this.destTarget._start();
        this.cameraUpdateMark = cameraUpdateMark;
        LayaGL.renderEngine.viewport(this.viewPort.x, this.viewPort.y, this.viewPort.width, this.viewPort.height);
        LayaGL.renderEngine.scissor(this.scissor.x, this.scissor.y, this.scissor.z, this.scissor.w);
    }
    drawRenderElement(renderelemt) {
        renderelemt._render(this);
    }
}

//# sourceMappingURL=RenderContext3DOBJ.js.map
