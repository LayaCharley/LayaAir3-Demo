import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "./Material";
export class BlinnPhongMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("BLINNPHONG");
        this.renderMode = BlinnPhongMaterial.RENDERMODE_OPAQUE;
    }
    static __initDefine__() {
        BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP = Shader3D.getDefineByName("DIFFUSEMAP");
        BlinnPhongMaterial.SHADERDEFINE_NORMALMAP = Shader3D.getDefineByName("NORMALMAP");
        BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP = Shader3D.getDefineByName("SPECULARMAP");
        BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR = Shader3D.getDefineByName("ENABLEVERTEXCOLOR");
        BlinnPhongMaterial.SHADERDEFINE_ENABLETRANSMISSION = Shader3D.getDefineByName("ENABLETRANSMISSION");
        BlinnPhongMaterial.SHADERDEFINE_THICKNESSMAP = Shader3D.getDefineByName("THICKNESSMAP");
        BlinnPhongMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_DiffuseTexture");
        BlinnPhongMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_NormalTexture");
        BlinnPhongMaterial.SPECULARTEXTURE = Shader3D.propertyNameToID("u_SpecularTexture");
        BlinnPhongMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_DiffuseColor");
        BlinnPhongMaterial.MATERIALSPECULAR = Shader3D.propertyNameToID("u_MaterialSpecular");
        BlinnPhongMaterial.SHININESS = Shader3D.propertyNameToID("u_Shininess");
        BlinnPhongMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
        BlinnPhongMaterial.TRANSMISSIONRATE = Shader3D.propertyNameToID("u_TransmissionRate");
        BlinnPhongMaterial.IBACKDIFFUSE = Shader3D.propertyNameToID("u_BackDiffuse");
        BlinnPhongMaterial.IBACKSCALE = Shader3D.propertyNameToID("u_BackScale");
        BlinnPhongMaterial.THINKNESSTEXTURE = Shader3D.propertyNameToID("u_ThinknessTexture");
        BlinnPhongMaterial.TRANSMISSIONCOLOR = Shader3D.propertyNameToID("u_TransmissionColor");
        BlinnPhongMaterial.AlbedoIntensity = Shader3D.propertyNameToID("u_AlbedoIntensity");
    }
    set renderMode(value) {
        switch (value) {
            case BlinnPhongMaterial.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case BlinnPhongMaterial.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case BlinnPhongMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            default:
                throw new Error("Material:renderMode value error.");
        }
    }
    get enableVertexColor() {
        return this.hasDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    set enableVertexColor(value) {
        if (value)
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
        else
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    get tilingOffset() {
        return this.getVector4ByIndex(BlinnPhongMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            this.setVector4ByIndex(BlinnPhongMaterial.TILINGOFFSET, value);
        }
        else {
            this.getVector4ByIndex(BlinnPhongMaterial.TILINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    get albedoColor() {
        return this.getColorByIndex(BlinnPhongMaterial.ALBEDOCOLOR);
    }
    set albedoColor(value) {
        this.setColorByIndex(BlinnPhongMaterial.ALBEDOCOLOR, value);
    }
    get albedoIntensity() {
        return this.getFloatByIndex(BlinnPhongMaterial.AlbedoIntensity);
    }
    set albedoIntensity(value) {
        this.setFloatByIndex(BlinnPhongMaterial.AlbedoIntensity, value);
    }
    get specularColor() {
        return this.getColorByIndex(BlinnPhongMaterial.MATERIALSPECULAR);
    }
    set specularColor(value) {
        this.setColorByIndex(BlinnPhongMaterial.MATERIALSPECULAR, value);
    }
    get shininess() {
        return this.getFloatByIndex(BlinnPhongMaterial.SHININESS);
    }
    set shininess(value) {
        value = Math.max(0.0, Math.min(1.0, value));
        this.setFloatByIndex(BlinnPhongMaterial.SHININESS, value);
    }
    get albedoTexture() {
        return this.getTextureByIndex(BlinnPhongMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value)
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP);
        else
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_DIFFUSEMAP);
        this.setTextureByIndex(BlinnPhongMaterial.ALBEDOTEXTURE, value);
    }
    get normalTexture() {
        return this.getTextureByIndex(BlinnPhongMaterial.NORMALTEXTURE);
    }
    set normalTexture(value) {
        if (value) {
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_NORMALMAP);
        }
        else {
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_NORMALMAP);
        }
        this.setTextureByIndex(BlinnPhongMaterial.NORMALTEXTURE, value);
    }
    get specularTexture() {
        return this.getTextureByIndex(BlinnPhongMaterial.SPECULARTEXTURE);
    }
    set specularTexture(value) {
        if (value)
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP);
        else
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_SPECULARMAP);
        this.setTextureByIndex(BlinnPhongMaterial.SPECULARTEXTURE, value);
    }
    get enableTransmission() {
        return this.hasDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLETRANSMISSION);
    }
    set enableTransmission(value) {
        if (value)
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLETRANSMISSION);
        else
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_ENABLETRANSMISSION);
    }
    get transmissionRata() {
        return this.getFloatByIndex(BlinnPhongMaterial.TRANSMISSIONRATE);
    }
    set transmissionRata(value) {
        this.setFloatByIndex(BlinnPhongMaterial.TRANSMISSIONRATE, value);
    }
    get backDiffuse() {
        return this.getFloatByIndex(BlinnPhongMaterial.IBACKDIFFUSE);
    }
    set backDiffuse(value) {
        this.setFloatByIndex(BlinnPhongMaterial.IBACKDIFFUSE, Math.max(value, 1.0));
    }
    get backScale() {
        return this.getFloatByIndex(BlinnPhongMaterial.IBACKSCALE);
    }
    set backScale(value) {
        this.setFloatByIndex(BlinnPhongMaterial.IBACKSCALE, value);
    }
    get thinknessTexture() {
        return this.getTextureByIndex(BlinnPhongMaterial.THINKNESSTEXTURE);
    }
    set thinknessTexture(value) {
        if (value)
            this.addDefine(BlinnPhongMaterial.SHADERDEFINE_THICKNESSMAP);
        else
            this.removeDefine(BlinnPhongMaterial.SHADERDEFINE_THICKNESSMAP);
        this.setTextureByIndex(BlinnPhongMaterial.THINKNESSTEXTURE, value);
    }
    get transmissionColor() {
        return this.getColorByIndex(BlinnPhongMaterial.TRANSMISSIONCOLOR);
    }
    set transmissionColor(value) {
        this.setColorByIndex(BlinnPhongMaterial.TRANSMISSIONCOLOR, value);
    }
    get transmissionRate() {
        return this.getFloatByIndex(BlinnPhongMaterial.TRANSMISSIONRATE);
    }
    clone() {
        var dest = new BlinnPhongMaterial();
        this.cloneTo(dest);
        return dest;
    }
    cloneTo(destObject) {
        super.cloneTo(destObject);
        var destMaterial = destObject;
        destMaterial.albedoIntensity = this.albedoIntensity;
        destMaterial.enableVertexColor = this.enableVertexColor;
        this.albedoColor.cloneTo(destMaterial.albedoColor);
    }
}
BlinnPhongMaterial.RENDERMODE_OPAQUE = 0;
BlinnPhongMaterial.RENDERMODE_CUTOUT = 1;
BlinnPhongMaterial.RENDERMODE_TRANSPARENT = 2;

//# sourceMappingURL=BlinnPhongMaterial.js.map
