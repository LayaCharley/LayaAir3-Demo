import { BufferTargetType, BufferUsage } from "./RenderEnum/BufferTargetType";
import { Buffer } from "./Buffer";
import { VertexDeclaration } from "./VertexDeclaration";
export declare class VertexBuffer extends Buffer {
    private _instanceBuffer;
    get vertexDeclaration(): VertexDeclaration | null;
    set vertexDeclaration(value: VertexDeclaration | null);
    get instanceBuffer(): boolean;
    set instanceBuffer(value: boolean);
    constructor(targetType: BufferTargetType, bufferUsageType: BufferUsage);
}
