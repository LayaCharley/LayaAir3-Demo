import { Config3D } from "../../../../Config3D";
import { ILaya3D } from "../../../../ILaya3D";
import { Camera, CameraEventFlags } from "../../core/Camera";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { Scene3D } from "../../core/scene/Scene3D";
import { Cluster } from "../../graphics/renderPath/Cluster";
import { RenderStateContext } from "../../../RenderEngine/RenderStateContext";
import { WebXRExperienceHelper } from "./WebXRExperienceHelper";
export class WebXRCamera extends Camera {
    constructor() {
        super(...arguments);
        this.isWebXR = true;
    }
    get renderTarget() {
        return this._internalRenderTexture;
    }
    set renderTarget(value) {
        this._internalRenderTexture = value;
    }
    set clientWidth(value) {
        this._clientWidth = value;
    }
    set clientHeight(value) {
        this._clientHeight = value;
    }
    get clientWidth() {
        return this._clientWidth;
    }
    get clientHeight() {
        return this._clientHeight;
    }
    _restoreView(gl) {
        var viewport = this.viewport;
        var vpX, vpY;
        var vpW = viewport.width;
        var vpH = viewport.height;
        if (this._needInternalRenderTexture()) {
            vpX = 0;
            vpY = 0;
        }
        else {
            vpX = viewport.x;
            vpY = this._getCanvasHeight() - viewport.y - vpH;
        }
        gl.viewport(vpX, vpY, vpW, vpH);
    }
    render(shader = null, replacementTag = null) {
        if (!this.activeInHierarchy)
            return;
        var viewport = this.viewport;
        var needInternalRT = true;
        var context = RenderContext3D._instance;
        var scene = context.scene = this._scene;
        context.pipelineMode = context.configPipeLineMode;
        context.replaceTag = replacementTag;
        context.customShader = shader;
        var needShadowCasterPass = this._renderShadowMap(scene, context);
        this._preRenderMainPass(context, scene, needInternalRT, viewport);
        this._renderMainPass(context, viewport, scene, shader, replacementTag, needInternalRT);
        this._aftRenderMainPass(needShadowCasterPass);
    }
    _renderMainPass(context, viewport, scene, shader, replacementTag, needInternalRT) {
        var gl = WebXRExperienceHelper.glInstance;
        var renderTex = this._internalRenderTexture;
        context.viewport = viewport;
        this._prepareCameraToRender();
        var multiLighting = Config3D._multiLighting;
        (multiLighting) && (Cluster.instance.update(this, (scene)));
        scene._preCulling(context, this);
        if (renderTex && renderTex._isCameraTarget)
            context.invertY = true;
        this._applyViewProject(context, this.viewMatrix, this._projectionMatrix);
        if (this.depthTextureMode != 0) {
            this._renderDepthMode(context);
        }
        (renderTex) && (renderTex._start());
        if (renderTex.frameLoop != Scene3D._updateMark) {
            renderTex.frameLoop = Scene3D._updateMark;
            this.clear(gl);
        }
        this._restoreView(gl);
        this._prepareCameraToRender();
        this._applyCommandBuffer(CameraEventFlags.BeforeForwardOpaque, context);
        scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_RENDERQPAQUE);
        this._applyCommandBuffer(CameraEventFlags.BeforeSkyBox, context);
        scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_SKYBOX);
        this._applyCommandBuffer(CameraEventFlags.BeforeTransparent, context);
        scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_RENDERTRANSPARENT);
        scene._componentDriver.callPostRender();
        this._applyCommandBuffer(CameraEventFlags.BeforeImageEffect, context);
        (renderTex) && (renderTex._end());
        this._applyCommandBuffer(CameraEventFlags.AfterEveryThing, context);
    }
    _calculateProjectionMatrix() {
    }
    clear(gl) {
        gl.viewport(0, 0, this._clientWidth, this._clientHeight);
        gl.scissor(0, 0, this._clientWidth, this._clientHeight);
        gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
        RenderStateContext.setDepthMask(true);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    destroy() {
        super.destroy(true);
    }
}

//# sourceMappingURL=WebXRCamera.js.map
