import { CommandEncoder } from "../../layagl/CommandEncoder";
import { ShaderData, ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { UniformMapType } from "../../RenderEngine/RenderShader/SubShader";
import { ShaderCompileDefineBase, ShaderProcessInfo } from "../../webgl/utils/ShaderCompileDefineBase";
import { ShaderNode } from "../../webgl/utils/ShaderNode";
export declare class ShaderInstance {
    private _renderShaderInstance;
    constructor(shaderProcessInfo: ShaderProcessInfo, shaderPass: ShaderCompileDefineBase);
    get complete(): boolean;
    protected _webGLShaderLanguageProcess3D(defineString: string[], attributeMap: {
        [name: string]: [number, ShaderDataType];
    }, uniformMap: UniformMapType, VS: ShaderNode, FS: ShaderNode): void;
    protected _webGLShaderLanguageProcess2D(defineString: string[], attributeMap: {
        [name: string]: [number, ShaderDataType];
    }, uniformMap: UniformMapType, VS: ShaderNode, FS: ShaderNode): void;
    private hasSpritePtrID;
    protected _disposeResource(): void;
    bind(): boolean;
    uploadUniforms(shaderUniform: CommandEncoder, shaderDatas: ShaderData, uploadUnTexture: boolean): void;
    uploadRenderStateBlendDepth(shaderDatas: ShaderData): void;
    uploadRenderStateBlendDepthByShader(shaderDatas: ShaderData): void;
    uploadRenderStateBlendDepthByMaterial(shaderDatas: ShaderData): void;
}
