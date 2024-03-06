import { ILaya } from "../../../../ILaya";
import { LayaGL } from "../../../layagl/LayaGL";
import { Loader } from "../../../net/Loader";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { Resource } from "../../../resource/Resource";
import { InstanceRenderElement } from "../../core/render/InstanceRenderElement";
import { Bounds } from "../../math/Bounds";
import { Physics3D } from "../../Physics3D";
import { Utils3D } from "../../utils/Utils3D";
import { SubMesh } from "./SubMesh";
import { Color } from "../../../maths/Color";
import { Vector2 } from "../../../maths/Vector2";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
import { BufferState } from "../../../webgl/utils/BufferState";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { Config } from "../../../../Config";
export class skinnedMatrixCache {
    constructor(subMeshIndex, batchIndex, batchBoneIndex) {
        this.subMeshIndex = subMeshIndex;
        this.batchIndex = batchIndex;
        this.batchBoneIndex = batchBoneIndex;
    }
}
export class Mesh extends Resource {
    constructor(isReadable = true) {
        super();
        this._tempVector30 = new Vector3();
        this._tempVector31 = new Vector3();
        this._tempVector32 = new Vector3();
        this._minVerticesUpdate = -1;
        this._maxVerticesUpdate = -1;
        this._needUpdateBounds = true;
        this._bufferState = new BufferState();
        this._instanceBufferStateType = 0;
        this._vertexBuffer = null;
        this._indexBuffer = null;
        this._skinnedMatrixCaches = [];
        this._vertexCount = 0;
        this._indexFormat = IndexFormat.UInt16;
        this._bounds = new Bounds(new Vector3(), new Vector3());
        this._isReadable = isReadable;
        this._subMeshes = [];
        this.destroyedImmediately = Config.destroyResourceImmediatelyDefault;
    }
    static __init__() {
        var physics3D = Physics3D._bullet;
        if (physics3D) {
            Mesh._nativeTempVector30 = physics3D.btVector3_create(0, 0, 0);
            Mesh._nativeTempVector31 = physics3D.btVector3_create(0, 0, 0);
            Mesh._nativeTempVector32 = physics3D.btVector3_create(0, 0, 0);
        }
    }
    static load(url, complete) {
        ILaya.loader.load(url, complete, null, Loader.MESH);
    }
    get inverseAbsoluteBindPoses() {
        return this._inverseBindPoses;
    }
    get vertexCount() {
        return this._vertexCount;
    }
    get indexCount() {
        return this._indexBuffer.indexCount;
    }
    get subMeshCount() {
        return this._subMeshes.length;
    }
    get bounds() {
        return this._bounds;
    }
    set bounds(value) {
        if (this._bounds !== value)
            value.cloneTo(this._bounds);
    }
    get indexFormat() {
        return this._indexFormat;
    }
    set indexFormat(value) {
        this._indexFormat = value;
        this._subMeshes.forEach(element => {
            element.indexFormat = value;
        });
    }
    _getPositionElement(vertexBuffer) {
        var vertexElements = vertexBuffer.vertexDeclaration._vertexElements;
        for (var i = 0, n = vertexElements.length; i < n; i++) {
            var vertexElement = vertexElements[i];
            if (vertexElement._elementFormat === VertexElementFormat.Vector3 && vertexElement._elementUsage === VertexMesh.MESH_POSITION0)
                return vertexElement;
        }
        return null;
    }
    _getVerticeElementData(data, elementUsage) {
        data.length = this._vertexCount;
        var verDec = this._vertexBuffer.vertexDeclaration;
        var element = verDec.getVertexElementByUsage(elementUsage);
        if (element) {
            var uint8Vertices = this._vertexBuffer.getUint8Data();
            var floatVertices = this._vertexBuffer.getFloat32Data();
            var uint8VerStr = verDec.vertexStride;
            var floatVerStr = uint8VerStr / 4;
            var uint8EleOffset = element._offset;
            var floatEleOffset = uint8EleOffset / 4;
            switch (elementUsage) {
                case VertexMesh.MESH_TEXTURECOORDINATE0:
                case VertexMesh.MESH_TEXTURECOORDINATE1:
                    for (var i = 0; i < this._vertexCount; i++) {
                        var offset = floatVerStr * i + floatEleOffset;
                        data[i] = new Vector2(floatVertices[offset], floatVertices[offset + 1]);
                    }
                    break;
                case VertexMesh.MESH_POSITION0:
                case VertexMesh.MESH_NORMAL0:
                    for (var i = 0; i < this._vertexCount; i++) {
                        var offset = floatVerStr * i + floatEleOffset;
                        data[i] = new Vector3(floatVertices[offset], floatVertices[offset + 1], floatVertices[offset + 2]);
                    }
                    break;
                case VertexMesh.MESH_TANGENT0:
                case VertexMesh.MESH_BLENDWEIGHT0:
                    for (var i = 0; i < this._vertexCount; i++) {
                        var offset = floatVerStr * i + floatEleOffset;
                        data[i] = new Vector4(floatVertices[offset], floatVertices[offset + 1], floatVertices[offset + 2], floatVertices[offset + 3]);
                    }
                    break;
                case VertexMesh.MESH_COLOR0:
                    for (var i = 0; i < this._vertexCount; i++) {
                        var offset = floatVerStr * i + floatEleOffset;
                        data[i] = new Color(floatVertices[offset], floatVertices[offset + 1], floatVertices[offset + 2], floatVertices[offset + 3]);
                    }
                    break;
                case VertexMesh.MESH_BLENDINDICES0:
                    for (var i = 0; i < this._vertexCount; i++) {
                        var offset = uint8VerStr * i + uint8EleOffset;
                        data[i] = new Vector4(uint8Vertices[offset], uint8Vertices[offset + 1], uint8Vertices[offset + 2], uint8Vertices[offset + 3]);
                    }
                    break;
                default:
                    throw "Mesh:Unknown elementUsage.";
            }
        }
    }
    _setVerticeElementData(data, elementUsage) {
        var verDec = this._vertexBuffer.vertexDeclaration;
        var element = verDec.getVertexElementByUsage(elementUsage);
        if (element) {
            var uint8Vertices = this._vertexBuffer.getUint8Data();
            var floatVertices = this._vertexBuffer.getFloat32Data();
            var uint8VerStr = verDec.vertexStride;
            var float8VerStr = uint8VerStr / 4;
            var uint8EleOffset = element._offset;
            var floatEleOffset = uint8EleOffset / 4;
            switch (elementUsage) {
                case VertexMesh.MESH_TEXTURECOORDINATE0:
                case VertexMesh.MESH_TEXTURECOORDINATE1:
                    for (var i = 0, n = data.length; i < n; i++) {
                        var offset = float8VerStr * i + floatEleOffset;
                        var vec2 = data[i];
                        floatVertices[offset] = vec2.x;
                        floatVertices[offset + 1] = vec2.y;
                    }
                    break;
                case VertexMesh.MESH_POSITION0:
                case VertexMesh.MESH_NORMAL0:
                    for (var i = 0, n = data.length; i < n; i++) {
                        var offset = float8VerStr * i + floatEleOffset;
                        var vec3 = data[i];
                        floatVertices[offset] = vec3.x;
                        floatVertices[offset + 1] = vec3.y;
                        floatVertices[offset + 2] = vec3.z;
                    }
                    break;
                case VertexMesh.MESH_TANGENT0:
                case VertexMesh.MESH_BLENDWEIGHT0:
                    for (var i = 0, n = data.length; i < n; i++) {
                        var offset = float8VerStr * i + floatEleOffset;
                        var vec4 = data[i];
                        floatVertices[offset] = vec4.x;
                        floatVertices[offset + 1] = vec4.y;
                        floatVertices[offset + 2] = vec4.z;
                        floatVertices[offset + 3] = vec4.w;
                    }
                    break;
                case VertexMesh.MESH_COLOR0:
                    for (var i = 0, n = data.length; i < n; i++) {
                        var offset = float8VerStr * i + floatEleOffset;
                        var cor = data[i];
                        floatVertices[offset] = cor.r;
                        floatVertices[offset + 1] = cor.g;
                        floatVertices[offset + 2] = cor.b;
                        floatVertices[offset + 3] = cor.a;
                    }
                    break;
                case VertexMesh.MESH_BLENDINDICES0:
                    for (var i = 0, n = data.length; i < n; i++) {
                        var offset = uint8VerStr * i + uint8EleOffset;
                        var vec4 = data[i];
                        uint8Vertices[offset] = vec4.x;
                        uint8Vertices[offset + 1] = vec4.y;
                        uint8Vertices[offset + 2] = vec4.z;
                        uint8Vertices[offset + 3] = vec4.w;
                    }
                    break;
                default:
                    throw "Mesh:Unknown elementUsage.";
            }
            this._minVerticesUpdate = 0;
            this._maxVerticesUpdate = Number.MAX_SAFE_INTEGER;
        }
        else {
            console.warn("Mesh: the mesh don't have  this VertexElement.");
        }
    }
    _disposeResource() {
        for (var i = 0, n = this._subMeshes.length; i < n; i++)
            this._subMeshes[i].destroy();
        this._btTriangleMesh && Physics3D._bullet.btStridingMeshInterface_destroy(this._btTriangleMesh);
        this._vertexBuffer && this._vertexBuffer.destroy();
        this._indexBuffer && this._indexBuffer.destroy();
        this._bufferState.destroy();
        this._instanceBufferState && this._instanceBufferState.destroy();
        this._instanceWorldVertexBuffer && this._instanceWorldVertexBuffer.destroy();
        this._instanceSimpleAniVertexBuffer && this._instanceSimpleAniVertexBuffer.destroy();
        this.instanceWorldMatrixData && (this.instanceWorldMatrixData = null);
        this.instanceSimpleAnimatorData && (this.instanceSimpleAnimatorData = null);
        this._setCPUMemory(0);
        this._setGPUMemory(0);
        this._bufferState = null;
        this._instanceBufferState = null;
        this._vertexBuffer = null;
        this._indexBuffer = null;
        this._subMeshes = null;
        this._btTriangleMesh = null;
        this._indexBuffer = null;
        this._boneNames = null;
        this._inverseBindPoses = null;
        this.morphTargetData && (this.morphTargetData.destroy());
    }
    _setSubMeshes(subMeshes) {
        this._subMeshes = subMeshes;
        for (var i = 0, n = subMeshes.length; i < n; i++)
            subMeshes[i]._indexInMesh = i;
    }
    _setBuffer(vertexBuffer, indexBuffer) {
        var bufferState = this._bufferState;
        bufferState.applyState([vertexBuffer], indexBuffer);
    }
    _setInstanceBuffer() {
        if (this._instanceBufferState)
            return;
        var instanceBufferState = this._instanceBufferState = new BufferState();
        var instanceBufferStateType = this._instanceBufferStateType;
        let vertexArray = [];
        vertexArray.push(this._vertexBuffer);
        let instanceBuffer3D = this._instanceWorldVertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(InstanceRenderElement.maxInstanceCount * 16 * 4, BufferUsage.Dynamic, false);
        ;
        instanceBuffer3D.vertexDeclaration = VertexMesh.instanceWorldMatrixDeclaration;
        instanceBuffer3D.instanceBuffer = true;
        vertexArray.push(instanceBuffer3D);
        this.instanceWorldMatrixData = new Float32Array(InstanceRenderElement.maxInstanceCount * 16);
        switch (instanceBufferStateType) {
            case Mesh.MESH_INSTANCEBUFFER_TYPE_SIMPLEANIMATOR:
                let instanceSimpleAnimatorBuffer = this._instanceSimpleAniVertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(InstanceRenderElement.maxInstanceCount * 4 * 4, BufferUsage.Dynamic, false);
                instanceSimpleAnimatorBuffer.vertexDeclaration = VertexMesh.instanceSimpleAnimatorDeclaration;
                instanceSimpleAnimatorBuffer.instanceBuffer = true;
                this.instanceSimpleAnimatorData = new Float32Array(InstanceRenderElement.maxInstanceCount * 4);
                vertexArray.push(instanceSimpleAnimatorBuffer);
                break;
        }
        instanceBufferState.applyState(vertexArray, this._indexBuffer);
    }
    _getPhysicMesh() {
        var bt = Physics3D._bullet;
        var triangleMesh = bt.btTriangleMesh_create();
        var nativePositio0 = Mesh._nativeTempVector30;
        var nativePositio1 = Mesh._nativeTempVector31;
        var nativePositio2 = Mesh._nativeTempVector32;
        var position0 = this._tempVector30;
        var position1 = this._tempVector31;
        var position2 = this._tempVector32;
        var vertexBuffer = this._vertexBuffer;
        var positionElement = this._getPositionElement(vertexBuffer);
        var verticesData = vertexBuffer.getFloat32Data();
        var floatCount = vertexBuffer.vertexDeclaration.vertexStride / 4;
        var posOffset = positionElement._offset / 4;
        var indices = this._indexBuffer.getData();
        for (var i = 0, n = indices.length; i < n; i += 3) {
            var p0Index = indices[i] * floatCount + posOffset;
            var p1Index = indices[i + 1] * floatCount + posOffset;
            var p2Index = indices[i + 2] * floatCount + posOffset;
            position0.setValue(verticesData[p0Index], verticesData[p0Index + 1], verticesData[p0Index + 2]);
            position1.setValue(verticesData[p1Index], verticesData[p1Index + 1], verticesData[p1Index + 2]);
            position2.setValue(verticesData[p2Index], verticesData[p2Index + 1], verticesData[p2Index + 2]);
            Utils3D._convertToBulletVec3(position0, nativePositio0);
            Utils3D._convertToBulletVec3(position1, nativePositio1);
            Utils3D._convertToBulletVec3(position2, nativePositio2);
            bt.btTriangleMesh_addTriangle(triangleMesh, nativePositio0, nativePositio1, nativePositio2, false);
        }
        this._btTriangleMesh = triangleMesh;
        return this._btTriangleMesh;
    }
    _uploadVerticesData() {
        var min = this._minVerticesUpdate;
        var max = this._maxVerticesUpdate;
        if (min !== -1 && max !== -1) {
            var offset = min;
            this._vertexBuffer.setData(this._vertexBuffer.getUint8Data().buffer, offset, offset, max - min);
            this._minVerticesUpdate = -1;
            this._maxVerticesUpdate = -1;
        }
    }
    getSubMesh(index) {
        return this._subMeshes[index];
    }
    getPositions(positions) {
        if (this._isReadable)
            this._getVerticeElementData(positions, VertexMesh.MESH_POSITION0);
        else
            throw "Mesh:can't get positions on mesh,isReadable must be true.";
    }
    setPositions(positions) {
        if (this._isReadable) {
            this._setVerticeElementData(positions, VertexMesh.MESH_POSITION0);
            this._needUpdateBounds = true;
        }
        else {
            throw "Mesh:setPosition() need isReadable must be true or use setVertices().";
        }
    }
    getColors(colors) {
        if (this._isReadable)
            this._getVerticeElementData(colors, VertexMesh.MESH_COLOR0);
        else
            throw "Mesh:can't get colors on mesh,isReadable must be true.";
    }
    setColors(colors) {
        if (this._isReadable)
            this._setVerticeElementData(colors, VertexMesh.MESH_COLOR0);
        else
            throw "Mesh:setColors() need isReadable must be true or use setVertices().";
    }
    getUVs(uvs, channel = 0) {
        if (this._isReadable) {
            switch (channel) {
                case 0:
                    this._getVerticeElementData(uvs, VertexMesh.MESH_TEXTURECOORDINATE0);
                    break;
                case 1:
                    this._getVerticeElementData(uvs, VertexMesh.MESH_TEXTURECOORDINATE1);
                    break;
                default:
                    throw "Mesh:Invalid channel.";
            }
        }
        else {
            throw "Mesh:can't get uvs on mesh,isReadable must be true.";
        }
    }
    setUVs(uvs, channel = 0) {
        if (this._isReadable) {
            switch (channel) {
                case 0:
                    this._setVerticeElementData(uvs, VertexMesh.MESH_TEXTURECOORDINATE0);
                    break;
                case 1:
                    this._setVerticeElementData(uvs, VertexMesh.MESH_TEXTURECOORDINATE1);
                    break;
                default:
                    throw "Mesh:Invalid channel.";
            }
        }
        else {
            throw "Mesh:setUVs() need isReadable must be true or use setVertices().";
        }
    }
    getNormals(normals) {
        if (this._isReadable)
            this._getVerticeElementData(normals, VertexMesh.MESH_NORMAL0);
        else
            throw "Mesh:can't get colors on mesh,isReadable must be true.";
    }
    setNormals(normals) {
        if (this._isReadable)
            this._setVerticeElementData(normals, VertexMesh.MESH_NORMAL0);
        else
            throw "Mesh:setNormals() need must be true or use setVertices().";
    }
    getTangents(tangents) {
        if (this._isReadable)
            this._getVerticeElementData(tangents, VertexMesh.MESH_TANGENT0);
        else
            throw "Mesh:can't get colors on mesh,isReadable must be true.";
    }
    setTangents(tangents) {
        if (this._isReadable)
            this._setVerticeElementData(tangents, VertexMesh.MESH_TANGENT0);
        else
            throw "Mesh:setTangents() need isReadable must be true or use setVertices().";
    }
    getBoneWeights(boneWeights) {
        if (this._isReadable)
            this._getVerticeElementData(boneWeights, VertexMesh.MESH_BLENDWEIGHT0);
        else
            throw "Mesh:can't get boneWeights on mesh,isReadable must be true.";
    }
    setBoneWeights(boneWeights) {
        if (this._isReadable)
            this._setVerticeElementData(boneWeights, VertexMesh.MESH_BLENDWEIGHT0);
        else
            throw "Mesh:setBoneWeights() need isReadable must be true or use setVertices().";
    }
    getBoneIndices(boneIndices) {
        if (this._isReadable)
            this._getVerticeElementData(boneIndices, VertexMesh.MESH_BLENDINDICES0);
        else
            throw "Mesh:can't get boneIndices on mesh,isReadable must be true.";
    }
    setBoneIndices(boneIndices) {
        if (this._isReadable)
            this._setVerticeElementData(boneIndices, VertexMesh.MESH_BLENDINDICES0);
        else
            throw "Mesh:setBoneIndices() need isReadable must be true or use setVertices().";
    }
    markAsUnreadbale() {
        this._uploadVerticesData();
        this._vertexBuffer.markAsUnreadbale();
        this._isReadable = false;
    }
    getVertexDeclaration() {
        return this._vertexBuffer._vertexDeclaration;
    }
    getVertices() {
        if (this._isReadable)
            return this._vertexBuffer.getUint8Data().buffer.slice(0);
        else
            throw "Mesh:can't get vertices on mesh,isReadable must be true.";
    }
    setVertices(vertices) {
        this._vertexBuffer.setData(vertices);
        this._needUpdateBounds = true;
    }
    getIndices() {
        if (this._isReadable)
            return this._indexBuffer.getData().slice();
        else
            throw "Mesh:can't get indices on subMesh,mesh's isReadable must be true.";
    }
    setIndices(indices) {
        var format;
        if (indices instanceof Uint32Array)
            format = IndexFormat.UInt32;
        else if (indices instanceof Uint16Array)
            format = IndexFormat.UInt16;
        else if (indices instanceof Uint8Array)
            format = IndexFormat.UInt8;
        var indexBuffer = this._indexBuffer;
        if (this._indexFormat !== format || indexBuffer.indexCount !== indices.length) {
            indexBuffer.destroy();
            this._indexBuffer = indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(format, indices.length, BufferUsage.Static, this._isReadable);
        }
        indexBuffer.setData(indices);
        this.indexFormat = format;
    }
    calculateBounds() {
        if (this._isReadable) {
            if (this._needUpdateBounds) {
                var min = this._tempVector30;
                var max = this._tempVector31;
                min.x = min.y = min.z = Number.MAX_VALUE;
                max.x = max.y = max.z = -Number.MAX_VALUE;
                var vertexBuffer = this._vertexBuffer;
                var positionElement = this._getPositionElement(vertexBuffer);
                var verticesData = vertexBuffer.getFloat32Data();
                var floatCount = vertexBuffer.vertexDeclaration.vertexStride / 4;
                var posOffset = positionElement._offset / 4;
                for (var j = 0, m = verticesData.length; j < m; j += floatCount) {
                    var ofset = j + posOffset;
                    var pX = verticesData[ofset];
                    var pY = verticesData[ofset + 1];
                    var pZ = verticesData[ofset + 2];
                    min.x = Math.min(min.x, pX);
                    min.y = Math.min(min.y, pY);
                    min.z = Math.min(min.z, pZ);
                    max.x = Math.max(max.x, pX);
                    max.y = Math.max(max.y, pY);
                    max.z = Math.max(max.z, pZ);
                }
                this._bounds.setMin(min);
                this._bounds.setMax(max);
                this._needUpdateBounds = false;
            }
        }
        else {
            throw "Mesh:can't calculate bounds on subMesh,mesh's isReadable must be true.";
        }
    }
    cloneTo(destObject) {
        var destMesh = destObject;
        var vb = this._vertexBuffer;
        var destVB = LayaGL.renderOBJCreate.createVertexBuffer3D(vb._byteLength, vb.bufferUsage, vb.canRead);
        destVB.vertexDeclaration = vb.vertexDeclaration;
        destVB.setData(vb.getUint8Data().slice().buffer);
        destMesh._vertexBuffer = destVB;
        destMesh._vertexCount = this._vertexCount;
        var ib = this._indexBuffer;
        var destIB = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, ib.indexCount, ib.bufferUsage, ib.canRead);
        destIB.setData(ib.getData().slice());
        destMesh._indexBuffer = destIB;
        destMesh._setBuffer(destMesh._vertexBuffer, destIB);
        destMesh._instanceBufferStateType = this._instanceBufferStateType;
        destMesh._setCPUMemory(this.cpuMemory);
        destMesh._setGPUMemory(this.gpuMemory);
        var i;
        var boneNames = this._boneNames;
        if (boneNames) {
            var destBoneNames = destMesh._boneNames = [];
            for (i = 0; i < boneNames.length; i++)
                destBoneNames[i] = boneNames[i];
        }
        var inverseBindPoses = this._inverseBindPoses;
        if (inverseBindPoses) {
            var destInverseBindPoses = destMesh._inverseBindPoses = [];
            for (i = 0; i < inverseBindPoses.length; i++)
                destInverseBindPoses[i] = inverseBindPoses[i];
        }
        var cacheLength = this._skinnedMatrixCaches.length;
        destMesh._skinnedMatrixCaches.length = cacheLength;
        for (i = 0; i < cacheLength; i++) {
            var skinnedCache = this._skinnedMatrixCaches[i];
            if (skinnedCache)
                destMesh._skinnedMatrixCaches[i] = new skinnedMatrixCache(skinnedCache.subMeshIndex, skinnedCache.batchIndex, skinnedCache.batchBoneIndex);
        }
        for (i = 0; i < this.subMeshCount; i++) {
            var subMesh = this._subMeshes[i];
            var subIndexBufferStart = subMesh._subIndexBufferStart;
            var subIndexBufferCount = subMesh._subIndexBufferCount;
            var boneIndicesList = subMesh._boneIndicesList;
            var destSubmesh = new SubMesh(destMesh);
            destSubmesh._subIndexBufferStart.length = subIndexBufferStart.length;
            destSubmesh._subIndexBufferCount.length = subIndexBufferCount.length;
            destSubmesh._boneIndicesList.length = boneIndicesList.length;
            for (var j = 0; j < subIndexBufferStart.length; j++)
                destSubmesh._subIndexBufferStart[j] = subIndexBufferStart[j];
            for (j = 0; j < subIndexBufferCount.length; j++)
                destSubmesh._subIndexBufferCount[j] = subIndexBufferCount[j];
            for (j = 0; j < boneIndicesList.length; j++)
                destSubmesh._boneIndicesList[j] = new Uint16Array(boneIndicesList[j]);
            destSubmesh._indexBuffer = destIB;
            destSubmesh._indexStart = subMesh._indexStart;
            destSubmesh._indexCount = subMesh._indexCount;
            destSubmesh._indices = new Uint16Array(destIB.getData().buffer, subMesh._indexStart * 2, subMesh._indexCount);
            var vertexBuffer = destMesh._vertexBuffer;
            destSubmesh._vertexBuffer = vertexBuffer;
            destMesh._subMeshes.push(destSubmesh);
        }
        destMesh._setSubMeshes(destMesh._subMeshes);
        if (this.morphTargetData) {
            destMesh.morphTargetData = this.morphTargetData.clone();
        }
    }
    clone() {
        var dest = new Mesh();
        this.cloneTo(dest);
        return dest;
    }
}
Mesh.MESH_INSTANCEBUFFER_TYPE_NORMAL = 0;
Mesh.MESH_INSTANCEBUFFER_TYPE_SIMPLEANIMATOR = 1;

//# sourceMappingURL=Mesh.js.map