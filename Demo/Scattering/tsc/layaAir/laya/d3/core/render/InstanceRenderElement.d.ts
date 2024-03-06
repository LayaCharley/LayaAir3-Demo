import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { Mesh } from "../../resource/models/Mesh";
import { RenderContext3D } from "./RenderContext3D";
import { RenderElement } from "./RenderElement";
export declare class InstanceRenderElement extends RenderElement {
    static create(): InstanceRenderElement;
    constructor();
    set InvertFront(value: boolean);
    protected _createRenderElementOBJ(): void;
    compileShader(context: IRenderContext3D): void;
    _renderUpdatePre(context: RenderContext3D): void;
    updateInstanceData(mesh: Mesh): void;
    clear(): void;
    recover(): void;
}
