import { ColliderBase } from "./ColliderBase";
export declare class ChainCollider extends ColliderBase {
    private _x;
    private _y;
    private _points;
    private _loop;
    protected getDef(): any;
    private _setShape;
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get points(): string;
    set points(value: string);
    get loop(): boolean;
    set loop(value: boolean);
}
