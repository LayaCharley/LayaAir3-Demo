export declare class MathUtils3D {
    static zeroTolerance: number;
    static MaxValue: number;
    static MinValue: number;
    static Deg2Rad: number;
    constructor();
    static isZero(v: number): boolean;
    static nearEqual(n1: number, n2: number): boolean;
    static fastInvSqrt(value: number): number;
}
