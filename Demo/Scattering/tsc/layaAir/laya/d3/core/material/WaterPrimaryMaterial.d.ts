import { Vector4 } from "../../../maths/Vector4";
import { ShaderDefine } from "../../../RenderEngine/RenderShader/ShaderDefine";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Material } from "./Material";
export declare class WaterPrimaryMaterial extends Material {
    static HORIZONCOLOR: number;
    static MAINTEXTURE: number;
    static NORMALTEXTURE: number;
    static WAVESCALE: number;
    static WAVESPEED: number;
    static SHADERDEFINE_MAINTEXTURE: ShaderDefine;
    static SHADERDEFINE_NORMALTEXTURE: ShaderDefine;
    static defaultMaterial: WaterPrimaryMaterial;
    get horizonColor(): Vector4;
    set horizonColor(value: Vector4);
    get mainTexture(): BaseTexture;
    set mainTexture(value: BaseTexture);
    get normalTexture(): BaseTexture;
    set normalTexture(value: BaseTexture);
    get waveScale(): number;
    set waveScale(value: number);
    get waveSpeed(): Vector4;
    set waveSpeed(value: Vector4);
    constructor();
    clone(): any;
}
