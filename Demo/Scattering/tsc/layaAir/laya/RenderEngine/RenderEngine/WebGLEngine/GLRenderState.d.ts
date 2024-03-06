import { BlendEquationSeparate } from "../../RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../../RenderEnum/BlendFactor";
import { CompareFunction } from "../../RenderEnum/CompareFunction";
import { CullMode } from "../../RenderEnum/CullMode";
import { StencilOperation } from "../../RenderEnum/StencilOperation";
import { RenderStateCommand } from "../../RenderStateCommand";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLRenderState {
    constructor(engine: WebGLEngine);
    private _initState;
    _getBlendFactor(factor: BlendFactor): number;
    _getBlendOperation(factor: BlendEquationSeparate): number;
    _getGLCompareFunction(compareFunction: CompareFunction): number;
    _getGLStencilOperation(compareFunction: StencilOperation): number;
    _getGLFrontfaceFactor(cullmode: CullMode): number;
    setStencilMask(value: boolean): void;
    applyRenderStateCommand(cmd: RenderStateCommand): void;
}
