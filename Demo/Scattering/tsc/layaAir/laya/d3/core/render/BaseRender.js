import { RenderableSprite3D } from "../RenderableSprite3D";
import { Event } from "../../../events/Event";
import { Lightmap } from "../scene/Lightmap";
import { MeshSprite3DShaderDeclaration } from "../../../d3/core/MeshSprite3DShaderDeclaration";
import { TextureCube } from "../../../resource/TextureCube";
import { Component } from "../../../components/Component";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { LayaGL } from "../../../layagl/LayaGL";
import { Stat } from "../../../utils/Stat";
import { Bounds } from "../../math/Bounds";
import { ReflectionProbeMode } from "../../component/Volume/reflectionProbe/ReflectionProbe";
import { NodeFlags } from "../../../Const";
import { Sprite3DRenderDeclaration } from "./Sprite3DRenderDeclaration";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
export var RenderBitFlag;
(function (RenderBitFlag) {
    RenderBitFlag[RenderBitFlag["RenderBitFlag_CullFlag"] = 0] = "RenderBitFlag_CullFlag";
    RenderBitFlag[RenderBitFlag["RenderBitFlag_Batch"] = 1] = "RenderBitFlag_Batch";
    RenderBitFlag[RenderBitFlag["RenderBitFlag_Editor"] = 2] = "RenderBitFlag_Editor";
    RenderBitFlag[RenderBitFlag["RenderBitFlag_InstanceBatch"] = 3] = "RenderBitFlag_InstanceBatch";
    RenderBitFlag[RenderBitFlag["RenderBitFlag_VertexMergeBatch"] = 4] = "RenderBitFlag_VertexMergeBatch";
})(RenderBitFlag || (RenderBitFlag = {}));
export class BaseRender extends Component {
    constructor() {
        super();
        this._lightmapScaleOffset = new Vector4(1, 1, 0, 0);
        this._commonUniformMap = [];
        this._sharedMaterials = [];
        this._supportOctree = true;
        this._sceneUpdateMark = -1;
        this._updateMark = -1;
        this._probeReflectionUpdateMark = -1;
        this._surportReflectionProbe = false;
        this._reflectionMode = ReflectionProbeMode.simple;
        this._updateRenderType = -1;
        this._motionIndexList = -1;
        this._ratioIgnor = 0.005;
        this._LOD = -1;
        this._commonUniformMap = this._getcommonUniformMap();
        this._rendernode = this._createBaseRenderNode();
        this._rendernode.owner = this;
        this._rendernode.renderId = ++BaseRender._uniqueIDCounter;
        this._bounds = this._rendernode.bounds = new Bounds(Vector3.ZERO, Vector3.ZERO);
        this._renderElements = [];
        this._enabled = true;
        this._materialsInstance = [];
        this._shaderValues = LayaGL.renderOBJCreate.createShaderData(null);
        this.lightmapIndex = -1;
        this.receiveShadow = false;
        this.sortingFudge = 0.0;
        this._customCull = this._needRender !== BaseRender.prototype._needRender;
        this.runInEditor = true;
        this.boundsChange = true;
        this._rendernode.renderbitFlag = 0;
        this._rendernode.staticMask = 1;
        this._worldParams = new Vector4(1.0, 0.0, 0.0, 0.0);
    }
    static __init__() {
        BaseRender.shaderValueInit();
    }
    static getMeshDefine(mesh, out) {
        out.length = 0;
        var define;
        for (var i = 0, n = mesh._subMeshes.length; i < n; i++) {
            var subMesh = mesh.getSubMesh(i);
            var vertexElements = subMesh._vertexBuffer._vertexDeclaration._vertexElements;
            for (var j = 0, m = vertexElements.length; j < m; j++) {
                var vertexElement = vertexElements[j];
                var name = vertexElement._elementUsage;
                switch (name) {
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
        return define;
    }
    static changeVertexDefine(oldMesh, mesh, defineDatas) {
        var lastValue = oldMesh;
        if (lastValue) {
            BaseRender.getMeshDefine(lastValue, BaseRender._meshVerticeDefine);
            for (var i = 0, n = BaseRender._meshVerticeDefine.length; i < n; i++)
                defineDatas.removeDefine(BaseRender._meshVerticeDefine[i]);
        }
        if (mesh) {
            BaseRender.getMeshDefine(mesh, BaseRender._meshVerticeDefine);
            for (var i = 0, n = BaseRender._meshVerticeDefine.length; i < n; i++)
                defineDatas.addDefine(BaseRender._meshVerticeDefine[i]);
        }
    }
    static shaderValueInit() {
        Sprite3DRenderDeclaration.SHADERDEFINE_GI_LEGACYIBL = Shader3D.getDefineByName("GI_LEGACYIBL");
        Sprite3DRenderDeclaration.SHADERDEFINE_GI_IBL = Shader3D.getDefineByName("GI_IBL");
        Sprite3DRenderDeclaration.SHADERDEFINE_IBL_RGBD = Shader3D.getDefineByName("IBL_RGBD");
        Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION = Shader3D.getDefineByName("SPECCUBE_BOX_PROJECTION");
        Sprite3DRenderDeclaration.SHADERDEFINE_VOLUMETRICGI = Shader3D.getDefineByName("VOLUMETRICGI");
    }
    set ratioIgnor(value) {
        this._ratioIgnor = value;
    }
    get ratioIgnor() {
        return this._ratioIgnor;
    }
    get renderbitFlag() {
        return this._rendernode.renderbitFlag;
    }
    set boundsChange(value) {
        this._rendernode.boundsChange = value;
    }
    get boundsChange() {
        return this._rendernode.boundsChange;
    }
    shadowCullPass() {
        return this.castShadow && this._enabled && (this.renderbitFlag == 0);
    }
    get renderNode() {
        return this._rendernode;
    }
    set distanceForSort(value) {
        this._distanceForSort = value;
        this._rendernode.distanceForSort = value;
    }
    get distanceForSort() {
        return this._distanceForSort;
    }
    set geometryBounds(value) {
        this._baseGeometryBounds = this._rendernode.geometryBounds = value;
    }
    get geometryBounds() {
        return this._baseGeometryBounds;
    }
    get id() {
        return this._rendernode.renderId;
    }
    get lightmapIndex() {
        return this._lightmapIndex;
    }
    set lightmapIndex(value) {
        if (value != -1) {
            this._scene && this._scene.on(Lightmap.ApplyLightmapEvent, this, this._applyLightMapParams);
        }
        else {
            this._scene && this._scene.off(Lightmap.ApplyLightmapEvent, this, this._applyLightMapParams);
        }
        this._lightmapIndex = value;
        this._scene && this._applyLightMapParams();
    }
    get lightmapScaleOffset() {
        return this._lightmapScaleOffset;
    }
    set lightmapScaleOffset(value) {
        if (!value)
            throw "BaseRender: lightmapScaleOffset can't be null.";
        this._lightmapScaleOffset = value;
        this._setShaderValue(RenderableSprite3D.LIGHTMAPSCALEOFFSET, ShaderDataType.Vector4, value);
    }
    get material() {
        var material = this._sharedMaterials[0];
        if (material && !this._materialsInstance[0]) {
            var insMat = this._getInstanceMaterial(material, 0);
            var renderElement = this._renderElements[0];
            (renderElement) && (renderElement.material = insMat);
        }
        return this._sharedMaterials[0];
    }
    set material(value) {
        this.sharedMaterial = value;
        this._isSupportReflection();
    }
    get materials() {
        for (var i = 0, n = this._sharedMaterials.length; i < n; i++) {
            if (!this._materialsInstance[i]) {
                var insMat = this._getInstanceMaterial(this._sharedMaterials[i], i);
                var renderElement = this._renderElements[i];
                (renderElement) && (renderElement.material = insMat);
            }
        }
        return this._sharedMaterials.slice();
    }
    set materials(value) {
        this.sharedMaterials = value;
        this._isSupportReflection();
    }
    get sharedMaterial() {
        return this._sharedMaterials[0];
    }
    set sharedMaterial(value) {
        var lastValue = this._sharedMaterials[0];
        if (lastValue !== value) {
            this._sharedMaterials[0] = value;
            this._materialsInstance[0] = false;
            this._changeMaterialReference(lastValue, value);
            var renderElement = this._renderElements[0];
            (renderElement) && (renderElement.material = value);
        }
        this._isSupportReflection();
    }
    get sharedMaterials() {
        return this._sharedMaterials.slice();
    }
    set sharedMaterials(value) {
        var materialsInstance = this._materialsInstance;
        var sharedMats = this._sharedMaterials;
        for (var i = 0, n = sharedMats.length; i < n; i++) {
            var lastMat = sharedMats[i];
            (lastMat) && (lastMat._removeReference());
        }
        if (value) {
            var count = value.length;
            materialsInstance.length = count;
            sharedMats.length = count;
            for (i = 0; i < count; i++) {
                lastMat = sharedMats[i];
                var mat = value[i];
                if (lastMat !== mat) {
                    materialsInstance[i] = false;
                    var renderElement = this._renderElements[i];
                    (renderElement) && (renderElement.material = mat);
                }
                if (mat) {
                    mat._addReference();
                }
                sharedMats[i] = mat;
            }
        }
        else {
            throw new Error("BaseRender: shadredMaterials value can't be null.");
        }
        this._isSupportReflection();
    }
    get bounds() {
        if (this.boundsChange) {
            this._calculateBoundingBox();
            this.boundsChange = false;
        }
        return this._bounds;
    }
    set receiveShadow(value) {
        if (this.renderNode.receiveShadow !== value) {
            this.renderNode.receiveShadow = value;
            this._receiveShadow = value;
            if (value)
                this._shaderValues.addDefine(RenderableSprite3D.SHADERDEFINE_RECEIVE_SHADOW);
            else
                this._shaderValues.removeDefine(RenderableSprite3D.SHADERDEFINE_RECEIVE_SHADOW);
        }
    }
    get receiveShadow() {
        return this.renderNode.receiveShadow;
    }
    get castShadow() {
        return this.renderNode.castShadow;
    }
    set castShadow(value) {
        this.renderNode.castShadow = value;
    }
    set reflectionMode(value) {
        this._reflectionMode = value;
    }
    get reflectionMode() {
        return this._reflectionMode;
    }
    set volume(value) {
        if (!value) {
            if (this._volume) {
                this._volume._removeRenderNode && this._volume._removeRenderNode(this);
                this._volume = null;
            }
            return;
        }
        if (this._volume != value) {
            value._addRenderNode && value._addRenderNode(this);
            this._volume = value;
            return;
        }
        else {
            value._motionInVolume && value._motionInVolume(this);
        }
    }
    get volume() {
        return this._volume;
    }
    set probReflection(voluemProbe) {
        if (this._probReflection == voluemProbe)
            return;
        this._probeReflectionUpdateMark = -1;
        this._probReflection = voluemProbe;
        if (this._reflectionMode == ReflectionProbeMode.off) {
            this._shaderValues.removeDefine(Sprite3DRenderDeclaration.SHADERDEFINE_SPECCUBE_BOX_PROJECTION);
            this._shaderValues.addDefine(Sprite3DRenderDeclaration.SHADERDEFINE_GI_IBL);
            this._setShaderValue(RenderableSprite3D.IBLTEX, ShaderDataType.TextureCube, TextureCube.blackTexture);
            this._setShaderValue(RenderableSprite3D.IBLROUGHNESSLEVEL, ShaderDataType.Float, 0);
        }
        else {
            this._probReflection.applyReflectionShaderData(this._shaderValues);
        }
    }
    _getcommonUniformMap() {
        return ["Sprite3D"];
    }
    _createBaseRenderNode() {
        return LayaGL.renderOBJCreate.createBaseRenderNode();
    }
    _changeLayer(layer) {
        this._rendernode.layer = layer;
    }
    _changeStaticMask(staticmask) {
        this._rendernode.staticMask = staticmask;
    }
    _onAdded() {
        this._transform = this.owner.transform;
        this.owner._isRenderNode++;
        this.setRenderbitFlag(RenderBitFlag.RenderBitFlag_Editor, this.owner._getBit(NodeFlags.HIDE_BY_EDITOR));
        this._rendernode.transform = this._transform;
        this._changeLayer(this.owner.layer);
        this._changeStaticMask(this.owner._isStatic);
    }
    _onEnable() {
        super._onEnable();
        if (this.owner) {
            this.owner.transform.on(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            this.owner.on(Event.LAYERCHANGE, this, this._changeLayer);
            this.owner.on(Event.staticMask, this, this._changeStaticMask);
            this._changeLayer(this.owner.layer);
            this._changeStaticMask(this.owner._isStatic);
        }
        this.owner.scene._addRenderObject(this);
        this._setBelongScene(this.owner.scene);
    }
    _onDisable() {
        if (this.owner) {
            this.owner.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            this.owner.off(Event.LAYERCHANGE, this, this._changeLayer);
            this.owner.off(Event.staticMask, this, this._changeStaticMask);
        }
        this.owner.scene._removeRenderObject(this);
        this._setUnBelongScene();
        this.volume = null;
    }
    _changeMaterialReference(lastValue, value) {
        (lastValue) && (lastValue._removeReference());
        value._addReference();
    }
    _getInstanceMaterial(material, index) {
        var insMat = material.clone();
        insMat.name = insMat.name + "(Instance)";
        this._materialsInstance[index] = true;
        this._changeMaterialReference(this._sharedMaterials[index], insMat);
        this._sharedMaterials[index] = insMat;
        return insMat;
    }
    _isSupportReflection() {
        let pre = this._surportReflectionProbe;
        this._surportReflectionProbe = false;
        var sharedMats = this._sharedMaterials;
        for (var i = 0, n = sharedMats.length; i < n; i++) {
            var mat = sharedMats[i];
            this._surportReflectionProbe || (this._surportReflectionProbe = this._surportReflectionProbe || (mat && mat._shader._supportReflectionProbe));
        }
        if (!pre && this._surportReflectionProbe)
            this._addReflectionProbeUpdate();
    }
    _onWorldMatNeedChange(flag) {
        this.boundsChange = true;
        this._addReflectionProbeUpdate();
        this._subUniformBufferData && (this._subUniformBufferData._needUpdate = true);
        this._batchRender && this._batchRender._updateOneRender(this);
    }
    _calculateBoundingBox() {
        throw ("BaseRender: must override it.");
    }
    setRenderbitFlag(flag, pass) {
        if (pass)
            this._rendernode.renderbitFlag |= (1 << flag);
        else
            this._rendernode.renderbitFlag &= ~(1 << flag);
    }
    _setShaderValue(index, shaderdataType, value) {
        this._shaderValues.setShaderData(index, shaderdataType, value);
    }
    _addReflectionProbeUpdate() {
        this._scene && this._scene._volumeManager.addMotionObject(this);
    }
    _applyLightMapParams() {
        if (!this._scene)
            return;
        var lightMaps = this._scene.lightmaps;
        var shaderValues = this._shaderValues;
        var lightmapIndex = this._lightmapIndex;
        if (lightmapIndex >= 0 && lightmapIndex < lightMaps.length) {
            var lightMap = lightMaps[lightmapIndex];
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
    _applyReflection() {
        if (!this._probReflection)
            return;
        if (this._probReflection._updateMark != this._probeReflectionUpdateMark) {
            this._probeReflectionUpdateMark = this._probReflection._updateMark;
            this._probReflection.applyReflectionShaderData(this._shaderValues);
        }
    }
    _setBelongScene(scene) {
        this._scene = scene;
        this._onWorldMatNeedChange(1);
        this._isSupportReflection();
        this._batchRender && this._batchRender._batchOneRender(this);
        this.lightmapIndex = this.lightmapIndex;
        Stat.renderNode++;
        if (false) {
            this._subUniformBufferData = BaseRender._transLargeUbO.create();
            this._subUniformBufferData.setMatrix("u_WorldMat", Matrix4x4.DEFAULT);
            this._addReflectionProbeUpdate();
            this.probReflection = this._probReflection;
            this.lightmapScaleOffset = this._lightmapScaleOffset;
            this._subUniformBufferData._needUpdate = true;
        }
    }
    _setUnBelongScene() {
        Stat.renderNode--;
        this._scene._volumeManager.removeMotionObject(this);
        let batch = this._batchRender;
        this._batchRender && this._batchRender._removeOneRender(this);
        this._batchRender = batch;
        if (false) {
            this._subUniformBufferData && BaseRender._transLargeUbO.recover(this._subUniformBufferData);
            this._subUniformBufferData = null;
        }
        this._scene = null;
    }
    _needRender(boundFrustum, context) {
        if (boundFrustum)
            return boundFrustum.intersects(this.bounds);
        else
            return true;
    }
    _CullOut() {
    }
    _renderUpdate(context, transform) {
    }
    _renderUpdateWithCamera(context, transform) {
    }
    _onDestroy() {
        if (this.owner)
            this.owner._isRenderNode--;
        (this._motionIndexList !== -1) && (this._scene._sceneRenderManager.removeMotionObject(this));
        (this._scene) && this._scene.sceneRenderableManager.removeRenderObject(this);
        var i = 0, n = 0;
        for (i = 0, n = this._renderElements.length; i < n; i++)
            this._renderElements[i].destroy();
        for (i = 0, n = this._sharedMaterials.length; i < n; i++) {
            let m = this._sharedMaterials[i];
            m && !m.destroyed && m._removeReference();
        }
        this._renderElements = null;
        this._sharedMaterials = null;
        this._bounds = null;
        this._lightmapScaleOffset = null;
        this._lightmapIndex = -1;
        this._scene = null;
        this._rendernode = null;
        this._shaderValues.destroy();
        this._shaderValues = null;
        this._transform = null;
        this._batchRender = null;
        if (this._subUniformBufferData) {
            BaseRender._transLargeUbO.recover(this._subUniformBufferData);
            this._subUniformBufferData = null;
        }
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        let render = dest;
        render.receiveShadow = this.receiveShadow;
        render.sharedMaterials = this.sharedMaterials;
        render.reflectionMode = this.reflectionMode;
        render.castShadow = this.castShadow;
        render.sortingFudge = this.sortingFudge;
    }
}
BaseRender._meshVerticeDefine = [];
BaseRender._uniqueIDCounter = 0;
BaseRender._tempBoundBoxCorners = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
BaseRender._defaultLightmapScaleOffset = new Vector4(1.0, 1.0, 0.0, 0.0);

//# sourceMappingURL=BaseRender.js.map
