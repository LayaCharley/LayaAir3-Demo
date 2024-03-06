import { Viewport } from "../../../d3/math/Viewport";
import { Vector4 } from "../../../maths/Vector4";
import { ShaderData } from "../../RenderShader/ShaderData";
import { IRenderTarget } from "../IRenderTarget";
import { IRenderElement } from "./IRenderElement";
export declare type PipelineMode = "Forward" | "ShadowCaster" | "DepthNormal" | string;
export interface IRenderContext3D {
    destTarget: IRenderTarget;
    viewPort: Viewport;
    scissor: Vector4;
    invertY: boolean;
    pipelineMode: PipelineMode;
    cameraShaderData: ShaderData;
    sceneID: number;
    sceneShaderData: ShaderData;
    cameraUpdateMark: number;
    globalShaderData: ShaderData;
    applyContext(cameraUpdateMark: number): void;
    drawRenderElement(renderelemt: IRenderElement): void;
    end(): void;
}
