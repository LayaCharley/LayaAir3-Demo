import { BaseTexture } from "../../../resource/BaseTexture";
import { PBRMaterial } from "./PBRMaterial";
export declare enum PBRMetallicSmoothnessSource {
    MetallicGlossTextureAlpha = 0,
    AlbedoTextureAlpha = 1
}
export declare class PBRStandardMaterial extends PBRMaterial {
    static defaultMaterial: PBRStandardMaterial;
    get metallicGlossTexture(): BaseTexture;
    set metallicGlossTexture(value: BaseTexture);
    get metallic(): number;
    set metallic(value: number);
    get smoothnessSource(): PBRMetallicSmoothnessSource;
    set smoothnessSource(value: PBRMetallicSmoothnessSource);
    constructor();
    clone(): any;
}
