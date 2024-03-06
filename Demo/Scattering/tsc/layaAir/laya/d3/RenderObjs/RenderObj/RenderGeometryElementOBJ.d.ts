import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { IRenderGeometryElement } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IRenderGeometryElement";
import { SingletonList } from "../../../utils/SingletonList";
export declare class FastSinglelist<T> extends SingletonList<T> {
}
export declare class RenderGeometryElementOBJ implements IRenderGeometryElement {
    get indexFormat(): IndexFormat;
    set indexFormat(value: IndexFormat);
    get mode(): MeshTopology;
    set mode(value: MeshTopology);
}
