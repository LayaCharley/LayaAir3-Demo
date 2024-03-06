import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
import { FilterMode } from "../../../../RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "../../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { WrapMode } from "../../../../RenderEngine/RenderEnum/WrapMode";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { SubShader } from "../../../../RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "../../../../RenderEngine/RenderShader/VertexMesh";
import { RenderTexture } from "../../../../resource/RenderTexture";
import { Material } from "../../material/Material";
import { CommandBuffer } from "../command/CommandBuffer";
import { PostProcessEffect } from "../PostProcessEffect";
import BlitVS from "../../../../d3/shader/postprocess/BlitScreen.vs";
import BlitLUTShader from "../../../../d3/shader/postprocess/BlitLUTScreen.fs";
import { RenderState } from "../../../../RenderEngine/RenderShader/RenderState";
import { Texture2D } from "../../../../resource/Texture2D";
import { RenderContext3D } from "../RenderContext3D";
import { Color } from "../../../../maths/Color";
import { LayaGL } from "../../../../layagl/LayaGL";
export var ToneMappingType;
(function (ToneMappingType) {
    ToneMappingType[ToneMappingType["None"] = 0] = "None";
    ToneMappingType[ToneMappingType["ACES"] = 1] = "ACES";
})(ToneMappingType || (ToneMappingType = {}));
export class ColorGradEffect extends PostProcessEffect {
    constructor() {
        super();
        this._needBuildLUT = false;
        this._lutBuilderMat = new Material();
        this._lutSize = 32;
        this._enableSplitTone = false;
        this._splitShadow = new Vector3(0.5, 0.5, 0.5);
        this._splitBalance = 0;
        this._splithighlights = new Vector3(0.5, 0.5, 0.5);
        this._u_SplitShadow = new Vector4(0, 0, 0);
        this._enableSMH = false;
        this._shadows = new Vector3(1, 1, 1);
        this._midtones = new Vector3(1, 1, 1);
        this._highlights = new Vector3(1, 1, 1);
        this._limits = new Vector4(0, 0.33, 0.55, 1);
        this._enableLiftGammaGain = false;
        this._lift = new Vector3(0, 0, 0);
        this._gamma = new Vector3(1, 1, 1);
        this._gain = new Vector3(1, 1, 1);
        this._enableBalance = false;
        this._balance = new Vector3();
        this._tint = 0;
        this._temperature = 0;
        this._enableColorAdjust = false;
        this._postExposure = 1;
        this._contrast = 1;
        this._colorFilter = new Color(1, 1, 1);
        this._HueShift = 0;
        this._saturation = 1;
        this._HueSatCon = new Vector4(0, 1, 1, 0);
        this.default_balance = new Vector3(1, 1, 1);
        this.default_splitShadow = new Vector4(0.5, 0.5, 0.5, 0.0);
        this.default_splithighlights = new Vector3(0.5, 0.5, 0.5);
        this.default_shadow = new Vector3(1, 1, 1);
        this.default_midtones = new Vector3(1, 1, 1);
        this.default_highlight = new Vector3(1, 1, 1);
        this.default_limint = new Vector4(0.0, 0.3, 0.55, 1.0);
        this.default_lift = new Vector3(0, 0, 0);
        this.default_gamma = new Vector3(1, 1, 1);
        this.default_gain = new Vector3(1, 1, 1);
        this.default_ColorFilter = new Color(1, 1, 1, 1);
        this.default_HueSatCon = new Vector4(0, 1, 1, 0);
        this.singleton = true;
        this.active = true;
        this._needBuildLUT = true;
        this._toneMapping = ToneMappingType.None;
        this._blitlutParams = new Vector4();
        this._lutShaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this.lutSize = 32;
        this._lutCommond = new CommandBuffer();
        this._lutBuilderMat = new Material();
    }
    static init() {
        ColorGradEffect.__initDefine__();
        let attributeMap = {
            "a_PositionTexcoord": [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        let uniformMap = {
            "u_OffsetScale": ShaderDataType.Vector4,
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
        };
        let shader = Shader3D.add("blitLUTShader");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let pass = subShader.addShaderPass(BlitVS, BlitLUTShader);
        pass.renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        pass.renderState.depthWrite = false;
        pass.renderState.cull = RenderState.CULL_NONE;
        pass.renderState.blend = RenderState.BLEND_DISABLE;
    }
    static __initDefine__() {
        ColorGradEffect.SHADERDEFINE_ACES = Shader3D.getDefineByName("ACES");
        ColorGradEffect.SHADERDEFINE_CUSTOMLUT = Shader3D.getDefineByName("CUSTOMLUT");
        ColorGradEffect.SHADERVALUE_LUT = Shader3D.propertyNameToID("u_Lut");
        ColorGradEffect.SHADERVALUE_LUTPARAMS = Shader3D.propertyNameToID("u_LutParams");
        ColorGradEffect.SHADERVALUE_CUSTOMLUT = Shader3D.propertyNameToID("u_CustomLut");
        ColorGradEffect.SHADERVALUE_CUSTOMLUTPARAMS = Shader3D.propertyNameToID("u_CustomLutParams");
    }
    get toneMapping() {
        return this._toneMapping;
    }
    set toneMapping(value) {
        if (value == this._toneMapping)
            return;
        this._needBuildLUT = true;
        this._toneMapping = value;
    }
    get enableSplitTone() {
        return this._enableSplitTone;
    }
    set enableSplitTone(value) {
        this._enableSplitTone = value;
        this._needBuildLUT = true;
    }
    get splitShadow() {
        return this._splitShadow;
    }
    set splitShadow(value) {
        this._needBuildLUT = true;
        value.cloneTo(this._splitShadow);
    }
    get splithighlights() {
        return this._splithighlights;
    }
    set splithighlights(value) {
        if (this._splithighlights.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._splithighlights);
    }
    get splitBalance() {
        return this._splitBalance;
    }
    set splitBalance(value) {
        this._needBuildLUT = true;
        this._splitBalance = value;
    }
    get enableSMH() {
        return this._enableSMH;
    }
    set enableSMH(value) {
        this._needBuildLUT = true;
        this._enableSMH = value;
    }
    get shadows() {
        return this._shadows;
    }
    set shadows(value) {
        if (this._shadows.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._shadows);
    }
    get midtones() {
        return this._midtones;
    }
    set midtones(value) {
        if (this._midtones.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._midtones);
    }
    get highlights() {
        return this._highlights;
    }
    set highlights(value) {
        if (this._highlights.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._highlights);
    }
    get shadowLimitStart() {
        return this._limits.x;
    }
    set shadowLimitStart(value) {
        this._needBuildLUT = true;
        this._limits.x = Math.min(value, this.shadowLimitEnd);
    }
    get shadowLimitEnd() {
        return this._limits.y;
    }
    set shadowLimitEnd(value) {
        this._needBuildLUT = true;
        this._limits.y = Math.max(value, this.shadowLimitStart);
    }
    get highLightLimitStart() {
        return this._limits.z;
    }
    set highLightLimitStart(value) {
        this._needBuildLUT = true;
        this._limits.z = Math.min(value, this.highLightLimitEnd);
    }
    get highLightLimitEnd() {
        return this._limits.w;
    }
    set highLightLimitEnd(value) {
        this._needBuildLUT = true;
        this._limits.w = Math.max(this.highLightLimitStart, value);
    }
    get enableLiftGammaGain() {
        return this._enableLiftGammaGain;
    }
    set enableLiftGammaGain(value) {
        this._needBuildLUT = true;
        this._enableLiftGammaGain = value;
    }
    get lift() {
        return this._lift;
    }
    set lift(value) {
        if (this.lift.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._lift);
    }
    get gamma() {
        return this._gamma;
    }
    set gamma(value) {
        if (this._gamma.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._gamma);
    }
    get gain() {
        return this._gain;
    }
    set gain(value) {
        if (this._gain.equal(value))
            return;
        this._needBuildLUT = true;
        value.cloneTo(this._gain);
    }
    _StandardIlluminantY(x) {
        return 2.87 * x - 3 * x * x - 0.27509507;
    }
    ;
    _CIExyToLMS(x, y) {
        let Y = 1;
        let X = Y * x / y;
        let Z = Y * (1 - x - y) / y;
        let L = 0.7328 * X + 0.4296 * Y - 0.1624 * Z;
        let M = -0.7036 * X + 1.6975 * Y + 0.0061 * Z;
        let S = 0.0030 * X + 0.0136 * Y + 0.9834 * Z;
        return new Vector3(L, M, S);
    }
    _ColorBalanceToLMSCoeffs(temperature, tint) {
        let t1 = temperature / 65.0;
        let t2 = tint / 65.0;
        let x = 0.31271 - t1 * (t1 < 0 ? 0.1 : 0.05);
        let y = this._StandardIlluminantY(x) + t2 * 0.05;
        let w1 = new Vector3(0.949237, 1.03542, 1.08728);
        let w2 = this._CIExyToLMS(x, y);
        this._balance.set(w1.x / w2.x, w1.y / w2.y, w1.z / w2.z);
    }
    get enableBalance() {
        return this._enableBalance;
    }
    set enableBalance(value) {
        this._needBuildLUT = true;
        this._enableBalance = value;
    }
    get tint() {
        return this._tint;
    }
    set tint(value) {
        this._needBuildLUT = true;
        this._tint = value;
        this._ColorBalanceToLMSCoeffs(this._temperature, this._tint);
    }
    get temperature() {
        return this._temperature;
    }
    set temperature(value) {
        this._needBuildLUT = true;
        this._temperature = value;
        this._ColorBalanceToLMSCoeffs(this._temperature, this._tint);
    }
    get enableColorAdjust() {
        return this._enableColorAdjust;
    }
    set enableColorAdjust(value) {
        this._needBuildLUT = true;
        this._enableColorAdjust = value;
    }
    get postExposure() {
        return this._postExposure;
    }
    set postExposure(value) {
        this._postExposure = value;
    }
    get contrast() {
        return this._contrast;
    }
    set contrast(value) {
        this._needBuildLUT = true;
        this._contrast = value;
    }
    get colorFilter() {
        return this._colorFilter;
    }
    set colorFilter(value) {
        this._needBuildLUT = true;
        value.cloneTo(this._colorFilter);
    }
    get HueShift() {
        return this._HueShift;
    }
    set HueShift(value) {
        this._needBuildLUT = true;
        this._HueShift = value;
    }
    get saturation() {
        return this._saturation;
    }
    set saturation(value) {
        this._needBuildLUT = true;
        this._saturation = value;
    }
    get lutSize() {
        return this._lutSize;
    }
    set lutSize(value) {
        if (value > 32)
            return;
        this._lutSize = value;
        if (this._lutTex)
            this._lutTex.destroy();
        this._lutTex = new RenderTexture(this._lutSize * this._lutSize, this._lutSize, RenderTargetFormat.R16G16B16A16, null, false, 1, false, false);
        this._lutTex.anisoLevel = 1;
        this._lutTex.wrapModeU = WrapMode.Clamp;
        this._lutTex.wrapModeV = WrapMode.Clamp;
        this._lutTex.filterMode = FilterMode.Bilinear;
    }
    _buildLUT() {
        if (!this._needBuildLUT)
            return;
        let lutHeight = this.lutSize;
        let lutWidth = this.lutSize * this.lutSize;
        let lutParams = new Vector4(lutHeight, 0.5 / lutWidth, 0.5 / lutHeight, lutHeight / (lutHeight - 1));
        this._lutBuilderMat.setVector4("u_LutParams", lutParams);
        if (this.enableBalance) {
            this._ColorBalanceToLMSCoeffs(this.temperature, this.tint);
            this._lutBuilderMat.setVector3("u_ColorBalance", this._balance);
        }
        else {
            this._lutBuilderMat.setVector3("u_ColorBalance", this.default_balance);
        }
        if (this.enableSplitTone) {
            this._u_SplitShadow.setValue(this._splitShadow.x, this._splitShadow.y, this._splitShadow.z, this.splitBalance);
            this._lutBuilderMat.setVector4("u_SplitShadows", this._u_SplitShadow);
            this._lutBuilderMat.setVector3("u_Splithighlights", this._splithighlights);
        }
        else {
            this._lutBuilderMat.setVector4("u_SplitShadows", this.default_splitShadow);
            this._lutBuilderMat.setVector3("u_Splithighlights", this.default_splithighlights);
        }
        if (this.enableSMH) {
            this._lutBuilderMat.setVector3("u_Shadows", this._shadows);
            this._lutBuilderMat.setVector3("u_Midtones", this._midtones);
            this._lutBuilderMat.setVector3("u_Highlights", this._highlights);
            this._lutBuilderMat.setVector4("u_Limits", this._limits);
        }
        else {
            this._lutBuilderMat.setVector3("u_Shadows", this.default_shadow);
            this._lutBuilderMat.setVector3("u_Midtones", this.default_midtones);
            this._lutBuilderMat.setVector3("u_Highlights", this.default_highlight);
            this._lutBuilderMat.setVector4("u_Limits", this.default_limint);
        }
        if (this._enableLiftGammaGain) {
            this._lutBuilderMat.setVector3("u_Lift", this._lift);
            this._lutBuilderMat.setVector3("u_Gamma", this._gamma);
            this._lutBuilderMat.setVector3("u_Gain", this._gain);
        }
        else {
            this._lutBuilderMat.setVector3("u_Lift", this.default_lift);
            this._lutBuilderMat.setVector3("u_Gamma", this.default_gamma);
            this._lutBuilderMat.setVector3("u_Gain", this.default_gain);
        }
        if (this.enableColorAdjust) {
            this._HueSatCon.setValue(this._HueShift, this.saturation, this._contrast, 0.0);
            this._lutBuilderMat.setColor("u_ColorFilter", this._colorFilter);
            this._lutBuilderMat.setVector4("u_HueSatCon", this._HueSatCon);
        }
        else {
            this._lutBuilderMat.setColor("u_ColorFilter", this.default_ColorFilter);
            this._lutBuilderMat.setVector4("u_HueSatCon", this.default_HueSatCon);
        }
        if (this._toneMapping == ToneMappingType.ACES) {
            this._lutBuilderMat.addDefine(ColorGradEffect.SHADERDEFINE_ACES);
        }
        else {
            this._lutBuilderMat.removeDefine(ColorGradEffect.SHADERDEFINE_ACES);
        }
        this._lutCommond.blitScreenQuadByMaterial(Texture2D.whiteTexture, this._lutTex, null, this._lutBuilderMat);
        this._lutCommond.context = RenderContext3D._instance;
        this._lutCommond._apply();
        this._lutCommond.clear();
    }
    effectInit(postprocess) {
        super.effectInit(postprocess);
        this._lutBuilderMat.setShaderName("LUTBuilder");
        this._LUTShader = Shader3D.find("blitLUTShader");
        postprocess._enableColorGrad = true;
        postprocess._ColorGradEffect = this;
    }
    release(postprocess) {
        super.release(postprocess);
        postprocess._enableColorGrad = false;
        postprocess._ColorGradEffect = null;
    }
    render(context) {
        let cmd = context.command;
        let source = context.indirectTarget;
        if (true) {
            this._blitlutParams.setValue(1 / this._lutTex.width, 1 / this._lutTex.height, this._lutTex.height - 1, this.enableColorAdjust ? this._postExposure : 1);
            this._lutBuilderMat.removeDefine(ColorGradEffect.SHADERDEFINE_CUSTOMLUT);
            this._lutShaderData.setTexture(ColorGradEffect.SHADERVALUE_LUT, this._lutTex);
            this._lutShaderData.setVector(ColorGradEffect.SHADERVALUE_LUTPARAMS, this._blitlutParams);
        }
        else {
            this._lutBuilderMat.addDefine(ColorGradEffect.SHADERDEFINE_CUSTOMLUT);
        }
        cmd.blitScreenTriangle(source, context.destination, null, this._LUTShader, this._lutShaderData);
    }
}

//# sourceMappingURL=ColorGradEffect.js.map
