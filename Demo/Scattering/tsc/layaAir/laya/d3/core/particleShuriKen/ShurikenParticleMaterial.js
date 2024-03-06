import { Material } from "../material/Material";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
export class ShurikenParticleMaterial extends Material {
    constructor() {
        super();
        this.setShaderName("PARTICLESHURIKEN");
        this.renderMode = ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED;
    }
    static __initDefine__() {
        ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP = Shader3D.getDefineByName("DIFFUSEMAP");
        ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR = Shader3D.getDefineByName("TINTCOLOR");
        ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG = Shader3D.getDefineByName("ADDTIVEFOG");
        ShurikenParticleMaterial.DIFFUSETEXTURE = Shader3D.propertyNameToID("u_texture");
        ShurikenParticleMaterial.TINTCOLOR = Shader3D.propertyNameToID("u_Tintcolor");
        ShurikenParticleMaterial.TILINGOFFSET = Shader3D.propertyNameToID("u_TilingOffset");
    }
    get color() {
        return this._shaderValues.getColor(ShurikenParticleMaterial.TINTCOLOR);
    }
    set color(value) {
        if (value)
            this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR);
        else
            this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_TINTCOLOR);
        this._shaderValues.setColor(ShurikenParticleMaterial.TINTCOLOR, value);
    }
    get tilingOffset() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
    }
    set tilingOffset(value) {
        if (value) {
            this._shaderValues.setVector(ShurikenParticleMaterial.TILINGOFFSET, value);
        }
        else {
            this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).setValue(1.0, 1.0, 0.0, 0.0);
        }
    }
    get texture() {
        return this._shaderValues.getTexture(ShurikenParticleMaterial.DIFFUSETEXTURE);
    }
    set texture(value) {
        if (value)
            this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP);
        else
            this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_DIFFUSEMAP);
        this._shaderValues.setTexture(ShurikenParticleMaterial.DIFFUSETEXTURE, value);
    }
    clone() {
        var dest = new ShurikenParticleMaterial();
        this.cloneTo(dest);
        return dest;
    }
    set renderMode(value) {
        switch (value) {
            case ShurikenParticleMaterial.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.alphaTest = false;
                this._shaderValues.addDefine(ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            case ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.depthWrite = false;
                this.cull = RenderState.CULL_NONE;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.alphaTest = false;
                this._shaderValues.removeDefine(ShurikenParticleMaterial.SHADERDEFINE_ADDTIVEFOG);
                break;
            default:
                throw new Error("ShurikenParticleMaterial : renderMode value error.");
        }
    }
    get tilingOffsetX() {
        return this._MainTex_STX;
    }
    set tilingOffsetX(x) {
        this._MainTex_STX = x;
    }
    get tilingOffsetY() {
        return this._MainTex_STY;
    }
    set tilingOffsetY(y) {
        this._MainTex_STY = y;
    }
    get tilingOffsetZ() {
        return this._MainTex_STZ;
    }
    set tilingOffsetZ(z) {
        this._MainTex_STZ = z;
    }
    get tilingOffsetW() {
        return this._MainTex_STW;
    }
    set tilingOffsetW(w) {
        this._MainTex_STW = w;
    }
    get _TintColor() {
        return this.color;
    }
    set _TintColor(value) {
        this.color = value;
    }
    get _TintColorR() {
        return this.color.r;
    }
    set _TintColorR(value) {
        this.color.r = value;
    }
    get _TintColorG() {
        return this.color.g;
    }
    set _TintColorG(value) {
        this.color.g = value;
    }
    get _TintColorB() {
        return this.color.b;
    }
    set _TintColorB(value) {
        this.color.b = value;
    }
    get _TintColorA() {
        return this.color.a;
    }
    set _TintColorA(value) {
        this.color.a = value;
    }
    get _MainTex_ST() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
    }
    set _MainTex_ST(value) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.setValue(value.x, value.y, value.z, value.w);
        this.tilingOffset = tilOff;
    }
    get _MainTex_STX() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).x;
    }
    set _MainTex_STX(x) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.x = x;
        this.tilingOffset = tilOff;
    }
    get _MainTex_STY() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).y;
    }
    set _MainTex_STY(y) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.y = y;
        this.tilingOffset = tilOff;
    }
    get _MainTex_STZ() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).z;
    }
    set _MainTex_STZ(z) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.z = z;
        this.tilingOffset = tilOff;
    }
    get _MainTex_STW() {
        return this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET).w;
    }
    set _MainTex_STW(w) {
        var tilOff = this._shaderValues.getVector(ShurikenParticleMaterial.TILINGOFFSET);
        tilOff.w = w;
        this.tilingOffset = tilOff;
    }
    get colorR() {
        return this._TintColorR;
    }
    set colorR(value) {
        this._TintColorR = value;
    }
    get colorG() {
        return this._TintColorG;
    }
    set colorG(value) {
        this._TintColorG = value;
    }
    get colorB() {
        return this._TintColorB;
    }
    set colorB(value) {
        this._TintColorB = value;
    }
    get colorA() {
        return this._TintColorA;
    }
    set colorA(value) {
        this._TintColorA = value;
    }
}
ShurikenParticleMaterial.RENDERMODE_ALPHABLENDED = 0;
ShurikenParticleMaterial.RENDERMODE_ADDTIVE = 1;

//# sourceMappingURL=ShurikenParticleMaterial.js.map
