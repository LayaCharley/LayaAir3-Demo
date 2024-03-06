import { LayaGL } from "../../../layagl/LayaGL";
import { NativeRenderElementOBJ, RenderElementType } from "./NativeRenderElementOBJ";
export class NativeInstanceRenderElementOBJ extends NativeRenderElementOBJ {
    constructor() {
        super();
        this._vertexBuffer3D = [];
        this._updateData = [];
    }
    addUpdateBuffer(vb, length) {
        this._vertexBuffer3D[this._updateNums++] = vb;
        this._nativeObj.addUpdateBuffer(vb._conchVertexBuffer3D, length);
    }
    getUpdateData(index, length) {
        let data = this._updateData[index];
        if (!data || data.length < length) {
            data = this._updateData[index] = new Float32Array(length);
            this._nativeObj.getUpdateData(index, data);
        }
        return data;
    }
    clear() {
        this._updateNums = 0;
        this._nativeObj.clear();
    }
    init() {
        this._nativeObj = new window.conchRenderElement(RenderElementType.Instance, LayaGL.renderEngine._nativeObj);
    }
    set drawCount(drawCount) {
        this._nativeObj.drawCount = drawCount;
    }
    get drawCount() {
        return this._nativeObj.drawCount;
    }
}

//# sourceMappingURL=NativeInstanceRenderElementOBJ.js.map
