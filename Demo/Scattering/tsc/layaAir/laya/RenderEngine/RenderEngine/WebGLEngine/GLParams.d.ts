import { RenderParams } from "../../RenderEnum/RenderParams";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLParams {
    _engine: WebGLEngine;
    _gl: WebGLRenderingContext | WebGL2RenderingContext;
    _glParamsData: Map<RenderParams, number>;
    constructor(engine: WebGLEngine);
    private _initParams;
    getParams(params: RenderParams): number;
}
