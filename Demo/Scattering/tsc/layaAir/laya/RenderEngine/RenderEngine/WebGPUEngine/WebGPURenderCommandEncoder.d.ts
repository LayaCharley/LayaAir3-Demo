import { WGPURenderPipeline } from "../../../d3/RenderObjs/WebGPUOBJ/WebGPURenderPipelineHelper";
import { IRenderGeometryElement } from "../../RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { WebGPUBuffer } from "./WebGPUBuffer";
import { WebGPUEngine } from "./WebGPUEngine";
export declare class WebGPURenderCommandEncoder {
    commandEncoder: GPUCommandEncoder;
    renderpassEncoder: GPURenderPassEncoder;
    engine: WebGPUEngine;
    curpipeline: WGPURenderPipeline;
    curGeometry: IRenderGeometryElement;
    cachemap: {
        [key: number]: GPUBindGroup;
    };
    obb: any;
    constructor();
    startRender(renderpassDes: GPURenderPassDescriptor): void;
    setPipeline(pipeline: WGPURenderPipeline): void;
    applyGeometry(geometry: IRenderGeometryElement): void;
    setIndexBuffer(buffer: WebGPUBuffer, indexformat: GPUIndexFormat, offset: number, byteSize: number): void;
    setVertexBuffer(slot: GPUIndex32, buffer: GPUBuffer, offset?: GPUSize64, size?: GPUSize64): void;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: GPUSize64): void;
    drawIndexedIndirect(indirectBuffer: GPUBuffer, indirectOffset: GPUSize64): void;
    setBindGroup(index: GPUIndex32, bindGroup: GPUBindGroup, dynamicOffsets?: Iterable<GPUBufferDynamicOffset>): void;
    setBindGroupByDataOffaset(index: GPUIndex32, bindGroup: GPUBindGroup, dynamicOffsetsData: Uint32Array, dynamicOffsetsDataStart: GPUSize64, dynamicOffsetsDataLength: GPUSize32): void;
    end(): void;
    setViewport(x: number, y: number, width: number, height: number, minDepth: number, maxDepth: number): void;
    setScissorRect(x: GPUIntegerCoordinate, y: GPUIntegerCoordinate, width: GPUIntegerCoordinate, height: GPUIntegerCoordinate): void;
    setBlendConstant(color: GPUColor): void;
    setStencilReference(reference: GPUStencilValue): void;
    executeBundles(bundles: Iterable<GPURenderBundle>): void;
    finish(): GPUCommandBuffer;
}
