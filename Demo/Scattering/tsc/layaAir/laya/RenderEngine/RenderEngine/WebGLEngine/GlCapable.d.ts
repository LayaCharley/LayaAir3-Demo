import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { WebGLExtension } from "./GLEnum/WebGLExtension";
import { WebGLEngine } from "./WebGLEngine";
export declare class GlCapable {
    constructor(glEngine: WebGLEngine);
    private initCapable;
    private initExtension;
    getCapable(type: RenderCapable): boolean;
    getExtension(type: WebGLExtension): any;
}
