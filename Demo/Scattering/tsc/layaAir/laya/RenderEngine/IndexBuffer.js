import { IndexFormat } from "./RenderEnum/IndexFormat";
import { Buffer } from "./Buffer";
import { BufferState } from "../webgl/utils/BufferState";
export class IndexBuffer extends Buffer {
    constructor(targetType, bufferUsageType) {
        super(targetType, bufferUsageType);
        this._indexType = IndexFormat.UInt16;
    }
    _setIndexData(data, bufferOffset) {
        var curBufSta = BufferState._curBindedBufferState;
        if (curBufSta) {
            if (curBufSta._bindedIndexBuffer === this) {
                this._glBuffer.setDataLength(0);
            }
            else {
                curBufSta.unBind();
                this.bind();
                if (typeof data === "number")
                    this._glBuffer.setDataLength(data);
                else
                    this._glBuffer.setData(data, bufferOffset);
                curBufSta.bind();
            }
        }
        else {
            this.bind();
            if (typeof data === "number")
                this._glBuffer.setDataLength(data);
            else
                this._glBuffer.setData(data, bufferOffset);
        }
    }
}

//# sourceMappingURL=IndexBuffer.js.map
