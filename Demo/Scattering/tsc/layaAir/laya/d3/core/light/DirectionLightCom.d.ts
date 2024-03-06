import { ShadowCascadesMode } from "./ShadowCascadesMode";
import { Light } from "./Light";
import { Vector3 } from "../../../maths/Vector3";
export declare class DirectionLightCom extends Light {
    get shadowCascadesMode(): ShadowCascadesMode;
    set shadowCascadesMode(value: ShadowCascadesMode);
    get shadowTwoCascadeSplits(): number;
    set shadowTwoCascadeSplits(value: number);
    get shadowFourCascadeSplits(): Vector3;
    set shadowFourCascadeSplits(value: Vector3);
    constructor();
}
