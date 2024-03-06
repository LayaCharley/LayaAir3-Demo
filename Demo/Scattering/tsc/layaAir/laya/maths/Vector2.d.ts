import { IClone } from "../utils/IClone";
export declare class Vector2 implements IClone {
    static readonly ZERO: Readonly<Vector2>;
    static readonly ONE: Readonly<Vector2>;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    setValue(x: number, y: number): void;
    static scale(a: Vector2, b: number, out: Vector2): void;
    static equals(a: Vector2, b: Vector2): boolean;
    fromArray(array: ArrayLike<number>, offset?: number): void;
    toArray(): Array<number>;
    writeTo(array: Float32Array, offset?: number): void;
    cloneTo(destObject: any): void;
    static dot(a: Vector2, b: Vector2): number;
    static normalize(s: Vector2, out: Vector2): void;
    static scalarLength(a: Vector2): number;
    clone(): any;
    forNativeElement(nativeElements?: Float32Array | null): void;
    static rewriteNumProperty(proto: any, name: string, index: number): void;
}
