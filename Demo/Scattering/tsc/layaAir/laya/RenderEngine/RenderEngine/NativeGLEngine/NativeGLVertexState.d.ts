import { IndexBuffer } from "../../IndexBuffer";
import { IRenderVertexState } from "../../RenderInterface/IRenderVertexState";
import { VertexBuffer } from "../../VertexBuffer";
import { VertexDeclaration } from "../../VertexDeclaration";
import { NativeGLObject } from "./NativeGLObject";
import { NativeWebGLEngine } from "./NativeWebGLEngine";
export declare class NativeGLVertexState extends NativeGLObject implements IRenderVertexState {
    _vertexDeclaration: VertexDeclaration[];
    _bindedIndexBuffer: IndexBuffer;
    _vertexBuffers: VertexBuffer[];
    _nativeVertexBuffers: any[];
    _nativeObj: any;
    constructor(engine: NativeWebGLEngine);
    bindVertexArray(): void;
    unbindVertexArray(): void;
    applyVertexBuffer(vertexBuffer: VertexBuffer[]): void;
    applyIndexBuffer(indexBuffer: IndexBuffer | null): void;
}
