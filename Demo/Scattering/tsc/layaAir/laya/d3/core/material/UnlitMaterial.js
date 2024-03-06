import { Vector4 } from "../../../maths/Vector4";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material } from "./Material";
export class UnlitMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("Unlit");
        this.renderMode = UnlitMaterial.RENDERMODE_OPAQUE;
        this.albedoIntensity = 1.0;
    }
    static __initDefine__() {
        UnlitMaterial.SHADERDEFINE_ALBEDOTEXTURE = Shader3D.getDefineByName("ALBEDOTEXTURE");
        UnlitMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR = Shader3D.getDefineByName("ENABLEVERTEXCOLOR");
        UnlitMaterial.ALBEDOTEXTURE = Shader3D.propertyNameToID("u_AlbedoTexture");
        UnlitMaterial.ALBEDOCOLOR = Shader3D.propertyNameToID("u_AlbedoColor");
        UnlitMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
    }
    get albedoColor() {
        return this.getColorByIndex(UnlitMaterial.ALBEDOCOLOR);
    }
    set albedoColor(value) {
        this.setColorByIndex(UnlitMaterial.ALBEDOCOLOR, value.scale(this._albedoIntensity));
    }
    get albedoIntensity() {
        return this._albedoIntensity;
    }
    set albedoIntensity(value) {
        this._albedoIntensity = value;
    }
    get albedoTexture() {
        return this.getTextureByIndex(UnlitMaterial.ALBEDOTEXTURE);
    }
    set albedoTexture(value) {
        if (value)
            this.addDefine(UnlitMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        else
            this.removeDefine(UnlitMaterial.SHADERDEFINE_ALBEDOTEXTURE);
        this.setTextureByIndex(UnlitMaterial.ALBEDOTEXTURE, value);
    }
    get tilingOffset() {
        return this.getVector4ByIndex(UnlitMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            this.setVector4ByIndex(UnlitMaterial.TILINGOFFSET, value);
        }
        else {
            this.setVector4ByIndex(UnlitMaterial.TILINGOFFSET, new Vector4(1.0, 1.0, 0.0, 0.0));
        }
    }
    get enableVertexColor() {
        return this.hasDefine(UnlitMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    set enableVertexColor(value) {
        if (value)
            this.addDefine(UnlitMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
        else
            this.removeDefine(UnlitMaterial.SHADERDEFINE_ENABLEVERTEXCOLOR);
    }
    clone() {
        var dest = new UnlitMaterial();
        this.cloneTo(dest);
        return dest;
    }
    set renderMode(value) {
        switch (value) {
            case UnlitMaterial.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case UnlitMaterial.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case UnlitMaterial.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_BACK;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            default:
                throw new Error("UnlitMaterial : renderMode value error.");
        }
    }
}
UnlitMaterial.RENDERMODE_OPAQUE = 0;
UnlitMaterial.RENDERMODE_CUTOUT = 1;
UnlitMaterial.RENDERMODE_TRANSPARENT = 2;
UnlitMaterial.RENDERMODE_ADDTIVE = 3;

//# sourceMappingURL=UnlitMaterial.js.map
