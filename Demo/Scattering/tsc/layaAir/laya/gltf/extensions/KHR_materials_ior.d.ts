import * as glTF from "../glTFInterface";
import { Material } from "../../d3/core/material/Material";
import { glTFResource } from "../glTFResource";
import { glTFExtension } from "./glTFExtension";
declare module "../glTFInterface" {
    interface glTFMaterialIOR {
        ior: number;
    }
}
export declare class KHR_materials_ior implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    additionMaterialProperties(glTFMaterial: glTF.glTFMaterial, material: Material): void;
}
