import { Vector3 } from "../../../maths/Vector3";
import { IShadowCullInfo } from "../../../RenderEngine/RenderInterface/RenderPipelineInterface/IShadowCullInfo";
import { BoundSphere } from "../../math/BoundSphere";
import { Plane } from "../../math/Plane";
export declare class NativeShadowCullInfo implements IShadowCullInfo {
    private _position;
    private _cullPlanes;
    private _direction;
    private _nativeObj;
    private _cullSphere;
    private _cullPlaneCount;
    static MemoryBlock_size: number;
    private nativeMemory;
    private float64Array;
    constructor();
    set cullPlanes(cullPlanes: Plane[]);
    get cullPlanes(): Plane[];
    set cullSphere(cullSphere: BoundSphere);
    get cullSphere(): BoundSphere;
    set position(position: Vector3);
    get position(): Vector3;
    set direction(direction: Vector3);
    get direction(): Vector3;
    set cullPlaneCount(cullPlaneCount: number);
    get cullPlaneCount(): number;
}
