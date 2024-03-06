import { CommandUniformMap } from "../../CommandUniformMap";
import { ShaderDataType } from "../../RenderShader/ShaderData";
import { WGPUShaderVariable } from "./WGPUShaderVariable";
export declare class WGPUBindGroupLayoutHelper {
    static getBindGroupLayoutByMap(map: CommandUniformMap, out: WGPUShaderVariable[]): void;
    static getBindGroupLayoutByUniformMap(uniformMap: {
        [name: string]: ShaderDataType;
    }, out: WGPUShaderVariable[]): void;
    static getTextureBindGroupLayout(visibility: GPUShaderStageFlags, dimension?: GPUTextureViewDimension, mulsampler?: boolean, GPUTtextureType?: GPUTextureSampleType, samplerType?: GPUSamplerBindingType): GPUBindGroupLayout;
    static getBufferBindGroupLayout(visibility: GPUShaderStageFlags, bufferBindType?: GPUBufferBindingType): GPUBindGroupLayout;
    static createBufferLayoutEntry(binding: number, visibility: GPUShaderStageFlags, bufferBindType: GPUBufferBindingType, dynamicOffset?: boolean): GPUBindGroupLayoutEntry;
    static createTextureLayoutEntry(binding: number, visibility: GPUShaderStageFlags, dimension?: GPUTextureViewDimension, mulsampler?: boolean, GPUTtextureType?: GPUTextureSampleType): GPUBindGroupLayoutEntry;
    static createSamplerLayoutEntry(binding: number, visibility: GPUShaderStageFlags, samplerType?: GPUSamplerBindingType): GPUBindGroupLayoutEntry;
    static createStorageTextureEntry(binding: number, visibility: GPUShaderStageFlags, textureFormat: GPUTextureFormat, dimension?: GPUTextureViewDimension): GPUBindGroupLayoutEntry;
    static createExternalTextureEntry(): GPUBindGroupLayoutEntry;
}
