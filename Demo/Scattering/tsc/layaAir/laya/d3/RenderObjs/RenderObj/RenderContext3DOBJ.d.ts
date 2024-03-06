import { Vector4 } from "../../../maths/Vector4";
import { IRenderTarget } from "../../../RenderEngine/RenderInterface/IRenderTarget";
import { IRenderContext3D, PipelineMode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { Viewport } from "../../math/Viewport";
import { RenderElementOBJ } from "./RenderElementOBJ";
export declare class RenderContext3DOBJ implements IRenderContext3D {
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
    constructor();
    end(): void;
    applyContext(cameraUpdateMark: number): void;
    drawRenderElement(renderelemt: RenderElementOBJ): void;
}
