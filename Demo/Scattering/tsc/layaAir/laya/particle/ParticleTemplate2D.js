import { ParticleShaderValue } from "./shader/value/ParticleShaderValue";
import { ILaya } from "../../ILaya";
import { BlendMode } from "../webgl/canvas/BlendMode";
import { MeshParticle2D } from "../webgl/utils/MeshParticle2D";
import { RenderStateContext } from "../RenderEngine/RenderStateContext";
import { LayaGL } from "../layagl/LayaGL";
import { MeshTopology } from "../RenderEngine/RenderEnum/RenderPologyMode";
import { IndexFormat } from "../RenderEngine/RenderEnum/IndexFormat";
import { Resource } from "../resource/Resource";
import { ParticleData } from "./ParticleData";
export class ParticleTemplate2D extends Resource {
    constructor(settings, texture) {
        super();
        this._floatCountPerVertex = 29;
        this._firstActiveElement = 0;
        this._firstNewElement = 0;
        this._firstFreeElement = 0;
        this._firstRetiredElement = 0;
        this._currentTime = 0;
        this.x = 0;
        this.y = 0;
        this.sv = new ParticleShaderValue();
        this._key = {};
        this.settings = settings;
        this.texture = texture;
        this.texture._addReference();
        this.sv.u_Duration = this.settings.duration;
        this.sv.u_Gravity = this.settings.gravity;
        this.sv.u_EndVelocity = this.settings.endVelocity;
        this._blendFn = BlendMode.fns[settings.blendState];
        this._mesh = MeshParticle2D.getAMesh(this.settings.maxPartices);
        this.initialize();
    }
    getRenderType() { return -111; }
    releaseRender() { }
    initialize() {
        var floatStride = 0;
        this._vertices = this._mesh._vb.getFloat32Array();
        floatStride = this._mesh._stride / 4;
        var bufi = 0;
        var bufStart = 0;
        for (var i = 0; i < this.settings.maxPartices; i++) {
            var random = Math.random();
            var cornerYSegement = this.settings.textureCount ? 1.0 / this.settings.textureCount : 1.0;
            var cornerY;
            for (cornerY = 0; cornerY < this.settings.textureCount; cornerY += cornerYSegement) {
                if (random < cornerY + cornerYSegement)
                    break;
            }
            this._vertices[bufi++] = -1;
            this._vertices[bufi++] = -1;
            this._vertices[bufi++] = 0;
            this._vertices[bufi++] = cornerY;
            bufi = (bufStart += floatStride);
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = -1;
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = cornerY;
            bufi = bufStart += floatStride;
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = cornerY + cornerYSegement;
            bufi = bufStart += floatStride;
            this._vertices[bufi++] = -1;
            this._vertices[bufi++] = 1;
            this._vertices[bufi++] = 0;
            this._vertices[bufi++] = cornerY + cornerYSegement;
            bufi = bufStart += floatStride;
        }
    }
    addParticleArray(position, velocity) {
        position[0] += this.x;
        position[1] += this.y;
        var nextFreeParticle = this._firstFreeElement + 1;
        if (nextFreeParticle >= this.settings.maxPartices)
            nextFreeParticle = 0;
        if (nextFreeParticle === this._firstRetiredElement)
            return;
        var particleData = ParticleData.create(this.settings, position, velocity, this._currentTime);
        var startIndex = this._firstFreeElement * this._floatCountPerVertex * 4;
        for (var i = 0; i < 4; i++) {
            var j, offset;
            for (j = 0, offset = 4; j < 3; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.position[j];
            for (j = 0, offset = 7; j < 3; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.velocity[j];
            for (j = 0, offset = 10; j < 4; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.startColor[j];
            for (j = 0, offset = 14; j < 4; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.endColor[j];
            for (j = 0, offset = 18; j < 3; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.sizeRotation[j];
            for (j = 0, offset = 21; j < 2; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.radius[j];
            for (j = 0, offset = 23; j < 4; j++)
                this._vertices[startIndex + i * this._floatCountPerVertex + offset + j] = particleData.radian[j];
            this._vertices[startIndex + i * this._floatCountPerVertex + 27] = particleData.durationAddScale;
            this._vertices[startIndex + i * this._floatCountPerVertex + 28] = particleData.time;
        }
        this._firstFreeElement = nextFreeParticle;
    }
    addNewParticlesToVertexBuffer() {
        var _vertexBuffer2D = this._mesh._vb;
        _vertexBuffer2D.buffer2D.clear();
        _vertexBuffer2D.buffer2D.append(this._vertices);
        var start;
        if (this._firstNewElement < this._firstFreeElement) {
            start = this._firstNewElement * 4 * this._floatCountPerVertex * 4;
            _vertexBuffer2D.buffer2D.subUpload(start, start, start + (this._firstFreeElement - this._firstNewElement) * 4 * this._floatCountPerVertex * 4);
        }
        else {
            start = this._firstNewElement * 4 * this._floatCountPerVertex * 4;
            _vertexBuffer2D.buffer2D.subUpload(start, start, start + (this.settings.maxPartices - this._firstNewElement) * 4 * this._floatCountPerVertex * 4);
            if (this._firstFreeElement > 0) {
                _vertexBuffer2D.buffer2D.setNeedUpload();
                _vertexBuffer2D.buffer2D.subUpload(0, 0, this._firstFreeElement * 4 * this._floatCountPerVertex * 4);
            }
        }
        this._firstNewElement = this._firstFreeElement;
    }
    renderSubmit() {
        if (this.texture && this.texture.valid) {
            this.update(ILaya.timer._delta);
            this.sv.u_CurrentTime = this._currentTime;
            if (this._firstNewElement != this._firstFreeElement) {
                this.addNewParticlesToVertexBuffer();
            }
            this.blend();
            if (this._firstActiveElement != this._firstFreeElement) {
                this._mesh.useMesh();
                this.sv.u_texture = this.texture._getSource();
                this.sv.upload();
                if (this._firstActiveElement < this._firstFreeElement) {
                    LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, (this._firstFreeElement - this._firstActiveElement) * 6, IndexFormat.UInt16, this._firstActiveElement * 6 * 2);
                }
                else {
                    LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, (this.settings.maxPartices - this._firstActiveElement) * 6, IndexFormat.UInt16, this._firstActiveElement * 6 * 2);
                    if (this._firstFreeElement > 0)
                        LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, this._firstFreeElement * 6, IndexFormat.UInt16, 0);
                }
            }
            this._drawCounter++;
        }
        return 1;
    }
    updateParticleForNative() {
        if (this.texture && this.texture.valid) {
            this.update(ILaya.timer._delta);
            this.sv.u_CurrentTime = this._currentTime;
            if (this._firstNewElement != this._firstFreeElement) {
                this._firstNewElement = this._firstFreeElement;
            }
        }
    }
    update(elapsedTime) {
        this._currentTime += elapsedTime / 1000;
        this.retireActiveParticles();
        this.freeRetiredParticles();
        if (this._firstActiveElement == this._firstFreeElement)
            this._currentTime = 0;
        if (this._firstRetiredElement == this._firstActiveElement)
            this._drawCounter = 0;
    }
    retireActiveParticles() {
        const epsilon = 0.0001;
        var particleDuration = this.settings.duration;
        while (this._firstActiveElement != this._firstNewElement) {
            var offset = this._firstActiveElement * this._floatCountPerVertex * 4;
            var index = offset + 28;
            var particleAge = this._currentTime - this._vertices[index];
            particleAge *= (1.0 + this._vertices[offset + 27]);
            if (particleAge + epsilon < particleDuration)
                break;
            this._vertices[index] = this._drawCounter;
            this._firstActiveElement++;
            if (this._firstActiveElement >= this.settings.maxPartices)
                this._firstActiveElement = 0;
        }
    }
    freeRetiredParticles() {
        while (this._firstRetiredElement != this._firstActiveElement) {
            var age = this._drawCounter - this._vertices[this._firstRetiredElement * this._floatCountPerVertex * 4 + 28];
            if (age < 3)
                break;
            this._firstRetiredElement++;
            if (this._firstRetiredElement >= this.settings.maxPartices)
                this._firstRetiredElement = 0;
        }
    }
    getMesh() {
        return this._mesh;
    }
    getConchMesh() {
        return this._conchMesh;
    }
    getFirstNewElement() {
        return this._firstNewElement;
    }
    getFirstFreeElement() {
        return this._firstFreeElement;
    }
    getFirstActiveElement() {
        return this._firstActiveElement;
    }
    getFirstRetiredElement() {
        return this._firstRetiredElement;
    }
    setFirstFreeElement(_value) {
        this._firstFreeElement = _value;
    }
    setFirstNewElement(_value) {
        this._firstNewElement = _value;
    }
    addDrawCounter() {
        this._drawCounter++;
    }
    blend() {
        if (BlendMode.activeBlendFunction !== this._blendFn) {
            RenderStateContext.setBlend(true);
            this._blendFn();
            BlendMode.activeBlendFunction = this._blendFn;
        }
    }
    _disposeResource() {
        this.texture._removeReference();
        this._mesh.releaseMesh();
    }
}
ParticleTemplate2D.activeBlendType = -1;

//# sourceMappingURL=ParticleTemplate2D.js.map
