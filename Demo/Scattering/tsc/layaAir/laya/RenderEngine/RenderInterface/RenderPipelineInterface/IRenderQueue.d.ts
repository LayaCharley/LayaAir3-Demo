import { RenderContext3D } from "../../../d3/core/render/RenderContext3D";
import { RenderElement } from "../../../d3/core/render/RenderElement";
export interface IRenderQueue {
    _isTransparent: boolean;
    renderQueue(context: RenderContext3D): number;
    addRenderElement(renderElement: RenderElement): void;
    clear(): void;
    destroy(): void;
}
