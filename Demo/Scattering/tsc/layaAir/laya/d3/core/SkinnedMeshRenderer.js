import { Event } from "../../events/Event";
import { Stat } from "../../utils/Stat";
import { Utils3D } from "../utils/Utils3D";
import { MeshRenderer } from "./MeshRenderer";
import { Sprite3D } from "./Sprite3D";
import { Transform3D } from "./Transform3D";
import { SkinnedMeshSprite3DShaderDeclaration } from "./SkinnedMeshSprite3DShaderDeclaration";
import { SkinRenderElement } from "./render/SkinRenderElement";
import { BlinnPhongMaterial } from "./material/BlinnPhongMaterial";
import { Bounds } from "../math/Bounds";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
export class SkinnedMeshRenderer extends MeshRenderer {
    constructor() {
        super();
        this._bones = [];
        this._inverseBindPosesBufferForNative = null;
        this._skinnedMatrixCachesBufferForNative = null;
        this._bonesTransformForNative = null;
        this._localBounds = new Bounds(Vector3.ZERO, Vector3.ZERO);
        this._shaderValues.addDefine(SkinnedMeshSprite3DShaderDeclaration.SHADERDEFINE_BONE);
    }
    get localBounds() {
        return this._localBounds;
    }
    set localBounds(value) {
        this._localBounds = value;
        this.geometryBounds = this._localBounds;
    }
    get rootBone() {
        return this._cacheRootBone;
    }
    set rootBone(value) {
        if (this._cacheRootBone != value) {
            if (this._cacheRootBone)
                this._cacheRootBone.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            else
                this.owner.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            if (value)
                value.transform.on(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            else
                this.owner.transform.on(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange);
            this._cacheRootBone = value;
            this._onWorldMatNeedChange(Transform3D.TRANSFORM_WORLDPOSITION | Transform3D.TRANSFORM_WORLDQUATERNION | Transform3D.TRANSFORM_WORLDSCALE);
            let count = this._renderElements.length;
            for (var i = 0; i < count; i++) {
                var renderElement = this._renderElements[i];
                renderElement.setTransform(value.transform);
            }
        }
    }
    get bones() {
        return this._bones;
    }
    _computeSkinnedData() {
        if (this._cacheMesh) {
            var bindPoses = this._cacheMesh._inverseBindPoses;
            var pathMarks = this._cacheMesh._skinnedMatrixCaches;
            for (var i = 0, n = this._cacheMesh.subMeshCount; i < n; i++) {
                var subMeshBoneIndices = this._cacheMesh.getSubMesh(i)._boneIndicesList;
                var subData = this._skinnedData[i];
                for (var j = 0, m = subMeshBoneIndices.length; j < m; j++) {
                    var boneIndices = subMeshBoneIndices[j];
                    this._computeSubSkinnedData(bindPoses, boneIndices, subData[j], pathMarks);
                }
            }
        }
    }
    _computeSubSkinnedData(bindPoses, boneIndices, data, matrixCaches) {
        for (let k = 0, q = boneIndices.length; k < q; k++) {
            let index = boneIndices[k];
            if (this._skinnedDataLoopMarks[index] === Stat.loopCount) {
                let c = matrixCaches[index];
                let preData = this._skinnedData[c.subMeshIndex][c.batchIndex];
                let srcIndex = c.batchBoneIndex * 16;
                let dstIndex = k * 16;
                for (let d = 0; d < 16; d++)
                    data[dstIndex + d] = preData[srcIndex + d];
            }
            else {
                let bone = this._bones[index];
                if (bone)
                    Utils3D._mulMatrixArray(bone.transform.worldMatrix.elements, bindPoses[index].elements, 0, data, k * 16);
                this._skinnedDataLoopMarks[index] = Stat.loopCount;
            }
        }
    }
    _computeSkinnedDataForNative() {
        if (this._cacheMesh) {
            var bindPoses = this._cacheMesh._inverseBindPoses;
            var pathMarks = this._cacheMesh._skinnedMatrixCaches;
            if (this._inverseBindPosesBufferForNative == null) {
                this._inverseBindPosesBufferForNative = new Float32Array(bindPoses.length * 16);
                var offset = 0;
                for (var i = 0, n = bindPoses.length; i < n; i++) {
                    this._inverseBindPosesBufferForNative.set(bindPoses[i].elements, offset);
                    offset += 16;
                }
            }
            if (this._skinnedMatrixCachesBufferForNative == null) {
                this._skinnedMatrixCachesBufferForNative = new Int32Array(pathMarks.length * 3);
                var j = 0;
                for (var i = 0, n = pathMarks.length; i < n; i++) {
                    if (!pathMarks[i]) {
                        break;
                    }
                    this._skinnedMatrixCachesBufferForNative[j] = pathMarks[i].subMeshIndex;
                    this._skinnedMatrixCachesBufferForNative[j + 1] = pathMarks[i].batchIndex;
                    this._skinnedMatrixCachesBufferForNative[j + 2] = pathMarks[i].batchBoneIndex;
                    j += 3;
                }
            }
            if (this._bonesTransformForNative == null) {
                this._bonesTransformForNative = [];
                for (var i = 0, n = this._bones.length; i < n; i++) {
                    let bone = this._bones[i];
                    if (bone) {
                        this._bonesTransformForNative[i] = bone.transform._nativeObj;
                    }
                    else {
                        this._bonesTransformForNative[i] = null;
                    }
                }
            }
            for (var i = 0, n = this._cacheMesh.subMeshCount; i < n; i++) {
                var subMeshBoneIndices = this._cacheMesh.getSubMesh(i)._boneIndicesList;
                var subData = this._skinnedData[i];
                for (var j = 0, m = subMeshBoneIndices.length; j < m; j++) {
                    var boneIndices = subMeshBoneIndices[j];
                    window.conch.computeSubSkinnedDataForNative(this._inverseBindPosesBufferForNative, boneIndices, subData[j], this._skinnedMatrixCachesBufferForNative, this._bonesTransformForNative, this._skinnedDataLoopMarks, this._skinnedData);
                }
            }
        }
    }
    _needRender(boundFrustum, context) {
        if (!Stat.enableSkin)
            return false;
        return super._needRender(boundFrustum, context);
    }
    _createRenderElement() {
        let renderelement = new SkinRenderElement();
        return renderelement;
    }
    _onSkinMeshChange(mesh) {
        if (mesh && this._mesh != mesh) {
            this._changeVertexDefine(mesh);
            this._changeMorphData(mesh);
            this._mesh = mesh;
            var count = mesh.subMeshCount;
            this._renderElements.length = count;
            for (var i = 0; i < count; i++) {
                var renderElement = this._renderElements[i];
                if (!renderElement) {
                    var material = this.sharedMaterials[i];
                    renderElement = this._renderElements[i] = this._renderElements[i] ? this._renderElements[i] : this._createRenderElement();
                    if (this._cacheRootBone) {
                        renderElement.setTransform(this._cacheRootBone._transform);
                    }
                    else {
                        renderElement.setTransform(this.owner._transform);
                    }
                    renderElement.render = this;
                    renderElement.material = material ? material : BlinnPhongMaterial.defaultMaterial;
                }
                renderElement.setGeometry(mesh.getSubMesh(i));
            }
        }
        else if (!mesh) {
            this._renderElements.length = 0;
            this._mesh = null;
            this._changeVertexDefine(null);
            this._changeMorphData(null);
        }
        this.boundsChange = true;
    }
    _onMeshChange(value) {
        this._onSkinMeshChange(value);
        if (!value)
            return;
        this._cacheMesh = value;
        var subMeshCount = value.subMeshCount;
        this._skinnedData = [];
        this._skinnedDataLoopMarks = new Uint32Array(value._inverseBindPoses.length);
        for (var i = 0; i < subMeshCount; i++) {
            var subBoneIndices = value.getSubMesh(i)._boneIndicesList;
            var subCount = subBoneIndices.length;
            var subData = this._skinnedData[i] = [];
            for (var j = 0; j < subCount; j++)
                subData[j] = new Float32Array(subBoneIndices[j].length * 16);
            this._renderElements[i].setSkinData(subData);
        }
    }
    _calculateBoundingBox() {
        if (this._cacheRootBone)
            this._localBounds._tranform(this._cacheRootBone.transform.worldMatrix, this._bounds);
        else
            this._localBounds._tranform(this.owner.transform.worldMatrix, this._bounds);
    }
    _setBelongScene(scene) {
        super._setBelongScene(scene);
        Stat.skinRenderNode++;
    }
    _setUnBelongScene() {
        super._setUnBelongScene();
        Stat.skinRenderNode--;
    }
    _renderUpdate(context, transform) {
        this._applyReflection();
        if (this.bones.length > 0) {
            this._computeSkinnedData();
            this._shaderValues.setMatrix4x4(Sprite3D.WORLDMATRIX, Matrix4x4.DEFAULT);
            this._worldParams.x = 1;
            this._shaderValues.setVector(Sprite3D.WORLDINVERTFRONT, this._worldParams);
        }
        else {
            this._shaderValues.setMatrix4x4(Sprite3D.WORLDMATRIX, transform.worldMatrix);
            this._worldParams.x = transform.getFrontFaceValue();
            this._shaderValues.setVector(Sprite3D.WORLDINVERTFRONT, this._worldParams);
        }
        this._mesh.morphTargetData && this._applyMorphdata();
    }
    _cloneTo(dest) {
        let render = dest;
        render._inverseBindPosesBufferForNative = null;
        render._skinnedMatrixCachesBufferForNative = null;
        render._bonesTransformForNative = null;
        let getCommomParent = (rootNode, rootCheckNode) => {
            let nodeArray = [];
            let node = rootNode;
            while (!!node) {
                if (node instanceof Sprite3D)
                    nodeArray.push(node);
                node = node.parent;
            }
            let checkNode = rootCheckNode;
            while (!!checkNode && nodeArray.indexOf(checkNode) == -1) {
                checkNode = checkNode.parent;
            }
            return checkNode;
        };
        let cloneHierachFun = (rootNode, rootCheckNode, destNode) => {
            let rootparent = getCommomParent(rootNode, rootCheckNode);
            if (!rootparent)
                return null;
            let path = [];
            Utils3D._getHierarchyPath(rootparent, rootNode, path);
            let pathcheck = [];
            Utils3D._getHierarchyPath(rootparent, rootCheckNode, pathcheck);
            let destParent = Utils3D._getParentNodeByHierarchyPath(destNode, path);
            if (!destParent)
                return null;
            return Utils3D._getNodeByHierarchyPath(destParent, pathcheck);
        };
        var rootBone = this.rootBone;
        if (rootBone) {
            let node = cloneHierachFun(this.owner, this.rootBone, render.owner);
            if (node)
                render.rootBone = node;
            else
                render.rootBone = rootBone;
        }
        var bones = this.bones;
        var destBone = render.bones;
        let n = destBone.length = bones.length;
        for (var i = 0; i < n; i++) {
            let ceckNode = bones[i];
            destBone[i] = cloneHierachFun(this.owner, ceckNode, render.owner);
        }
        var lbb = this.localBounds;
        (lbb) && (lbb.cloneTo(render.localBounds));
        (render.localBounds) && (render.localBounds = render.localBounds);
        super._cloneTo(dest);
    }
    _onDestroy() {
        if (this._cacheRootBone)
            (!this._cacheRootBone._destroyed) && (this._cacheRootBone.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange));
        else
            (this.owner && !this.owner._destroyed) && (this.owner.transform.off(Event.TRANSFORM_CHANGED, this, this._onWorldMatNeedChange));
        super._onDestroy();
    }
}

//# sourceMappingURL=SkinnedMeshRenderer.js.map
