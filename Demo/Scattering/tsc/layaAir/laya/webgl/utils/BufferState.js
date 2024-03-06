import { LayaGL } from "../../layagl/LayaGL";
import { VertexAttributeLayout } from "../../RenderEngine/VertexAttributeLayout";
export class BufferState {
    constructor() {
        this._nativeVertexArrayObject = LayaGL.renderEngine.createVertexState();
    }
    applyVertexBuffers() {
        this._nativeVertexArrayObject && this._nativeVertexArrayObject.applyVertexBuffer(this._vertexBuffers);
    }
    applyIndexBuffers() {
        this._nativeVertexArrayObject && this._nativeVertexArrayObject.applyIndexBuffer(this._bindedIndexBuffer);
    }
    applyState(vertexBuffers, indexBuffer) {
        this.vertexlayout = VertexAttributeLayout.getVertexLayoutByPool(vertexBuffers);
        this._vertexBuffers = vertexBuffers;
        this._bindedIndexBuffer = indexBuffer;
        if (!this._nativeVertexArrayObject)
            return;
        indexBuffer && indexBuffer.unbind();
        this.bind();
        this.applyVertexBuffers();
        this.applyIndexBuffers();
        this.unBind();
        indexBuffer && indexBuffer.unbind();
    }
    bind() {
        if (!this._nativeVertexArrayObject)
            return;
        this._nativeVertexArrayObject.bindVertexArray();
        BufferState._curBindedBufferState = this;
    }
    unBind() {
        if (!this._nativeVertexArrayObject)
            return;
        if (BufferState._curBindedBufferState == this) {
            this._nativeVertexArrayObject.unbindVertexArray();
            BufferState._curBindedBufferState = null;
        }
        else {
            throw "BufferState: must call bind() function first.";
        }
    }
    isbind() {
        return (BufferState._curBindedBufferState == this);
    }
    static clearbindBufferState() {
        LayaGL.renderEngine.unbindVertexState();
        BufferState._curBindedBufferState = null;
    }
    destroy() {
        if (!this._nativeVertexArrayObject)
            return;
        this._nativeVertexArrayObject.destroy();
        this._nativeVertexArrayObject = null;
    }
}

//# sourceMappingURL=BufferState.js.map
