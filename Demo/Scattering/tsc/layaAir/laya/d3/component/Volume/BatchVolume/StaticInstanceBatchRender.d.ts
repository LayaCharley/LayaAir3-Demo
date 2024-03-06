import { BaseRender } from "../../../core/render/BaseRender";
import { BatchRender } from "./BatchRender";
export declare class StaticInstanceBatchRender extends BatchRender {
    private _insElementMarksArray;
    private _instanceBatchminNums;
    private _updateChangeElement;
    constructor();
    private _isRenderNodeAllCanInstanceBatch;
    private _sumInstanceBatch;
    private _batchOneElement;
    private _removeOneElement;
    private _updateOneElement;
    private _createInstanceElement;
    protected _canBatch(render: BaseRender): boolean;
    protected _onDestroy(): void;
    addList(renderNodes: BaseRender[]): void;
    reBatch(): void;
}
