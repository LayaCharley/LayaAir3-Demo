import { IBatchProgress } from "../../net/BatchProgress";
import { glTFResource } from "../glTFResource";
import { glTFExtension } from "./glTFExtension";
import { Material } from "../../d3/core/material/Material";
import * as glTF from "../glTFInterface";
declare module "../glTFInterface" {
    interface glTFMaterialAnisotropy {
        anisotropyStrength: number;
        anisotropyRotation: number;
        anisotropyTexture: glTFTextureInfo;
    }
}
export declare class KHR_materials_anisotropy implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    loadAdditionTextures(basePath: string, progress?: IBatchProgress): Promise<any>;
    additionMaterialProperties(glTFMaterial: glTF.glTFMaterial, material: Material): void;
}
