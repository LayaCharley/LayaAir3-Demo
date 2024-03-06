import { IRenderContext3D } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderContext3D";
import { IRenderQueue } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderQueue";
import { ISortPass } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ISortPass";
import { RenderContext3D } from "../../core/render/RenderContext3D";
import { RenderElement } from "../../core/render/RenderElement";
import { RenderElementBatch } from "../../graphics/Batch/RenderElementBatch";
export declare class NativeBaseRenderQueue implements IRenderQueue {
    _isTransparent: boolean;
    _sortPass: ISortPass;
    _context: IRenderContext3D;
    _batch: RenderElementBatch;
    private _nativeObj;
    set sortPass(value: ISortPass);
    constructor(isTransparent: boolean);
    destroy(): void;
    set context(value: RenderContext3D);
    addRenderElement(renderelement: RenderElement): void;
    clear(): void;
    renderQueue(context: RenderContext3D): number;
    private _batchQueue;
}
