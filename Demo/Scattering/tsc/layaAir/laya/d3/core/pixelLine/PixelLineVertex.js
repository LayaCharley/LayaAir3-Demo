import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { VertexElement } from "../../../renders/VertexElement";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
export class PixelLineVertex {
    constructor() {
    }
    static get vertexDeclaration() {
        return PixelLineVertex._vertexDeclaration;
    }
    static __init__() {
        PixelLineVertex._vertexDeclaration = new VertexDeclaration(28, [new VertexElement(0, VertexElementFormat.Vector3, VertexMesh.MESH_POSITION0),
            new VertexElement(12, VertexElementFormat.Vector4, VertexMesh.MESH_COLOR0)]);
    }
    get vertexDeclaration() {
        return PixelLineVertex._vertexDeclaration;
    }
}

//# sourceMappingURL=PixelLineVertex.js.map
