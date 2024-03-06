import { RenderableSprite3D } from "../RenderableSprite3D";
import { ShurikenParticleRenderer } from "./ShurikenParticleRenderer";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
export declare class ShuriKenParticle3D extends RenderableSprite3D {
    get particleSystem(): ShurikenParticleSystem;
    get particleRenderer(): ShurikenParticleRenderer;
    constructor();
    destroy(destroyChild?: boolean): void;
}
