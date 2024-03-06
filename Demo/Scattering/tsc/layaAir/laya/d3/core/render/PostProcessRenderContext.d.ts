import { Camera } from "../Camera";
import { CommandBuffer } from "./command/CommandBuffer";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderTexture } from "../../../resource/RenderTexture";
export declare class PostProcessRenderContext {
    source: RenderTexture | null;
    indirectTarget: RenderTexture | null;
    destination: RenderTexture | null;
    camera: Camera | null;
    compositeShaderData: ShaderData | null;
    command: CommandBuffer | null;
    deferredReleaseTextures: RenderTexture[];
    createRTByContextReleaseTexture(width: number, height: number, colorFormat: RenderTargetFormat, depthFormat: RenderTargetFormat, mipmap?: boolean, multiSamples?: number, depthTexture?: boolean, sRGB?: boolean): RenderTexture;
}
