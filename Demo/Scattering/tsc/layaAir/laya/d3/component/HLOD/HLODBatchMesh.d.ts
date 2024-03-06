import { GeometryElement } from "../../core/GeometryElement";
import { Mesh } from "../../resource/models/Mesh";
import { HLODBatchSubMesh } from "./HLODUtil";
export declare class HLODBatchMesh extends GeometryElement {
    constructor();
    set batchMesh(mesh: Mesh);
    get batchMesh(): Mesh;
    set batchSubMeshInfo(value: HLODBatchSubMesh[]);
    get batchSubMeshInfo(): HLODBatchSubMesh[];
    get drawSubMeshs(): HLODBatchSubMesh[];
    destroy(): void;
}
