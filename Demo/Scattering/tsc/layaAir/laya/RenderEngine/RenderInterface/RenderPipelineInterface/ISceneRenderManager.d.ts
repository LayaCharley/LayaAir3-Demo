import { BaseRender } from "../../../d3/core/render/BaseRender";
import { SingletonList } from "../../../utils/SingletonList";
export interface ISceneRenderManager {
    list: SingletonList<BaseRender>;
    addRenderObject(object: BaseRender): void;
    removeRenderObject(object: BaseRender): void;
    removeMotionObject(object: BaseRender): void;
    addMotionObject(object: BaseRender): void;
    updateMotionObjects(): void;
    destroy(): void;
}
