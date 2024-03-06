import { WebGLEngine } from "./WebGLEngine";
export declare class GLObject {
    protected _engine: WebGLEngine;
    protected _gl: WebGLRenderingContext | WebGL2RenderingContext;
    protected _id: number;
    protected _destroyed: boolean;
    constructor(engine: WebGLEngine);
    get destroyed(): boolean;
    destroy(): void;
}
