import { PostProcessEffect } from "laya/d3/core/render/PostProcessEffect";
import { PostProcessRenderContext } from "laya/d3/core/render/PostProcessRenderContext";
import { Color } from "laya/maths/Color";
import { Vector2 } from "laya/maths/Vector2";
import { Camera } from "laya/d3/core/Camera";
import { Light } from "laya/d3/core/light/Light";
import { PostProcess } from "../../../../component/PostProcess";
export declare class LensFlareElement {
    private _active;
    private _type;
    tint: Color;
    startPosition: number;
}
export declare class lensFlareData {
    elements: LensFlareElement[];
}
export declare class LensFlareEffect extends PostProcessEffect {
    static init(): void;
    set LensFlareData(value: lensFlareData);
    set bindLight(light: Light);
    constructor();
    caculateDirCenter(camera: Camera): void;
    caculatePointCenter(camera: Camera): void;
    caculateSpotCenter(value: Vector2): void;
    render(context: PostProcessRenderContext): void;
    release(postprocess: PostProcess): void;
}
