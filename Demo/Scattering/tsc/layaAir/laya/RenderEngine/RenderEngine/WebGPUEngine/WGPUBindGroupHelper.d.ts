import { WGPUShaderVariable } from "./WGPUShaderVariable";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
import { WGPUShaderData } from "../../../d3/RenderObjs/WebGPUOBJ/WGPUShaderData";
export declare class WGPUBindGroupHelper {
    static device: GPUDevice;
    static getBindGroupbyUniformMap(shaderVariable: WGPUShaderVariable, shaderData: WGPUShaderData): GPUBindGroup;
    static getBufferBindGroup(shaderVariable: WGPUShaderVariable, databuffer: GPUBuffer, size: number, offset?: number): GPUBindGroup;
    static getTextureBindGroup(shaderVariable: WGPUShaderVariable, internalTexture: WebGPUInternalTex): GPUBindGroup;
    static createBufferBindGroupEntry(bindIndex: number, databuffer: GPUBuffer, size: number, offset?: number): GPUBindGroupEntry;
    static createSamplerBindGroupEntry(bindIndex: number, sampler: GPUSampler): GPUBindGroupEntry;
    static createTextureBindGroupEntry(bindIndex: number, texture: GPUTextureView): GPUBindGroupEntry;
    static createExternalTextureBindGroupEntry(): void;
}
