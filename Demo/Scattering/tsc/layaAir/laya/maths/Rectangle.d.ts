export declare class Rectangle {
    static EMPTY: Rectangle;
    static TEMP: Rectangle;
    private static _temB;
    private static _temA;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    get right(): number;
    get bottom(): number;
    setTo(x: number, y: number, width: number, height: number): Rectangle;
    reset(): Rectangle;
    recover(): void;
    static create(): Rectangle;
    copyFrom(source: Rectangle): Rectangle;
    contains(x: number, y: number): boolean;
    intersects(rect: Rectangle): boolean;
    intersection(rect: Rectangle, out?: Rectangle | null): Rectangle | null;
    union(source: Rectangle, out?: Rectangle | null): Rectangle;
    clone(out?: Rectangle | null): Rectangle;
    toString(): string;
    equals(rect: Rectangle): boolean;
    addPoint(x: number, y: number): Rectangle;
    isEmpty(): boolean;
}
