import { LayaGL } from "../../../layagl/LayaGL";
import { GeometryElement } from "../../core/GeometryElement";
import { RenderCapable } from "../../../RenderEngine/RenderEnum/RenderCapable";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
export class SubMesh extends GeometryElement {
    constructor(mesh) {
        super(MeshTopology.Triangles, DrawType.DrawElement);
        this.indexFormat = mesh.indexFormat;
        if (mesh.indexFormat === IndexFormat.UInt32 && !LayaGL.renderEngine.getCapable(RenderCapable.Element_Index_Uint32)) {
            console.warn("SubMesh:this device do not support IndexFormat.UInt32.");
            return;
        }
        this._mesh = mesh;
        this._boneIndicesList = [];
        this._subIndexBufferStart = [];
        this._subIndexBufferCount = [];
    }
    get indexCount() {
        return this._indexCount;
    }
    _setIndexRange(indexStart, indexCount, indexFormat = IndexFormat.UInt16) {
        this._indexStart = indexStart;
        this._indexCount = indexCount;
        if (this._indexBuffer.canRead) {
            if (indexFormat == IndexFormat.UInt16) {
                this._indices = new Uint16Array(this._indexBuffer.getData().buffer, indexStart * 2, indexCount);
            }
            else {
                this._indices = new Uint32Array(this._indexBuffer.getData().buffer, indexStart * 4, indexCount);
            }
        }
    }
    _getType() {
        return SubMesh._type;
    }
    _prepareRender(state) {
        this._mesh._uploadVerticesData();
        return true;
    }
    _updateRenderParams(state) {
        var mesh = this._mesh;
        var skinnedDatas = (state.renderElement && !!(state.renderElement.render)) ? state.renderElement.render._skinnedData : null;
        var byteCount;
        switch (mesh._indexFormat) {
            case IndexFormat.UInt32:
                byteCount = 4;
                break;
            case IndexFormat.UInt16:
                byteCount = 2;
                break;
            case IndexFormat.UInt8:
                byteCount = 1;
                break;
        }
        this.clearRenderParams();
        this.bufferState = mesh._bufferState;
        if (skinnedDatas) {
            for (var i = 0, n = this._boneIndicesList.length; i < n; i++) {
                this.setDrawElemenParams(this._subIndexBufferCount[i], this._subIndexBufferStart[i] * byteCount);
            }
        }
        else {
            this.setDrawElemenParams(this._indexCount, this._indexStart * byteCount);
        }
    }
    getIndices() {
        if (this._mesh._isReadable)
            return this._indices.slice();
        else
            throw "SubMesh:can't get indices on subMesh,mesh's isReadable must be true.";
    }
    setIndices(indices) {
        this._indexBuffer.setData(indices, this._indexStart, 0, this._indexCount);
    }
    destroy() {
        if (this._destroyed)
            return;
        super.destroy();
        this._indexBuffer.destroy();
        this._indexBuffer = null;
        this._mesh = null;
        this._boneIndicesList = null;
        this._subIndexBufferStart = null;
        this._subIndexBufferCount = null;
    }
}
SubMesh._type = GeometryElement._typeCounter++;

//# sourceMappingURL=SubMesh.js.map
