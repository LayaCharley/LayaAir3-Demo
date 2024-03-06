import { VertexPositionTexture0 } from "../../graphics/Vertex/VertexPositionTexture0";
import { LayaGL } from "../../../layagl/LayaGL";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { GeometryElement } from "../../core/GeometryElement";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { BufferState } from "../../../webgl/utils/BufferState";
export class SkyDome extends GeometryElement {
    constructor(stacks = 48, slices = 48) {
        super(MeshTopology.Triangles, DrawType.DrawElement);
        this._stacks = stacks;
        this._slices = slices;
        var vertexDeclaration = VertexPositionTexture0.vertexDeclaration;
        var vertexFloatCount = vertexDeclaration.vertexStride / 4;
        var numberVertices = (this._stacks + 1) * (this._slices + 1);
        var numberIndices = (3 * this._stacks * (this._slices + 1)) * 2;
        var vertices = new Float32Array(numberVertices * vertexFloatCount);
        var indices = new Uint16Array(numberIndices);
        var stackAngle = Math.PI / this._stacks;
        var sliceAngle = (Math.PI * 2.0) / this._slices;
        var vertexIndex = 0;
        var vertexCount = 0;
        var indexCount = 0;
        for (var stack = 0; stack < (this._stacks + 1); stack++) {
            var r = Math.sin(stack * stackAngle);
            var y = Math.cos(stack * stackAngle);
            for (var slice = 0; slice < (this._slices + 1); slice++) {
                var x = r * Math.sin(slice * sliceAngle);
                var z = r * Math.cos(slice * sliceAngle);
                vertices[vertexCount + 0] = x * SkyDome._radius;
                vertices[vertexCount + 1] = y * SkyDome._radius;
                vertices[vertexCount + 2] = z * SkyDome._radius;
                vertices[vertexCount + 3] = -(slice / this._slices) + 0.75;
                vertices[vertexCount + 4] = stack / this._stacks;
                vertexCount += vertexFloatCount;
                if (stack != (this._stacks - 1)) {
                    indices[indexCount++] = vertexIndex + 1;
                    indices[indexCount++] = vertexIndex;
                    indices[indexCount++] = vertexIndex + (this._slices + 1);
                    indices[indexCount++] = vertexIndex + (this._slices + 1);
                    indices[indexCount++] = vertexIndex;
                    indices[indexCount++] = vertexIndex + (this._slices);
                    vertexIndex++;
                }
            }
        }
        let vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vertices.length * 4, BufferUsage.Static, false);
        vertexBuffer.vertexDeclaration = vertexDeclaration;
        let indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, indices.length, BufferUsage.Static, false);
        vertexBuffer.setData(vertices.buffer);
        indexBuffer.setData(indices);
        var bufferState = new BufferState();
        bufferState.applyState([vertexBuffer], indexBuffer);
        this.bufferState = bufferState;
        this.indexFormat = IndexFormat.UInt16;
        this._geometryElementOBj.setDrawElemenParams(indexBuffer.indexCount, 0);
    }
    static __init__() {
        SkyDome.instance = new SkyDome();
    }
    get stacks() {
        return this._stacks;
    }
    get slices() {
        return this._slices;
    }
    _updateRenderParams(state) {
    }
}
SkyDome._radius = 1;

//# sourceMappingURL=SkyDome.js.map
