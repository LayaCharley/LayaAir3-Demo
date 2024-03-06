import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
import { VertexElement } from "../../../renders/VertexElement";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
export class VertexPositionTexture0 {
    constructor(position, textureCoordinate0) {
        this._position = position;
        this._textureCoordinate0 = textureCoordinate0;
    }
    static get vertexDeclaration() {
        return VertexPositionTexture0._vertexDeclaration;
    }
    static __init__() {
        VertexPositionTexture0._vertexDeclaration = new VertexDeclaration(20, [new VertexElement(0, VertexElementFormat.Vector3, VertexMesh.MESH_POSITION0),
            new VertexElement(12, VertexElementFormat.Vector2, VertexMesh.MESH_TEXTURECOORDINATE0)]);
    }
    get position() {
        return this._position;
    }
    get textureCoordinate0() {
        return this._textureCoordinate0;
    }
    get vertexDeclaration() {
        return VertexPositionTexture0._vertexDeclaration;
    }
}

//# sourceMappingURL=VertexPositionTexture0.js.map
