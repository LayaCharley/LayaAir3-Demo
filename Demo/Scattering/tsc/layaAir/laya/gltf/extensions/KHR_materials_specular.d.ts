import * as glTF from "../glTFInterface";
import { Material } from "../../d3/core/material/Material";
import { IBatchProgress } from "../../net/BatchProgress";
import { Texture2D } from "../../resource/Texture2D";
import { glTFResource } from "../glTFResource";
import { glTFExtension } from "./glTFExtension";
declare module "../glTFInterface" {
    interface glTFMaterialSpecular {
        specularFactor: number;
        specularTexture: glTFTextureInfo;
        specularColorFactor: number[];
        specularColorTexture: glTFTextureInfo;
    }
}
export declare class KHR_materials_specular implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    loadAdditionTextures(basePath: string, progress?: IBatchProgress): Promise<Texture2D[]>;
    additionMaterialProperties(glTFMaterial: glTF.glTFMaterial, material: Material): void;
}
