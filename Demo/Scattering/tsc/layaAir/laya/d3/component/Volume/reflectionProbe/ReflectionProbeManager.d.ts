import { BaseRender } from "../../../core/render/BaseRender";
import { IVolumeManager } from "../IVolumeManager";
import { ReflectionProbe } from "./ReflectionProbe";
export declare class ReflectionProbeManager implements IVolumeManager {
    constructor();
    set sceneReflectionProbe(value: ReflectionProbe);
    get sceneReflectionProbe(): ReflectionProbe;
    _updateRenderObject(baseRender: BaseRender): void;
}
