import { Event } from "../../events/Event";
import { Loader } from "../../net/Loader";
import { Config3D } from "../../../Config3D";
import { LayaGL } from "../../layagl/LayaGL";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { UniformBufferParamsType, UnifromBufferData } from "../../RenderEngine/UniformBufferData";
import { Sprite3D } from "./Sprite3D";
import { UniformBufferObject } from "../../RenderEngine/UniformBufferObject";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { ILaya } from "../../../ILaya";
import { Color } from "../../maths/Color";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
import { SkyRenderer } from "../resource/models/SkyRenderer";
export class BaseCamera extends Sprite3D {
    constructor(nearPlane = 0.3, farPlane = 1000) {
        super();
        this._skyRenderer = new SkyRenderer();
        this._forward = new Vector3();
        this._up = new Vector3();
        this._shaderValues = LayaGL.renderOBJCreate.createShaderData(null);
        this._linearClearColor = new Color();
        this.clearColor = new Color(100 / 255, 149 / 255, 237 / 255, 255 / 255);
        this._fieldOfView = 60;
        this._useUserProjectionMatrix = false;
        this._orthographicVerticalSize = 10;
        this.renderingOrder = 0;
        this._nearPlane = nearPlane;
        this._farPlane = farPlane;
        this.cullingMask = 2147483647;
        this.staticMask = 0xffffffff;
        this.useOcclusionCulling = true;
        this._renderEngine = LayaGL.renderEngine;
        this._orthographic = false;
        if (Config3D._uniformBlock) {
            this._cameraUniformUBO = UniformBufferObject.getBuffer(UniformBufferObject.UBONAME_CAMERA, 0);
            this._cameraUniformData = BaseCamera.createCameraUniformBlock();
            if (!this._cameraUniformUBO) {
                this._cameraUniformUBO = UniformBufferObject.create(UniformBufferObject.UBONAME_CAMERA, BufferUsage.Dynamic, this._cameraUniformData.getbyteLength(), false);
            }
            this._shaderValues._addCheckUBO(UniformBufferObject.UBONAME_CAMERA, this._cameraUniformUBO, this._cameraUniformData);
            this._shaderValues.setUniformBuffer(BaseCamera.CAMERAUNIFORMBLOCK, this._cameraUniformUBO);
        }
    }
    static shaderValueInit() {
        BaseCamera.SHADERDEFINE_DEPTH = Shader3D.getDefineByName("DEPTHMAP");
        BaseCamera.SHADERDEFINE_DEPTHNORMALS = Shader3D.getDefineByName("DEPTHNORMALSMAP");
        BaseCamera.SHADERDEFINE_ORTHOGRAPHIC = Shader3D.getDefineByName("CAMERAORTHOGRAPHIC");
        BaseCamera.SHADERDEFINE_FXAA = Shader3D.getDefineByName("FXAA");
        let camerauniformMap = BaseCamera.cameraUniformMap = LayaGL.renderOBJCreate.createGlobalUniformMap("BaseCamera");
        BaseCamera.CAMERAPOS = Shader3D.propertyNameToID("u_CameraPos");
        BaseCamera.VIEWMATRIX = Shader3D.propertyNameToID("u_View");
        BaseCamera.VIEWPROJECTMATRIX = Shader3D.propertyNameToID("u_ViewProjection");
        BaseCamera.PROJECTMATRIX = Shader3D.propertyNameToID("u_Projection");
        BaseCamera.CAMERADIRECTION = Shader3D.propertyNameToID("u_CameraDirection");
        BaseCamera.CAMERAUP = Shader3D.propertyNameToID("u_CameraUp");
        BaseCamera.VIEWPORT = Shader3D.propertyNameToID("u_Viewport");
        BaseCamera.PROJECTION_PARAMS = Shader3D.propertyNameToID("u_ProjectionParams");
        BaseCamera.DEPTHTEXTURE = Shader3D.propertyNameToID("u_CameraDepthTexture");
        BaseCamera.DEPTHNORMALSTEXTURE = Shader3D.propertyNameToID("u_CameraDepthNormalsTexture");
        BaseCamera.OPAQUETEXTURE = Shader3D.propertyNameToID("u_CameraOpaqueTexture");
        BaseCamera.OPAQUETEXTUREPARAMS = Shader3D.propertyNameToID("u_OpaqueTextureParams");
        BaseCamera.DEPTHZBUFFERPARAMS = Shader3D.propertyNameToID("u_ZBufferParams");
        BaseCamera.CAMERAUNIFORMBLOCK = Shader3D.propertyNameToID(UniformBufferObject.UBONAME_CAMERA);
        if (Config3D._uniformBlock) {
            camerauniformMap.addShaderBlockUniform(BaseCamera.CAMERAUNIFORMBLOCK, UniformBufferObject.UBONAME_CAMERA, [
                {
                    id: BaseCamera.VIEWMATRIX,
                    propertyName: "u_View",
                    uniformtype: ShaderDataType.Matrix4x4
                },
                {
                    id: BaseCamera.PROJECTMATRIX,
                    propertyName: "u_Projection",
                    uniformtype: ShaderDataType.Matrix4x4
                },
                {
                    id: BaseCamera.VIEWPROJECTMATRIX,
                    propertyName: "u_ViewProjection",
                    uniformtype: ShaderDataType.Matrix4x4
                },
                {
                    id: BaseCamera.PROJECTION_PARAMS,
                    propertyName: "u_ProjectionParams",
                    uniformtype: ShaderDataType.Vector4
                },
                {
                    id: BaseCamera.VIEWPORT,
                    propertyName: "u_Viewport",
                    uniformtype: ShaderDataType.Vector4
                },
                {
                    id: BaseCamera.CAMERADIRECTION,
                    propertyName: "u_CameraDirection",
                    uniformtype: ShaderDataType.Vector3
                },
                {
                    id: BaseCamera.CAMERAUP,
                    propertyName: "u_CameraUp",
                    uniformtype: ShaderDataType.Vector3
                },
                {
                    id: BaseCamera.CAMERAPOS,
                    propertyName: "u_CameraPos",
                    uniformtype: ShaderDataType.Vector3
                }
            ]);
        }
        else {
            camerauniformMap.addShaderUniform(BaseCamera.CAMERAPOS, "u_CameraPos", ShaderDataType.Vector3);
            camerauniformMap.addShaderUniform(BaseCamera.VIEWMATRIX, "u_View", ShaderDataType.Matrix4x4);
            camerauniformMap.addShaderUniform(BaseCamera.PROJECTMATRIX, "u_Projection", ShaderDataType.Matrix4x4);
            camerauniformMap.addShaderUniform(BaseCamera.VIEWPROJECTMATRIX, "u_ViewProjection", ShaderDataType.Vector4);
            camerauniformMap.addShaderUniform(BaseCamera.CAMERADIRECTION, "u_CameraDirection", ShaderDataType.Vector3);
            camerauniformMap.addShaderUniform(BaseCamera.CAMERAUP, "u_CameraUp", ShaderDataType.Vector3);
            camerauniformMap.addShaderUniform(BaseCamera.VIEWPORT, "u_Viewport", ShaderDataType.Vector4);
            camerauniformMap.addShaderUniform(BaseCamera.PROJECTION_PARAMS, "u_ProjectionParams", ShaderDataType.Vector4);
        }
        camerauniformMap.addShaderUniform(BaseCamera.DEPTHTEXTURE, "u_CameraDepthTexture", ShaderDataType.Texture2D);
        camerauniformMap.addShaderUniform(BaseCamera.DEPTHNORMALSTEXTURE, "u_CameraDepthNormalsTexture", ShaderDataType.Texture2D);
        camerauniformMap.addShaderUniform(BaseCamera.OPAQUETEXTURE, "u_CameraOpaqueTexture", ShaderDataType.Texture2D);
        camerauniformMap.addShaderUniform(BaseCamera.OPAQUETEXTUREPARAMS, "u_OpaqueTextureParams", ShaderDataType.Vector4);
        camerauniformMap.addShaderUniform(BaseCamera.DEPTHZBUFFERPARAMS, "u_ZBufferParams", ShaderDataType.Vector4);
    }
    static createCameraUniformBlock() {
        if (!BaseCamera.CameraUBOData) {
            let uniformPara = new Map();
            uniformPara.set("u_View", UniformBufferParamsType.Matrix4x4);
            uniformPara.set("u_Projection", UniformBufferParamsType.Matrix4x4);
            uniformPara.set("u_ViewProjection", UniformBufferParamsType.Matrix4x4);
            uniformPara.set("u_ProjectionParams", UniformBufferParamsType.Vector4);
            uniformPara.set("u_Viewport", UniformBufferParamsType.Vector4);
            uniformPara.set("u_CameraDirection", UniformBufferParamsType.Vector3);
            uniformPara.set("u_CameraUp", UniformBufferParamsType.Vector3);
            uniformPara.set("u_CameraPos", UniformBufferParamsType.Vector3);
            let uniformMap = new Map();
            uniformPara.forEach((value, key) => {
                uniformMap.set(Shader3D.propertyNameToID(key), value);
            });
            BaseCamera.CameraUBOData = new UnifromBufferData(uniformMap);
        }
        return BaseCamera.CameraUBOData;
    }
    static __init__() {
        BaseCamera.shaderValueInit();
    }
    get clearColor() {
        return this._clearColor;
    }
    set clearColor(value) {
        this._clearColor = value;
        value.toLinear(this._linearClearColor);
    }
    get skyRenderer() {
        return this._skyRenderer;
    }
    get fieldOfView() {
        return this._fieldOfView;
    }
    set fieldOfView(value) {
        this._fieldOfView = value;
        this._calculateProjectionMatrix();
        this._caculateMaxLocalYRange();
    }
    get maxlocalYDistance() {
        return this._yrange;
    }
    get nearPlane() {
        return this._nearPlane;
    }
    set nearPlane(value) {
        this._nearPlane = value;
        this._calculateProjectionMatrix();
    }
    get farPlane() {
        return this._farPlane;
    }
    set farPlane(vaule) {
        this._farPlane = vaule;
        this._calculateProjectionMatrix();
        this._caculateMaxLocalYRange();
    }
    get orthographic() {
        return this._orthographic;
    }
    set orthographic(vaule) {
        this._orthographic = vaule;
        this._calculateProjectionMatrix();
        if (vaule) {
            this._shaderValues.addDefine(BaseCamera.SHADERDEFINE_ORTHOGRAPHIC);
        }
        else
            this._shaderValues.removeDefine(BaseCamera.SHADERDEFINE_ORTHOGRAPHIC);
    }
    get orthographicVerticalSize() {
        return this._orthographicVerticalSize;
    }
    set orthographicVerticalSize(vaule) {
        this._orthographicVerticalSize = vaule;
        this._calculateProjectionMatrix();
    }
    get cullingMask() {
        return this._cullingMask;
    }
    set cullingMask(value) {
        this._cullingMask = value;
    }
    get renderingOrder() {
        return this._renderingOrder;
    }
    set renderingOrder(value) {
        this._renderingOrder = value;
        this._sortCamerasByRenderingOrder();
    }
    _caculateMaxLocalYRange() {
        let halffield = 3.1416 * this.fieldOfView / 180.0 / 2;
        let dist = this.farPlane;
        this._yrange = Math.tan(halffield) * dist * 2;
    }
    _calculateProjectionMatrix() {
    }
    _onScreenSizeChanged() {
        this._calculateProjectionMatrix();
    }
    _create() {
        return new BaseCamera();
    }
    _sortCamerasByRenderingOrder() {
        if (this.displayedInStage) {
            var cameraPool = this.scene._cameraPool;
            var n = cameraPool.length - 1;
            for (var i = 0; i < n; i++) {
                if (cameraPool[i].renderingOrder > cameraPool[n].renderingOrder) {
                    var tempCamera = cameraPool[i];
                    cameraPool[i] = cameraPool[n];
                    cameraPool[n] = tempCamera;
                }
            }
        }
    }
    _prepareCameraToRender() {
        this.transform.getForward(this._forward);
        this.transform.getUp(this._up);
        this._shaderValues.setVector3(BaseCamera.CAMERAPOS, this.transform.position);
        this._shaderValues.setVector3(BaseCamera.CAMERADIRECTION, this._forward);
        this._shaderValues.setVector3(BaseCamera.CAMERAUP, this._up);
    }
    render(shader = null, replacementTag = null) {
    }
    addLayer(layer) {
        this.cullingMask |= Math.pow(2, layer);
    }
    removeLayer(layer) {
        this.cullingMask &= ~Math.pow(2, layer);
    }
    addAllLayers() {
        this.cullingMask = 2147483647;
    }
    removeAllLayers() {
        this.cullingMask = 0;
    }
    resetProjectionMatrix() {
        this._useUserProjectionMatrix = false;
        this._calculateProjectionMatrix();
    }
    _onActive() {
        this._scene._addCamera(this);
        super._onActive();
    }
    _onInActive() {
        this._scene._removeCamera(this);
        super._onInActive();
    }
    _parse(data, spriteMap) {
        super._parse(data, spriteMap);
        this.orthographic = data.orthographic;
        (data.orthographicVerticalSize !== undefined) && (this.orthographicVerticalSize = data.orthographicVerticalSize);
        (data.fieldOfView !== undefined) && (this.fieldOfView = data.fieldOfView);
        this.nearPlane = data.nearPlane;
        this.farPlane = data.farPlane;
        var color = data.clearColor;
        this.clearColor = new Color(color[0], color[1], color[2], color[3]);
        var skyboxMaterial = data.skyboxMaterial;
        if (skyboxMaterial) {
            this._skyRenderer.material = Loader.getRes(skyboxMaterial.path);
        }
    }
    destroy(destroyChild = true) {
        this._skyRenderer.destroy();
        this._skyRenderer = null;
        ILaya.stage.off(Event.RESIZE, this, this._onScreenSizeChanged);
        super.destroy(destroyChild);
    }
}
BaseCamera.RENDERINGTYPE_SHADERDEFINE_FXAA = "FXAA";
BaseCamera.RENDERINGTYPE_DEFERREDLIGHTING = "DEFERREDLIGHTING";
BaseCamera.RENDERINGTYPE_FORWARDRENDERING = "FORWARDRENDERING";
BaseCamera._invertYScaleMatrix = new Matrix4x4(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
BaseCamera._invertYProjectionMatrix = new Matrix4x4();
BaseCamera._invertYProjectionViewMatrix = new Matrix4x4();
BaseCamera._tempMatrix4x40 = new Matrix4x4();

//# sourceMappingURL=BaseCamera.js.map
