import { LayaGL } from "../../../../layagl/LayaGL";
import { BufferUsage } from "../../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawMeshInstancedCMD } from "./DrawMeshInstancedCMD";
export class MaterialInstanceProperty {
    constructor() {
        this._isNeedUpdate = false;
    }
    createInstanceVertexBuffer3D() {
        this._instanceData = new Float32Array(DrawMeshInstancedCMD.maxInstanceCount * this._vertexStride);
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(this._instanceData.length * 4, BufferUsage.Dynamic, false);
        this._vertexBuffer.vertexDeclaration = this._vertexDeclaration;
        this._vertexBuffer.instanceBuffer = true;
    }
    updateVertexBufferData(drawNums) {
        if (!this._isNeedUpdate)
            return;
        let instanceData = this._instanceData;
        let dataValue = this._value;
        let datalength = this._value.length;
        let data;
        let stride = this._vertexStride;
        let updateType = 0;
        if (!(this._value instanceof Float32Array)) {
            updateType = 1;
        }
        switch (updateType) {
            case 0:
                instanceData.set(dataValue, 0);
                break;
            case 1:
                for (let i = 0; i < datalength; i++) {
                    data = dataValue[i];
                    data.writeTo(instanceData, i * stride);
                }
                break;
        }
        this._vertexBuffer.orphanStorage();
        this._vertexBuffer.setData(instanceData.buffer, 0, 0, drawNums * 4 * stride);
    }
    destroy() {
        delete this._value;
        delete this._instanceData;
        this._vertexDeclaration = null;
        this._vertexBuffer.destroy();
    }
}

//# sourceMappingURL=MaterialInstanceProperty.js.map
