import { LayaEnv } from "../../../../LayaEnv";
import { TextureCube } from "../../../resource/TextureCube";
import { Texture2D } from "../../../resource/Texture2D";
import { ShaderVariable } from "../../RenderShader/ShaderVariable";
import { GLObject } from "./GLObject";
export class GLShaderInstance extends GLObject {
    constructor(engine, vs, ps, attributeMap) {
        super(engine);
        this._complete = true;
        this._vs = vs;
        this._ps = ps;
        this._attributeMap = attributeMap;
        this._uniformMap = [];
        this._create();
    }
    _create() {
        const gl = this._gl;
        this._program = gl.createProgram();
        this._vshader = this._createShader(gl, this._vs, gl.VERTEX_SHADER);
        this._pshader = this._createShader(gl, this._ps, gl.FRAGMENT_SHADER);
        gl.attachShader(this._program, this._vshader);
        gl.attachShader(this._program, this._pshader);
        for (var k in this._attributeMap)
            gl.bindAttribLocation(this._program, this._attributeMap[k][0], k);
        gl.linkProgram(this._program);
        const bo = gl.getProgramParameter(this._program, gl.LINK_STATUS);
        if (!bo) {
            var info = gl.getProgramInfoLog(this._program);
            console.error(new Error('Could not compile WebGL program. \n\n' + info));
            this._complete = false;
            return;
        }
        const nUniformNum = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
        this.useProgram();
        this._curActTexIndex = 0;
        let one, i;
        for (i = 0; i < nUniformNum; i++) {
            var uniformData = gl.getActiveUniform(this._program, i);
            var uniName = uniformData.name;
            let location = gl.getUniformLocation(this._program, uniName);
            if (!location && location != 0)
                continue;
            one = new ShaderVariable();
            one.location = location;
            if (uniName.indexOf('[0]') > 0) {
                one.name = uniName = uniName.substr(0, uniName.length - 3);
                one.isArray = true;
            }
            else {
                one.name = uniName;
                one.isArray = false;
            }
            one.type = uniformData.type;
            this._addShaderUnifiormFun(one);
            this._uniformMap.push(one);
            one.dataOffset = this._engine.propertyNameToID(uniName);
        }
        if (this._engine.isWebGL2) {
            this._uniformObjectMap = {};
            var nUniformBlock = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORM_BLOCKS);
            for (i = 0; i < nUniformBlock; i++) {
                let gl2 = gl;
                var uniformBlockName = gl2.getActiveUniformBlockName(this._program, i);
                one = new ShaderVariable();
                one.name = uniformBlockName;
                one.isArray = false;
                one.type = gl.UNIFORM_BUFFER;
                one.dataOffset = this._engine.propertyNameToID(uniformBlockName);
                let location = one.location = gl2.getUniformBlockIndex(this._program, uniformBlockName);
                gl2.uniformBlockBinding(this._program, location, this._engine.getUBOPointer(uniformBlockName));
                this._uniformObjectMap[one.name] = one;
                this._uniformMap.push(one);
                this._addShaderUnifiormFun(one);
            }
        }
    }
    _legalUBObyteLength(bytelength) {
        return Math.ceil(bytelength / 16) * 16;
    }
    _createShader(gl, str, type) {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, str);
        gl.compileShader(shader);
        if (this._engine._isShaderDebugMode && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            if (!LayaEnv.isPlaying) {
                console.warn(gl.getShaderInfoLog(shader));
            }
            else {
                console.error(gl.getShaderInfoLog(shader));
            }
        }
        return shader;
    }
    _addShaderUnifiormFun(one) {
        var gl = this._gl;
        one.caller = this;
        var isArray = one.isArray;
        switch (one.type) {
            case gl.BOOL:
                one.fun = this._uniform1i;
                one.uploadedValue = new Array(1);
                break;
            case gl.INT:
                one.fun = isArray ? this._uniform1iv : this._uniform1i;
                one.uploadedValue = new Array(1);
                break;
            case gl.FLOAT:
                one.fun = isArray ? this._uniform1fv : this._uniform1f;
                one.uploadedValue = new Array(1);
                break;
            case gl.FLOAT_VEC2:
                one.fun = isArray ? this._uniform_vec2v : this._uniform_vec2;
                one.uploadedValue = new Array(2);
                break;
            case gl.FLOAT_VEC3:
                one.fun = isArray ? this._uniform_vec3v : this._uniform_vec3;
                one.uploadedValue = new Array(3);
                break;
            case gl.FLOAT_VEC4:
                one.fun = isArray ? this._uniform_vec4v : this._uniform_vec4;
                one.uploadedValue = new Array(4);
                break;
            case gl.FLOAT_MAT2:
                one.fun = this._uniformMatrix2fv;
                break;
            case gl.FLOAT_MAT3:
                one.fun = this._uniformMatrix3fv;
                break;
            case gl.FLOAT_MAT4:
                one.fun = isArray ? this._uniformMatrix4fv : this._uniformMatrix4f;
                break;
            case gl.SAMPLER_2D:
            case gl.SAMPLER_2D_SHADOW:
                gl.uniform1i(one.location, this._curActTexIndex);
                one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                one.fun = this._uniform_sampler2D;
                break;
            case gl.SAMPLER_2D_ARRAY:
                gl.uniform1i(one.location, this._curActTexIndex);
                one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                one.fun = this._uniform_sampler2DArray;
                break;
            case 0x8b5f:
                gl.uniform1i(one.location, this._curActTexIndex);
                one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                one.fun = this._uniform_sampler3D;
                break;
            case gl.SAMPLER_CUBE:
                gl.uniform1i(one.location, this._curActTexIndex);
                one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                one.fun = this._uniform_samplerCube;
                break;
            case gl.UNIFORM_BUFFER:
                one.fun = this._uniform_UniformBuffer;
                break;
            default:
                throw new Error("compile shader err!");
        }
    }
    getUniformMap() {
        return this._uniformMap;
    }
    bind() {
        return this.useProgram();
    }
    useProgram() {
        if (this._engine._glUseProgram === this)
            return false;
        this._gl.useProgram(this._program);
        this._engine._glUseProgram = this;
        return true;
    }
    _uniform1f(one, value) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== value) {
            this._gl.uniform1f(one.location, uploadedValue[0] = value);
            return 1;
        }
        return 0;
    }
    _uniform1fv(one, value) {
        if (value.length < 4) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
                this._gl.uniform1fv(one.location, value);
                uploadedValue[0] = value[0];
                uploadedValue[1] = value[1];
                uploadedValue[2] = value[2];
                uploadedValue[3] = value[3];
                return 1;
            }
            return 0;
        }
        else {
            this._gl.uniform1fv(one.location, value);
            return 1;
        }
    }
    _uniform_vec2(one, v) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y) {
            this._gl.uniform2f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y);
            return 1;
        }
        return 0;
    }
    _uniform_vec2v(one, value) {
        if (value.length < 2) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
                this._gl.uniform2fv(one.location, value);
                uploadedValue[0] = value[0];
                uploadedValue[1] = value[1];
                uploadedValue[2] = value[2];
                uploadedValue[3] = value[3];
                return 1;
            }
            return 0;
        }
        else {
            this._gl.uniform2fv(one.location, value);
            return 1;
        }
    }
    _uniform_vec3(one, v) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y || uploadedValue[2] !== v.z) {
            this._gl.uniform3f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y, uploadedValue[2] = v.z);
            return 1;
        }
        return 0;
    }
    _uniform_vec3v(one, v) {
        this._gl.uniform3fv(one.location, v);
        return 1;
    }
    _uniform_vec4(one, v) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y || uploadedValue[2] !== v.z || uploadedValue[3] !== v.w) {
            this._gl.uniform4f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y, uploadedValue[2] = v.z, uploadedValue[3] = v.w);
            return 1;
        }
        return 0;
    }
    _uniform_vec4v(one, v) {
        this._gl.uniform4fv(one.location, v);
        return 1;
    }
    _uniformMatrix2fv(one, value) {
        this._gl.uniformMatrix2fv(one.location, false, value);
        return 1;
    }
    _uniformMatrix3fv(one, m) {
        let value = m.elements;
        this._gl.uniformMatrix3fv(one.location, false, value);
        return 1;
    }
    _uniformMatrix4f(one, m) {
        var value = m.elements;
        this._gl.uniformMatrix4fv(one.location, false, value);
        return 1;
    }
    _uniformMatrix4fv(one, m) {
        this._gl.uniformMatrix4fv(one.location, false, m);
        return 1;
    }
    _uniform1i(one, value) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== value) {
            this._gl.uniform1i(one.location, uploadedValue[0] = value);
            return 1;
        }
        return 0;
    }
    _uniform1iv(one, value) {
        this._gl.uniform1iv(one.location, value);
        return 1;
    }
    _uniform_ivec2(one, value) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1]) {
            this._gl.uniform2i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1]);
            return 1;
        }
        return 0;
    }
    _uniform_ivec2v(one, value) {
        this._gl.uniform2iv(one.location, value);
        return 1;
    }
    _uniform_vec3i(one, value) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2]) {
            this._gl.uniform3i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2]);
            return 1;
        }
        return 0;
    }
    _uniform_vec3vi(one, value) {
        this._gl.uniform3iv(one.location, value);
        return 1;
    }
    _uniform_vec4i(one, value) {
        var uploadedValue = one.uploadedValue;
        if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
            this._gl.uniform4i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2], uploadedValue[3] = value[3]);
            return 1;
        }
        return 0;
    }
    _uniform_vec4vi(one, value) {
        this._gl.uniform4iv(one.location, value);
        return 1;
    }
    _uniform_sampler2D(one, texture) {
        var value = texture ? texture._getSource() : Texture2D.errorTexture._getSource();
        var gl = this._gl;
        this._bindTexture(one.textureID, gl.TEXTURE_2D, value);
        return 0;
    }
    _uniform_sampler2DArray(one, texture) {
        var value = texture ? texture._getSource() : Texture2D.errorTexture._getSource();
        var gl = this._gl;
        this._bindTexture(one.textureID, gl.TEXTURE_2D_ARRAY, value);
        return 0;
    }
    _uniform_sampler3D(one, texture) {
        var value = texture ? texture._getSource() : Texture2D.errorTexture._getSource();
        var gl = this._gl;
        this._bindTexture(one.textureID, gl.TEXTURE_3D, value);
        return 0;
    }
    _uniform_samplerCube(one, texture) {
        var value = texture ? texture._getSource() : TextureCube.errorTexture._getSource();
        var gl = this._gl;
        this._bindTexture(one.textureID, gl.TEXTURE_CUBE_MAP, value);
        return 0;
    }
    _uniform_UniformBuffer(one, value) {
        value._bindUniformBufferBase();
        return 1;
    }
    _bindTexture(textureID, target, texture) {
        const gl = this._gl;
        if (this._engine._activedTextureID !== textureID) {
            gl.activeTexture(textureID);
            this._engine._activedTextureID = textureID;
        }
        const texID = this._engine._activedTextureID - this._gl.TEXTURE0;
        if (this._engine._activeTextures[texID] !== texture) {
            gl.bindTexture(target, texture);
            this._engine._activeTextures[texID] = texture;
        }
    }
    destroy() {
        super.destroy();
        const gl = this._gl;
        gl.deleteShader(this._vshader);
        gl.deleteShader(this._pshader);
        gl.deleteProgram(this._program);
        this._vshader = null;
        this._pshader = null;
        this._program = null;
        this._attributeMap = null;
        this._uniformMap = null;
        this._uniformObjectMap = null;
        this._gl = null;
        this._engine = null;
    }
}

//# sourceMappingURL=GLShaderInstance.js.map
