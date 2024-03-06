import { Color } from "../maths/Color";
import { Matrix4x4 } from "../maths/Matrix4x4";
import { Vector2 } from "../maths/Vector2";
import { Vector3 } from "../maths/Vector3";
import { Vector4 } from "../maths/Vector4";
export declare enum UniformBufferParamsType {
    Number = 0,
    Vector2 = 1,
    Vector3 = 2,
    Vector4 = 3,
    Matrix4x4 = 4,
    Vector4Array = 5,
    MatrixArray = 6
}
export declare class UnifromBufferData {
    _buffer: Float32Array;
    constructor(uniformParamsStat: Map<number, UniformBufferParamsType>);
    protected _addUniformParams(uniformID: number, value: UniformBufferParamsType, offset: number): number;
    private _setUpdateFlag;
    getbyteLength(): number;
    setVector4Array(name: string, value: Vector4[]): void;
    setVector4ArraybyIndex(uniformID: number, value: Vector4[]): void;
    setMatrixArray(name: string, value: Matrix4x4[]): void;
    setMatrixArraybyIndex(uniformID: number, value: Matrix4x4[]): void;
    setNumber(name: string, value: number): void;
    setNumberbyIndex(uniformID: number, value: number): void;
    setVector2(name: string, value: Vector2): void;
    setVector2byIndex(uniformID: number, value: Vector2): void;
    setVector3(name: string, value: Vector3): void;
    setVector3byIndex(uniformID: number, value: Vector3): void;
    setVector4(name: string, value: Vector4): void;
    setVector4byIndex(uniformID: number, value: Vector4): void;
    setColor(name: string, value: Color): void;
    setColorbyIndex(uniformID: number, value: Color): void;
    setMatrix(name: string, value: Matrix4x4): void;
    setMatrixbyIndex(uniformID: number, value: Matrix4x4): void;
    clone(): UnifromBufferData;
    cloneTo(destObject: UnifromBufferData): void;
}
