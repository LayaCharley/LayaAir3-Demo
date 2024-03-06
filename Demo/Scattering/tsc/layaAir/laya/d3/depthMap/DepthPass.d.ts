import { Camera } from "../core/Camera";
import { RenderContext3D } from "../core/render/RenderContext3D";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
export declare enum DepthTextureMode {
    None = 0,
    Depth = 1,
    DepthNormals = 2,
    DepthAndDepthNormals = 3,
    MotionVectors = 4
}
export declare class DepthPass {
    private static SHADOW_BIAS;
    static __init__(): void;
    constructor();
    update(camera: Camera, depthType: DepthTextureMode, depthTextureFormat: RenderTargetFormat): void;
    render(context: RenderContext3D, depthType: DepthTextureMode): void;
}
