import { PostProcessEffect } from "laya/d3/core/render/PostProcessEffect";
import EdgeEffectVS from "./shader/EdgeEffectVS.vs";
import EdgeEffectFS from "./shader/EdgeEffectFS.fs";
import { DepthTextureMode } from "laya/d3/depthMap/DepthPass";
import { FilterMode } from "laya/RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "laya/RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "laya/RenderEngine/RenderShader/ShaderData";
import { LayaGL } from "laya/layagl/LayaGL";
import { Vector3 } from "laya/maths/Vector3";
import { Vector4 } from "laya/maths/Vector4";
import { RenderTexture } from "laya/resource/RenderTexture";
import { SubShader } from "laya/RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "laya/RenderEngine/RenderShader/VertexMesh";
export var EdgeMode;
(function (EdgeMode) {
    EdgeMode[EdgeMode["ColorEdge"] = 0] = "ColorEdge";
    EdgeMode[EdgeMode["NormalEdge"] = 1] = "NormalEdge";
    EdgeMode[EdgeMode["DepthEdge"] = 2] = "DepthEdge";
})(EdgeMode || (EdgeMode = {}));
export class EdgeEffect extends PostProcessEffect {
    constructor() {
        super();
        this._shader = null;
        this._shaderData = LayaGL.renderOBJCreate.createShaderData(null);
        this._depthBufferparam = new Vector4();
        this._edgeMode = EdgeMode.NormalEdge;
        if (!EdgeEffect._isShaderInit) {
            EdgeEffect._isShaderInit = true;
            EdgeEffect.EdgeEffectShaderInit();
        }
        this._shader = Shader3D.find("PostProcessEdge");
        this.edgeColor = new Vector3(0.0, 0.0, 0.0);
        this.colorHold = 0.7;
        this.normalHold = 0.7;
        this.depthHold = 0.7;
        this.edgeMode = EdgeMode.DepthEdge;
        this.showSource = true;
    }
    static __init__() {
        EdgeEffect.DEPTHTEXTURE = Shader3D.propertyNameToID("u_DepthTex");
        EdgeEffect.DEPTHNORMALTEXTURE = Shader3D.propertyNameToID("u_DepthNormalTex");
        EdgeEffect.DEPTHBUFFERPARAMS = Shader3D.propertyNameToID("u_DepthBufferParams");
        EdgeEffect.EDGECOLOR = Shader3D.propertyNameToID("u_EdgeColor");
        EdgeEffect.COLORHOLD = Shader3D.propertyNameToID("u_ColorHold");
        EdgeEffect.DEPTHHOLD = Shader3D.propertyNameToID("u_Depthhold");
        EdgeEffect.NORMALHOLD = Shader3D.propertyNameToID("u_NormalHold");
    }
    static EdgeEffectShaderInit() {
        EdgeEffect.__init__();
        EdgeEffect.SHADERDEFINE_DEPTH = Shader3D.getDefineByName("DEPTH");
        EdgeEffect.SHADERDEFINE_DEPTHNORMAL = Shader3D.getDefineByName("DEPTHNORMAL");
        EdgeEffect.SHADERDEFINE_DEPTHEDGE = Shader3D.getDefineByName("DEPTHEDGE");
        EdgeEffect.SHADERDEFINE_NORMALEDGE = Shader3D.getDefineByName("NORMALEDGE");
        EdgeEffect.SHADERDEFINE_COLOREDGE = Shader3D.getDefineByName("COLOREDGE");
        EdgeEffect.SHADERDEFINE_SOURCE = Shader3D.getDefineByName("SOURCE");
        let attributeMap = {
            'a_PositionTexcoord': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        let uniformMap = {
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
            "u_DepthTex": ShaderDataType.Texture2D,
            "u_DepthNormalTex": ShaderDataType.Texture2D,
            "u_DepthBufferParams": ShaderDataType.Vector4,
            "u_EdgeColor": ShaderDataType.Color,
            "u_ColorHold": ShaderDataType.Float,
            "u_Depthhold": ShaderDataType.Float,
            "u_NormalHold": ShaderDataType.Float,
        };
        let shader = Shader3D.add("PostProcessEdge");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let pass = subShader.addShaderPass(EdgeEffectVS, EdgeEffectFS);
        pass.renderState.depthWrite = false;
    }
    get edgeColor() {
        return this._shaderData.getVector3(EdgeEffect.EDGECOLOR);
    }
    set edgeColor(value) {
        this._shaderData.setVector3(EdgeEffect.EDGECOLOR, value);
    }
    get colorHold() {
        return this._shaderData.getNumber(EdgeEffect.COLORHOLD);
    }
    set colorHold(value) {
        this._shaderData.setNumber(EdgeEffect.COLORHOLD, value);
    }
    get depthHold() {
        return this._shaderData.getNumber(EdgeEffect.DEPTHHOLD);
    }
    set depthHold(value) {
        this._shaderData.setNumber(EdgeEffect.DEPTHHOLD, value);
    }
    get normalHold() {
        return this._shaderData.getNumber(EdgeEffect.NORMALHOLD);
    }
    set normalHold(value) {
        this._shaderData.setNumber(EdgeEffect.NORMALHOLD, value);
    }
    get edgeMode() {
        return this._edgeMode;
    }
    get showSource() {
        return this._shaderData.hasDefine(EdgeEffect.SHADERDEFINE_SOURCE);
    }
    set showSource(value) {
        if (value) {
            this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_SOURCE);
        }
        else {
            this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_SOURCE);
        }
    }
    set edgeMode(value) {
        this._edgeMode = value;
        switch (value) {
            case EdgeMode.ColorEdge:
                this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_COLOREDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_DEPTHEDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_NORMALEDGE);
                break;
            case EdgeMode.NormalEdge:
                this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_NORMALEDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_DEPTHEDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_COLOREDGE);
                break;
            case EdgeMode.DepthEdge:
                this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_DEPTHEDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_COLOREDGE);
                this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_NORMALEDGE);
                break;
        }
    }
    render(context) {
        let cmd = context.command;
        let viewport = context.camera.viewport;
        let camera = context.camera;
        let far = camera.farPlane;
        let near = camera.nearPlane;
        let source = context.indirectTarget;
        let destination = context.destination;
        let width = viewport.width;
        let height = viewport.height;
        let renderTexture = RenderTexture.createFromPool(width, height, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.DEPTH_16, false, 1);
        renderTexture.filterMode = FilterMode.Bilinear;
        if (camera.depthTextureMode == DepthTextureMode.Depth) {
            this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_DEPTH);
            this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_DEPTHNORMAL);
            this._shaderData.setTexture(EdgeEffect.DEPTHTEXTURE, camera.depthTexture);
        }
        else if (camera.depthTextureMode == DepthTextureMode.DepthNormals) {
            this._shaderData.addDefine(EdgeEffect.SHADERDEFINE_DEPTHNORMAL);
            this._shaderData.removeDefine(EdgeEffect.SHADERDEFINE_DEPTH);
            this._shaderData.setTexture(EdgeEffect.DEPTHNORMALTEXTURE, camera.depthNormalTexture);
        }
        this._depthBufferparam.setValue(1.0 - far / near, far / near, (near - far) / (near * far), 1 / near);
        this._shaderData.setVector(EdgeEffect.DEPTHBUFFERPARAMS, this._depthBufferparam);
        cmd.blitScreenTriangle(source, context.destination, null, this._shader, this._shaderData, 0);
        //context.source = renderTexture;
        context.deferredReleaseTextures.push(renderTexture);
    }
}
EdgeEffect._isShaderInit = false;
