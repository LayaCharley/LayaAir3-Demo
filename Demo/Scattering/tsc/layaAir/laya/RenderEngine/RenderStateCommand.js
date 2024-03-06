import { LayaGL } from "../layagl/LayaGL";
export class RenderStateCommand {
    constructor() {
        this.cmdArray = new Map();
    }
    addCMD(renderstate, value) {
        this.cmdArray.set(renderstate, value);
    }
    applyCMD() {
        LayaGL.renderEngine.applyRenderStateCMD(this);
    }
    clear() {
        this.cmdArray.clear();
    }
}

//# sourceMappingURL=RenderStateCommand.js.map
