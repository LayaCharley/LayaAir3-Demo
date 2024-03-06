import { CommonMemoryAllocater } from "./CommonMemoryAllocater";
export class NativeMemory {
    constructor(size, shared) {
        if (shared) {
            if (size > NativeMemory._sharedBuffer.byteLength) {
                throw new Error("NativeMemory:shared buffer not enough");
            }
            this._buffer = NativeMemory._sharedBuffer;
        }
        else {
            this._buffer = CommonMemoryAllocater.creatBlock(size);
        }
        this._idata = new Int32Array(this._buffer);
        this._fdata = new Float32Array(this._buffer);
        this._f64data = new Float64Array(this._buffer);
        this._byteArray = new Uint8Array(this._buffer);
        this._byteLength = size;
    }
    get float32Array() {
        return this._fdata;
    }
    get float64Array() {
        return this._f64data;
    }
    get uint8Array() {
        return this._byteArray;
    }
    get int32Array() {
        return this._idata;
    }
    destroy() {
        if (this._destroyed)
            return;
        this.clear();
        CommonMemoryAllocater.freeMemoryBlock(this._buffer);
        this._destroyed = true;
    }
    clear() {
        this._idata = null;
        this._fdata = null;
        this._byteArray = null;
    }
}
NativeMemory.NativeSourceID = 0;
NativeMemory._sharedBuffer = new ArrayBuffer(256);

//# sourceMappingURL=NativeMemory.js.map
