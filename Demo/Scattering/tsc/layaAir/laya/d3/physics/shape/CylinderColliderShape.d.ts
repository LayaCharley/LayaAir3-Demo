import { ColliderShape } from "./ColliderShape";
export declare class CylinderColliderShape extends ColliderShape {
    private _orientation;
    private _radius;
    private _height;
    get radius(): number;
    set radius(value: number);
    get height(): number;
    set height(value: number);
    get orientation(): number;
    set orientation(value: number);
    constructor(radius?: number, height?: number, orientation?: number);
    clone(): any;
}
