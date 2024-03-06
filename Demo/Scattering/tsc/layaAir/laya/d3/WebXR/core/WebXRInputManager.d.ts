import { Vector3 } from "../../../maths/Vector3";
import { PixelLineSprite3D } from "../../core/pixelLine/PixelLineSprite3D";
import { Sprite3D } from "../../core/Sprite3D";
import { WebXRCameraManager } from "./WebXRCameraManager";
import { WebXRInput } from "./WebXRInput";
import { WebXRSessionManager } from "./WebXRSessionManager";
export declare class WebXRInputManager {
    static tempVec: Vector3;
    static tempVec1: Vector3;
    private webXRSessionManager;
    private webXRCameraManager;
    private controllers;
    private controllerHandMesh;
    private controllerLineRender;
    private lineColor;
    private rayLength;
    constructor(webxrManager: WebXRSessionManager, webXRCamera: WebXRCameraManager);
    private _updataMeshRender;
    private _updateFromXRFrame;
    bindMeshNode(meshSprite: Sprite3D, handness: string): void;
    bindRayNode(lineSprite: PixelLineSprite3D, handness: string): void;
    getController(handness: string): WebXRInput;
}
