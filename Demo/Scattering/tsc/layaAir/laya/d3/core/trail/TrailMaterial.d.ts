import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Material } from "../material/Material";
export declare class TrailMaterial extends Material {
    static defaultMaterial: TrailMaterial;
    get color(): Color;
    set color(value: Color);
    get texture(): BaseTexture;
    set texture(value: BaseTexture);
    get tilingOffset(): Vector4;
    set tilingOffset(value: Vector4);
    constructor();
    clone(): any;
    static RENDERMODE_ALPHABLENDED: number;
    static RENDERMODE_ADDTIVE: number;
    set renderMode(value: number);
}
