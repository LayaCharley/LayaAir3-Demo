import { LayaGL } from "../../../layagl/LayaGL";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { VertexElement } from "../../../renders/VertexElement";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
import { BufferState } from "../../../webgl/utils/BufferState";
import { GeometryElement } from "../GeometryElement";
export class ScreenQuad extends GeometryElement {
    constructor() {
        super(MeshTopology.TriangleStrip, DrawType.DrawArray);
        this._bufferState = new BufferState();
        this._bufferStateInvertUV = new BufferState();
        this.setDrawArrayParams(0, 4);
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(16 * 4, BufferUsage.Static, false);
        this._vertexBuffer.vertexDeclaration = ScreenQuad._vertexDeclaration;
        this._vertexBuffer.setData(ScreenQuad._vertices.buffer);
        this._bufferState.applyState([this._vertexBuffer], null);
        this._vertexBufferInvertUV = LayaGL.renderOBJCreate.createVertexBuffer3D(16 * 4, BufferUsage.Static, false);
        this._vertexBufferInvertUV.vertexDeclaration = ScreenQuad._vertexDeclaration;
        this._vertexBufferInvertUV.setData(ScreenQuad._verticesInvertUV.buffer);
        this._bufferStateInvertUV.applyState([this._vertexBufferInvertUV], null);
    }
    static __init__() {
        ScreenQuad._vertexDeclaration = new VertexDeclaration(16, [new VertexElement(0, VertexElementFormat.Vector4, ScreenQuad.SCREENQUAD_POSITION_UV)]);
        ScreenQuad.instance = new ScreenQuad();
    }
    set invertY(value) {
        this.bufferState = value ? this._bufferStateInvertUV : this._bufferState;
    }
    _updateRenderParams(state) {
    }
    destroy() {
        super.destroy();
        this._bufferState.destroy();
        this._vertexBuffer.destroy();
        this._bufferStateInvertUV.destroy();
        this._vertexBufferInvertUV.destroy();
    }
}
ScreenQuad.SCREENQUAD_POSITION_UV = 0;
ScreenQuad._vertices = new Float32Array([
    1, 1, 1, 1,
    1, -1, 1, 0,
    -1, 1, 0, 1,
    -1, -1, 0, 0
]);
ScreenQuad._verticesInvertUV = new Float32Array([
    1, 1, 1, 0,
    1, -1, 1, 1,
    -1, 1, 0, 0,
    -1, -1, 0, 1
]);

//# sourceMappingURL=ScreenQuad.js.map
