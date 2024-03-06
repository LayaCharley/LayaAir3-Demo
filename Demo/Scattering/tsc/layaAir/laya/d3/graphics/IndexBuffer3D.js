import { IndexBuffer } from "../../RenderEngine/IndexBuffer";
import { BufferTargetType, BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
export class IndexBuffer3D extends IndexBuffer {
    constructor(indexType, indexCount, bufferUsage = BufferUsage.Static, canRead = false) {
        super(BufferTargetType.ELEMENT_ARRAY_BUFFER, bufferUsage);
        this._indexType = indexType;
        this._indexCount = indexCount;
        this._canRead = canRead;
        switch (indexType) {
            case IndexFormat.UInt32:
                this._indexTypeByteCount = 4;
                break;
            case IndexFormat.UInt16:
                this._indexTypeByteCount = 2;
                break;
            case IndexFormat.UInt8:
                this._indexTypeByteCount = 1;
                break;
            default:
                throw new Error("unidentification index type.");
        }
        var byteLength = this._indexTypeByteCount * indexCount;
        this._byteLength = byteLength;
        this._setIndexData(byteLength);
        if (canRead) {
            switch (indexType) {
                case IndexFormat.UInt32:
                    this._buffer = new Uint32Array(indexCount);
                    break;
                case IndexFormat.UInt16:
                    this._buffer = new Uint16Array(indexCount);
                    break;
                case IndexFormat.UInt8:
                    this._buffer = new Uint8Array(indexCount);
                    break;
            }
        }
    }
    get indexType() {
        return this._indexType;
    }
    get indexTypeByteCount() {
        return this._indexTypeByteCount;
    }
    get indexCount() {
        return this._indexCount;
    }
    get canRead() {
        return this._canRead;
    }
    setData(data, bufferOffset = 0, dataStartIndex = 0, dataCount = 4294967295) {
        var byteCount = this._indexTypeByteCount;
        if (dataStartIndex !== 0 || dataCount !== 4294967295) {
            switch (this._indexType) {
                case IndexFormat.UInt32:
                    data = new Uint32Array(data.buffer, dataStartIndex * byteCount, dataCount);
                    break;
                case IndexFormat.UInt16:
                    data = new Uint16Array(data.buffer, dataStartIndex * byteCount, dataCount);
                    break;
                case IndexFormat.UInt8:
                    data = new Uint8Array(data.buffer, dataStartIndex * byteCount, dataCount);
                    break;
            }
        }
        this._setIndexData(data, bufferOffset * byteCount);
        if (this._canRead) {
            if (bufferOffset !== 0 || dataStartIndex !== 0 || dataCount !== 4294967295) {
                var maxLength = this._buffer.length - bufferOffset;
                if (dataCount > maxLength)
                    dataCount = maxLength;
                if (typeof data == typeof this._buffer && data.length == dataCount)
                    this._buffer.set(data, bufferOffset);
                else
                    for (var i = 0; i < dataCount; i++)
                        this._buffer[bufferOffset + i] = data[i];
            }
            else {
                this._buffer = data;
            }
        }
    }
    getData() {
        if (this._canRead)
            return this._buffer;
        else
            throw new Error("Can't read data from VertexBuffer with only write flag!");
    }
    destroy() {
        super.destroy();
        this._buffer = null;
        this._byteLength = 0;
        this._indexCount = 0;
    }
}

//# sourceMappingURL=IndexBuffer3D.js.map
