import { VertexShuriKenParticle } from "./VertexShuriKenParticle";
import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { VertexElementFormat } from "../../../renders/VertexElementFormat";
import { VertexElement } from "../../../renders/VertexElement";
export class VertexShurikenParticleMesh extends VertexShuriKenParticle {
    constructor(cornerTextureCoordinate, positionStartLifeTime, velocity, startColor, startSize, startRotation0, startRotation1, startRotation2, ageAddScale, time, startSpeed, randoms0, randoms1, simulationWorldPostion) {
        super();
        this._cornerTextureCoordinate = cornerTextureCoordinate;
        this._positionStartLifeTime = positionStartLifeTime;
        this._velocity = velocity;
        this._startColor = startColor;
        this._startSize = startSize;
        this._startRotation0 = startRotation0;
        this._startRotation1 = startRotation1;
        this._startRotation2 = startRotation2;
        this._startLifeTime = ageAddScale;
        this._time = time;
        this._startSpeed = startSpeed;
        this._randoms0 = randoms0;
        this._randoms1 = randoms1;
        this._simulationWorldPostion = simulationWorldPostion;
    }
    static __init__() {
        VertexShurikenParticleMesh._vertexDeclaration = new VertexDeclaration(188, [new VertexElement(0, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_POSITION0),
            new VertexElement(12, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_COLOR0),
            new VertexElement(28, VertexElementFormat.Vector2, VertexShuriKenParticle.PARTICLE_TEXTURECOORDINATE0),
            new VertexElement(36, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SHAPEPOSITIONSTARTLIFETIME),
            new VertexElement(52, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_DIRECTIONTIME),
            new VertexElement(68, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_STARTCOLOR0),
            new VertexElement(84, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_STARTSIZE),
            new VertexElement(96, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_STARTROTATION),
            new VertexElement(108, VertexElementFormat.Single, VertexShuriKenParticle.PARTICLE_STARTSPEED),
            new VertexElement(112, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_RANDOM0),
            new VertexElement(128, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_RANDOM1),
            new VertexElement(144, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDPOSTION),
            new VertexElement(156, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDROTATION),
            new VertexElement(172, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SIMULATIONUV)]);
        VertexShurikenParticleMesh._vertexInstanceMeshDeclaration = new VertexDeclaration(36, [
            new VertexElement(0, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_POSITION0),
            new VertexElement(12, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_COLOR0),
            new VertexElement(28, VertexElementFormat.Vector2, VertexShuriKenParticle.PARTICLE_TEXTURECOORDINATE0)
        ]);
        VertexShurikenParticleMesh._vertexInstanceParticleDeclaration = new VertexDeclaration(152, [
            new VertexElement(0, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SHAPEPOSITIONSTARTLIFETIME),
            new VertexElement(16, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_DIRECTIONTIME),
            new VertexElement(32, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_STARTCOLOR0),
            new VertexElement(48, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_STARTSIZE),
            new VertexElement(60, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_STARTROTATION),
            new VertexElement(72, VertexElementFormat.Single, VertexShuriKenParticle.PARTICLE_STARTSPEED),
            new VertexElement(76, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_RANDOM0),
            new VertexElement(92, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_RANDOM1),
            new VertexElement(108, VertexElementFormat.Vector3, VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDPOSTION),
            new VertexElement(120, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SIMULATIONWORLDROTATION),
            new VertexElement(136, VertexElementFormat.Vector4, VertexShuriKenParticle.PARTICLE_SIMULATIONUV)
        ]);
    }
    static get vertexDeclaration() {
        return VertexShurikenParticleMesh._vertexDeclaration;
    }
    static get vertexInstanceMeshDeclaration() {
        return VertexShurikenParticleMesh._vertexInstanceMeshDeclaration;
    }
    static get vertexInstanceParticleDeclaration() {
        return VertexShurikenParticleMesh._vertexInstanceParticleDeclaration;
    }
    get cornerTextureCoordinate() {
        return this._cornerTextureCoordinate;
    }
    get position() {
        return this._positionStartLifeTime;
    }
    get velocity() {
        return this._velocity;
    }
    get startColor() {
        return this._startColor;
    }
    get startSize() {
        return this._startSize;
    }
    get startRotation0() {
        return this._startRotation0;
    }
    get startRotation1() {
        return this._startRotation1;
    }
    get startRotation2() {
        return this._startRotation2;
    }
    get startLifeTime() {
        return this._startLifeTime;
    }
    get time() {
        return this._time;
    }
    get startSpeed() {
        return this._startSpeed;
    }
    get random0() {
        return this._randoms0;
    }
    get random1() {
        return this._randoms1;
    }
    get simulationWorldPostion() {
        return this._simulationWorldPostion;
    }
}

//# sourceMappingURL=VertexShurikenParticleMesh.js.map
