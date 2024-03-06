import { IndexBuffer2D } from "./IndexBuffer2D";
import { VertexBuffer2D } from "./VertexBuffer2D";
export declare class Mesh2D {
    _stride: number;
    vertNum: number;
    indexNum: number;
    protected _applied: boolean;
    _vb: VertexBuffer2D;
    _ib: IndexBuffer2D;
    private _vao;
    private static _gvaoid;
    private _attribInfo;
    protected _quadNum: number;
    canReuse: boolean;
    constructor(stride: number, vballoc: number, iballoc: number);
    createQuadIB(QuadNum: number): void;
    setAttributes(attribs: any[]): void;
    private configVAO;
    useMesh(): void;
    releaseMesh(): void;
    destroy(): void;
    clearVB(): void;
}
