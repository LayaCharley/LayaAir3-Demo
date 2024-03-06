import * as glTF from "../glTFInterface";
import { glTFResource } from "../glTFResource";
import { glTFExtension } from "./glTFExtension";
import { Matrix3x3 } from "../../maths/Matrix3x3";
declare module "../glTFInterface" {
    interface glTFTextureTransform {
        offset: number[];
        rotation: number;
        scale: number[];
        texCoord: number;
    }
}
export declare class KHR_texture_transform implements glTFExtension {
    readonly name: string;
    private _resource;
    constructor(resource: glTFResource);
    createTransform(extension: glTF.glTFTextureTransform): Matrix3x3;
    loadExtensionTextureInfo(info: glTF.glTFTextureInfo): {
        transform: Matrix3x3;
        texCoord: number;
    };
}
