import { SingletonList } from "../../../utils/SingletonList";
import { BaseRender } from "../../core/render/BaseRender";
import { IVolumeManager } from "./IVolumeManager";
import { ReflectionProbeManager } from "./reflectionProbe/ReflectionProbeManager";
import { Volume } from "./Volume";
import { VolumetricGIManager } from "./VolumetricGI/VolumetricGIManager";
export declare class VolumeManager implements IVolumeManager {
    static ReflectionProbeVolumeType: number;
    static VolumetricGIType: number;
    private _regVolumeManager;
    _volumetricGIManager: VolumetricGIManager;
    constructor();
    get reflectionProbeManager(): ReflectionProbeManager;
    get volumetricGIManager(): VolumetricGIManager;
    add(volume: Volume): void;
    remove(volume: Volume): void;
    addMotionObject(renderObj: BaseRender): void;
    removeMotionObject(renderObj: BaseRender): void;
    _updateRenderObject(baseRender: BaseRender): void;
    reCaculateAllRenderObjects(baseRenders: SingletonList<BaseRender>): void;
    needreCaculateAllRenderObjects(): boolean;
}
