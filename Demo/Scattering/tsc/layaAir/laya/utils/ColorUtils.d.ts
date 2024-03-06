export declare class ColorUtils {
    static _SAVE: any;
    static _SAVE_SIZE: number;
    private static _DEFAULT;
    arrColor: any[];
    strColor: string;
    numColor: number;
    constructor(value: any);
    static _initDefault(): any;
    static _initSaveMap(): void;
    static create(value: any): ColorUtils;
}
