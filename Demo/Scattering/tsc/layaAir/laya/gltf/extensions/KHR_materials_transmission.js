import { MaterialRenderMode } from "../../d3/core/material/Material";
import { glTFResource } from "../glTFResource";
import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFShader } from "../shader/glTFShader";
const ExtensionName = "KHR_materials_transmission";
export class KHR_materials_transmission {
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
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_transmission;
                if (extension) {
                    if (extension.transmissionTexture) {
                        let sRGB = false;
                        let promise = this._resource.loadTextureFromInfo(extension.transmissionTexture, sRGB, basePath, progress);
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
        let extension = glTFMaterial.extensions.KHR_materials_transmission;
        let transmissionFactor = (_a = extension.transmissionFactor) !== null && _a !== void 0 ? _a : 0.0;
        material.materialRenderMode = MaterialRenderMode.RENDERMODE_CUSTOME;
        material.renderQueue = 3000;
        material.setDefine(PBRShaderLib.DEFINE_TRANSMISSION, true);
        material.setFloat("u_TransmissionFactor", transmissionFactor);
        if (extension.transmissionTexture) {
            this._resource.setMaterialTextureProperty(material, extension.transmissionTexture, "u_TransmissionTexture", glTFShader.Define_TransmissionMap, "u_TransmissionMapTransform", glTFShader.Define_TransmissionMapTransform);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_transmission(resource));

//# sourceMappingURL=KHR_materials_transmission.js.map
