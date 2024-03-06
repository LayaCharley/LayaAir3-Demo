import { SingletonList } from "../../../utils/SingletonList";
import { BufferState } from "../../../webgl/utils/BufferState";
import { Camera } from "../../core/Camera";
import { RenderElementBatch } from "../../graphics/Batch/RenderElementBatch";
export class BaseRenderQueue {
    constructor(isTransparent) {
        this._isTransparent = false;
        this.elements = new SingletonList();
        this._isTransparent = isTransparent;
        this._batch = RenderElementBatch.instance ? RenderElementBatch.instance : new RenderElementBatch();
    }
    set sortPass(value) {
        this._sortPass = value;
    }
    set context(value) {
        this._context = value._contextOBJ;
    }
    addRenderElement(renderelement) {
        this.elements.add(renderelement);
    }
    clear() {
        this.elements.length = 0;
    }
    renderQueue(context) {
        this.context = context;
        this._context.applyContext(Camera._updateMark);
        var elements = this.elements.elements;
        this._batchQueue();
        for (var i = 0, n = this.elements.length; i < n; i++) {
            elements[i]._renderUpdatePre(context);
        }
        this._sort();
        for (var i = 0, n = this.elements.length; i < n; i++)
            elements[i]._render(this._context);
        BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
        this._batch.recoverData();
        this._context.end();
        return n;
    }
    _batchQueue() {
        this._isTransparent || this._batch.batch(this.elements);
    }
    _sort() {
        var count = this.elements.length;
        this._sortPass.sort(this.elements, this._isTransparent, 0, count - 1);
    }
    destroy() {
        this.elements.destroy();
    }
}

//# sourceMappingURL=BaseRenderQueue.js.map
