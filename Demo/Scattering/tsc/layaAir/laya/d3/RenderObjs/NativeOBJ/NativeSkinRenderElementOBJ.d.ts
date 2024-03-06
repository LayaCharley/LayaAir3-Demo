import { NativeRenderElementOBJ } from "./NativeRenderElementOBJ";
export declare class NativeSkinRenderElementOBJ extends NativeRenderElementOBJ {
    _skinnedData: Float32Array[];
    constructor();
    get skinnedData(): Float32Array[];
    set skinnedData(data: Float32Array[]);
    init(): void;
}
