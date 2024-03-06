import { BufferUsage } from "./RenderEnum/BufferTargetType";
import { SubUniformBufferData } from "./SubUniformBufferData";
import { UnifromBufferData } from "./UniformBufferData";
import { Buffer } from "./Buffer";
export declare class UniformBufferObject extends Buffer {
    static UBONAME_SCENE: string;
    static UBONAME_CAMERA: string;
    static UBONAME_SPRITE3D: string;
    static UBONAME_SHADOW: string;
    private static commonMap;
    static create(name: string, bufferUsage: number, bytelength: number, isSingle?: boolean): UniformBufferObject;
    static getBuffer(name: string, index: number): UniformBufferObject;
    _glPointer: number;
    _name: string;
    byteLength: number;
    constructor(glPointer: number, name: string, bufferUsage: BufferUsage, byteLength: number, isSingle: boolean);
    _reset(bytelength: number): void;
    bind(): boolean;
    setData(buffer: Float32Array, bufferOffset?: number, byteCount?: number): void;
    setDataByUniformBufferData(bufferData: UnifromBufferData): void;
    setDataByByUniformBufferDataOffset(bufferData: SubUniformBufferData, offset: number): void;
    destroy(): void;
}
