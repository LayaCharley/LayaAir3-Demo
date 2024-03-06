import { IRenderDrawContext } from "../../RenderInterface/IRenderDrawContext";
import { GLObject } from "./GLObject";
import { WebGLEngine } from "./WebGLEngine";
export declare class GLRenderDrawContext extends GLObject implements IRenderDrawContext {
    constructor(engine: WebGLEngine);
}
