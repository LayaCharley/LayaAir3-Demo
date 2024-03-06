import { RenderElement } from "laya/d3/core/render/RenderElement";
import { Command } from "laya/d3/core/render/command/Command";
import { Material, MaterialRenderMode } from "laya/d3/core/material/Material";
import { LayaGL } from "laya/layagl/LayaGL";
import { RenderState } from "laya/RenderEngine/RenderShader/RenderState";
import { RenderContext3D } from "laya/d3/core/render/RenderContext3D";
import { Camera } from "laya/d3/core/Camera";
import { Stat } from "laya/utils/Stat";
import { LensFlareElementGeomtry } from "./LensFlareGeometry";
export class LensFlareCMD extends Command {
    constructor() {
        super();
        this._transform3D = LayaGL.renderOBJCreate.createTransform(null);
        this._renderElement = new RenderElement();
        this._lensFlareGeometry = new LensFlareElementGeomtry();
        this._renderElement.setTransform(this._transform3D);
        this._renderElement.setGeometry(this._lensFlareGeometry);
        this._initMaterial();
    }
    _initMaterial() {
        this._materials = new Material();
        this._materials.setShaderName("LensFlare");
        this._materials.materialRenderMode = MaterialRenderMode.RENDERMODE_ADDTIVE;
        this._materials.depthTest = RenderState.DEPTHTEST_ALWAYS;
        this._materials.cull = RenderState.CULL_NONE;
        this._renderElement.material = this._materials;
        this._renderElement.renderSubShader = this._materials.shader.getSubShaderAt(0);
        this._renderElement.subShaderIndex = 0;
    }
    set center(value) {
        this._materials.setVector2("u_FlareCenter", value);
    }
    set rotate(value) {
        this._materials.setFloat("u_rotate", value);
    }
    set lensFlareElement(value) {
        this._lensFlareElementData = value;
        this.applyElementData();
    }
    applyElementData() {
        this._materials.setTexture("u_FlareTexture", this._lensFlareElementData.texture);
        this._materials.setColor("u_Tint", this._lensFlareElementData.tint);
        this._lensFlareGeometry.instanceCount = 1;
        let testFloat = new Float32Array([this._lensFlareElementData.startPosition, this._lensFlareElementData.AngularOffset, 1, 1]);
        this._lensFlareGeometry.instanceBuffer.setData(testFloat, 0, 0, 4 * 4);
    }
    run() {
        var context = RenderContext3D._instance;
        this._materials.setFloat("u_aspectRatio", context.camera.viewport.height / context.camera.viewport.width);
        context.applyContext(Camera._updateMark);
        context.drawRenderElement(this._renderElement);
        Stat.blitDrawCall++;
    }
    recover() {
    }
    destroy() {
    }
}

//# sourceMappingURL=LensFlareCMD.js.map
