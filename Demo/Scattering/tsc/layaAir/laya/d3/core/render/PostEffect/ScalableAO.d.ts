import { DepthTextureMode } from "../../../depthMap/DepthPass";
import { PostProcessEffect } from "../PostProcessEffect";
import { PostProcessRenderContext } from "../PostProcessRenderContext";
import { Color } from "../../../../maths/Color";
export declare enum AOQUALITY {
    High = 0,
    MEDIUM = 1,
    LOWEST = 2
}
export declare class ScalableAO extends PostProcessEffect {
    static init(): void;
    private _aoQuality;
    constructor();
    set aoColor(value: Color);
    get aoColor(): Color;
    set intensity(value: number);
    get intensity(): number;
    set radius(value: number);
    get radius(): number;
    get aoQuality(): AOQUALITY;
    set aoQuality(value: AOQUALITY);
    getCameraDepthTextureModeFlag(): DepthTextureMode;
    render(context: PostProcessRenderContext): void;
}
