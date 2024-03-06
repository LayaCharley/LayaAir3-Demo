import { RenderCapable } from "../../RenderEnum/RenderCapable";
import { WebGPUEngine } from "./WebGPUEngine";
import { WebGPUObject } from "./WebGPUObject";
export declare class WebGPUCapable extends WebGPUObject {
    constructor(gpuEngine: WebGPUEngine);
    initCapable(): void;
    getCapable(type: RenderCapable): boolean;
}
