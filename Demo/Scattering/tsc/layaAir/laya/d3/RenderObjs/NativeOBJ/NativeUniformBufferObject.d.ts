import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
export declare class NativeUniformBufferObject extends UniformBufferObject {
    _conchUniformBufferObject: any;
    constructor(glPointer: number, name: string, bufferUsage: BufferUsage, byteLength: number, isSingle: boolean);
}
