import { BaseTexture } from "../../resource/BaseTexture";
import { ShaderDefine } from "./ShaderDefine";
import { IClone } from "../../utils/IClone";
import { UniformBufferObject } from "../UniformBufferObject";
import { Color } from "../../maths/Color";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Quaternion } from "../../maths/Quaternion";
import { Vector2 } from "../../maths/Vector2";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { Matrix3x3 } from "../../maths/Matrix3x3";
export declare enum ShaderDataType {
    Int = 0,
    Bool = 1,
    Float = 2,
    Vector2 = 3,
    Vector3 = 4,
    Vector4 = 5,
    Color = 6,
    Matrix4x4 = 7,
    Texture2D = 8,
    TextureCube = 9,
    Buffer = 10,
    Matrix3x3 = 11
}
export declare type ShaderDataItem = number | boolean | Vector2 | Vector3 | Vector4 | Color | Matrix4x4 | BaseTexture | Float32Array | Matrix3x3;
export declare function ShaderDataDefaultValue(type: ShaderDataType): false | Readonly<Vector2> | 0 | Readonly<Matrix3x3> | Readonly<Vector3> | Readonly<Matrix4x4> | Readonly<Vector4> | Color;
export declare class ShaderData implements IClone {
    get uniformBuffersMap(): Map<number, UniformBufferObject>;
    applyUBOData(): void;
    addDefine(define: ShaderDefine): void;
    removeDefine(define: ShaderDefine): void;
    hasDefine(define: ShaderDefine): boolean;
    clearDefine(): void;
    getBool(index: number): boolean;
    setBool(index: number, value: boolean): void;
    getInt(index: number): number;
    setInt(index: number, value: number): void;
    getNumber(index: number): number;
    setNumber(index: number, value: number): void;
    getVector2(index: number): Vector2;
    setVector2(index: number, value: Vector2): void;
    getVector3(index: number): Vector3;
    setVector3(index: number, value: Vector3): void;
    getVector(index: number): Vector4;
    setVector(index: number, value: Vector4): void;
    getColor(index: number): Color;
    setColor(index: number, value: Color): void;
    getMatrix4x4(index: number): Matrix4x4;
    setMatrix4x4(index: number, value: Matrix4x4): void;
    getMatrix3x3(index: number): Matrix3x3;
    setMatrix3x3(index: number, value: Matrix3x3): void;
    getBuffer(index: number): Float32Array;
    setBuffer(index: number, value: Float32Array): void;
    setTexture(index: number, value: BaseTexture): void;
    getTexture(index: number): BaseTexture;
    getSourceIndex(value: any): number;
    setValueData(index: number, value: any): void;
    setUniformBuffer(index: number, value: UniformBufferObject): void;
    getUniformBuffer(index: number): UniformBufferObject;
    setShaderData(uniformIndex: number, type: ShaderDataType, value: ShaderDataItem | Quaternion): void;
    getShaderData(uniformIndex: number, type: ShaderDataType): number | boolean | Vector2 | Float32Array | Vector3 | Matrix3x3 | Matrix4x4 | Vector4 | Color | BaseTexture;
    getValueData(index: number): any;
    cloneTo(destObject: ShaderData): void;
    clone(): any;
    reset(): void;
    destroy(): void;
}
