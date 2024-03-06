import { EmitterBase } from "./EmitterBase";
import { ParticleSetting } from "../ParticleSetting";
import { ParticleTemplate2D } from "../ParticleTemplate2D";
export declare class Emitter2D extends EmitterBase {
    setting: ParticleSetting;
    private _posRange;
    private _emitFun;
    constructor(_template: ParticleTemplate2D);
    set template(template: ParticleTemplate2D);
    get template(): ParticleTemplate2D;
    emit(): void;
    getRandom(value: number): number;
    webGLEmit(): void;
    canvasEmit(): void;
}
