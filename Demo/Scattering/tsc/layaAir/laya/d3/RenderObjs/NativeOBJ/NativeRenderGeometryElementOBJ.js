import { SingletonList } from "../../../utils/SingletonList";
export class NativeRenderGeometryElementOBJ {
    constructor(mode, drawType) {
        this._nativeObj = new window.conchRenderGeometryElement(mode, drawType);
        this.drawParams = new SingletonList();
    }
    setDrawArrayParams(first, count) {
        this.drawParams.add(first);
        this.drawParams.add(count);
        this._nativeObj.setDrawArrayParams(first, count);
    }
    setDrawElemenParams(count, offset) {
        this.drawParams.add(offset);
        this.drawParams.add(count);
        this._nativeObj.setDrawElemenParams(count, offset);
    }
    destroy() {
        this._nativeObj.destroy();
    }
    clearRenderParams() {
        this.drawParams.length = 0;
        this._nativeObj.clearRenderParams();
    }
    set bufferState(value) {
        this._bufferState = value;
        if (value) {
            this._nativeObj.bufferState = value._nativeVertexArrayObject._nativeObj;
        }
        else {
            this._nativeObj.bufferState = null;
        }
    }
    get bufferState() {
        return this._bufferState;
    }
    set mode(value) {
        this._nativeObj.mode = value;
    }
    get mode() {
        return this._nativeObj.mode;
    }
    set drawType(value) {
        this._nativeObj.drawType = value;
    }
    get drawType() {
        return this._nativeObj.drawType;
    }
    set instanceCount(value) {
        this._nativeObj.instanceCount = value;
    }
    get instanceCount() {
        return this._nativeObj.instanceCount;
    }
    set indexFormat(value) {
        this._nativeObj.indexFormat = value;
    }
    get indexFormat() {
        return this._nativeObj.indexFormat;
    }
}

//# sourceMappingURL=NativeRenderGeometryElementOBJ.js.map
