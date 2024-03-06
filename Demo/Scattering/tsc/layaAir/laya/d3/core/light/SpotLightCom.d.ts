import { Light } from "./Light";
export declare class SpotLightCom extends Light {
    get spotAngle(): number;
    set spotAngle(value: number);
    get range(): number;
    set range(value: number);
    constructor();
}
