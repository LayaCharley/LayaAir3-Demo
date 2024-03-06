import { BufferTargetType, BufferUsage } from "./RenderEnum/BufferTargetType";
import { Buffer } from "./Buffer";
export declare class IndexBuffer extends Buffer {
    constructor(targetType: BufferTargetType, bufferUsageType: BufferUsage);
    _setIndexData(data: number): void;
    _setIndexData(data: Uint32Array | Uint16Array | Uint8Array, bufferOffset: number): void;
}
