import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { MeshRenderer } from "../../core/MeshRenderer";
export declare class StaticMeshMergeInfo {
    static create(render: MeshRenderer): StaticMeshMergeInfo;
    receiveShadow: boolean;
    lightmapIndex: number;
    vertexDec: VertexDeclaration;
    private _renders;
    get renders(): MeshRenderer[];
    vertexCount: number;
    indexCount: number;
    private constructor();
    match(render: MeshRenderer): boolean;
    addElement(render: MeshRenderer): void;
    destroy(): void;
}
