import { Config3D } from "../../../Config3D";
import { LayaGL } from "../../layagl/LayaGL";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { RenderCapable } from "../../RenderEngine/RenderEnum/RenderCapable";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { VertexMesh } from "../../RenderEngine/RenderShader/VertexMesh";
import { BlinnPhongMaterial } from "./material/BlinnPhongMaterial";
import { MeshFilter } from "./MeshFilter";
import { MeshSprite3DShaderDeclaration } from "./MeshSprite3DShaderDeclaration";
import { BaseRender } from "./render/BaseRender";
import { RenderElement } from "./render/RenderElement";
import { SubMeshRenderElement } from "./render/SubMeshRenderElement";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { Sprite3D } from "./Sprite3D";
import { MeshUtil } from "../resource/models/MeshUtil";
export class MeshRenderer extends BaseRender {
    constructor() {
        super();
        this._revertStaticBatchDefineUV1 = false;
        this.morphTargetActiveCount = 0;
        this._morphWeightChange = true;
        this._morphTargetValues = {};
        this._projectionViewWorldMatrix = new Matrix4x4();
    }
    static __init__() {
        MeshSprite3DShaderDeclaration.SHADERDEFINE_UV0 = Shader3D.getDefineByName("UV");
        MeshSprite3DShaderDeclaration.SHADERDEFINE_COLOR = Shader3D.getDefineByName("COLOR");
        MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1 = Shader3D.getDefineByName("UV1");
        MeshSprite3DShaderDeclaration.SHADERDEFINE_TANGENT = Shader3D.getDefineByName("TANGENT");
        MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE = Shader3D.getDefineByName("GPU_INSTANCE");
    }
    _createRenderElement() {
        return new SubMeshRenderElement();
    }
    getMesh() {
        return this._mesh;
    }
    _onEnable() {
        super._onEnable();
        const filter = this.owner.getComponent(MeshFilter);
        if (filter)
            filter._enabled && this._onMeshChange(filter.sharedMesh);
    }
    _getMeshDefine(mesh, out) {
        let define;
        out.length = 0;
        MeshUtil.getMeshDefine(mesh, out);
        return define;
    }
    _changeVertexDefine(mesh) {
        var defineDatas = this._shaderValues;
        var lastValue = this._mesh;
        if (lastValue) {
            this._getMeshDefine(lastValue, MeshFilter._meshVerticeDefine);
            for (var i = 0, n = MeshFilter._meshVerticeDefine.length; i < n; i++)
                defineDatas.removeDefine(MeshFilter._meshVerticeDefine[i]);
        }
        if (mesh) {
            this._getMeshDefine(mesh, MeshFilter._meshVerticeDefine);
            for (var i = 0, n = MeshFilter._meshVerticeDefine.length; i < n; i++)
                defineDatas.addDefine(MeshFilter._meshVerticeDefine[i]);
        }
    }
    get morphTargetValues() {
        return this._morphTargetValues;
    }
    set morphTargetValues(value) {
        this._morphTargetValues = value;
    }
    _changeMorphTargetValue(key) {
        this._morphWeightChange = true;
    }
    setMorphChannelWeight(channelName, weight) {
        let mesh = this._mesh;
        if (mesh && mesh.morphTargetData) {
            let morphData = mesh.morphTargetData;
            let channel = morphData.getMorphChannel(channelName);
            this.morphTargetValues[channel.name] = weight;
            this._morphWeightChange = true;
        }
    }
    _applyMorphdata() {
        let mesh = this._mesh;
        if (this._morphWeightChange && mesh) {
            let morphData = mesh.morphTargetData;
            let channelCount = morphData.channelCount;
            for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
                let channel = morphData.getMorphChannelbyIndex(channelIndex);
                let weight = this.morphTargetValues[channel.name];
                let lastFullWeight = 0;
                channel.targets.forEach(target => {
                    if (weight <= target.fullWeight) {
                        this.morphTargetWeight[target._index] = (weight - lastFullWeight) / (target.fullWeight - lastFullWeight);
                    }
                    else {
                        this.morphTargetWeight[target._index] = 1;
                    }
                    lastFullWeight = target.fullWeight;
                });
            }
            let activeIndex = 0;
            this.morphTargetWeight.forEach((weight, index) => {
                if (weight > 0) {
                    this.morphTargetActiveIndex[activeIndex] = index;
                    this.morphTargetActiveWeight[activeIndex] = weight;
                    activeIndex++;
                }
            });
            this.morphTargetActiveCount = Math.min(activeIndex, Config3D.maxMorphTargetCount);
            if (LayaGL.renderEngine.getCapable(RenderCapable.Texture3D)) {
                this._shaderValues.setInt(RenderableSprite3D.MorphActiveCount, this.morphTargetActiveCount);
                this._shaderValues.setBuffer(RenderableSprite3D.MorphActiceTargets, this.morphTargetActiveIndex);
                this._shaderValues.setBuffer(RenderableSprite3D.MorphActiveWeights, this.morphTargetActiveWeight);
            }
            else {
            }
            this._morphWeightChange = false;
        }
    }
    _changeMorphData(mesh) {
        let shaderData = this._shaderValues;
        let oldMesh = this._mesh;
        const maxMorphTargetCount = Config3D.maxMorphTargetCount;
        let maxCount = maxMorphTargetCount;
        this.morphTargetActiveIndex = new Float32Array(maxCount);
        this.morphTargetActiveWeight = new Float32Array(maxCount);
        if (LayaGL.renderEngine.getCapable(RenderCapable.Texture3D)) {
            if (oldMesh && oldMesh.morphTargetData) {
                let morphData = oldMesh.morphTargetData;
                shaderData.removeDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET);
                let morphVertexDec = morphData.vertexDec;
                morphVertexDec._vertexElements.forEach(element => {
                    switch (element.elementUsage) {
                        case VertexMesh.MESH_POSITION0:
                            shaderData.removeDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_POSITION);
                            break;
                        case VertexMesh.MESH_NORMAL0:
                            shaderData.removeDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_NORMAL);
                            break;
                        case VertexMesh.MESH_TANGENT0:
                            shaderData.removeDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_TANGENT);
                            break;
                        default:
                            break;
                    }
                });
            }
            if (mesh && mesh.morphTargetData) {
                let morphData = mesh.morphTargetData;
                shaderData.addDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET);
                let morphVertexDec = morphData.vertexDec;
                morphVertexDec._vertexElements.forEach(element => {
                    switch (element.elementUsage) {
                        case VertexMesh.MESH_POSITION0:
                            shaderData.addDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_POSITION);
                            break;
                        case VertexMesh.MESH_NORMAL0:
                            shaderData.addDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_NORMAL);
                            break;
                        case VertexMesh.MESH_TANGENT0:
                            shaderData.addDefine(RenderableSprite3D.SHADERDEFINE_MORPHTARGET_TANGENT);
                            break;
                        default:
                            break;
                    }
                });
                shaderData.setVector(RenderableSprite3D.MorphAttriOffset, mesh.morphTargetData.attributeOffset);
                shaderData.setTexture(RenderableSprite3D.MorphTex, mesh.morphTargetData.targetTexture);
                shaderData.setVector(RenderableSprite3D.MorphParams, morphData.params);
                shaderData.setBuffer(RenderableSprite3D.MorphActiceTargets, this.morphTargetActiveIndex);
                shaderData.setBuffer(RenderableSprite3D.MorphActiveWeights, this.morphTargetActiveWeight);
            }
        }
        if (oldMesh && oldMesh.morphTargetData) {
            this.morphTargetWeight = null;
            this.morphtargetChannels = null;
            this._morphTargetValues = {};
        }
        if (mesh && mesh.morphTargetData) {
            let morphData = mesh.morphTargetData;
            let channelCount = morphData.channelCount;
            this.morphTargetWeight = new Float32Array(morphData.targetCount);
            this.morphtargetChannels = new Array(channelCount);
            for (let index = 0; index < channelCount; index++) {
                let channel = morphData.getMorphChannelbyIndex(index);
                this.morphtargetChannels[index] = channel;
                this._morphTargetValues[channel.name] = 0;
            }
        }
    }
    _onMeshChange(mesh) {
        if (mesh && this._mesh != mesh) {
            this._changeVertexDefine(mesh);
            this._changeMorphData(mesh);
            this._mesh = mesh;
            this.geometryBounds = mesh.bounds;
            var count = mesh.subMeshCount;
            this._renderElements.length = count;
            for (var i = 0; i < count; i++) {
                var renderElement = this._renderElements[i];
                if (!renderElement) {
                    var material = this.sharedMaterials[i];
                    renderElement = this._renderElements[i] = this._renderElements[i] ? this._renderElements[i] : this._createRenderElement();
                    this.owner && renderElement.setTransform(this.owner._transform);
                    renderElement.render = this;
                    renderElement.material = material ? material : BlinnPhongMaterial.defaultMaterial;
                }
                renderElement.setGeometry(mesh.getSubMesh(i));
            }
        }
        else if (!mesh) {
            this._renderElements.forEach;
            this._renderElements.forEach(element => {
                element.destroy();
            });
            this._renderElements.length = 0;
            this._mesh = null;
            this._changeVertexDefine(null);
            this._changeMorphData(null);
        }
        this.boundsChange = true;
    }
    updateMulPassRender() {
        const filter = this.owner.getComponent(MeshFilter);
        if (!filter)
            return;
        const mesh = filter.sharedMesh;
        if (mesh) {
            var subCount = mesh.subMeshCount;
            var matCount = this._sharedMaterials.length;
            if (subCount > matCount) {
                let count = subCount;
                this._renderElements.length = count;
                for (var i = 0; i < count; i++) {
                    var renderElement = this._renderElements[i];
                    if (!renderElement) {
                        var material = this.sharedMaterials[i];
                        renderElement = this._renderElements[i] = this._renderElements[i] ? this._renderElements[i] : this._createRenderElement();
                        renderElement.setTransform(this.owner._transform);
                        renderElement.render = this;
                        renderElement.material = material ? material : BlinnPhongMaterial.defaultMaterial;
                    }
                    renderElement.setGeometry(mesh.getSubMesh(i));
                }
            }
            else {
                let count = matCount;
                this._renderElements.length = count;
                for (var i = 0; i < count; i++) {
                    var renderElement = this._renderElements[i];
                    if (!renderElement) {
                        var material = this.sharedMaterials[i];
                        renderElement = this._renderElements[i] = this._renderElements[i] ? this._renderElements[i] : this._createRenderElement();
                        renderElement.setTransform(this.owner._transform);
                        renderElement.render = this;
                        renderElement.material = material ? material : BlinnPhongMaterial.defaultMaterial;
                    }
                }
                renderElement.setGeometry(mesh.getSubMesh(count % subCount));
            }
        }
        else {
            this._renderElements.length = 0;
        }
        this.boundsChange = true;
    }
    _calculateBoundingBox() {
        var sharedMesh = this._mesh;
        if (sharedMesh) {
            var worldMat = this._transform.worldMatrix;
            if (sharedMesh.morphTargetData) {
                sharedMesh.morphTargetData.bounds._tranform(worldMat, this._bounds);
            }
            else {
                sharedMesh.bounds._tranform(worldMat, this._bounds);
            }
        }
    }
    _renderUpdate(context, transform) {
        this._applyReflection();
        this._mesh.morphTargetData && this._applyMorphdata();
        var element = context.renderElement;
        let trans = transform ? transform : this._transform;
        this._setShaderValue(Sprite3D.WORLDMATRIX, ShaderDataType.Matrix4x4, trans.worldMatrix);
        this._worldParams.x = trans.getFrontFaceValue();
        this._setShaderValue(Sprite3D.WORLDINVERTFRONT, ShaderDataType.Vector4, this._worldParams);
        return;
    }
    _revertBatchRenderUpdate(context) {
        var element = context.renderElement;
        switch (element.renderType) {
            case RenderElement.RENDERTYPE_STATICBATCH:
                if (this._revertStaticBatchDefineUV1)
                    this._shaderValues.removeDefine(MeshSprite3DShaderDeclaration.SHADERDEFINE_UV1);
                this._shaderValues.setVector(RenderableSprite3D.LIGHTMAPSCALEOFFSET, this.lightmapScaleOffset);
                break;
            case RenderElement.RENDERTYPE_INSTANCEBATCH:
                this._shaderValues.removeDefine(MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE);
                break;
        }
    }
    _onDestroy() {
        super._onDestroy();
        this._morphTargetValues = null;
    }
    _cloneTo(dest) {
        super._cloneTo(dest);
        if (this.morphTargetWeight) {
            dest.morphTargetWeight = new Float32Array(this.morphTargetWeight);
        }
        for (const key in this._morphTargetValues) {
            dest._morphTargetValues[key] = this._morphTargetValues[key];
        }
    }
}

//# sourceMappingURL=MeshRenderer.js.map
