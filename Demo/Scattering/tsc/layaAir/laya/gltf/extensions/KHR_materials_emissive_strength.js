import { glTFResource } from "../glTFResource";
const ExtensionName = "KHR_materials_emissive_strength";
export class KHR_materials_emissive_strength {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    additionMaterialProperties(glTFMaterial, material) {
        var _a;
        let extension = glTFMaterial.extensions.KHR_materials_emissive_strength;
        let emissionStrength = (_a = extension.emissiveStrength) !== null && _a !== void 0 ? _a : 1.0;
        material.setFloat("u_EmissionStrength", emissionStrength);
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_emissive_strength(resource));

//# sourceMappingURL=KHR_materials_emissive_strength.js.map
