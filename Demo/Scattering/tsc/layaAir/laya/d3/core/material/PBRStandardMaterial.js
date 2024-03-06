import { PBRMaterial } from "./PBRMaterial";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
export var PBRMetallicSmoothnessSource;
(function (PBRMetallicSmoothnessSource) {
    PBRMetallicSmoothnessSource[PBRMetallicSmoothnessSource["MetallicGlossTextureAlpha"] = 0] = "MetallicGlossTextureAlpha";
    PBRMetallicSmoothnessSource[PBRMetallicSmoothnessSource["AlbedoTextureAlpha"] = 1] = "AlbedoTextureAlpha";
})(PBRMetallicSmoothnessSource || (PBRMetallicSmoothnessSource = {}));
export class PBRStandardMaterial extends PBRMaterial {
    constructor() {
        super();
        this._smoothnessSource = 0;
        this.setShaderName("PBR");
    }
    static __init__() {
        PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE = Shader3D.getDefineByName("METALLICGLOSSTEXTURE");
        PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA = Shader3D.getDefineByName("SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA");
        PBRStandardMaterial.METALLICGLOSSTEXTURE = Shader3D.propertyNameToID("u_MetallicGlossTexture");
        PBRStandardMaterial.METALLIC = Shader3D.propertyNameToID("u_Metallic");
    }
    get metallicGlossTexture() {
        return this._shaderValues.getTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE);
    }
    set metallicGlossTexture(value) {
        if (value)
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        else
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_METALLICGLOSSTEXTURE);
        this._shaderValues.setTexture(PBRStandardMaterial.METALLICGLOSSTEXTURE, value);
    }
    get metallic() {
        return this._shaderValues.getNumber(PBRStandardMaterial.METALLIC);
    }
    set metallic(value) {
        this._shaderValues.setNumber(PBRStandardMaterial.METALLIC, Math.max(0.0, Math.min(1.0, value)));
    }
    get smoothnessSource() {
        return this._smoothnessSource;
    }
    set smoothnessSource(value) {
        if (value)
            this._shaderValues.addDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
        else
            this._shaderValues.removeDefine(PBRStandardMaterial.SHADERDEFINE_SMOOTHNESSSOURCE_ALBEDOTEXTURE_ALPHA);
        this._smoothnessSource = value;
    }
    clone() {
        var dest = new PBRStandardMaterial();
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=PBRStandardMaterial.js.map
