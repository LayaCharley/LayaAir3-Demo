import { ISceneRenderManager } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISceneRenderManager";
import { SingletonList } from "../../../utils/SingletonList";
import { BaseRender } from "../../core/render/BaseRender";
export declare class NativeSceneRenderManager implements ISceneRenderManager {
    _customUpdateList: SingletonList<BaseRender>;
    _customCullList: SingletonList<BaseRender>;
    private _nativeObj;
    constructor();
    get list(): SingletonList<BaseRender>;
    set list(value: SingletonList<BaseRender>);
    addRenderObject(object: BaseRender): void;
    removeRenderObject(object: BaseRender): void;
    removeMotionObject(object: BaseRender): void;
    updateMotionObjects(): void;
    addMotionObject(object: BaseRender): void;
    destroy(): void;
}
