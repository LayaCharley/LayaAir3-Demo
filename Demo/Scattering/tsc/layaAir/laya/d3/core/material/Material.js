import { Loader } from "../../../net/Loader";
import { Resource } from "../../../resource/Resource";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataDefaultValue } from "../../../RenderEngine/RenderShader/ShaderData";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { LayaGL } from "../../../layagl/LayaGL";
import { Config3D } from "../../../../Config3D";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { ILaya } from "../../../../ILaya";
import { Vector3 } from "../../../maths/Vector3";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Event } from "../../../events/Event";
import { Config } from "../../../../Config";
export var MaterialRenderMode;
(function (MaterialRenderMode) {
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_OPAQUE"] = 0] = "RENDERMODE_OPAQUE";
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_CUTOUT"] = 1] = "RENDERMODE_CUTOUT";
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_TRANSPARENT"] = 2] = "RENDERMODE_TRANSPARENT";
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_ADDTIVE"] = 3] = "RENDERMODE_ADDTIVE";
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_ALPHABLENDED"] = 4] = "RENDERMODE_ALPHABLENDED";
    MaterialRenderMode[MaterialRenderMode["RENDERMODE_CUSTOME"] = 5] = "RENDERMODE_CUSTOME";
})(MaterialRenderMode || (MaterialRenderMode = {}));
export class Material extends Resource {
    constructor() {
        super();
        this._shaderValues = LayaGL.renderOBJCreate.createShaderData(this);
        this.renderQueue = Material.RENDERQUEUE_OPAQUE;
        this.alphaTest = false;
        this.cull = RenderState.CULL_BACK;
        this.blend = RenderState.BLEND_DISABLE;
        this.blendSrc = RenderState.BLENDPARAM_ONE;
        this.blendDst = RenderState.BLENDPARAM_ZERO;
        this.blendSrcRGB = RenderState.BLENDPARAM_ONE;
        this.blendDstRGB = RenderState.BLENDPARAM_ZERO;
        this.blendSrcAlpha = RenderState.BLENDPARAM_ONE;
        this.blendDstAlpha = RenderState.BLENDPARAM_ZERO;
        this.blendEquation = RenderState.BLENDEQUATION_ADD;
        this.blendEquationRGB = RenderState.BLENDEQUATION_ADD;
        this.blendEquationAlpha = RenderState.BLENDEQUATION_ADD;
        this.depthTest = RenderState.DEPTHTEST_LEQUAL;
        this.depthWrite = true;
        this.stencilRef = 1;
        this.stencilTest = RenderState.STENCILTEST_OFF;
        this.stencilWrite = false;
        this.stencilOp = new Vector3(RenderState.STENCILOP_KEEP, RenderState.STENCILOP_KEEP, RenderState.STENCILOP_REPLACE);
        this.destroyedImmediately = Config.destroyResourceImmediatelyDefault;
    }
    static load(url, complete) {
        ILaya.loader.load(url, complete, null, Loader.MATERIAL);
    }
    static __initDefine__() {
        Material.SHADERDEFINE_ALPHATEST = Shader3D.getDefineByName("ALPHATEST");
        Material.SHADERDEFINE_MAINTEXTURE = Shader3D.getDefineByName("MAINTEXTURE");
        Material.SHADERDEFINE_ADDTIVEFOG = Shader3D.getDefineByName("ADDTIVEFOG");
        Material.ALPHATESTVALUE = Shader3D.propertyNameToID("u_AlphaTestValue");
        Shader3D.CULL = Shader3D.propertyNameToID("s_Cull");
        Shader3D.BLEND = Shader3D.propertyNameToID("s_Blend");
        Shader3D.BLEND_SRC = Shader3D.propertyNameToID("s_BlendSrc");
        Shader3D.BLEND_DST = Shader3D.propertyNameToID("s_BlendDst");
        Shader3D.BLEND_SRC_RGB = Shader3D.propertyNameToID("s_BlendSrcRGB");
        Shader3D.BLEND_DST_RGB = Shader3D.propertyNameToID("s_BlendDstRGB");
        Shader3D.BLEND_SRC_ALPHA = Shader3D.propertyNameToID("s_BlendSrcAlpha");
        Shader3D.BLEND_DST_ALPHA = Shader3D.propertyNameToID("s_BlendDstAlpha");
        Shader3D.BLEND_EQUATION = Shader3D.propertyNameToID("s_BlendEquation");
        Shader3D.BLEND_EQUATION_RGB = Shader3D.propertyNameToID("s_BlendEquationRGB");
        Shader3D.BLEND_EQUATION_ALPHA = Shader3D.propertyNameToID("s_BlendEquationAlpha");
        Shader3D.DEPTH_TEST = Shader3D.propertyNameToID("s_DepthTest");
        Shader3D.DEPTH_WRITE = Shader3D.propertyNameToID("s_DepthWrite");
        Shader3D.STENCIL_Ref = Shader3D.propertyNameToID("s_StencilRef");
        Shader3D.STENCIL_TEST = Shader3D.propertyNameToID("s_StencilTest");
        Shader3D.STENCIL_WRITE = Shader3D.propertyNameToID("s_StencilWrite");
        Shader3D.STENCIL_Op = Shader3D.propertyNameToID("s_StencilOp");
    }
    get shaderData() {
        return this._shaderValues;
    }
    get alphaTestValue() {
        return this._shaderValues.getNumber(Material.ALPHATESTVALUE);
    }
    set alphaTestValue(value) {
        this._shaderValues.setNumber(Material.ALPHATESTVALUE, value);
    }
    get alphaTest() {
        return this.shaderData.hasDefine(Material.SHADERDEFINE_ALPHATEST);
    }
    set alphaTest(value) {
        if (value)
            this._shaderValues.addDefine(Material.SHADERDEFINE_ALPHATEST);
        else
            this._shaderValues.removeDefine(Material.SHADERDEFINE_ALPHATEST);
    }
    addDefine(define) {
        this._shaderValues.addDefine(define);
    }
    removeDefine(define) {
        this._shaderValues.removeDefine(define);
    }
    setDefine(define, value) {
        if (value) {
            this._shaderValues.addDefine(define);
        }
        else {
            this._shaderValues.removeDefine(define);
        }
    }
    hasDefine(define) {
        return this._shaderValues.hasDefine(define);
    }
    get depthWrite() {
        return this._shaderValues.getBool(Shader3D.DEPTH_WRITE);
    }
    set depthWrite(value) {
        this._shaderValues.setBool(Shader3D.DEPTH_WRITE, value);
    }
    get cull() {
        return this._shaderValues.getInt(Shader3D.CULL);
    }
    set cull(value) {
        this._shaderValues.setInt(Shader3D.CULL, value);
    }
    get blend() {
        return this._shaderValues.getInt(Shader3D.BLEND);
    }
    set blend(value) {
        this._shaderValues.setInt(Shader3D.BLEND, value);
    }
    get blendSrc() {
        return this._shaderValues.getInt(Shader3D.BLEND_SRC);
    }
    set blendSrc(value) {
        this._shaderValues.setInt(Shader3D.BLEND_SRC, value);
    }
    get blendDst() {
        return this._shaderValues.getInt(Shader3D.BLEND_DST);
    }
    set blendDst(value) {
        this._shaderValues.setInt(Shader3D.BLEND_DST, value);
    }
    get blendSrcAlpha() {
        return this._shaderValues.getInt(Shader3D.BLEND_SRC_ALPHA);
    }
    set blendSrcAlpha(value) {
        this._shaderValues.setInt(Shader3D.BLEND_SRC_ALPHA, value);
    }
    get blendSrcRGB() {
        return this._shaderValues.getInt(Shader3D.BLEND_SRC_RGB);
    }
    set blendSrcRGB(value) {
        this._shaderValues.setInt(Shader3D.BLEND_SRC_RGB, value);
    }
    get blendDstRGB() {
        return this._shaderValues.getInt(Shader3D.BLEND_DST_RGB);
    }
    set blendDstRGB(value) {
        this._shaderValues.setInt(Shader3D.BLEND_DST_RGB, value);
    }
    get blendDstAlpha() {
        return this._shaderValues.getInt(Shader3D.BLEND_DST_ALPHA);
    }
    set blendDstAlpha(value) {
        this._shaderValues.setInt(Shader3D.BLEND_DST_ALPHA, value);
    }
    get blendEquation() {
        return this._shaderValues.getInt(Shader3D.BLEND_EQUATION);
    }
    set blendEquation(value) {
        this._shaderValues.setInt(Shader3D.BLEND_EQUATION, value);
    }
    get blendEquationRGB() {
        return this._shaderValues.getInt(Shader3D.BLEND_EQUATION_RGB);
    }
    set blendEquationRGB(value) {
        this._shaderValues.setInt(Shader3D.BLEND_EQUATION_RGB, value);
    }
    get blendEquationAlpha() {
        return this._shaderValues.getInt(Shader3D.BLEND_EQUATION_ALPHA);
    }
    set blendEquationAlpha(value) {
        this._shaderValues.setInt(Shader3D.BLEND_EQUATION_ALPHA, value);
    }
    get depthTest() {
        return this._shaderValues.getInt(Shader3D.DEPTH_TEST);
    }
    set depthTest(value) {
        this._shaderValues.setInt(Shader3D.DEPTH_TEST, value);
    }
    get stencilTest() {
        return this._shaderValues.getInt(Shader3D.STENCIL_TEST);
    }
    set stencilTest(value) {
        this._shaderValues.setInt(Shader3D.STENCIL_TEST, value);
    }
    get stencilWrite() {
        return this._shaderValues.getBool(Shader3D.STENCIL_WRITE);
    }
    set stencilWrite(value) {
        this._shaderValues.setBool(Shader3D.STENCIL_WRITE, value);
    }
    set stencilRef(value) {
        this._shaderValues.setInt(Shader3D.STENCIL_Ref, value);
    }
    get stencilRef() {
        return this._shaderValues.getInt(Shader3D.STENCIL_Ref);
    }
    set stencilOp(value) {
        this._shaderValues.setVector3(Shader3D.STENCIL_Op, value);
    }
    get stencilOp() {
        return this._shaderValues.getVector3(Shader3D.STENCIL_Op);
    }
    get MaterialProperty() {
        let propertyMap = {};
        var shaderValues = this._shaderValues.getData();
        for (let key in shaderValues) {
            propertyMap[LayaGL.renderEngine.propertyIDToName(parseInt(key))] = shaderValues[key];
        }
        return propertyMap;
    }
    get MaterialDefine() {
        let shaderDefineArray = new Array();
        let defineData = this._shaderValues._defineDatas;
        Shader3D._getNamesByDefineData(defineData, shaderDefineArray);
        return shaderDefineArray;
    }
    set materialRenderMode(value) {
        this._matRenderNode = value;
        switch (value) {
            case MaterialRenderMode.RENDERMODE_OPAQUE:
                this.alphaTest = false;
                this.renderQueue = Material.RENDERQUEUE_OPAQUE;
                this.depthWrite = true;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case MaterialRenderMode.RENDERMODE_CUTOUT:
                this.renderQueue = Material.RENDERQUEUE_ALPHATEST;
                this.alphaTest = true;
                this.depthWrite = true;
                this.blend = RenderState.BLEND_DISABLE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case MaterialRenderMode.RENDERMODE_TRANSPARENT:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                break;
            case MaterialRenderMode.RENDERMODE_ADDTIVE:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.addDefine(Material.SHADERDEFINE_ADDTIVEFOG);
                break;
            case MaterialRenderMode.RENDERMODE_ALPHABLENDED:
                this.renderQueue = Material.RENDERQUEUE_TRANSPARENT;
                this.alphaTest = false;
                this.depthWrite = false;
                this.blend = RenderState.BLEND_ENABLE_ALL;
                this.blendSrc = RenderState.BLENDPARAM_SRC_ALPHA;
                this.blendDst = RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                this.depthTest = RenderState.DEPTHTEST_LESS;
                this._shaderValues.removeDefine(Material.SHADERDEFINE_ADDTIVEFOG);
                break;
            case MaterialRenderMode.RENDERMODE_CUSTOME:
                break;
            default:
                console.warn(`Material : renderMode value error - (${value}).`);
                break;
        }
    }
    get materialRenderMode() {
        return this._matRenderNode;
    }
    _bindShaderInfo(shader) {
        let subShader = shader.getSubShaderAt(0);
        let shaderUBODatas = subShader._uniformBufferDataMap;
        if (!shaderUBODatas)
            return;
        for (let key of shaderUBODatas.keys()) {
            let uboData = shaderUBODatas.get(key).clone();
            let ubo = UniformBufferObject.create(key, BufferUsage.Dynamic, uboData.getbyteLength(), false);
            this._shaderValues.setUniformBuffer(Shader3D.propertyNameToID(key), ubo);
            this._shaderValues._addCheckUBO(key, ubo, uboData);
        }
    }
    _releaseUBOData() {
        if (!this._shaderValues.uniformBufferDatas) {
            return;
        }
        for (let value of this._shaderValues.uniformBufferDatas.values()) {
            value.ubo._updateDataInfo.destroy();
            value.ubo.destroy();
            value.ubo._updateDataInfo = null;
        }
        this._shaderValues.uniformBufferDatas.clear();
        this._shaderValues.uniformBuffersMap.clear();
    }
    _disposeResource() {
        this._releaseUBOData();
        this._shaderValues.destroy();
        this._shaderValues = null;
    }
    get shader() {
        return this._shader;
    }
    effectiveProperty() {
        return this._shader.getSubShaderAt(0)._uniformTypeMap;
    }
    setShaderName(name) {
        this._shader = Shader3D.find(name);
        if (!this._shader) {
            console.warn(`Material: unknown shader name '${name}'`);
            this._shader = Shader3D.find("BLINNPHONG");
        }
        if (Config3D._uniformBlock) {
            this._releaseUBOData();
            this._bindShaderInfo(this._shader);
        }
        let subShader = this._shader.getSubShaderAt(0);
        let defaultValue = subShader._uniformDefaultValue;
        let typeMap = subShader._uniformTypeMap;
        this.applyUniformDefaultValue(typeMap, defaultValue);
    }
    applyUniformDefaultValue(typeMap, defaultValue) {
        typeMap.forEach((type, key) => {
            if (defaultValue && defaultValue[key] != undefined) {
                let value = defaultValue[key];
                this.setShaderData(key, type, value);
            }
            else {
                this.setShaderData(key, type, ShaderDataDefaultValue(type));
            }
        });
    }
    getBoolByIndex(uniformIndex) {
        return this.shaderData.getBool(uniformIndex);
    }
    setBoolByIndex(uniformIndex, value) {
        this.shaderData.setBool(uniformIndex, value);
    }
    getBool(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getBoolByIndex(uniformIndex);
    }
    setBool(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setBoolByIndex(uniformIndex, value);
    }
    getFloatByIndex(uniformIndex) {
        return this.shaderData.getNumber(uniformIndex);
    }
    setFloatByIndex(uniformIndex, value) {
        this.shaderData.setNumber(uniformIndex, value);
    }
    getFloat(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getFloatByIndex(uniformIndex);
    }
    setFloat(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setFloatByIndex(uniformIndex, value);
    }
    getIntByIndex(uniformIndex) {
        return this.shaderData.getInt(uniformIndex);
    }
    setIntByIndex(uniformIndex, value) {
        this.shaderData.setInt(uniformIndex, value);
    }
    getInt(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getIntByIndex(uniformIndex);
    }
    setInt(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setIntByIndex(uniformIndex, value);
    }
    getVector2ByIndex(uniformIndex) {
        return this.shaderData.getVector2(uniformIndex);
    }
    setVector2ByIndex(uniformIndex, value) {
        this.shaderData.setVector2(uniformIndex, value);
    }
    getVector2(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getVector2ByIndex(uniformIndex);
    }
    setVector2(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setVector2ByIndex(uniformIndex, value);
    }
    getVector3ByIndex(uniformIndex) {
        return this.shaderData.getVector3(uniformIndex);
    }
    setVector3ByIndex(uniformIndex, value) {
        this.shaderData.setVector3(uniformIndex, value);
    }
    getVector3(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getVector3ByIndex(uniformIndex);
    }
    setVector3(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setVector3ByIndex(uniformIndex, value);
    }
    setVector4ByIndex(uniformIndex, value) {
        this.shaderData.setVector(uniformIndex, value);
    }
    getVector4ByIndex(uniformIndex) {
        return this.shaderData.getVector(uniformIndex);
    }
    setVector4(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setVector4ByIndex(uniformIndex, value);
    }
    getVector4(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getVector4ByIndex(uniformIndex);
    }
    getColorByIndex(uniformIndex) {
        return this.shaderData.getColor(uniformIndex);
    }
    setColorByIndex(uniformIndex, value) {
        this.shaderData.setColor(uniformIndex, value);
    }
    getColor(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.shaderData.getColor(uniformIndex);
    }
    setColor(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setColorByIndex(uniformIndex, value);
    }
    getMatrix4x4ByIndex(uniformIndex) {
        return this.shaderData.getMatrix4x4(uniformIndex);
    }
    setMatrix4x4ByIndex(uniformIndex, value) {
        this.shaderData.setMatrix4x4(uniformIndex, value);
    }
    getMatrix4x4(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getMatrix4x4ByIndex(uniformIndex);
    }
    setMatrix4x4(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setMatrix4x4ByIndex(uniformIndex, value);
    }
    getMatrix3x3ByIndex(index) {
        return this.shaderData.getMatrix3x3(index);
    }
    setMatrix3x3ByIndex(index, value) {
        this.shaderData.setMatrix3x3(index, value);
    }
    getMatrix3x3(name) {
        let index = Shader3D.propertyNameToID(name);
        return this.getMatrix3x3ByIndex(index);
    }
    setMatrix3x3(name, value) {
        let index = Shader3D.propertyNameToID(name);
        this.setMatrix3x3ByIndex(index, value);
    }
    setTextureByIndex(uniformIndex, texture) {
        this.shaderData.setTexture(uniformIndex, texture);
        if (texture && !texture._texture)
            texture.once(Event.READY, this, this.reSetTexture);
    }
    reSetTexture(texture) {
        let index = this.shaderData.getSourceIndex(texture);
        if (index != -1) {
            this.setTextureByIndex(index, texture);
        }
    }
    getTextureByIndex(uniformIndex) {
        return this.shaderData.getTexture(uniformIndex);
    }
    setTexture(name, texture) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setTextureByIndex(uniformIndex, texture);
    }
    getTexture(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getTextureByIndex(uniformIndex);
    }
    getBufferByIndex(uniformIndex) {
        return this.shaderData.getBuffer(uniformIndex);
    }
    setBufferByIndex(uniformIndex, value) {
        this.shaderData.setBuffer(uniformIndex, value);
    }
    getBuffer(name) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getBufferByIndex(uniformIndex);
    }
    setBuffer(name, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setBufferByIndex(uniformIndex, value);
    }
    setShaderDataByIndex(uniformIndex, type, value) {
        this.shaderData.setShaderData(uniformIndex, type, value);
    }
    setShaderData(name, type, value) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        this.setShaderDataByIndex(uniformIndex, type, value);
    }
    getShaderData(name, type) {
        let uniformIndex = Shader3D.propertyNameToID(name);
        return this.getShaderDataByIndex(uniformIndex, type);
    }
    getShaderDataByIndex(uniformIndex, type) {
        return this._shaderValues.getShaderData(uniformIndex, type);
    }
    cloneTo(destObject) {
        var destBaseMaterial = destObject;
        destBaseMaterial.name = this.name;
        destBaseMaterial.renderQueue = this.renderQueue;
        destBaseMaterial.setShaderName(this._shader._name);
        this._shaderValues.cloneTo(destBaseMaterial._shaderValues);
    }
    clone() {
        var dest = new Material();
        this.cloneTo(dest);
        return dest;
    }
    setShaderPropertyValue(name, value) {
        let propertyID = Shader3D.propertyNameToID(name);
        this.shaderData.setValueData(propertyID, value);
    }
    getShaderPropertyValue(name) {
        return this.shaderData.getValueData(Shader3D.propertyNameToID(name));
    }
    get _defineDatas() {
        return this._shaderValues._defineDatas;
    }
    oldparseEndEvent() {
    }
}
Material.RENDERQUEUE_OPAQUE = 2000;
Material.RENDERQUEUE_ALPHATEST = 2450;
Material.RENDERQUEUE_TRANSPARENT = 3000;

//# sourceMappingURL=Material.js.map
