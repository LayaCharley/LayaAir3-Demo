import { BaseRender } from "./BaseRender";
import { RenderContext3D } from "./RenderContext3D";
import { GeometryElement } from "../GeometryElement";
import { Transform3D } from "../Transform3D";
import { Material } from "../material/Material";
import { IRenderElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderElement";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { SubShader } from "../../../RenderEngine/RenderShader/SubShader";
export declare class RenderElement {
    _renderElementOBJ: IRenderElement;
    _batchElement: RenderElement;
    _transform: Transform3D;
    set material(value: Material);
    set renderSubShader(value: SubShader);
    get renderSubShader(): SubShader;
    set subShaderIndex(value: number);
    get subShaderIndex(): number;
    get render(): BaseRender;
    constructor();
    protected _createRenderElementOBJ(): void;
    setTransform(transform: Transform3D): void;
    setGeometry(geometry: GeometryElement): void;
    compileShader(context: IRenderContext3D): void;
    _convertSubShader(customShader: Shader3D, replacementTag: string, subshaderIndex?: number): void;
    _renderUpdatePre(context: RenderContext3D): void;
}
