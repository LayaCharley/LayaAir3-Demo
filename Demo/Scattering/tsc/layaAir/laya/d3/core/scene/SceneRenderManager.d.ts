import { SingletonList } from "../../../utils/SingletonList";
import { BaseRender } from "../render/BaseRender";
export declare class SceneRenderManager {
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
