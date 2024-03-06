import { SingletonList } from "../../../utils/SingletonList";
import { RenderElement } from "../../../d3/core/render/RenderElement";
export interface ISortPass {
    sort(elements: SingletonList<RenderElement>, isTransparent: boolean, left: number, right: number): void;
}
