import { GeometryElement } from "../../core/GeometryElement";
import { Mesh } from "./Mesh";
export declare class SubMesh extends GeometryElement {
    get indexCount(): number;
    constructor(mesh: Mesh);
    getIndices(): Uint16Array | Uint32Array;
    setIndices(indices: Uint16Array): void;
    destroy(): void;
}
