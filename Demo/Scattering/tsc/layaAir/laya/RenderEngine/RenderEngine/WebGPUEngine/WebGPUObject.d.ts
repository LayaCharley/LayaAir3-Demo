import { WebGPUEngine } from "./WebGPUEngine";
export declare class WebGPUObject {
    protected _engine: WebGPUEngine;
    protected _device: GPUDevice;
    protected _context: GPUCanvasContext;
    protected _id: number;
    protected _destroyed: boolean;
    constructor(engine: WebGPUEngine);
    get destroyed(): boolean;
    destroy(): void;
}
