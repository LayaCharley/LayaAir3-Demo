import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { INativeUploadNode } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/INativeUploadNode";
import { MemoryDataType } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/MemoryDataType";
import { UploadMemory } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/UploadMemory";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { BaseTexture } from "../../../resource/BaseTexture";
import { NativeUniformBufferObject } from "./NativeUniformBufferObject";
export declare enum NativeShaderDataType {
    Number32 = 0,
    Vector2 = 1,
    Vector3 = 2,
    Vector4 = 3,
    Matrix4x4 = 4,
    Number32Array = 5,
    Texture = 6,
    ShaderDefine = 7,
    UBO = 8
}
export declare class NativeShaderData extends ShaderData implements INativeUploadNode {
    private inUploadList;
    _dataType: MemoryDataType;
    nativeObjID: number;
    _nativeObj: any;
    updateMap: Map<number, Function>;
    updataSizeMap: Map<number, number>;
    payload32bitNum: number;
    clearUpload(): void;
    applyUBOData(): void;
    compressNumber(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressVector2(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressVector3(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressVector4(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressMatrix4x4(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressNumberArray(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressTexture(index: number, memoryBlock: UploadMemory, stride: number): number;
    compressUBO(index: number, memoryBlock: UploadMemory, stride: number): number;
    private configMotionProperty;
    setBool(index: number, value: boolean): void;
    setInt(index: number, value: number): void;
    setNumber(index: number, value: number): void;
    setVector2(index: number, value: Vector2): void;
    setVector3(index: number, value: Vector3): void;
    setVector(index: number, value: Vector4): void;
    setColor(index: number, value: Color): void;
    setMatrix4x4(index: number, value: Matrix4x4): void;
    setBuffer(index: number, value: Float32Array): void;
    setTexture(index: number, value: BaseTexture): void;
    setUniformBuffer(index: number, value: NativeUniformBufferObject): void;
    setValueData(index: number, value: any): void;
    cloneTo(destObject: NativeShaderData): void;
    clone(): any;
    destroy(): void;
}
