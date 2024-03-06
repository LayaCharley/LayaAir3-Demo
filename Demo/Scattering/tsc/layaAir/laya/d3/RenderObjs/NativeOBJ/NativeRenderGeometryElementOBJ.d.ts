import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { BufferState } from "../../../webgl/utils/BufferState";
export declare class NativeRenderGeometryElementOBJ implements IRenderGeometryElement {
    _nativeObj: any;
    clearRenderParams(): void;
    set bufferState(value: BufferState);
    get bufferState(): BufferState;
    set mode(value: MeshTopology);
    get mode(): MeshTopology;
    set drawType(value: DrawType);
    get drawType(): DrawType;
    set instanceCount(value: number);
    get instanceCount(): number;
    set indexFormat(value: IndexFormat);
    get indexFormat(): IndexFormat;
}
