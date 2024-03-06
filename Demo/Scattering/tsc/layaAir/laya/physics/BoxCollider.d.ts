import { ColliderBase } from "./ColliderBase";
export declare class BoxCollider extends ColliderBase {
    private _x;
    private _y;
    private _width;
    private _height;
    protected getDef(): any;
    protected _onAdded(): void;
    private _setShape;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get width(): number;
    set width(value: number);
    get height(): number;
    set height(value: number);
    resetShape(re?: boolean): void;
}
