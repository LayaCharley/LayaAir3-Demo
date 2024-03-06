import { WGPUShaderVariable } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WGPUShaderVariable";
import { WebGPUBuffer } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUBuffer";
import { WebGPUInternalTex } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUInternalTex";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
export interface BindGroupResourceMap {
    [key: number]: WebGPUBuffer | WebGPUInternalTex;
}
export declare class WGPUShaderData extends ShaderData {
    static arrayOne: Float32Array;
    static arrayVec2: Float32Array;
    static arrayVec3: Float32Array;
    static arrayVec4: Float32Array;
    protected _device: GPUDevice;
    constructor();
    private _setChangeFlag;
    private uploadUniformOneValue;
    private uploadUniformVec2Value;
    private uploadUniformVec3Value;
    private uploadUniformVec4Value;
    private uploadUniformMatValue;
    private uploadUniformBufferValue;
    private uploadUniformTexture;
    private rebindResource;
    setInt(index: number, value: number): void;
    setBool(index: number, value: boolean): void;
    setNumber(index: number, value: number): void;
    setVector2(index: number, value: Vector2): void;
    setVector3(index: number, value: Vector3): void;
    setVector(index: number, value: Vector4): void;
    setColor(index: number, value: Color): void;
    setMatrix4x4(index: number, value: Matrix4x4): void;
    setBuffer(index: number, value: Float32Array): void;
    setTexture(index: number, value: BaseTexture): void;
    updateBindGroup(): void;
    clearBindGroup(): void;
    getBindGroup(shaderVariable: WGPUShaderVariable): GPUBindGroup;
    destroy(): void;
}
export declare class ShaderDataCacheNode {
    constructor(variable: WGPUShaderVariable, shaderData: WGPUShaderData);
    needUpdate(propertyIndex: number): boolean;
    rebuild(shaderData: WGPUShaderData): void;
    destroy(): void;
}
