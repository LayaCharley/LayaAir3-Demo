import { PostProcessEffect } from "../../../core/render/PostProcessEffect";
import { PostProcessRenderContext } from "../../../core/render/PostProcessRenderContext";
export declare class GaussianDoF extends PostProcessEffect {
    static init(): void;
    constructor();
    set farStart(value: number);
    get farStart(): number;
    set farEnd(value: number);
    get farEnd(): number;
    set maxRadius(value: number);
    get maxRadius(): number;
    render(context: PostProcessRenderContext): void;
}
