import { BufferTargetType, BufferUsage } from "./RenderEnum/BufferTargetType";
import { IRenderBuffer } from "./RenderInterface/IRenderBuffer";
export declare class Buffer {
    _glBuffer: IRenderBuffer;
    _buffer: Float32Array | Uint16Array | Uint8Array | Uint32Array;
    _bufferType: number;
    _bufferUsage: number;
    _byteLength: number;
    get bufferUsage(): number;
    constructor(targetType: BufferTargetType, bufferUsageType: BufferUsage);
    bind(): boolean;
    unbind(): void;
    destroy(): void;
}
