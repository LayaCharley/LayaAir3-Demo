import { RenderInfo } from "../../renders/RenderInfo";
import { BaseShader } from "../shader/BaseShader";
export class Buffer2D {
    constructor(buffer) {
        this._maxsize = 0;
        this._upload = true;
        this._uploadSize = 0;
        this._bufferSize = 0;
        this._u8Array = null;
        this.constBuffer = buffer;
    }
    get bufferLength() {
        return this.constBuffer._buffer.byteLength;
    }
    set byteLength(value) {
        this.setByteLength(value);
    }
    setByteLength(value) {
        if (this.constBuffer._byteLength !== value) {
            value <= this._bufferSize || (this._resizeBuffer(value * 2 + 256, true));
            this.constBuffer._byteLength = value;
        }
    }
    needSize(sz) {
        var old = this.constBuffer._byteLength;
        if (sz) {
            var needsz = this.constBuffer._byteLength + sz;
            needsz <= this._bufferSize || (this._resizeBuffer(needsz << 1, true));
            this.constBuffer._byteLength = needsz;
        }
        return old;
    }
    getFloat32Array() {
        if (!this._floatArray32) {
            this._floatArray32 = new Float32Array(this.constBuffer._buffer.buffer);
        }
        return this._floatArray32;
    }
    _bufferData() {
        this._maxsize = Math.max(this._maxsize, this.constBuffer._byteLength);
        if (RenderInfo.loopCount % 30 == 0) {
            if (this.constBuffer._buffer.byteLength > (this._maxsize + 64)) {
                this.constBuffer._buffer = this.constBuffer._buffer.slice(0, this._maxsize + 64);
                this._bufferSize = this.constBuffer._buffer.byteLength;
                this._checkArrayUse();
                let buff = this.constBuffer._buffer.buffer;
                ((this._bufferSize % 4) == 0) && (this._floatArray32 = new Float32Array(buff));
                ((this._bufferSize % 4) == 0) && (this._uint32Array = new Uint32Array(buff));
                this._uint16Array = new Uint16Array(buff);
            }
            this._maxsize = this.constBuffer._byteLength;
        }
        if (this._uploadSize < this.constBuffer._buffer.byteLength) {
            this._uploadSize = this.constBuffer._buffer.byteLength;
            this.constBuffer._glBuffer.setDataLength(this._uploadSize);
        }
        this.constBuffer._glBuffer.setData(new Uint8Array(this.constBuffer._buffer.buffer, 0, this.constBuffer._byteLength), 0);
        this.constBuffer.unbind();
    }
    _bufferSubData(offset = 0, dataStart = 0, dataLength = 0) {
        this._maxsize = Math.max(this._maxsize, this.constBuffer._byteLength);
        if (RenderInfo.loopCount % 30 == 0) {
            if (this.constBuffer._buffer.byteLength > (this._maxsize + 64)) {
                this.constBuffer._buffer = this.constBuffer._buffer.slice(0, this._maxsize + 64);
                this._bufferSize = this.constBuffer._buffer.byteLength;
                this._checkArrayUse();
            }
            this._maxsize = this.constBuffer._byteLength;
        }
        if (this._uploadSize < this.constBuffer._buffer.byteLength) {
            this._uploadSize = this.constBuffer._buffer.byteLength;
            this.constBuffer._glBuffer.setDataLength(this._uploadSize);
        }
        if (dataStart || dataLength) {
            var subBuffer = this.constBuffer._buffer.buffer.slice(dataStart, dataLength);
            this.constBuffer._glBuffer.setData(subBuffer, offset);
        }
        else {
            this.constBuffer._glBuffer.setData(this.constBuffer._buffer.buffer, offset);
        }
    }
    _checkArrayUse() {
    }
    _bind_upload() {
        if (!this._upload)
            return false;
        this._upload = false;
        this.constBuffer.bind();
        this._bufferData();
        return true;
    }
    _bind_subUpload(offset = 0, dataStart = 0, dataLength = 0) {
        if (!this._upload)
            return false;
        this._upload = false;
        this.constBuffer.bind();
        this._bufferSubData(offset, dataStart, dataLength);
        return true;
    }
    _resizeBuffer(nsz, copy) {
        var buff = this.constBuffer._buffer;
        if (buff && nsz <= buff.byteLength)
            return this;
        var u8buf = this._u8Array;
        if (copy && buff && buff.byteLength > 0) {
            var oldU8Arr = new Uint8Array(buff.buffer);
            var newbuffer = new Uint8Array(nsz);
            newbuffer.set(oldU8Arr, 0);
            buff = this.constBuffer._buffer = newbuffer;
            this._u8Array = new Uint8Array(this.constBuffer._buffer.buffer);
        }
        else {
            var data = new ArrayBuffer(nsz);
            buff = this.constBuffer._buffer = new Uint8Array(data);
            this._u8Array = new Uint8Array(buff.buffer);
        }
        buff = this.constBuffer._buffer.buffer;
        ((nsz % 4) == 0) && (this._floatArray32 = new Float32Array(buff));
        ((nsz % 4) == 0) && (this._uint32Array = new Uint32Array(buff));
        this._uint16Array = new Uint16Array(buff);
        this._checkArrayUse();
        this._upload = true;
        this._bufferSize = buff.byteLength;
        return this;
    }
    append(data) {
        this._upload = true;
        var byteLen, n;
        byteLen = data.byteLength;
        if (data instanceof Uint8Array) {
            this._resizeBuffer(this.constBuffer._byteLength + byteLen, true);
            n = new Uint8Array(this.constBuffer._buffer.buffer, this.constBuffer._byteLength);
        }
        else if (data instanceof Uint16Array) {
            this._resizeBuffer(this.constBuffer._byteLength + byteLen, true);
            n = new Uint16Array(this.constBuffer._buffer.buffer, this.constBuffer._byteLength);
        }
        else if (data instanceof Float32Array) {
            this._resizeBuffer(this.constBuffer._byteLength + byteLen, true);
            n = new Float32Array(this.constBuffer._buffer.buffer, this.constBuffer._byteLength);
        }
        n.set(data, 0);
        this.constBuffer._byteLength += byteLen;
        this._checkArrayUse();
    }
    appendU16Array(data, len) {
        this._resizeBuffer(this.constBuffer._byteLength + len * 2, true);
        var u = new Uint16Array(this.constBuffer._buffer.buffer, this.constBuffer._byteLength, len);
        if (len == 6) {
            u[0] = data[0];
            u[1] = data[1];
            u[2] = data[2];
            u[3] = data[3];
            u[4] = data[4];
            u[5] = data[5];
        }
        else if (len >= 100) {
            u.set(new Uint16Array(data.buffer, 0, len));
        }
        else {
            for (var i = 0; i < len; i++) {
                u[i] = data[i];
            }
        }
        this.constBuffer._byteLength += len * 2;
        this._checkArrayUse();
    }
    getBuffer() {
        return this.constBuffer._buffer.buffer;
    }
    setNeedUpload() {
        this._upload = true;
    }
    subUpload(offset = 0, dataStart = 0, dataLength = 0) {
        var scuess = this._bind_subUpload();
        this.constBuffer.unbind();
        BaseShader.activeShader = null;
        return scuess;
    }
    _disposeResource() {
        this._upload = true;
        this._uploadSize = 0;
        this._floatArray32 = null;
        this._uint32Array = null;
        this._u8Array = null;
    }
    clear() {
        this.constBuffer._byteLength = 0;
        this._upload = true;
    }
}
Buffer2D.FLOAT32 = 4;
Buffer2D.SHORT = 2;

//# sourceMappingURL=Buffer2D.js.map
