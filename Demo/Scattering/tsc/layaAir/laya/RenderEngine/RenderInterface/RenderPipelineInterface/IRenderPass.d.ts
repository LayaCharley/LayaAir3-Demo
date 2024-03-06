import { SingletonList } from "../../../utils/SingletonList";
import { RenderContext3D } from "../../../d3/core/render/RenderContext3D";
import { IBaseRenderNode } from "./IBaseRenderNode";
import { ICullPass } from "./ICullPass";
import { IRenderQueue } from "./IRenderQueue";
export interface IRenderPass {
    context: RenderContext3D;
    _cullPass: ICullPass;
    setRenderlist(list: SingletonList<IBaseRenderNode>): void;
    applyRenderQueue(queue: IRenderQueue): void;
    update(): void;
    render(): void;
}
