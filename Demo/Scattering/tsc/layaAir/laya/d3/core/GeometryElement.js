import { LayaGL } from "../../layagl/LayaGL";
export class GeometryElement {
    constructor(mode, drawType) {
        this._destroyed = false;
        this._geometryElementOBj = LayaGL.renderOBJCreate.createRenderGeometry(mode, drawType);
        this._id = ++GeometryElement._uniqueIDCounter;
    }
    set bufferState(value) {
        this._geometryElementOBj.bufferState = value;
    }
    get bufferState() {
        return this._geometryElementOBj.bufferState;
    }
    set mode(value) {
        this._geometryElementOBj.mode = value;
    }
    get mode() {
        return this._geometryElementOBj.mode;
    }
    set drawType(value) {
        this._geometryElementOBj.drawType = value;
    }
    get drawType() {
        return this._geometryElementOBj.drawType;
    }
    setDrawArrayParams(first, count) {
        this._geometryElementOBj.setDrawArrayParams(first, count);
    }
    setDrawElemenParams(count, offset) {
        this._geometryElementOBj.setDrawElemenParams(count, offset);
    }
    set instanceCount(value) {
        this._geometryElementOBj.instanceCount = value;
    }
    get instanceCount() {
        return this._geometryElementOBj.instanceCount;
    }
    set indexFormat(value) {
        this._geometryElementOBj.indexFormat = value;
    }
    get indexFormat() {
        return this._geometryElementOBj.indexFormat;
    }
    get destroyed() {
        return this._destroyed;
    }
    _getType() {
        throw "GeometryElement:must override it.";
    }
    _prepareRender(state) {
        return true;
    }
    _updateRenderParams(state) {
        throw "GeometryElement:must override it.";
    }
    destroy() {
        if (this._destroyed)
            return;
        this._destroyed = true;
        this._geometryElementOBj.destroy();
    }
    clearRenderParams() {
        this._geometryElementOBj.clearRenderParams();
    }
}
GeometryElement._uniqueIDCounter = 0;
GeometryElement._typeCounter = 0;

//# sourceMappingURL=GeometryElement.js.map
