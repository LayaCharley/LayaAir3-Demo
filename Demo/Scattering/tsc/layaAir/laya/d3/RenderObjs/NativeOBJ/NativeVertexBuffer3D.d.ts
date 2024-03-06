import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
export declare class NativeVertexBuffer3D extends VertexBuffer3D {
    _conchVertexBuffer3D: any;
    get vertexDeclaration(): VertexDeclaration | null;
    set vertexDeclaration(value: VertexDeclaration | null);
    serilizeVertexDeclaration(value: VertexDeclaration): Int32Array;
    get instanceBuffer(): boolean;
    set instanceBuffer(value: boolean);
    constructor(byteLength: number, bufferUsage: BufferUsage, canRead?: boolean);
}
