import { Color } from "../../../maths/Color";
import { WebGPUInternalTex } from "./WebGPUInternalTex";
export declare class WebGPURenderPassDescriptor {
    des: GPURenderPassDescriptor;
    constructor();
    setColorAttachments(textures: WebGPUInternalTex[], clear: boolean, clearColor?: Color): void;
    setDepthAttachments(depthTex: WebGPUInternalTex, clear: boolean, clearDepthValue?: number): void;
}
