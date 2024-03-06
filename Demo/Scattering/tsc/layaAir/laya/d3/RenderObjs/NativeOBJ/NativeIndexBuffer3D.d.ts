import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
export declare class NativeIndexBuffer3D extends IndexBuffer3D {
    _conchIndexBuffer3D: any;
    constructor(indexType: IndexFormat, indexCount: number, bufferUsage?: BufferUsage, canRead?: boolean);
}
