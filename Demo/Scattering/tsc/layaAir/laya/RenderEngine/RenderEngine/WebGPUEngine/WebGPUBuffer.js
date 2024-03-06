import { WebGPUObject } from "./WebGPUObject";
export var GPUBUfferUsage;
(function (GPUBUfferUsage) {
    GPUBUfferUsage[GPUBUfferUsage["MAP_READ"] = 1] = "MAP_READ";
    GPUBUfferUsage[GPUBUfferUsage["MAP_WRITE"] = 2] = "MAP_WRITE";
    GPUBUfferUsage[GPUBUfferUsage["COPY_SRC"] = 4] = "COPY_SRC";
    GPUBUfferUsage[GPUBUfferUsage["COPY_DST"] = 8] = "COPY_DST";
    GPUBUfferUsage[GPUBUfferUsage["INDEX"] = 16] = "INDEX";
    GPUBUfferUsage[GPUBUfferUsage["VERTEX"] = 32] = "VERTEX";
    GPUBUfferUsage[GPUBUfferUsage["UNIFORM"] = 64] = "UNIFORM";
    GPUBUfferUsage[GPUBUfferUsage["STORAGE"] = 128] = "STORAGE";
    GPUBUfferUsage[GPUBUfferUsage["INDIRECT"] = 256] = "INDIRECT";
    GPUBUfferUsage[GPUBUfferUsage["QUERY_RESOLVE"] = 512] = "QUERY_RESOLVE";
})(GPUBUfferUsage || (GPUBUfferUsage = {}));
var GPUMapModeFlag;
(function (GPUMapModeFlag) {
    GPUMapModeFlag[GPUMapModeFlag["READ"] = 1] = "READ";
    GPUMapModeFlag[GPUMapModeFlag["Write"] = 2] = "Write";
})(GPUMapModeFlag || (GPUMapModeFlag = {}));
export class WebGPUBuffer extends WebGPUObject {
    constructor(engine, usage, byteSize = 0, mappedAtCreation = false) {
        super(engine);
        this._size = 0;
        this._isCreate = false;
        this._mappedAtCreation = false;
        this._gpuUsage = usage;
        this._size = byteSize;
        this._gpuUsage = usage;
        this._mappedAtCreation = mappedAtCreation;
        if (this._size > 0) {
            this._create();
        }
    }
    bindBuffer() {
        return false;
    }
    unbindBuffer() {
    }
    bindBufferBase(glPointer) {
    }
    bindBufferRange(glPointer, offset, byteCount) {
    }
    setDataLength(srcData) {
        this._size = srcData;
        this._create();
    }
    _create() {
        if (this._isCreate) {
            console.error("Buffer is Created");
            return;
        }
        this._gpuBuffer = this._engine._device.createBuffer({
            size: this._size,
            usage: this._gpuUsage,
            mappedAtCreation: this._mappedAtCreation
        });
        this._isCreate = true;
    }
    _alignedLength(bytelength) {
        return (bytelength + 3) & ~3;
    }
    _memorychange(bytelength) {
    }
    setData(srcData, offset) {
        if (srcData.buffer) {
            srcData = srcData.buffer;
        }
        this._engine._device.queue.writeBuffer(this._gpuBuffer, 0, srcData, offset, srcData.byteLength);
    }
    setDataEx(srcData, offset, bytelength, dstOffset = 0) {
        if (srcData.buffer) {
            srcData = srcData.buffer;
        }
        this._engine._device.queue.writeBuffer(this._gpuBuffer, dstOffset, srcData, offset, bytelength);
    }
    setSubDataEx(srcData, offset, bytelength, dstOffset = 0) {
        if (srcData.buffer) {
            srcData = srcData.buffer;
        }
        this._engine._device.queue.writeBuffer(this._gpuBuffer, dstOffset, srcData, offset, bytelength);
    }
    readDataFromBuffer() {
    }
    destroy() {
        let defferdArray = this._engine._deferredDestroyBuffers;
        if (defferdArray.indexOf(this) == -1)
            defferdArray.push(this);
    }
    release() {
        if (!this.destroyed) {
            this._gpuBuffer.destroy();
            super.destroy();
        }
    }
}

//# sourceMappingURL=WebGPUBuffer.js.map
