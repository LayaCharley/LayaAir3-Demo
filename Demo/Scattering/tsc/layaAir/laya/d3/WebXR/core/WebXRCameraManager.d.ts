import { Quaternion } from "../../../maths/Quaternion";
import { Vector3 } from "../../../maths/Vector3";
import { WebXRCamera } from "./WebXRCamera";
import { WebXRSessionManager } from "./WebXRSessionManager";
export declare class WebXRCameraManager {
    private _referenceQuaternion;
    private _referencedPosition;
    private _webXRSessionManager;
    private _firstFrame;
    private _XRRenderTexture;
    private _rigCameras;
    private _position;
    owner: any;
    get position(): Vector3;
    set position(newPosition: Vector3);
    set rotationQuaternion(value: Quaternion);
    get rotationQuaternion(): Quaternion;
    get rigCameras(): WebXRCamera[];
    constructor(camera: any, manager?: WebXRSessionManager);
    _updateFromXRSession(): void;
    private _updateNumberOfRigCameras;
    private _updateReferenceSpace;
    destroy(): void;
}
