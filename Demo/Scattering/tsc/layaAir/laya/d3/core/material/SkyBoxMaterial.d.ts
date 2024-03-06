import { Color } from "../../../maths/Color";
import { TextureCube } from "../../../resource/TextureCube";
import { Material } from "./Material";
export declare class SkyBoxMaterial extends Material {
    static TINTCOLOR: number;
    static EXPOSURE: number;
    static ROTATION: number;
    static TEXTURECUBE: number;
    static defaultMaterial: SkyBoxMaterial;
    get tintColor(): Color;
    set tintColor(value: Color);
    get exposure(): number;
    set exposure(value: number);
    get rotation(): number;
    set rotation(value: number);
    get textureCube(): TextureCube;
    set textureCube(value: TextureCube);
    clone(): any;
    constructor();
}
