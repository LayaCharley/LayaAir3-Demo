import { GeometryElement } from "../../core/GeometryElement";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { Bounds } from "../../math/Bounds";
export declare class StaticBatchSubInfo {
    indexStart: number;
    indexCount: number;
    meshBounds: Bounds;
    needRender: boolean;
    constructor();
}
export declare class StaticBatchSubMesh extends GeometryElement {
    subInfos: StaticBatchSubInfo[];
    indexByteCount: number;
    constructor();
    addSubMesh(indexCount: number, indexStart: number, bounds: Bounds): void;
    _getType(): number;
    _updateRenderParams(state: RenderContext3D): void;
    _prepareRender(state: RenderContext3D): boolean;
    destroy(): void;
}
