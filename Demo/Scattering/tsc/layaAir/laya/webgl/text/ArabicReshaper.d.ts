export declare class ArabicReshaper {
    private static charsMap;
    private static combCharsMap;
    private static transChars;
    characterMapContains(c: number): boolean;
    getCharRep(c: number): boolean;
    getCombCharRep(c1: number, c2: number): boolean;
    isTransparent(c: number): boolean;
    getOriginalCharsFromCode(code: number): string;
    convertArabic(normal: any): string;
    convertArabicBack(apfb: any): string;
}
