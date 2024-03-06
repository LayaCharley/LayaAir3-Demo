import { Viewport } from "../../math/Viewport";
import { LayaGL } from "../../../layagl/LayaGL";
import { Vector4 } from "../../../maths/Vector4";
export class RenderContext3D {
    constructor() {
        this.configPipeLineMode = "Forward";
        this._contextOBJ = LayaGL.renderOBJCreate.createRenderContext3D();
    }
    static __init__() {
        RenderContext3D._instance = new RenderContext3D();
    }
    get destTarget() {
        return this._contextOBJ.destTarget;
    }
    set destTarget(value) {
        this._contextOBJ.destTarget = value;
    }
    get viewport() {
        return this._contextOBJ.viewPort;
    }
    set viewport(value) {
        value.cloneTo(this._contextOBJ.viewPort);
    }
    get scissor() {
        return this._contextOBJ.scissor;
    }
    set scissor(value) {
        value.cloneTo(this._contextOBJ.scissor);
    }
    get invertY() {
        return this._contextOBJ.invertY;
    }
    set invertY(value) {
        this._contextOBJ.invertY = value;
    }
    get pipelineMode() {
        return this._contextOBJ.pipelineMode;
    }
    set pipelineMode(value) {
        this._contextOBJ.pipelineMode = value;
    }
    get cameraShaderValue() {
        return this._contextOBJ.cameraShaderData;
    }
    set cameraShaderValue(value) {
        this._contextOBJ.cameraShaderData = value;
    }
    set scene(value) {
        if (value) {
            this._contextOBJ.sceneID = value._id;
            this._contextOBJ.sceneShaderData = value._shaderValues;
            this._scene = value;
        }
        else {
            this._contextOBJ.sceneID = -1;
            this._contextOBJ.sceneShaderData = null;
            this._scene = null;
        }
    }
    get scene() {
        return this._scene;
    }
    changeViewport(x, y, width, height) {
        Viewport._tempViewport.set(x, y, width, height);
        this.viewport = Viewport._tempViewport;
    }
    changeScissor(x, y, width, height) {
        Vector4.tempVec4.setValue(x, y, width, height);
        this.scissor = Vector4.tempVec4;
    }
    applyContext(cameraUpdateMark) {
        this._contextOBJ.applyContext(cameraUpdateMark);
    }
    drawRenderElement(renderelemt) {
        renderelemt.material && renderelemt._convertSubShader(this.customShader, this.replaceTag);
        if (!renderelemt.renderSubShader)
            return;
        renderelemt._renderUpdatePre(this);
        this._contextOBJ.drawRenderElement(renderelemt._renderElementOBJ);
    }
}

//# sourceMappingURL=RenderContext3D.js.map
