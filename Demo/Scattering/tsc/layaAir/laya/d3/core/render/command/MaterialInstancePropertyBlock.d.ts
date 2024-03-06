import { Vector2 } from "../../../../maths/Vector2";
import { Vector3 } from "../../../../maths/Vector3";
import { Vector4 } from "../../../../maths/Vector4";
export declare enum InstanceLocation {
    CUSTOME0 = 12,
    CUSTOME1 = 13,
    CUSTOME2 = 14,
    CUSTOME3 = 15
}
export declare class MaterialInstancePropertyBlock {
    static INSTANCETYPE_ATTRIBUTE: number;
    static INSTANCETYPE_UNIFORMBUFFER: number;
    constructor();
    private _creatProperty;
    setVectorArray(attributeName: string, arrays: Vector4[] | Float32Array, attributeLocation: InstanceLocation): void;
    setVector3Array(attributeName: string, arrays: Vector3[] | Float32Array, attributeLocation: InstanceLocation): void;
    setVector2Array(attributeName: string, arrays: Vector2[] | Float32Array, attributeLocation: InstanceLocation): void;
    setNumberArray(attributeName: string, arrays: Float32Array, attributeLocation: InstanceLocation): void;
    getPropertyArray(attributeLocation: InstanceLocation): Vector4[] | Vector3[] | Vector2[] | Float32Array;
    clear(): void;
}
