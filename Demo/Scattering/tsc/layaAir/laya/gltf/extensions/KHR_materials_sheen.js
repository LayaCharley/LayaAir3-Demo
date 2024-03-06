import { glTFResource } from "../glTFResource";
import { Vector3 } from "../../maths/Vector3";
import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFShader } from "../shader/glTFShader";
const ExtensionName = "KHR_materials_sheen";
export class KHR_materials_sheen {
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
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_sheen;
                if (extension) {
                    if (extension.sheenColorTexture) {
                        let sRGB = false;
                        let promise = this._resource.loadTextureFromInfo(extension.sheenColorTexture, sRGB, basePath, progress);
                        promises.push(promise);
                    }
                    if (extension.sheenRoughnessTexture) {
                        let sRGB = false;
                        let promise = this._resource.loadTextureFromInfo(extension.sheenRoughnessTexture, sRGB, basePath, progress);
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
        var _a;
        let extension = glTFMaterial.extensions.KHR_materials_sheen;
        material.setDefine(PBRShaderLib.DEFINE_SHEEN, true);
        let sheenColorFactor = new Vector3(0, 0, 0);
        if (extension.sheenColorFactor) {
            sheenColorFactor.fromArray(extension.sheenColorFactor);
        }
        let sheenRoughnessFactor = (_a = extension.sheenRoughnessFactor) !== null && _a !== void 0 ? _a : 0.0;
        material.setVector3("u_SheenColorFactor", sheenColorFactor);
        material.setFloat("u_SheenRoughness", sheenRoughnessFactor);
        if (extension.sheenColorTexture) {
            this._resource.setMaterialTextureProperty(material, extension.sheenColorTexture, "u_SheenColorTexture", glTFShader.Define_SheenColorMap, "u_SheenColorMapTransform", glTFShader.Define_SheenColorMapTransform);
        }
        if (extension.sheenRoughnessTexture) {
            this._resource.setMaterialTextureProperty(material, extension.sheenRoughnessTexture, "u_SheenRoughnessTexture", glTFShader.Define_SheenRoughnessMap, "u_SheenRoughnessMapTransform", glTFShader.Define_SheenRoughnessMapTransform);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_sheen(resource));

//# sourceMappingURL=KHR_materials_sheen.js.map
