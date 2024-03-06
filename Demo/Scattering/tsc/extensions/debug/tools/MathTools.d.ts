export declare class MathTools {
    constructor();
    static sortBigFirst(a: number, b: number): number;
    static sortSmallFirst(a: number, b: number): number;
    static sortNumBigFirst(a: any, b: any): number;
    static sortNumSmallFirst(a: any, b: any): number;
    static sortByKey(key: string, bigFirst?: boolean, forceNum?: boolean): Function;
}
