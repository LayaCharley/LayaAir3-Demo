import { ParticleTemplate2D } from "../ParticleTemplate2D";
export declare class EmitterBase {
    protected _frameTime: number;
    protected _emissionRate: number;
    protected _emissionTime: number;
    minEmissionTime: number;
    set particleTemplate(particleTemplate: ParticleTemplate2D);
    set emissionRate(_emissionRate: number);
    get emissionRate(): number;
    start(duration?: number): void;
    stop(): void;
    clear(): void;
    emit(): void;
    advanceTime(passedTime?: number): void;
}
