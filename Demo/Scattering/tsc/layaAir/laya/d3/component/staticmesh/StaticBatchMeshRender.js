import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { MeshFilter } from "../../core/MeshFilter";
import { MeshSprite3DShaderDeclaration } from "../../core/MeshSprite3DShaderDeclaration";
import { BaseRender, RenderBitFlag } from "../../core/render/BaseRender";
import { Sprite3D } from "../../core/Sprite3D";
import { StaticBatchMesh } from "./StaticBatchMesh";
import { StaticBatchMeshRenderElement } from "./StaticBatchMeshRenderElement";
export class StaticBatchMeshRender extends BaseRender {
    constructor() {
        super();
        this._singleton = false;
    }
    static create(info) {
        let render = new StaticBatchMeshRender();
        render.mergeInfo = info;
        return render;
    }
    get staticMesh() {
        return this._staticMesh;
    }
    get mergeInfo() {
        return this._mergeInfo;
    }
    set mergeInfo(value) {
        this._mergeInfo = value;
        let staticMesh = StaticBatchMesh.create(value);
        this._staticMesh = staticMesh;
        this.lightmapIndex = value.lightmapIndex;
        this._staticMesh = staticMesh;
        this.geometryBounds = staticMesh.bounds;
        let meshDefines = MeshFilter._meshVerticeDefine;
        let defineDatas = this._shaderValues;
        this._getMeshDefine(staticMesh, meshDefines);
        for (const meshDef of meshDefines) {
            defineDatas.addDefine(meshDef);
        }
        this._renderElements.forEach(element => {
            element.material._removeReference();
            element.destroy();
        });
        this._renderElements = [];
        staticMesh._staticSubMeshes.forEach((subMesh, material) => {
            let element = new StaticBatchMeshRenderElement();
            this._renderElements.push(element);
            element.render = this;
            element.material = material;
            element.setGeometry(subMesh);
            material._addReference();
        });
        staticMesh.bounds.cloneTo(this.bounds);
    }
    _calculateBoundingBox() {
    }
    _renderUpdate(context, transform) {
        this._applyLightMapParams();
        this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, Matrix4x4.DEFAULT);
        this._worldParams.x = 1.0;
        this._setShaderValue(Sprite3D.WORLDINVERTFRONT, ShaderDataType.Vector4, this._worldParams);
    }
    _getMeshDefine(mesh, out) {
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
    _needRender(boundFrustum, context) {
        if (boundFrustum) {
            if (boundFrustum.intersects(this.bounds)) {
                let needRender = false;
                this.staticMesh._staticSubMeshes.forEach(subMesh => {
                    for (const info of subMesh.subInfos) {
                        info.needRender = boundFrustum.intersects(info.meshBounds);
                        needRender = needRender || info.needRender;
                    }
                });
                return needRender;
            }
            return false;
        }
        else {
            return true;
        }
    }
    onEnable() {
        super.onEnable();
        this.mergeInfo.renders.forEach(render => {
            render.setRenderbitFlag(RenderBitFlag.RenderBitFlag_Batch, true);
        });
    }
    onDisable() {
        super.onDisable();
        this.mergeInfo.renders.forEach(render => {
            render.setRenderbitFlag(RenderBitFlag.RenderBitFlag_Batch, false);
        });
    }
    onDestroy() {
        super.onDestroy();
        this._renderElements.forEach(element => {
            element.material._removeReference();
            element.destroy();
        });
        this._renderElements = null;
        this._staticMesh.destroy();
        this._staticMesh = null;
    }
    _cloneTo(dest) {
        dest.mergeInfo = this.mergeInfo;
    }
}

//# sourceMappingURL=StaticBatchMeshRender.js.map
