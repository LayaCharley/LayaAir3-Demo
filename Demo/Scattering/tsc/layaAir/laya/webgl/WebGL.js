import { LayaGL } from "../layagl/LayaGL";
import { RenderState2D } from "./utils/RenderState2D";
export class WebGL {
    static _nativeRender_enable() {
    }
    static enable() {
        return true;
    }
    static onStageResize(width, height) {
        LayaGL.renderEngine.viewport(0, 0, width, height);
        RenderState2D.width = width;
        RenderState2D.height = height;
    }
}
WebGL.isNativeRender_enable = false;

//# sourceMappingURL=WebGL.js.map
