import { SingletonList } from "../../../../utils/SingletonList";
import { BaseRender } from "../../render/BaseRender";
import { BVHSpatialConfig } from "../bvh/SpatialManager";
import { SceneRenderManager } from "../SceneRenderManager";
import { BVHRenderSpatial } from "./BVHRenderSpatial";
export declare class BVHSceneRenderManager extends SceneRenderManager {
    private _allRenderList;
    constructor(bvhConfig?: BVHSpatialConfig);
    get list(): SingletonList<BaseRender>;
    set list(value: SingletonList<BaseRender>);
    get bvhSpatial(): BVHRenderSpatial;
    get otherList(): SingletonList<BaseRender>;
    addRenderObject(object: BaseRender): void;
    removeRenderObject(object: BaseRender): void;
    removeMotionObject(object: BaseRender): void;
    updateMotionObjects(): void;
    addMotionObject(object: BaseRender): void;
    destroy(): void;
}
