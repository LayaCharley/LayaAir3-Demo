import SSSSRenderVS from "./../shader/SeparableSSS_Render.vs";
import SSSSRenderFS from "./../shader/SeparableSSS_Render.fs";

import Material = Laya.Material;
import ShaderDataType = Laya.ShaderDataType;
import BaseTexture = Laya.BaseTexture;
import Vector3 = Laya.Vector3;
import Shader3D = Laya.Shader3D;
import RenderState = Laya.RenderState;
import SubShader = Laya.SubShader;
import VertexMesh = Laya.VertexMesh;
import Vector4 = Laya.Vector4;
import Vector2 = Laya.Vector2;
import MathUtils3D = Laya.MathUtils3D;

export class SeparableSSSRenderMaterial extends Material {

    static SSSSDIFUSETEX: number;
    static SSSSSPECULARTEX: number;
    static TILINGOFFSET: number;

    static init() {
        SeparableSSSRenderMaterial.SSSSDIFUSETEX = Shader3D.propertyNameToID("sssssDiffuseTexture");
        SeparableSSSRenderMaterial.SSSSSPECULARTEX = Shader3D.propertyNameToID("sssssSpecularTexture");
        SeparableSSSRenderMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
        var shader: Shader3D = Shader3D.add("SeparableRender", false, true);
        var attributeMap: any = {
            'a_Position': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4],
			'a_Normal': [VertexMesh.MESH_NORMAL0, ShaderDataType.Vector3],
			'a_Texcoord0': [VertexMesh.MESH_TEXTURECOORDINATE0, ShaderDataType.Vector2],
			'a_Tangent0': [VertexMesh.MESH_TANGENT0, ShaderDataType.Vector4],
        };

        var uniformMap: any = {
            'sssssDiffuseTexture': ShaderDataType.Texture2D,
            'sssssSpecularTexture': ShaderDataType.Texture2D,
			'u_TilingOffset': ShaderDataType.Vector4,
			'u_MvpMatrix': ShaderDataType.Matrix4x4
        };
        var subShader: SubShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(SSSSRenderVS, SSSSRenderFS, "Forward");
    }

    constructor() {
        super();
        this.setShaderName("SeparableRender");
        this.renderModeSet();
        this._shaderValues.setVector(SeparableSSSRenderMaterial.TILINGOFFSET, new Vector4(1, 1, 0, 0));
    }

    //渲染模式
    renderModeSet() {
        this.alphaTest = false;//深度测试关闭
        this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;//渲染顺序放在后面
        this.depthWrite = true;
        this.cull = RenderState.CULL_BACK;
        this.blend = RenderState.BLEND_DISABLE;
        this.depthTest = RenderState.DEPTHTEST_LESS;
    }
}