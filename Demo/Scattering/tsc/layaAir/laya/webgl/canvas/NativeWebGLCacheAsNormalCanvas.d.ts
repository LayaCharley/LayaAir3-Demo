export declare class NativeWebGLCacheAsNormalCanvas {
    _nativeObj: any;
    _context: any;
    constructor(ctx: any, sp: any);
    startRec(): void;
    endRec(): void;
    isCacheValid(): boolean;
    isTextNeedRestore(): boolean;
    get context(): any;
}
