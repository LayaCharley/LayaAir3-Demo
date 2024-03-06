import { LayaGL } from "../../layagl/LayaGL";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { VertexMesh } from "../../RenderEngine/RenderShader/VertexMesh";
import { HalfFloatUtils } from "../../utils/HalfFloatUtils";
import { Mesh, skinnedMatrixCache } from "../resource/models/Mesh";
import { MorphTarget, MorphTargetChannel } from "../resource/models/MorphTarget";
import { MorphTargetData } from "../resource/models/MorphTargetData";
import { SubMesh } from "../resource/models/SubMesh";
export class LoadModelV05 {
    static parse(readData, version, mesh, subMeshes) {
        LoadModelV05._mesh = mesh;
        LoadModelV05._subMeshes = subMeshes;
        LoadModelV05._version = version;
        LoadModelV05._readData = readData;
        LoadModelV05.READ_DATA();
        LoadModelV05.READ_BLOCK();
        LoadModelV05.READ_STRINGS();
        for (var i = 0, n = LoadModelV05._BLOCK.count; i < n; i++) {
            LoadModelV05._readData.pos = LoadModelV05._BLOCK.blockStarts[i];
            var index = LoadModelV05._readData.getUint16();
            var blockName = LoadModelV05._strings[index];
            var fn = LoadModelV05["READ_" + blockName];
            if (fn == null)
                console.warn("model file err,no this function:" + index + " " + blockName);
            else
                fn.call(null);
        }
        LoadModelV05._strings.length = 0;
        LoadModelV05._readData = null;
        LoadModelV05._version = null;
        LoadModelV05._mesh = null;
        LoadModelV05._subMeshes = null;
    }
    static _readString() {
        return LoadModelV05._strings[LoadModelV05._readData.getUint16()];
    }
    static READ_DATA() {
        LoadModelV05._DATA.offset = LoadModelV05._readData.getUint32();
        LoadModelV05._DATA.size = LoadModelV05._readData.getUint32();
    }
    static READ_BLOCK() {
        var count = LoadModelV05._BLOCK.count = LoadModelV05._readData.getUint16();
        var blockStarts = LoadModelV05._BLOCK.blockStarts = [];
        var blockLengths = LoadModelV05._BLOCK.blockLengths = [];
        for (var i = 0; i < count; i++) {
            blockStarts.push(LoadModelV05._readData.getUint32());
            blockLengths.push(LoadModelV05._readData.getUint32());
        }
    }
    static READ_STRINGS() {
        var offset = LoadModelV05._readData.getUint32();
        var count = LoadModelV05._readData.getUint16();
        var prePos = LoadModelV05._readData.pos;
        LoadModelV05._readData.pos = offset + LoadModelV05._DATA.offset;
        for (var i = 0; i < count; i++)
            LoadModelV05._strings[i] = LoadModelV05._readData.readUTFString();
        LoadModelV05._readData.pos = prePos;
    }
    static READ_MESH() {
        var i;
        var memorySize = 0;
        var name = LoadModelV05._readString();
        var reader = LoadModelV05._readData;
        var arrayBuffer = reader.__getBuffer();
        var vertexBufferCount = reader.getInt16();
        var offset = LoadModelV05._DATA.offset;
        for (i = 0; i < vertexBufferCount; i++) {
            var vbStart = offset + reader.getUint32();
            var vertexCount = reader.getUint32();
            var vertexFlag = LoadModelV05._readString();
            var vertexDeclaration = VertexMesh.getVertexDeclaration(vertexFlag, false);
            var vertexStride = vertexDeclaration.vertexStride;
            var vertexData;
            var floatData;
            var uint8Data;
            var subVertexFlags = vertexFlag.split(",");
            var subVertexCount = subVertexFlags.length;
            var mesh = LoadModelV05._mesh;
            switch (LoadModelV05._version) {
                case "LAYAMODEL:05":
                case "LAYAMODEL:0501":
                case "LAYAMODEL:0502":
                    vertexData = arrayBuffer.slice(vbStart, vbStart + vertexCount * vertexStride);
                    floatData = new Float32Array(vertexData);
                    uint8Data = new Uint8Array(vertexData);
                    break;
                case "LAYAMODEL:COMPRESSION_05":
                case "LAYAMODEL:COMPRESSION_0501":
                    vertexData = new ArrayBuffer(vertexStride * vertexCount);
                    floatData = new Float32Array(vertexData);
                    uint8Data = new Uint8Array(vertexData);
                    var lastPosition = reader.pos;
                    reader.pos = vbStart;
                    for (var j = 0; j < vertexCount; j++) {
                        var subOffset;
                        var verOffset = j * vertexStride;
                        for (var k = 0; k < subVertexCount; k++) {
                            switch (subVertexFlags[k]) {
                                case "POSITION":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 2] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 12;
                                    break;
                                case "NORMAL":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 1] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 2] = reader.getUint8() / 127.5 - 1;
                                    verOffset += 12;
                                    break;
                                case "COLOR":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 255;
                                    floatData[subOffset + 1] = reader.getUint8() / 255;
                                    floatData[subOffset + 2] = reader.getUint8() / 255;
                                    floatData[subOffset + 3] = reader.getUint8() / 255;
                                    verOffset += 16;
                                    break;
                                case "UV":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 8;
                                    break;
                                case "UV1":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    floatData[subOffset + 1] = HalfFloatUtils.convertToNumber(reader.getUint16());
                                    verOffset += 8;
                                    break;
                                case "BLENDWEIGHT":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 255;
                                    floatData[subOffset + 1] = reader.getUint8() / 255;
                                    floatData[subOffset + 2] = reader.getUint8() / 255;
                                    floatData[subOffset + 3] = reader.getUint8() / 255;
                                    verOffset += 16;
                                    break;
                                case "BLENDINDICES":
                                    uint8Data[verOffset] = reader.getUint8();
                                    uint8Data[verOffset + 1] = reader.getUint8();
                                    uint8Data[verOffset + 2] = reader.getUint8();
                                    uint8Data[verOffset + 3] = reader.getUint8();
                                    verOffset += 4;
                                    break;
                                case "TANGENT":
                                    subOffset = verOffset / 4;
                                    floatData[subOffset] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 1] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 2] = reader.getUint8() / 127.5 - 1;
                                    floatData[subOffset + 3] = reader.getUint8() / 127.5 - 1;
                                    verOffset += 16;
                                    break;
                            }
                        }
                    }
                    reader.pos = lastPosition;
                    break;
            }
            var vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vertexData.byteLength, BufferUsage.Static, true);
            vertexBuffer.vertexDeclaration = vertexDeclaration;
            vertexBuffer.setData(vertexData);
            var vertexCount = vertexBuffer._byteLength / vertexDeclaration.vertexStride;
            if (vertexCount > 65535)
                mesh._indexFormat = IndexFormat.UInt32;
            else
                mesh._indexFormat = IndexFormat.UInt16;
            mesh._vertexBuffer = vertexBuffer;
            mesh._vertexCount += vertexCount;
            memorySize += floatData.length * 4;
        }
        var ibStart = offset + reader.getUint32();
        var ibLength = reader.getUint32();
        var ibDatas;
        if (mesh.indexFormat == IndexFormat.UInt32)
            ibDatas = new Uint32Array(arrayBuffer.slice(ibStart, ibStart + ibLength));
        else
            ibDatas = new Uint16Array(arrayBuffer.slice(ibStart, ibStart + ibLength));
        var indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(mesh.indexFormat, ibDatas.length, BufferUsage.Static, true);
        indexBuffer.setData(ibDatas);
        mesh._indexBuffer = indexBuffer;
        mesh._setBuffer(mesh._vertexBuffer, indexBuffer);
        memorySize += indexBuffer.indexCount * 2;
        mesh._setCPUMemory(memorySize);
        mesh._setGPUMemory(memorySize);
        if (LoadModelV05._version == "LAYAMODEL:0501" || LoadModelV05._version == "LAYAMODEL:COMPRESSION_0501" || LoadModelV05._version == "LAYAMODEL:0502") {
            var bounds = mesh.bounds;
            var min = bounds.getMin();
            var max = bounds.getMax();
            min.setValue(reader.getFloat32(), reader.getFloat32(), reader.getFloat32());
            max.setValue(reader.getFloat32(), reader.getFloat32(), reader.getFloat32());
            bounds.setMin(min);
            bounds.setMax(max);
            mesh.bounds = bounds;
        }
        var boneNames = mesh._boneNames = [];
        var boneCount = reader.getUint16();
        boneNames.length = boneCount;
        for (i = 0; i < boneCount; i++)
            boneNames[i] = LoadModelV05._strings[reader.getUint16()];
        var bindPoseDataStart = reader.getUint32();
        var bindPoseDataLength = reader.getUint32();
        var bindPoseDatas = new Float32Array(arrayBuffer.slice(offset + bindPoseDataStart, offset + bindPoseDataStart + bindPoseDataLength));
        var bindPoseFloatCount = bindPoseDatas.length;
        var bindPoseBuffer = mesh._inverseBindPosesBuffer = new ArrayBuffer(bindPoseFloatCount * 4);
        mesh._inverseBindPoses = [];
        if (bindPoseFloatCount != 0)
            mesh._instanceBufferStateType = Mesh.MESH_INSTANCEBUFFER_TYPE_SIMPLEANIMATOR;
        else
            mesh._instanceBufferStateType = Mesh.MESH_INSTANCEBUFFER_TYPE_NORMAL;
        for (i = 0; i < bindPoseFloatCount; i += 16) {
            var inverseGlobalBindPose = new Matrix4x4(bindPoseDatas[i + 0], bindPoseDatas[i + 1], bindPoseDatas[i + 2], bindPoseDatas[i + 3], bindPoseDatas[i + 4], bindPoseDatas[i + 5], bindPoseDatas[i + 6], bindPoseDatas[i + 7], bindPoseDatas[i + 8], bindPoseDatas[i + 9], bindPoseDatas[i + 10], bindPoseDatas[i + 11], bindPoseDatas[i + 12], bindPoseDatas[i + 13], bindPoseDatas[i + 14], bindPoseDatas[i + 15], new Float32Array(bindPoseBuffer, i * 4, 16));
            mesh._inverseBindPoses[i / 16] = inverseGlobalBindPose;
        }
        return true;
    }
    static READ_SUBMESH() {
        var reader = LoadModelV05._readData;
        var arrayBuffer = reader.__getBuffer();
        var subMesh = new SubMesh(LoadModelV05._mesh);
        reader.getInt16();
        var ibStart = reader.getUint32();
        var ibCount = reader.getUint32();
        var indexBuffer = LoadModelV05._mesh._indexBuffer;
        subMesh._indexBuffer = indexBuffer;
        subMesh._setIndexRange(ibStart, ibCount);
        var vertexBuffer = LoadModelV05._mesh._vertexBuffer;
        subMesh._vertexBuffer = vertexBuffer;
        var offset = LoadModelV05._DATA.offset;
        var subIndexBufferStart = subMesh._subIndexBufferStart;
        var subIndexBufferCount = subMesh._subIndexBufferCount;
        var boneIndicesList = subMesh._boneIndicesList;
        var drawCount = reader.getUint16();
        subIndexBufferStart.length = drawCount;
        subIndexBufferCount.length = drawCount;
        boneIndicesList.length = drawCount;
        var skinnedCache = LoadModelV05._mesh._skinnedMatrixCaches;
        var subMeshIndex = LoadModelV05._subMeshes.length;
        skinnedCache.length = LoadModelV05._mesh._inverseBindPoses.length;
        for (var i = 0; i < drawCount; i++) {
            subIndexBufferStart[i] = reader.getUint32();
            subIndexBufferCount[i] = reader.getUint32();
            var boneDicofs = reader.getUint32();
            var boneDicCount = reader.getUint32();
            var boneIndices = boneIndicesList[i] = new Uint16Array(arrayBuffer.slice(offset + boneDicofs, offset + boneDicofs + boneDicCount));
            for (var j = 0, m = boneIndices.length; j < m; j++) {
                var index = boneIndices[j];
                skinnedCache[index] || (skinnedCache[index] = new skinnedMatrixCache(subMeshIndex, i, j));
            }
        }
        LoadModelV05._subMeshes.push(subMesh);
        return true;
    }
    static READ_MORPH() {
        let reader = LoadModelV05._readData;
        let arrayBuffer = reader.__getBuffer();
        let offset = LoadModelV05._DATA.offset;
        let mesh = LoadModelV05._mesh;
        let morphData = mesh.morphTargetData = new MorphTargetData();
        let morphVertexDecStr = LoadModelV05._strings[reader.getUint16()];
        morphData.vertexDec = VertexMesh.getVertexDeclaration(morphVertexDecStr);
        let bounds = morphData.bounds;
        let min = bounds.getMin();
        let max = bounds.getMax();
        min.set(reader.getFloat32(), reader.getFloat32(), reader.getFloat32());
        max.set(reader.getFloat32(), reader.getFloat32(), reader.getFloat32());
        bounds.setMin(min);
        bounds.setMax(max);
        let channelCount = reader.readUint16();
        for (let channelIndex = 0; channelIndex < channelCount; channelIndex++) {
            let channel = new MorphTargetChannel();
            channel.name = LoadModelV05._strings[reader.getUint16()];
            let targetCount = reader.readUint16();
            for (let targetIndex = 0; targetIndex < targetCount; targetIndex++) {
                let target = new MorphTarget();
                let targetName = LoadModelV05._strings[reader.getUint16()];
                target.name = targetName;
                target.fullWeight = reader.readFloat32();
                let bufferStart = reader.readUint32();
                let bufferLength = reader.readUint32();
                target.data = new Float32Array(arrayBuffer.slice(offset + bufferStart, offset + bufferStart + bufferLength));
                channel.addTarget(target);
            }
            morphData.addMorphChannel(channel);
        }
        morphData.vertexCount = mesh.vertexCount;
        morphData.initData();
        return true;
    }
    static READ_UVSIZE() {
        LoadModelV05._mesh._width = LoadModelV05._readData.readUint16();
        LoadModelV05._mesh._height = LoadModelV05._readData.readUint16();
    }
}
LoadModelV05._BLOCK = { count: 0 };
LoadModelV05._DATA = { offset: 0, size: 0 };
LoadModelV05._strings = [];

//# sourceMappingURL=LoadModelV05.js.map
