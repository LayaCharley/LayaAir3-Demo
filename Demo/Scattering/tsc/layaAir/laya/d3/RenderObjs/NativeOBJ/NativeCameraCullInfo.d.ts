import { Vector3 } from "../../../maths/Vector3";
import { ICameraCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/ICameraCullInfo";
import { BoundFrustum } from "../../math/BoundFrustum";
export declare class NativeCameraCullInfo implements ICameraCullInfo {
    private _position;
    private _useOcclusionCulling;
    private _cullingMask;
    private _staticMask;
    private _nativeObj;
    private static MemoryBlock_size;
    private nativeMemory;
    private float64Array;
    boundFrustum: BoundFrustum;
    constructor();
    set position(position: Vector3);
    get position(): Vector3;
    set useOcclusionCulling(useOcclusionCulling: Boolean);
    get useOcclusionCulling(): Boolean;
    set cullingMask(cullingMask: number);
    get cullingMask(): number;
    set staticMask(value: number);
    get staticMask(): number;
}
