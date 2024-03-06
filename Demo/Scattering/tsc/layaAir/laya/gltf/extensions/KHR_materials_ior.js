import { PBRShaderLib } from "../../d3/shader/pbr/PBRShaderLib";
import { glTFResource } from "../glTFResource";
const ExtensionName = "KHR_materials_ior";
export class KHR_materials_ior {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    additionMaterialProperties(glTFMaterial, material) {
        var _a;
        let extension = glTFMaterial.extensions.KHR_materials_ior;
        let ior = (_a = extension.ior) !== null && _a !== void 0 ? _a : 1.5;
        material.setDefine(PBRShaderLib.DEFINE_IOR, true);
        material.setFloat("u_Ior", ior);
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_ior(resource));

//# sourceMappingURL=KHR_materials_ior.js.map
