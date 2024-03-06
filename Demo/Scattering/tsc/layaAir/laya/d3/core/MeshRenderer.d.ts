import { Component } from "../../components/Component";
import { Mesh } from "../resource/models/Mesh";
import { BaseRender } from "./render/BaseRender";
export declare class MeshRenderer extends BaseRender {
    private morphTargetActiveCount;
    private morphTargetActiveWeight;
    private morphTargetActiveIndex;
    private morphtargetChannels;
    private _morphWeightChange;
    constructor();
    getMesh(): Mesh;
    protected _changeVertexDefine(mesh: Mesh): void;
    private _morphTargetValues;
    setMorphChannelWeight(channelName: string, weight: number): void;
    protected _applyMorphdata(): void;
    protected _changeMorphData(mesh: Mesh): void;
    protected _onDestroy(): void;
    _cloneTo(dest: Component): void;
}
