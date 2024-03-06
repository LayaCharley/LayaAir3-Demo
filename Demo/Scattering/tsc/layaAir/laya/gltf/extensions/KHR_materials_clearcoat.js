import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFResource } from "../glTFResource";
import { glTFShader } from "../shader/glTFShader";
const ExtensionName = "KHR_materials_clearcoat";
export class KHR_materials_clearcoat {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    loadAdditionTextures(basePath, progress) {
        let materials = this._resource.data.materials;
        let textures = this._resource.data.textures;
        if (materials && textures) {
            let promises = [];
            materials.forEach(material => {
                var _a;
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_clearcoat;
                if (extension) {
                    if (extension.clearcoatTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.clearcoatTexture, false, basePath, progress);
                        promises.push(promise);
                    }
                    if (extension.clearcoatRoughnessTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.clearcoatRoughnessTexture, false, basePath, progress);
                        promises.push(promise);
                    }
                    if (extension.clearcoatNormalTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.clearcoatNormalTexture, false, basePath, progress);
                        promises.push(promise);
                    }
                }
            });
            return Promise.all(promises);
        }
        else {
            return Promise.resolve();
        }
    }
    additionMaterialProperties(glTFMaterial, material) {
        var _a, _b, _c;
        let extension = glTFMaterial.extensions.KHR_materials_clearcoat;
        let clearCoat = (_a = extension.clearcoatFactor) !== null && _a !== void 0 ? _a : 0.0;
        let clearCoatRoughness = (_b = extension.clearcoatRoughnessFactor) !== null && _b !== void 0 ? _b : 0.0;
        material.setDefine(PBRShaderLib.DEFINE_CLEARCOAT, true);
        material.setFloat("u_ClearCoatFactor", clearCoat);
        if (extension.clearcoatTexture) {
            this._resource.setMaterialTextureProperty(material, extension.clearcoatTexture, "u_ClearCoatTexture", glTFShader.Define_ClearCoatMap, "u_ClearCoatMapTransform", glTFShader.Define_ClearCoatMapTransform);
        }
        material.setFloat("u_ClearCoatRoughness", clearCoatRoughness);
        if (extension.clearcoatRoughnessTexture) {
            this._resource.setMaterialTextureProperty(material, extension.clearcoatRoughnessTexture, "u_ClearCoatRoughnessTexture", glTFShader.Define_ClearCoatRoughnessMap, "u_ClearCoatRoughnessMapTransform", glTFShader.Define_ClearCoatRoughnessMapTransform);
        }
        if (extension.clearcoatNormalTexture) {
            material.setDefine(PBRShaderLib.DEFINE_CLEARCOAT_NORMAL, true);
            this._resource.setMaterialTextureProperty(material, extension.clearcoatNormalTexture, "u_ClearCoatNormalTexture", null, "u_ClearCoatNormalMapTransform", glTFShader.Define_ClearCoatNormalMapTransform);
            let scale = (_c = extension.clearcoatNormalTexture.scale) !== null && _c !== void 0 ? _c : 1.0;
            material.setFloat("u_ClearCoatNormalScale", scale);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_clearcoat(resource));

//# sourceMappingURL=KHR_materials_clearcoat.js.map
