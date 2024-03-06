import { IBaseRenderNode } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IBaseRenderNode";
import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { IRenderElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderElement";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { ShaderInstance } from "../../../RenderEngine/RenderShader/ShaderInstance";
import { SingletonList } from "../../../utils/SingletonList";
import { Transform3D } from "../../core/Transform3D";
import { NativeShaderData } from "./NativeShaderData";
export declare enum RenderElementType {
    Base = 0,
    Skin = 1,
    Instance = 2
}
export declare class NativeRenderElementOBJ implements IRenderElement {
    private geometry;
    private materialShaderData;
    private renderShaderData;
    private transform;
    private owner;
    set _geometry(data: IRenderGeometryElement);
    get _geometry(): IRenderGeometryElement;
    set _materialShaderData(data: NativeShaderData);
    get _materialShaderData(): NativeShaderData;
    set _renderShaderData(data: NativeShaderData);
    get _renderShaderData(): NativeShaderData;
    set _transform(data: Transform3D);
    get _transform(): Transform3D;
    get _isRender(): boolean;
    set _isRender(data: boolean);
    get _invertFront(): boolean;
    set _invertFront(data: boolean);
    _nativeObj: any;
    _shaderInstances: SingletonList<ShaderInstance>;
    constructor();
    init(): void;
    _owner: IBaseRenderNode;
    _addShaderInstance(shader: ShaderInstance): void;
    _clearShaderInstance(): void;
    _render(context: IRenderContext3D): void;
    _destroy(): void;
}
