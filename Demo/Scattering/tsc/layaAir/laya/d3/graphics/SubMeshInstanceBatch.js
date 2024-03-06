import { LayaGL } from "../../layagl/LayaGL";
import { GeometryElement } from "../core/GeometryElement";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { DrawType } from "../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { VertexMesh } from "../../RenderEngine/RenderShader/VertexMesh";
export class SubMeshInstanceBatch extends GeometryElement {
    constructor() {
        super(MeshTopology.Triangles, DrawType.DrawElementInstance);
        this.instanceWorldMatrixData = new Float32Array(SubMeshInstanceBatch.maxInstanceCount * 16);
        this.instanceSimpleAnimatorData = new Float32Array(SubMeshInstanceBatch.maxInstanceCount * 4);
        this.indexFormat = IndexFormat.UInt16;
        this.instanceWorldMatrixBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(this.instanceWorldMatrixData.length * 4, BufferUsage.Dynamic, false);
        this.instanceWorldMatrixBuffer.vertexDeclaration = VertexMesh.instanceWorldMatrixDeclaration;
        this.instanceWorldMatrixBuffer.instanceBuffer = true;
        this.instanceSimpleAnimatorBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(this.instanceSimpleAnimatorData.length * 4, BufferUsage.Dynamic, false);
        this.instanceSimpleAnimatorBuffer.vertexDeclaration = VertexMesh.instanceSimpleAnimatorDeclaration;
        this.instanceSimpleAnimatorBuffer.instanceBuffer = true;
    }
    static __init__() {
        SubMeshInstanceBatch.instance = new SubMeshInstanceBatch();
    }
    _updateRenderParams(state) {
        var element = state.renderElement;
        var subMesh = element.instanceSubMesh;
        var count = element.instanceBatchElementList.length;
        var indexCount = subMesh._indexCount;
        this.clearRenderParams();
        this.bufferState = subMesh._mesh._instanceBufferState;
        this.instanceCount = count;
        this.setDrawElemenParams(indexCount, subMesh._indexStart * 2);
    }
}
SubMeshInstanceBatch.maxInstanceCount = 1024;

//# sourceMappingURL=SubMeshInstanceBatch.js.map
