import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderTexture } from "./RenderTexture";
export declare class RenderTextureCube extends RenderTexture {
    faceIndex: number;
    constructor(size: number, colorFormat: RenderTargetFormat, depthFormat: RenderTargetFormat, generateMipmap: boolean, multiSamples: number);
    _start(): void;
}
