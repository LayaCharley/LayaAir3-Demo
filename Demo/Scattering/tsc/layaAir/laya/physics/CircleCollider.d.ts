import { ColliderBase } from "./ColliderBase";
export declare class CircleCollider extends ColliderBase {
    private static _temp;
    private _x;
    private _y;
    private _radius;
    protected getDef(): any;
    protected _onAdded(): void;
    private _setShape;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get radius(): number;
    set radius(value: number);
    resetShape(re?: boolean): void;
}
