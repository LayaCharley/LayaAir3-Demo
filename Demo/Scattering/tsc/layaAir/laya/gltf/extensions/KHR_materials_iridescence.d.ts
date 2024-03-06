import * as glTF from "../glTFInterface";
import { IBatchProgress } from "../../net/BatchProgress";
import { glTFResource } from "../glTFResource";
import { glTFExtension } from "./glTFExtension";
import { Material } from "../../d3/core/material/Material";
declare module "../glTFInterface" {
    interface glTFMaterialIridescence {
        iridescenceFactor: number;
        iridescenceTexture: glTFTextureInfo;
        iridescenceIor: number;
        iridescenceThicknessMinimum: number;
        iridescenceThicknessMaximum: number;
        iridescenceThicknessTexture: glTFTextureInfo;
    }
}
export declare class KHR_materials_iridescence implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    loadAdditionTextures(basePath: string, progress?: IBatchProgress): Promise<any>;
    additionMaterialProperties(glTFMaterial: glTF.glTFMaterial, material: Material): void;
}
