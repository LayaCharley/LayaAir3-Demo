import { SingletonList } from "../../../utils/SingletonList";
import { RenderElement } from "../../core/render/RenderElement";
export declare class RenderElementBatch {
    static instance: RenderElementBatch;
    private _instanceBatchManager;
    private _recoverList;
    constructor();
    recoverData(): void;
    batch(elements: SingletonList<RenderElement>): void;
}
