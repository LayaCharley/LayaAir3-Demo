import { ColliderShape } from "./ColliderShape";
export declare class SphereColliderShape extends ColliderShape {
    get radius(): number;
    set radius(value: number);
    constructor(radius?: number);
    clone(): any;
}
