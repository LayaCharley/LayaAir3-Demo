import { LayaGL } from "../layagl/LayaGL";
export class Buffer {
    constructor(targetType, bufferUsageType) {
        this._byteLength = 0;
        this._glBuffer = LayaGL.renderEngine.createBuffer(targetType, bufferUsageType);
        this._bufferType = targetType;
        this._bufferUsage = bufferUsageType;
    }
    get bufferUsage() {
        return this._bufferUsage;
    }
    bind() {
        return this._glBuffer.bindBuffer();
    }
    unbind() {
        return this._glBuffer.unbindBuffer();
    }
    destroy() {
        if (this._glBuffer) {
            this._glBuffer.destroy();
            this._glBuffer = null;
        }
    }
}

//# sourceMappingURL=Buffer.js.map
