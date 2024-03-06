import { BaseTexture } from "../../resource/BaseTexture";
import { PostProcess } from "../component/PostProcess";
import { DepthTextureMode } from "../depthMap/DepthPass";
import { BoundFrustum } from "../math/BoundFrustum";
import { Ray } from "../math/Ray";
import { Viewport } from "../math/Viewport";
import { BaseCamera } from "./BaseCamera";
import { CommandBuffer } from "./render/command/CommandBuffer";
import { RenderContext3D } from "./render/RenderContext3D";
import { Scene3D } from "./scene/Scene3D";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { TextureCube } from "../../resource/TextureCube";
import { TextureFormat } from "../../RenderEngine/RenderEnum/TextureFormat";
import { Texture2D } from "../../resource/Texture2D";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector2 } from "../../maths/Vector2";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { RenderTexture } from "../../resource/RenderTexture";
export declare enum CameraClearFlags {
    SolidColor = 0,
    Sky = 1,
    DepthOnly = 2,
    Nothing = 3,
    ColorOnly = 4
}
export declare enum CameraEventFlags {
    BeforeForwardOpaque = 0,
    BeforeSkyBox = 2,
    BeforeTransparent = 4,
    BeforeImageEffect = 6,
    AfterEveryThing = 8
}
export declare class Camera extends BaseCamera {
    static _contextScissorPortCatch: Vector4;
    static set _updateMark(value: number);
    static get _updateMark(): number;
    static drawRenderTextureByScene(camera: Camera, scene: Scene3D, renderTexture: RenderTexture, shader?: Shader3D, replaceFlag?: string): RenderTexture;
    static getTexturePixel(texture: Texture2D): ArrayBufferView;
    static drawTextureCubePixelByScene(camera: Camera, scene: Scene3D, renderCubeSize: number, format: TextureFormat, cullingMask: number): ArrayBufferView[];
    static drawTextureCubeByScene(camera: Camera, position: Vector3, scene: Scene3D, renderCubeSize: number, format: TextureFormat, cullingMask?: number): TextureCube;
    protected _depthTextureFormat: RenderTargetFormat;
    private _depthTexture;
    private _depthNormalsTexture;
    private _opaqueTexture;
    private _opaquePass;
    private _cameraEventCommandBuffer;
    enableRender: boolean;
    clearFlag: CameraClearFlags;
    _cacheDepth: boolean;
    _cacheDepthTexture: RenderTexture;
    get aspectRatio(): number;
    set aspectRatio(value: number);
    get viewport(): Viewport;
    set viewport(value: Viewport);
    get clientWidth(): number;
    get clientHeight(): number;
    set msaa(value: boolean);
    get msaa(): boolean;
    set fxaa(value: boolean);
    get fxaa(): boolean;
    get normalizedViewport(): Viewport;
    set normalizedViewport(value: Viewport);
    get viewMatrix(): Matrix4x4;
    get projectionMatrix(): Matrix4x4;
    set projectionMatrix(value: Matrix4x4);
    get projectionViewMatrix(): Matrix4x4;
    get boundFrustum(): BoundFrustum;
    get renderTarget(): RenderTexture;
    set renderTarget(value: RenderTexture);
    get postProcess(): PostProcess;
    set postProcess(value: PostProcess);
    get enableHDR(): boolean;
    set enableHDR(value: boolean);
    get enableBuiltInRenderTexture(): boolean;
    set enableBuiltInRenderTexture(value: boolean);
    get depthTextureMode(): DepthTextureMode;
    set depthTextureMode(value: DepthTextureMode);
    set opaquePass(value: boolean);
    get opaquePass(): boolean;
    get depthTextureFormat(): RenderTargetFormat;
    set depthTextureFormat(value: RenderTargetFormat);
    set enableBlitDepth(value: boolean);
    get enableBlitDepth(): boolean;
    get canblitDepth(): boolean;
    constructor(aspectRatio?: number, nearPlane?: number, farPlane?: number);
    _isLayerVisible(layer: number): boolean;
    clone(): Camera;
    _needRenderGamma(rt: RenderTargetFormat): boolean;
    _updateCameraRenderData(context: RenderContext3D): void;
    _applyCommandBuffer(event: number, context: RenderContext3D): void;
    recoverRenderContext3D(context: RenderContext3D, renderTexture: RenderTexture): void;
    set depthTexture(value: BaseTexture);
    set depthNormalTexture(value: RenderTexture);
    _createOpaqueTexture(currentTarget: RenderTexture, renderContext: RenderContext3D): void;
    render(shader?: Shader3D, replacementTag?: string): void;
    viewportPointToRay(point: Vector2, out: Ray): void;
    normalizedViewportPointToRay(point: Vector2, out: Ray): void;
    worldToViewportPoint(position: Vector3, out: Vector4): void;
    worldToNormalizedViewportPoint(position: Vector3, out: Vector4): void;
    convertScreenCoordToOrthographicCoord(source: Vector3, out: Vector3): boolean;
    destroy(destroyChild?: boolean): void;
    addCommandBuffer(event: CameraEventFlags, commandBuffer: CommandBuffer): void;
    removeCommandBuffer(event: CameraEventFlags, commandBuffer: CommandBuffer): void;
    removeCommandBuffers(event: CameraEventFlags): void;
}
