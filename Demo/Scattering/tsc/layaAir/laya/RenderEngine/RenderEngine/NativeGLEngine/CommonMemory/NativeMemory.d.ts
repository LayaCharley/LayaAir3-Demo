export declare class NativeMemory {
    static NativeSourceID: number;
    protected _fdata: Float32Array;
    protected _f64data: Float64Array;
    protected _byteArray: Uint8Array;
    protected _byteLength: number;
    protected _destroyed: boolean;
    protected _id: number;
    constructor(size: number, shared: boolean);
    get float32Array(): Float32Array;
    get float64Array(): Float64Array;
    get uint8Array(): Uint8Array;
    get int32Array(): Int32Array;
    destroy(): void;
    clear(): void;
}
