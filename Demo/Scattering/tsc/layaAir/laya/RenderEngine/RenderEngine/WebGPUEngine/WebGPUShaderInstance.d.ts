import { CommandEncoder } from "../../../layagl/CommandEncoder";
import { ShaderNode } from "../../../webgl/utils/ShaderNode";
import { CommandUniformMap } from "../../CommandUniformMap";
import { IRenderShaderInstance } from "../../RenderInterface/IRenderShaderInstance";
import { ShaderDataType } from "../../RenderShader/ShaderData";
import { WebGPUEngine } from "./WebGPUEngine";
import { WebGPUObject } from "./WebGPUObject";
import { WGPUShaderVariable } from "./WGPUShaderVariable";
export declare class WebGPUShaderInstance extends WebGPUObject implements IRenderShaderInstance {
    _complete: boolean;
    private _pipelineLayout;
    constructor(engine: WebGPUEngine);
    _WGSLShaderLanguageProcess3D(vs: ShaderNode, fs: ShaderNode): void;
    create(): void;
    private _contactBindGroupLayout;
    getVertexModule(): GPUShaderModule;
    getFragmentModule(): GPUShaderModule;
    getUniformMap(): WGPUShaderVariable[];
    applyBindGroupLayoutByUniformMap(uniformMap: {
        [name: string]: ShaderDataType;
    }, command: CommandEncoder): void;
    applyBindGroupLayout(map: CommandUniformMap, command: CommandEncoder): void;
    getWGPUPipelineLayout(): GPUPipelineLayout;
    bind(): boolean;
}
