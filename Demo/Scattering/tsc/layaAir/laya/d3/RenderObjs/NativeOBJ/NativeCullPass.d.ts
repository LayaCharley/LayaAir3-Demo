import { ICameraCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { ICullPass } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICullPass";
import { ISceneRenderManager } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISceneRenderManager";
import { IShadowCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { SingletonList } from "../../../utils/SingletonList";
import { BaseRender } from "../../core/render/BaseRender";
export declare class NativeCullPassBase implements ICullPass {
    private _nativeObj;
    private _tempRenderList;
    get cullList(): SingletonList<BaseRender>;
    constructor();
    cullByCameraCullInfo(cameraCullInfo: ICameraCullInfo, renderManager: ISceneRenderManager): void;
    cullByShadowCullInfo(cullInfo: IShadowCullInfo, renderManager: ISceneRenderManager): void;
    cullingSpotShadow(cameraCullInfo: ICameraCullInfo, renderManager: ISceneRenderManager): void;
}
