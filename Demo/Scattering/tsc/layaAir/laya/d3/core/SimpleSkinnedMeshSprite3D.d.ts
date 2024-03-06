import { Mesh } from "../resource/models/Mesh";
import { MeshFilter } from "./MeshFilter";
import { RenderableSprite3D } from "./RenderableSprite3D";
import { SimpleSkinnedMeshRenderer } from "./SimpleSkinnedMeshRenderer";
export declare class SimpleSkinnedMeshSprite3D extends RenderableSprite3D {
    static SIMPLE_SIMPLEANIMATORTEXTURE: number;
    static SIMPLE_SIMPLEANIMATORPARAMS: number;
    static SIMPLE_SIMPLEANIMATORTEXTURESIZE: number;
    get meshFilter(): MeshFilter;
    get simpleSkinnedMeshRenderer(): SimpleSkinnedMeshRenderer;
    constructor(mesh?: Mesh, name?: string);
    destroy(destroyChild?: boolean): void;
}
