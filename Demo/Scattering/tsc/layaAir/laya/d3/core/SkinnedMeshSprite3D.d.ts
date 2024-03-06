import { Mesh } from "../resource/models/Mesh";
import { MeshFilter } from "./MeshFilter";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { SkinnedMeshRenderer } from "./SkinnedMeshRenderer";
export declare class SkinnedMeshSprite3D extends RenderableSprite3D {
    static BONES: number;
    get meshFilter(): MeshFilter;
    get skinnedMeshRenderer(): SkinnedMeshRenderer;
    constructor(mesh?: Mesh, name?: string);
    destroy(destroyChild?: boolean): void;
}
