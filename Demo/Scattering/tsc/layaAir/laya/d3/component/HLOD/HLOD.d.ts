import { Component } from "../../../components/Component";
import { Bounds } from "../../math/Bounds";
import { HLODResourceGroup } from "./HLODUtil";
export declare class HLOD extends Component {
    constructor();
    get bounds(): Bounds;
    set bounds(value: Bounds);
    get lodResource(): HLODResourceGroup[];
    set lodResource(value: HLODResourceGroup[]);
    set lodCullRateArray(value: number[]);
    get lodCullRateArray(): number[];
    private _applyLODResource;
    private _releaseGroupRender;
    onUpdate(): void;
    applyResource(resource: HLODResourceGroup): void;
    onEnable(): void;
    onDisable(): void;
    onDestroy(): void;
    _cloneTo(dest: HLOD): void;
}
