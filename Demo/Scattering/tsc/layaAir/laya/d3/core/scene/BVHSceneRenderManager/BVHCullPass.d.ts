import { ICameraCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { ISceneRenderManager } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISceneRenderManager";
import { IShadowCullInfo } from "../../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { SingletonList } from "../../../../utils/SingletonList";
import { CullPassBase } from "../../../RenderObjs/RenderObj/CullPass";
import { BaseRender } from "../../render/BaseRender";
import { BVHSceneRenderManager } from "./BVHSceneRenderManager";
export declare class BVHCullPass extends CullPassBase {
    protected _cullList: SingletonList<BaseRender>;
    get cullList(): SingletonList<BaseRender>;
    cullByCameraCullInfo(cameraCullInfo: ICameraCullInfo, renderManager: BVHSceneRenderManager): void;
    cullByShadowCullInfo(cullInfo: IShadowCullInfo, renderManager: BVHSceneRenderManager): void;
    cullingSpotShadow(cameraCullInfo: ICameraCullInfo, renderManager: ISceneRenderManager): void;
}
