import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "./Material";
export class SkyBoxMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("SkyBox");
    }
    static __initDefine__() {
        SkyBoxMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_TintColor");
        SkyBoxMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
        SkyBoxMaterial.ROTATION = Shader3D.propertyNameToID("u_Rotation");
        SkyBoxMaterial.TEXTURECUBE = Shader3D.propertyNameToID("u_CubeTexture");
    }
    get tintColor() {
        return this._shaderValues.getColor(SkyBoxMaterial.TINTCOLOR);
    }
    set tintColor(value) {
        this._shaderValues.setColor(SkyBoxMaterial.TINTCOLOR, value);
    }
    get exposure() {
        return this._shaderValues.getNumber(SkyBoxMaterial.EXPOSURE);
    }
    set exposure(value) {
        this._shaderValues.setNumber(SkyBoxMaterial.EXPOSURE, value);
    }
    get rotation() {
        return this._shaderValues.getNumber(SkyBoxMaterial.ROTATION);
    }
    set rotation(value) {
        this._shaderValues.setNumber(SkyBoxMaterial.ROTATION, value);
    }
    get textureCube() {
        return this._shaderValues.getTexture(SkyBoxMaterial.TEXTURECUBE);
    }
    set textureCube(value) {
        this._shaderValues.setTexture(SkyBoxMaterial.TEXTURECUBE, value);
    }
    clone() {
        var dest = new SkyBoxMaterial();
        this.cloneTo(dest);
        return dest;
    }
}

//# sourceMappingURL=SkyBoxMaterial.js.map
