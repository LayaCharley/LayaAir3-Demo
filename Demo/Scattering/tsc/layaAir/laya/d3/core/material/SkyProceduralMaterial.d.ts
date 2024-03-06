import { Color } from "../../../maths/Color";
import { Material } from "./Material";
export declare class SkyProceduralMaterial extends Material {
    static SUN_NODE: number;
    static SUN_SIMPLE: number;
    static SUN_HIGH_QUALITY: number;
    static defaultMaterial: SkyProceduralMaterial;
    get sunDisk(): number;
    set sunDisk(value: number);
    get sunSize(): number;
    set sunSize(value: number);
    get sunSizeConvergence(): number;
    set sunSizeConvergence(value: number);
    get atmosphereThickness(): number;
    set atmosphereThickness(value: number);
    get skyTint(): Color;
    set skyTint(value: Color);
    get groundTint(): Color;
    set groundTint(value: Color);
    get exposure(): number;
    set exposure(value: number);
    constructor();
    clone(): any;
}
