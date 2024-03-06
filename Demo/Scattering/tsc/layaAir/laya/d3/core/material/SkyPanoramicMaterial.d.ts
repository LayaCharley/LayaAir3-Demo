import { Texture2D } from "../../../resource/Texture2D";
import { Material } from "./Material";
import { Color } from "../../../maths/Color";
export declare class SkyPanoramicMaterial extends Material {
    static TINTCOLOR: number;
    static EXPOSURE: number;
    static ROTATION: number;
    static TEXTURE: number;
    static TEXTURE_HDR_PARAMS: number;
    get tintColor(): Color;
    set tintColor(value: Color);
    get exposure(): number;
    set exposure(value: number);
    get rotation(): number;
    set rotation(value: number);
    get panoramicTexture(): Texture2D;
    set panoramicTexture(value: Texture2D);
    constructor();
}
