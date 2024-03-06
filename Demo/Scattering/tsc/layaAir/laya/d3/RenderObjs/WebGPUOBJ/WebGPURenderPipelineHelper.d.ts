import { WebGPUEngine } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUEngine";
import { WebGPUInternalRT } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUInternalRT";
import { BlendEquationSeparate } from "../../../RenderEngine/RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../../../RenderEngine/RenderEnum/BlendFactor";
import { BlendType } from "../../../RenderEngine/RenderEnum/BlendType";
import { CompareFunction } from "../../../RenderEngine/RenderEnum/CompareFunction";
import { CullMode } from "../../../RenderEngine/RenderEnum/CullMode";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { VertexAttributeLayout } from "../../../RenderEngine/VertexAttributeLayout";
export declare class WGPUBlendState {
    static pool: {
        [key: number]: WGPUBlendState;
    };
    static getBlendState(blend: BlendType, operationRGB?: BlendEquationSeparate, srcBlendRGB?: BlendFactor, dstBlendRGB?: BlendFactor, operationAlpha?: BlendEquationSeparate, srcBlendAlpha?: BlendFactor, dstBlendAlpha?: BlendFactor): WGPUBlendState;
    mapId: number;
    state: GPUBlendState;
    constructor(blend: BlendType, operationRGB: BlendEquationSeparate, srcBlendRGB: BlendFactor, dstBlendRGB: BlendFactor, operationAlpha: BlendEquationSeparate, srcBlendAlpha: BlendFactor, dstBlendAlpha: BlendFactor);
    getComponent(operation: BlendEquationSeparate, src: BlendFactor, dst: BlendFactor): GPUBlendComponent;
    static getmapID(blend: BlendType, operationRGB: BlendEquationSeparate, srcBlendRGB: BlendFactor, dstBlendRGB: BlendFactor, operationAlpha: BlendEquationSeparate, srcBlendAlpha: BlendFactor, dstBlendAlpha: BlendFactor): number;
}
export declare class WGPUDepthStencilState {
    static pool: {
        [key: number]: WGPUDepthStencilState;
    };
    static getmapID(format: RenderTargetFormat, depthWriteEnabled: boolean, depthCompare: CompareFunction, stencilParam?: any, depthBiasParam?: any): number;
    static getDepthStencilState(format: RenderTargetFormat, depthWriteEnabled: boolean, depthCompare: CompareFunction, stencilParam?: any, depthBiasParam?: any): WGPUDepthStencilState;
    state: GPUDepthStencilState;
    mapId: number;
    constructor(format: RenderTargetFormat, depthWriteEnabled: boolean, depthCompare: CompareFunction, stencilParam?: any, depthBiasParam?: any);
}
export declare class WGPUPrimitiveState {
    static pool: {
        [key: number]: WGPUPrimitiveState;
    };
    static getmapID(mode: MeshTopology, indexformat: IndexFormat, cullMode: CullMode, unclippedDepth?: boolean): number;
    static getPrimitiveState(mode: MeshTopology, indexformat: IndexFormat, cullMode: CullMode, unclippedDepth?: boolean): WGPUPrimitiveState;
    state: GPUPrimitiveState;
    mapId: number;
    constructor(mode: MeshTopology, indexformat: IndexFormat, cullMode: CullMode, unclippedDepth?: boolean);
}
export declare class WGPUVertexBufferLayouts {
    static pool: {
        [key: number]: WGPUVertexBufferLayouts;
    };
    static getVertexBufferLayouts(vetexlayout: VertexAttributeLayout): WGPUVertexBufferLayouts;
    state: Array<GPUVertexBufferLayout>;
    mapID: number;
    constructor(vertexlayout: VertexAttributeLayout);
    getvertexAttributeFormat(data: string): GPUVertexFormat;
}
export declare class WGPURenderPipeline {
    static offscreenFormat: GPUTextureFormat;
    pipeline: GPURenderPipeline;
    constructor(engine: WebGPUEngine, gpuPipelineLayout: GPUPipelineLayout, vertexModule: GPUShaderModule, fragModule: GPUShaderModule, vertexBufferLayouts: WGPUVertexBufferLayouts, targets: WebGPUInternalRT, blendState: WGPUBlendState, depthStencilState: WGPUDepthStencilState, primitiveState: WGPUPrimitiveState);
    getFragmentFormatByRT(rt: WebGPUInternalRT, blendState: WGPUBlendState): Array<GPUColorTargetState>;
}
