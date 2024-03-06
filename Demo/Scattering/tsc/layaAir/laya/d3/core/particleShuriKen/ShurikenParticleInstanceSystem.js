import { LayaGL } from "../../../layagl/LayaGL";
import { MathUtil } from "../../../maths/MathUtil";
import { Vector3 } from "../../../maths/Vector3";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { VertexShuriKenParticle } from "../../graphics/Vertex/VertexShuriKenParticle";
import { VertexShurikenParticleBillboard } from "../../graphics/Vertex/VertexShurikenParticleBillboard";
import { VertexShurikenParticleMesh } from "../../graphics/Vertex/VertexShurikenParticleMesh";
import { ShurikenParticleData } from "./ShurikenParticleData";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
export class ShurikenParticleInstanceSystem extends ShurikenParticleSystem {
    constructor(render) {
        super(render, MeshTopology.Triangles, DrawType.DrawElementInstance);
        this._instanceParticleVertexBuffer = null;
        this._instanceVertex = null;
    }
    _initMeshVertex(vertex, mesh) {
        let meshVertexBuffer = mesh._vertexBuffer;
        let meshVertices = meshVertexBuffer.getFloat32Data();
        let meshVertexDeclaration = meshVertexBuffer.vertexDeclaration;
        let meshPosOffset = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_POSITION0)._offset / 4;
        let colorElement = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_COLOR0);
        let meshColorOffset = colorElement ? colorElement._offset / 4 : -1;
        let uvElement = meshVertexDeclaration.getVertexElementByUsage(VertexMesh.MESH_TEXTURECOORDINATE0);
        let meshUVOffset = uvElement ? uvElement._offset / 4 : -1;
        let meshVertexStride = meshVertexDeclaration.vertexStride / 4;
        let meshVertexIndex = 0;
        let vertexCount = mesh.vertexCount;
        let perParticleDataCount = this._vertexBuffer.vertexDeclaration.vertexStride / 4;
        for (let index = 0; index < vertexCount; index++) {
            let startIndex = index * perParticleDataCount;
            let indexOffset = startIndex;
            let vertexOffset = meshVertexStride * meshVertexIndex++;
            let positionOffset = vertexOffset + meshPosOffset;
            vertex[indexOffset++] = meshVertices[positionOffset++];
            vertex[indexOffset++] = meshVertices[positionOffset++];
            vertex[indexOffset++] = meshVertices[positionOffset++];
            if (meshColorOffset == -1) {
                vertex[indexOffset++] = 1;
                vertex[indexOffset++] = 1;
                vertex[indexOffset++] = 1;
                vertex[indexOffset++] = 1;
            }
            else {
                let colorOffset = vertexOffset + meshColorOffset;
                vertex[indexOffset++] = meshVertices[colorOffset++];
                vertex[indexOffset++] = meshVertices[colorOffset++];
                vertex[indexOffset++] = meshVertices[colorOffset++];
                vertex[indexOffset++] = meshVertices[colorOffset++];
            }
            if (meshUVOffset == -1) {
                vertex[indexOffset++] = 0;
                vertex[indexOffset++] = 0;
            }
            else {
                let uvOffset = vertexOffset + meshUVOffset;
                vertex[indexOffset++] = meshVertices[uvOffset++];
                vertex[indexOffset++] = meshVertices[uvOffset++];
            }
        }
    }
    _initBufferDatas() {
        if (this._vertexBuffer) {
            this._vertexBuffer.destroy();
            this._instanceParticleVertexBuffer.destroy();
            this._indexBuffer.destroy();
        }
        let render = this._ownerRender;
        let renderMode = render.renderMode;
        if (renderMode == -1 || this.maxParticles <= 0) {
            return;
        }
        if (renderMode == 4) {
            let mesh = render.mesh;
            if (mesh) {
                let meshDeclaration = VertexShurikenParticleMesh.vertexInstanceMeshDeclaration;
                let particleDeclaration = VertexShurikenParticleMesh.vertexInstanceParticleDeclaration;
                this._meshIndexCount = mesh.indexCount;
                this._simulationUV_Index = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SIMULATIONUV).offset / 4;
                this._floatCountPerParticleData = particleDeclaration.vertexStride / 4;
                this._startLifeTimeIndex = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SHAPEPOSITIONSTARTLIFETIME)._offset / 4 + 3;
                this._timeIndex = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_DIRECTIONTIME)._offset / 4 + 3;
                let indexCount = mesh.indexCount;
                this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(mesh.indexFormat, indexCount, BufferUsage.Static, false);
                this._indexBuffer.setData(mesh._indexBuffer.getData());
                let meshVertexCount = mesh.vertexCount;
                let vbSize = meshDeclaration.vertexStride * meshVertexCount;
                this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(vbSize, BufferUsage.Static, false);
                this._vertexBuffer.vertexDeclaration = meshDeclaration;
                let meshVertex = new Float32Array(vbSize / 4);
                this._initMeshVertex(meshVertex, mesh);
                this._vertexBuffer.setData(meshVertex.buffer);
                let particleCount = this._bufferMaxParticles;
                let particleVbSize = particleCount * particleDeclaration.vertexStride;
                this._instanceVertex = new Float32Array(particleVbSize / 4);
                this._instanceParticleVertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(particleVbSize, BufferUsage.Dynamic, false);
                this._instanceParticleVertexBuffer.vertexDeclaration = particleDeclaration;
                this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer);
                this._instanceParticleVertexBuffer.instanceBuffer = true;
                this._bufferState.applyState([this._vertexBuffer, this._instanceParticleVertexBuffer], this._indexBuffer);
            }
        }
        else {
            let billboardDeclaration = VertexShurikenParticleBillboard.vertexInstanceMeshDeclaration;
            let particleDeclaration = VertexShurikenParticleBillboard.vertexInstanceParticleDeclaration;
            this._meshIndexCount = 6;
            this._simulationUV_Index = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SIMULATIONUV).offset / 4;
            this._floatCountPerParticleData = particleDeclaration.vertexStride / 4;
            this._startLifeTimeIndex = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_SHAPEPOSITIONSTARTLIFETIME)._offset / 4 + 3;
            this._timeIndex = particleDeclaration.getVertexElementByUsage(VertexShuriKenParticle.PARTICLE_DIRECTIONTIME)._offset / 4 + 3;
            let indexArray = VertexShurikenParticleBillboard.billboardIndexArray;
            let indexCount = indexArray.length;
            this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, indexCount, BufferUsage.Static, false);
            this._indexBuffer.setData(indexArray);
            let meshVBSize = this._meshIndexCount * billboardDeclaration.vertexStride;
            this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(meshVBSize, BufferUsage.Static, false);
            this._vertexBuffer.vertexDeclaration = billboardDeclaration;
            this._vertexBuffer.setData(VertexShurikenParticleBillboard.billboardVertexArray.buffer);
            let particleCount = this._bufferMaxParticles;
            let particleVbSize = particleCount * particleDeclaration.vertexStride;
            this._instanceVertex = new Float32Array(particleVbSize / 4);
            this._instanceParticleVertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(particleVbSize, BufferUsage.Dynamic, false);
            this._instanceParticleVertexBuffer.vertexDeclaration = particleDeclaration;
            this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer);
            this._instanceParticleVertexBuffer.instanceBuffer = true;
            this._bufferState.applyState([this._vertexBuffer, this._instanceParticleVertexBuffer], this._indexBuffer);
        }
    }
    _retireActiveParticles() {
        const epsilon = 0.0001;
        let firstActive = this._firstActiveElement;
        while (this._firstActiveElement != this._firstNewElement) {
            let index = this._firstActiveElement * this._floatCountPerParticleData;
            let timeIndex = index + this._timeIndex;
            let particleAge = this._currentTime - this._instanceVertex[timeIndex];
            if (particleAge + epsilon < this._instanceVertex[index + this._startLifeTimeIndex]) {
                break;
            }
            this._instanceVertex[timeIndex] = this._drawCounter;
            this._firstActiveElement++;
            if (this._firstActiveElement >= this._bufferMaxParticles) {
                this._firstActiveElement = 0;
            }
        }
        if (this._firstActiveElement != firstActive) {
            let byteStride = this._floatCountPerParticleData * 4;
            if (this._firstActiveElement < this._firstFreeElement) {
                let activeStart = this._firstActiveElement * byteStride;
                this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, 0, activeStart, (this._firstFreeElement - this._firstActiveElement) * byteStride);
            }
            else {
                let start = this._firstActiveElement * byteStride;
                let a = this._bufferMaxParticles - this._firstActiveElement;
                this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, 0, start, a * byteStride);
                if (this._firstFreeElement > 0) {
                    this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, a * byteStride, 0, this._firstFreeElement * byteStride);
                }
            }
        }
    }
    _freeRetiredParticles() {
        while (this._firstRetiredElement != this._firstActiveElement) {
            let age = this._drawCounter - this._instanceVertex[this._firstRetiredElement * this._floatCountPerParticleData + this._timeIndex];
            if (false)
                if (age < 3)
                    break;
            this._firstRetiredElement++;
            if (this._firstRetiredElement >= this._bufferMaxParticles)
                this._firstRetiredElement = 0;
        }
    }
    addParticle(position, direction, time) {
        Vector3.normalize(direction, direction);
        let nextFreeParticle = this._firstFreeElement + 1;
        if (nextFreeParticle >= this._bufferMaxParticles) {
            nextFreeParticle = 0;
        }
        if (nextFreeParticle == this._firstRetiredElement) {
            return false;
        }
        let transform = this._owner.transform;
        ShurikenParticleData.create(this, this._ownerRender);
        let particleAge = this._currentTime - time;
        if (particleAge >= ShurikenParticleData.startLifeTime) {
            return true;
        }
        let pos, rot;
        if (this.simulationSpace == 0) {
            pos = transform.position;
            rot = transform.rotation;
        }
        let startSpeed = 0;
        switch (this.startSpeedType) {
            case 0:
                startSpeed = this.startSpeedConstant;
                break;
            case 2:
                if (this.autoRandomSeed) {
                    startSpeed = MathUtil.lerp(this.startSpeedConstantMin, this.startSpeedConstantMax, Math.random());
                }
                else {
                    this._rand.seed = this._randomSeeds[8];
                    startSpeed = MathUtil.lerp(this.startSpeedConstantMin, this.startSpeedConstantMax, this._rand.getFloat());
                    this._randomSeeds[8] = this._rand.seed;
                }
                break;
        }
        let randomVelocityX, randomVelocityY, randomVelocityZ;
        let needRandomVelocity = this._velocityOverLifetime && this._velocityOverLifetime.enable;
        if (needRandomVelocity) {
            let velocityType = this._velocityOverLifetime.velocity.type;
            if (velocityType == 2 || velocityType == 3) {
                if (this.autoRandomSeed) {
                    randomVelocityX = Math.random();
                    randomVelocityY = Math.random();
                    randomVelocityZ = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[9];
                    randomVelocityX = this._rand.getFloat();
                    randomVelocityY = this._rand.getFloat();
                    randomVelocityZ = this._rand.getFloat();
                    this._randomSeeds[9] = this._rand.seed;
                }
            }
            else {
                needRandomVelocity = false;
            }
        }
        else {
            needRandomVelocity = false;
        }
        let randomColor;
        let needRandomColor = this._colorOverLifetime && this._colorOverLifetime.enable;
        if (needRandomColor) {
            let colorType = this._colorOverLifetime.color.type;
            if (colorType == 3) {
                if (this.autoRandomSeed) {
                    randomColor = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[10];
                    randomColor = this._rand.getFloat();
                    this._randomSeeds[10] = this._rand.seed;
                }
            }
            else {
                needRandomColor = false;
            }
        }
        else {
            needRandomColor = false;
        }
        let randomSize;
        let needRandomSize = this._sizeOverLifetime && this._sizeOverLifetime.enable;
        if (needRandomSize) {
            let sizeType = this._sizeOverLifetime.size.type;
            if (sizeType == 3) {
                if (this.autoRandomSeed) {
                    randomSize = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[11];
                    randomSize = this._rand.getFloat();
                    this.randomSeed[11] = this._rand.seed;
                }
            }
            else {
                needRandomSize = false;
            }
        }
        else {
            needRandomSize = false;
        }
        let randomRotation;
        let needRandomRotation = this._rotationOverLifetime && this._rotationOverLifetime.enable;
        if (needRandomRotation) {
            let rotationType = this._rotationOverLifetime.angularVelocity.type;
            if (rotationType == 2 || rotationType == 3) {
                if (this.autoRandomSeed) {
                    randomRotation = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[12];
                    randomRotation = this._rand.getFloat();
                    this._randomSeeds[12] = this._rand.seed;
                }
            }
            else {
                needRandomRotation = false;
            }
        }
        else {
            needRandomRotation = false;
        }
        let randomTextureAnimation;
        let needRandomTextureAnimation = this._textureSheetAnimation && this._textureSheetAnimation.enable;
        if (needRandomTextureAnimation) {
            let textureAnimationType = this._textureSheetAnimation.frame.type;
            if (textureAnimationType == 3) {
                if (this.autoRandomSeed) {
                    randomTextureAnimation = Math.random();
                }
                else {
                    this._rand.seed = this._randomSeeds[15];
                    randomTextureAnimation = this._rand.getFloat();
                    this._randomSeeds[15] = this._rand.seed;
                }
            }
            else {
                needRandomTextureAnimation = false;
            }
        }
        else {
            needRandomTextureAnimation = false;
        }
        let subU = ShurikenParticleData.startUVInfo[0];
        let subV = ShurikenParticleData.startUVInfo[1];
        let startU = ShurikenParticleData.startUVInfo[2];
        let startV = ShurikenParticleData.startUVInfo[3];
        let render = this._ownerRender;
        if (render.renderMode == 4) {
        }
        else {
        }
        let startIndex = this._firstFreeElement * this._floatCountPerParticleData;
        let offset = startIndex;
        this._instanceVertex[offset++] = position.x;
        this._instanceVertex[offset++] = position.y;
        this._instanceVertex[offset++] = position.z;
        this._instanceVertex[offset++] = ShurikenParticleData.startLifeTime;
        this._instanceVertex[offset++] = direction.x;
        this._instanceVertex[offset++] = direction.y;
        this._instanceVertex[offset++] = direction.z;
        this._instanceVertex[offset++] = time;
        this._instanceVertex[offset++] = ShurikenParticleData.startColor.x;
        this._instanceVertex[offset++] = ShurikenParticleData.startColor.y;
        this._instanceVertex[offset++] = ShurikenParticleData.startColor.z;
        this._instanceVertex[offset++] = ShurikenParticleData.startColor.w;
        this._instanceVertex[offset++] = ShurikenParticleData.startSize[0];
        this._instanceVertex[offset++] = ShurikenParticleData.startSize[1];
        this._instanceVertex[offset++] = ShurikenParticleData.startSize[2];
        this._instanceVertex[offset++] = ShurikenParticleData.startRotation[0];
        this._instanceVertex[offset++] = ShurikenParticleData.startRotation[1];
        this._instanceVertex[offset++] = ShurikenParticleData.startRotation[2];
        this._instanceVertex[offset++] = startSpeed;
        needRandomColor && (this._instanceVertex[offset + 1] = randomColor);
        needRandomSize && (this._instanceVertex[offset + 2] = randomSize);
        needRandomRotation && (this._instanceVertex[offset + 3] = randomRotation);
        needRandomTextureAnimation && (this._instanceVertex[offset + 4] = randomTextureAnimation);
        if (needRandomVelocity) {
            this._instanceVertex[offset + 5] = randomVelocityX;
            this._instanceVertex[offset + 6] = randomVelocityY;
            this._instanceVertex[offset + 7] = randomVelocityZ;
        }
        switch (this.simulationSpace) {
            case 0:
                offset += 8;
                this._instanceVertex[offset++] = pos.x;
                this._instanceVertex[offset++] = pos.y;
                this._instanceVertex[offset++] = pos.z;
                this._instanceVertex[offset++] = rot.x;
                this._instanceVertex[offset++] = rot.y;
                this._instanceVertex[offset++] = rot.z;
                this._instanceVertex[offset++] = rot.w;
                break;
            case 1:
                break;
            default:
                throw new Error("ShurikenParticleMaterial: SimulationSpace value is invalid.");
        }
        offset = startIndex + this._simulationUV_Index;
        this._instanceVertex[offset++] = startU;
        this._instanceVertex[offset++] = startV;
        this._instanceVertex[offset++] = subU;
        this._instanceVertex[offset++] = subV;
        this._firstFreeElement = nextFreeParticle;
        return true;
    }
    addNewParticlesToVertexBuffer() {
        let byteStride = this._floatCountPerParticleData * 4;
        if (this._firstActiveElement < this._firstFreeElement) {
            let start = this._firstActiveElement * byteStride;
            this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, 0, start, (this._firstFreeElement - this._firstActiveElement) * byteStride);
        }
        else {
            let start = this._firstActiveElement * byteStride;
            let a = this._bufferMaxParticles - this._firstActiveElement;
            this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, 0, start, a * byteStride);
            if (this._firstFreeElement > 0) {
                this._instanceParticleVertexBuffer.setData(this._instanceVertex.buffer, a * byteStride, 0, this._firstFreeElement * byteStride);
            }
        }
        this._firstNewElement = this._firstFreeElement;
    }
    _updateRenderParams(stage) {
        this.clearRenderParams();
        if (this._firstActiveElement < this._firstFreeElement) {
            let indexCount = this._firstFreeElement - this._firstActiveElement;
            this.setDrawElemenParams(this._meshIndexCount, 0);
            this.instanceCount = indexCount;
        }
        else {
            let indexCount = this._bufferMaxParticles - this._firstActiveElement;
            if (this._firstFreeElement > 0) {
                indexCount += this._firstFreeElement;
            }
            this.setDrawElemenParams(this._meshIndexCount, 0);
            this.instanceCount = indexCount;
        }
    }
    destroy() {
        super.destroy();
        if (this._indexBuffer) {
            this._indexBuffer.destroy();
        }
        if (this._vertexBuffer) {
            this._vertexBuffer.destroy();
        }
        if (this._instanceParticleVertexBuffer) {
            this._instanceParticleVertexBuffer.destroy();
        }
        this._instanceVertex = null;
        this._meshIndexCount = null;
        this._meshFloatCountPreVertex = null;
    }
}

//# sourceMappingURL=ShurikenParticleInstanceSystem.js.map
