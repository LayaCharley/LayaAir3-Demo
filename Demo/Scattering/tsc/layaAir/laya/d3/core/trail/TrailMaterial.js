import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Material, MaterialRenderMode } from "../material/Material";
export class TrailMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("Trail");
        this.materialRenderMode = MaterialRenderMode.RENDERMODE_ALPHABLENDED;
    }
    static __initDefine__() {
        TrailMaterial.MAINTEXTURE = Shader3D.propertyNameToID("u_MainTexture");
        TrailMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_MainColor");
        TrailMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
    }
    get color() {
        return this._shaderValues.getColor(TrailMaterial.TINTCOLOR);
    }
    set color(value) {
        this._shaderValues.setColor(TrailMaterial.TINTCOLOR, value);
    }
    get texture() {
        return this._shaderValues.getTexture(TrailMaterial.MAINTEXTURE);
    }
    set texture(value) {
        if (value)
            this._shaderValues.addDefine(TrailMaterial.SHADERDEFINE_MAINTEXTURE);
        else
            this._shaderValues.removeDefine(TrailMaterial.SHADERDEFINE_MAINTEXTURE);
        this._shaderValues.setTexture(TrailMaterial.MAINTEXTURE, value);
    }
    get tilingOffset() {
        return this._shaderValues.getVector(TrailMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            this._shaderValues.setVector(TrailMaterial.TILINGOFFSET, value);
        }
        else {
            this._shaderValues.getVector(TrailMaterial.TILINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    clone() {
        var dest = new TrailMaterial();
        this.cloneTo(dest);
        return dest;
    }
    set renderMode(value) {
        switch (value) {
            case TrailMaterial.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.alphaTest = false;
                this._shaderValues.addDefine(TrailMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            case TrailMaterial.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.alphaTest = false;
                this._shaderValues.removeDefine(TrailMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            default:
                throw new Error("ShurikenParticleMaterial : renderMode value error.");
        }
    }
}
TrailMaterial.RENDERMODE_ALPHABLENDED = 0;
TrailMaterial.RENDERMODE_ADDTIVE = 1;

//# sourceMappingURL=TrailMaterial.js.map
