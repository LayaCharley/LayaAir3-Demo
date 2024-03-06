import { Material } from "../../d3/core/material/Material";
import { IBatchProgress } from "../../net/BatchProgress";
import { glTFMaterial } from "../glTFInterface";
import { glTFExtension } from "./glTFExtension";
import { glTFResource } from "../glTFResource";
declare module "../glTFInterface" {
    interface glTFMaterialSheen {
        sheenColorFactor: number[];
        sheenColorTexture: glTFTextureInfo;
        sheenRoughnessFactor: number;
        sheenRoughnessTexture: glTFTextureInfo;
    }
}
export declare class KHR_materials_sheen implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    loadAdditionTextures(basePath: string, progress?: IBatchProgress): Promise<any>;
    additionMaterialProperties(glTFMaterial: glTFMaterial, material: Material): void;
}
