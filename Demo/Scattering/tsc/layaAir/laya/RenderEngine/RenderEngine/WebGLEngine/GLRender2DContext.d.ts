import { IRender2DContext } from "../../RenderInterface/IRender2DContext";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLRender2DContext extends GLObject implements IRender2DContext {
    private shaderInstance;
    private cacheShaderProgram;
    constructor(engine: WebGLEngine);
    activeTexture(textureID: number): void;
    bindTexture(target: number, texture: WebGLTexture): void;
    bindUseProgram(webglProgram: any): boolean;
}
