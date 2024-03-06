import { Vector3 } from "../../../maths/Vector3";
import { ICameraCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { BoundFrustum } from "../../math/BoundFrustum";
export declare class CameraCullInfo implements ICameraCullInfo {
    position: Vector3;
    useOcclusionCulling: Boolean;
    boundFrustum: BoundFrustum;
    cullingMask: number;
    staticMask: number;
}
