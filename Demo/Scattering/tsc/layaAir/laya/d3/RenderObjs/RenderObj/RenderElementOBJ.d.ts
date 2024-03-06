import { IBaseRenderNode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IBaseRenderNode";
import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { IRenderElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderElement";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { ShaderData } from "../../../RenderEngine/RenderShader/ShaderData";
import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { SingletonList } from "../../../utils/SingletonList";
import { Transform3D } from "../../core/Transform3D";
export declare class RenderElementOBJ implements IRenderElement {
    _geometry: IRenderGeometryElement;
    _shaderInstances: SingletonList<ShaderInstance>;
    _materialShaderData: ShaderData;
    _renderShaderData: ShaderData;
    _transform: Transform3D;
    _isRender: boolean;
    _owner: IBaseRenderNode;
    _invertFront: boolean;
    constructor();
    _addShaderInstance(shader: ShaderInstance): void;
    _clearShaderInstance(): void;
    _render(context: IRenderContext3D): void;
    drawGeometry(shaderIns: ShaderInstance): void;
    _destroy(): void;
}
