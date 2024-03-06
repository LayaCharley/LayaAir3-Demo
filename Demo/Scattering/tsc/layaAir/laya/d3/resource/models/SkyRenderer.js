import { LayaGL } from "../../../layagl/LayaGL";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector3 } from "../../../maths/Vector3";
import { CompareFunction } from "../../../RenderEngine/RenderEnum/CompareFunction";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { Camera } from "../../core/Camera";
import { BaseRender } from "../../core/render/BaseRender";
import { RenderElement } from "../../core/render/RenderElement";
import { SkyBox } from "./SkyBox";
import { SkyDome } from "./SkyDome";
export class SkyRenderer {
    constructor() {
        this._renderElement = new RenderElement();
        this.mesh = SkyDome.instance;
        this._renderData = new BaseRender();
        this._renderElement.render = this._renderData;
    }
    static __init__() {
        SkyRenderer.SUNLIGHTDIRECTION = Shader3D.propertyNameToID("u_SunLight_direction");
        SkyRenderer.SUNLIGHTDIRCOLOR = Shader3D.propertyNameToID("u_SunLight_color");
        const commandUniform = LayaGL.renderOBJCreate.createGlobalUniformMap("Sprite3D");
        commandUniform.addShaderUniform(SkyRenderer.SUNLIGHTDIRECTION, "u_SunLight_direction", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(SkyRenderer.SUNLIGHTDIRCOLOR, "u_SunLight_color", ShaderDataType.Color);
    }
    get material() {
        return this._material;
    }
    set material(value) {
        if (this._material !== value) {
            (this._material) && (this._material._removeReference());
            this._material = value;
            this._renderElement.material = value;
            if (value) {
                value._addReference();
                value.depthTest = CompareFunction.LessEqual;
                value.depthWrite = false;
                value.stencilWrite = false;
                this._renderElement.renderSubShader = this._material._shader.getSubShaderAt(0);
            }
            else
                this._renderElement.renderSubShader = null;
        }
    }
    get mesh() {
        return this._mesh;
    }
    set mesh(value) {
        if (this._mesh !== value) {
            this._mesh = value;
            this._renderElement.setGeometry(this._mesh);
        }
    }
    get meshType() {
        return this.mesh == SkyBox.instance ? "box" : (this.mesh == SkyDome.instance ? "dome" : "");
    }
    set meshType(value) {
        if (value == "dome")
            this.mesh = SkyDome.instance;
        else
            this.mesh = SkyBox.instance;
    }
    _isAvailable() {
        return this._material && this._mesh ? true : false;
    }
    _render(context) {
        if (this._material && this._mesh) {
            var camera = context.camera;
            var scene = context.scene;
            var projectionMatrix = SkyRenderer._tempMatrix1;
            this._renderData._shaderValues.setColor(SkyRenderer.SUNLIGHTDIRCOLOR, scene._sunColor);
            this._renderData._shaderValues.setVector3(SkyRenderer.SUNLIGHTDIRECTION, scene._sundir);
            var viewMatrix = SkyRenderer._tempMatrix0;
            camera.viewMatrix.cloneTo(viewMatrix);
            viewMatrix.setTranslationVector(Vector3.ZERO);
            if (!camera.orthographic) {
                camera.projectionMatrix.cloneTo(projectionMatrix);
                var epsilon = 1e-6;
                var yScale = 1.0 / Math.tan(3.1416 * camera.fieldOfView / 180 * 0.5);
                projectionMatrix.elements[0] = yScale / camera.aspectRatio;
                projectionMatrix.elements[5] = yScale;
                projectionMatrix.elements[10] = epsilon - 1.0;
                projectionMatrix.elements[11] = -1.0;
                projectionMatrix.elements[14] = -0;
            }
            else {
                var halfWidth = 0.2;
                var halfHeight = halfWidth;
                Matrix4x4.createOrthoOffCenter(-halfWidth, halfWidth, -halfHeight, halfHeight, camera.nearPlane, camera.farPlane, projectionMatrix);
            }
            if (camera.isWebXR) {
                camera._applyViewProject(context, viewMatrix, camera.projectionMatrix);
            }
            else {
                camera._applyViewProject(context, viewMatrix, projectionMatrix);
            }
            context._contextOBJ.applyContext(Camera._updateMark);
            context.drawRenderElement(this._renderElement);
            camera._applyViewProject(context, camera.viewMatrix, camera.projectionMatrix);
        }
    }
    destroy() {
        if (this._material) {
            this._material._removeReference();
            this._material = null;
        }
        this._renderData.destroy();
        this._renderElement.destroy();
    }
}
SkyRenderer._tempMatrix0 = new Matrix4x4();
SkyRenderer._tempMatrix1 = new Matrix4x4();

//# sourceMappingURL=SkyRenderer.js.map
