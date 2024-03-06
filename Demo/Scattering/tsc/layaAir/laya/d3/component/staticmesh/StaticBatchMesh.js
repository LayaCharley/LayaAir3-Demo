import { LayaGL } from "../../../layagl/LayaGL";
import { Matrix4x4 } from "../../../maths/Matrix4x4";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { BufferState } from "../../../webgl/utils/BufferState";
import { BlinnPhongMaterial } from "../../core/material/BlinnPhongMaterial";
import { Bounds } from "../../math/Bounds";
import { Utils3D } from "../../utils/Utils3D";
import { StaticBatchSubMesh } from "./StaticBatchSubMesh";
const tempMatrix = new Matrix4x4;
const TriangleIndices = [0, 1, 2];
const InvertTriangleIndices = [0, 2, 1];
export class StaticBatchMesh {
    constructor() {
        this._bufferState = new BufferState();
        this._staticSubMeshes = new Map();
        this.bounds = new Bounds();
    }
    static create(info) {
        let staticMesh = new StaticBatchMesh();
        let vertexCount = info.vertexCount;
        let indexCount = info.indexCount;
        let vertexDec = info.vertexDec;
        let vertexFloatStride = vertexDec.vertexStride / 4;
        let vertexData = new ArrayBuffer(vertexDec.vertexStride * vertexCount);
        let vertexFloatArray = new Float32Array(vertexData);
        let mergeIndexFormat = IndexFormat.UInt16;
        let mergeIndexByteCount = 2;
        let indexArray;
        if (vertexCount > 65535) {
            mergeIndexFormat = IndexFormat.UInt32;
            mergeIndexByteCount = 4;
            indexArray = new Uint32Array(indexCount);
        }
        else {
            indexArray = new Uint16Array(indexCount);
        }
        let positionElement = vertexDec.getVertexElementByUsage(VertexMesh.MESH_POSITION0);
        let normalElement = vertexDec.getVertexElementByUsage(VertexMesh.MESH_NORMAL0);
        let lightmapUVElement = vertexDec.getVertexElementByUsage(VertexMesh.MESH_TEXTURECOORDINATE1);
        let tangentElement = vertexDec.getVertexElementByUsage(VertexMesh.MESH_TANGENT0);
        let vertexDataOffset = 0;
        let vertexCountOffset = 0;
        let indexOffset = 0;
        let bounds;
        for (const render of info.renders) {
            let lightmapScaleOffset = render.lightmapScaleOffset;
            if (!bounds) {
                bounds = staticMesh.bounds;
                render.bounds.cloneTo(bounds);
            }
            Bounds.merge(bounds, render.bounds, bounds);
            let sp = render.owner;
            let invertFront = sp.transform._isFrontFaceInvert;
            let worldMat = sp.transform.worldMatrix;
            let normalMat = tempMatrix;
            worldMat.invert(normalMat);
            normalMat.transpose();
            let mesh = render.getMesh();
            let meshVertexCount = mesh.vertexCount;
            let meshIndexCount = mesh.indexCount;
            let meshVertexData = mesh._vertexBuffer.getFloat32Data();
            vertexFloatArray.set(meshVertexData, vertexDataOffset);
            for (let index = 0; index < meshVertexCount; index++) {
                let elementOffset = index * vertexFloatStride;
                for (const element of vertexDec._vertexElements) {
                    elementOffset += element.offset / 4;
                    switch (element.elementUsage) {
                        case VertexMesh.MESH_POSITION0:
                            Utils3D.transformVector3ArrayToVector3ArrayCoordinate(meshVertexData, elementOffset, worldMat, vertexFloatArray, vertexDataOffset + elementOffset);
                            break;
                        case VertexMesh.MESH_NORMAL0:
                        case VertexMesh.MESH_TANGENT0:
                            Utils3D.transformVector3ArrayToVector3ArrayNormal(meshVertexData, elementOffset, normalMat, vertexFloatArray, vertexDataOffset + elementOffset);
                            break;
                        case VertexMesh.MESH_TEXTURECOORDINATE1:
                            Utils3D.transformLightingMapTexcoordArray(meshVertexData, elementOffset, lightmapScaleOffset, vertexFloatArray, vertexDataOffset + elementOffset);
                            break;
                    }
                }
            }
            let meshIndexData = mesh._indexBuffer.getData();
            let triangleIndices = invertFront ? InvertTriangleIndices : TriangleIndices;
            for (let index = 0; index < meshIndexCount; index += 3) {
                indexArray[indexOffset + index] = meshIndexData[index + triangleIndices[0]] + vertexCountOffset;
                indexArray[indexOffset + index + 1] = meshIndexData[index + triangleIndices[1]] + vertexCountOffset;
                indexArray[indexOffset + index + 2] = meshIndexData[index + triangleIndices[2]] + vertexCountOffset;
            }
            let subMeshCount = mesh.subMeshCount;
            for (let index = 0; index < subMeshCount; index++) {
                let material = render.sharedMaterials[index] || BlinnPhongMaterial.defaultMaterial;
                let staticSubMesh = staticMesh._staticSubMeshes.get(material);
                if (!staticSubMesh) {
                    staticSubMesh = new StaticBatchSubMesh();
                    staticSubMesh.indexByteCount = mergeIndexByteCount;
                    staticMesh._staticSubMeshes.set(material, staticSubMesh);
                    staticSubMesh.bufferState = staticMesh._bufferState;
                    staticSubMesh.indexFormat = mergeIndexFormat;
                }
                let subMesh = mesh.getSubMesh(index);
                staticSubMesh.addSubMesh(subMesh.indexCount, subMesh._indexStart + indexOffset, render.bounds);
            }
            vertexDataOffset += meshVertexData.length;
            vertexCountOffset += meshVertexCount;
            indexOffset += meshIndexData.length;
        }
        let vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vertexData.byteLength, BufferUsage.Static, false);
        vertexBuffer.vertexDeclaration = vertexDec;
        vertexBuffer.setData(vertexData);
        let indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(mergeIndexFormat, indexCount, BufferUsage.Static, false);
        indexBuffer.setData(indexArray);
        staticMesh.setBuffer(vertexBuffer, indexBuffer);
        return staticMesh;
    }
    setBuffer(vertex, index) {
        let bufferState = this._bufferState;
        this._vertexBuffer = vertex;
        this._indexBuffer = index;
        bufferState.applyState([vertex], index);
    }
    destroy() {
        this._staticSubMeshes.forEach(submesh => {
            submesh.destroy();
        });
        this._staticSubMeshes.clear();
        this._staticSubMeshes = null;
        this._bufferState.destroy();
    }
}

//# sourceMappingURL=StaticBatchMesh.js.map
