export declare class Layouter {
    constructor();
    data: any;
    _items: any[];
    layoutFun: Function;
    private layout;
    set items(arr: any[]);
    get items(): any[];
    private _sX;
    private _width;
    set x(v: number);
    get x(): number;
    set width(v: number);
    get width(): number;
    changed(): void;
    calSize(): void;
}
