import { Component } from "../../components/Component";
import { Sprite3D } from "../core/Sprite3D";
import { Bounds } from "../math/Bounds";
import { IBoundsCell } from "../math/IBoundsCell";
export declare class LODInfo {
    constructor(mincullRate: number);
    set mincullRate(value: number);
    get mincullRate(): number;
    set renders(value: Sprite3D[]);
    get renders(): Sprite3D[];
    addNode(node: Sprite3D): void;
    removeNode(node: Sprite3D): void;
    removeAllRender(): void;
}
export declare class LODGroup extends Component implements IBoundsCell {
    private _needcaculateBounds;
    private _bounds;
    private _size;
    private _lodPosition;
    private _lodCount;
    private _lods;
    private _visialIndex;
    private _nowRate;
    constructor();
    shadowCullPass(): boolean;
    get lods(): LODInfo[];
    set lods(data: LODInfo[]);
    get nowRate(): number;
    get bounds(): Bounds;
    private _applyVisibleRate;
    private _setLODvisible;
    private _setLODinvisible;
}
