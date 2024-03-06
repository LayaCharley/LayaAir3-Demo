import { LayaGL } from "../../../layagl/LayaGL";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { BufferState } from "../../../webgl/utils/BufferState";
import { GeometryElement } from "../../core/GeometryElement";
export class SkyBox extends GeometryElement {
    constructor() {
        super(MeshTopology.Triangles, DrawType.DrawElement);
        var halfHeight = 1.0;
        var halfWidth = 1.0;
        var halfDepth = 1.0;
        var vertices = new Float32Array([-halfDepth, halfHeight, -halfWidth, halfDepth, halfHeight, -halfWidth, halfDepth, halfHeight, halfWidth, -halfDepth, halfHeight, halfWidth,
            -halfDepth, -halfHeight, -halfWidth, halfDepth, -halfHeight, -halfWidth, halfDepth, -halfHeight, halfWidth, -halfDepth, -halfHeight, halfWidth]);
        var indices = new Uint8Array([
            0, 2, 1, 2, 0, 3,
            4, 6, 7, 6, 4, 5,
            0, 7, 3, 7, 0, 4,
            1, 6, 5, 6, 1, 2,
            3, 6, 2, 6, 3, 7,
            0, 5, 4, 5, 0, 1
        ]);
        var verDec = VertexMesh.getVertexDeclaration("POSITION");
        let vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(verDec.vertexStride * 8, BufferUsage.Static, false);
        vertexBuffer.vertexDeclaration = verDec;
        let indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt8, 36, BufferUsage.Static, false);
        vertexBuffer.setData(vertices);
        indexBuffer.setData(indices);
        this.bufferState = new BufferState();
        this.bufferState.applyState([vertexBuffer], indexBuffer);
        this._geometryElementOBj.setDrawElemenParams(36, 0);
        this.indexFormat = IndexFormat.UInt8;
    }
    static __init__() {
        SkyBox.instance = new SkyBox();
    }
    _updateRenderParams(state) {
    }
}

//# sourceMappingURL=SkyBox.js.map
