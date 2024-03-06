import { BoundFrustum } from "../../../d3/math/BoundFrustum";
import { Vector3 } from "../../../maths/Vector3";
export interface ICameraCullInfo {
    position: Vector3;
    useOcclusionCulling: Boolean;
    boundFrustum: BoundFrustum;
    cullingMask: number;
    staticMask: number;
}
