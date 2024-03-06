import { UploadMemoryManager } from "../../../RenderEngine/RenderEngine/NativeGLEngine/CommonMemory/UploadMemoryManager";
import { SingletonList } from "../../../utils/SingletonList";
import { BufferState } from "../../../webgl/utils/BufferState";
import { Camera } from "../../core/Camera";
import { RenderElementBatch } from "../../graphics/Batch/RenderElementBatch";
export class NativeBaseRenderQueue {
    constructor(isTransparent) {
        this._isTransparent = false;
        this.elements = new SingletonList();
        this._isTransparent = isTransparent;
        this._nativeObj = new window.conchRenderQueue(isTransparent);
        this._batch = RenderElementBatch.instance ? RenderElementBatch.instance : new RenderElementBatch();
    }
    set sortPass(value) {
        this._nativeObj.sortPass = value;
    }
    destroy() {
        this._nativeObj.destroy();
    }
    set context(value) {
        this._context = value._contextOBJ;
    }
    addRenderElement(renderelement) {
        this.elements.add(renderelement);
    }
    clear() {
        this._nativeObj.clear();
        this.elements.length = 0;
    }
    renderQueue(context) {
        this.context = context;
        this._context.applyContext(Camera._updateMark);
        var elements = this.elements.elements;
        this._batchQueue();
        this._nativeObj.clear();
        for (var i = 0, n = this.elements.length; i < n; i++) {
            var render_element = elements[i];
            this._nativeObj.addRenderElement(render_element._renderElementOBJ._nativeObj, render_element.render.renderNode._nativeObj, render_element.material.renderQueue, render_element.render.sortingFudge);
            render_element._renderUpdatePre(context);
        }
        UploadMemoryManager.syncRenderMemory();
        BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
        this._nativeObj.renderQueue(this._context._nativeObj);
        this._batch.recoverData();
        return n;
    }
    _batchQueue() {
        this._isTransparent || this._batch.batch(this.elements);
    }
}

//# sourceMappingURL=NativeBaseRenderQueue.js.map
