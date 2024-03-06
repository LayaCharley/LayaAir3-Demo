import { IndexBuffer } from "../../IndexBuffer";
import { IRenderVertexState } from "../../RenderInterface/IRenderVertexState";
import { VertexBuffer } from "../../VertexBuffer";
import { VertexDeclaration } from "../../VertexDeclaration";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLVertexState extends GLObject implements IRenderVertexState {
    private _angleInstancedArrays;
    private _vaoExt;
    private _vao;
    _vertexDeclaration: VertexDeclaration[];
    _bindedIndexBuffer: IndexBuffer;
    _vertexBuffers: VertexBuffer[];
    constructor(engine: WebGLEngine);
    applyVertexBuffer(vertexBuffer: VertexBuffer[]): void;
    clearVAO(): void;
    applyIndexBuffer(indexBuffer: IndexBuffer | null): void;
}
