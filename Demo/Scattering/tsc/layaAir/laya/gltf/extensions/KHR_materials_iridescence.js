import { glTFResource } from "../glTFResource";
import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFShader } from "../shader/glTFShader";
const ExtensionName = "KHR_materials_iridescence";
export class KHR_materials_iridescence {
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
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_iridescence;
                if (extension) {
                    if (extension.iridescenceTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.iridescenceTexture, false, basePath, progress);
                        promises.push(promise);
                    }
                    if (extension.iridescenceThicknessTexture) {
                        let promise = this._resource.loadTextureFromInfo(extension.iridescenceThicknessTexture, false, basePath, progress);
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
        var _a, _b, _c, _d;
        let extension = glTFMaterial.extensions.KHR_materials_iridescence;
        let factor = (_a = extension.iridescenceFactor) !== null && _a !== void 0 ? _a : 0.0;
        let ior = (_b = extension.iridescenceIor) !== null && _b !== void 0 ? _b : 1.3;
        let thicknessMin = (_c = extension.iridescenceThicknessMinimum) !== null && _c !== void 0 ? _c : 100;
        let thicknessMax = (_d = extension.iridescenceThicknessMaximum) !== null && _d !== void 0 ? _d : 400;
        material.setDefine(PBRShaderLib.DEFINE_IRIDESCENCE, true);
        material.setFloat("u_IridescenceFactor", factor);
        material.setFloat("u_IridescenceIor", ior);
        material.setFloat("u_IridescenceThicknessMinimum", thicknessMin);
        material.setFloat("u_IridescenceThicknessMaximum", thicknessMax);
        if (extension.iridescenceTexture) {
            this._resource.setMaterialTextureProperty(material, extension.iridescenceTexture, "u_IridescenceTexture", glTFShader.Define_IridescenceMap, "u_IridescenceMapTransform", glTFShader.Define_IridescenceMapTransform);
        }
        if (extension.iridescenceThicknessTexture) {
            this._resource.setMaterialTextureProperty(material, extension.iridescenceThicknessTexture, "u_IridescenceThicknessTexture", glTFShader.Define_IridescenceThicknessMap, "u_IridescenceThicknessMapTransform", glTFShader.Define_IridescenceThicknessMapTransform);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_iridescence(resource));

//# sourceMappingURL=KHR_materials_iridescence.js.map
