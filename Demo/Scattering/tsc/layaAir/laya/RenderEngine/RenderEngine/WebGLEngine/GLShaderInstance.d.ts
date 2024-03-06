import { BaseTexture } from "../../../resource/BaseTexture";
import { IRenderShaderInstance } from "../../RenderInterface/IRenderShaderInstance";
import { ShaderDataType } from "../../RenderShader/ShaderData";
import { ShaderVariable } from "../../RenderShader/ShaderVariable";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLShaderInstance extends GLObject implements IRenderShaderInstance {
    _engine: WebGLEngine;
    _gl: WebGLRenderingContext | WebGL2RenderingContext;
    constructor(engine: WebGLEngine, vs: string, ps: string, attributeMap: {
        [name: string]: [number, ShaderDataType];
    });
    private _create;
    private _legalUBObyteLength;
    getUniformMap(): ShaderVariable[];
    _uniform_sampler2DArray(one: any, texture: BaseTexture): number;
    _uniform_sampler3D(one: any, texture: BaseTexture): number;
    destroy(): void;
}
