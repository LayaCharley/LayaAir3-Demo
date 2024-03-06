import { NativeGL2TextureContext } from "./NativeGL2TextureContext";
import { WebGLMode } from "../WebGLEngine/GLEnum/WebGLMode";
import { NativeGLTextureContext } from "./NativeGLTextureContext";
import { NativeGLVertexState } from "./NativeGLVertexState";
import { NativeGLRenderDrawContext } from "./NativeGLRenderDrawContext";
import { Color } from "../../../maths/Color";
import { NativeRenderStateCommand } from "./NativeRenderStateCommand";
export class NativeWebGLEngine {
    constructor(config, webglMode = WebGLMode.Auto) {
        this._isShaderDebugMode = true;
        this._nativeObj = new window.conchWebGLEngine(webglMode);
    }
    createRenderStateComand() {
        return new NativeRenderStateCommand();
    }
    getUBOPointer(name) {
        return this._nativeObj.getUBOPointer(name);
    }
    _addStatisticsInfo(info, value) {
        this._nativeObj.addStatisticsInfo(info, value);
    }
    clearStatisticsInfo(info) {
        this._nativeObj.clearStatisticsInfo(info);
    }
    getStatisticsInfo(info) {
        return this._nativeObj.getStatisticsInfo(info);
    }
    get gl() {
        return this._context;
    }
    get isWebGL2() {
        return this._nativeObj.isWebGL2;
    }
    get webglConfig() {
        return this._config;
    }
    initRenderEngine(canvas) {
        this._nativeObj.initRenderEngine();
        this._GLRenderDrawContext = new NativeGLRenderDrawContext(this);
        if (this.isWebGL2) {
            this._GLTextureContext = new NativeGL2TextureContext(this, new window.conchGL2TextureContext(this._nativeObj));
        }
        else {
            this._GLTextureContext = new NativeGLTextureContext(this, new window.conchGLTextureContext(this._nativeObj));
        }
    }
    bindTexture(texture) {
        throw new Error("Method not implemented.");
    }
    applyRenderStateCMD(cmd) {
        this._nativeObj.applyRenderStateCommand(cmd._nativeObj);
    }
    getCapable(capatableType) {
        return this._nativeObj.getCapable(capatableType);
    }
    viewport(x, y, width, height) {
        this._nativeObj.viewport(x, y, width, height);
    }
    scissor(x, y, width, height) {
        this._nativeObj.scissor(x, y, width, height);
    }
    scissorTest(value) {
        this._nativeObj.scissorTest(value);
    }
    clearRenderTexture(clearFlag, clearcolor = null, clearDepth = 1) {
        if (clearcolor)
            this._nativeObj.clearRenderTexture(clearFlag, true, clearcolor.r, clearcolor.g, clearcolor.b, clearcolor.a, clearDepth);
        else
            this._nativeObj.clearRenderTexture(clearFlag, false, Color.BLACK.r, Color.BLACK.g, Color.BLACK.b, Color.BLACK.a, clearDepth);
    }
    copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
        this._nativeObj.copySubFrameBuffertoTex(texture._texture, level, xoffset, yoffset, x, y, width, height);
    }
    colorMask(r, g, b, a) {
        this._nativeObj.colorMask(r, g, b, a);
    }
    getParams(params) {
        return this._nativeObj.getParams(params);
    }
    createBuffer(targetType, bufferUsageType) {
        return new window.conchGLBuffer(this._nativeObj, targetType, bufferUsageType);
    }
    createShaderInstance(vs, ps, attributeMap) {
        throw new Error("Method not implemented.");
    }
    createVertexState() {
        return new NativeGLVertexState(this);
    }
    getTextureContext() {
        return this._GLTextureContext;
    }
    getDrawContext() {
        return this._GLRenderDrawContext;
    }
    get2DRenderContext() {
        return this._GL2DRenderContext;
    }
    getCreateRenderOBJContext() {
        return this._renderOBJCreateContext;
    }
    propertyNameToID(name) {
        return this._nativeObj.propertyNameToID(name);
    }
    propertyIDToName(id) {
        throw new Error("Method not implemented.");
    }
    uploadUniforms(shader, commandEncoder, shaderData, uploadUnTexture) {
        throw new Error("Method not implemented.");
    }
    uploadCustomUniforms(shader, custom, index, data) {
        throw new Error("Method not implemented.");
    }
    unbindVertexState() {
        this._nativeObj.unbindVertexState && this._nativeObj.unbindVertexState();
    }
}

//# sourceMappingURL=NativeWebGLEngine.js.map
