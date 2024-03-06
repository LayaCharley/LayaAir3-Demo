import { NativeWebGLEngine } from "./NativeWebGLEngine";
export declare class NativeGLObject {
    protected _engine: NativeWebGLEngine;
    protected _gl: WebGLRenderingContext | WebGL2RenderingContext;
    protected _id: number;
    protected _destroyed: boolean;
    constructor(engine: NativeWebGLEngine);
    get destroyed(): boolean;
    setResourceManager(): void;
    destroy(): void;
}
