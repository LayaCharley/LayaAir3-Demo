import { BufferTargetType } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { VertexBuffer } from "../../RenderEngine/VertexBuffer";
export class VertexBuffer3D extends VertexBuffer {
    constructor(byteLength, bufferUsage, canRead = false) {
        super(BufferTargetType.ARRAY_BUFFER, bufferUsage);
        this._float32Reader = null;
        this._canRead = canRead;
        this._byteLength = byteLength;
        this.bind();
        this._glBuffer.setDataLength(byteLength);
        if (this._canRead) {
            this._buffer = new Uint8Array(byteLength);
            this._float32Reader = new Float32Array(this._buffer.buffer);
        }
    }
    get vertexDeclaration() {
        return this._vertexDeclaration;
    }
    set vertexDeclaration(value) {
        this._vertexDeclaration = value;
    }
    get canRead() {
        return this._canRead;
    }
    orphanStorage() {
        this.bind();
        this._glBuffer.setDataLength(this._byteLength);
    }
    setData(buffer, bufferOffset = 0, dataStartIndex = 0, dataCount = Number.MAX_SAFE_INTEGER) {
        this.bind();
        var needSubData = dataStartIndex !== 0 || dataCount !== Number.MAX_SAFE_INTEGER;
        if (needSubData) {
            var subData = new Uint8Array(buffer, dataStartIndex, dataCount);
            this._glBuffer.setData(subData, bufferOffset);
            if (this._canRead)
                this._buffer.set(subData, bufferOffset);
        }
        else {
            this._glBuffer.setData(buffer, bufferOffset);
            if (this._canRead)
                this._buffer.set(new Uint8Array(buffer), bufferOffset);
        }
    }
    getUint8Data() {
        if (this._canRead)
            return this._buffer;
        else
            throw new Error("Can't read data from VertexBuffer with only write flag!");
    }
    getFloat32Data() {
        if (this._canRead)
            return this._float32Reader;
        else
            throw new Error("Can't read data from VertexBuffer with only write flag!");
    }
    markAsUnreadbale() {
        this._canRead = false;
        this._buffer = null;
        this._float32Reader = null;
    }
    destroy() {
        super.destroy();
        this._buffer = null;
        this._float32Reader = null;
        this._vertexDeclaration = null;
        this._byteLength = 0;
    }
}

//# sourceMappingURL=VertexBuffer3D.js.map
