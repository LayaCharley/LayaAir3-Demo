import { LayaGL } from "../../layagl/LayaGL";
import { BaseCamera } from "../core/BaseCamera";
import { Camera } from "../core/Camera";
import { ShadowCascadesMode } from "../core/light/ShadowCascadesMode";
import { ShadowMode } from "../core/light/ShadowMode";
import { ShadowMapFormat, ShadowUtils } from "../core/light/ShadowUtils";
import { Scene3DShaderDeclaration } from "../core/scene/Scene3DShaderDeclaration";
import { Plane } from "../math/Plane";
import { LightType } from "../core/light/Light";
import { Config3D } from "../../../Config3D";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../RenderEngine/RenderShader/ShaderData";
import { UniformBufferObject } from "../../RenderEngine/UniformBufferObject";
import { BoundFrustum } from "../math/BoundFrustum";
import { ShadowSliceData, ShadowSpotData } from "./ShadowSliceData";
import { RenderClearFlag } from "../../RenderEngine/RenderEnum/RenderClearFlag";
import { Viewport } from "../math/Viewport";
import { FrustumCulling } from "../graphics/FrustumCulling";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { Stat } from "../../utils/Stat";
import { ShadowLightType } from "./ShadowLightType";
import { DepthCasterData } from "../depthMap/DepthCasterData";
import { MathUtils3D } from "../../maths/MathUtils3D";
import { Matrix4x4 } from "../../maths/Matrix4x4";
import { Vector3 } from "../../maths/Vector3";
import { Vector4 } from "../../maths/Vector4";
import { RenderTexture } from "../../resource/RenderTexture";
export class ShadowCasterPass {
    constructor() {
        this._shadowBias = new Vector4();
        this._shadowParams = new Vector4();
        this._shadowMapSize = new Vector4();
        this._shadowSpotMapSize = new Vector4();
        this._shadowMatrices = new Float32Array(16 * (ShadowCasterPass._maxCascades));
        this._shadowSpotMatrices = new Matrix4x4();
        this._splitBoundSpheres = new Float32Array(ShadowCasterPass._maxCascades * 4);
        this._cascadeCount = 0;
        this._shadowMapWidth = 0;
        this._shadowMapHeight = 0;
        this._shadowSliceDatas = [new ShadowSliceData(), new ShadowSliceData(), new ShadowSliceData(), new ShadowSliceData()];
        this._shadowSpotData = new ShadowSpotData();
        this._lightUp = new Vector3();
        this._lightSide = new Vector3();
        this._lightForward = new Vector3();
        this._shadowSpotData.cameraCullInfo.boundFrustum = new BoundFrustum(new Matrix4x4());
        if (Config3D._uniformBlock) {
            this._castDepthBufferData = DepthCasterData.createDepthCasterUniformBlock();
            this._castDepthBufferOBJ = UniformBufferObject.getBuffer(UniformBufferObject.UBONAME_SHADOW, 0);
            if (!this._castDepthBufferOBJ) {
                this._castDepthBufferOBJ = UniformBufferObject.create(UniformBufferObject.UBONAME_SHADOW, BufferUsage.Dynamic, this._castDepthBufferData.getbyteLength(), true);
            }
            BaseCamera.createCameraUniformBlock();
            this._castDepthCameraBufferData = BaseCamera.CameraUBOData.clone();
            this._castDepthCameraBufferOBJ = UniformBufferObject.getBuffer(UniformBufferObject.UBONAME_CAMERA, 1);
            if (!this._castDepthCameraBufferOBJ) {
                this._castDepthCameraBufferOBJ = UniformBufferObject.create(UniformBufferObject.UBONAME_CAMERA, BufferUsage.Dynamic, this._castDepthCameraBufferData.getbyteLength(), false);
            }
        }
    }
    static __init__() {
        ShadowCasterPass._frustumPlanes = new Array(new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0), new Plane(new Vector3(), 0));
        ShadowCasterPass.SHADOW_BIAS = Shader3D.propertyNameToID("u_ShadowBias");
        ShadowCasterPass.SHADOW_LIGHT_DIRECTION = Shader3D.propertyNameToID("u_ShadowLightDirection");
        ShadowCasterPass.SHADOW_SPLIT_SPHERES = Shader3D.propertyNameToID("u_ShadowSplitSpheres");
        ShadowCasterPass.SHADOW_MATRICES = Shader3D.propertyNameToID("u_ShadowMatrices");
        ShadowCasterPass.SHADOW_MAP_SIZE = Shader3D.propertyNameToID("u_ShadowMapSize");
        ShadowCasterPass.SHADOW_MAP = Shader3D.propertyNameToID("u_ShadowMap");
        ShadowCasterPass.SHADOW_PARAMS = Shader3D.propertyNameToID("u_ShadowParams");
        ShadowCasterPass.SHADOW_SPOTMAP_SIZE = Shader3D.propertyNameToID("u_SpotShadowMapSize");
        ShadowCasterPass.SHADOW_SPOTMAP = Shader3D.propertyNameToID("u_SpotShadowMap");
        ShadowCasterPass.SHADOW_SPOTMATRICES = Shader3D.propertyNameToID("u_SpotViewProjectMatrix");
        const sceneUniformMap = LayaGL.renderOBJCreate.createGlobalUniformMap("Scene3D");
        if (Config3D._uniformBlock) {
            sceneUniformMap.addShaderBlockUniform(Shader3D.propertyNameToID(UniformBufferObject.UBONAME_SHADOW), UniformBufferObject.UBONAME_SHADOW, [
                {
                    id: ShadowCasterPass.SHADOW_BIAS,
                    propertyName: "u_ShadowBias",
                    uniformtype: ShaderDataType.Vector4
                },
                {
                    id: ShadowCasterPass.SHADOW_LIGHT_DIRECTION,
                    propertyName: "u_ShadowLightDirection",
                    uniformtype: ShaderDataType.Vector3
                }
            ]);
        }
        else {
            sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_BIAS, "u_ShadowBias", ShaderDataType.Vector4);
            sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_LIGHT_DIRECTION, "u_ShadowLightDirection", ShaderDataType.Vector3);
        }
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_SPLIT_SPHERES, "u_ShadowSplitSpheres", ShaderDataType.Vector4);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_MATRICES, "u_ShadowMatrices", ShaderDataType.Matrix4x4);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_MAP_SIZE, "u_ShadowMapSize", ShaderDataType.Vector4);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_MAP, "u_ShadowMap", ShaderDataType.Texture2D);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_PARAMS, "u_ShadowParams", ShaderDataType.Vector4);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_SPOTMAP_SIZE, "u_SpotShadowMapSize", ShaderDataType.Vector4);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_SPOTMAP, "u_SpotShadowMap", ShaderDataType.Texture2D);
        sceneUniformMap.addShaderUniform(ShadowCasterPass.SHADOW_SPOTMATRICES, "u_SpotViewProjectMatrix", ShaderDataType.Matrix4x4);
    }
    _setupShadowCasterShaderValues(context, shaderValues, shadowSliceData, LightParam, shadowparams, shadowBias, lightType) {
        shaderValues.setVector(ShadowCasterPass.SHADOW_BIAS, shadowBias);
        switch (lightType) {
            case LightType.Directional:
                shaderValues.setVector3(ShadowCasterPass.SHADOW_LIGHT_DIRECTION, LightParam);
                break;
            case LightType.Spot:
                shaderValues.setVector(ShadowCasterPass.SHADOW_PARAMS, shadowparams);
                break;
            case LightType.Point:
                break;
        }
        var cameraSV = shadowSliceData.cameraShaderValue;
        if (this._castDepthCameraBufferOBJ) {
            cameraSV._addCheckUBO(UniformBufferObject.UBONAME_CAMERA, this._castDepthCameraBufferOBJ, this._castDepthCameraBufferData);
            cameraSV.setUniformBuffer(BaseCamera.CAMERAUNIFORMBLOCK, this._castDepthCameraBufferOBJ);
        }
        cameraSV.setMatrix4x4(BaseCamera.VIEWMATRIX, shadowSliceData.viewMatrix);
        cameraSV.setMatrix4x4(BaseCamera.PROJECTMATRIX, shadowSliceData.projectionMatrix);
        cameraSV.setMatrix4x4(BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
        shaderValues.setMatrix4x4(BaseCamera.VIEWPROJECTMATRIX, shadowSliceData.viewProjectMatrix);
        context.viewMatrix = shadowSliceData.viewMatrix;
        context.projectionMatrix = shadowSliceData.projectionMatrix;
        context.projectionViewMatrix = shadowSliceData.viewProjectMatrix;
    }
    _setupShadowReceiverShaderValues(shaderValues) {
        var light = this._light;
        if (light.shadowCascadesMode !== ShadowCascadesMode.NoCascades)
            shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
        else
            shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE);
        switch (light.shadowMode) {
            case ShadowMode.Hard:
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                break;
            case ShadowMode.SoftLow:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                break;
            case ShadowMode.SoftHigh:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW);
                break;
        }
        shaderValues.setTexture(ShadowCasterPass.SHADOW_MAP, this._shadowDirectLightMap);
        shaderValues.setBuffer(ShadowCasterPass.SHADOW_MATRICES, this._shadowMatrices);
        shaderValues.setVector(ShadowCasterPass.SHADOW_MAP_SIZE, this._shadowMapSize);
        shaderValues.setVector(ShadowCasterPass.SHADOW_PARAMS, this._shadowParams);
        shaderValues.setBuffer(ShadowCasterPass.SHADOW_SPLIT_SPHERES, this._splitBoundSpheres);
    }
    _setupSpotShadowReceiverShaderValues(shaderValues) {
        var spotLight = this._light;
        switch (spotLight.shadowMode) {
            case ShadowMode.Hard:
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                break;
            case ShadowMode.SoftLow:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                break;
            case ShadowMode.SoftHigh:
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH);
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW);
                break;
        }
        shaderValues.setTexture(ShadowCasterPass.SHADOW_SPOTMAP, this._shadowSpotLightMap);
        shaderValues.setMatrix4x4(ShadowCasterPass.SHADOW_SPOTMATRICES, this._shadowSpotMatrices);
        shaderValues.setVector(ShadowCasterPass.SHADOW_SPOTMAP_SIZE, this._shadowSpotMapSize);
        shaderValues.setVector(ShadowCasterPass.SHADOW_PARAMS, this._shadowParams);
    }
    update(camera, light, lightType) {
        this.cleanUp();
        switch (lightType) {
            case ShadowLightType.DirectionLight:
                this._light = light;
                var lightWorld = ShadowCasterPass._tempMatrix0;
                var lightWorldE = lightWorld.elements;
                var lightUp = this._lightUp;
                var lightSide = this._lightSide;
                var lightForward = this._lightForward;
                Matrix4x4.createFromQuaternion(light.owner._transform.rotation, lightWorld);
                lightSide.setValue(lightWorldE[0], lightWorldE[1], lightWorldE[2]);
                lightUp.setValue(lightWorldE[4], lightWorldE[5], lightWorldE[6]);
                lightForward.setValue(-lightWorldE[8], -lightWorldE[9], -lightWorldE[10]);
                var atlasResolution = light._shadowResolution;
                var cascadesMode = light._shadowCascadesMode;
                var cascadesCount;
                var shadowTileResolution;
                var shadowMapWidth, shadowMapHeight;
                if (cascadesMode == ShadowCascadesMode.NoCascades) {
                    cascadesCount = 1;
                    shadowTileResolution = atlasResolution;
                    shadowMapWidth = atlasResolution;
                    shadowMapHeight = atlasResolution;
                }
                else {
                    cascadesCount = cascadesMode == ShadowCascadesMode.TwoCascades ? 2 : 4;
                    shadowTileResolution = ShadowUtils.getMaxTileResolutionInAtlas(atlasResolution, atlasResolution, cascadesCount);
                    shadowMapWidth = shadowTileResolution * 2;
                    shadowMapHeight = cascadesMode == ShadowCascadesMode.TwoCascades ? shadowTileResolution : shadowTileResolution * 2;
                }
                this._cascadeCount = cascadesCount;
                this._shadowMapWidth = shadowMapWidth;
                this._shadowMapHeight = shadowMapHeight;
                var splitDistance = ShadowCasterPass._cascadesSplitDistance;
                var frustumPlanes = ShadowCasterPass._frustumPlanes;
                var cameraNear = camera.nearPlane;
                var shadowFar = Math.min(camera.farPlane, light._shadowDistance);
                var shadowMatrices = this._shadowMatrices;
                var boundSpheres = this._splitBoundSpheres;
                ShadowUtils.getCascadesSplitDistance(light._shadowTwoCascadeSplits, light._shadowFourCascadeSplits, cameraNear, shadowFar, camera.fieldOfView * MathUtils3D.Deg2Rad, camera.aspectRatio, cascadesMode, splitDistance);
                ShadowUtils.getCameraFrustumPlanes(camera.projectionViewMatrix, frustumPlanes);
                var forward = ShadowCasterPass._tempVector30;
                camera._transform.getForward(forward);
                Vector3.normalize(forward, forward);
                for (var i = 0; i < cascadesCount; i++) {
                    var sliceData = this._shadowSliceDatas[i];
                    sliceData.sphereCenterZ = ShadowUtils.getBoundSphereByFrustum(splitDistance[i], splitDistance[i + 1], camera.fieldOfView * MathUtils3D.Deg2Rad, camera.aspectRatio, camera._transform.position, forward, sliceData.splitBoundSphere);
                    ShadowUtils.getDirectionLightShadowCullPlanes(frustumPlanes, i, splitDistance, cameraNear, lightForward, sliceData);
                    ShadowUtils.getDirectionalLightMatrices(lightUp, lightSide, lightForward, i, light._shadowNearPlane, shadowTileResolution, sliceData, shadowMatrices);
                    if (cascadesCount > 1)
                        ShadowUtils.applySliceTransform(sliceData, shadowMapWidth, shadowMapHeight, i, shadowMatrices);
                }
                ShadowUtils.prepareShadowReceiverShaderValues(light, shadowMapWidth, shadowMapHeight, this._shadowSliceDatas, cascadesCount, this._shadowMapSize, this._shadowParams, shadowMatrices, boundSpheres);
                break;
            case ShadowLightType.SpotLight:
                this._light = light;
                var lightWorld = ShadowCasterPass._tempMatrix0;
                var lightForward = this._lightForward;
                var shadowResolution = this._light._shadowResolution;
                this._shadowMapWidth = shadowResolution;
                this._shadowMapHeight = shadowResolution;
                var shadowSpotData = this._shadowSpotData;
                ShadowUtils.getSpotLightShadowData(shadowSpotData, this._light, shadowResolution, this._shadowParams, this._shadowSpotMatrices, this._shadowSpotMapSize);
                break;
            case ShadowLightType.PointLight:
                break;
            default:
                throw ("There is no shadow of this type");
                break;
        }
    }
    render(context, scene, lightType, camera) {
        switch (lightType) {
            case ShadowLightType.DirectionLight:
                var shaderValues = scene._shaderValues;
                context.pipelineMode = "ShadowCaster";
                var shadowMap = this._shadowDirectLightMap = ShadowUtils.getTemporaryShadowTexture(this._shadowMapWidth, this._shadowMapHeight, ShadowMapFormat.bit16);
                shadowMap._start();
                context.destTarget = shadowMap;
                var light = this._light;
                for (var i = 0, n = this._cascadeCount; i < n; i++) {
                    var sliceData = this._shadowSliceDatas[i];
                    ShadowUtils.getShadowBias(light, sliceData.projectionMatrix, sliceData.resolution, this._shadowBias);
                    this._setupShadowCasterShaderValues(context, shaderValues, sliceData, this._lightForward, this._shadowParams, this._shadowBias, LightType.Directional);
                    var shadowCullInfo = FrustumCulling._shadowCullInfo;
                    shadowCullInfo.position = sliceData.position;
                    shadowCullInfo.cullPlanes = sliceData.cullPlanes;
                    shadowCullInfo.cullPlaneCount = sliceData.cullPlaneCount;
                    shadowCullInfo.cullSphere = sliceData.splitBoundSphere;
                    shadowCullInfo.direction = this._lightForward;
                    scene._directLightShadowCull(shadowCullInfo, context);
                    context.cameraShaderValue = sliceData.cameraShaderValue;
                    Camera._updateMark++;
                    var resolution = sliceData.resolution;
                    var offsetX = sliceData.offsetX;
                    var offsetY = sliceData.offsetY;
                    LayaGL.renderEngine.viewport(offsetX, offsetY, resolution, resolution);
                    LayaGL.renderEngine.scissor(offsetX, offsetY, resolution, resolution);
                    LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Depth, null, 1);
                    if (scene._opaqueQueue.elements.length > 0) {
                        Viewport._tempViewport.set(offsetX, offsetY, resolution, resolution);
                        ShadowCasterPass._tempVector4.setValue(offsetX + 1, offsetY + 1, resolution - 2, resolution - 2);
                        context.viewport = Viewport._tempViewport;
                        context.scissor = ShadowCasterPass._tempVector4;
                        Stat.depthCastDrawCall += scene._opaqueQueue.renderQueue(context);
                    }
                    camera._applyCasterPassCommandBuffer(context);
                }
                shadowMap._end();
                this._setupShadowReceiverShaderValues(shaderValues);
                context.pipelineMode = context.configPipeLineMode;
                break;
            case ShadowLightType.SpotLight:
                var shaderValues = scene._shaderValues;
                context.pipelineMode = "ShadowCaster";
                var spotlight = this._light;
                var shadowMap = this._shadowSpotLightMap = ShadowUtils.getTemporaryShadowTexture(this._shadowMapWidth, this._shadowMapHeight, ShadowMapFormat.bit16);
                shadowMap._start();
                context.destTarget = shadowMap;
                var shadowSpotData = this._shadowSpotData;
                ShadowUtils.getShadowBias(spotlight, shadowSpotData.projectionMatrix, shadowSpotData.resolution, this._shadowBias);
                this._setupShadowCasterShaderValues(context, shaderValues, shadowSpotData, this._light.owner.transform.position, this._shadowParams, this._shadowBias, LightType.Spot);
                scene._sportLightShadowCull(shadowSpotData.cameraCullInfo, context);
                context.cameraShaderValue = shadowSpotData.cameraShaderValue;
                Camera._updateMark++;
                LayaGL.renderEngine.viewport(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
                LayaGL.renderEngine.scissor(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
                LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Depth, null, 1);
                if (scene._opaqueQueue.elements.length > 0) {
                    context.changeViewport(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
                    context.changeScissor(shadowSpotData.offsetX, shadowSpotData.offsetY, shadowSpotData.resolution, shadowSpotData.resolution);
                    Stat.depthCastDrawCall += scene._opaqueQueue.renderQueue(context);
                }
                camera._applyCasterPassCommandBuffer(context);
                shadowMap._end();
                this._setupSpotShadowReceiverShaderValues(shaderValues);
                context.pipelineMode = context.configPipeLineMode;
                break;
            case ShadowLightType.PointLight:
                break;
            default:
                throw ("There is no shadow of this type");
        }
    }
    cleanUp() {
        this._shadowDirectLightMap && RenderTexture.recoverToPool(this._shadowDirectLightMap);
        this._shadowSpotLightMap && RenderTexture.recoverToPool(this._shadowSpotLightMap);
        this._shadowDirectLightMap = null;
        this._shadowSpotLightMap = null;
        this._light = null;
    }
}
ShadowCasterPass._tempVector30 = new Vector3();
ShadowCasterPass._tempVector4 = new Vector4();
ShadowCasterPass._tempMatrix0 = new Matrix4x4();
ShadowCasterPass._maxCascades = 4;
ShadowCasterPass._cascadesSplitDistance = new Array(ShadowCasterPass._maxCascades + 1);
ShadowCasterPass._frustumPlanes = new Array();

//# sourceMappingURL=ShadowCasterPass.js.map
