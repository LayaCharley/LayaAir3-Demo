import { ICameraCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { IShadowCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { SingletonList } from "../../../../utils/SingletonList";
import { BaseRender } from "../../render/BaseRender";
import { BVHSpatialBox } from "../bvh/BVHSpatialBox";
export declare class BVHRenderBox<T> extends BVHSpatialBox<T> {
    protected _creatChildNode(): BVHSpatialBox<T>;
    getItemByCameraCullInfo(cameraCullInfo: ICameraCullInfo, out: SingletonList<BaseRender>): void;
    getItemBySCI(sci: IShadowCullInfo, out: SingletonList<BaseRender>): void;
}
