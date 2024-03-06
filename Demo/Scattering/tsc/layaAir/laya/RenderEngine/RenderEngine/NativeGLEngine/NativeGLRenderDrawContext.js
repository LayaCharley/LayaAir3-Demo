import { NativeGLObject } from "./NativeGLObject";
export class NativeGLRenderDrawContext extends NativeGLObject {
    constructor(engine) {
        super(engine);
        this._nativeObj = new window.conchGLRenderDrawContext(engine._nativeObj);
    }
    drawElementsInstanced(mode, count, type, offset, instanceCount) {
        this._nativeObj.drawElementsInstanced(mode, count, type, offset, instanceCount);
    }
    drawArraysInstanced(mode, first, count, instanceCount) {
        this._nativeObj.drawArraysInstanced(mode, first, count, instanceCount);
    }
    drawArrays(mode, first, count) {
        this._nativeObj.drawArrays(mode, first, count);
    }
    drawElements(mode, count, type, offset) {
        this._nativeObj.drawElements(mode, count, type, offset);
    }
    drawElements2DTemp(mode, count, type, offset) {
    }
    drawGeometryElement(geometryElement) {
        this._nativeObj.drawGeometryElement(geometryElement._nativeObj);
    }
}

//# sourceMappingURL=NativeGLRenderDrawContext.js.map
