import { IRenderBuffer } from "../../RenderInterface/IRenderBuffer";
import { WebGPUEngine } from "./WebGPUEngine";
import { WebGPUObject } from "./WebGPUObject";
export declare enum GPUBUfferUsage {
    MAP_READ = 1,
    MAP_WRITE = 2,
    COPY_SRC = 4,
    COPY_DST = 8,
    INDEX = 16,
    VERTEX = 32,
    UNIFORM = 64,
    STORAGE = 128,
    INDIRECT = 256,
    QUERY_RESOLVE = 512
}
export declare class WebGPUBuffer extends WebGPUObject implements IRenderBuffer {
    _gpuBuffer: GPUBuffer;
    _gpuUsage: GPUBufferUsageFlags;
    _size: number;
    private _isCreate;
    private _mappedAtCreation;
    constructor(engine: WebGPUEngine, usage: GPUBufferUsageFlags, byteSize?: number, mappedAtCreation?: boolean);
    bindBuffer(): boolean;
    unbindBuffer(): void;
    bindBufferBase(glPointer: number): void;
    bindBufferRange(glPointer: number, offset: number, byteCount: number): void;
    setDataLength(srcData: number): void;
    private _create;
    private _alignedLength;
    private _memorychange;
    setData(srcData: ArrayBuffer | ArrayBufferView, offset: number): void;
    setDataEx(srcData: ArrayBuffer | ArrayBufferView, offset: number, bytelength: number, dstOffset?: number): void;
    setSubDataEx(srcData: ArrayBuffer | ArrayBufferView, offset: number, bytelength: number, dstOffset?: number): void;
    readDataFromBuffer(): void;
    destroy(): void;
    release(): void;
}
