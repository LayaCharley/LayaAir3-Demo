import { Volume } from "../Volume";
import { BatchRender } from "./BatchRender";
export declare class StaticBatchVolume extends Volume {
    get checkLOD(): boolean;
    set checkLOD(value: boolean);
    get enableStaticInstanceBatchRender(): boolean;
    set enableStaticInstanceBatchRender(value: boolean);
    get enableMergeBatchRender(): boolean;
    set enableMergeBatchRender(value: boolean);
    get enableCustomBatchRender(): boolean;
    set enableCustomBatchRender(value: boolean);
    set customBatchRenders(value: BatchRender[]);
    get customBatchRenders(): BatchRender[];
    constructor();
    private _restorRenderNode;
    private __addRenderNodeToBatch;
    private __removeRenderNodeFromBatch;
    protected _onEnable(): void;
    protected _onDisable(): void;
    reBatch(): void;
}
