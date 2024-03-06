import { ColliderShape } from "./ColliderShape";
export declare class CapsuleColliderShape extends ColliderShape {
    get radius(): number;
    set radius(value: number);
    get length(): number;
    set length(value: number);
    get orientation(): number;
    set orientation(value: number);
    constructor(radius?: number, length?: number, orientation?: number);
    clone(): any;
}
