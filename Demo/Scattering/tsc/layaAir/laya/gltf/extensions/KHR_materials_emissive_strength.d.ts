import { Material } from "../../d3/core/material/Material";
import { glTFMaterial } from "../glTFInterface";
import { glTFExtension } from "./glTFExtension";
import { glTFResource } from "../glTFResource";
declare module "../glTFInterface" {
    interface glTFMaterialEmissionStrength {
        emissiveStrength: number;
    }
}
export declare class KHR_materials_emissive_strength implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    additionMaterialProperties(glTFMaterial: glTFMaterial, material: Material): void;
}
