import { RenderElement } from "./RenderElement";
import { Scene3D } from "../scene/Scene3D";
import { Viewport } from "../../math/Viewport";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { Camera } from "../Camera";
import { PipelineMode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { Vector4 } from "../../../maths/Vector4";
export declare class RenderContext3D {
    static _instance: RenderContext3D;
    static clientWidth: number;
    static clientHeight: number;
    static __init__(): void;
    camera: Camera;
    configPipeLineMode: PipelineMode;
    set viewport(value: Viewport);
    set scissor(value: Vector4);
    set invertY(value: boolean);
    set pipelineMode(value: PipelineMode);
    get cameraShaderValue(): ShaderData;
    set cameraShaderValue(value: ShaderData);
    get scene(): Scene3D;
    changeViewport(x: number, y: number, width: number, height: number): void;
    changeScissor(x: number, y: number, width: number, height: number): void;
    applyContext(cameraUpdateMark: number): void;
    drawRenderElement(renderelemt: RenderElement): void;
    constructor();
}
