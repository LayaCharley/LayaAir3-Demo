import { RenderableSprite3D } from "./RenderableSprite3D";
import { MeshFilter } from "./MeshFilter";
import { MeshRenderer } from "./MeshRenderer";
import { Mesh } from "../resource/models/Mesh";
export declare class MeshSprite3D extends RenderableSprite3D {
    private _meshFilter;
    get meshFilter(): MeshFilter;
    get meshRenderer(): MeshRenderer;
    constructor(mesh?: Mesh, name?: string);
}
