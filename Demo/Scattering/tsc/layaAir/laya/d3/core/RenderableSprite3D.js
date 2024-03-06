import { Sprite3D } from "./Sprite3D";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { LayaGL } from "../../layagl/LayaGL";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
export class RenderableSprite3D extends Sprite3D {
    constructor(name) {
        super(name);
    }
    static __init__() {
        RenderableSprite3D.SHADERDEFINE_RECEIVE_SHADOW = Shader3D.getDefineByName("RECEIVESHADOW");
        RenderableSprite3D.SAHDERDEFINE_LIGHTMAP = Shader3D.getDefineByName("LIGHTMAP");
        RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL = Shader3D.getDefineByName("LIGHTMAP_DIRECTIONAL");
        RenderableSprite3D.LIGHTMAPSCALEOFFSET = Shader3D.propertyNameToID("u_LightmapScaleOffset");
        RenderableSprite3D.LIGHTMAP = Shader3D.propertyNameToID("u_LightMap");
        RenderableSprite3D.LIGHTMAP_DIRECTION = Shader3D.propertyNameToID("u_LightMapDirection");
        RenderableSprite3D.PICKCOLOR = Shader3D.propertyNameToID("u_PickColor");
        RenderableSprite3D.REFLECTIONCUBE_PROBEPOSITION = Shader3D.propertyNameToID("u_SpecCubeProbePosition");
        RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMAX = Shader3D.propertyNameToID("u_SpecCubeBoxMax");
        RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMIN = Shader3D.propertyNameToID("u_SpecCubeBoxMin");
        RenderableSprite3D.VOLUMETRICGI_PROBECOUNTS = Shader3D.propertyNameToID("u_VolumetricGI.probeCounts");
        RenderableSprite3D.VOLUMETRICGI_PROBESTEPS = Shader3D.propertyNameToID("u_VolumetricGI.probeStep");
        RenderableSprite3D.VOLUMETRICGI_PROBESTARTPOS = Shader3D.propertyNameToID("u_VolumetricGI.probeStartPosition");
        RenderableSprite3D.VOLUMETRICGI_PROBEPARAMS = Shader3D.propertyNameToID("u_VolumetricGI.probeParams");
        RenderableSprite3D.VOLUMETRICGI_IRRADIANCE = Shader3D.propertyNameToID("u_ProbeIrradiance");
        RenderableSprite3D.VOLUMETRICGI_DISTANCE = Shader3D.propertyNameToID("u_ProbeDistance");
        RenderableSprite3D.AMBIENTCOLOR = Shader3D.propertyNameToID("u_AmbientColor");
        RenderableSprite3D.AMBIENTSH = Shader3D.propertyNameToID("u_IblSH");
        RenderableSprite3D.AMBIENTINTENSITY = Shader3D.propertyNameToID("u_AmbientIntensity");
        RenderableSprite3D.REFLECTIONINTENSITY = Shader3D.propertyNameToID("u_ReflectionIntensity");
        RenderableSprite3D.IBLTEX = Shader3D.propertyNameToID("u_IBLTex");
        RenderableSprite3D.IBLROUGHNESSLEVEL = Shader3D.propertyNameToID("u_IBLRoughnessLevel");
        const commandUniform = LayaGL.renderOBJCreate.createGlobalUniformMap("Sprite3D");
        RenderableSprite3D.SHADERDEFINE_MORPHTARGET = Shader3D.getDefineByName("MORPHTARGETS");
        RenderableSprite3D.SHADERDEFINE_MORPHTARGET_POSITION = Shader3D.getDefineByName("MORPHTARGETS_POSITION");
        RenderableSprite3D.SHADERDEFINE_MORPHTARGET_NORMAL = Shader3D.getDefineByName("MORPHTARGETS_NORMAL");
        RenderableSprite3D.SHADERDEFINE_MORPHTARGET_TANGENT = Shader3D.getDefineByName("MORPHTARGETS_TANGENT");
        RenderableSprite3D.MorphTex = Shader3D.propertyNameToID("u_MorphTargetsTex");
        RenderableSprite3D.MorphParams = Shader3D.propertyNameToID("u_MorphParams");
        RenderableSprite3D.MorphAttriOffset = Shader3D.propertyNameToID("u_MorphAttrOffset");
        RenderableSprite3D.MorphActiceTargets = Shader3D.propertyNameToID("u_MorphActiveTargets");
        RenderableSprite3D.MorphActiveWeights = Shader3D.propertyNameToID("u_MorphTargetWeights");
        RenderableSprite3D.MorphActiveCount = Shader3D.propertyNameToID("u_MorphTargetActiveCount");
        commandUniform.addShaderUniform(RenderableSprite3D.MorphTex, "u_MorphTargetsTex", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.MorphParams, "u_MorphParams", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(RenderableSprite3D.MorphAttriOffset, "u_MorphAttrOffset", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(RenderableSprite3D.MorphActiceTargets, "u_MorphActiveTargets", ShaderDataType.Buffer);
        commandUniform.addShaderUniform(RenderableSprite3D.MorphActiveWeights, "u_MorphTargetWeights", ShaderDataType.Buffer);
        commandUniform.addShaderUniform(RenderableSprite3D.MorphActiveCount, "u_MorphTargetActiveCount", ShaderDataType.Int);
        commandUniform.addShaderUniform(RenderableSprite3D.LIGHTMAPSCALEOFFSET, "u_LightmapScaleOffset", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(RenderableSprite3D.LIGHTMAP, "u_LightMap", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.LIGHTMAP_DIRECTION, "u_LightMapDirection", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.PICKCOLOR, "u_PickColor", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONCUBE_PROBEPOSITION, "u_SpecCubeProbePosition", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMAX, "u_SpecCubeBoxMax", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONCUBE_PROBEBOXMIN, "u_SpecCubeBoxMin", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.IBLTEX, "u_IBLTex", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.IBLROUGHNESSLEVEL, "u_IBLRoughnessLevel", ShaderDataType.Float);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_PROBECOUNTS, "u_VolumetricGI.probeCounts", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_PROBESTEPS, "u_VolumetricGI.probeStep", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_PROBESTARTPOS, "u_VolumetricGI.probeStartPosition", ShaderDataType.Vector3);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_PROBEPARAMS, "u_VolumetricGI.probeParams", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_IRRADIANCE, "u_ProbeIrradiance", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.VOLUMETRICGI_DISTANCE, "u_ProbeDistance", ShaderDataType.Texture2D);
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSH, "u_IblSH", ShaderDataType.Buffer);
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTCOLOR, "u_AmbientColor", ShaderDataType.Vector4);
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTINTENSITY, "u_AmbientIntensity", ShaderDataType.Float);
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONINTENSITY, "u_ReflectionIntensity", ShaderDataType.Float);
        RenderableSprite3D.REFLECTIONTEXTURE = Shader3D.propertyNameToID("u_ReflectTexture");
        RenderableSprite3D.REFLECTIONCUBE_HDR_PARAMS = Shader3D.propertyNameToID("u_ReflectCubeHDRParams");
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONTEXTURE, "u_ReflectTexture", ShaderDataType.TextureCube);
        commandUniform.addShaderUniform(RenderableSprite3D.REFLECTIONCUBE_HDR_PARAMS, "u_ReflectCubeHDRParams", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHAR = Shader3D.propertyNameToID("u_AmbientSHAr");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHAR, "u_AmbientSHAr", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHAG = Shader3D.propertyNameToID("u_AmbientSHAg");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHAG, "u_AmbientSHAg", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHAB = Shader3D.propertyNameToID("u_AmbientSHAb");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHAB, "u_AmbientSHAb", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHBR = Shader3D.propertyNameToID("u_AmbientSHBr");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHBR, "u_AmbientSHBr", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHBG = Shader3D.propertyNameToID("u_AmbientSHBg");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHBG, "u_AmbientSHBg", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHBB = Shader3D.propertyNameToID("u_AmbientSHBb");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHBB, "u_AmbientSHBb", ShaderDataType.Vector4);
        RenderableSprite3D.AMBIENTSHC = Shader3D.propertyNameToID("u_AmbientSHC");
        commandUniform.addShaderUniform(RenderableSprite3D.AMBIENTSHC, "u_AmbientSHC", ShaderDataType.Vector4);
    }
    _onInActive() {
        super._onInActive();
    }
    _onActive() {
        super._onActive();
    }
    _onActiveInScene() {
        super._onActiveInScene();
    }
    _create() {
        return new Sprite3D(this.name);
    }
    _addToInitStaticBatchManager() {
    }
    _setBelongScene(scene) {
        super._setBelongScene(scene);
    }
    _setUnBelongScene() {
        super._setUnBelongScene();
    }
}

//# sourceMappingURL=RenderableSprite3D.js.map
