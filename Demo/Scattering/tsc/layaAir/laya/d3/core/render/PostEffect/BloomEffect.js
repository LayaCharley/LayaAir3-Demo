import BloomVS from "../../../shader/files/postProcess/Bloom/Bloom.vs";
import BloomDownsample13PS from "../../../shader/files/postProcess/Bloom/BloomDownsample13.fs";
import BloomDownsample4PS from "../../../shader/files/postProcess/Bloom/BloomDownsample4.fs";
import BloomPrefilter13PS from "../../../shader/files/postProcess/Bloom/BloomPrefilter13.fs";
import BloomPrefilter4PS from "../../../shader/files/postProcess/Bloom/BloomPrefilter4.fs";
import BloomUpsampleBoxPS from "../../../shader/files/postProcess/Bloom/BloomUpsampleBox.fs";
import BloomUpsampleTentPS from "../../../shader/files/postProcess/Bloom/BloomUpsampleTent.fs";
import CompositePS from "../../../shader/files/postProcess/Bloom/Composite.fs";
import CompositeVS from "../../../shader/files/postProcess/Bloom/Composite.vs";
import SamplingGLSL from "../../../shader/files/postProcess/Sampling.glsl";
import StdLibGLSL from "../../../shader/files/postProcess/StdLib.glsl";
import ColorsGLSL from "../../../shader/files/postProcess/Colors.glsl";
import { LayaGL } from "../../../../layagl/LayaGL";
import { FilterMode } from "../../../../RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "../../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { Texture2D } from "../../../../resource/Texture2D";
import { PostProcess } from "../../../component/PostProcess";
import { PostProcessEffect } from "../PostProcessEffect";
import { Color } from "../../../../maths/Color";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
import { RenderState } from "../../../../RenderEngine/RenderShader/RenderState";
import { SubShader } from "../../../../RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "../../../../RenderEngine/RenderShader/VertexMesh";
export class BloomEffect extends PostProcessEffect {
    constructor() {
        super();
        this._shader = null;
        this._shaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this._linearColor = new Color();
        this._bloomTextureTexelSize = new Vector4();
        this._shaderThreshold = new Vector4();
        this._shaderParams = new Vector4();
        this._pyramid = null;
        this._intensity = 0.0;
        this._threshold = 1.0;
        this._softKnee = 0.5;
        this._diffusion = 7.0;
        this._anamorphicRatio = 0.0;
        this._dirtIntensity = 0.0;
        this._shaderSetting = new Vector4();
        this._dirtTileOffset = new Vector4();
        this._fastMode = false;
        this._dirtTexture = null;
        this.singleton = true;
        this.active = true;
        this.intensity = 1.0;
        this.threshold = 1.0;
        this.softKnee = 0.5;
        this.clamp = 65472;
        this.diffusion = 7;
        this.anamorphicRatio = 0;
        this.color = new Color(1.0, 1.0, 1.0, 1.0);
    }
    static init() {
        Shader3D.addInclude("StdLib.glsl", StdLibGLSL);
        Shader3D.addInclude("Colors.glsl", ColorsGLSL);
        Shader3D.addInclude("Sampling.glsl", SamplingGLSL);
        var attributeMap = {
            'a_PositionTexcoord': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        var uniformMap = {
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
            "u_AutoExposureTex": ShaderDataType.Texture2D,
            "u_Threshold": ShaderDataType.Vector4,
            "u_Params": ShaderDataType.Vector4,
            "u_BloomTex": ShaderDataType.Texture2D,
            "u_SampleScale": ShaderDataType.Float,
        };
        var shader = Shader3D.add("PostProcessBloom");
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        var shaderPass = subShader.addShaderPass(BloomVS, BloomPrefilter13PS);
        var renderState = shaderPass.renderState;
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderPass = subShader.addShaderPass(BloomVS, BloomPrefilter4PS);
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderPass = subShader.addShaderPass(BloomVS, BloomDownsample13PS);
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderPass = subShader.addShaderPass(BloomVS, BloomDownsample4PS);
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderPass = subShader.addShaderPass(BloomVS, BloomUpsampleTentPS);
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        shaderPass = subShader.addShaderPass(BloomVS, BloomUpsampleBoxPS);
        renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
        BloomEffect.CompositeInit();
        BloomEffect.__initDefine__();
    }
    static CompositeInit() {
        let attributeMap = {
            'a_PositionTexcoord': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4],
        };
        let uniformMap = {
            'u_MainTex': ShaderDataType.Texture2D,
            'u_BloomTex': ShaderDataType.Texture2D,
            'u_AutoExposureTex': ShaderDataType.Texture2D,
            'u_Bloom_DirtTex': ShaderDataType.Texture2D,
            'u_BloomTex_TexelSize': ShaderDataType.Vector4,
            'u_Bloom_DirtTileOffset': ShaderDataType.Vector4,
            'u_Bloom_Settings': ShaderDataType.Vector3,
            'u_Bloom_Color': ShaderDataType.Vector3,
        };
        let shader = Shader3D.add("PostProcessComposite");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let shaderPass = subShader.addShaderPass(CompositeVS, CompositePS);
        let renderState = shaderPass.renderState;
        renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        renderState.depthWrite = false;
        renderState.cull = RenderState.CULL_NONE;
        renderState.blend = RenderState.BLEND_DISABLE;
    }
    static __initDefine__() {
        BloomEffect.SHADERVALUE_MAINTEX = Shader3D.propertyNameToID("u_MainTex");
        BloomEffect.SHADERVALUE_AUTOEXPOSURETEX = Shader3D.propertyNameToID("u_AutoExposureTex");
        BloomEffect.SHADERVALUE_SAMPLESCALE = Shader3D.propertyNameToID("u_SampleScale");
        BloomEffect.SHADERVALUE_THRESHOLD = Shader3D.propertyNameToID("u_Threshold");
        BloomEffect.SHADERVALUE_PARAMS = Shader3D.propertyNameToID("u_Params");
        BloomEffect.SHADERVALUE_BLOOMTEX = Shader3D.propertyNameToID("u_BloomTex");
    }
    get clamp() {
        return this._clamp;
    }
    set clamp(value) {
        this._clamp = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get fastMode() {
        return this._fastMode;
    }
    set fastMode(value) {
        this._fastMode = value;
    }
    get dirtTexture() {
        return this._dirtTexture;
    }
    set dirtTexture(value) {
        this._dirtTexture && this._dirtTexture._removeReference(1);
        this._dirtTexture = value;
        this._dirtTexture && this._dirtTexture._addReference(1);
    }
    get intensity() {
        return this._intensity;
    }
    set intensity(value) {
        this._intensity = Math.max(value, 0.0);
    }
    get threshold() {
        return this._threshold;
    }
    set threshold(value) {
        this._threshold = Math.max(value, 0.0);
    }
    get softKnee() {
        return this._softKnee;
    }
    set softKnee(value) {
        this._softKnee = Math.min(Math.max(value, 0.0), 1.0);
    }
    get diffusion() {
        return this._diffusion;
    }
    set diffusion(value) {
        this._diffusion = Math.min(Math.max(value, 1), 10);
    }
    get anamorphicRatio() {
        return this._anamorphicRatio;
    }
    set anamorphicRatio(value) {
        this._anamorphicRatio = Math.min(Math.max(value, -1.0), 1.0);
    }
    get dirtIntensity() {
        return this._dirtIntensity;
    }
    set dirtIntensity(value) {
        this._dirtIntensity = Math.max(value, 0.0);
    }
    effectInit(postprocess) {
        super.effectInit(postprocess);
        this._shader = Shader3D.find("PostProcessBloom");
        this._pyramid = new Array(BloomEffect.MAXPYRAMIDSIZE * 2);
    }
    getCameraDepthTextureModeFlag() {
        return 0;
    }
    release(postprocess) {
        super.release(postprocess);
        this._shader = null;
        this._pyramid = [];
    }
    render(context) {
        var cmd = context.command;
        var viewport = context.camera.viewport;
        this._shaderData.setTexture(BloomEffect.SHADERVALUE_AUTOEXPOSURETEX, Texture2D.whiteTexture);
        var ratio = this._anamorphicRatio;
        var rw = ratio < 0 ? -ratio : 0;
        var rh = ratio > 0 ? ratio : 0;
        var tw = Math.floor(viewport.width / (2 - rw));
        var th = Math.floor(viewport.height / (2 - rh));
        var s = Math.max(tw, th);
        var logs;
        logs = Math.log2(s) + this._diffusion - 10;
        var logsInt = Math.floor(logs);
        var iterations = Math.min(Math.max(logsInt, 1), BloomEffect.MAXPYRAMIDSIZE);
        var sampleScale = 0.5 + logs - logsInt;
        this._shaderData.setNumber(BloomEffect.SHADERVALUE_SAMPLESCALE, sampleScale);
        var lthresh = Color.gammaToLinearSpace(this.threshold);
        var knee = lthresh * this._softKnee + 1e-5;
        this._shaderThreshold.setValue(lthresh, lthresh - knee, knee * 2, 0.25 / knee);
        this._shaderData.setVector(BloomEffect.SHADERVALUE_THRESHOLD, this._shaderThreshold);
        var lclamp = Color.gammaToLinearSpace(this.clamp);
        this._shaderParams.setValue(lclamp, 0, 0, 0);
        this._shaderData.setVector(BloomEffect.SHADERVALUE_PARAMS, this._shaderParams);
        var qualityOffset = this.fastMode ? 1 : 0;
        var lastDownTexture = context.indirectTarget;
        for (var i = 0; i < iterations; i++) {
            var downIndex = i * 2;
            var upIndex = downIndex + 1;
            var subShader = i == 0 ? BloomEffect.SUBSHADER_PREFILTER13 + qualityOffset : BloomEffect.SUBSHADER_DOWNSAMPLE13 + qualityOffset;
            var mipDownTexture = RenderTexture.createFromPool(tw, th, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None, false, 1, false, true);
            mipDownTexture.filterMode = FilterMode.Bilinear;
            this._pyramid[downIndex] = mipDownTexture;
            if (i !== iterations - 1) {
                var mipUpTexture = RenderTexture.createFromPool(tw, th, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None, false, 1, false, true);
                mipUpTexture.filterMode = FilterMode.Bilinear;
                this._pyramid[upIndex] = mipUpTexture;
            }
            cmd.blitScreenTriangle(lastDownTexture, mipDownTexture, null, this._shader, this._shaderData, subShader);
            lastDownTexture = mipDownTexture;
            tw = Math.max(Math.floor(tw / 2), 1);
            th = Math.max(Math.floor(th / 2), 1);
        }
        var lastUpTexture = this._pyramid[(iterations - 1) * 2];
        for (i = iterations - 2; i >= 0; i--) {
            downIndex = i * 2;
            upIndex = downIndex + 1;
            mipDownTexture = this._pyramid[downIndex];
            mipUpTexture = this._pyramid[upIndex];
            cmd.setShaderDataTexture(this._shaderData, BloomEffect.SHADERVALUE_BLOOMTEX, mipDownTexture);
            cmd.blitScreenTriangle(lastUpTexture, mipUpTexture, null, this._shader, this._shaderData, BloomEffect.SUBSHADER_UPSAMPLETENT + qualityOffset);
            lastUpTexture = mipUpTexture;
        }
        var linearColor = this._linearColor;
        this.color.toLinear(linearColor);
        var intensity = Math.pow(2, this._intensity / 10.0) - 1.0;
        var shaderSettings = this._shaderSetting;
        this._shaderSetting.setValue(sampleScale, intensity, this._dirtIntensity, iterations);
        var usedirtTexture = this._dirtTexture ? this._dirtTexture : Texture2D.blackTexture;
        var dirtRatio = usedirtTexture.width / usedirtTexture.height;
        var screenRatio = viewport.width / viewport.height;
        var dirtTileOffset = this._dirtTileOffset;
        if (dirtRatio > screenRatio)
            dirtTileOffset.setValue(screenRatio / dirtRatio, 1.0, (1.0 - dirtTileOffset.x) * 0.5, 0.0);
        else if (dirtRatio < screenRatio)
            dirtTileOffset.setValue(1.0, dirtRatio / screenRatio, 0.0, (1.0 - dirtTileOffset.y) * 0.5);
        var compositeShaderData = context.compositeShaderData;
        if (this.fastMode)
            compositeShaderData.addDefine(PostProcess.SHADERDEFINE_BLOOM_LOW);
        else
            compositeShaderData.addDefine(PostProcess.SHADERDEFINE_BLOOM);
        this._bloomTextureTexelSize.setValue(1.0 / lastUpTexture.width, 1.0 / lastUpTexture.height, lastUpTexture.width, lastUpTexture.height);
        compositeShaderData.setVector(PostProcess.SHADERVALUE_BLOOM_DIRTTILEOFFSET, dirtTileOffset);
        compositeShaderData.setVector(PostProcess.SHADERVALUE_BLOOM_SETTINGS, shaderSettings);
        compositeShaderData.setVector(PostProcess.SHADERVALUE_BLOOM_COLOR, new Vector4(linearColor.r, linearColor.g, linearColor.b, linearColor.a));
        compositeShaderData.setTexture(PostProcess.SHADERVALUE_BLOOM_DIRTTEX, usedirtTexture);
        compositeShaderData.setTexture(PostProcess.SHADERVALUE_BLOOMTEX, lastUpTexture);
        compositeShaderData.setVector(PostProcess.SHADERVALUE_BLOOMTEX_TEXELSIZE, this._bloomTextureTexelSize);
        let _compositeShader = Shader3D.find("PostProcessComposite");
        cmd.blitScreenTriangle(context.indirectTarget, context.destination, context.camera._screenOffsetScale, _compositeShader, compositeShaderData, 0);
        for (i = 0; i < iterations; i++) {
            downIndex = i * 2;
            upIndex = downIndex + 1;
            RenderTexture.recoverToPool(this._pyramid[downIndex]);
            (i !== 0 && i !== iterations - 1) && (RenderTexture.recoverToPool(this._pyramid[upIndex]));
        }
        context.deferredReleaseTextures.push(lastUpTexture);
    }
}
BloomEffect.SUBSHADER_PREFILTER13 = 0;
BloomEffect.SUBSHADER_PREFILTER4 = 1;
BloomEffect.SUBSHADER_DOWNSAMPLE13 = 2;
BloomEffect.SUBSHADER_DOWNSAMPLE4 = 3;
BloomEffect.SUBSHADER_UPSAMPLETENT = 4;
BloomEffect.SUBSHADER_UPSAMPLEBOX = 5;
BloomEffect.MAXPYRAMIDSIZE = 16;

//# sourceMappingURL=BloomEffect.js.map
