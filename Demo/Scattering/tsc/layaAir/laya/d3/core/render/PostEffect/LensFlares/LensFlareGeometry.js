import { BufferUsage } from "laya/RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "laya/RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "laya/RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "laya/RenderEngine/RenderEnum/RenderPologyMode";
import { VertexDeclaration } from "laya/RenderEngine/VertexDeclaration";
import { GeometryElement } from "laya/d3/core/GeometryElement";
import { LayaGL } from "laya/layagl/LayaGL";
import { VertexElement } from "laya/renders/VertexElement";
import { VertexElementFormat } from "laya/renders/VertexElementFormat";
import { BufferState } from "laya/webgl/utils/BufferState";
export class LensFlareElementGeomtry extends GeometryElement {
    constructor() {
        super(MeshTopology.Triangles, DrawType.DrawElementInstance);
        this.indexFormat = IndexFormat.UInt16;
        this._createBuffer();
    }
    static init() {
        let quadSize = 0.1;
        LensFlareElementGeomtry.lensQuadVertices = new Float32Array([
            quadSize, quadSize, 1, 1,
            -quadSize, quadSize, 0, 1,
            -quadSize, -quadSize, 0, 0,
            quadSize, -quadSize, 1, 0
        ]);
        LensFlareElementGeomtry.lensQuadIndex = new Uint16Array([0, 2, 1, 0, 3, 2]);
        LensFlareElementGeomtry.vertexDeclaration = new VertexDeclaration(16, [new VertexElement(0, VertexElementFormat.Vector4, 0)]);
        LensFlareElementGeomtry.instanceVertexDeclaration = new VertexDeclaration(16, [new VertexElement(0, VertexElementFormat.Vector4, 1)]);
    }
    _createBuffer() {
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(LensFlareElementGeomtry.lensQuadVertices.length * 4, BufferUsage.Dynamic, false);
        this._vertexBuffer.vertexDeclaration = LensFlareElementGeomtry.vertexDeclaration;
        this._vertexBuffer.setData(LensFlareElementGeomtry.lensQuadVertices.buffer);
        this._instanceVertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(LensFlareElementGeomtry.lensFlareElementMax * 4 * 4, BufferUsage.Dynamic, false);
        this._instanceVertexBuffer.instanceBuffer = true;
        this._instanceVertexBuffer.vertexDeclaration = LensFlareElementGeomtry.instanceVertexDeclaration;
        this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, LensFlareElementGeomtry.lensQuadIndex.length, BufferUsage.Static, false);
        this._indexBuffer.setData(LensFlareElementGeomtry.lensQuadIndex);
        this.bufferState = new BufferState();
        this.bufferState.applyState([this._vertexBuffer, this._instanceVertexBuffer], this._indexBuffer);
    }
    get instanceBuffer() {
        return this._instanceVertexBuffer;
    }
    _getType() {
        return LensFlareElementGeomtry._type;
    }
    _prepareRender(state) {
        return true;
    }
    destroy() {
        super.destroy();
        this._vertexBuffer.destroy();
        this._instanceVertexBuffer.destroy();
        this.bufferState.destroy();
        this._indexBuffer.destroy();
    }
    _updateRenderParams(state) {
        this.clearRenderParams();
        this.setDrawElemenParams(LensFlareElementGeomtry.lensQuadIndex.length, 0);
    }
}
LensFlareElementGeomtry.PositionUV = 0;
LensFlareElementGeomtry.PositionRotationScale = 1;
LensFlareElementGeomtry.lensFlareElementMax = 20;
LensFlareElementGeomtry._type = GeometryElement._typeCounter++;

//# sourceMappingURL=LensFlareGeometry.js.map
