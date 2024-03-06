import { ColliderShape } from "./ColliderShape";
export declare class CompoundColliderShape extends ColliderShape {
    constructor();
    set shapes(value: ColliderShape[]);
    get shapes(): ColliderShape[];
    addChildShape(shape: ColliderShape): void;
    removeChildShape(shape: ColliderShape): void;
    clearChildShape(): void;
    getChildShapeCount(): number;
    cloneTo(destObject: any): void;
    clone(): any;
    destroy(): void;
}
