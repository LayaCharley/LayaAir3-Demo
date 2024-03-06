export class NativeWebGLCacheAsNormalCanvas {
    constructor(ctx, sp) {
        this._context = ctx;
        this._nativeObj = new window._conchWebGLCacheAsNormalCanvas(ctx._nativeObj, 0);
    }
    startRec() {
        this._nativeObj.startRec();
    }
    endRec() {
        this._nativeObj.endRec();
    }
    isCacheValid() {
        return this._nativeObj.isCacheValid();
    }
    isTextNeedRestore() {
        return this._nativeObj.isTextNeedRestore();
    }
    get context() {
        return this._context;
    }
}

//# sourceMappingURL=NativeWebGLCacheAsNormalCanvas.js.map
