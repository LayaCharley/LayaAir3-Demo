import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
import { Bounds } from "../../math/Bounds";
import { StaticMeshMergeInfo } from "./StaticMeshMergeInfo";
export declare class StaticBatchMesh {
    static create(info: StaticMeshMergeInfo): StaticBatchMesh;
    bounds: Bounds;
    constructor();
    setBuffer(vertex: VertexBuffer3D, index: IndexBuffer3D): void;
    destroy(): void;
}
