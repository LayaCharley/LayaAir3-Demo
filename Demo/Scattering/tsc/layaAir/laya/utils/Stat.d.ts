export declare type StatUnit = "M" | "K" | "int";
export declare type StatColor = "yellow" | "white" | "red";
export declare type StatMode = "summit" | "average";
export interface StatUIParams {
    title: string;
    value: string;
    color: StatColor;
    units: StatUnit;
    mode: StatMode;
}
export interface StatToggleUIParams {
    title: string;
    value: string;
    color: StatColor;
}
export declare class Stat {
    static FPSStatUIParams: StatUIParams;
    static NodeStatUIParams: StatUIParams;
    static Sprite3DStatUIParams: StatUIParams;
    static DrawCall: StatUIParams;
    static TriangleFace: StatUIParams;
    static RenderNode: StatUIParams;
    static SkinRenderNode: StatUIParams;
    static ParticleRenderNode: StatUIParams;
    static FrustumCulling: StatUIParams;
    static UniformUpload: StatUIParams;
    static OpaqueDrawCall: StatUIParams;
    static TransDrawCall: StatUIParams;
    static DepthCastDrawCall: StatUIParams;
    static InstanceDrawCall: StatUIParams;
    static CMDDrawCall: StatUIParams;
    static BlitDrawCall: StatUIParams;
    static GPUMemory: StatUIParams;
    static TextureMemeory: StatUIParams;
    static RenderTextureMemory: StatUIParams;
    static BufferMemory: StatUIParams;
    static uploadUniformNum: StatUIParams;
    static AllShow: Array<StatUIParams>;
    static memoryShow: Array<StatUIParams>;
    static renderShow: Array<StatUIParams>;
    static AllToggle: Array<StatToggleUIParams>;
    static RenderModeToggle: Array<StatToggleUIParams>;
    static RenderFuncToggle: Array<StatToggleUIParams>;
    static FPS: number;
    static loopCount: number;
    static spriteRenderUseCacheCount: number;
    static canvasNormal: number;
    static canvasBitmap: number;
    static canvasReCache: number;
    static renderSlow: boolean;
    static cpuMemory: number;
    static blitDrawCall: number;
    static gpuMemory: number;
    static bufferMemory: number;
    static _currentShowArray: Array<StatUIParams>;
    static _currentToggleArray: Array<StatToggleUIParams>;
    static show(x?: number, y?: number, views?: Array<StatUIParams>): void;
    static showToggle(x?: number, y?: number, views?: Array<StatToggleUIParams>): void;
    static setStat(stat: string, value: number): void;
    static enable(): void;
    static hide(): void;
    static updateEngineData(): void;
    static clear(): void;
    static set onclick(fn: Function);
}
