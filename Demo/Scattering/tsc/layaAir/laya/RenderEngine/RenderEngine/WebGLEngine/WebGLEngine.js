import { LayaEnv } from "../../../../LayaEnv";
import { Color } from "../../../maths/Color";
import { Vector4 } from "../../../maths/Vector4";
import { BufferTargetType } from "../../RenderEnum/BufferTargetType";
import { RenderClearFlag } from "../../RenderEnum/RenderClearFlag";
import { RenderStatisticsInfo } from "../../RenderEnum/RenderStatInfo";
import { RenderStateCommand } from "../../RenderStateCommand";
import { GL2TextureContext } from "./GL2TextureContext";
import { GLBuffer } from "./GLBuffer";
import { GlCapable } from "./GlCapable";
import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { WebGLMode } from "./GLEnum/WebGLMode";
import { GLParams } from "./GLParams";
import { GLRender2DContext } from "./GLRender2DContext";
import { GLRenderDrawContext } from "./GLRenderDrawContext";
import { GLRenderState } from "./GLRenderState";
import { GLShaderInstance } from "./GLShaderInstance";
import { GLTextureContext } from "./GLTextureContext";
import { GLVertexState } from "./GLVertexState";
export class WebGLEngine {
    constructor(config, webglMode = WebGLMode.Auto) {
        this._propertyNameMap = {};
        this._propertyNameCounter = 0;
        this._IDCounter = 0;
        this._isShaderDebugMode = true;
        this._curUBOPointer = 0;
        this._GLUBOPointerMap = new Map();
        this._GLBindPointerUBOMap = new Map();
        this._lastClearColor = new Color;
        this._lastClearDepth = 1;
        this._GLStatisticsInfo = new Map();
        this._config = config;
        this._isWebGL2 = false;
        this._lastViewport = new Vector4(0, 0, 0, 0);
        this._lastClearColor = new Color(0, 0, 0, 0);
        this._lastScissor = new Vector4(0, 0, 0, 0);
        this._webglMode = webglMode;
        this._initStatisticsInfo();
    }
    get gl() {
        return this._context;
    }
    get isWebGL2() {
        return this._isWebGL2;
    }
    get webglConfig() {
        return this._config;
    }
    _initStatisticsInfo() {
        this._GLStatisticsInfo.set(RenderStatisticsInfo.DrawCall, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.InstanceDrawCall, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.Triangle, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.UniformUpload, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.TextureMemeory, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.GPUMemory, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.RenderTextureMemory, 0);
        this._GLStatisticsInfo.set(RenderStatisticsInfo.BufferMemory, 0);
    }
    _addStatisticsInfo(info, value) {
        this._GLStatisticsInfo.set(info, this._GLStatisticsInfo.get(info) + value);
    }
    clearStatisticsInfo(info) {
        this._GLStatisticsInfo.set(info, 0);
    }
    getStatisticsInfo(info) {
        return this._GLStatisticsInfo.get(info);
    }
    _getBindUBOBuffer(glPointer) {
        return this._GLBindPointerUBOMap.get(glPointer);
    }
    _setBindUBOBuffer(glPointer, buffer) {
        this._GLBindPointerUBOMap.set(glPointer, buffer);
    }
    initRenderEngine(canvas) {
        let names;
        let gl;
        switch (this._webglMode) {
            case WebGLMode.Auto:
                names = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];
                break;
            case WebGLMode.WebGL1:
                names = ["webgl", "experimental-webgl"];
                break;
            case WebGLMode.WebGL2:
                names = ["webgl2", "experimental-webgl2"];
                break;
        }
        for (var i = 0; i < names.length; i++) {
            try {
                gl = canvas.getContext(names[i], this._config);
            }
            catch (e) {
            }
            if (gl) {
                if (names[i] === 'webgl2' || names[i] === 'experimental-webgl2') {
                    this._isWebGL2 = true;
                }
                break;
            }
        }
        this._context = gl;
        this._initBindBufferMap();
        this._supportCapatable = new GlCapable(this);
        this._GLParams = new GLParams(this);
        this._GLRenderState = new GLRenderState(this);
        this._glTextureIDParams = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5, gl.TEXTURE6, gl.TEXTURE7, gl.TEXTURE8, gl.TEXTURE9, gl.TEXTURE10, gl.TEXTURE11, gl.TEXTURE12, gl.TEXTURE13, gl.TEXTURE14, gl.TEXTURE15, gl.TEXTURE16, gl.TEXTURE17, gl.TEXTURE18, gl.TEXTURE19, gl.TEXTURE20, gl.TEXTURE21, gl.TEXTURE22, gl.TEXTURE23, gl.TEXTURE24, gl.TEXTURE25, gl.TEXTURE26, gl.TEXTURE27, gl.TEXTURE28, gl.TEXTURE29, gl.TEXTURE30, gl.TEXTURE31];
        this._activedTextureID = gl.TEXTURE0;
        this._activeTextures = [];
        this._GLTextureContext = this.isWebGL2 ? new GL2TextureContext(this) : new GLTextureContext(this);
        this._GLRenderDrawContext = new GLRenderDrawContext(this);
        this._GL2DRenderContext = new GLRender2DContext(this);
    }
    _initBindBufferMap() {
        this._GLBufferBindMap = {};
        this._GLBufferBindMap[BufferTargetType.ARRAY_BUFFER] = null;
        this._GLBufferBindMap[BufferTargetType.ELEMENT_ARRAY_BUFFER] = null;
        this._GLBufferBindMap[BufferTargetType.UNIFORM_BUFFER] = null;
    }
    _getbindBuffer(target) {
        return this._GLBufferBindMap[target];
    }
    _setbindBuffer(target, buffer) {
        this._GLBufferBindMap[target] = buffer;
    }
    _bindTexture(target, texture) {
        const texID = this._activedTextureID - this._context.TEXTURE0;
        if (this._activeTextures[texID] !== texture) {
            this._context.bindTexture(target, texture);
            this._activeTextures[texID] = texture;
        }
    }
    bindTexture(texture) {
        this._bindTexture(texture._texture.target, texture._getSource());
    }
    applyRenderStateCMD(cmd) {
        this._GLRenderState.applyRenderStateCommand(cmd);
    }
    getCapable(capatableType) {
        return this._supportCapatable.getCapable(capatableType);
    }
    viewport(x, y, width, height) {
        const gl = this._context;
        const lv = this._lastViewport;
        if (LayaEnv.isConch) {
            gl.viewport(x, y, width, height);
        }
        else if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
            gl.viewport(x, y, width, height);
            lv.setValue(x, y, width, height);
        }
    }
    scissor(x, y, width, height) {
        const gl = this._context;
        const lv = this._lastScissor;
        if (LayaEnv.isConch) {
            gl.scissor(x, y, width, height);
        }
        else if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
            gl.scissor(x, y, width, height);
            lv.setValue(x, y, width, height);
        }
    }
    scissorTest(value) {
        if (value)
            this._context.enable(this._context.SCISSOR_TEST);
        else
            this._context.disable(this._context.SCISSOR_TEST);
    }
    clearRenderTexture(clearFlag, clearcolor = null, clearDepth = 1) {
        var flag;
        if (clearFlag & RenderClearFlag.Color) {
            if (clearcolor && !this._lastClearColor.equal(clearcolor)) {
                this._context.clearColor(clearcolor.r, clearcolor.g, clearcolor.b, clearcolor.a);
                clearcolor.cloneTo(this._lastClearColor);
            }
            flag |= this.gl.COLOR_BUFFER_BIT;
        }
        if (clearFlag & RenderClearFlag.Depth) {
            if (this._lastClearDepth != clearDepth) {
                this._context.clearDepth(clearDepth);
                this._lastClearDepth = clearDepth;
            }
            this._GLRenderState.setDepthMask(true);
            flag |= this._context.DEPTH_BUFFER_BIT;
        }
        if (clearFlag & RenderClearFlag.Stencil) {
            this._context.clearStencil(0);
            this._GLRenderState.setStencilMask(true);
            flag |= this._context.STENCIL_BUFFER_BIT;
        }
        if (flag)
            this._context.clear(flag);
    }
    copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
        this._bindTexture(texture._texture.target, texture._getSource());
        this._context.copyTexSubImage2D(texture._texture.target, level, xoffset, yoffset, x, y, width, height);
    }
    colorMask(r, g, b, a) {
        this._context.colorMask(r, g, b, a);
    }
    getParams(params) {
        return this._GLParams.getParams(params);
    }
    createBuffer(targetType, bufferUsageType) {
        return new GLBuffer(this, targetType, bufferUsageType);
    }
    createShaderInstance(vs, ps, attributeMap) {
        return new GLShaderInstance(this, vs, ps, attributeMap);
    }
    createVertexState() {
        return new GLVertexState(this);
    }
    getUBOPointer(name) {
        if (!this._GLUBOPointerMap.has(name))
            this._GLUBOPointerMap.set(name, this._curUBOPointer++);
        return this._GLUBOPointerMap.get(name);
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
        if (this._propertyNameMap[name] != null) {
            return this._propertyNameMap[name];
        }
        else {
            var id = this._propertyNameCounter++;
            this._propertyNameMap[name] = id;
            this._propertyNameMap[id] = name;
            return id;
        }
    }
    propertyIDToName(id) {
        return this._propertyNameMap[id];
    }
    uploadUniforms(shader, commandEncoder, shaderData, uploadUnTexture) {
        shaderData.applyUBO && shaderData.applyUBOData();
        var data = shaderData._data;
        var shaderUniform = commandEncoder.getArrayData();
        var shaderCall = 0;
        for (var i = 0, n = shaderUniform.length; i < n; i++) {
            var one = shaderUniform[i];
            if (uploadUnTexture || one.textureID !== -1) {
                var value = data[one.dataOffset];
                if (value != null)
                    shaderCall += one.fun.call(one.caller, one, value);
            }
        }
        return shaderCall;
    }
    uploadCustomUniforms(shader, custom, index, data) {
        shader.bind();
        var shaderCall = 0;
        var one = custom[index];
        if (one && data != null)
            shaderCall += one.fun.call(one.caller, one, data);
        return shaderCall;
    }
    createRenderStateComand() {
        return new RenderStateCommand();
    }
    unbindVertexState() {
        if (this.isWebGL2)
            this._context.bindVertexArray(null);
        else
            this._supportCapatable.getExtension(WebGLExtension.OES_vertex_array_object).bindVertexArrayOES(null);
        this._GLBindVertexArray = null;
    }
}

//# sourceMappingURL=WebGLEngine.js.map
