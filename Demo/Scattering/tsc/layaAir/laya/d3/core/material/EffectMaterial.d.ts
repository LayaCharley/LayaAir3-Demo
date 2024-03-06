import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Material } from "./Material";
export declare class EffectMaterial extends Material {
    static defaultMaterial: EffectMaterial;
    get color(): Color;
    set color(value: Color);
    get texture(): BaseTexture;
    set texture(value: BaseTexture);
    get tilingOffset(): Vector4;
    set tilingOffset(value: Vector4);
    constructor();
    clone(): any;
    static RENDERMODE_ADDTIVE: number;
    static RENDERMODE_ALPHABLENDED: number;
    set renderMode(value: number);
}
