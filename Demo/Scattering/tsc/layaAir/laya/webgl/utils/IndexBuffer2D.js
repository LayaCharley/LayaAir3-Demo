import { IndexBuffer } from "../../RenderEngine/IndexBuffer";
import { BufferTargetType, BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { Buffer2D } from "./Buffer2D";
export class IndexBuffer2D extends IndexBuffer {
    constructor(bufferUsage = BufferUsage.Static) {
        super(BufferTargetType.ELEMENT_ARRAY_BUFFER, bufferUsage);
        this.buffer2D = new Buffer2D(this);
        this._bufferUsage = bufferUsage;
        this._buffer = new Uint8Array(8);
    }
    _bindForVAO() {
        this._glBuffer.bindBuffer();
    }
    destory() {
        this._uint16Array = null;
        this._buffer = null;
    }
    disposeResource() {
        this.buffer2D._disposeResource();
    }
}
IndexBuffer2D.create = function (bufferUsage = BufferUsage.Static) {
    return new IndexBuffer2D(bufferUsage);
};

//# sourceMappingURL=IndexBuffer2D.js.map
