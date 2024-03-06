import { glTFResource } from "../glTFResource";
import { glTFShader } from "../shader/glTFShader";
import { Vector3 } from "../../maths/Vector3";
const ExtensionName = "KHR_materials_volume";
export class KHR_materials_volume {
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
                let extension = (_a = material.extensions) === null || _a === void 0 ? void 0 : _a.KHR_materials_volume;
                if (extension) {
                    if (extension.thicknessTexture) {
                        let sRGB = false;
                        let promise = this._resource.loadTextureFromInfo(extension.thicknessTexture, sRGB, basePath, progress);
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
        let extension = glTFMaterial.extensions.KHR_materials_volume;
        material.setDefine(glTFShader.Define_Volume, true);
        let thicknessFactor = (_a = extension.thicknessFactor) !== null && _a !== void 0 ? _a : 0.0;
        let attenuationDistance = (_b = extension.attenuationDistance) !== null && _b !== void 0 ? _b : 65504.0;
        material.setFloat("u_VolumeThicknessFactor", thicknessFactor);
        material.setFloat("u_VolumeAttenuationDistance", attenuationDistance);
        let attenuationColor = new Vector3(1, 1, 1);
        if (extension.attenuationColor) {
            attenuationColor.fromArray(extension.attenuationColor);
        }
        material.setVector3("u_VolumeAttenuationColor", attenuationColor);
        if (extension.thicknessTexture) {
            this._resource.setMaterialTextureProperty(material, extension.thicknessTexture, "u_VolumeThicknessTexture", glTFShader.Define_VolumeThicknessMap, "u_VoluemThicknessMapTransform", glTFShader.Define_VolumeThicknessMapTransform);
        }
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_volume(resource));

//# sourceMappingURL=KHR_materials_volume.js.map
