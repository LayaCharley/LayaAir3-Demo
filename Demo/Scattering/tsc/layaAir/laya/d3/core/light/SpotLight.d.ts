import { LightSprite } from "./LightSprite";
export declare class SpotLight extends LightSprite {
    get spotAngle(): number;
    set spotAngle(value: number);
    get range(): number;
    set range(value: number);
    constructor();
}
