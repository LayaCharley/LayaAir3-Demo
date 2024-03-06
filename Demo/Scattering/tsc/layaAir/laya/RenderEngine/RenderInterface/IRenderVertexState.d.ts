import { IndexBuffer } from "../IndexBuffer";
import { VertexBuffer } from "../VertexBuffer";
import { VertexDeclaration } from "../VertexDeclaration";
export interface IRenderVertexState {
    _vertexDeclaration: VertexDeclaration[];
    _bindedIndexBuffer: IndexBuffer;
    _vertexBuffers: VertexBuffer[];
    applyVertexBuffer(vertexBuffer: VertexBuffer[]): void;
    applyIndexBuffer(indexBuffer: IndexBuffer | null): void;
}
