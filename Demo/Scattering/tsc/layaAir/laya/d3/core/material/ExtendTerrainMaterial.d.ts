import { Vector4 } from "../../../maths/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Material } from "./Material";
export declare class ExtendTerrainMaterial extends Material {
    static RENDERMODE_OPAQUE: number;
    static RENDERMODE_TRANSPARENT: number;
    get splatAlphaTexture(): BaseTexture;
    set splatAlphaTexture(value: BaseTexture);
    get diffuseTexture1(): BaseTexture;
    set diffuseTexture1(value: BaseTexture);
    get diffuseTexture2(): BaseTexture;
    set diffuseTexture2(value: BaseTexture);
    get diffuseTexture3(): BaseTexture;
    set diffuseTexture3(value: BaseTexture);
    get diffuseTexture4(): BaseTexture;
    set diffuseTexture4(value: BaseTexture);
    get diffuseTexture5(): BaseTexture;
    set diffuseTexture5(value: BaseTexture);
    set diffuseScaleOffset1(scaleOffset1: Vector4);
    set diffuseScaleOffset2(scaleOffset2: Vector4);
    set diffuseScaleOffset3(scaleOffset3: Vector4);
    set diffuseScaleOffset4(scaleOffset4: Vector4);
    set diffuseScaleOffset5(scaleOffset5: Vector4);
    set renderMode(value: number);
    constructor();
    clone(): any;
}
