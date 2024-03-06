import { LayaGL } from "../layagl/LayaGL";
import { BufferTargetType } from "./RenderEnum/BufferTargetType";
import { UniformBufferBase } from "./UniformBufferBase";
import { Buffer } from "./Buffer";
export class UniformBufferObject extends Buffer {
    constructor(glPointer, name, bufferUsage, byteLength, isSingle) {
        super(BufferTargetType.UNIFORM_BUFFER, bufferUsage);
        this._isSingle = false;
        this._glPointer = glPointer;
        this.byteLength = byteLength;
        this._name = name;
        this._isSingle = isSingle;
        this.bind();
        if (this._isSingle)
            this._bindUniformBufferBase();
        this._glBuffer.setDataLength(this.byteLength);
    }
    static create(name, bufferUsage, bytelength, isSingle = false) {
        if (!UniformBufferObject._Map.get(name)) {
            UniformBufferObject._Map.set(name, new UniformBufferBase(name, LayaGL.renderEngine.getUBOPointer(name), isSingle));
        }
        let bufferBase = UniformBufferObject._Map.get(name);
        if (bufferBase._singgle && bufferBase._mapArray.length > 0) {
            return null;
        }
        else {
            let ubo = LayaGL.renderOBJCreate.createUniformBufferObject(bufferBase._glPointerID, name, bufferUsage, bytelength, isSingle);
            if (bufferBase._singgle)
                bufferBase.add(ubo);
            return ubo;
        }
    }
    static getBuffer(name, index) {
        let base = UniformBufferObject._Map.get(name);
        if (!base)
            return null;
        return base._mapArray[index];
    }
    _bindUniformBufferBase() {
        this._glBuffer.bindBufferBase(this._glPointer);
    }
    _bindBufferRange(offset, byteCount) {
        this.bind();
        this._glBuffer.bindBufferRange(this._glPointer, offset, byteCount);
    }
    _reset(bytelength) {
        if (this._glBuffer) {
            this._glBuffer.destroy();
            this._glBuffer = null;
        }
        this._byteLength = this.byteLength = bytelength;
        this._glBuffer = LayaGL.renderEngine.createBuffer(this._bufferType, this._bufferUsage);
        if (this._isSingle)
            this._bindUniformBufferBase();
        this._glBuffer.setDataLength(this.byteLength);
    }
    bind() {
        return this._glBuffer.bindBuffer();
    }
    setData(buffer, bufferOffset = 0, byteCount = Number.MAX_SAFE_INTEGER) {
        if (byteCount < 0)
            return;
        this.bind();
        var needSubData = !(bufferOffset == 0 && byteCount == this.byteLength);
        if (needSubData) {
            var subData = new Uint8Array(buffer.buffer, bufferOffset, byteCount);
            this._glBuffer.setData(subData, bufferOffset);
        }
        else {
            this._glBuffer.setDataEx(buffer, bufferOffset, buffer.length);
        }
    }
    setDataByUniformBufferData(bufferData) {
        if (this._updateDataInfo == bufferData) {
            this.setData(bufferData._buffer, bufferData._updateFlag.x * 4, (bufferData._updateFlag.y - bufferData._updateFlag.x) * 4);
            bufferData._resetUpdateFlag();
        }
        else {
            this.setData(bufferData._buffer, 0, this.byteLength);
            bufferData._resetUpdateFlag();
            this._updateDataInfo = bufferData;
        }
    }
    setDataByByUniformBufferDataOffset(bufferData, offset) {
        let datalength = bufferData.getbyteLength();
        let reallength = bufferData._realByte;
        bufferData._resetUpdateFlag();
        this.bind();
        this._glBuffer.setDataEx(bufferData._buffer, offset * datalength, reallength / 4);
    }
    destroy() {
        super.destroy();
    }
}
UniformBufferObject.UBONAME_SCENE = "SceneUniformBlock";
UniformBufferObject.UBONAME_CAMERA = "CameraUniformBlock";
UniformBufferObject.UBONAME_SPRITE3D = "SpriteUniformBlock";
UniformBufferObject.UBONAME_SHADOW = "ShadowUniformBlock";
UniformBufferObject.commonMap = ["CameraUniformBlock", "SceneUniformBlock", "SpriteUniformBlock", "ShadowUniformBlock"];
UniformBufferObject._Map = new Map();

//# sourceMappingURL=UniformBufferObject.js.map
