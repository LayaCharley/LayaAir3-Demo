import { RenderTexture } from "../../../resource/RenderTexture";
export declare class WebXRRenderTexture extends RenderTexture {
    frameLoop: number;
    constructor();
    set frameBuffer(value: any);
    protected _create(width: number, height: number): void;
}
