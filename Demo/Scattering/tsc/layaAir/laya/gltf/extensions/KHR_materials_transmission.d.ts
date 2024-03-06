import * as glTF from "../glTFInterface";
import { Material } from "../../d3/core/material/Material";
import { IBatchProgress } from "../../net/BatchProgress";
import { glTFExtension } from "./glTFExtension";
import { glTFResource } from "../glTFResource";
declare module "../glTFInterface" {
    interface glTFMaterialTransmission {
        transmissionFactor: number;
        transmissionTexture: glTFTextureInfo;
    }
}
export declare class KHR_materials_transmission implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    loadAdditionTextures(basePath: string, progress?: IBatchProgress): Promise<any>;
    additionMaterialProperties(glTFMaterial: glTF.glTFMaterial, material: Material): void;
}
