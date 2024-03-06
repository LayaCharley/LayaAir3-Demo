import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { SubShader } from "../../RenderEngine/RenderShader/SubShader";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import glTFMetallicRoughnessGLSL from "./glTFMetallicRoughness.glsl";
import glTFPBRVS from "./glTFPBR.vs";
import glTFPBRFS from "./glTFPBR.fs";
import DepthVS from "./glTFPBRDepth.vs";
import DephtFS from "./glTFPBRDepth.fs";
import DepthNormalVS from "./glTFPBRDepthNormal.vs";
import DepthNormalFS from "./glTFPBRDepthNormal.fs";
import { Matrix3x3 } from "../../maths/Matrix3x3";
export class glTFShader {
    static init() {
        this.Define_BaseColorMap = Shader3D.getDefineByName("BASECOLORMAP");
        this.Define_BaseColorMapTransform = Shader3D.getDefineByName("BASECOLORMAP_TRANSFORM");
        this.Define_MetallicRoughnessMap = Shader3D.getDefineByName("METALLICROUGHNESSMAP");
        this.Define_MetallicRoughnessMapTransform = Shader3D.getDefineByName("METALLICROUGHNESSMAP_TRANSFORM");
        this.Define_NormalMap = Shader3D.getDefineByName("NORMALMAP");
        this.Define_NormalMapTransform = Shader3D.getDefineByName("NORMALMAP_TRANSFORM");
        this.Define_OcclusionMap = Shader3D.getDefineByName("OCCLUSIONMAP");
        this.Define_OcclusionMapTransform = Shader3D.getDefineByName("OCCLUSIONMAP_TRANSFORM");
        this.Define_EmissionMap = Shader3D.getDefineByName("EMISSIONMAP");
        this.Define_EmissionMapTransform = Shader3D.getDefineByName("EMISSIONMAP_TRANSFORM");
        this.Define_ClearCoatMap = Shader3D.getDefineByName("CLEARCOATMAP");
        this.Define_ClearCoatMapTransform = Shader3D.getDefineByName("CLEARCOATMAP_TRANSFORM");
        this.Define_ClearCoatRoughnessMap = Shader3D.getDefineByName("CLEARCOAT_ROUGHNESSMAP");
        this.Define_ClearCoatRoughnessMapTransform = Shader3D.getDefineByName("CLEARCOAT_ROUGHNESSMAP_TRANSFORM");
        this.Define_ClearCoatNormalMapTransform = Shader3D.getDefineByName("CLEARCOAT_NORMALMAP_TRANSFORM");
        this.Define_AnisotropyMap = Shader3D.getDefineByName("ANISOTROPYMAP");
        this.Define_AnisotropyMapTransform = Shader3D.getDefineByName("ANISOTROPYMAP_TRANSFORM");
        this.Define_IridescenceMap = Shader3D.getDefineByName("IRIDESCENCEMAP");
        this.Define_IridescenceMapTransform = Shader3D.getDefineByName("IRIDESCENCEMAP_TRANSFORM");
        this.Define_IridescenceThicknessMap = Shader3D.getDefineByName("IRIDESCENCE_THICKNESSMAP");
        this.Define_IridescenceThicknessMapTransform = Shader3D.getDefineByName("IRIDESCENCE_THICKNESSMAP_TRANSFORM");
        this.Define_SheenColorMap = Shader3D.getDefineByName("SHEENCOLORMAP");
        this.Define_SheenColorMapTransform = Shader3D.getDefineByName("SHEENCOLORMAP_TRANSFORM");
        this.Define_SheenRoughnessMap = Shader3D.getDefineByName("SHEEN_ROUGHNESSMAP");
        this.Define_SheenRoughnessMapTransform = Shader3D.getDefineByName("SHEEN_ROUGHNESSMAP_TRANSFORM");
        this.Define_TransmissionMap = Shader3D.getDefineByName("TRANSMISSIONMAP");
        this.Define_TransmissionMapTransform = Shader3D.getDefineByName("TRANSMISSIONMAP_TRANSFORM");
        this.Define_Volume = Shader3D.getDefineByName("VOLUME");
        this.Define_VolumeThicknessMap = Shader3D.getDefineByName("VOLUME_THICKNESSMAP");
        this.Define_VolumeThicknessMapTransform = Shader3D.getDefineByName("VOLUME_THICKNESSMAP_TRANSFORM");
        this.Define_SpecularFactorMap = Shader3D.getDefineByName("SPECULARFACTORMAP");
        this.Define_SpecularFactorMapTransform = Shader3D.getDefineByName("SPECULARFACTORMAP_TRANSFORM");
        this.Define_SpecularColorMap = Shader3D.getDefineByName("SPECULARCOLORMAP");
        this.Define_SpecularColorMapTransform = Shader3D.getDefineByName("SPECULARCOLORMAP_TRANSFORM");
        let shader = Shader3D.find(glTFShader.name);
        if (shader) {
            return;
        }
        Shader3D.addInclude("glTFMetallicRoughness.glsl", glTFMetallicRoughnessGLSL);
        let uniformMap = {
            "u_AlphaTestValue": ShaderDataType.Float,
            "u_BaseColorFactor": ShaderDataType.Vector4,
            "u_BaseColorTexture": ShaderDataType.Texture2D,
            "u_BaseColorMapTransform": ShaderDataType.Matrix3x3,
            "u_Specular": ShaderDataType.Float,
            "u_MetallicFactor": ShaderDataType.Float,
            "u_RoughnessFactor": ShaderDataType.Float,
            "u_MetallicRoughnessTexture": ShaderDataType.Texture2D,
            "u_MetallicRoughnessMapTransform": ShaderDataType.Matrix3x3,
            "u_NormalTexture": ShaderDataType.Texture2D,
            "u_NormalMapTransform": ShaderDataType.Matrix3x3,
            "u_NormalScale": ShaderDataType.Float,
            "u_OcclusionTexture": ShaderDataType.Texture2D,
            "u_OcclusionMapTransform": ShaderDataType.Matrix3x3,
            "u_OcclusionStrength": ShaderDataType.Float,
            "u_EmissionFactor": ShaderDataType.Vector3,
            "u_EmissionTexture": ShaderDataType.Texture2D,
            "u_EmissionMapTransform": ShaderDataType.Matrix3x3,
            "u_EmissionStrength": ShaderDataType.Float,
            "u_ClearCoatFactor": ShaderDataType.Float,
            "u_ClearCoatTexture": ShaderDataType.Texture2D,
            "u_ClearCoatMapTransform": ShaderDataType.Matrix3x3,
            "u_ClearCoatRoughness": ShaderDataType.Float,
            "u_ClearCoatRoughnessTexture": ShaderDataType.Texture2D,
            "u_ClearCoatRoughnessMapTransform": ShaderDataType.Matrix3x3,
            "u_ClearCoatNormalTexture": ShaderDataType.Texture2D,
            "u_ClearCoatNormalMapTransform": ShaderDataType.Matrix3x3,
            "u_ClearCoatNormalScale": ShaderDataType.Float,
            "u_AnisotropyStrength": ShaderDataType.Float,
            "u_AnisotropyRotation": ShaderDataType.Float,
            "u_AnisotropyTexture": ShaderDataType.Texture2D,
            "u_AnisotropyMapTransform": ShaderDataType.Matrix3x3,
            "u_Ior": ShaderDataType.Float,
            "u_IridescenceFactor": ShaderDataType.Float,
            "u_IridescenceTexture": ShaderDataType.Texture2D,
            "u_IridescenceMapTransform": ShaderDataType.Matrix3x3,
            "u_IridescenceIor": ShaderDataType.Float,
            "u_IridescenceThicknessMinimum": ShaderDataType.Float,
            "u_IridescenceThicknessMaximum": ShaderDataType.Float,
            "u_IridescenceThicknessTexture": ShaderDataType.Texture2D,
            "u_IridescenceThicknessMapTransform": ShaderDataType.Matrix3x3,
            "u_SheenColorFactor": ShaderDataType.Vector3,
            "u_SheenColorTexture": ShaderDataType.Texture2D,
            "u_SheenColorMapTransform": ShaderDataType.Matrix3x3,
            "u_SheenRoughness": ShaderDataType.Float,
            "u_SheenRoughnessTexture": ShaderDataType.Texture2D,
            "u_SheenRoughnessMapTransform": ShaderDataType.Matrix3x3,
            "u_TransmissionFactor": ShaderDataType.Float,
            "u_TransmissionTexture": ShaderDataType.Texture2D,
            "u_TransmissionMapTransform": ShaderDataType.Matrix3x3,
            "u_VolumeThicknessFactor": ShaderDataType.Float,
            "u_VolumeThicknessTexture": ShaderDataType.Texture2D,
            "u_VoluemThicknessMapTransform": ShaderDataType.Matrix3x3,
            "u_VolumeAttenuationDistance": ShaderDataType.Float,
            "u_VolumeAttenuationColor": ShaderDataType.Vector3,
            "u_SpecularFactor": ShaderDataType.Float,
            "u_SpecularFactorTexture": ShaderDataType.Texture2D,
            "u_SpecularFactorMapTransfrom": ShaderDataType.Matrix3x3,
            "u_SpecularColorFactor": ShaderDataType.Vector3,
            "u_SpecularColorTexture": ShaderDataType.Texture2D,
            "u_SpecularColorMapTransform": ShaderDataType.Matrix3x3,
        };
        let defaultValue = {
            "u_AlphaTestValue": 0.5,
            "u_BaseColorFactor": Vector4.ONE,
            "u_BaseColorMapTransform": Matrix3x3.DEFAULT,
            "u_Specular": 0.5,
            "u_MetallicFactor": 1.0,
            "u_RoughnessFactor": 1.0,
            "u_MetallicRoughnessMapTransform": Matrix3x3.DEFAULT,
            "u_NormalMapTransform": Matrix3x3.DEFAULT,
            "u_NormalScale": 1.0,
            "u_OcclusionMapTransform": Matrix3x3.DEFAULT,
            "u_OcclusionStrength": 1.0,
            "u_EmissionFactor": Vector3.ZERO,
            "u_EmissionMapTransform": Matrix3x3.DEFAULT,
            "u_EmissionStrength": 1.0,
            "u_SpecularFactor": 1.0,
            "u_SpecularFactorMapTransfrom": Matrix3x3.DEFAULT,
            "u_SpecularColorFactor": Vector3.ONE,
            "u_SpecularColorMapTransform": Matrix3x3.DEFAULT,
            "u_Ior": 1.5,
            "u_ClearCoatFactor": 0.0,
            "u_ClearCoatMapTransform": Matrix3x3.DEFAULT,
            "u_ClearCoatRoughness": 0.0,
            "u_ClearCoatRoughnessMapTransform": Matrix3x3.DEFAULT,
            "u_ClearCoatNormalMapTransform": Matrix3x3.DEFAULT,
            "u_ClearCoatNormalScale": 1.0,
            "u_AnisotropyStrength": 0.0,
            "u_AnisotropyRotation": 0.0,
            "u_AnisotropyMapTransform": Matrix3x3.DEFAULT,
            "u_IridescenceFactor": 0.0,
            "u_IridescenceMapTransform": Matrix3x3.DEFAULT,
            "u_IridescenceIor": 1.33,
            "u_IridescenceThicknessMinimum": 100,
            "u_IridescenceThicknessMaximum": 400,
            "u_IridescenceThicknessMapTransform": Matrix3x3.DEFAULT,
            "u_SheenColorFactor": Vector3.ZERO,
            "u_SheenColorMapTransform": Matrix3x3.DEFAULT,
            "u_SheenRoughness": 0.0,
            "u_SheenRoughnessMapTransform": Matrix3x3.DEFAULT,
            "u_TransmissionFactor": 0.0,
            "u_TransmissionMapTransform": Matrix3x3.DEFAULT,
        };
        shader = Shader3D.add("glTFPBR", true, true);
        let subShader = new SubShader(SubShader.DefaultAttributeMap, uniformMap, defaultValue);
        shader.addSubShader(subShader);
        let shadingPass = subShader.addShaderPass(glTFPBRVS, glTFPBRFS);
        let depthPass = subShader.addShaderPass(DepthVS, DephtFS, "ShadowCaster");
        let dephtNormalPass = subShader.addShaderPass(DepthNormalVS, DepthNormalFS, "DepthNormal");
    }
}
glTFShader.ShaderName = "glTFPBR";

//# sourceMappingURL=glTFShader.js.map
