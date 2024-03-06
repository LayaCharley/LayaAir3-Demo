import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "./Material";
export class ExtendTerrainMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("ExtendTerrain");
        this.renderMode = ExtendTerrainMaterial.RENDERMODE_OPAQUE;
    }
    static __initDefine__() {
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM1");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM2");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM3");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM4");
        ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5 = Shader3D.getDefineByName("ExtendTerrain_DETAIL_NUM5");
        ExtendTerrainMaterial.SPLATALPHATEXTURE = Shader3D.propertyNameToID("u_SplatAlphaTexture");
        ExtendTerrainMaterial.DIFFUSETEXTURE1 = Shader3D.propertyNameToID("u_DiffuseTexture1");
        ExtendTerrainMaterial.DIFFUSETEXTURE2 = Shader3D.propertyNameToID("u_DiffuseTexture2");
        ExtendTerrainMaterial.DIFFUSETEXTURE3 = Shader3D.propertyNameToID("u_DiffuseTexture3");
        ExtendTerrainMaterial.DIFFUSETEXTURE4 = Shader3D.propertyNameToID("u_DiffuseTexture4");
        ExtendTerrainMaterial.DIFFUSETEXTURE5 = Shader3D.propertyNameToID("u_DiffuseTexture5");
        ExtendTerrainMaterial.DIFFUSESCALEOFFSET1 = Shader3D.propertyNameToID("u_DiffuseScaleOffset1");
        ExtendTerrainMaterial.DIFFUSESCALEOFFSET2 = Shader3D.propertyNameToID("u_DiffuseScaleOffset2");
        ExtendTerrainMaterial.DIFFUSESCALEOFFSET3 = Shader3D.propertyNameToID("u_DiffuseScaleOffset3");
        ExtendTerrainMaterial.DIFFUSESCALEOFFSET4 = Shader3D.propertyNameToID("u_DiffuseScaleOffset4");
        ExtendTerrainMaterial.DIFFUSESCALEOFFSET5 = Shader3D.propertyNameToID("u_DiffuseScaleOffset5");
    }
    get splatAlphaTexture() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.SPLATALPHATEXTURE);
    }
    set splatAlphaTexture(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.SPLATALPHATEXTURE, value);
    }
    get diffuseTexture1() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE1);
    }
    set diffuseTexture1(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE1, value);
        this._setDetailNum(1);
    }
    get diffuseTexture2() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE2);
    }
    set diffuseTexture2(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE2, value);
        this._setDetailNum(2);
    }
    get diffuseTexture3() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE3);
    }
    set diffuseTexture3(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE3, value);
        this._setDetailNum(3);
    }
    get diffuseTexture4() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE4);
    }
    set diffuseTexture4(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE4, value);
        this._setDetailNum(4);
    }
    get diffuseTexture5() {
        return this._shaderValues.getTexture(ExtendTerrainMaterial.DIFFUSETEXTURE5);
    }
    set diffuseTexture5(value) {
        this._shaderValues.setTexture(ExtendTerrainMaterial.DIFFUSETEXTURE5, value);
        this._setDetailNum(5);
    }
    set diffuseScaleOffset1(scaleOffset1) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET1, scaleOffset1);
    }
    set diffuseScaleOffset2(scaleOffset2) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET2, scaleOffset2);
    }
    set diffuseScaleOffset3(scaleOffset3) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET3, scaleOffset3);
    }
    set diffuseScaleOffset4(scaleOffset4) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET4, scaleOffset4);
    }
    set diffuseScaleOffset5(scaleOffset5) {
        this._shaderValues.setVector(ExtendTerrainMaterial.DIFFUSESCALEOFFSET5, scaleOffset5);
    }
    set renderMode(value) {
        switch (value) {
            case ExtendTerrainMaterial.RENDERMODE_OPAQUE:
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case ExtendTerrainMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LEQUAL;
                break;
            default:
                throw new Error("ExtendTerrainMaterial:renderMode value error.");
        }
    }
    _setDetailNum(value) {
        switch (value) {
            case 1:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 2:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 3:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 4:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                break;
            case 5:
                this._shaderValues.addDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM5);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM1);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM2);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM3);
                this._shaderValues.removeDefine(ExtendTerrainMaterial.SHADERDEFINE_DETAIL_NUM4);
                break;
        }
    }
    clone() {
        var dest = new ExtendTerrainMaterial();
        this.cloneTo(dest);
        return dest;
    }
}
ExtendTerrainMaterial.RENDERMODE_OPAQUE = 1;
ExtendTerrainMaterial.RENDERMODE_TRANSPARENT = 2;

//# sourceMappingURL=ExtendTerrainMaterial.js.map