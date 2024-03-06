import { NativeGLObject } from "./NativeGLObject";
export class NativeGLVertexState extends NativeGLObject {
    constructor(engine) {
        super(engine);
        this._vertexDeclaration = [];
        this._nativeObj = new window.conchGLVertexState(engine._nativeObj);
        this._nativeVertexBuffers = [];
    }
    bindVertexArray() {
        this._nativeObj.bindVertexArray();
    }
    unbindVertexArray() {
        this._nativeObj.unbindVertexArray();
    }
    applyVertexBuffer(vertexBuffer) {
        this._vertexBuffers = vertexBuffer;
        this._nativeVertexBuffers.length = 0;
        vertexBuffer.forEach((element) => {
            this._nativeVertexBuffers.push(element._conchVertexBuffer3D);
        });
        this._nativeObj.applyVertexBuffer(this._nativeVertexBuffers);
    }
    applyIndexBuffer(indexBuffer) {
        if (indexBuffer == null) {
            return;
        }
        this._bindedIndexBuffer = indexBuffer;
        this._nativeObj.applyIndexBuffer(indexBuffer._conchIndexBuffer3D);
    }
    destroy() {
        this._vertexBuffers = null;
        this._nativeVertexBuffers = [];
        this._bindedIndexBuffer = null;
        super.destroy();
        this._nativeObj.destroy();
    }
}

//# sourceMappingURL=NativeGLVertexState.js.map
