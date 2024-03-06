import { SingletonList } from "../../../../utils/SingletonList";
import { BaseRender, RenderBitFlag } from "../../../core/render/BaseRender";
import { InstanceRenderElement } from "../../../core/render/InstanceRenderElement";
export declare class BatchRender extends BaseRender {
    protected _lodCount: number;
    protected _lodRateArray: number[];
    protected _batchList: SingletonList<BaseRender>;
    protected _batchbit: RenderBitFlag;
    protected _RenderBitFlag: RenderBitFlag;
    protected _lodInstanceRenderElement: {
        [key: number]: InstanceRenderElement[];
    };
    protected _lodsize: number;
    private _cacheLod;
    constructor();
    get checkLOD(): boolean;
    set checkLOD(value: boolean);
    set lodCullRateArray(value: number[]);
    get lodCullRateArray(): number[];
    protected _canBatch(render: BaseRender): boolean;
    protected _onEnable(): void;
    protected _onDisable(): void;
    protected _changeLOD(lod: number): void;
    onPreRender(): void;
    _batchOneRender(render: BaseRender): boolean;
    _removeOneRender(render: BaseRender): void;
    _updateOneRender(render: BaseRender): void;
    addList(renderNode: BaseRender[]): void;
    reBatch(): void;
    _restorRenderNode(): void;
    _clear(): void;
}
