import { Material } from "./Material";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
export class SkyPanoramicMaterial extends Material {
    constructor() {
        super();
        this._textureHDRParams = new Vector4(1.0, 0.0, 0.0, 1.0);
        this.setShaderName("SkyPanoramic");
        this.setColorByIndex(SkyPanoramicMaterial.TINTCOLOR, new Color(0.5, 0.5, 0.5, 0.5));
        this.setFloatByIndex(SkyPanoramicMaterial.ROTATION, 0.0);
        this.setVector4ByIndex(SkyPanoramicMaterial.TEXTURE_HDR_PARAMS, this._textureHDRParams);
        this.exposure = 1.3;
    }
    static __init__() {
        SkyPanoramicMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_TintColor");
        SkyPanoramicMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
        SkyPanoramicMaterial.ROTATION = Shader3D.propertyNameToID("u_Rotation");
        SkyPanoramicMaterial.TEXTURE = Shader3D.propertyNameToID("u_Texture");
        SkyPanoramicMaterial.TEXTURE_HDR_PARAMS = Shader3D.propertyNameToID("u_Texture_HDR_params");
    }
    get tintColor() {
        return this.getColorByIndex(SkyPanoramicMaterial.TINTCOLOR);
    }
    set tintColor(value) {
        this.setColorByIndex(SkyPanoramicMaterial.TINTCOLOR, value);
    }
    get exposure() {
        return this.getFloatByIndex(SkyPanoramicMaterial.EXPOSURE);
    }
    set exposure(value) {
        this.setFloatByIndex(SkyPanoramicMaterial.EXPOSURE, value);
    }
    get rotation() {
        return this.getFloatByIndex(SkyPanoramicMaterial.ROTATION);
    }
    set rotation(value) {
        this.setFloatByIndex(SkyPanoramicMaterial.ROTATION, value);
    }
    get panoramicTexture() {
        return this.getTextureByIndex(SkyPanoramicMaterial.TEXTURE);
    }
    set panoramicTexture(value) {
        this.setTextureByIndex(SkyPanoramicMaterial.TEXTURE, value);
    }
}

//# sourceMappingURL=SkyPanoramicMaterial.js.map
