import { VertexDeclaration } from "../../../RenderEngine/VertexDeclaration";
import { Bounds } from "../../math/Bounds";
import { MorphTargetChannel } from "./MorphTarget";
export declare class MorphTargetData {
    private targets;
    private channels;
    vertexCount: number;
    elementCount: number;
    vertexDec: VertexDeclaration;
    bounds: Bounds;
    constructor();
    addMorphChannel(channel: MorphTargetChannel): void;
    getMorphChannel(name: string): MorphTargetChannel;
    getMorphChannelbyIndex(index: number): MorphTargetChannel;
    get channelCount(): number;
    initData(): void;
    destroy(): void;
    clone(): MorphTargetData;
}
