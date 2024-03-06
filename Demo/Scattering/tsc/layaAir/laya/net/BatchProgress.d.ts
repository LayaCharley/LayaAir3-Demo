export declare type ProgressCallback = (progress: number) => void;
export interface IBatchProgress {
    readonly itemCount: number;
    createCallback(weight?: number): ProgressCallback;
    update(index: number, progress: number): void;
}
export declare class BatchProgress implements IBatchProgress {
    private _callback;
    private _items;
    private _weights;
    private _progress;
    constructor(callback: ProgressCallback);
    get itemCount(): number;
    reset(): void;
    createCallback(weight?: number): ProgressCallback;
    update(index: number, value: number): void;
}
