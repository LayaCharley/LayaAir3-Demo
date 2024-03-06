import { ShaderDefine } from "../../../RenderEngine/RenderShader/ShaderDefine";
import { BaseRender } from "../../core/render/BaseRender";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { Transform3D } from "../../core/Transform3D";
import { BoundFrustum } from "../../math/BoundFrustum";
import { StaticBatchMesh } from "./StaticBatchMesh";
import { StaticMeshMergeInfo } from "./StaticMeshMergeInfo";
export declare class StaticBatchMeshRender extends BaseRender {
    static create(info: StaticMeshMergeInfo): StaticBatchMeshRender;
    private _staticMesh;
    get staticMesh(): StaticBatchMesh;
    private _mergeInfo;
    get mergeInfo(): StaticMeshMergeInfo;
    set mergeInfo(value: StaticMeshMergeInfo);
    _singleton: boolean;
    private constructor();
    _calculateBoundingBox(): void;
    _renderUpdate(context: RenderContext3D, transform: Transform3D): void;
    _getMeshDefine(mesh: StaticBatchMesh, out: Array<ShaderDefine>): void;
    _needRender(boundFrustum: BoundFrustum, context: RenderContext3D): boolean;
    onEnable(): void;
    onDisable(): void;
    onDestroy(): void;
    _cloneTo(dest: StaticBatchMeshRender): void;
}
