import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { VertexBuffer } from "../../RenderEngine/VertexBuffer";
import { VertexDeclaration } from "../../RenderEngine/VertexDeclaration";
export declare class VertexBuffer3D extends VertexBuffer {
    get vertexDeclaration(): VertexDeclaration | null;
    set vertexDeclaration(value: VertexDeclaration | null);
    get canRead(): boolean;
    constructor(byteLength: number, bufferUsage: BufferUsage, canRead?: boolean);
    orphanStorage(): void;
    setData(buffer: ArrayBuffer, bufferOffset?: number, dataStartIndex?: number, dataCount?: number): void;
    getUint8Data(): Uint8Array;
    getFloat32Data(): Float32Array | null;
    markAsUnreadbale(): void;
    destroy(): void;
}
