import { IndexBuffer } from "../../RenderEngine/IndexBuffer";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
export declare class IndexBuffer3D extends IndexBuffer {
    get indexType(): IndexFormat;
    get indexTypeByteCount(): number;
    get indexCount(): number;
    get canRead(): boolean;
    constructor(indexType: IndexFormat, indexCount: number, bufferUsage?: BufferUsage, canRead?: boolean);
    setData(data: any, bufferOffset?: number, dataStartIndex?: number, dataCount?: number): void;
    getData(): Uint16Array;
    destroy(): void;
}
