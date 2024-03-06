import { Matrix } from "../../maths/Matrix";
import { VertexDeclaration } from "../../RenderEngine/VertexDeclaration";
import { Mesh2D } from "./Mesh2D";
export declare class MeshTexture extends Mesh2D {
    static const_stride: number;
    private static _fixattriInfo;
    private static _POOL;
    static VertexDeclarition: VertexDeclaration;
    static __init__(): void;
    constructor();
    static getAMesh(mainctx: boolean): MeshTexture;
    addData(vertices: Float32Array, uvs: Float32Array, idx: Uint16Array, matrix: Matrix, rgba: number): void;
    releaseMesh(): void;
    destroy(): void;
}
