import { UnlitMaterial } from "../../d3/core/material/UnlitMaterial";
import { glTFResource } from "../glTFResource";
const ExtensionName = "KHR_materials_unlit";
export class KHR_materials_unlit {
    constructor(resource) {
        this.name = ExtensionName;
        this._resource = resource;
    }
    createMaterial(glTFMaterial) {
        let unlit = new UnlitMaterial();
        let pbrMetallicRoughness = glTFMaterial.pbrMetallicRoughness;
        if (pbrMetallicRoughness) {
            if (pbrMetallicRoughness.baseColorFactor) {
                let color = unlit.albedoColor;
                color.fromArray(pbrMetallicRoughness.baseColorFactor);
                color.toGamma(color);
                unlit.albedoColor = color;
            }
            if (pbrMetallicRoughness.baseColorTexture) {
                unlit.albedoTexture = this._resource.getTextureWithInfo(pbrMetallicRoughness.baseColorTexture);
            }
        }
        this._resource.applyMaterialRenderState(glTFMaterial, unlit);
        return unlit;
    }
}
glTFResource.registerExtension(ExtensionName, (resource) => new KHR_materials_unlit(resource));

//# sourceMappingURL=KHR_materials_unlit.js.map
