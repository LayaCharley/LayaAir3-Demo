export declare class UploadMemoryManager {
    static UploadMemorySize: number;
    _conchUploadMemoryManager: any;
    constructor();
    static getInstance(): UploadMemoryManager;
    private _addNodeCommand;
    static syncRenderMemory(): void;
    uploadData(): void;
    clear(): void;
}
