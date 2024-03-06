import { LayaGL } from "../../../layagl/LayaGL";
import { SingletonList } from "../../../utils/SingletonList";
export class FastSinglelist extends SingletonList {
    add(element) {
        if (this.length === this.elements.length)
            this.elements.push(element);
        else
            this.elements[this.length] = element;
    }
}
export class RenderGeometryElementOBJ {
    constructor(mode, drawType) {
        this.mode = mode;
        this.drawParams = new SingletonList();
        this.drawType = drawType;
    }
    get indexFormat() {
        return this._indexFormat;
    }
    set indexFormat(value) {
        this._indexFormat = value;
        this._glindexFormat = LayaGL.renderDrawContext.getIndexType(this._indexFormat);
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        this._mode = value;
        this._glmode = LayaGL.renderDrawContext.getMeshTopology(this._mode);
    }
    setDrawArrayParams(first, count) {
        this.drawParams.add(first);
        this.drawParams.add(count);
    }
    setDrawElemenParams(count, offset) {
        this.drawParams.add(offset);
        this.drawParams.add(count);
    }
    destroy() {
        delete this.drawParams;
    }
    clearRenderParams() {
        this.drawParams.length = 0;
    }
}

//# sourceMappingURL=RenderGeometryElementOBJ.js.map
