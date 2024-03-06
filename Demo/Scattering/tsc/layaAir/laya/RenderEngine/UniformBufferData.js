import { Color } from "../maths/Color";
import { Vector2 } from "../maths/Vector2";
import { Shader3D } from "./RenderShader/Shader3D";
export var UniformBufferParamsType;
(function (UniformBufferParamsType) {
    UniformBufferParamsType[UniformBufferParamsType["Number"] = 0] = "Number";
    UniformBufferParamsType[UniformBufferParamsType["Vector2"] = 1] = "Vector2";
    UniformBufferParamsType[UniformBufferParamsType["Vector3"] = 2] = "Vector3";
    UniformBufferParamsType[UniformBufferParamsType["Vector4"] = 3] = "Vector4";
    UniformBufferParamsType[UniformBufferParamsType["Matrix4x4"] = 4] = "Matrix4x4";
    UniformBufferParamsType[UniformBufferParamsType["Vector4Array"] = 5] = "Vector4Array";
    UniformBufferParamsType[UniformBufferParamsType["MatrixArray"] = 6] = "MatrixArray";
})(UniformBufferParamsType || (UniformBufferParamsType = {}));
export class UnifromBufferData {
    constructor(uniformParamsStat) {
        this._uniformParamsState = new Map(uniformParamsStat);
        this._createBuffer();
        this._updateFlag = new Vector2();
        this._resetUpdateFlag();
    }
    _createBuffer() {
        var dataPos = 0;
        this._layoutMap = {};
        const elementSize = 4;
        this._uniformParamsState.forEach((key, value) => {
            dataPos += this._addUniformParams(value, key, dataPos);
        });
        this._bytelength = Math.ceil(dataPos / 4) * 4 * elementSize;
        this._buffer = new Float32Array(dataPos);
    }
    _getArraySize(key) {
        let left = key.indexOf("[");
        let right = key.indexOf("]");
        if (left != -1 && right != -1 && left < right) {
            return parseFloat(key.substring(left + 1, right));
        }
        else
            throw key + " is illegal ";
    }
    _addUniformParams(uniformID, value, offset) {
        let size = 0;
        let posAdd = 0;
        let posG = offset % 4;
        let offsetadd;
        switch (value) {
            case UniformBufferParamsType.Number:
                size = 1;
                posAdd = 1;
                break;
            case UniformBufferParamsType.Vector2:
                size = 2;
                switch (posG) {
                    case 0:
                    case 2:
                        posAdd = 2;
                        break;
                    case 1:
                    case 3:
                        offset += 1;
                        posAdd = 3;
                        break;
                }
                break;
            case UniformBufferParamsType.Vector3:
                size = 3;
                posAdd = 3;
                switch (posG) {
                    case 1:
                    case 2:
                    case 3:
                        offset += (4 - posG);
                        posAdd = (4 - posG) + 3;
                        break;
                }
                break;
            case UniformBufferParamsType.Vector4:
                size = 4;
                switch (posG) {
                    case 0:
                        posAdd = 4;
                        break;
                    case 1:
                        offset += 3;
                        posAdd = 7;
                        break;
                    case 2:
                        offset += 2;
                        posAdd = 6;
                        break;
                    case 3:
                        offset += 1;
                        posAdd = 5;
                        break;
                }
                break;
            case UniformBufferParamsType.Matrix4x4:
                size = 16;
                offsetadd = posG ? 4 - posG : posG;
                offset += offsetadd;
                posAdd = size + offsetadd;
                break;
            case UniformBufferParamsType.Vector4Array:
                size = this._getArraySize(Shader3D.propertyIDToName(uniformID)) * 4;
                offsetadd = posG ? 4 - posG : posG;
                offset += offsetadd;
                posAdd = size + offsetadd;
                break;
            case UniformBufferParamsType.MatrixArray:
                size = this._getArraySize(Shader3D.propertyIDToName(uniformID)) * 16;
                offsetadd = posG ? 4 - posG : posG;
                offset += offsetadd;
                posAdd = size + offsetadd;
                break;
            default:
                throw "Unifrom Buffer Params Type is illegal ";
        }
        const paramsInfo = new Vector2(offset, size);
        this._layoutMap[uniformID] = paramsInfo;
        return posAdd;
    }
    _getParamsInfo(key) {
        return this._layoutMap[key];
    }
    _setUpdateFlag(min, max) {
        if (min < this._updateFlag.x)
            this._updateFlag.x = min;
        if (max > this._updateFlag.y)
            this._updateFlag.y = max;
    }
    destroy() {
        delete this._buffer;
        this._uniformParamsState.clear();
        this._uniformParamsState = null;
        this._layoutMap = null;
        this._updateFlag = null;
    }
    _resetUpdateFlag() {
        this._updateFlag.setValue(this._buffer.length, 0);
    }
    _has(uniformID) {
        const info = this._getParamsInfo(uniformID);
        return !!info;
    }
    _setData(uniformID, value) {
        let uniformType = this._uniformParamsState.get(uniformID);
        switch (uniformType) {
            case UniformBufferParamsType.Number:
                this.setNumberbyIndex(uniformID, value);
                break;
            case UniformBufferParamsType.Vector2:
                this.setVector2byIndex(uniformID, value);
                break;
            case UniformBufferParamsType.Vector3:
                this.setVector3byIndex(uniformID, value);
                break;
            case UniformBufferParamsType.Vector4:
                this.setVector4byIndex(uniformID, value);
                break;
            case UniformBufferParamsType.Matrix4x4:
                this.setMatrixbyIndex(uniformID, value);
                break;
            case UniformBufferParamsType.Vector4Array:
                this.setVector4ArraybyIndex(uniformID, value);
                break;
            case UniformBufferParamsType.MatrixArray:
                this.setMatrixArraybyIndex(uniformID, value);
                break;
            default:
                break;
        }
    }
    getbyteLength() {
        return this._bytelength;
    }
    setVector4Array(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setVector4ArraybyIndex(uniformID, value);
    }
    setVector4ArraybyIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        let count = info.y / 4;
        for (let i = 0; i < count; i++) {
            let vec = value[i];
            this._buffer[pos++] = vec.x;
            this._buffer[pos++] = vec.y;
            this._buffer[pos++] = vec.z;
            this._buffer[pos++] = vec.w;
        }
        this._setUpdateFlag(info.x, pos);
    }
    setMatrixArray(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setMatrixArraybyIndex(uniformID, value);
    }
    setMatrixArraybyIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        let count = info.y / 4;
        for (let i = 0; i < count; i++) {
            let mat = value[i];
            this._buffer.set(mat.elements, pos);
            pos += 16;
        }
        this._setUpdateFlag(info.x, pos);
    }
    setNumber(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setNumberbyIndex(uniformID, value);
    }
    setNumberbyIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer[pos++] = value;
        this._setUpdateFlag(info.x, pos);
    }
    setVector2(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setVector2byIndex(uniformID, value);
    }
    setVector2byIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer[pos++] = value.x;
        this._buffer[pos++] = value.y;
        this._setUpdateFlag(info.x, pos);
    }
    setVector3(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setVector3byIndex(uniformID, value);
    }
    setVector3byIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer[pos++] = value.x;
        this._buffer[pos++] = value.y;
        this._buffer[pos++] = value.z;
        this._setUpdateFlag(info.x, pos);
    }
    setVector4(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setVector4byIndex(uniformID, value);
    }
    setVector4byIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer[pos++] = value.x;
        this._buffer[pos++] = value.y;
        this._buffer[pos++] = value.z;
        this._buffer[pos++] = value.w;
        this._setUpdateFlag(info.x, pos);
    }
    setColor(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setColorbyIndex(uniformID, value);
    }
    setColorbyIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer[pos++] = Color.gammaToLinearSpace(value.r);
        this._buffer[pos++] = Color.gammaToLinearSpace(value.g);
        this._buffer[pos++] = Color.gammaToLinearSpace(value.b);
        this._buffer[pos++] = Color.gammaToLinearSpace(value.a);
        this._setUpdateFlag(info.x, pos);
    }
    setMatrix(name, value) {
        const uniformID = Shader3D.propertyNameToID(name);
        this.setMatrixbyIndex(uniformID, value);
    }
    setMatrixbyIndex(uniformID, value) {
        const info = this._getParamsInfo(uniformID);
        if (!info)
            return;
        let pos = info.x;
        this._buffer.set(value.elements, pos);
        pos += 16;
        this._setUpdateFlag(info.x, pos);
    }
    clone() {
        let ubd = new UnifromBufferData(this._uniformParamsState);
        this.cloneTo(ubd);
        return ubd;
    }
    cloneTo(destObject) {
        if (destObject._bytelength == this._bytelength) {
            destObject._buffer = Float32Array.from(this._buffer);
            this._updateFlag.setValue(0, this._buffer.length);
        }
    }
}

//# sourceMappingURL=UniformBufferData.js.map
