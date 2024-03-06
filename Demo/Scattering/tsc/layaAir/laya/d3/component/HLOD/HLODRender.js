import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { MeshFilter } from "../../core/MeshFilter";
import { RenderableSprite3D } from "../../core/RenderableSprite3D";
import { Sprite3D } from "../../core/Sprite3D";
import { BaseRender } from "../../core/render/BaseRender";
import { RenderElement } from "../../core/render/RenderElement";
import { Bounds } from "../../math/Bounds";
import { MeshUtil } from "../../resource/models/MeshUtil";
export class HLODRender extends BaseRender {
    constructor() {
        super();
        this._singleton = false;
    }
    get curHLODRS() {
        return this._curHLODRS;
    }
    set curHLODRS(value) {
        if (!this._curHLODRS) {
            this._renderElements = [];
            this._renderElements.push(new RenderElement());
            this._renderElements[0].render = this;
        }
        if (value != this._curHLODRS) {
            this._changeMesh(value.HLODMesh);
            this._curHLODRS = value;
            this._createRenderelementByHLODElement(this._curHLODRS, this._renderElements[0]);
        }
    }
    _createRenderelementByHLODElement(source, out) {
        out.setGeometry(source.HLODMesh);
        out.material = source.material;
    }
    _changeMesh(lodMesh) {
        var defineDatas = this._shaderValues;
        this.boundsChange = true;
        let meshDefines = MeshFilter._meshVerticeDefine;
        if (this.curHLODRS) {
            MeshUtil.getMeshDefine(this.curHLODRS.HLODMesh.batchMesh, meshDefines);
            for (var i = 0, n = meshDefines.length; i < n; i++)
                defineDatas.removeDefine(MeshFilter._meshVerticeDefine[i]);
        }
        if (lodMesh) {
            MeshUtil.getMeshDefine(lodMesh.batchMesh, meshDefines);
            for (var i = 0, n = MeshFilter._meshVerticeDefine.length; i < n; i++)
                defineDatas.addDefine(MeshFilter._meshVerticeDefine[i]);
        }
        this._curSubBatchMeshBounds.length = lodMesh.batchSubMeshInfo.length;
        for (let i = 0, n = lodMesh.batchSubMeshInfo.length; i < n; i++) {
            this._curSubBatchMeshBounds[i] = this._curSubBatchMeshBounds[i] ? this._curSubBatchMeshBounds[i] : new Bounds();
        }
    }
    _applyLightMapParams() {
        if (!this._scene)
            return;
        var shaderValues = this._shaderValues;
        var lightMap = this._curHLODRS.lightmap;
        if (lightMap && lightMap.lightmapColor) {
            shaderValues.setTexture(RenderableSprite3D.LIGHTMAP, lightMap.lightmapColor);
            shaderValues.addDefine(RenderableSprite3D.SAHDERDEFINE_LIGHTMAP);
            if (lightMap.lightmapDirection) {
                shaderValues.setTexture(RenderableSprite3D.LIGHTMAP_DIRECTION, lightMap.lightmapDirection);
                shaderValues.addDefine(RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
            }
            else {
                shaderValues.removeDefine(RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
            }
        }
        else {
            shaderValues.removeDefine(RenderableSprite3D.SAHDERDEFINE_LIGHTMAP);
            shaderValues.removeDefine(RenderableSprite3D.SHADERDEFINE_LIGHTMAP_DIRECTIONAL);
        }
    }
    _calculateBoundingBox() {
        if (this._curHLODRS) {
            var sharedMesh = this._curHLODRS.HLODMesh;
            if (sharedMesh) {
                var worldMat = this._transform.worldMatrix;
                sharedMesh.batchMesh.bounds._tranform(worldMat, this._bounds);
            }
            for (let i = 0, n = this._curSubBatchMeshBounds.length; i < n; i++) {
                sharedMesh.batchSubMeshInfo[i].bounds._tranform(worldMat, this._curSubBatchMeshBounds[i]);
            }
        }
    }
    _renderUpdate(context, transform) {
        this._applyLightMapParams();
        this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, this._transform.worldMatrix);
    }
    _needRender(boundFrustum, context) {
        if (boundFrustum) {
            if (boundFrustum.intersects(this.bounds)) {
                let hodMesh = this.curHLODRS.HLODMesh.drawSubMeshs;
                let lodbatchMesh = this._curHLODRS.HLODMesh.batchSubMeshInfo;
                hodMesh.length = 0;
                for (let i = 0, n = this._curSubBatchMeshBounds.length; i < n; i++) {
                    if (boundFrustum.intersects(this._curSubBatchMeshBounds[i])) {
                        hodMesh.push(lodbatchMesh[i]);
                    }
                }
                this._curHLODRS.HLODMesh.drawSubMeshs = hodMesh;
                return true;
            }
            else
                return false;
        }
        else {
            return true;
        }
    }
    onEnable() {
        super.onEnable();
    }
    onDisable() {
        super.onDisable();
    }
    onDestroy() {
        super.onDestroy();
        this._renderElements.forEach(element => {
            element.material._removeReference();
            element.destroy();
        });
        this._renderElements = null;
    }
    _cloneTo(dest) {
    }
}

//# sourceMappingURL=HLODRender.js.map
