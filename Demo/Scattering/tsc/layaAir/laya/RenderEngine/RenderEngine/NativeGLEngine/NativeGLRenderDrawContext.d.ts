import { IndexFormat } from "../../RenderEnum/IndexFormat";
import { MeshTopology } from "../../RenderEnum/RenderPologyMode";
import { IRenderDrawContext } from "../../RenderInterface/IRenderDrawContext";
import { NativeGLObject } from "./NativeGLObject";
import { NativeWebGLEngine } from "./NativeWebGLEngine";
export declare class NativeGLRenderDrawContext extends NativeGLObject implements IRenderDrawContext {
    _nativeObj: any;
    constructor(engine: NativeWebGLEngine);
    drawElements2DTemp(mode: MeshTopology, count: number, type: IndexFormat, offset: number): void;
}
