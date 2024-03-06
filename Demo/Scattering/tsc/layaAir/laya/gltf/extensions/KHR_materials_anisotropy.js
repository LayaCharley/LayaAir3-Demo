import { glTFResource } from "../glTFResource";
import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFShader } from "../shader/glTFShader";
const ExtensionName = "KHR_materials_anisotropy";
export class KHR_materials_anisotropy {
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
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_anisotropy;
                if (extension) {
                    if (extension.anisotropyTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.anisotropyTexture, false, basePath, progress);
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
        var _a, _b;
        let extension = glTFMaterial.extensions.KHR_materials_anisotropy;
        let anisotropy = (_a = extension.anisotropyStrength) !== null && _a !== void 0 ? _a : 0.0;
        let rotation = (_b = extension.anisotropyRotation) !== null && _b !== void 0 ? _b : 0.0;
        material.setDefine(PBRShaderLib.DEFINE_ANISOTROPY, true);
        material.setFloat("u_AnisotropyStrength", anisotropy);
        material.setFloat("u_AnisotropyRotation", rotation);
        if (extension.anisotropyTexture) {
            let tex = this._resource.getTextureWithInfo(extension.anisotropyTexture);
            material.setTexture("u_AnisotropyTexture", tex);
            material.setDefine(glTFShader.Define_AnisotropyMap, true);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_anisotropy(resource));

//# sourceMappingURL=KHR_materials_anisotropy.js.map
