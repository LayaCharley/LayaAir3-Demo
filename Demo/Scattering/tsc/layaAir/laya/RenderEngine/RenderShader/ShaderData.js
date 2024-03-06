import { BaseTexture } from "../../resource/BaseTexture";
import { Resource } from "../../resource/Resource";
import { DefineDatas } from "./DefineDatas";
import { ShaderDefine } from "./ShaderDefine";
import { Color } from "../../maths/Color";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector2 } from "../../maths/Vector2";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { Matrix3x3 } from "../../maths/Matrix3x3";
export var ShaderDataType;
(function (ShaderDataType) {
    ShaderDataType[ShaderDataType["Int"] = 0] = "Int";
    ShaderDataType[ShaderDataType["Bool"] = 1] = "Bool";
    ShaderDataType[ShaderDataType["Float"] = 2] = "Float";
    ShaderDataType[ShaderDataType["Vector2"] = 3] = "Vector2";
    ShaderDataType[ShaderDataType["Vector3"] = 4] = "Vector3";
    ShaderDataType[ShaderDataType["Vector4"] = 5] = "Vector4";
    ShaderDataType[ShaderDataType["Color"] = 6] = "Color";
    ShaderDataType[ShaderDataType["Matrix4x4"] = 7] = "Matrix4x4";
    ShaderDataType[ShaderDataType["Texture2D"] = 8] = "Texture2D";
    ShaderDataType[ShaderDataType["TextureCube"] = 9] = "TextureCube";
    ShaderDataType[ShaderDataType["Buffer"] = 10] = "Buffer";
    ShaderDataType[ShaderDataType["Matrix3x3"] = 11] = "Matrix3x3";
})(ShaderDataType || (ShaderDataType = {}));
export function ShaderDataDefaultValue(type) {
    switch (type) {
        case ShaderDataType.Int:
            return 0;
        case ShaderDataType.Bool:
            return false;
        case ShaderDataType.Float:
            return 0;
        case ShaderDataType.Vector2:
            return Vector2.ZERO;
        case ShaderDataType.Vector3:
            return Vector3.ZERO;
        case ShaderDataType.Vector4:
            return Vector4.ZERO;
        case ShaderDataType.Color:
            return Color.BLACK;
        case ShaderDataType.Matrix4x4:
            return Matrix4x4.DEFAULT;
        case ShaderDataType.Matrix3x3:
            return Matrix3x3.DEFAULT;
    }
    return null;
}
export class ShaderData {
    constructor(ownerResource = null) {
        this._ownerResource = null;
        this.applyUBO = false;
        this._data = null;
        this._defineDatas = new DefineDatas();
        this._ownerResource = ownerResource;
        this._initData();
        this._uniformBufferDatas = new Map();
        this._uniformBuffersMap = new Map();
    }
    get uniformBufferDatas() {
        return this._uniformBufferDatas;
    }
    get uniformBuffersMap() {
        return this._uniformBuffersMap;
    }
    _addCheckUBO(key, ubo, uboData) {
        this._uniformBufferDatas.set(key, { ubo: ubo, uboBuffer: uboData });
        uboData._uniformParamsState.forEach((value, id) => {
            this.uniformBuffersMap.set(id, ubo);
        });
        ubo.setDataByUniformBufferData(uboData);
    }
    _initData() {
        this._data = {};
        this._gammaColorMap = new Map();
    }
    getData() {
        return this._data;
    }
    applyUBOData() {
        this._uniformBufferDatas.forEach((value, key) => {
            value.ubo.setDataByUniformBufferData(value.uboBuffer);
        });
        this.applyUBO = false;
    }
    addDefine(define) {
        this._defineDatas.add(define);
    }
    removeDefine(define) {
        this._defineDatas.remove(define);
    }
    hasDefine(define) {
        return this._defineDatas.has(define);
    }
    clearDefine() {
        this._defineDatas.clear();
    }
    getBool(index) {
        return this._data[index];
    }
    setBool(index, value) {
        this._data[index] = value;
    }
    getInt(index) {
        return this._data[index];
    }
    setInt(index, value) {
        this._data[index] = value;
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getInt(index));
        }
    }
    getNumber(index) {
        return this._data[index];
    }
    setNumber(index, value) {
        this._data[index] = value;
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getNumber(index));
            this.applyUBO = true;
        }
    }
    getVector2(index) {
        return this._data[index];
    }
    setVector2(index, value) {
        if (this._data[index]) {
            value.cloneTo(this._data[index]);
        }
        else
            this._data[index] = value.clone();
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector2(index));
            this.applyUBO = true;
        }
    }
    getVector3(index) {
        return this._data[index];
    }
    setVector3(index, value) {
        if (this._data[index]) {
            value.cloneTo(this._data[index]);
        }
        else
            this._data[index] = value.clone();
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector3(index));
            this.applyUBO = true;
        }
    }
    getVector(index) {
        return this._data[index];
    }
    setVector(index, value) {
        if (this._data[index]) {
            value.cloneTo(this._data[index]);
        }
        else
            this._data[index] = value.clone();
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector(index));
            this.applyUBO = true;
        }
    }
    getColor(index) {
        return this._gammaColorMap.get(index);
    }
    setColor(index, value) {
        if (!value)
            return;
        if (this._data[index]) {
            let gammaColor = this._gammaColorMap.get(index);
            value.cloneTo(gammaColor);
            let linearColor = this._data[index];
            linearColor.x = Color.gammaToLinearSpace(value.r);
            linearColor.y = Color.gammaToLinearSpace(value.g);
            linearColor.z = Color.gammaToLinearSpace(value.b);
            linearColor.w = value.a;
        }
        else {
            let linearColor = new Vector4();
            linearColor.x = Color.gammaToLinearSpace(value.r);
            linearColor.y = Color.gammaToLinearSpace(value.g);
            linearColor.z = Color.gammaToLinearSpace(value.b);
            linearColor.w = value.a;
            this._data[index] = linearColor;
            this._gammaColorMap.set(index, value.clone());
        }
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getLinearColor(index));
            this.applyUBO = true;
        }
    }
    getLinearColor(index) {
        return this._data[index];
    }
    getMatrix4x4(index) {
        return this._data[index];
    }
    setMatrix4x4(index, value) {
        if (this._data[index]) {
            value.cloneTo(this._data[index]);
        }
        else {
            this._data[index] = value.clone();
        }
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getMatrix4x4(index));
            this.applyUBO = true;
        }
    }
    getMatrix3x3(index) {
        return this._data[index];
    }
    setMatrix3x3(index, value) {
        if (this._data[index]) {
            value.cloneTo(this._data[index]);
        }
        else {
            this._data[index] = value.clone();
        }
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getMatrix3x3(index));
        }
    }
    getBuffer(index) {
        return this._data[index];
    }
    setBuffer(index, value) {
        this._data[index] = value;
    }
    setTexture(index, value) {
        var lastValue = this._data[index];
        if (value) {
            let shaderDefine = ShaderDefine._texGammaDefine[index];
            if (shaderDefine && value && value.gammaCorrection > 1) {
                this.addDefine(shaderDefine);
            }
            else {
                shaderDefine && this.removeDefine(shaderDefine);
            }
        }
        this._data[index] = value;
        lastValue && lastValue._removeReference();
        value && value._addReference();
    }
    getTexture(index) {
        return this._data[index];
    }
    getSourceIndex(value) {
        for (var i in this._data) {
            if (this._data[i] == value)
                return Number(i);
        }
        return -1;
    }
    setValueData(index, value) {
        if (value instanceof Color) {
            this.setColor(index, value);
            return;
        }
        else if (!value) {
            this._data[index] = value;
        }
        else if (!!value.clone) {
            this._data[index] = value.clone();
        }
        else
            this._data[index] = value;
        let ubo = this._uniformBuffersMap.get(index);
        if (ubo) {
            this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getValueData(index));
            this.applyUBO = true;
        }
    }
    setUniformBuffer(index, value) {
        this._data[index] = value;
    }
    getUniformBuffer(index) {
        return this._data[index];
    }
    setShaderData(uniformIndex, type, value) {
        switch (type) {
            case ShaderDataType.Int:
                this.setInt(uniformIndex, value);
                break;
            case ShaderDataType.Bool:
                this.setBool(uniformIndex, value);
                break;
            case ShaderDataType.Float:
                this.setNumber(uniformIndex, value);
                break;
            case ShaderDataType.Vector2:
                this.setVector2(uniformIndex, value);
                break;
            case ShaderDataType.Vector3:
                this.setVector3(uniformIndex, value);
                break;
            case ShaderDataType.Vector4:
                this.setVector(uniformIndex, value);
                break;
            case ShaderDataType.Color:
                this.setColor(uniformIndex, value);
                break;
            case ShaderDataType.Matrix4x4:
                this.setMatrix4x4(uniformIndex, value);
                break;
            case ShaderDataType.Matrix3x3:
                this.setMatrix3x3(uniformIndex, value);
                break;
            case ShaderDataType.Texture2D:
            case ShaderDataType.TextureCube:
                this.setTexture(uniformIndex, value);
                break;
            case ShaderDataType.Buffer:
                this.setBuffer(uniformIndex, value);
                break;
            default:
                throw "unkone shader data type.";
        }
    }
    getShaderData(uniformIndex, type) {
        switch (type) {
            case ShaderDataType.Int:
                return this.getInt(uniformIndex);
            case ShaderDataType.Bool:
                return this.getBool(uniformIndex);
            case ShaderDataType.Float:
                return this.getNumber(uniformIndex);
            case ShaderDataType.Vector2:
                return this.getVector2(uniformIndex);
            case ShaderDataType.Vector3:
                return this.getVector3(uniformIndex);
            case ShaderDataType.Vector4:
                return this.getVector(uniformIndex);
            case ShaderDataType.Color:
                return this.getColor(uniformIndex);
            case ShaderDataType.Matrix4x4:
                return this.getMatrix4x4(uniformIndex);
            case ShaderDataType.Texture2D:
            case ShaderDataType.TextureCube:
                return this.getTexture(uniformIndex);
            case ShaderDataType.Buffer:
                return this.getBuffer(uniformIndex);
            case ShaderDataType.Matrix3x3:
                return this.getMatrix3x3(uniformIndex);
            case ShaderDataType.Matrix4x4:
                return this.getMatrix4x4(uniformIndex);
            default:
                throw "unkone shader data type.";
        }
    }
    getValueData(index) {
        return this._data[index];
    }
    cloneTo(destObject) {
        var dest = destObject;
        var destData = dest._data;
        for (var k in this._data) {
            var value = this._data[k];
            if (value != null) {
                if (typeof value == "number") {
                    destData[k] = value;
                }
                else if (typeof value == "number") {
                    destData[k] = value;
                }
                else if (typeof value == "boolean") {
                    destData[k] = value;
                }
                else if (value instanceof Vector2) {
                    var v2 = destData[k] || (destData[k] = new Vector2());
                    value.cloneTo(v2);
                    destData[k] = v2;
                }
                else if (value instanceof Vector3) {
                    var v3 = destData[k] || (destData[k] = new Vector3());
                    value.cloneTo(v3);
                    destData[k] = v3;
                }
                else if (value instanceof Vector4) {
                    let color = this.getColor(parseInt(k));
                    if (color) {
                        let clonecolor = color.clone();
                        destObject.setColor(parseInt(k), clonecolor);
                    }
                    else {
                        var v4 = destData[k] || (destData[k] = new Vector4());
                        value.cloneTo(v4);
                        destData[k] = v4;
                    }
                }
                else if (value instanceof Matrix3x3) {
                    let mat = destData[k] || (destData[k] = new Matrix3x3());
                    value.cloneTo(mat);
                    destData[k] = mat;
                }
                else if (value instanceof Matrix4x4) {
                    var mat = destData[k] || (destData[k] = new Matrix4x4());
                    value.cloneTo(mat);
                    destData[k] = mat;
                }
                else if (value instanceof BaseTexture) {
                    destData[k] = value;
                    value._addReference();
                }
                else if (value instanceof Resource) {
                    destData[k] = value;
                    value._addReference();
                }
            }
        }
        this._defineDatas.cloneTo(dest._defineDatas);
        this._gammaColorMap.forEach((color, index) => {
            destObject._gammaColorMap.set(index, color.clone());
        });
        this._cloneUBO(dest._uniformBufferDatas);
        dest.applyUBO = true;
    }
    _cloneUBO(uboDatas) {
        this._uniformBufferDatas.forEach((value, key) => {
            uboDatas.has(key) && (value.uboBuffer.cloneTo(uboDatas.get(key).uboBuffer));
        });
    }
    clone() {
        var dest = new ShaderData();
        this.cloneTo(dest);
        return dest;
    }
    reset() {
        for (var k in this._data) {
            var value = this._data[k];
            if (value instanceof Resource) {
                value._removeReference();
            }
        }
        this._data = {};
        this._gammaColorMap.clear();
        this._uniformBufferDatas.clear();
        this.applyUBO = false;
        this._uniformBuffersMap.clear();
        this._defineDatas.clear();
    }
    destroy() {
        this._defineDatas.destroy();
        this._defineDatas = null;
        for (var k in this._data) {
            var value = this._data[k];
            if (value instanceof Resource) {
                value._removeReference();
            }
        }
        this._data = null;
        this._gammaColorMap.clear();
        this._gammaColorMap = null;
        delete this._uniformBufferDatas;
        delete this._uniformBuffersMap;
        this._uniformBufferDatas = null;
        this._uniformBuffersMap = null;
    }
}

//# sourceMappingURL=ShaderData.js.map
