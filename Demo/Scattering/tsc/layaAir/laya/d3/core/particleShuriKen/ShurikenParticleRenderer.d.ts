import { Mesh } from "../../resource/models/Mesh";
import { BaseRender } from "../render/BaseRender";
import { ShurikenParticleSystem } from "./ShurikenParticleSystem";
import { Bounds } from "../../math/Bounds";
export declare class ShurikenParticleRenderer extends BaseRender {
    private _dragConstant;
    _particleSystem: ShurikenParticleSystem;
    stretchedBillboardCameraSpeedScale: number;
    stretchedBillboardSpeedScale: number;
    stretchedBillboardLengthScale: number;
    get particleSystem(): ShurikenParticleSystem;
    get renderMode(): number;
    set renderMode(value: number);
    get mesh(): Mesh;
    set mesh(value: Mesh);
    constructor();
    protected _getcommonUniformMap(): Array<string>;
    protected _onAdded(): void;
    protected _onEnable(): void;
    protected _onDisable(): void;
    get bounds(): Bounds;
    protected _onDestroy(): void;
}
