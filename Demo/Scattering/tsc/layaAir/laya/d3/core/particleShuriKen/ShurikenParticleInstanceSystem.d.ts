import { Vector3 } from "../../../maths/Vector3";
import { RenderContext3D } from "../render/RenderContext3D";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
export declare class ShurikenParticleInstanceSystem extends ShurikenParticleSystem {
    private _instanceParticleVertexBuffer;
    private _instanceVertex;
    private _meshIndexCount;
    private _meshFloatCountPreVertex;
    private _floatCountPerParticleData;
    constructor(render: ShurikenParticleRenderer);
    private _initMeshVertex;
    _initBufferDatas(): void;
    protected _retireActiveParticles(): void;
    protected _freeRetiredParticles(): void;
    addParticle(position: Vector3, direction: Vector3, time: number): boolean;
    addNewParticlesToVertexBuffer(): void;
    _updateRenderParams(stage: RenderContext3D): void;
    destroy(): void;
}
