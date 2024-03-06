import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { MeshSprite3DShaderDeclaration } from "../../core/MeshSprite3DShaderDeclaration";
export class MeshUtil {
    static getMeshDefine(mesh, out) {
        out.length = 0;
        let vertexElements = mesh._vertexBuffer.vertexDeclaration._vertexElements;
        for (const element of vertexElements) {
            switch (element.elementUsage) {
                case VertexMesh.MESH_COLOR0:
                    out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_COLOR);
                    break;
                case VertexMesh.MESH_TEXTURECOORDINATE0:
                    out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV0);
                    break;
                case VertexMesh.MESH_TEXTURECOORDINATE1:
                    out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1);
                    break;
                case VertexMesh.MESH_TANGENT0:
                    out.push(MeshSprite3DShaderDeclaration.SHADERDEFINE_TANGENT);
                    break;
            }
        }
    }
}

//# sourceMappingURL=MeshUtil.js.map
