import { Transform3D } from "../../core/Transform3D";
import { BaseRender } from "../../core/render/BaseRender";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { BoundFrustum } from "../../math/BoundFrustum";
import { HLODElement } from "./HLODUtil";
export declare class HLODRender extends BaseRender {
    constructor();
    get curHLODRS(): HLODElement;
    set curHLODRS(value: HLODElement);
    private _createRenderelementByHLODElement;
    private _changeMesh;
    _calculateBoundingBox(): void;
    _renderUpdate(context: RenderContext3D, transform: Transform3D): void;
    _needRender(boundFrustum: BoundFrustum, context: RenderContext3D): boolean;
    onEnable(): void;
    onDisable(): void;
    onDestroy(): void;
    _cloneTo(dest: HLODRender): void;
}
