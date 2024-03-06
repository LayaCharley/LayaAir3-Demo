import { ShadowCascadesMode } from "./ShadowCascadesMode";
import { LightSprite } from "./LightSprite";
import { Vector3 } from "../../../maths/Vector3";
export declare class DirectionLight extends LightSprite {
    get shadowCascadesMode(): ShadowCascadesMode;
    set shadowCascadesMode(value: ShadowCascadesMode);
    get shadowTwoCascadeSplits(): number;
    set shadowTwoCascadeSplits(value: number);
    get shadowFourCascadeSplits(): Vector3;
    set shadowFourCascadeSplits(value: Vector3);
    constructor();
}
