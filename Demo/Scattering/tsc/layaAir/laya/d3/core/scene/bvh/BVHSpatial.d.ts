import { ICameraCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { IShadowCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { SingletonList } from "../../../../utils/SingletonList";
import { BoundFrustum } from "../../../math/BoundFrustum";
import { IBoundsCell } from "../../../math/IBoundsCell";
import { BVHSpatialBox } from "./BVHSpatialBox";
import { BVHSpatialConfig, BVHSpatialManager } from "./SpatialManager";
export declare class BVHSpatial {
    protected _creatChildNode(): BVHSpatialBox<IBoundsCell>;
    constructor(bvhConfig?: BVHSpatialConfig, bvhManager?: BVHSpatialManager);
    get bvhSpatialBox(): BVHSpatialBox<IBoundsCell>;
    cellLegal(cell: IBoundsCell): boolean;
    addOne(cell: IBoundsCell): boolean;
    removeOne(cell: IBoundsCell): boolean;
    motionOne(cell: IBoundsCell): void;
    getItemByCameraCullInfo(cameraCullInfo: ICameraCullInfo, out: SingletonList<IBoundsCell>): void;
    getItemByFrustum(frustum: BoundFrustum, out: SingletonList<IBoundsCell>): void;
    getItemBySCI(sci: IShadowCullInfo, out: SingletonList<IBoundsCell>): void;
    update(): void;
    rebuild(): void;
    destroy(): void;
}
