import BlitScreenVS from "../../../shader/postprocess/BlitScreen.vs";
import FragAO from "../../../shader/files/postProcess/ScalableAO/FragAO.fs";
import AoBlurHorizontal from "../../../shader/files/postProcess/ScalableAO/AoBlurHorizontal.fs";
import AOComposition from "../../../shader/files/postProcess/ScalableAO/AOComposition.fs";
import AmbientOcclusion from "../../../shader/files/postProcess/ScalableAO/AmbientOcclusion.glsl";
import { LayaGL } from "../../../../layagl/LayaGL";
import { RenderTargetFormat } from "../../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { WrapMode } from "../../../../RenderEngine/RenderEnum/WrapMode";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { DepthTextureMode } from "../../../depthMap/DepthPass";
import { PostProcessEffect } from "../PostProcessEffect";
import { BaseCamera } from "../../BaseCamera";
import { Vector2 } from "../../../../maths/Vector2";
import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
import { SubShader } from "../../../../RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "../../../../RenderEngine/RenderShader/VertexMesh";
export var AOQUALITY;
(function (AOQUALITY) {
    AOQUALITY[AOQUALITY["High"] = 0] = "High";
    AOQUALITY[AOQUALITY["MEDIUM"] = 1] = "MEDIUM";
    AOQUALITY[AOQUALITY["LOWEST"] = 2] = "LOWEST";
})(AOQUALITY || (AOQUALITY = {}));
export class ScalableAO extends PostProcessEffect {
    constructor() {
        super();
        this._aoParams = new Vector3();
        this._aoQuality = AOQUALITY.MEDIUM;
        this._shader = Shader3D.find("ScalableAO");
        this._shaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this._aoParams = new Vector3(0.12, 0.15, 1);
        this._shaderData.setVector3(ScalableAO.AOParams, this._aoParams);
        this._shaderData.setVector(BaseCamera.DEPTHZBUFFERPARAMS, new Vector4());
        this._aoBlurHorizontalShader = Shader3D.find("AOBlurHorizontal");
        this._aoComposition = Shader3D.find("AOComposition");
        this.aoQuality = AOQUALITY.MEDIUM;
    }
    static init() {
        ScalableAO.BlurDelty = Shader3D.propertyNameToID("u_Delty");
        ScalableAO.AOColor = Shader3D.propertyNameToID("u_AOColor");
        ScalableAO.aoTexture = Shader3D.propertyNameToID("u_compositionAoTexture");
        ScalableAO.AOParams = Shader3D.propertyNameToID('u_AOParams');
        ScalableAO.SourceTex = Shader3D.propertyNameToID('u_SourceTex');
        ScalableAO.SHADERDEFINE_AOHigh = Shader3D.getDefineByName("AO_High");
        ScalableAO.SHADERDEFINE_AOMEDIUM = Shader3D.getDefineByName("AO_MEDIUM");
        ScalableAO.SHADERDEFINE_LOWEST = Shader3D.getDefineByName("AO_LOWEST");
        Shader3D.addInclude("AmbientOcclusion.glsl", AmbientOcclusion);
        let attributeMap = {
            'a_PositionTexcoord': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        let uniformMap = {
            'u_OffsetScale': ShaderDataType.Vector4,
            'u_MainTex': ShaderDataType.Texture2D,
            'u_MainTex_TexelSize': ShaderDataType.Vector4,
            'u_Delty': ShaderDataType.Vector2,
            'u_PlugTime': ShaderDataType.Vector4,
            'u_AOParams': ShaderDataType.Vector4,
            'u_BlurVector': ShaderDataType.Vector2,
            'u_AOColor': ShaderDataType.Color,
            'u_compositionAoTexture': ShaderDataType.Texture2D
        };
        let shader = Shader3D.add("ScalableAO");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(BlitScreenVS, FragAO);
        shader = Shader3D.add("AOBlurHorizontal");
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(BlitScreenVS, AoBlurHorizontal);
        shader = Shader3D.add("AOComposition");
        subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(BlitScreenVS, AOComposition);
    }
    set aoColor(value) {
        this._shaderData.setColor(ScalableAO.AOColor, value);
    }
    get aoColor() {
        return this._shaderData.getColor(ScalableAO.AOColor);
    }
    set intensity(value) {
        this._aoParams.x = value;
        this._shaderData.setVector3(ScalableAO.AOParams, this._aoParams);
    }
    get intensity() {
        return this._aoParams.x;
    }
    set radius(value) {
        this._aoParams.y = value;
        this._shaderData.setVector3(ScalableAO.AOParams, this._aoParams);
    }
    get radius() {
        return this._aoParams.y;
    }
    get aoQuality() {
        return this._aoQuality;
    }
    set aoQuality(value) {
        this._aoQuality = value;
        switch (value) {
            case AOQUALITY.High:
                this._shaderData.addDefine(ScalableAO.SHADERDEFINE_AOHigh);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_AOMEDIUM);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_LOWEST);
                break;
            case AOQUALITY.MEDIUM:
                this._shaderData.addDefine(ScalableAO.SHADERDEFINE_AOMEDIUM);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_AOHigh);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_LOWEST);
                break;
            case AOQUALITY.LOWEST:
                this._shaderData.addDefine(ScalableAO.SHADERDEFINE_LOWEST);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_AOHigh);
                this._shaderData.removeDefine(ScalableAO.SHADERDEFINE_AOMEDIUM);
                break;
        }
    }
    getCameraDepthTextureModeFlag() {
        return DepthTextureMode.DepthAndDepthNormals;
    }
    render(context) {
        let cmd = context.command;
        let viewport = context.camera.viewport;
        let camera = context.camera;
        camera.depthTextureMode |= DepthTextureMode.DepthNormals;
        camera.depthTextureMode |= DepthTextureMode.Depth;
        let depthNormalTexture = camera.depthNormalTexture;
        let depthTexture = camera.depthTexture;
        if (!depthNormalTexture || !depthTexture) {
            return;
        }
        depthNormalTexture.wrapModeU = WrapMode.Clamp;
        depthNormalTexture.wrapModeV = WrapMode.Clamp;
        let source = context.source;
        let width = source.width;
        let height = source.height;
        let textureFormat = source.colorFormat;
        let depthFormat = RenderTargetFormat.None;
        let finalTex = RenderTexture.createFromPool(width, height, textureFormat, depthFormat, false, 1);
        let shader = this._shader;
        let shaderData = this._shaderData;
        cmd.blitScreenTriangle(null, finalTex, null, shader, shaderData, 0);
        let blurTex = RenderTexture.createFromPool(width, height, textureFormat, depthFormat, false, 1);
        cmd.blitScreenTriangle(finalTex, blurTex, null, this._aoBlurHorizontalShader, shaderData, 0);
        cmd.setShaderDataVector2(shaderData, ScalableAO.BlurDelty, ScalableAO.deltyVector);
        cmd.blitScreenTriangle(blurTex, finalTex, null, this._aoBlurHorizontalShader, this._shaderData, 0);
        cmd.setShaderDataTexture(shaderData, ScalableAO.aoTexture, finalTex);
        cmd.blitScreenTriangle(context.source, context.destination, null, this._aoComposition, this._shaderData, 0);
        context.deferredReleaseTextures.push(finalTex);
        context.deferredReleaseTextures.push(blurTex);
    }
}
ScalableAO.deltyHorizontal = new Vector2(1.0, 0.0);
ScalableAO.deltyVector = new Vector2(0.0, 1.0);

//# sourceMappingURL=ScalableAO.js.map
