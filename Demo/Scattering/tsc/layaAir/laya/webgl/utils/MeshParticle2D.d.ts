import { Mesh2D } from "./Mesh2D";
import { VertexDeclaration } from "../../RenderEngine/VertexDeclaration";
export declare class MeshParticle2D extends Mesh2D {
    static const_stride: number;
    private static _fixattriInfo;
    private static _POOL;
    static vertexDeclaration: VertexDeclaration;
    static __init__(): void;
    constructor(maxNum: number);
    setMaxParticleNum(maxNum: number): void;
    static getAMesh(maxNum: number): MeshParticle2D;
    releaseMesh(): void;
    destroy(): void;
}
