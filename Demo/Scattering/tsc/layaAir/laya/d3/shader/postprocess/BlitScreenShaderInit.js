import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import BlitVS from "./BlitScreen.vs";
import BlitFS from "./BlitScreen.fs";
import FXAA from "./FastApproximateAntiAliasing.glsl";
import { SubShader } from "../../../RenderEngine/RenderShader/SubShader";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import ColorGradingGLSL from "./ColorGrading.glsl";
import TonemappingGLSL from "./Tonemapping.glsl";
import LUTGLSL from "./LUT.glsl";
import LUTBuilderFS from "./LUTBuilder.fs";
export class BlitScreenShaderInit {
    static init() {
        Shader3D.addInclude("FastApproximateAntiAliasing.glsl", FXAA);
        Shader3D.addInclude("ColorGrading.glsl", ColorGradingGLSL);
        Shader3D.addInclude("Tonemapping.glsl", TonemappingGLSL);
        Shader3D.addInclude("LUT.glsl", LUTGLSL);
        let attributeMap = {
            "a_PositionTexcoord": [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        let uniformMap = {
            "u_OffsetScale": ShaderDataType.Vector4,
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
        };
        let shader = Shader3D.add("BlitScreen");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let blitPass = subShader.addShaderPass(BlitVS, BlitFS);
        blitPass.statefirst = true;
        let blitState = blitPass.renderState;
        blitState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        blitState.depthWrite = false;
        blitState.cull = RenderState.CULL_NONE;
        blitState.blend = RenderState.BLEND_DISABLE;
        let transparentShader = Shader3D.add("BlitScreen_Transparnet");
        let transparentSubShader = new SubShader(attributeMap, uniformMap);
        transparentShader.addSubShader(transparentSubShader);
        let blitPassTrans = transparentSubShader.addShaderPass(BlitVS, BlitFS);
        blitPass.statefirst = true;
        blitState = blitPassTrans.renderState;
        blitState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        blitState.depthWrite = false;
        blitState.cull = RenderState.CULL_NONE;
        blitState.blend = RenderState.BLEND_ENABLE_ALL;
        blitState.srcBlend = RenderState.BLENDPARAM_SRC_ALPHA;
        blitState.dstBlend = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
        this.lutBuilderInit();
    }
    static lutBuilderInit() {
        let attributeMap = {
            "a_PositionTexcoord": [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };
        let uniformMap = {
            "u_OffsetScale": ShaderDataType.Vector4,
            "u_MainTex": ShaderDataType.Texture2D,
            "u_MainTex_TexelSize": ShaderDataType.Vector4,
            "u_LutParams": ShaderDataType.Vector4
        };
        let shader = Shader3D.add("LUTBuilder");
        let subShader = new SubShader(attributeMap, uniformMap);
        shader.addSubShader(subShader);
        let pass = subShader.addShaderPass(BlitVS, LUTBuilderFS);
        pass.renderState.depthTest = RenderState.DEPTHTEST_ALWAYS;
        pass.renderState.depthWrite = false;
        pass.renderState.cull = RenderState.CULL_NONE;
        pass.renderState.blend = RenderState.BLEND_DISABLE;
        pass.statefirst = true;
    }
}

//# sourceMappingURL=BlitScreenShaderInit.js.map
