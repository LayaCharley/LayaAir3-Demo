import { Mesh } from "../../resource/models/Mesh";
import { ColliderShape } from "./ColliderShape";
export declare class MeshColliderShape extends ColliderShape {
    get mesh(): Mesh;
    set mesh(value: Mesh);
    get convex(): boolean;
    set convex(value: boolean);
    constructor();
    private _createDynamicMeshCollider;
    private _createBvhTriangleCollider;
    cloneTo(destObject: any): void;
    clone(): any;
}
