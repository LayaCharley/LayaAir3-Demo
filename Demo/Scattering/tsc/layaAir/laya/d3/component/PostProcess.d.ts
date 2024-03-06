import { PostProcessEffect } from "../core/render/PostProcessEffect";
import { DepthTextureMode } from "../depthMap/DepthPass";
export declare class PostProcess {
    private recaculateCameraFlag;
    constructor();
    get enable(): boolean;
    set enable(value: boolean);
    set effects(value: PostProcessEffect[]);
    get effects(): PostProcessEffect[];
    get cameraDepthTextureMode(): DepthTextureMode;
    addEffect(effect: PostProcessEffect): void;
    getEffect(classReg: any): any;
    removeEffect(effect: PostProcessEffect): void;
    clearEffect(): void;
}
