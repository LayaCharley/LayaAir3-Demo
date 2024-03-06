import { Material } from "laya/d3/core/material/Material";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
export class GlowingEdgeMaterial extends Material {
    constructor() {
        super();
        this.isInit = false;
        if (!this.isInit) {
            this.__init__();
            this.isInit = true;
        }
        this.setShaderName("GlowingEdgeMaterial");
    }
    __init__() {
        GlowingEdgeMaterial.DIFFUSETEXTURE = Shader3D.propertyNameToID("u_texture");
        GlowingEdgeMaterial.MARGINALCOLOR = Shader3D.propertyNameToID("u_marginalColor");
    }
    /**
     * 获取漫反射贴图。
     *  漫反射贴图。
     */
    get diffuseTexture() {
        return this.getTextureByIndex(GlowingEdgeMaterial.DIFFUSETEXTURE);
    }
    /**
     * 设置漫反射贴图。
     * 漫反射贴图。
     */
    set diffuseTexture(value) {
        this.setTextureByIndex(GlowingEdgeMaterial.DIFFUSETEXTURE, value);
    }
    /**
     * 设置边缘光照颜色。
     * 边缘光照颜色。
     */
    set marginalColor(value) {
        this.setVector3ByIndex(GlowingEdgeMaterial.MARGINALCOLOR, value);
    }
}
