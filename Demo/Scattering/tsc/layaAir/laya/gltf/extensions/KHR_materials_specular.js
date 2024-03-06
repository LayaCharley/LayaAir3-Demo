import { glTFResource } from "../glTFResource";
import { Vector3 } from "../../maths/Vector3";
import { glTFShader } from "../shader/glTFShader";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
const ExtensionName = "KHR_materials_specular";
export class KHR_materials_specular {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    loadAdditionTextures(basePath, progress) {
        let promises = [];
        let materials = this._resource.data.materials;
        let textures = this._resource.data.textures;
        if (materials && textures) {
            materials.forEach(material => {
                var _a;
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_specular;
                if (extension) {
                    if (extension.specularTexture) {
                        let sRGB = false;
                        let promise = this._resource.loadTextureFromInfo(extension.specularTexture, sRGB, basePath, progress);
                        promises.push(promise);
                    }
                    if (extension.specularColorTexture) {
                        let sRGB = true;
                        let promise = this._resource.loadTextureFromInfo(extension.specularColorTexture, sRGB, basePath, progress);
                        promises.push(promise);
                    }
                }
            });
        }
        return Promise.all(promises);
    }
    additionMaterialProperties(glTFMaterial, material) {
        var _a;
        let extension = glTFMaterial.extensions.KHR_materials_specular;
        let specularFactor = (_a = extension.specularFactor) !== null && _a !== void 0 ? _a : 1.0;
        let specularColorFactor = new Vector3(1.0, 1.0, 1.0);
        if (extension.specularColorFactor) {
            specularColorFactor.fromArray(extension.specularColorFactor);
        }
        material.setDefine(Shader3D.getDefineByName("SPECULAR"), true);
        material.setFloat("u_SpecularFactor", specularFactor);
        material.setVector3("u_SpecularColorFactor", specularColorFactor);
        if (extension.specularTexture) {
            this._resource.setMaterialTextureProperty(material, extension.specularTexture, "u_SpecularFactorTexture", glTFShader.Define_SpecularFactorMap, "u_SpecularFactorMapTransfrom", glTFShader.Define_SpecularFactorMapTransform);
        }
        if (extension.specularColorTexture) {
            this._resource.setMaterialTextureProperty(material, extension.specularColorTexture, "u_SpecularColorTexture", glTFShader.Define_SpecularColorMap, "u_SpecularColorMapTransform", glTFShader.Define_SpecularColorMapTransform);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_specular(resource));

//# sourceMappingURL=KHR_materials_specular.js.map
