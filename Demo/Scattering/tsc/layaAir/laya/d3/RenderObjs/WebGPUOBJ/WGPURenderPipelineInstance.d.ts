import { WebGPUEngine } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUEngine";
import { WebGPUInternalRT } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUInternalRT";
import { WebGPURenderCommandEncoder } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPURenderCommandEncoder";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { VertexAttributeLayout } from "../../../RenderEngine/VertexAttributeLayout";
import { CommandEncoder } from "../../../layagl/CommandEncoder";
import { ShaderCompileDefineBase, ShaderProcessInfo } from "../../../webgl/utils/ShaderCompileDefineBase";
import { WGPUShaderData } from "./WGPUShaderData";
import { WGPUBlendState, WGPUDepthStencilState, WGPUPrimitiveState, WGPURenderPipeline, WGPUVertexBufferLayouts } from "./WebGPURenderPipelineHelper";
export declare class WGPURenderPipelineInstance {
    cachePool: any;
    engine: WebGPUEngine;
    constructor(shaderProcessInfo: ShaderProcessInfo, shaderPass: ShaderCompileDefineBase);
    get complete(): boolean;
    protected _disposeResource(): void;
    private _getData;
    bind(): boolean;
    getBlendState(shaderDatas: ShaderData): WGPUBlendState;
    getVertexAttributeLayout(vertexLayout: VertexAttributeLayout): WGPUVertexBufferLayouts;
    getGPURenderPipeline(blendState: WGPUBlendState, depthStencilState: WGPUDepthStencilState, primitiveState: WGPUPrimitiveState, vertexBufferLayouts: WGPUVertexBufferLayouts, destTexture: WebGPUInternalRT): WGPURenderPipeline;
    uploadUniforms(shaderUniform: CommandEncoder, shaderDatas: WGPUShaderData, renderEncoder: WebGPURenderCommandEncoder): void;
    private testCreateSceneCommandEncoder;
    private testCreateCameraCommandEncoder;
    private testCreateSpriteCommandEncoder;
    private testMaterialUniformParamsMap;
}
