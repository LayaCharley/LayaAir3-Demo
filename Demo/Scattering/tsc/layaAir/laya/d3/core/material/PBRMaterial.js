import { Material } from "./Material";
import { PBRRenderQuality } from "./PBRRenderQuality";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { PBRShaderLib } from "../../shader/pbr/PBRShaderLib";
export var PBRRenderMode;
(function (PBRRenderMode) {
    PBRRenderMode[PBRRenderMode["Opaque"] = 0] = "Opaque";
    PBRRenderMode[PBRRenderMode["Cutout"] = 1] = "Cutout";
    PBRRenderMode[PBRRenderMode["Fade"] = 2] = "Fade";
    PBRRenderMode[PBRRenderMode["Transparent"] = 3] = "Transparent";
})(PBRRenderMode || (PBRRenderMode = {}));
export class PBRMaterial extends Material {
    constructor() {
        super();
        this._shaderValues.setColor(PBRMaterial.ALBEDOCOLOR, new Color(1.0, 1.0, 1.0, 1.0));
        this._shaderValues.setColor(PBRMaterial.EMISSIONCOLOR, new Color(1.0, 1.0, 1.0, 1.0));
        this._shaderValues.setVector(PBRMaterial.TILINGOFFSET, new Vector4(1.0, 1.0, 0.0, 0.0));
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESS, 0.5);
        this._shaderValues.setNumber(PBRMaterial.OCCLUSIONSTRENGTH, 1.0);
        this._shaderValues.setNumber(PBRMaterial.NORMALSCALE, 1.0);
        this._shaderValues.setNumber(PBRMaterial.PARALLAXSCALE, 0.001);
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, 0.5);
        this.renderMode = PBRRenderMode.Opaque;
    }
    static __init__() {
        PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
        PBRMaterial.SHADERDEFINE_NORMALTEXTURE = Shader3D.getDefineByName("NORMALTEXTURE");
        PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE = Shader3D.getDefineByName("PARALLAXTEXTURE");
        PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE = Shader3D.getDefineByName("OCCLUSIONTEXTURE");
        PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE = Shader3D.getDefineByName("EMISSIONTEXTURE");
        PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND = Shader3D.getDefineByName("TRANSPARENTBLEND");
        PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_HIGH = Shader3D.getDefineByName("LAYA_PBR_BRDF_HIGH");
        PBRMaterial.SHADERDEFINE_LAYA_PBR_BRDF_LOW = Shader3D.getDefineByName("LAYA_PBR_BRDF_LOW");
        PBRMaterial.SHADERDEFINE_DETAILALBEDO = Shader3D.getDefineByName("DETAILTEXTURE");
        PBRMaterial.SHADERDEFINE_DETAILNORMAL = Shader3D.getDefineByName("DETAILNORMAL");
        PBRMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR = Shader3D.getDefineByName("ENABLEVERTEXCOLOR");
        PBRMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
        PBRMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
        PBRMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
        PBRMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
        PBRMaterial.NORMALSCALE = Shader3D.propertyNameToID("u_NormalScale");
        PBRMaterial.SMOOTHNESS = Shader3D.propertyNameToID("u_Smoothness");
        PBRMaterial.OCCLUSIONTEXTURE = Shader3D.propertyNameToID("u_OcclusionTexture");
        PBRMaterial.OCCLUSIONSTRENGTH = Shader3D.propertyNameToID("u_OcclusionStrength");
        PBRMaterial.PARALLAXTEXTURE = Shader3D.propertyNameToID("u_ParallaxTexture");
        PBRMaterial.PARALLAXSCALE = Shader3D.propertyNameToID("u_ParallaxScale");
        PBRMaterial.EMISSIONTEXTURE = Shader3D.propertyNameToID("u_EmissionTexture");
        PBRMaterial.EMISSIONCOLOR = Shader3D.propertyNameToID("u_EmissionColor");
        PBRMaterial.EMISSIONIntensity = Shader3D.propertyNameToID("u_EmissionIntensity");
        PBRMaterial.DETAILALBEDOTEXTURE = Shader3D.propertyNameToID("u_DetailAlbedoTexture");
        PBRMaterial.DETAILNORMALTEXTURE = Shader3D.propertyNameToID("u_DetailNormalTexture");
        PBRMaterial.DETAILTILLINGOFFSET = Shader3D.propertyNameToID("u_DetailTillingOffset");
        PBRMaterial.DETAILNORMALSCALE = Shader3D.propertyNameToID("u_DetailNormalScale");
        PBRMaterial.CLEARCOAT = Shader3D.propertyNameToID("u_ClearCoatFactor");
        PBRMaterial.SHADERDEFINE_CLEARCOATTEXTURE = Shader3D.getDefineByName("CLEARCOATMAP");
        PBRMaterial.CLEARCOATTEXTURE = Shader3D.propertyNameToID("u_ClearCoatTexture");
        PBRMaterial.CLEARCOATROUGHNESS = Shader3D.propertyNameToID("u_ClearCoatRoughness");
        PBRMaterial.SHADERDEFINE_CLEARCOATROUGHNESSTEXTURE = Shader3D.getDefineByName("CLEARCOAT_ROUGHNESSMAP");
        PBRMaterial.CLEARCOATROUGHNESSTEXTURE = Shader3D.propertyNameToID("u_ClearCoatRoughnessTexture");
        PBRMaterial.CLEARCOATNORMALTEXTURE = Shader3D.propertyNameToID("u_ClearCoatNormalTexture");
        PBRMaterial.ANISOTROPY = Shader3D.propertyNameToID("u_AnisotropyStrength");
        PBRMaterial.SHADERDEFINE_ANISOTROPYTEXTURE = Shader3D.getDefineByName("ANISOTROPYMAP");
        PBRMaterial.ANISOTROPYTEXTURE = Shader3D.propertyNameToID("u_AnisotropyTexture");
        PBRMaterial.ANISOTROPYROTATION = Shader3D.propertyNameToID("u_AnisotropyRotation");
    }
    get albedoColor() {
        return this._shaderValues.getColor(PBRMaterial.ALBEDOCOLOR);
    }
    set albedoColor(value) {
        this._shaderValues.setColor(PBRMaterial.ALBEDOCOLOR, value);
    }
    get albedoTexture() {
        if (this.hasDefine(PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE)) {
            return this._shaderValues.getTexture(PBRMaterial.ALBEDOTEXTURE);
        }
        else {
            return null;
        }
    }
    set albedoTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.ALBEDOTEXTURE, value);
    }
    get normalTexture() {
        if (this.hasDefine(PBRMaterial.SHADERDEFINE_NORMALTEXTURE)) {
            return this._shaderValues.getTexture(PBRMaterial.NORMALTEXTURE);
        }
        else {
            return null;
        }
    }
    set normalTexture(value) {
        if (value) {
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        else {
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_NORMALTEXTURE);
        }
        this._shaderValues.setTexture(PBRMaterial.NORMALTEXTURE, value);
    }
    get normalTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.NORMALSCALE);
    }
    set normalTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.NORMALSCALE, value);
    }
    get parallaxTexture() {
        return this._shaderValues.getTexture(PBRMaterial.PARALLAXTEXTURE);
    }
    set parallaxTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_PARALLAXTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.PARALLAXTEXTURE, value);
    }
    get parallaxTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.PARALLAXSCALE);
    }
    set parallaxTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.PARALLAXSCALE, Math.max(0.005, Math.min(0.08, value)));
    }
    get occlusionTexture() {
        return this._shaderValues.getTexture(PBRMaterial.OCCLUSIONTEXTURE);
    }
    set occlusionTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_OCCLUSIONTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.OCCLUSIONTEXTURE, value);
    }
    get occlusionTextureStrength() {
        return this._shaderValues.getNumber(PBRMaterial.OCCLUSIONSTRENGTH);
    }
    set occlusionTextureStrength(value) {
        this._shaderValues.setNumber(PBRMaterial.OCCLUSIONSTRENGTH, Math.max(0.0, Math.min(1.0, value)));
    }
    get smoothness() {
        return this._shaderValues.getNumber(PBRMaterial.SMOOTHNESS);
    }
    set smoothness(value) {
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESS, Math.max(0.0, Math.min(1.0, value)));
    }
    get enableVertexColor() {
        return this.hasDefine(PBRMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    set enableVertexColor(value) {
        if (value)
            this.addDefine(PBRMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
        else
            this.removeDefine(PBRMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    get enableEmission() {
        return this._shaderValues.hasDefine(PBRShaderLib.DEFINE_EMISSION);
    }
    set enableEmission(value) {
        if (value)
            this._shaderValues.addDefine(PBRShaderLib.DEFINE_EMISSION);
        else
            this._shaderValues.removeDefine(PBRShaderLib.DEFINE_EMISSION);
    }
    get emissionColor() {
        return this._shaderValues.getColor(PBRMaterial.EMISSIONCOLOR);
    }
    set emissionColor(value) {
        this._shaderValues.setColor(PBRMaterial.EMISSIONCOLOR, value);
    }
    set emissionIntensity(value) {
        this._shaderValues.setNumber(PBRMaterial.EMISSIONIntensity, value);
    }
    get emissionIntensity() {
        return this._shaderValues.getNumber(PBRMaterial.EMISSIONIntensity);
    }
    get emissionTexture() {
        return this._shaderValues.getTexture(PBRMaterial.EMISSIONTEXTURE);
    }
    set emissionTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_EMISSIONTEXTURE);
        this._shaderValues.setTexture(PBRMaterial.EMISSIONTEXTURE, value);
    }
    get tilingOffset() {
        return this._shaderValues.getVector(PBRMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            this._shaderValues.setVector(PBRMaterial.TILINGOFFSET, value);
        }
        else {
            this._shaderValues.getVector(PBRMaterial.TILINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    get detailAlbedoTexture() {
        return this._shaderValues.getTexture(PBRMaterial.DETAILALBEDOTEXTURE);
    }
    set detailAlbedoTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_DETAILALBEDO);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_DETAILALBEDO);
        this._shaderValues.setTexture(PBRMaterial.DETAILALBEDOTEXTURE, value);
    }
    get detailNormalTexture() {
        return this._shaderValues.getTexture(PBRMaterial.DETAILNORMALTEXTURE);
    }
    set detailNormalTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_DETAILNORMAL);
        else
            this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_DETAILNORMAL);
        this._shaderValues.setTexture(PBRMaterial.DETAILNORMALTEXTURE, value);
    }
    get detailTilingOffset() {
        return this._shaderValues.getVector(PBRMaterial.DETAILTILLINGOFFSET);
    }
    set detailTilingOffset(value) {
        if (value) {
            this._shaderValues.setVector(PBRMaterial.DETAILTILLINGOFFSET, value);
        }
        else {
            this._shaderValues.getVector(PBRMaterial.DETAILTILLINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    get detailNormalScale() {
        return this._shaderValues.getNumber(PBRMaterial.DETAILNORMALSCALE);
    }
    set detailNormalScale(value) {
        this._shaderValues.setNumber(PBRMaterial.DETAILNORMALSCALE, value);
    }
    set renderMode(value) {
        switch (value) {
            case PBRRenderMode.Opaque:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Cutout:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Fade:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            case PBRRenderMode.Transparent:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_ONE;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(PBRMaterial.SHADERDEFINE_TRANSPARENTBLEND);
                break;
            default:
                throw new Error("PBRMaterial:unknown renderMode value.");
        }
    }
    get anisotropyEnable() {
        return this.shaderData.hasDefine(PBRShaderLib.DEFINE_ANISOTROPY);
    }
    set anisotropyEnable(value) {
        if (value) {
            this.shaderData.addDefine(PBRShaderLib.DEFINE_ANISOTROPY);
        }
        else {
            this.shaderData.removeDefine(PBRShaderLib.DEFINE_ANISOTROPY);
        }
    }
    get anisotropy() {
        return this.getFloatByIndex(PBRMaterial.ANISOTROPY);
    }
    set anisotropy(value) {
        this.setFloatByIndex(PBRMaterial.ANISOTROPY, Math.min(1, Math.max(-1, value)));
    }
    get anisotropyTexture() {
        return this.getTextureByIndex(PBRMaterial.ANISOTROPYTEXTURE);
    }
    set anisotropyTexture(value) {
        this.setTextureByIndex(PBRMaterial.ANISOTROPYTEXTURE, value);
        if (value) {
            this.addDefine(PBRMaterial.SHADERDEFINE_ANISOTROPYTEXTURE);
        }
        else {
            this.removeDefine(PBRMaterial.SHADERDEFINE_ANISOTROPYTEXTURE);
        }
    }
    get anisotropyRotation() {
        return this.getFloatByIndex(PBRMaterial.ANISOTROPYROTATION);
    }
    set anisotropyRotation(value) {
        value = Math.max(Math.min(value, 1.0), 0.0);
        this.setFloatByIndex(PBRMaterial.ANISOTROPYROTATION, value);
    }
    get clearCoatEnable() {
        return this.shaderData.hasDefine(PBRShaderLib.DEFINE_CLEARCOAT);
    }
    set clearCoatEnable(value) {
        if (value) {
            this.shaderData.addDefine(PBRShaderLib.DEFINE_CLEARCOAT);
        }
        else {
            this.shaderData.removeDefine(PBRShaderLib.DEFINE_CLEARCOAT);
        }
    }
    get clearCoat() {
        return this.shaderData.getNumber(PBRMaterial.CLEARCOAT);
    }
    set clearCoat(value) {
        this.shaderData.setNumber(PBRMaterial.CLEARCOAT, value);
    }
    get clearCoatTexture() {
        return this.shaderData.getTexture(PBRMaterial.CLEARCOATTEXTURE);
    }
    set clearCoatTexture(value) {
        if (value) {
            this.shaderData.addDefine(PBRMaterial.SHADERDEFINE_CLEARCOATTEXTURE);
        }
        else {
            this.shaderData.removeDefine(PBRMaterial.SHADERDEFINE_CLEARCOATTEXTURE);
        }
        this.shaderData.setTexture(PBRMaterial.CLEARCOATTEXTURE, value);
    }
    get clearCoatRoughness() {
        return this.shaderData.getNumber(PBRMaterial.CLEARCOATROUGHNESS);
    }
    set clearCoatRoughness(value) {
        this.shaderData.setNumber(PBRMaterial.CLEARCOATROUGHNESS, value);
    }
    get clearCoatRoughnessTexture() {
        return this.shaderData.getTexture(PBRMaterial.CLEARCOATROUGHNESSTEXTURE);
    }
    set clearCoatRoughnessTexture(value) {
        if (value) {
            this.shaderData.addDefine(PBRMaterial.SHADERDEFINE_CLEARCOATROUGHNESSTEXTURE);
        }
        else {
            this.shaderData.removeDefine(PBRMaterial.SHADERDEFINE_CLEARCOATROUGHNESSTEXTURE);
        }
        this.shaderData.setTexture(PBRMaterial.CLEARCOATROUGHNESSTEXTURE, value);
    }
    get clearCoatNormalTexture() {
        return this.shaderData.getTexture(PBRMaterial.CLEARCOATNORMALTEXTURE);
    }
    set clearCoatNormalTexture(value) {
        if (value) {
            this.shaderData.addDefine(PBRShaderLib.DEFINE_CLEARCOAT_NORMAL);
        }
        else {
            this.shaderData.removeDefine(PBRShaderLib.DEFINE_CLEARCOAT_NORMAL);
        }
        this.shaderData.setTexture(PBRMaterial.CLEARCOATNORMALTEXTURE, value);
    }
    get smoothnessTextureScale() {
        return this._shaderValues.getNumber(PBRMaterial.SMOOTHNESS);
    }
    set smoothnessTextureScale(value) {
        this._shaderValues.setNumber(PBRMaterial.SMOOTHNESS, Math.max(0.0, Math.min(1.0, value)));
    }
}
PBRMaterial.renderQuality = PBRRenderQuality.High;

//# sourceMappingURL=PBRMaterial.js.map
