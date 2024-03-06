import { BaseRender } from "../../render/BaseRender";
import { BVHSpatial } from "../bvh/BVHSpatial";
import { BVHRenderBox } from "./BVHRenderSpatialBox";
export declare class BVHRenderSpatial extends BVHSpatial {
    protected _creatChildNode(): BVHRenderBox<BaseRender>;
    cellLegal(cell: BaseRender): boolean;
}
