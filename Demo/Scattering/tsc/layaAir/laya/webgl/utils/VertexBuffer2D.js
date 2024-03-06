import { BufferTargetType, BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { VertexBuffer } from "../../RenderEngine/VertexBuffer";
import { Buffer2D } from "./Buffer2D";
export class VertexBuffer2D extends VertexBuffer {
    constructor(vertexStride, bufferUsage) {
        super(BufferTargetType.ARRAY_BUFFER, bufferUsage);
        this.buffer2D = new Buffer2D(this);
        this._vertexStride = vertexStride;
        this._bufferUsage = bufferUsage;
    }
    get vertexStride() {
        return this._vertexStride;
    }
    getFloat32Array() {
        return this.buffer2D._floatArray32;
    }
    get _floatArray32() {
        return this.buffer2D._floatArray32;
    }
    get _uint32Array() {
        return this.buffer2D._uint32Array;
    }
    appendArray(data) {
        var oldoff = this._byteLength >> 2;
        this.buffer2D.setByteLength(this._byteLength + data.length * 4);
        var vbdata = this.getFloat32Array();
        vbdata.set(data, oldoff);
        this.buffer2D._upload = true;
    }
    deleteBuffer() {
        this.buffer2D._disposeResource();
    }
    _bindForVAO() {
        this._glBuffer.bindBuffer();
    }
    destroy() {
        super.destroy();
        this._byteLength = 0;
        this.buffer2D._upload = true;
        this._buffer = null;
    }
}
VertexBuffer2D.create = function (vertexStride, bufferUsage = BufferUsage.Dynamic) {
    return new VertexBuffer2D(vertexStride, bufferUsage);
};

//# sourceMappingURL=VertexBuffer2D.js.map
