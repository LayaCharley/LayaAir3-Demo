export declare class AvatarMask {
    constructor(data?: any);
    getTransformActive(path: string): boolean;
    setTransformActive(path: string, value: boolean): void;
    getAllTranfromPath(): Record<string, boolean>;
    clone(): any;
    cloneTo(destObject: any): void;
}
