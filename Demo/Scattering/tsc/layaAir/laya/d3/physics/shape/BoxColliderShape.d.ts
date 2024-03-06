import { ColliderShape } from "./ColliderShape";
export declare class BoxColliderShape extends ColliderShape {
    get sizeX(): number;
    set sizeX(value: number);
    get sizeY(): number;
    set sizeY(value: number);
    get sizeZ(): number;
    set sizeZ(value: number);
    constructor(sizeX?: number, sizeY?: number, sizeZ?: number);
    clone(): any;
}
