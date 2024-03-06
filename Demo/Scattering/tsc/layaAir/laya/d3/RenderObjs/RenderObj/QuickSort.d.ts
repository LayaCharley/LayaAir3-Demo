import { ISortPass } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISortPass";
import { SingletonList } from "../../../utils/SingletonList";
import { RenderElement } from "../../core/render/RenderElement";
export declare class QuickSort implements ISortPass {
    private elementArray;
    private isTransparent;
    sort(elements: SingletonList<RenderElement>, isTransparent: boolean, left: number, right: number): void;
}
