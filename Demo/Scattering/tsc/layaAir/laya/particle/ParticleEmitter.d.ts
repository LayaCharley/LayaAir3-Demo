import { ParticleTemplate2D } from "./ParticleTemplate2D";
export declare class ParticleEmitter {
    private _templet;
    private _timeBetweenParticles;
    private _previousPosition;
    private _timeLeftOver;
    private _tempVelocity;
    private _tempPosition;
    constructor(templet: ParticleTemplate2D, particlesPerSecond: number, initialPosition: Float32Array);
    update(elapsedTime: number, newPosition: Float32Array): void;
}
