import { ParticleTemplate2D } from "./ParticleTemplate2D";
import { Sprite } from "../display/Sprite";
import { Context } from "../resource/Context";
import { EmitterBase } from "./emitter/EmitterBase";
export declare class Particle2D extends Sprite {
    private _matrix4;
    private _source;
    private _template;
    private _canvasTemplate;
    private _emitter;
    autoPlay: boolean;
    constructor();
    get source(): string;
    set source(value: string);
    get template(): ParticleTemplate2D;
    set template(value: ParticleTemplate2D);
    get emitter(): EmitterBase;
    init(template: ParticleTemplate2D): void;
    play(): void;
    stop(): void;
    private _loop;
    advanceTime(passedTime?: number): void;
    customRender(context: Context, x: number, y: number): void;
    private reset;
    destroy(destroyChild?: boolean): void;
}
