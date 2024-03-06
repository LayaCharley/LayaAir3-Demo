import { VertexBuffer } from "../../RenderEngine/VertexBuffer";
import { Buffer2D } from "./Buffer2D";
export declare class VertexBuffer2D extends VertexBuffer {
    static create: Function;
    buffer2D: Buffer2D;
    private _vertexStride;
    get vertexStride(): number;
    constructor(vertexStride: number, bufferUsage: number);
    getFloat32Array(): Float32Array;
    get _floatArray32(): Float32Array;
    get _uint32Array(): Uint32Array;
    appendArray(data: any[]): void;
    deleteBuffer(): void;
    _bindForVAO(): void;
    destroy(): void;
}
