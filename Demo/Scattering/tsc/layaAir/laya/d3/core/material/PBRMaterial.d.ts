import { BaseTexture } from "../../../resource/BaseTexture";
import { Material } from "./Material";
import { PBRRenderQuality } from "./PBRRenderQuality";
import { Texture2D } from "../../../resource/Texture2D";
import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
export declare enum PBRRenderMode {
    Opaque = 0,
    Cutout = 1,
    Fade = 2,
    Transparent = 3
}
export declare class PBRMaterial extends Material {
    static renderQuality: PBRRenderQuality;
    static __init__(): void;
    get albedoColor(): Color;
    set albedoColor(value: Color);
    get albedoTexture(): BaseTexture;
    set albedoTexture(value: BaseTexture);
    get normalTexture(): BaseTexture;
    set normalTexture(value: BaseTexture);
    get normalTextureScale(): number;
    set normalTextureScale(value: number);
    get parallaxTexture(): BaseTexture;
    set parallaxTexture(value: BaseTexture);
    get parallaxTextureScale(): number;
    set parallaxTextureScale(value: number);
    get occlusionTexture(): BaseTexture;
    set occlusionTexture(value: BaseTexture);
    get occlusionTextureStrength(): number;
    set occlusionTextureStrength(value: number);
    get smoothness(): number;
    set smoothness(value: number);
    get enableVertexColor(): boolean;
    set enableVertexColor(value: boolean);
    get enableEmission(): boolean;
    set enableEmission(value: boolean);
    get emissionColor(): Color;
    set emissionColor(value: Color);
    set emissionIntensity(value: number);
    get emissionIntensity(): number;
    get emissionTexture(): BaseTexture;
    set emissionTexture(value: BaseTexture);
    get tilingOffset(): Vector4;
    set tilingOffset(value: Vector4);
    get detailAlbedoTexture(): BaseTexture;
    set detailAlbedoTexture(value: BaseTexture);
    get detailNormalTexture(): BaseTexture;
    set detailNormalTexture(value: BaseTexture);
    get detailTilingOffset(): Vector4;
    set detailTilingOffset(value: Vector4);
    get detailNormalScale(): number;
    set detailNormalScale(value: number);
    set renderMode(value: number);
    get anisotropyEnable(): boolean;
    set anisotropyEnable(value: boolean);
    get anisotropy(): number;
    set anisotropy(value: number);
    get anisotropyTexture(): Texture2D;
    set anisotropyTexture(value: Texture2D);
    get anisotropyRotation(): number;
    set anisotropyRotation(value: number);
    get clearCoatEnable(): boolean;
    set clearCoatEnable(value: boolean);
    get clearCoat(): number;
    set clearCoat(value: number);
    get clearCoatTexture(): BaseTexture;
    set clearCoatTexture(value: BaseTexture);
    get clearCoatRoughness(): number;
    set clearCoatRoughness(value: number);
    get clearCoatRoughnessTexture(): BaseTexture;
    set clearCoatRoughnessTexture(value: BaseTexture);
    get clearCoatNormalTexture(): BaseTexture;
    set clearCoatNormalTexture(value: BaseTexture);
    constructor();
    get smoothnessTextureScale(): number;
    set smoothnessTextureScale(value: number);
}
