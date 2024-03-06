import { Texture2D } from "../../resource/Texture2D";
import { CommandBuffer } from "../core/render/command/CommandBuffer";
import { PostProcessRenderContext } from "../core/render/PostProcessRenderContext";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../layagl/LayaGL";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { DepthTextureMode } from "../depthMap/DepthPass";
import { RenderTexture } from "../../resource/RenderTexture";
import { ColorGradEffect } from "../core/render/PostEffect/ColorGradEffect";
export class PostProcess {
    constructor() {
        this._compositeShader = Shader3D.find("PostProcessComposite");
        this._compositeShaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this._effects = [];
        this._enable = true;
        this._enableColorGrad = false;
        this._context = null;
        this._context = new PostProcessRenderContext();
        this._context.compositeShaderData = this._compositeShaderData;
        this._context.command = new CommandBuffer();
        this._depthtextureFlag = 0;
    }
    static __init__() {
        PostProcess.SHADERDEFINE_BLOOM_LOW = Shader3D.getDefineByName("BLOOM_LOW");
        PostProcess.SHADERDEFINE_BLOOM = Shader3D.getDefineByName("BLOOM");
        PostProcess.SHADERDEFINE_FINALPASS = Shader3D.getDefineByName("FINALPASS");
        PostProcess.SHADERVALUE_MAINTEX = Shader3D.propertyNameToID("u_MainTex");
        PostProcess.SHADERVALUE_BLOOMTEX = Shader3D.propertyNameToID("u_BloomTex");
        PostProcess.SHADERVALUE_AUTOEXPOSURETEX = Shader3D.propertyNameToID("u_AutoExposureTex");
        PostProcess.SHADERVALUE_BLOOM_DIRTTEX = Shader3D.propertyNameToID("u_Bloom_DirtTex");
        PostProcess.SHADERVALUE_BLOOMTEX_TEXELSIZE = Shader3D.propertyNameToID("u_BloomTex_TexelSize");
        PostProcess.SHADERVALUE_BLOOM_DIRTTILEOFFSET = Shader3D.propertyNameToID("u_Bloom_DirtTileOffset");
        PostProcess.SHADERVALUE_BLOOM_SETTINGS = Shader3D.propertyNameToID("u_Bloom_Settings");
        PostProcess.SHADERVALUE_BLOOM_COLOR = Shader3D.propertyNameToID("u_Bloom_Color");
    }
    recaculateCameraFlag() {
        this._depthtextureFlag = DepthTextureMode.None;
        let n = this.effects.length;
        for (let i = 0; i < n; i++) {
            this._depthtextureFlag |= this.effects[i].getCameraDepthTextureModeFlag();
        }
    }
    get enable() {
        return this._enable;
    }
    set enable(value) {
        this._enable = value;
    }
    set commandContext(oriContext) {
        this._context.command._context = oriContext;
    }
    set effects(value) {
        this.clearEffect();
        for (var i = 0, n = value.length; i < n; i++) {
            if (value[i])
                this.addEffect(value[i]);
        }
    }
    get effects() {
        return this._effects;
    }
    get cameraDepthTextureMode() {
        return this._depthtextureFlag;
    }
    _init(camera) {
        this._context.camera = camera;
        this._context.command._camera = camera;
    }
    _render(camera) {
        this._init(camera);
        var camera = this._context.camera;
        var viewport = camera.viewport;
        var cameraTarget = camera._internalRenderTexture;
        var screenTexture = RenderTexture.createFromPool(cameraTarget.width, cameraTarget.height, camera._getRenderTextureFormat(), RenderTargetFormat.None, false, 1, false, true);
        var Indirect = [RenderTexture.createFromPool(cameraTarget.width, cameraTarget.height, camera._getRenderTextureFormat(), RenderTargetFormat.None, false, 1, false, true), RenderTexture.createFromPool(cameraTarget.width, cameraTarget.height, camera._getRenderTextureFormat(), RenderTargetFormat.None, false, 1, false, true)];
        this._context.command.clear();
        this._context.source = screenTexture;
        this._context.indirectTarget = screenTexture;
        this._context.destination = this._effects.length == 2 ? Indirect[0] : cameraTarget;
        this._context.compositeShaderData.clearDefine();
        this._context.command.blitScreenTriangle(cameraTarget, screenTexture);
        this._context.compositeShaderData.setTexture(PostProcess.SHADERVALUE_AUTOEXPOSURETEX, Texture2D.whiteTexture);
        if (this._enableColorGrad) {
            this._ColorGradEffect._buildLUT();
        }
        for (var i = 0, n = this._effects.length; i < n; i++) {
            if (this._effects[i].active) {
                this._effects[i].render(this._context);
                if (i == n - 2) {
                    this._context.indirectTarget = this._context.destination;
                    this._context.destination = cameraTarget;
                }
                else {
                    this._context.indirectTarget = this._context.destination;
                    this._context.destination = Indirect[(i + 1) % 2];
                }
            }
            else if (i == n - 1) {
                this._context.command.blitScreenTriangle(this._context.indirectTarget, cameraTarget);
            }
        }
        this._compositeShaderData.addDefine(PostProcess.SHADERDEFINE_FINALPASS);
        var offScreenTex = camera._offScreenRenderTexture;
        var dest = offScreenTex ? offScreenTex : null;
        this._context.destination = dest;
        var canvasWidth = camera._getCanvasWidth(), canvasHeight = camera._getCanvasHeight();
        if (dest) {
            camera._screenOffsetScale.setValue(viewport.x / canvasWidth, (canvasHeight - viewport.y - viewport.height) / canvasHeight, viewport.width / canvasWidth, viewport.height / canvasHeight);
            this._context.command.blitScreenTriangle(cameraTarget, dest, camera._screenOffsetScale, null, this._compositeShaderData, 0);
        }
        RenderTexture.recoverToPool(screenTexture);
        RenderTexture.recoverToPool(Indirect[0]);
        RenderTexture.recoverToPool(Indirect[1]);
        var tempRenderTextures = this._context.deferredReleaseTextures;
        for (i = 0, n = tempRenderTextures.length; i < n; i++)
            RenderTexture.recoverToPool(tempRenderTextures[i]);
        tempRenderTextures.length = 0;
    }
    addEffect(effect) {
        if (effect.singleton && this.getEffect(effect.constructor)) {
            console.error("无法增加已经存在的Effect");
            return;
        }
        if (!this._enableColorGrad || effect instanceof ColorGradEffect) {
            this._effects.push(effect);
        }
        else {
            this._effects.splice(this._effects.length - 1, 0, effect);
        }
        this.recaculateCameraFlag();
        effect.effectInit(this);
    }
    getEffect(classReg) {
        let size = this._effects.length;
        for (let i = 0; i < size; i++) {
            let element = this._effects[i];
            if (element instanceof classReg) {
                return element;
            }
        }
        return null;
    }
    removeEffect(effect) {
        var index = this._effects.indexOf(effect);
        if (index !== -1) {
            this._effects.splice(index, 1);
            effect.release(this);
            this.recaculateCameraFlag();
        }
    }
    clearEffect() {
        let i = this.effects.length - 1;
        for (; i >= 0; i--) {
            this.removeEffect(this.effects[i]);
        }
    }
    _applyPostProcessCommandBuffers() {
        this._context.command._apply();
    }
}

//# sourceMappingURL=PostProcess.js.map
