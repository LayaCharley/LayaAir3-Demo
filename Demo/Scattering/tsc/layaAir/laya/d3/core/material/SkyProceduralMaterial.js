import { Color } from "../../../maths/Color";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "./Material";
export class SkyProceduralMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("SkyProcedural");
        this.sunDisk = SkyProceduralMaterial.SUN_HIGH_QUALITY;
        this.sunSize = 0.04;
        this.sunSizeConvergence = 5;
        this.atmosphereThickness = 1.0;
        this.skyTint = new Color(0.5, 0.5, 0.5, 1.0);
        this.groundTint = new Color(0.369, 0.349, 0.341, 1.0);
        this.exposure = 1.3;
    }
    static __initDefine__() {
        SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY = Shader3D.getDefineByName("SUN_HIGH_QUALITY");
        SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE = Shader3D.getDefineByName("SUN_SIMPLE");
        SkyProceduralMaterial.SUNSIZE = Shader3D.propertyNameToID("u_SunSize");
        SkyProceduralMaterial.SUNSIZECONVERGENCE = Shader3D.propertyNameToID("u_SunSizeConvergence");
        SkyProceduralMaterial.ATMOSPHERETHICKNESS = Shader3D.propertyNameToID("u_AtmosphereThickness");
        SkyProceduralMaterial.SKYTINT = Shader3D.propertyNameToID("u_SkyTint");
        SkyProceduralMaterial.GROUNDTINT = Shader3D.propertyNameToID("u_GroundTint");
        SkyProceduralMaterial.EXPOSURE = Shader3D.propertyNameToID("u_Exposure");
    }
    get sunDisk() {
        return this._sunDisk;
    }
    set sunDisk(value) {
        switch (value) {
            case SkyProceduralMaterial.SUN_HIGH_QUALITY:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                this._shaderValues.addDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                break;
            case SkyProceduralMaterial.SUN_SIMPLE:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                this._shaderValues.addDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                break;
            case SkyProceduralMaterial.SUN_NODE:
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_HIGH_QUALITY);
                this._shaderValues.removeDefine(SkyProceduralMaterial.SHADERDEFINE_SUN_SIMPLE);
                break;
            default:
                throw "SkyBoxProceduralMaterial: unknown sun value.";
        }
        this._sunDisk = value;
    }
    get sunSize() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.SUNSIZE);
    }
    set sunSize(value) {
        value = Math.min(Math.max(0.0, value), 1.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.SUNSIZE, value);
    }
    get sunSizeConvergence() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.SUNSIZECONVERGENCE);
    }
    set sunSizeConvergence(value) {
        value = Math.min(Math.max(0.0, value), 20.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.SUNSIZECONVERGENCE, value);
    }
    get atmosphereThickness() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.ATMOSPHERETHICKNESS);
    }
    set atmosphereThickness(value) {
        value = Math.min(Math.max(0.0, value), 5.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.ATMOSPHERETHICKNESS, value);
    }
    get skyTint() {
        return this._shaderValues.getColor(SkyProceduralMaterial.SKYTINT);
    }
    set skyTint(value) {
        this._shaderValues.setColor(SkyProceduralMaterial.SKYTINT, value);
    }
    get groundTint() {
        return this._shaderValues.getColor(SkyProceduralMaterial.GROUNDTINT);
    }
    set groundTint(value) {
        this._shaderValues.setColor(SkyProceduralMaterial.GROUNDTINT, value);
    }
    get exposure() {
        return this._shaderValues.getNumber(SkyProceduralMaterial.EXPOSURE);
    }
    set exposure(value) {
        value = Math.min(Math.max(0.0, value), 8.0);
        this._shaderValues.setNumber(SkyProceduralMaterial.EXPOSURE, value);
    }
    clone() {
        var dest = new SkyProceduralMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
SkyProceduralMaterial.SUN_NODE = 0;
SkyProceduralMaterial.SUN_SIMPLE = 1;
SkyProceduralMaterial.SUN_HIGH_QUALITY = 2;

//# sourceMappingURL=SkyProceduralMaterial.js.map
