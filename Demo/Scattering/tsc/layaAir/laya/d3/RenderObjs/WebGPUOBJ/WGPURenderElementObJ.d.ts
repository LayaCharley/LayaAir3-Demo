import { IBaseRenderNode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IBaseRenderNode";
import { IRenderElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderElement";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { SingletonList } from "../../../utils/SingletonList";
import { Transform3D } from "../../core/Transform3D";
import { WGPURenderContext3D } from "./WGPURenderContext3D";
import { WGPUShaderData } from "./WGPUShaderData";
export declare class WGPURenderElementObJ implements IRenderElement {
    _geometry: IRenderGeometryElement;
    _shaderInstances: SingletonList<ShaderInstance>;
    _materialShaderData: WGPUShaderData;
    _renderShaderData: WGPUShaderData;
    _transform: Transform3D;
    _isRender: boolean;
    _owner: IBaseRenderNode;
    _invertFront: boolean;
    constructor();
    _render(context: WGPURenderContext3D): void;
    _addShaderInstance(shader: ShaderInstance): void;
    _clearShaderInstance(): void;
    _destroy(): void;
}
