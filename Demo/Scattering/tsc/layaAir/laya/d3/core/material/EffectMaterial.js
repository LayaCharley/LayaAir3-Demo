import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Material } from "./Material";
import { UnlitMaterial } from "./UnlitMaterial";
export class EffectMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("Unlit");
        this.setVector4ByIndex(UnlitMaterial.TILINGOFFSET, new Vector4(1.0, 1.0, 0.0, 0.0));
        this.setColorByIndex(UnlitMaterial.ALBEDOCOLOR, new Color(1.0, 1.0, 1.0, 1.0));
        this.renderMode = EffectMaterial.RENDERMODE_ADDTIVE;
    }
    get color() {
        return this.getColorByIndex(UnlitMaterial.ALBEDOCOLOR);
    }
    set color(value) {
        this.setColorByIndex(UnlitMaterial.ALBEDOCOLOR, value);
    }
    get texture() {
        return this.getTextureByIndex(UnlitMaterial.ALBEDOTEXTURE);
    }
    set texture(value) {
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
            this.getVector4ByIndex(UnlitMaterial.TILINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    clone() {
        var dest = new EffectMaterial();
        this.cloneTo(dest);
        return dest;
    }
    set renderMode(value) {
        switch (value) {
            case EffectMaterial.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.depthTest = RenderState.DEPTHTEST_LEQUAL;
                this.addDefine(Material.SHADERDEFINE_ADDTIVEFOG);
                break;
            case EffectMaterial.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LEQUAL;
                this.removeDefine(Material.SHADERDEFINE_ADDTIVEFOG);
                break;
            default:
                throw new Error("MeshEffectMaterial : renderMode value error.");
        }
    }
}
EffectMaterial.RENDERMODE_ADDTIVE = 0;
EffectMaterial.RENDERMODE_ALPHABLENDED = 1;

//# sourceMappingURL=EffectMaterial.js.map
