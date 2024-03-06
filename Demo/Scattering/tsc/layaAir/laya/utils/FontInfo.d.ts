export declare class FontInfo {
    private static _cache;
    static parse(font: string): FontInfo;
    constructor(font: string | null);
    setFont(value: string): void;
}
