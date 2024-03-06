import { LayaGL } from "../../../layagl/LayaGL";
import { RenderElementOBJ } from "./RenderElementOBJ";
export class InstanceRenderElementOBJ extends RenderElementOBJ {
    constructor() {
        super();
        this._vertexBuffer3D = [];
        this._updateData = [];
        this._updateDataNum = [];
    }
    addUpdateBuffer(vb, length) {
        this._vertexBuffer3D[this.updateNums] = vb;
        this._updateDataNum[this.updateNums++] = length;
    }
    getUpdateData(index, length) {
        let data = this._updateData[index];
        if (!data || data.length < length) {
            data = this._updateData[index] = new Float32Array(length);
        }
        return data;
    }
    drawGeometry(shaderIns) {
        let data;
        let buffer;
        for (let i = 0; i < this.updateNums; i++) {
            buffer = this._vertexBuffer3D[i];
            if (!buffer)
                break;
            data = this._updateData[i];
            buffer.orphanStorage();
            buffer.setData(data.buffer, 0, 0, this.drawCount * this._updateDataNum[i] * 4);
        }
        LayaGL.renderDrawContext.drawGeometryElement(this._geometry);
    }
    clear() {
        this.updateNums = 0;
    }
}

//# sourceMappingURL=InstanceRenderElementOBJ.js.map
