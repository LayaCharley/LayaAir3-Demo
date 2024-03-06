import { BufferTargetType, BufferUsage } from "../../RenderEnum/BufferTargetType";
import { IRenderBuffer } from "../../RenderInterface/IRenderBuffer";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLBuffer extends GLObject implements IRenderBuffer {
    _glBuffer: WebGLBuffer;
    _glTarget: number;
    _glUsage: number;
    _glTargetType: BufferTargetType;
    _glBufferUsageType: BufferUsage;
    _byteLength: number;
    constructor(engine: WebGLEngine, targetType: BufferTargetType, bufferUsageType: BufferUsage);
    private _getGLUsage;
    private _getGLTarget;
    private _memorychange;
    bindBuffer(): boolean;
    unbindBuffer(): void;
    orphanStorage(): void;
    setDataLength(srcData: number): void;
    setData(srcData: ArrayBuffer | ArrayBufferView, offset: number): void;
    setDataEx(srcData: ArrayBuffer | ArrayBufferView, offset: number, length: number): void;
    bindBufferBase(glPointer: number): void;
    bindBufferRange(glPointer: number, offset: number, byteCount: number): void;
    resizeBuffer(dataLength: number): void;
    destroy(): void;
}
