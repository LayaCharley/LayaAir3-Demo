import { Component } from "../../../components/Component";
import { BaseRender } from "../../core/render/BaseRender";
import { Bounds } from "../../math/Bounds";
import { VolumeManager } from "./VolumeManager";
import { Vector3 } from "../../../maths/Vector3";
export declare enum volumeIntersectType {
    contain = 0,
    intersect = 1,
    Disjoint = 2
}
export declare class volumeIntersectInfo {
    type: volumeIntersectType;
    intersectRate: number;
}
export declare class Volume extends Component {
    protected _bounds: Bounds;
    protected _aroundVolumeCacheNum: number;
    protected _aroundVolume: Volume[];
    protected _volumeManager: VolumeManager;
    protected _type: number;
    protected _importance: number;
    constructor();
    get type(): number;
    get boundsMax(): Vector3;
    set boundsMax(value: Vector3);
    set boundsMin(value: Vector3);
    get boundsMin(): Vector3;
    get probePosition(): Vector3;
    get importance(): number;
    set importance(value: number);
    protected _onEnable(): void;
    protected _onDisable(): void;
    _addRenderNode?(renderNode: BaseRender): void;
    _removeRenderNode?(renderNode: BaseRender): void;
    _motionInVolume?(renderNode: BaseRender): void;
    _VolumeChange(): void;
    _reCaculateBoundBox(): void;
}
