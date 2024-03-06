import { Material } from "laya/d3/core/material/Material";
import GlassShaderVS from "./GlassShader.vs";
import GlassShaderFS from "./GlassShader.fs";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "laya/RenderEngine/RenderShader/ShaderData";
import { Vector4 } from "laya/maths/Vector4";
import { RenderState } from "laya/RenderEngine/RenderShader/RenderState";
import { SubShader } from "laya/RenderEngine/RenderShader/SubShader";
import { VertexMesh } from "laya/RenderEngine/RenderShader/VertexMesh";
export class GlassWithoutGrabMaterial extends Material {
    /**
     * @param texture
     */
    constructor(texture) {
        super();
        this.setShaderName("GlassShader");
        this.renderModeSet();
        this._shaderValues.setVector(GlassWithoutGrabMaterial.TILINGOFFSET, new Vector4(1, 1, 0, 0));
        this._shaderValues.setTexture(GlassWithoutGrabMaterial.TINTTEXTURE, texture);
    }
    static init() {
        var attributeMap = {
            'a_Position': [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4],
            'a_Normal': [VertexMesh.MESH_NORMAL0, ShaderDataType.Vector3],
            'a_Texcoord0': [VertexMesh.MESH_TEXTURECOORDINATE0, ShaderDataType.Vector2],
            'a_Tangent0': [VertexMesh.MESH_TANGENT0, ShaderDataType.Vector4],
        };
        var uniformMap = {
            "u_tintTexure": ShaderDataType.Texture2D,
            "u_screenTexture": ShaderDataType.Texture2D,
            "u_normalTexture": ShaderDataType.Texture2D,
            "u_TilingOffset": ShaderDataType.Vector4,
            "u_tintAmount": ShaderDataType.Color,
        };
        var shader = Shader3D.add("GlassShader", false);
        var subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        subShader.addShaderPass(GlassShaderVS, GlassShaderFS);
        GlassWithoutGrabMaterial.TINTTEXTURE = Shader3D.propertyNameToID("u_tintTexure");
        GlassWithoutGrabMaterial.NORMALTEXTURE = Shader3D.propertyNameToID("u_normalTexture");
        GlassWithoutGrabMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
        GlassWithoutGrabMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_tintAmount");
    }
    /**
     * RenderMode
     */
    renderModeSet() {
        this.alphaTest = false; //深度测试关闭
        this.renderQueue = Material.RENDERQUEUE_TRANSPARENT; //渲染顺序放在后面
        this.depthWrite = true;
        this.cull = RenderState.CULL_BACK;
        this.blend = RenderState.BLEND_DISABLE;
        this.depthTest = RenderState.DEPTHTEST_LESS;
    }
}
