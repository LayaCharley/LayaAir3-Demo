import { ColliderBase } from "./ColliderBase";
export declare class PolygonCollider extends ColliderBase {
    private _x;
    private _y;
    private _points;
    protected getDef(): any;
    private _setShape;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get points(): string;
    set points(value: string);
}
