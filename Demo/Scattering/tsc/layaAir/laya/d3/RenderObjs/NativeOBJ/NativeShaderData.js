import { Color } from "../../../maths/Color";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Quaternion } from "../../../maths/Quaternion";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { MemoryDataType } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/MemoryDataType";
import { UploadMemoryManager } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/UploadMemoryManager";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { BaseTexture } from "../../../resource/BaseTexture";
import { Texture } from "../../../resource/Texture";
import { Texture2D } from "../../../resource/Texture2D";
export var NativeShaderDataType;
(function (NativeShaderDataType) {
    NativeShaderDataType[NativeShaderDataType["Number32"] = 0] = "Number32";
    NativeShaderDataType[NativeShaderDataType["Vector2"] = 1] = "Vector2";
    NativeShaderDataType[NativeShaderDataType["Vector3"] = 2] = "Vector3";
    NativeShaderDataType[NativeShaderDataType["Vector4"] = 3] = "Vector4";
    NativeShaderDataType[NativeShaderDataType["Matrix4x4"] = 4] = "Matrix4x4";
    NativeShaderDataType[NativeShaderDataType["Number32Array"] = 5] = "Number32Array";
    NativeShaderDataType[NativeShaderDataType["Texture"] = 6] = "Texture";
    NativeShaderDataType[NativeShaderDataType["ShaderDefine"] = 7] = "ShaderDefine";
    NativeShaderDataType[NativeShaderDataType["UBO"] = 8] = "UBO";
})(NativeShaderDataType || (NativeShaderDataType = {}));
export class NativeShaderData extends ShaderData {
    constructor(ownerResource = null) {
        super(ownerResource);
        this.inUploadList = false;
        this.payload32bitNum = 0;
        this._initData();
        this._nativeObj = new window.conchShaderData();
        this._nativeObj.setApplyUBOData(this.applyUBOData.bind(this));
        this.nativeObjID = this._nativeObj.nativeID;
        this._dataType = MemoryDataType.ShaderData;
        this.updateMap = new Map();
        this.updataSizeMap = new Map();
    }
    getUploadMemoryLength() {
        let head = 4;
        this.updataSizeMap.forEach((value) => {
            this.payload32bitNum += value;
        });
        return (this.payload32bitNum + head) * 4;
    }
    uploadDataTOShareMemory(memoryBlock, strideInByte) {
        if (!this._data) {
            return false;
        }
        let array = memoryBlock.int32Array;
        let strideFloat = strideInByte / 4;
        array[strideFloat++] = MemoryDataType.ShaderData;
        array[strideFloat++] = this.nativeObjID;
        array[strideFloat++] = this.payload32bitNum;
        array[strideFloat++] = this.updateMap.size;
        this.updateMap.forEach((value, key) => {
            strideFloat += value.call(this, key, memoryBlock, strideFloat);
        });
        this.clearUpload();
        this.inUploadList = false;
        return true;
    }
    clearUpload() {
        this.payload32bitNum = 0;
        this.updataSizeMap.clear();
        this.updateMap.clear();
    }
    applyUBOData() {
        if (this._uniformBufferDatas) {
            super.applyUBOData();
        }
    }
    compressNumber(index, memoryBlock, stride) {
        var length = 3;
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Number32;
        memoryBlock.float32Array[stride + 2] = this._data[index];
        return length;
    }
    compressVector2(index, memoryBlock, stride) {
        var length = 4;
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Vector2;
        var value = this._data[index];
        memoryBlock.float32Array[stride + 2] = value.x;
        memoryBlock.float32Array[stride + 3] = value.y;
        return length;
    }
    compressVector3(index, memoryBlock, stride) {
        var length = 5;
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Vector3;
        var value = this._data[index];
        memoryBlock.float32Array[stride + 2] = value.x;
        memoryBlock.float32Array[stride + 3] = value.y;
        memoryBlock.float32Array[stride + 4] = value.z;
        return length;
    }
    compressVector4(index, memoryBlock, stride) {
        var length = 6;
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Vector4;
        var value = this._data[index];
        memoryBlock.float32Array[stride + 2] = value.x;
        memoryBlock.float32Array[stride + 3] = value.y;
        memoryBlock.float32Array[stride + 4] = value.z;
        memoryBlock.float32Array[stride + 5] = value.w;
        return length;
    }
    compressMatrix4x4(index, memoryBlock, stride) {
        var length = 18;
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Matrix4x4;
        var value = this._data[index];
        memoryBlock.float32Array.set(value.elements, stride + 2);
        return length;
    }
    compressNumberArray(index, memoryBlock, stride) {
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Number32Array;
        var value = this._data[index];
        memoryBlock.int32Array[stride + 2] = value.length;
        memoryBlock.float32Array.set(value, stride + 3);
        return value.length + 3;
    }
    compressTexture(index, memoryBlock, stride) {
        var value = this._data[index];
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.Texture;
        if (value && value instanceof Texture) {
            memoryBlock.int32Array[stride + 2] = value.bitmap._texture.id;
        }
        else if (value && value._texture) {
            memoryBlock.int32Array[stride + 2] = value._texture.id;
        }
        else {
            memoryBlock.int32Array[stride + 2] = Texture2D.errorTexture._texture.id;
        }
        return 3;
    }
    compressUBO(index, memoryBlock, stride) {
        var value = this._data[index];
        memoryBlock.int32Array[stride] = index;
        memoryBlock.int32Array[stride + 1] = NativeShaderDataType.UBO;
        memoryBlock.int32Array[stride + 2] = value._conchUniformBufferObject.nativeID;
        return 3;
    }
    configMotionProperty(key, length, callBack) {
        this.updateMap.set(key, callBack);
        this.updataSizeMap.set(key, length);
        if (!this.inUploadList) {
            this.inUploadList = true;
            UploadMemoryManager.getInstance()._dataNodeList.add(this);
        }
    }
    setBool(index, value) {
        super.setBool(index, value);
        this.configMotionProperty(index, 3, this.compressNumber);
    }
    setInt(index, value) {
        super.setInt(index, value);
        this.configMotionProperty(index, 3, this.compressNumber);
    }
    setNumber(index, value) {
        super.setNumber(index, value);
        this.configMotionProperty(index, 3, this.compressNumber);
    }
    setVector2(index, value) {
        super.setVector2(index, value);
        this.configMotionProperty(index, 4, this.compressVector2);
    }
    setVector3(index, value) {
        super.setVector3(index, value);
        this.configMotionProperty(index, 5, this.compressVector3);
    }
    setVector(index, value) {
        super.setVector(index, value);
        this.configMotionProperty(index, 6, this.compressVector4);
    }
    setColor(index, value) {
        super.setColor(index, value);
        this.configMotionProperty(index, 6, this.compressVector4);
    }
    setMatrix4x4(index, value) {
        super.setMatrix4x4(index, value);
        this.configMotionProperty(index, 18, this.compressMatrix4x4);
    }
    setBuffer(index, value) {
        super.setBuffer(index, value);
        this.configMotionProperty(index, 3 + value.length, this.compressNumberArray);
    }
    setTexture(index, value) {
        super.setTexture(index, value);
        this.configMotionProperty(index, 3, this.compressTexture);
    }
    setUniformBuffer(index, value) {
        this._data[index] = value;
        this.configMotionProperty(index, 3, this.compressUBO);
    }
    setValueData(index, value) {
        if (typeof value == "boolean") {
            this.setBool(index, value);
        }
        else if (typeof value == "number") {
            this.setNumber(index, value);
        }
        else if (value instanceof Color) {
            this.setColor(index, value);
        }
        else if (value instanceof Vector2) {
            this.setVector2(index, value);
        }
        else if (value instanceof Vector3) {
            this.setVector3(index, value);
        }
        else if (value instanceof Vector4 || value instanceof Quaternion) {
            this.setVector(index, value);
        }
        else if (value instanceof Matrix4x4) {
            this.setMatrix4x4(index, value);
        }
        else if (value.ArrayBuffer != null) {
            this.setBuffer(index, value);
        }
        else if (value._texture != null) {
            this.setTexture(index, value);
        }
    }
    cloneTo(destObject) {
        var dest = destObject;
        for (var k in this._data) {
            var value = this._data[k];
            if (value != null) {
                if (typeof (value) == 'boolean') {
                    destObject.setBool(k, value);
                }
                else if (typeof (value) == 'number') {
                    destObject.setNumber(k, value);
                }
                else if (value instanceof Vector2) {
                    destObject.setVector2(k, value);
                }
                else if (value instanceof Vector3) {
                    destObject.setVector3(k, value);
                }
                else if (value instanceof Vector4) {
                    destObject.setVector(k, value);
                }
                else if (value instanceof Matrix4x4) {
                    destObject.setMatrix4x4(k, value);
                }
                else if (value instanceof BaseTexture) {
                    destObject.setTexture(k, value);
                }
            }
        }
        this._defineDatas.cloneTo(dest._defineDatas);
        this._gammaColorMap.forEach((color, index) => {
            destObject._gammaColorMap.set(index, color.clone());
        });
    }
    clone() {
        var dest = new NativeShaderData();
        this.cloneTo(dest);
        return dest;
    }
    destroy() {
        super.destroy();
        this._nativeObj.destroy();
        this._nativeObj = null;
    }
}

//# sourceMappingURL=NativeShaderData.js.map
