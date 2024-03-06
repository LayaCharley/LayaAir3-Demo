import FullScreenVert from "../../../shader/files/postProcess/GaussianDoF/FullScreenVert.vs";
import CoCFS from "../../../shader/files/postProcess/GaussianDoF/CoC.fs";
import PrefilterFS from "../../../shader/files/postProcess/GaussianDoF/Prefilter.fs";
import BlurVFS from "../../../shader/files/postProcess/GaussianDoF/BlurV.fs";
import BlurHFS from "../../../shader/files/postProcess/GaussianDoF/BlurH.fs";
import CompositeFS from "../../../shader/files/postProcess/GaussianDoF/Composite.fs";
import { PostProcessEffect } from "../../../core/render/PostProcessEffect";
import { FilterMode } from "../../../../RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "../../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "../../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../../RenderEngine/RenderShader/ShaderData";
import { LayaGL } from "../../../../layagl/LayaGL";
import { DepthTextureMode } from "../../../depthMap/DepthPass";
import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
import { RenderTexture } from "../../../../resource/RenderTexture";
import { SubShader } from "../../../../RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "../../../../RenderEngine/RenderShader/VertexMesh";
export class GaussianDoF extends PostProcessEffect {
    constructor() {
        super();
        this._shader = Shader3D.find("GaussianDoF");
        this._shaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this._shaderData.setVector3(GaussianDoF.COCPARAMS, new Vector3(10, 30, 1));
        this._zBufferParams = new Vector4();
        this._sourceSize = new Vector4();
        this._dowmSampleScale = new Vector4();
    }
    static init() {
        GaussianDoF.SOURCESIZE = Shader3D.propertyNameToID("u_SourceSize");
        GaussianDoF.ZBUFFERPARAMS = Shader3D.propertyNameToID("u_ZBufferParams");
        GaussianDoF.COCPARAMS = Shader3D.propertyNameToID("u_CoCParams");
        GaussianDoF.DEPTHTEXTURE = Shader3D.propertyNameToID("u_CameraDepthTexture");
        GaussianDoF.NORMALDEPTHTEXTURE = Shader3D.propertyNameToID("u_CameraDepthNormalTexture");
        GaussianDoF.FULLCOCTEXTURE = Shader3D.propertyNameToID("u_FullCoCTex");
        GaussianDoF.DOWNSAMPLESCALE = Shader3D.propertyNameToID("u_DownSampleScale");
        GaussianDoF.BLURCOCTEXTURE = Shader3D.propertyNameToID("u_BlurCoCTex");
        GaussianDoF.SHADERDEFINE_DEPTHNORMALTEXTURE = Shader3D.getDefineByName("CAMERA_NORMALDEPTH");
        let attributeMap = {
            'a_PositionTexcoord': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4],
        };
        let uniformMap = {
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
            "u_OffsetScale": ShaderDataType.Vector4,
            "u_ZBufferParams": ShaderDataType.Vector4,
            "u_CoCParams": ShaderDataType.Vector3,
            "u_FullCoCTex": ShaderDataType.Texture2D,
            "u_SourceSize": ShaderDataType.Vector4,
            "u_DownSampleScale": ShaderDataType.Vector4,
            "u_BlurCoCTex": ShaderDataType.Texture2D,
        };
        let shader = Shader3D.add("GaussianDoF");
        let cocSubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(cocSubShader);
        cocSubShader.addShaderPass(FullScreenVert, CoCFS);
        let prefilterSubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(prefilterSubShader);
        prefilterSubShader.addShaderPass(FullScreenVert, PrefilterFS);
        let blurHSubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(blurHSubShader);
        blurHSubShader.addShaderPass(FullScreenVert, BlurHFS);
        let blurVSubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(blurVSubShader);
        blurVSubShader.addShaderPass(FullScreenVert, BlurVFS);
        let compositeSubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(compositeSubShader);
        compositeSubShader.addShaderPass(FullScreenVert, CompositeFS);
    }
    set farStart(value) {
        let cocParams = this._shaderData.getVector3(GaussianDoF.COCPARAMS);
        cocParams.x = value;
        this._shaderData.setVector3(GaussianDoF.COCPARAMS, cocParams);
    }
    get farStart() {
        return this._shaderData.getVector3(GaussianDoF.COCPARAMS).x;
    }
    set farEnd(value) {
        let cocParams = this._shaderData.getVector3(GaussianDoF.COCPARAMS);
        cocParams.y = Math.max(cocParams.x, value);
        this._shaderData.setVector3(GaussianDoF.COCPARAMS, cocParams);
    }
    get farEnd() {
        return this._shaderData.getVector3(GaussianDoF.COCPARAMS).y;
    }
    set maxRadius(value) {
        let cocParams = this._shaderData.getVector3(GaussianDoF.COCPARAMS);
        cocParams.z = Math.min(value, 2);
        this._shaderData.setVector3(GaussianDoF.COCPARAMS, cocParams);
    }
    get maxRadius() {
        return this._shaderData.getVector3(GaussianDoF.COCPARAMS).z;
    }
    _setupShaderValue(context) {
        let camera = context.camera;
        this._dowmSampleScale.setValue(0.5, 0.5, 2.0, 2.0);
        this._shaderData.setVector(GaussianDoF.DOWNSAMPLESCALE, this._dowmSampleScale);
        let far = camera.farPlane;
        let near = camera.nearPlane;
        this._zBufferParams.setValue(1.0 - far / near, far / near, (near - far) / (near * far), 1 / near);
        this._shaderData.setVector(GaussianDoF.ZBUFFERPARAMS, this._zBufferParams);
    }
    getCameraDepthTextureModeFlag() {
        return DepthTextureMode.Depth;
    }
    render(context) {
        let cmd = context.command;
        this._setupShaderValue(context);
        let source = context.source;
        let shader = this._shader;
        let shaderData = this._shaderData;
        let dataTexFormat = RenderTargetFormat.R16G16B16A16;
        let fullCoC = RenderTexture.createFromPool(source.width, source.height, dataTexFormat, RenderTargetFormat.None, false, 1);
        cmd.blitScreenTriangle(source, fullCoC, null, shader, shaderData, 0);
        fullCoC.filterMode = FilterMode.Bilinear;
        this._shaderData.setTexture(GaussianDoF.FULLCOCTEXTURE, fullCoC);
        let prefilterTex = RenderTexture.createFromPool(source.width / 2, source.height / 2, dataTexFormat, RenderTargetFormat.None, false, 1);
        cmd.blitScreenTriangle(source, prefilterTex, null, shader, shaderData, 1);
        prefilterTex.filterMode = FilterMode.Bilinear;
        this._sourceSize.setValue(prefilterTex.width, prefilterTex.height, 1.0 / prefilterTex.width, 1.0 / prefilterTex.height);
        this._shaderData.setShaderData(GaussianDoF.SOURCESIZE, ShaderDataType.Vector4, this._sourceSize);
        let blurHTex = RenderTexture.createFromPool(prefilterTex.width, prefilterTex.height, dataTexFormat, RenderTargetFormat.None, false, 1);
        cmd.blitScreenTriangle(prefilterTex, blurHTex, null, this._shader, this._shaderData, 2);
        let blurVTex = RenderTexture.createFromPool(prefilterTex.width, prefilterTex.height, dataTexFormat, RenderTargetFormat.None, false, 1);
        cmd.blitScreenTriangle(blurHTex, blurVTex, null, this._shader, this._shaderData, 3);
        blurVTex.filterMode = FilterMode.Bilinear;
        blurVTex.anisoLevel = 1;
        fullCoC.filterMode = FilterMode.Point;
        this._shaderData.setTexture(GaussianDoF.BLURCOCTEXTURE, blurVTex);
        let finalTex = RenderTexture.createFromPool(source.width, source.height, source.colorFormat, source.depthStencilFormat, false, 1);
        cmd.blitScreenTriangle(source, context.destination, null, this._shader, this._shaderData, 4);
        RenderTexture.recoverToPool(fullCoC);
        RenderTexture.recoverToPool(prefilterTex);
        RenderTexture.recoverToPool(blurHTex);
        RenderTexture.recoverToPool(blurVTex);
        context.deferredReleaseTextures.push(finalTex);
    }
}

//# sourceMappingURL=GaussianDoF.js.map
