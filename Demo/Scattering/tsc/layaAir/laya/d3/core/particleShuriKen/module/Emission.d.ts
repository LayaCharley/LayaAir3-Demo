import { IClone } from "../../../../utils/IClone";
import { Burst } from "./Burst";
export declare class Emission implements IClone {
    private _emissionRateOverDistance;
    enable: boolean;
    set emissionRate(value: number);
    get emissionRate(): number;
    get emissionRateOverDistance(): number;
    set emissionRateOverDistance(value: number);
    get destroyed(): boolean;
    constructor();
    destroy(): void;
    getBurstsCount(): number;
    getBurstByIndex(index: number): Burst;
    addBurst(burst: Burst): void;
    removeBurst(burst: Burst): void;
    removeBurstByIndex(index: number): void;
    clearBurst(): void;
    cloneTo(destObject: any): void;
    clone(): any;
}
