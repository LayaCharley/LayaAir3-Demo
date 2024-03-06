import { Config3D } from "../../../Config3D";
import { ILaya3D } from "../../../ILaya3D";
import { Event } from "../../events/Event";
import { LayaGL } from "../../layagl/LayaGL";
import { DepthPass, DepthTextureMode } from "../depthMap/DepthPass";
import { Cluster } from "../graphics/renderPath/Cluster";
import { BoundFrustum } from "../math/BoundFrustum";
import { Viewport } from "../math/Viewport";
import { Picker } from "../utils/Picker";
import { BaseCamera } from "./BaseCamera";
import { ShadowMode } from "./light/ShadowMode";
import { ShadowUtils } from "./light/ShadowUtils";
import { BlitScreenQuadCMD } from "./render/command/BlitScreenQuadCMD";
import { CommandBuffer } from "./render/command/CommandBuffer";
import { RenderContext3D } from "./render/RenderContext3D";
import { Scene3D } from "./scene/Scene3D";
import { Scene3DShaderDeclaration } from "./scene/Scene3DShaderDeclaration";
import { Transform3D } from "./Transform3D";
import { FilterMode } from "../../RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderCapable } from "../../RenderEngine/RenderEnum/RenderCapable";
import { ILaya } from "../../../ILaya";
import { ShadowLightType } from "../shadowMap/ShadowLightType";
import { TextureCube } from "../../resource/TextureCube";
import { TextureFormat } from "../../RenderEngine/RenderEnum/TextureFormat";
import { Texture2D } from "../../resource/Texture2D";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Quaternion } from "../../maths/Quaternion";
import { Vector2 } from "../../maths/Vector2";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { RenderTexture } from "../../resource/RenderTexture";
import { Stat } from "../../utils/Stat";
import { WrapMode } from "../../RenderEngine/RenderEnum/WrapMode";
export var CameraClearFlags;
(function (CameraClearFlags) {
    CameraClearFlags[CameraClearFlags["SolidColor"] = 0] = "SolidColor";
    CameraClearFlags[CameraClearFlags["Sky"] = 1] = "Sky";
    CameraClearFlags[CameraClearFlags["DepthOnly"] = 2] = "DepthOnly";
    CameraClearFlags[CameraClearFlags["Nothing"] = 3] = "Nothing";
    CameraClearFlags[CameraClearFlags["ColorOnly"] = 4] = "ColorOnly";
})(CameraClearFlags || (CameraClearFlags = {}));
export var CameraEventFlags;
(function (CameraEventFlags) {
    CameraEventFlags[CameraEventFlags["BeforeForwardOpaque"] = 0] = "BeforeForwardOpaque";
    CameraEventFlags[CameraEventFlags["BeforeSkyBox"] = 2] = "BeforeSkyBox";
    CameraEventFlags[CameraEventFlags["BeforeTransparent"] = 4] = "BeforeTransparent";
    CameraEventFlags[CameraEventFlags["BeforeImageEffect"] = 6] = "BeforeImageEffect";
    CameraEventFlags[CameraEventFlags["AfterEveryThing"] = 8] = "AfterEveryThing";
})(CameraEventFlags || (CameraEventFlags = {}));
export class Camera extends BaseCamera {
    constructor(aspectRatio = 0, nearPlane = 0.3, farPlane = 1000) {
        super(nearPlane, farPlane);
        this._updateViewMatrix = true;
        this._postProcess = null;
        this._enableHDR = false;
        this._viewportParams = new Vector4();
        this._projectionParams = new Vector4();
        this._needBuiltInRenderTexture = false;
        this._msaa = false;
        this._fxaa = false;
        this._offScreenRenderTexture = null;
        this._internalRenderTexture = null;
        this._canBlitDepth = false;
        this._internalCommandBuffer = new CommandBuffer();
        this._depthTextureFormat = RenderTargetFormat.DEPTH_16;
        this._cameraEventCommandBuffer = {};
        this._shadowCasterCommanBuffer = [];
        this._clusterPlaneCacheFlag = new Vector2(-1, -1);
        this._screenOffsetScale = new Vector4();
        this.enableRender = true;
        this.clearFlag = CameraClearFlags.SolidColor;
        this._viewMatrix = new Matrix4x4();
        this._projectionMatrix = new Matrix4x4();
        this._projectionViewMatrix = new Matrix4x4();
        this._viewport = new Viewport(0, 0, 0, 0);
        this._normalizedViewport = new Viewport(0, 0, 1, 1);
        this._rayViewport = new Viewport(0, 0, 0, 0);
        this._aspectRatio = aspectRatio;
        this._boundFrustum = new BoundFrustum(new Matrix4x4());
        this._depthTextureMode = 0;
        this.opaquePass = false;
        this._calculateProjectionMatrix();
        ILaya.stage.on(Event.RESIZE, this, this._onScreenSizeChanged);
        this.transform.on(Event.TRANSFORM_CHANGED, this, this._onTransformChanged);
    }
    static set _updateMark(value) {
        Camera.__updateMark = value;
    }
    static get _updateMark() {
        return Camera.__updateMark;
    }
    static drawRenderTextureByScene(camera, scene, renderTexture, shader = null, replaceFlag = null) {
        if (!renderTexture)
            return null;
        Scene3D._updateMark++;
        scene._prepareSceneToRender();
        scene._setCullCamera(camera);
        let recoverTexture = camera.renderTarget;
        camera.renderTarget = renderTexture;
        var viewport = camera.viewport;
        var needInternalRT = camera._needInternalRenderTexture();
        var context = RenderContext3D._instance;
        var scene = context.scene = scene;
        context.pipelineMode = context.configPipeLineMode;
        context.replaceTag = replaceFlag;
        context.customShader = shader;
        if (needInternalRT) {
            camera._internalRenderTexture = RenderTexture.createFromPool(viewport.width, viewport.height, camera._getRenderTextureFormat(), camera.depthTextureFormat, false, camera.msaa ? 4 : 1, false, camera._needRenderGamma(camera._getRenderTextureFormat()));
            camera._internalRenderTexture.filterMode = FilterMode.Bilinear;
        }
        else {
            camera._internalRenderTexture = null;
        }
        scene._componentDriver.callPreRender();
        var needShadowCasterPass = camera._renderShadowMap(scene, context);
        camera._preRenderMainPass(context, scene, needInternalRT, viewport);
        camera._renderMainPass(context, viewport, scene, shader, replaceFlag, needInternalRT);
        camera._aftRenderMainPass(needShadowCasterPass);
        camera.renderTarget = recoverTexture;
        scene.recaculateCullCamera();
        scene._componentDriver.callPostRender();
        if (camera._internalRenderTexture)
            (!camera._internalRenderTexture._inPool) && RenderTexture.recoverToPool(camera._internalRenderTexture);
        return renderTexture;
    }
    static getTexturePixel(texture) {
        let coverFilter = texture.filterMode;
        texture.filterMode = FilterMode.Point;
        let rtFormat = RenderTargetFormat.R8G8B8;
        let pixelData;
        let size = texture.width * texture.height;
        switch (texture.format) {
            case TextureFormat.R32G32B32A32:
            case TextureFormat.R16G16B16A16:
                rtFormat = RenderTargetFormat.R32G32B32A32;
                pixelData = new Float32Array(size * 4);
                break;
            case TextureFormat.R32G32B32:
            case TextureFormat.R16G16B16:
                rtFormat = RenderTargetFormat.R32G32B32;
                pixelData = new Float32Array(size * 3);
                break;
            case TextureFormat.R5G6B5:
            case TextureFormat.R8G8B8:
                rtFormat = RenderTargetFormat.R8G8B8;
                pixelData = new Uint8Array(size * 3);
                break;
            default:
                rtFormat = RenderTargetFormat.R8G8B8A8;
                pixelData = new Uint8Array(size * 4);
                break;
        }
        let rt = new RenderTexture(texture.width, texture.height, rtFormat, RenderTargetFormat.None, false, 0, false);
        var blit = BlitScreenQuadCMD.create(texture, rt);
        blit.setContext(RenderContext3D._instance);
        blit.run();
        blit.recover();
        texture.filterMode = coverFilter;
        rt.getData(0, 0, texture.width, texture.height, pixelData);
        rt.destroy();
        return pixelData;
    }
    static drawTextureCubePixelByScene(camera, scene, renderCubeSize, format, cullingMask) {
        let rtFormat = RenderTargetFormat.R8G8B8;
        let pixelData;
        let size = renderCubeSize * renderCubeSize;
        let bytelength;
        switch (format) {
            case TextureFormat.R32G32B32A32:
            case TextureFormat.R16G16B16A16:
                rtFormat = RenderTargetFormat.R32G32B32A32;
                size *= 4;
                bytelength = 4;
                break;
            case TextureFormat.R32G32B32:
            case TextureFormat.R16G16B16:
                rtFormat = RenderTargetFormat.R32G32B32;
                size *= 3;
                bytelength = 4;
                break;
            case TextureFormat.R5G6B5:
            case TextureFormat.R8G8B8:
                rtFormat = RenderTargetFormat.R8G8B8;
                size *= 3;
                bytelength = 1;
                break;
            case TextureFormat.R8G8B8A8:
                rtFormat = RenderTargetFormat.R8G8B8A8;
                pixelData = new Uint8Array(size * 4);
                size *= 4;
                bytelength = 1;
                break;
            default:
                throw "Type is not supported";
                break;
        }
        let rt = new RenderTexture(renderCubeSize, renderCubeSize, rtFormat, RenderTargetFormat.DEPTH_16, false, 0, false, false);
        camera.fieldOfView = 90;
        camera.cullingMask = cullingMask;
        let pixels = [];
        let quaterionArray = [
            new Quaternion(0, 1, 0, 0),
            new Quaternion(0, 0, 0, 1),
            new Quaternion(0, 0.7071068, 0, 0.7071068),
            new Quaternion(0, 0.7071068, 0, -0.7071068),
            new Quaternion(0, 0.7071068, -0.7071068, 0),
            new Quaternion(0, -0.7071068, -0.7071068, 0),
        ];
        for (var i = 0; i < 6; i++) {
            camera.transform.rotation = quaterionArray[i];
            this.drawRenderTextureByScene(camera, scene, rt);
            if (bytelength == 4)
                pixelData = new Float32Array(size);
            else
                pixelData = new Uint8Array(size);
            pixels[i] = rt.getData(0, 0, renderCubeSize, renderCubeSize, pixelData);
        }
        rt.destroy();
        return pixels;
    }
    static drawTextureCubeByScene(camera, position, scene, renderCubeSize, format, cullingMask = 0) {
        camera.transform.position = position;
        let pixels = this.drawTextureCubePixelByScene(camera, scene, renderCubeSize, format, cullingMask);
        let finalformat;
        switch (format) {
            case TextureFormat.R32G32B32A32:
            case TextureFormat.R16G16B16A16:
                finalformat = TextureFormat.R32G32B32A32;
                break;
            case TextureFormat.R32G32B32:
            case TextureFormat.R16G16B16:
                finalformat = TextureFormat.R32G32B32;
                break;
            case TextureFormat.R5G6B5:
            case TextureFormat.R8G8B8:
                finalformat = TextureFormat.R8G8B8;
                break;
            case TextureFormat.R8G8B8A8:
                finalformat = TextureFormat.R8G8B8A8;
                break;
            default:
                throw "Type is not supported";
        }
        let textureCube = new TextureCube(renderCubeSize, format, true, false);
        textureCube.setPixelsData(pixels, false, false);
        return textureCube;
    }
    static __init__() {
        Camera.depthPass = new DepthPass();
    }
    get aspectRatio() {
        if (this._aspectRatio === 0) {
            var vp = this.viewport;
            return vp.width / vp.height;
        }
        return this._aspectRatio;
    }
    set aspectRatio(value) {
        if (value < 0)
            throw new Error("Camera: the aspect ratio has to be a positive real number.");
        this._aspectRatio = value;
        this._calculateProjectionMatrix();
    }
    get viewport() {
        if (this._offScreenRenderTexture)
            this._calculationViewport(this._normalizedViewport, this._offScreenRenderTexture.width, this._offScreenRenderTexture.height);
        else
            this._calculationViewport(this._normalizedViewport, this.clientWidth, this.clientHeight);
        return this._viewport;
    }
    set viewport(value) {
        var width;
        var height;
        if (this._offScreenRenderTexture) {
            width = this._offScreenRenderTexture.width;
            height = this._offScreenRenderTexture.height;
        }
        else {
            width = this.clientWidth;
            height = this.clientHeight;
        }
        this._normalizedViewport.x = value.x / width;
        this._normalizedViewport.y = value.y / height;
        this._normalizedViewport.width = value.width / width;
        this._normalizedViewport.height = value.height / height;
        this._calculationViewport(this._normalizedViewport, width, height);
        this._calculateProjectionMatrix();
    }
    get clientWidth() {
        ILaya.stage.needUpdateCanvasSize();
        if (Config3D.customResolution)
            return Config3D.pixelRatio * Config3D._resoluWidth | 0;
        else
            return RenderContext3D.clientWidth * Config3D.pixelRatio | 0;
    }
    get clientHeight() {
        ILaya.stage.needUpdateCanvasSize();
        if (Config3D.customResolution)
            return Config3D.pixelRatio * Config3D._resoluHeight | 0;
        else
            return RenderContext3D.clientHeight * Config3D.pixelRatio | 0;
    }
    set msaa(value) {
        LayaGL.renderEngine.getCapable(RenderCapable.MSAA) ? this._msaa = value : this._msaa = false;
    }
    get msaa() {
        return this._msaa && Stat.enablemsaa;
    }
    set fxaa(value) {
        this._fxaa = value;
    }
    get fxaa() {
        return this._fxaa;
    }
    get normalizedViewport() {
        return this._normalizedViewport;
    }
    set normalizedViewport(value) {
        var width;
        var height;
        if (this._offScreenRenderTexture) {
            width = this._offScreenRenderTexture.width;
            height = this._offScreenRenderTexture.height;
        }
        else {
            width = this.clientWidth;
            height = this.clientHeight;
        }
        if (this._normalizedViewport !== value)
            value.cloneTo(this._normalizedViewport);
        this._calculationViewport(value, width, height);
        this._calculateProjectionMatrix();
    }
    get viewMatrix() {
        if (this._updateViewMatrix) {
            var scale = this.transform.getWorldLossyScale();
            var scaleX = scale.x;
            var scaleY = scale.y;
            var scaleZ = scale.z;
            var viewMatE = this._viewMatrix.elements;
            this.transform.worldMatrix.cloneTo(this._viewMatrix);
            viewMatE[0] /= scaleX;
            viewMatE[1] /= scaleX;
            viewMatE[2] /= scaleX;
            viewMatE[4] /= scaleY;
            viewMatE[5] /= scaleY;
            viewMatE[6] /= scaleY;
            viewMatE[8] /= scaleZ;
            viewMatE[9] /= scaleZ;
            viewMatE[10] /= scaleZ;
            this._viewMatrix.invert(this._viewMatrix);
            this._updateViewMatrix = false;
        }
        return this._viewMatrix;
    }
    get projectionMatrix() {
        return this._projectionMatrix;
    }
    set projectionMatrix(value) {
        this._projectionMatrix = value;
        this._useUserProjectionMatrix = true;
    }
    get projectionViewMatrix() {
        Matrix4x4.multiply(this.projectionMatrix, this.viewMatrix, this._projectionViewMatrix);
        return this._projectionViewMatrix;
    }
    get boundFrustum() {
        this._boundFrustum.matrix = this.projectionViewMatrix;
        return this._boundFrustum;
    }
    get renderTarget() {
        return this._offScreenRenderTexture;
    }
    set renderTarget(value) {
        var lastValue = this._offScreenRenderTexture;
        if (lastValue !== value) {
            (lastValue) && (lastValue._isCameraTarget = false);
            (value) && (value._isCameraTarget = true);
            this._offScreenRenderTexture = value;
            this._calculateProjectionMatrix();
        }
    }
    get postProcess() {
        return this._postProcess;
    }
    set postProcess(value) {
        this._postProcess = value;
    }
    get enableHDR() {
        return this._enableHDR;
    }
    set enableHDR(value) {
        if (value && !LayaGL.renderEngine.getCapable(RenderCapable.RenderTextureFormat_R16G16B16A16)) {
            console.warn("Camera:can't enable HDR in this device.");
            return;
        }
        this._enableHDR = value;
    }
    get enableBuiltInRenderTexture() {
        return this._needBuiltInRenderTexture;
    }
    set enableBuiltInRenderTexture(value) {
        this._needBuiltInRenderTexture = value;
    }
    get depthTextureMode() {
        return this._depthTextureMode;
    }
    set depthTextureMode(value) {
        this._depthTextureMode = value;
    }
    set opaquePass(value) {
        if (value == this._opaquePass)
            return;
        if (!value) {
            this._shaderValues.setTexture(BaseCamera.OPAQUETEXTURE, Texture2D.blackTexture);
            this._shaderValues.setVector(BaseCamera.OPAQUETEXTUREPARAMS, Vector4.ONE);
            this._opaqueTexture && RenderTexture.recoverToPool(this._opaqueTexture);
            this._opaqueTexture = null;
        }
        this._opaquePass = value;
    }
    get opaquePass() {
        return this._opaquePass;
    }
    get depthTextureFormat() {
        return this._depthTextureFormat;
    }
    set depthTextureFormat(value) {
        this._depthTextureFormat = value;
    }
    set enableBlitDepth(value) {
        if (value == this._canBlitDepth)
            return;
        this._canBlitDepth = value;
        this._cacheDepth = value;
        if (value)
            this._internalRenderTexture && (this._internalRenderTexture.generateDepthTexture = true);
        else {
            this._internalRenderTexture && (this._internalRenderTexture.generateDepthTexture = false);
            if (this._cacheDepthTexture)
                this._cacheDepthTexture._inPool ? 0 : RenderTexture.recoverToPool(this._cacheDepthTexture);
        }
    }
    get enableBlitDepth() {
        return this._canBlitDepth;
    }
    get canblitDepth() {
        return this._canBlitDepth && this._internalRenderTexture && this._internalRenderTexture.depthStencilFormat != null;
    }
    _calculationViewport(normalizedViewport, width, height) {
        var lx = normalizedViewport.x * width;
        var ly = normalizedViewport.y * height;
        var rx = lx + Math.max(normalizedViewport.width * width, 0);
        var ry = ly + Math.max(normalizedViewport.height * height, 0);
        var ceilLeftX = Math.ceil(lx);
        var ceilLeftY = Math.ceil(ly);
        var floorRightX = Math.floor(rx);
        var floorRightY = Math.floor(ry);
        var pixelLeftX = ceilLeftX - lx >= 0.5 ? Math.floor(lx) : ceilLeftX;
        var pixelLeftY = ceilLeftY - ly >= 0.5 ? Math.floor(ly) : ceilLeftY;
        var pixelRightX = rx - floorRightX >= 0.5 ? Math.ceil(rx) : floorRightX;
        var pixelRightY = ry - floorRightY >= 0.5 ? Math.ceil(ry) : floorRightY;
        this._viewport.x = pixelLeftX;
        this._viewport.y = pixelLeftY;
        this._viewport.width = pixelRightX - pixelLeftX;
        this._viewport.height = pixelRightY - pixelLeftY;
    }
    _calculateProjectionMatrix() {
        if (!this._useUserProjectionMatrix) {
            if (this._orthographic) {
                var halfHeight = this.orthographicVerticalSize * 0.5;
                var halfWidth = halfHeight * this.aspectRatio;
                Matrix4x4.createOrthoOffCenter(-halfWidth, halfWidth, -halfHeight, halfHeight, this.nearPlane, this.farPlane, this._projectionMatrix);
            }
            else {
                Matrix4x4.createPerspective(3.1416 * this.fieldOfView / 180.0, this.aspectRatio, this.nearPlane, this.farPlane, this._projectionMatrix);
            }
        }
    }
    _isLayerVisible(layer) {
        return (Math.pow(2, layer) & this.cullingMask) != 0;
    }
    _onTransformChanged(flag) {
        flag &= Transform3D.TRANSFORM_WORLDMATRIX;
        (flag) && (this._updateViewMatrix = true);
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        var clearFlagData = data.clearFlag;
        (clearFlagData !== undefined) && (this.clearFlag = clearFlagData);
        var viewport = data.viewport;
        this.normalizedViewport = new Viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
        var enableHDR = data.enableHDR;
        (enableHDR !== undefined) && (this.enableHDR = enableHDR);
    }
    clone() {
        let camera = super.clone();
        camera.clearFlag = this.clearFlag;
        this.clearColor.cloneTo(camera.clearColor);
        camera.clearColor = camera.clearColor;
        camera.viewport = this.viewport;
        this.normalizedViewport.cloneTo(camera.normalizedViewport);
        camera.enableHDR = this.enableHDR;
        camera.farPlane = this.farPlane;
        camera.nearPlane = this.nearPlane;
        camera.fieldOfView = this.fieldOfView;
        camera.orthographic = this.orthographic;
        camera.orthographicVerticalSize = this.orthographicVerticalSize;
        camera.opaquePass = this.opaquePass;
        camera._cameraEventCommandBuffer = this._cameraEventCommandBuffer;
        return camera;
    }
    _getCanvasWidth() {
        if (this._offScreenRenderTexture)
            return this._offScreenRenderTexture.width;
        else
            return this.clientWidth;
    }
    _getCanvasHeight() {
        if (this._offScreenRenderTexture)
            return this._offScreenRenderTexture.height;
        else
            return this.clientHeight;
    }
    _getRenderTexture() {
        return this._internalRenderTexture || this._offScreenRenderTexture;
    }
    _needRenderGamma(rt) {
        switch (rt) {
            case RenderTargetFormat.R8G8B8:
            case RenderTargetFormat.R8G8B8A8:
                return true;
            default:
                return false;
        }
    }
    _needInternalRenderTexture() {
        return (this._postProcess && this._postProcess.enable) || this._enableHDR || this._needBuiltInRenderTexture ? true : false;
    }
    _getRenderTextureFormat() {
        if (this._enableHDR)
            return RenderTargetFormat.R16G16B16A16;
        else
            return RenderTargetFormat.R8G8B8A8;
    }
    _updateCameraRenderData(context) {
        this._prepareCameraToRender();
        this._applyViewProject(context, this.viewMatrix, this._projectionMatrix);
    }
    _prepareCameraToRender() {
        super._prepareCameraToRender();
        var vp = this.viewport;
        this._viewportParams.setValue(vp.x, vp.y, vp.width, vp.height);
        this._projectionParams.setValue(this._nearPlane, this._farPlane, RenderContext3D._instance.invertY ? -1 : 1, 1 / this.farPlane);
        this._shaderValues.setVector(BaseCamera.VIEWPORT, this._viewportParams);
        this._shaderValues.setVector(BaseCamera.PROJECTION_PARAMS, this._projectionParams);
    }
    _applyViewProject(context, viewMat, proMat) {
        var projectView;
        if (context.invertY) {
            Matrix4x4.multiply(BaseCamera._invertYScaleMatrix, proMat, BaseCamera._invertYProjectionMatrix);
            Matrix4x4.multiply(BaseCamera._invertYProjectionMatrix, viewMat, BaseCamera._invertYProjectionViewMatrix);
            proMat = BaseCamera._invertYProjectionMatrix;
            projectView = BaseCamera._invertYProjectionViewMatrix;
        }
        else {
            Matrix4x4.multiply(proMat, viewMat, this._projectionViewMatrix);
            projectView = this._projectionViewMatrix;
        }
        context.viewMatrix = viewMat;
        context.projectionMatrix = proMat;
        context.projectionViewMatrix = projectView;
        this._shaderValues.setMatrix4x4(BaseCamera.VIEWMATRIX, viewMat);
        this._shaderValues.setMatrix4x4(BaseCamera.PROJECTMATRIX, proMat);
        this._shaderValues.setMatrix4x4(BaseCamera.VIEWPROJECTMATRIX, projectView);
    }
    _updateClusterPlaneXY() {
        var fieldOfView = this.fieldOfView;
        var aspectRatio = this.aspectRatio;
        if (this._clusterPlaneCacheFlag.x !== fieldOfView || this._clusterPlaneCacheFlag.y !== aspectRatio) {
            var clusterCount = Config3D.lightClusterCount;
            var xSlixe = clusterCount.x, ySlice = clusterCount.y;
            var xCount = xSlixe + 1, yCount = ySlice + 1;
            var xPlanes = this._clusterXPlanes, yPlanes = this._clusterYPlanes;
            if (!xPlanes) {
                xPlanes = this._clusterXPlanes = new Array(xCount);
                yPlanes = this._clusterYPlanes = new Array(yCount);
                for (var i = 0; i < xCount; i++)
                    xPlanes[i] = new Vector3();
                for (var i = 0; i < yCount; i++)
                    yPlanes[i] = new Vector3();
            }
            var halfY = Math.tan((this.fieldOfView / 2) * Math.PI / 180);
            var halfX = this.aspectRatio * halfY;
            var yLengthPerCluster = 2 * halfY / ySlice;
            var xLengthPerCluster = 2 * halfX / xSlixe;
            for (var i = 0; i < xCount; i++) {
                var angle = -halfX + xLengthPerCluster * i;
                var bigHypot = Math.sqrt(1 + angle * angle);
                var normX = 1 / bigHypot;
                var xPlane = xPlanes[i];
                xPlane.setValue(normX, 0, -angle * normX);
            }
            for (var i = 0; i < yCount; i++) {
                var angle = halfY - yLengthPerCluster * i;
                var bigHypot = Math.sqrt(1 + angle * angle);
                var normY = -1 / bigHypot;
                var yPlane = yPlanes[i];
                yPlane.setValue(0, normY, -angle * normY);
            }
            this._clusterPlaneCacheFlag.x = fieldOfView;
            this._clusterPlaneCacheFlag.y = aspectRatio;
        }
    }
    _applyCommandBuffer(event, context) {
        if (!Stat.enableCameraCMD)
            return;
        var commandBufferArray = this._cameraEventCommandBuffer[event];
        if (!commandBufferArray || commandBufferArray.length == 0)
            return;
        commandBufferArray.forEach(function (value) {
            value._context = context;
            value._apply();
        });
        (RenderTexture.currentActive) && (RenderTexture.currentActive._end());
        if (this._internalRenderTexture || this._offScreenRenderTexture)
            this._getRenderTexture()._start();
        else {
            LayaGL.textureContext.bindoutScreenTarget();
        }
        LayaGL.renderEngine.viewport(0, 0, context.viewport.width, context.viewport.height);
    }
    _applyCasterPassCommandBuffer(context) {
        if (!this._shadowCasterCommanBuffer || this._shadowCasterCommanBuffer.length == 0)
            return;
        this._shadowCasterCommanBuffer.forEach(function (value) {
            value._context = context;
            value._apply();
        });
    }
    _addCasterShadowCommandBuffer(commandBuffer) {
        if (this._shadowCasterCommanBuffer.indexOf(commandBuffer) < 0)
            this._shadowCasterCommanBuffer.push(commandBuffer);
    }
    _removeCasterShadowCommandBuffer(commandBuffer) {
        var index = this._shadowCasterCommanBuffer.indexOf(commandBuffer);
        if (index != -1)
            this._shadowCasterCommanBuffer.splice(index, 1);
    }
    _renderShadowMap(scene, context) {
        if (Scene3D._updateMark % scene._ShadowMapupdateFrequency != 0) {
            return false;
        }
        var shadowCasterPass;
        var mainDirectLight = scene._mainDirectionLight;
        var needShadowCasterPass = mainDirectLight && mainDirectLight.shadowMode !== ShadowMode.None && ShadowUtils.supportShadow() && Stat.enableShadow;
        if (needShadowCasterPass) {
            scene._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
            scene._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
            shadowCasterPass = ILaya3D.Scene3D._shadowCasterPass;
            shadowCasterPass.update(this, mainDirectLight, ShadowLightType.DirectionLight);
            shadowCasterPass.render(context, scene, ShadowLightType.DirectionLight, this);
        }
        else {
            scene._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
        }
        var spotMainLight = scene._mainSpotLight;
        var spotneedShadowCasterPass = spotMainLight && spotMainLight.shadowMode !== ShadowMode.None && ShadowUtils.supportShadow() && Stat.enableShadow;
        if (spotneedShadowCasterPass) {
            scene._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
            scene._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
            shadowCasterPass = ILaya3D.Scene3D._shadowCasterPass;
            shadowCasterPass.update(this, spotMainLight, ShadowLightType.SpotLight);
            shadowCasterPass.render(context, scene, ShadowLightType.SpotLight, this);
        }
        else {
            scene._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
        }
        if (needShadowCasterPass)
            scene._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW);
        if (spotneedShadowCasterPass)
            scene._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT);
        return needShadowCasterPass || spotneedShadowCasterPass;
    }
    _preRenderMainPass(context, scene, needInternalRT, viewport) {
        context.camera = this;
        context.cameraShaderValue = this._shaderValues;
        Camera._updateMark++;
        if (needInternalRT && !this._offScreenRenderTexture && (this.clearFlag == CameraClearFlags.DepthOnly || this.clearFlag == CameraClearFlags.Nothing)) {
            if (RenderTexture.bindCanvasRender) {
                if (RenderTexture.bindCanvasRender != this._internalRenderTexture) {
                    var blit = BlitScreenQuadCMD.create(RenderTexture.bindCanvasRender, this._internalRenderTexture);
                    blit.setContext(context);
                    blit.run();
                    blit.recover();
                }
            }
            else {
                if (this._enableHDR) {
                    var grabTexture = RenderTexture.createFromPool(viewport.width, viewport.height, RenderTargetFormat.R8G8B8, RenderTargetFormat.DEPTH_16, false, 1);
                    grabTexture.filterMode = FilterMode.Bilinear;
                    this._renderEngine.copySubFrameBuffertoTex(grabTexture, 0, 0, 0, viewport.x, RenderContext3D.clientHeight - (viewport.y + viewport.height), viewport.width, viewport.height);
                    var blit = BlitScreenQuadCMD.create(grabTexture, this._internalRenderTexture);
                    blit.setContext(context);
                    blit.run();
                    blit.recover();
                    RenderTexture.recoverToPool(grabTexture);
                }
            }
        }
    }
    _renderMainPass(context, viewport, scene, shader, replacementTag, needInternalRT) {
        var renderTex = this._getRenderTexture();
        if (renderTex && renderTex._isCameraTarget)
            context.invertY = true;
        else
            context.invertY = false;
        context.viewport = viewport;
        context.destTarget = renderTex;
        this._prepareCameraToRender();
        var multiLighting = Config3D._multiLighting;
        (multiLighting) && (Cluster.instance.update(this, (scene)));
        context.customShader = shader;
        context.replaceTag = replacementTag;
        scene._preCulling(context, this);
        this._applyViewProject(context, this.viewMatrix, this._projectionMatrix);
        if (this._cameraUniformData) {
            this._cameraUniformUBO && this._cameraUniformUBO.setDataByUniformBufferData(this._cameraUniformData);
        }
        this._renderDepthMode(context);
        (renderTex) && (renderTex._start());
        scene._clear(context);
        this._applyCommandBuffer(CameraEventFlags.BeforeForwardOpaque, context);
        this.recoverRenderContext3D(context, renderTex);
        Stat.enableOpaque && scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_RENDERQPAQUE);
        this._applyCommandBuffer(CameraEventFlags.BeforeSkyBox, context);
        scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_SKYBOX);
        this._applyCommandBuffer(CameraEventFlags.BeforeTransparent, context);
        this._opaquePass && this._createOpaqueTexture(renderTex, context);
        this.recoverRenderContext3D(context, renderTex);
        this.recoverRenderContext3D(context, renderTex);
        Stat.enableTransparent && scene._renderScene(context, ILaya3D.Scene3D.SCENERENDERFLAG_RENDERTRANSPARENT);
        this._applyCommandBuffer(CameraEventFlags.BeforeImageEffect, context);
        (renderTex) && (renderTex._end());
        if (needInternalRT && Stat.enablePostprocess) {
            if (this._postProcess && this._postProcess.enable) {
                this._postProcess.commandContext = context;
                this._postProcess._render(this);
                this._postProcess._applyPostProcessCommandBuffers();
            }
            else if (this._enableHDR || this._needBuiltInRenderTexture) {
                var canvasWidth = this._getCanvasWidth(), canvasHeight = this._getCanvasHeight();
                if (this._offScreenRenderTexture) {
                    this._screenOffsetScale.setValue(viewport.x / canvasWidth, (canvasHeight - viewport.y - viewport.height) / canvasHeight, viewport.width / canvasWidth, viewport.height / canvasHeight);
                    this._internalCommandBuffer._camera = this;
                    this._internalCommandBuffer._context = context;
                    this._internalCommandBuffer.blitScreenQuad(this._internalRenderTexture, this._offScreenRenderTexture, this._screenOffsetScale, null, null, 0);
                    this._internalCommandBuffer._apply();
                    this._internalCommandBuffer.clear();
                }
            }
        }
        if (this._offScreenRenderTexture) {
            RenderTexture.bindCanvasRender = null;
        }
        else
            RenderTexture.bindCanvasRender = this._internalRenderTexture;
        this._applyCommandBuffer(CameraEventFlags.AfterEveryThing, context);
    }
    recoverRenderContext3D(context, renderTexture) {
        const cacheViewPor = Camera._context3DViewPortCatch;
        const cacheScissor = Camera._contextScissorPortCatch;
        context.changeViewport(cacheViewPor.x, cacheViewPor.y, cacheViewPor.width, cacheViewPor.height);
        context.changeScissor(cacheScissor.x, cacheScissor.y, cacheScissor.z, cacheScissor.w);
        context.destTarget = renderTexture;
    }
    _renderDepthMode(context) {
        var cameraDepthMode = this._depthTextureMode;
        if (this._postProcess && this._postProcess.enable) {
            cameraDepthMode |= this._postProcess.cameraDepthTextureMode;
        }
        if ((cameraDepthMode & DepthTextureMode.Depth) != 0) {
            if (!this.canblitDepth || !this._internalRenderTexture.depthStencilTexture) {
                Camera.depthPass.update(this, DepthTextureMode.Depth, this._depthTextureFormat);
                Camera.depthPass.render(context, DepthTextureMode.Depth);
            }
            else {
                this.depthTexture = this._cacheDepthTexture.depthStencilTexture;
                Camera.depthPass._depthTexture = this.depthTexture;
                Camera.depthPass._setupDepthModeShaderValue(DepthTextureMode.Depth, this);
            }
        }
        if ((cameraDepthMode & DepthTextureMode.DepthNormals) != 0) {
            Camera.depthPass.update(this, DepthTextureMode.DepthNormals, this._depthTextureFormat);
            Camera.depthPass.render(context, DepthTextureMode.DepthNormals);
        }
    }
    get depthTexture() {
        return this._depthTexture;
    }
    set depthTexture(value) {
        this._depthTexture = value;
    }
    get depthNormalTexture() {
        return this._depthNormalsTexture;
    }
    set depthNormalTexture(value) {
        this._depthNormalsTexture = value;
    }
    _aftRenderMainPass(needShadowPass) {
        if (this._cacheDepth && this._internalRenderTexture) {
            if (this._cacheDepthTexture)
                this._cacheDepthTexture._inPool ? 0 : RenderTexture.recoverToPool(this._cacheDepthTexture);
            this._cacheDepthTexture = this._internalRenderTexture;
        }
        Camera.depthPass.cleanUp();
    }
    _createOpaqueTexture(currentTarget, renderContext) {
        if (!this._opaqueTexture) {
            let tex = this._getRenderTexture();
            this._opaqueTexture = RenderTexture.createFromPool(1024, 1024, tex.colorFormat, RenderTargetFormat.None, true, 1, false, true);
            this._opaqueTexture.filterMode = FilterMode.Bilinear;
            this._opaqueTexture.wrapModeU = WrapMode.Clamp;
            this._opaqueTexture.wrapModeV = WrapMode.Clamp;
            this._shaderValues.setTexture(BaseCamera.OPAQUETEXTURE, this._opaqueTexture);
            let opaqueTexParams = new Vector4();
            opaqueTexParams.x = this._opaqueTexture.width;
            opaqueTexParams.y = this._opaqueTexture.height;
            opaqueTexParams.z = this._opaqueTexture.maxMipmapLevel;
            this._shaderValues.setVector(BaseCamera.OPAQUETEXTUREPARAMS, opaqueTexParams);
        }
        var blit = BlitScreenQuadCMD.create(currentTarget, this._opaqueTexture);
        blit.setContext(renderContext);
        blit.run();
        blit.recover();
    }
    render(shader = null, replacementTag = null) {
        if (!this.activeInHierarchy)
            return;
        var viewport = this.viewport;
        var needInternalRT = this._needInternalRenderTexture();
        var context = RenderContext3D._instance;
        var scene = context.scene = this._scene;
        scene._setCullCamera(this);
        context.pipelineMode = context.configPipeLineMode;
        context.replaceTag = replacementTag;
        context.customShader = shader;
        let texFormat = this._getRenderTextureFormat();
        if (needInternalRT) {
            if (this.msaa) {
                this._internalRenderTexture = RenderTexture.createFromPool(viewport.width, viewport.height, texFormat, this._depthTextureFormat, false, 4, this.canblitDepth, this._needRenderGamma(texFormat));
                this._internalRenderTexture.filterMode = FilterMode.Bilinear;
            }
            else {
                this._internalRenderTexture = RenderTexture.createFromPool(viewport.width, viewport.height, texFormat, this._depthTextureFormat, false, 1, this.canblitDepth, this._needRenderGamma(texFormat));
                this._internalRenderTexture.filterMode = FilterMode.Bilinear;
            }
        }
        else {
            this._internalRenderTexture = null;
        }
        scene._componentDriver.callPreRender();
        var needShadowCasterPass = this._renderShadowMap(scene, context);
        this._preRenderMainPass(context, scene, needInternalRT, viewport);
        this._renderMainPass(context, viewport, scene, shader, replacementTag, needInternalRT);
        this._aftRenderMainPass(needShadowCasterPass);
        scene._componentDriver.callPostRender();
    }
    viewportPointToRay(point, out) {
        this._rayViewport.x = this.viewport.x;
        this._rayViewport.y = this.viewport.y;
        this._rayViewport.width = ILaya.stage._width;
        this._rayViewport.height = ILaya.stage._height;
        Picker.calculateCursorRay(point, this._rayViewport, this._projectionMatrix, this.viewMatrix, null, out);
    }
    normalizedViewportPointToRay(point, out) {
        var finalPoint = Camera._tempVector20;
        var vp = this.normalizedViewport;
        point.x = point.x * Config3D.pixelRatio;
        point.y = point.y * Config3D.pixelRatio;
        finalPoint.x = point.x * vp.width;
        finalPoint.y = point.y * vp.height;
        Picker.calculateCursorRay(finalPoint, this.viewport, this._projectionMatrix, this.viewMatrix, null, out);
    }
    worldToViewportPoint(position, out) {
        Matrix4x4.multiply(this._projectionMatrix, this._viewMatrix, this._projectionViewMatrix);
        this.viewport.project(position, this._projectionViewMatrix, out);
        var r = Config3D.pixelRatio;
        let _wr = (out.x - this.viewport.x) / r;
        let _hr = (out.y - this.viewport.y) / r;
        out.x = _wr + this.viewport.x;
        out.y = _hr + this.viewport.y;
        out.x = (out.x / ILaya.stage.clientScaleX) | 0;
        out.y = (out.y / ILaya.stage.clientScaleY) | 0;
    }
    worldToNormalizedViewportPoint(position, out) {
        this.worldToViewportPoint(position, out);
        out.x = out.x / ILaya.stage.width;
        out.y = out.y / ILaya.stage.height;
    }
    convertScreenCoordToOrthographicCoord(source, out) {
        if (this._orthographic) {
            var clientWidth = this.clientWidth;
            var clientHeight = this.clientHeight;
            var ratioX = this.orthographicVerticalSize * this.aspectRatio / clientWidth;
            var ratioY = this.orthographicVerticalSize / clientHeight;
            out.x = (-clientWidth / 2 + source.x * ILaya.stage.clientScaleX) * ratioX;
            out.y = (clientHeight / 2 - source.y * ILaya.stage.clientScaleY) * ratioY;
            out.z = (this.nearPlane - this.farPlane) * (source.z + 1) / 2 - this.nearPlane;
            Vector3.transformCoordinate(out, this.transform.worldMatrix, out);
            return true;
        }
        else {
            return false;
        }
    }
    destroy(destroyChild = true) {
        this._needInternalRenderTexture() && (!this._internalRenderTexture._inPool) && RenderTexture.recoverToPool(this._internalRenderTexture);
        this._offScreenRenderTexture = null;
        this.transform.off(Event.TRANSFORM_CHANGED, this, this._onTransformChanged);
        ILaya.stage.off(Event.RESIZE, this, this._onScreenSizeChanged);
        this._cameraEventCommandBuffer = {};
        this._shaderValues.destroy();
        if (RenderContext3D._instance.camera == this) {
            RenderContext3D._instance.cameraShaderValue = null;
            RenderContext3D._instance.camera = null;
        }
        super.destroy(destroyChild);
    }
    addCommandBuffer(event, commandBuffer) {
        var commandBufferArray = this._cameraEventCommandBuffer[event];
        if (!commandBufferArray)
            commandBufferArray = this._cameraEventCommandBuffer[event] = [];
        if (commandBufferArray.indexOf(commandBuffer) < 0)
            commandBufferArray.push(commandBuffer);
        commandBuffer._camera = this;
        if (commandBuffer.casterShadow) {
            this._addCasterShadowCommandBuffer(commandBuffer);
        }
    }
    removeCommandBuffer(event, commandBuffer) {
        var commandBufferArray = this._cameraEventCommandBuffer[event];
        if (commandBufferArray) {
            var index = commandBufferArray.indexOf(commandBuffer);
            if (index != -1)
                commandBufferArray.splice(index, 1);
            commandBuffer.casterShadow && this._removeCasterShadowCommandBuffer(commandBuffer);
        }
        else
            throw "Camera:unknown event.";
    }
    removeCommandBuffers(event) {
        if (this._cameraEventCommandBuffer[event])
            this._cameraEventCommandBuffer[event].length = 0;
    }
    _create() {
        return new Camera();
    }
}
Camera._tempVector20 = new Vector2();
Camera._context3DViewPortCatch = new Viewport(0, 0, 0, 0);
Camera._contextScissorPortCatch = new Vector4(0, 0, 0, 0);
Camera.__updateMark = 0;

//# sourceMappingURL=Camera.js.map
