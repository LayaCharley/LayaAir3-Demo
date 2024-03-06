import { IRenderGeometryElement } from "../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { DrawType } from "../../RenderEngine/RenderEnum/DrawType";
import { BufferState } from "../../webgl/utils/BufferState";
export declare class GeometryElement {
    protected _owner: any;
    static _typeCounter: number;
    _geometryElementOBj: IRenderGeometryElement;
    set bufferState(value: BufferState);
    get bufferState(): BufferState;
    set mode(value: MeshTopology);
    get mode(): MeshTopology;
    set drawType(value: number);
    get drawType(): number;
    setDrawArrayParams(first: number, count: number): void;
    setDrawElemenParams(count: number, offset: number): void;
    set instanceCount(value: number);
    get instanceCount(): number;
    set indexFormat(value: IndexFormat);
    get indexFormat(): IndexFormat;
    get destroyed(): boolean;
    constructor(mode: MeshTopology, drawType: DrawType);
    _getType(): number;
    destroy(): void;
    clearRenderParams(): void;
}
