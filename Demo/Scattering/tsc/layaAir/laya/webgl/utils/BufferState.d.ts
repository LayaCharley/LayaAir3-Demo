import { IndexBuffer } from "../../RenderEngine/IndexBuffer";
import { IRenderVertexState } from "../../RenderEngine/RenderInterface/IRenderVertexState";
import { VertexBuffer } from "../../RenderEngine/VertexBuffer";
export declare class BufferState {
    static _curBindedBufferState: BufferState;
    protected _nativeVertexArrayObject: IRenderVertexState;
    constructor();
    protected applyVertexBuffers(): void;
    protected applyIndexBuffers(): void;
    applyState(vertexBuffers: VertexBuffer[], indexBuffer: IndexBuffer | null): void;
    bind(): void;
    unBind(): void;
    isbind(): boolean;
    static clearbindBufferState(): void;
    destroy(): void;
}
