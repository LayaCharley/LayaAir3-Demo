import { Config3D } from "../../../../Config3D";
import { ILaya } from "../../../../ILaya";
import { Sprite } from "../../../display/Sprite";
import { LayaGL } from "../../../layagl/LayaGL";
import { Loader } from "../../../net/Loader";
import { Context } from "../../../resource/Context";
import { SubmitKey } from "../../../webgl/submit/SubmitKey";
import { Cluster } from "../../graphics/renderPath/Cluster";
import { SphericalHarmonicsL2 } from "../../graphics/SphericalHarmonicsL2";
import { Viewport } from "../../math/Viewport";
import { PhysicsComponent } from "../../physics/PhysicsComponent";
import { PhysicsSettings } from "../../physics/PhysicsSettings";
import { PhysicsSimulation } from "../../physics/PhysicsSimulation";
import { SkyBox } from "../../resource/models/SkyBox";
import { SkyDome } from "../../resource/models/SkyDome";
import { SkyRenderer } from "../../resource/models/SkyRenderer";
import { Utils3D } from "../../utils/Utils3D";
import { BaseCamera } from "../BaseCamera";
import { Camera, CameraClearFlags } from "../Camera";
import { AlternateLightQueue, LightQueue } from "../light/LightQueue";
import { RenderContext3D } from "../render/RenderContext3D";
import { Lightmap } from "./Lightmap";
import { Scene3DShaderDeclaration } from "./Scene3DShaderDeclaration";
import { ShadowCasterPass } from "../../shadowMap/ShadowCasterPass";
import { Physics3D } from "../../Physics3D";
import { BlitFrameBufferCMD } from "../render/command/BlitFrameBufferCMD";
import { FilterMode } from "../../../RenderEngine/RenderEnum/FilterMode";
import { RenderCapable } from "../../../RenderEngine/RenderEnum/RenderCapable";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { UnifromBufferData, UniformBufferParamsType } from "../../../RenderEngine/UniformBufferData";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
import { RenderTargetFormat } from "../../../RenderEngine/RenderEnum/RenderTargetFormat";
import { RenderClearFlag } from "../../../RenderEngine/RenderEnum/RenderClearFlag";
import { FrustumCulling } from "../../graphics/FrustumCulling";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { Stat } from "../../../utils/Stat";
import { ComponentDriver } from "../../../components/ComponentDriver";
import { LayaEnv } from "../../../../LayaEnv";
import { SceneRenderManager } from "./SceneRenderManager";
import { VolumeManager } from "../../component/Volume/VolumeManager";
import { UI3DManager } from "../UI3D/UI3DManager";
import { Scene } from "../../../display/Scene";
import { AmbientMode } from "./AmbientMode";
import { BVHSpatialConfig } from "./bvh/SpatialManager";
import { BVHSceneRenderManager } from "./BVHSceneRenderManager/BVHSceneRenderManager";
import { BVHCullPass } from "./BVHSceneRenderManager/BVHCullPass";
import { Color } from "../../../maths/Color";
import { Vector3 } from "../../../maths/Vector3";
import { Vector4 } from "../../../maths/Vector4";
import { BufferState } from "../../../webgl/utils/BufferState";
import { RenderTexture } from "../../../resource/RenderTexture";
export var FogMode;
(function (FogMode) {
    FogMode[FogMode["Linear"] = 0] = "Linear";
    FogMode[FogMode["EXP"] = 1] = "EXP";
    FogMode[FogMode["EXP2"] = 2] = "EXP2";
})(FogMode || (FogMode = {}));
export class Scene3D extends Sprite {
    constructor() {
        super();
        this._reflectionsSource = 0;
        this._reflectionsResolution = "256";
        this._reflectionsIblSamples = 128;
        this._lightCount = 0;
        this._pointLights = new LightQueue();
        this._spotLights = new LightQueue();
        this._directionLights = new LightQueue();
        this._alternateLights = new AlternateLightQueue();
        this._lightmaps = [];
        this._skyRenderer = new SkyRenderer();
        this._time = 0;
        this._sunColor = new Color(1.0, 1.0, 1.0);
        this._sundir = new Vector3();
        this._id = Scene3D.sceneID++;
        this._physicsdisableSimulation = false;
        this._collsionTestList = [];
        this._key = new SubmitKey();
        this._opaqueQueue = LayaGL.renderOBJCreate.createBaseRenderQueue(false);
        this._transparentQueue = LayaGL.renderOBJCreate.createBaseRenderQueue(true);
        this._cameraPool = [];
        this._UI3DManager = new UI3DManager();
        this.currentCreationLayer = Math.pow(2, 0);
        this.enableLight = true;
        this._ShadowMapupdateFrequency = 1;
        this._is3D = true;
        this._componentDriver = new ComponentDriver();
        this._timer = ILaya.timer;
        if (LayaEnv.isConch && !window.conchConfig.conchWebGL) {
            this._nativeObj = new window.conchSubmitScene3D(this.renderSubmit.bind(this));
        }
        if (Physics3D._bullet)
            this._physicsSimulation = new PhysicsSimulation(Scene3D.physicsSettings);
        this._shaderValues = LayaGL.renderOBJCreate.createShaderData(null);
        this._shaderValues._defineDatas.addDefineDatas(Shader3D._configDefineValues);
        if (Config3D._uniformBlock) {
            this._sceneUniformObj = UniformBufferObject.getBuffer(UniformBufferObject.UBONAME_SCENE, 0);
            this._sceneUniformData = Scene3D.createSceneUniformBlock();
            if (!this._sceneUniformObj) {
                this._sceneUniformObj = UniformBufferObject.create(UniformBufferObject.UBONAME_SCENE, BufferUsage.Dynamic, this._sceneUniformData.getbyteLength(), true);
            }
            this._shaderValues._addCheckUBO(UniformBufferObject.UBONAME_SCENE, this._sceneUniformObj, this._sceneUniformData);
            this._shaderValues.setUniformBuffer(Scene3D.SCENEUNIFORMBLOCK, this._sceneUniformObj);
            this._shaderValues._addCheckUBO(UniformBufferObject.UBONAME_SHADOW, Scene3D._shadowCasterPass._castDepthBufferOBJ, Scene3D._shadowCasterPass._castDepthBufferData);
            this._shaderValues.setUniformBuffer(Shader3D.propertyNameToID(UniformBufferObject.UBONAME_SHADOW), Scene3D._shadowCasterPass._castDepthBufferOBJ);
        }
        this._fogParams = new Vector4(300, 1000, 0.01, 0);
        this.enableFog = false;
        this.fogStart = 300;
        this.fogEnd = 1000;
        this.fogDensity = 0.01;
        this.fogColor = new Color(0.7, 0.7, 0.7);
        this.fogMode = FogMode.Linear;
        this.GIRotate = 0;
        this._scene = this;
        if (Config3D.useBVHCull) {
            let bvhConfig = new BVHSpatialConfig();
            bvhConfig.Min_BVH_Build_Nums = Config3D.BVH_Min_Build_nums;
            bvhConfig.limit_size = Config3D.BVH_limit_size;
            bvhConfig.max_SpatialCount = Config3D.BVH_max_SpatialCount;
            this._sceneRenderManager = new BVHSceneRenderManager(bvhConfig);
            this._cullPass = new BVHCullPass();
        }
        else {
            this._sceneRenderManager = new SceneRenderManager();
            this._cullPass = LayaGL.renderOBJCreate.createCullPass();
        }
        if (Config3D.debugFrustumCulling) {
        }
        this._volumeManager = new VolumeManager();
        this._UI3DManager = new UI3DManager();
        this.sceneReflectionProb = this._volumeManager.reflectionProbeManager.sceneReflectionProbe;
        this._sceneReflectionProb.reflectionIntensity = 1.0;
        this.ambientColor = new Color(0.212, 0.227, 0.259);
    }
    static set _updateMark(value) {
        Scene3D.__updateMark = value;
    }
    static get _updateMark() {
        return Scene3D.__updateMark;
    }
    static shaderValueInit() {
        Scene3DShaderDeclaration.SHADERDEFINE_FOG = Shader3D.getDefineByName("FOG");
        Scene3DShaderDeclaration.SHADERDEFINE_FOG_LINEAR = Shader3D.getDefineByName("FOG_LINEAR");
        Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP = Shader3D.getDefineByName("FOG_EXP");
        Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP2 = Shader3D.getDefineByName("FOG_EXP2");
        Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT = Shader3D.getDefineByName("DIRECTIONLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT = Shader3D.getDefineByName("POINTLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT = Shader3D.getDefineByName("SPOTLIGHT");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW = Shader3D.getDefineByName("SHADOW");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_CASCADE = Shader3D.getDefineByName("SHADOW_CASCADE");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_LOW = Shader3D.getDefineByName("SHADOW_SOFT_SHADOW_LOW");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SOFT_SHADOW_HIGH = Shader3D.getDefineByName("SHADOW_SOFT_SHADOW_HIGH");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT = Shader3D.getDefineByName("SHADOW_SPOT");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_LOW = Shader3D.getDefineByName("SHADOW_SPOT_SOFT_SHADOW_LOW");
        Scene3DShaderDeclaration.SHADERDEFINE_SHADOW_SPOT_SOFT_SHADOW_HIGH = Shader3D.getDefineByName("SHADOW_SPOT_SOFT_SHADOW_HIGH");
        Scene3D.FOGCOLOR = Shader3D.propertyNameToID("u_FogColor");
        Scene3D.FOGPARAMS = Shader3D.propertyNameToID("u_FogParams");
        Scene3D.DIRECTIONLIGHTCOUNT = Shader3D.propertyNameToID("u_DirationLightCount");
        Scene3D.LIGHTBUFFER = Shader3D.propertyNameToID("u_LightBuffer");
        Scene3D.CLUSTERBUFFER = Shader3D.propertyNameToID("u_LightClusterBuffer");
        Scene3D.TIME = Shader3D.propertyNameToID("u_Time");
        Scene3D.GIRotate = Shader3D.propertyNameToID("u_GIRotate");
        Scene3D.SCENEUNIFORMBLOCK = Shader3D.propertyNameToID(UniformBufferObject.UBONAME_SCENE);
        let sceneUniformMap = Scene3D.sceneUniformMap = LayaGL.renderOBJCreate.createGlobalUniformMap("Scene3D");
        if (Config3D._uniformBlock) {
            sceneUniformMap.addShaderBlockUniform(Scene3D.SCENEUNIFORMBLOCK, UniformBufferObject.UBONAME_SCENE, [
                {
                    id: Scene3D.TIME,
                    propertyName: "u_Time",
                    uniformtype: ShaderDataType.Float
                },
                {
                    id: Scene3D.FOGPARAMS,
                    propertyName: "u_FogParams",
                    uniformtype: ShaderDataType.Vector4
                },
                {
                    id: Scene3D.FOGCOLOR,
                    propertyName: "u_FogColor",
                    uniformtype: ShaderDataType.Vector4
                }
            ]);
        }
        else {
            sceneUniformMap.addShaderUniform(Scene3D.FOGCOLOR, "u_FogColor", ShaderDataType.Color);
            sceneUniformMap.addShaderUniform(Scene3D.FOGPARAMS, "u_FogParams", ShaderDataType.Vector4);
            sceneUniformMap.addShaderUniform(Scene3D.TIME, "u_Time", ShaderDataType.Float);
        }
        sceneUniformMap.addShaderUniform(Scene3D.DIRECTIONLIGHTCOUNT, "u_DirationLightCount", ShaderDataType.Int);
        sceneUniformMap.addShaderUniform(Scene3D.LIGHTBUFFER, "u_LightBuffer", ShaderDataType.Texture2D);
        sceneUniformMap.addShaderUniform(Scene3D.CLUSTERBUFFER, "u_LightClusterBuffer", ShaderDataType.Texture2D);
        sceneUniformMap.addShaderUniform(Scene3D.GIRotate, "u_GIRotate", ShaderDataType.Float);
    }
    static legacyLightingValueInit() {
        Scene3D.LIGHTDIRECTION = Shader3D.propertyNameToID("u_DirectionLight.direction");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.LIGHTDIRECTION, "u_DirectionLight.direction", ShaderDataType.Vector3);
        Scene3D.LIGHTDIRCOLOR = Shader3D.propertyNameToID("u_DirectionLight.color");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.LIGHTDIRCOLOR, "u_DirectionLight.color", ShaderDataType.Vector3);
        Scene3D.LIGHTMODE = Shader3D.propertyNameToID("u_DirectionLight.lightMode");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.LIGHTMODE, "u_DirectionLight.lightMode", ShaderDataType.Int);
        Scene3D.POINTLIGHTPOS = Shader3D.propertyNameToID("u_PointLight.position");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.POINTLIGHTPOS, "u_PointLight.position", ShaderDataType.Vector3);
        Scene3D.POINTLIGHTRANGE = Shader3D.propertyNameToID("u_PointLight.range");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.POINTLIGHTRANGE, "u_PointLight.range", ShaderDataType.Float);
        Scene3D.POINTLIGHTATTENUATION = Shader3D.propertyNameToID("u_PointLight.attenuation");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.POINTLIGHTATTENUATION, "u_PointLight.attenuation", ShaderDataType.Float);
        Scene3D.POINTLIGHTCOLOR = Shader3D.propertyNameToID("u_PointLight.color");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.POINTLIGHTCOLOR, "u_PointLight.color", ShaderDataType.Vector3);
        Scene3D.POINTLIGHTMODE = Shader3D.propertyNameToID("u_PointLight.lightMode");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.POINTLIGHTMODE, "u_PointLight.lightMode", ShaderDataType.Int);
        Scene3D.SPOTLIGHTPOS = Shader3D.propertyNameToID("u_SpotLight.position");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTPOS, "u_SpotLight.position", ShaderDataType.Vector3);
        Scene3D.SPOTLIGHTDIRECTION = Shader3D.propertyNameToID("u_SpotLight.direction");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTDIRECTION, "u_SpotLight.direction", ShaderDataType.Vector3);
        Scene3D.SPOTLIGHTSPOTANGLE = Shader3D.propertyNameToID("u_SpotLight.spot");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTSPOTANGLE, "u_SpotLight.spot", ShaderDataType.Float);
        Scene3D.SPOTLIGHTRANGE = Shader3D.propertyNameToID("u_SpotLight.range");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTRANGE, "u_SpotLight.range", ShaderDataType.Float);
        Scene3D.SPOTLIGHTCOLOR = Shader3D.propertyNameToID("u_SpotLight.color");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTCOLOR, "u_SpotLight.color", ShaderDataType.Vector3);
        Scene3D.SPOTLIGHTMODE = Shader3D.propertyNameToID("u_SpotLight.lightMode");
        Scene3D.sceneUniformMap.addShaderUniform(Scene3D.SPOTLIGHTMODE, "u_SpotLight.lightMode", ShaderDataType.Int);
    }
    static createSceneUniformBlock() {
        if (!Scene3D.SceneUBOData) {
            let uniformpara = new Map();
            uniformpara.set("u_Time", UniformBufferParamsType.Number);
            uniformpara.set("u_FogParams", UniformBufferParamsType.Vector4);
            uniformpara.set("u_FogColor", UniformBufferParamsType.Vector4);
            let uniformMap = new Map();
            uniformpara.forEach((value, key) => {
                uniformMap.set(Shader3D.propertyNameToID(key), value);
            });
            Scene3D.SceneUBOData = new UnifromBufferData(uniformMap);
        }
        return Scene3D.SceneUBOData;
    }
    static __init__() {
        var multiLighting = Config3D._multiLighting;
        if (multiLighting) {
            const width = 4;
            var maxLightCount = Config3D.maxLightCount;
            var clusterSlices = Config3D.lightClusterCount;
            Cluster.instance = new Cluster(clusterSlices.x, clusterSlices.y, clusterSlices.z, Math.min(Config3D.maxLightCount, Config3D._maxAreaLightCountPerClusterAverage));
            Scene3D._lightTexture = Utils3D._createFloatTextureBuffer(width, maxLightCount);
            Scene3D._lightTexture.lock = true;
            Scene3D._lightPixles = new Float32Array(maxLightCount * width * 4);
        }
        Scene3D.shaderValueInit();
        var configShaderValue = Shader3D._configDefineValues;
        if (!Config3D._multiLighting) {
            (configShaderValue.add(Shader3D.SHADERDEFINE_LEGACYSINGALLIGHTING));
            Scene3D.legacyLightingValueInit();
        }
        Scene3D._shadowCasterPass = new ShadowCasterPass();
        if (Config3D._uniformBlock)
            configShaderValue.add(Shader3D.SHADERDEFINE_ENUNIFORMBLOCK);
        Physics3D._bullet && (Scene3D.physicsSettings = new PhysicsSettings());
        let supportFloatTex = LayaGL.renderEngine.getCapable(RenderCapable.TextureFormat_R32G32B32A32);
        if (supportFloatTex) {
            configShaderValue.add(Shader3D.SHADERDEFINE_FLOATTEXTURE);
        }
        let supportFloatLinearFiltering = LayaGL.renderEngine.getCapable(RenderCapable.Texture_FloatLinearFiltering);
        if (supportFloatLinearFiltering) {
            configShaderValue.add(Shader3D.SHADERDEFINE_FLOATTEXTURE_FIL_LINEAR);
        }
    }
    static load(url, complete) {
        ILaya.loader.load(url).then((res) => {
            if (complete) {
                let ret;
                if (res) {
                    let scene = res.create();
                    if (scene instanceof Scene)
                        ret = scene._scene3D;
                    else
                        ret = scene;
                }
                complete.runWith([ret]);
            }
        });
    }
    get scene2D() {
        return this._scene2D;
    }
    set sceneRenderableManager(manager) {
        manager.list = this._sceneRenderManager.list;
        this._sceneRenderManager = manager;
    }
    get sceneRenderableManager() {
        return this._sceneRenderManager;
    }
    set cullPass(cullPass) {
        this._cullPass = cullPass;
    }
    get enableFog() {
        return this._enableFog;
    }
    set enableFog(value) {
        if (this._enableFog !== value) {
            this._enableFog = value;
            if (value) {
                this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG);
            }
            else
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG);
        }
    }
    get fogMode() {
        return this._fogMode;
    }
    set fogMode(value) {
        this._fogMode = value;
        switch (value) {
            case FogMode.Linear:
                this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_LINEAR);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP2);
                break;
            case FogMode.EXP:
                this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_LINEAR);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP2);
                break;
            case FogMode.EXP2:
                this._shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP2);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_LINEAR);
                this._shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_FOG_EXP);
                break;
        }
    }
    get fogColor() {
        return this._shaderValues.getColor(Scene3D.FOGCOLOR);
    }
    set fogColor(value) {
        this._shaderValues.setColor(Scene3D.FOGCOLOR, value);
    }
    get fogStart() {
        return this._fogParams.x;
    }
    set fogStart(value) {
        this._fogParams.x = value;
        this.fogParams = this._fogParams;
    }
    get fogEnd() {
        return this._fogParams.y;
    }
    set fogEnd(value) {
        this._fogParams.y = value;
        this.fogParams = this._fogParams;
    }
    get fogDensity() {
        return this._fogParams.z;
    }
    set fogDensity(value) {
        this._fogParams.z = value;
        this.fogParams = this._fogParams;
    }
    get fogParams() {
        return this._shaderValues.getVector(Scene3D.FOGPARAMS);
    }
    set fogParams(value) {
        this._shaderValues.setVector(Scene3D.FOGPARAMS, value);
    }
    set GIRotate(value) {
        this._shaderValues.setNumber(Scene3D.GIRotate, value);
    }
    get GIRotate() {
        return this._shaderValues.getNumber(Scene3D.GIRotate);
    }
    get ambientMode() {
        return this._sceneReflectionProb.ambientMode;
    }
    set ambientMode(value) {
        this._sceneReflectionProb.ambientMode = value;
    }
    get sceneReflectionProb() {
        return this._sceneReflectionProb;
    }
    set sceneReflectionProb(value) {
        this._sceneReflectionProb = value;
    }
    get ambientColor() {
        return this._sceneReflectionProb.ambientColor;
    }
    set ambientColor(value) {
        this._sceneReflectionProb.ambientColor = value;
    }
    get ambientIntensity() {
        return this._sceneReflectionProb.ambientIntensity;
    }
    set ambientIntensity(value) {
        this._sceneReflectionProb.ambientIntensity = value;
    }
    get reflectionIntensity() {
        return this._sceneReflectionProb.reflectionIntensity;
    }
    set reflectionIntensity(value) {
        this._sceneReflectionProb.reflectionIntensity = value;
    }
    get ambientSH() {
        return this._sceneReflectionProb.ambientSH;
    }
    set ambientSH(value) {
        this._sceneReflectionProb.ambientSH = value;
    }
    get iblTex() {
        return this._sceneReflectionProb.iblTex;
    }
    set iblTex(value) {
        this._sceneReflectionProb.iblTex = value;
    }
    get iblTexRGBD() {
        return this._sceneReflectionProb.iblTexRGBD;
    }
    set iblTexRGBD(value) {
        this._sceneReflectionProb.iblTexRGBD = value;
    }
    get skyRenderer() {
        return this._skyRenderer;
    }
    get physicsSimulation() {
        return this._physicsSimulation;
    }
    get timer() {
        return this._timer;
    }
    set timer(value) {
        this._timer = value;
    }
    get lightmaps() {
        return this._lightmaps.slice();
    }
    set lightmaps(value) {
        var maps = this._lightmaps;
        if (maps) {
            for (var i = 0, n = maps.length; i < n; i++) {
                var map = maps[i];
                map.lightmapColor && map.lightmapColor._removeReference();
                map.lightmapDirection && map.lightmapDirection._removeReference();
            }
        }
        if (value) {
            var count = value.length;
            maps.length = count;
            for (i = 0; i < count; i++) {
                var map = value[i];
                map.lightmapColor && map.lightmapColor._addReference();
                map.lightmapDirection && map.lightmapDirection._addReference();
                maps[i] = map;
            }
        }
        else {
            maps.length = 0;
        }
        this.event(Lightmap.ApplyLightmapEvent);
    }
    get shadowMapFrequency() {
        return this._ShadowMapupdateFrequency;
    }
    set shadowMapFrequency(value) {
        this._ShadowMapupdateFrequency = value;
    }
    _update() {
        var delta = this.timer._delta / 1000;
        this._time += delta;
        this._shaderValues.setNumber(Scene3D.TIME, this._time);
        let simulation = this._physicsSimulation;
        if (LayaEnv.isPlaying) {
            if (Physics3D._enablePhysics && !PhysicsSimulation.disableSimulation && Stat.enablePhysicsUpdate) {
                simulation._updatePhysicsTransformFromRender();
                PhysicsComponent._addUpdateList = false;
                simulation._simulate(delta);
                simulation._updateCharacters();
                PhysicsComponent._addUpdateList = true;
                simulation._updateCollisions();
                simulation.dispatchCollideEvent();
            }
        }
        if (this._volumeManager.needreCaculateAllRenderObjects())
            this._volumeManager.reCaculateAllRenderObjects(this._sceneRenderManager.list);
        else
            this._volumeManager.handleMotionlist();
        this._componentDriver.callStart();
        this._componentDriver.callUpdate();
        this._componentDriver.callLateUpdate();
        this._componentDriver.callDestroy();
        this._sceneRenderManager.updateMotionObjects();
        if (!this._renderByEditor)
            this._UI3DManager.update();
    }
    _binarySearchIndexInCameraPool(camera) {
        var start = 0;
        var end = this._cameraPool.length - 1;
        var mid;
        while (start <= end) {
            mid = Math.floor((start + end) / 2);
            var midValue = this._cameraPool[mid]._renderingOrder;
            if (midValue == camera._renderingOrder)
                return mid;
            else if (midValue > camera._renderingOrder)
                end = mid - 1;
            else
                start = mid + 1;
        }
        return start;
    }
    _getGroup() {
        return this._group;
    }
    _setGroup(value) {
        this._group = value;
    }
    _onActive() {
        super._onActive();
        ILaya.stage._scene3Ds.push(this);
    }
    _onInActive() {
        super._onInActive();
        var scenes = ILaya.stage._scene3Ds;
        scenes.splice(scenes.indexOf(this), 1);
    }
    _prepareSceneToRender() {
        var shaderValues = this._shaderValues;
        var multiLighting = Config3D._multiLighting && Stat.enableMulLight;
        if (multiLighting) {
            var ligTex = Scene3D._lightTexture;
            var ligPix = Scene3D._lightPixles;
            const pixelWidth = ligTex.width;
            const floatWidth = pixelWidth * 4;
            var curCount = 0;
            var dirCount = Stat.enableLight ? this._directionLights._length : 0;
            var dirElements = this._directionLights._elements;
            if (dirCount > 0) {
                var sunLightIndex = this._directionLights.getBrightestLight();
                this._mainDirectionLight = dirElements[sunLightIndex];
                this._directionLights.normalLightOrdering(sunLightIndex);
                for (var i = 0; i < dirCount; i++, curCount++) {
                    var dirLight = dirElements[i];
                    var dir = dirLight._direction;
                    var intCor = dirLight._intensityColor;
                    var off = floatWidth * curCount;
                    intCor.x = Color.gammaToLinearSpace(dirLight.color.r);
                    intCor.y = Color.gammaToLinearSpace(dirLight.color.g);
                    intCor.z = Color.gammaToLinearSpace(dirLight.color.b);
                    Vector3.scale(intCor, dirLight._intensity, intCor);
                    dirLight.owner.transform.worldMatrix.getForward(dir);
                    Vector3.normalize(dir, dir);
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 3] = dirLight._lightmapBakedType;
                    ligPix[off + 4] = dir.x;
                    ligPix[off + 5] = dir.y;
                    ligPix[off + 6] = dir.z;
                    if (i == 0) {
                        this._sunColor = dirLight.color;
                        this._sundir = dir;
                    }
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            var poiCount = Stat.enableLight ? this._pointLights._length : 0;
            if (poiCount > 0) {
                var poiElements = this._pointLights._elements;
                var mainPointLightIndex = this._pointLights.getBrightestLight();
                this._mainPointLight = poiElements[mainPointLightIndex];
                this._pointLights.normalLightOrdering(mainPointLightIndex);
                for (var i = 0; i < poiCount; i++, curCount++) {
                    var poiLight = poiElements[i];
                    var pos = poiLight.owner.transform.position;
                    var intCor = poiLight._intensityColor;
                    var off = floatWidth * curCount;
                    intCor.x = Color.gammaToLinearSpace(poiLight.color.r);
                    intCor.y = Color.gammaToLinearSpace(poiLight.color.g);
                    intCor.z = Color.gammaToLinearSpace(poiLight.color.b);
                    Vector3.scale(intCor, poiLight._intensity, intCor);
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 3] = poiLight.range;
                    ligPix[off + 4] = pos.x;
                    ligPix[off + 5] = pos.y;
                    ligPix[off + 6] = pos.z;
                    ligPix[off + 7] = poiLight._lightmapBakedType;
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            var spoCount = Stat.enableLight ? this._spotLights._length : 0;
            if (spoCount > 0) {
                var spoElements = this._spotLights._elements;
                var mainSpotLightIndex = this._spotLights.getBrightestLight();
                this._mainSpotLight = spoElements[mainSpotLightIndex];
                this._spotLights.normalLightOrdering(mainSpotLightIndex);
                for (var i = 0; i < spoCount; i++, curCount++) {
                    var spoLight = spoElements[i];
                    var dir = spoLight._direction;
                    var pos = spoLight.owner.transform.position;
                    var intCor = spoLight._intensityColor;
                    var off = floatWidth * curCount;
                    intCor.x = Color.gammaToLinearSpace(spoLight.color.r);
                    intCor.y = Color.gammaToLinearSpace(spoLight.color.g);
                    intCor.z = Color.gammaToLinearSpace(spoLight.color.b);
                    Vector3.scale(intCor, spoLight._intensity, intCor);
                    spoLight.owner.transform.worldMatrix.getForward(dir);
                    Vector3.normalize(dir, dir);
                    ligPix[off] = intCor.x;
                    ligPix[off + 1] = intCor.y;
                    ligPix[off + 2] = intCor.z;
                    ligPix[off + 3] = spoLight.range;
                    ligPix[off + 4] = pos.x;
                    ligPix[off + 5] = pos.y;
                    ligPix[off + 6] = pos.z;
                    ligPix[off + 7] = spoLight.spotAngle * Math.PI / 180;
                    ligPix[off + 8] = dir.x;
                    ligPix[off + 9] = dir.y;
                    ligPix[off + 10] = dir.z;
                    ligPix[off + 11] = spoLight._lightmapBakedType;
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            (curCount > 0) && (ligTex.setSubPixelsData(0, 0, pixelWidth, curCount, ligPix, 0, false, false, false));
            shaderValues.setTexture(Scene3D.LIGHTBUFFER, ligTex);
            shaderValues.setInt(Scene3D.DIRECTIONLIGHTCOUNT, this._directionLights._length);
            shaderValues.setTexture(Scene3D.CLUSTERBUFFER, Cluster.instance._clusterTexture);
        }
        else {
            if (this._directionLights._length > 0 && Stat.enableLight) {
                var dirLight = this._directionLights._elements[0];
                this._mainDirectionLight = dirLight;
                dirLight._intensityColor.x = Color.gammaToLinearSpace(dirLight.color.r);
                dirLight._intensityColor.y = Color.gammaToLinearSpace(dirLight.color.g);
                dirLight._intensityColor.z = Color.gammaToLinearSpace(dirLight.color.b);
                Vector3.scale(dirLight._intensityColor, dirLight._intensity, dirLight._intensityColor);
                dirLight.owner.transform.worldMatrix.getForward(dirLight._direction);
                Vector3.normalize(dirLight._direction, dirLight._direction);
                shaderValues.setVector3(Scene3D.LIGHTDIRCOLOR, dirLight._intensityColor);
                shaderValues.setVector3(Scene3D.LIGHTDIRECTION, dirLight._direction);
                shaderValues.setInt(Scene3D.LIGHTMODE, dirLight._lightmapBakedType);
                if (i == 0) {
                    this._sunColor = dirLight.color;
                    this._sundir = dirLight._direction;
                }
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_DIRECTIONLIGHT);
            }
            if (this._pointLights._length > 0 && Stat.enableLight) {
                var poiLight = this._pointLights._elements[0];
                this._mainPointLight = poiLight;
                poiLight._intensityColor.x = Color.gammaToLinearSpace(poiLight.color.r);
                poiLight._intensityColor.y = Color.gammaToLinearSpace(poiLight.color.g);
                poiLight._intensityColor.z = Color.gammaToLinearSpace(poiLight.color.b);
                Vector3.scale(poiLight._intensityColor, poiLight._intensity, poiLight._intensityColor);
                shaderValues.setVector3(Scene3D.POINTLIGHTCOLOR, poiLight._intensityColor);
                shaderValues.setVector3(Scene3D.POINTLIGHTPOS, poiLight.owner.transform.position);
                shaderValues.setNumber(Scene3D.POINTLIGHTRANGE, poiLight.range);
                shaderValues.setInt(Scene3D.POINTLIGHTMODE, poiLight._lightmapBakedType);
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_POINTLIGHT);
            }
            if (this._spotLights._length > 0 && Stat.enableLight) {
                var spotLight = this._spotLights._elements[0];
                this._mainSpotLight = spotLight;
                spotLight._intensityColor.x = Color.gammaToLinearSpace(spotLight.color.r);
                spotLight._intensityColor.y = Color.gammaToLinearSpace(spotLight.color.g);
                spotLight._intensityColor.z = Color.gammaToLinearSpace(spotLight.color.b);
                Vector3.scale(spotLight._intensityColor, spotLight._intensity, spotLight._intensityColor);
                shaderValues.setVector3(Scene3D.SPOTLIGHTCOLOR, spotLight._intensityColor);
                shaderValues.setVector3(Scene3D.SPOTLIGHTPOS, spotLight.owner.transform.position);
                spotLight.owner.transform.worldMatrix.getForward(spotLight._direction);
                Vector3.normalize(spotLight._direction, spotLight._direction);
                shaderValues.setVector3(Scene3D.SPOTLIGHTDIRECTION, spotLight._direction);
                shaderValues.setNumber(Scene3D.SPOTLIGHTRANGE, spotLight.range);
                shaderValues.setNumber(Scene3D.SPOTLIGHTSPOTANGLE, spotLight.spotAngle * Math.PI / 180);
                shaderValues.setInt(Scene3D.SPOTLIGHTMODE, spotLight._lightmapBakedType);
                shaderValues.addDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
            else {
                shaderValues.removeDefine(Scene3DShaderDeclaration.SHADERDEFINE_SPOTLIGHT);
            }
        }
    }
    get cullInfoCamera() {
        return this._cullInfoCamera;
    }
    _setCullCamera(camera) {
        this._cullInfoCamera = camera;
    }
    recaculateCullCamera() {
        this._cullInfoCamera = this._cameraPool[0];
        this._cameraPool.forEach(element => {
            if (this.cullInfoCamera.maxlocalYDistance < element.maxlocalYDistance) {
                this._cullInfoCamera = element;
            }
        });
    }
    _addCamera(camera) {
        var index = this._binarySearchIndexInCameraPool(camera);
        var order = camera._renderingOrder;
        var count = this._cameraPool.length;
        while (index < count && this._cameraPool[index]._renderingOrder <= order)
            index++;
        this._cameraPool.splice(index, 0, camera);
    }
    _removeCamera(camera) {
        this._cameraPool.splice(this._cameraPool.indexOf(camera), 1);
    }
    _preCulling(context, camera) {
        this._clearRenderQueue();
        var cameraCullInfo = FrustumCulling._cameraCullInfo;
        var cameraPos = cameraCullInfo.position = camera._transform.position;
        cameraCullInfo.cullingMask = camera.cullingMask;
        cameraCullInfo.staticMask = camera.staticMask;
        cameraCullInfo.boundFrustum = camera.boundFrustum;
        cameraCullInfo.useOcclusionCulling = camera.useOcclusionCulling;
        this._cullPass.cullByCameraCullInfo(cameraCullInfo, this.sceneRenderableManager);
        let list = this._cullPass.cullList;
        let element = list.elements;
        for (let i = 0; i < list.length; i++) {
            let render = element[i];
            render.distanceForSort = Vector3.distance(render.bounds.getCenter(), cameraPos);
            var elements = render._renderElements;
            for (var j = 0, m = elements.length; j < m; j++)
                elements[j]._update(this, context, context.customShader, context.replaceTag);
        }
    }
    _directLightShadowCull(cullInfo, context) {
        this._clearRenderQueue();
        const position = cullInfo.position;
        this._cullPass.cullByShadowCullInfo(cullInfo, this.sceneRenderableManager);
        let list = this._cullPass.cullList;
        let element = list.elements;
        for (let i = 0; i < list.length; i++) {
            let render = element[i];
            render.distanceForSort = Vector3.distance(render.bounds.getCenter(), position);
            var elements = render._renderElements;
            for (var j = 0, m = elements.length; j < m; j++)
                elements[j]._update(this, context, null, null);
        }
    }
    _sportLightShadowCull(cameraCullInfo, context) {
        this._clearRenderQueue();
        this._cullPass.cullingSpotShadow(cameraCullInfo, this.sceneRenderableManager);
        let list = this._cullPass.cullList;
        let element = list.elements;
        for (var i = 0, n = list.length; i < n; i++) {
            var render = element[i];
            render.distanceForSort = Vector3.distance(render.bounds.getCenter(), cameraCullInfo.position);
            var elements = render._renderElements;
            for (var j = 0, m = elements.length; j < m; j++)
                elements[j]._update(this, context, null, null);
        }
    }
    _clear(state) {
        var viewport = state.viewport;
        var camera = state.camera;
        var renderTex = camera._getRenderTexture();
        var vpX, vpY;
        var vpW = viewport.width;
        var vpH = viewport.height;
        let needInternalRT = camera._needInternalRenderTexture();
        if (needInternalRT) {
            vpX = 0;
            vpY = 0;
        }
        else {
            if (camera.renderTarget) {
                vpX = viewport.x;
                vpY = viewport.y;
            }
            else {
                vpX = viewport.x;
                vpY = camera._getCanvasHeight() - viewport.y - vpH;
            }
        }
        LayaGL.renderEngine.viewport(vpX, vpY, vpW, vpH);
        LayaGL.renderEngine.scissor(vpX, vpY, vpW, vpH);
        state.changeViewport(vpX, vpY, vpW, vpH);
        state.changeScissor(vpX, vpY, vpW, vpH);
        Camera._context3DViewPortCatch.set(vpX, vpY, vpW, vpH);
        Camera._contextScissorPortCatch.setValue(vpX, vpY, vpW, vpH);
        var clearFlag = camera.clearFlag;
        if (clearFlag === CameraClearFlags.Sky && !(camera.skyRenderer._isAvailable() || this._skyRenderer._isAvailable()))
            clearFlag = CameraClearFlags.SolidColor;
        let clearConst = 0;
        let stencilFlag = renderTex.depthStencilFormat == RenderTargetFormat.DEPTHSTENCIL_24_8 ? RenderClearFlag.Stencil : 0;
        switch (clearFlag) {
            case CameraClearFlags.SolidColor:
                clearConst = RenderClearFlag.Color | RenderClearFlag.Depth | stencilFlag;
                break;
            case CameraClearFlags.DepthOnly:
            case CameraClearFlags.Sky:
                clearConst = RenderClearFlag.Depth | stencilFlag;
                break;
            case CameraClearFlags.Nothing:
                clearConst = 0;
                break;
            case CameraClearFlags.ColorOnly:
                clearConst = RenderClearFlag.Color;
                break;
        }
        LayaGL.renderEngine.clearRenderTexture(clearConst, camera._linearClearColor, 1);
    }
    _renderScene(context, renderFlag) {
        var camera = context.camera;
        switch (renderFlag) {
            case Scene3D.SCENERENDERFLAG_RENDERQPAQUE:
                Stat.opaqueDrawCall += this._opaqueQueue.renderQueue(context);
                break;
            case Scene3D.SCENERENDERFLAG_SKYBOX:
                if (camera.clearFlag === CameraClearFlags.Sky) {
                    if (camera.skyRenderer._isAvailable())
                        camera.skyRenderer._render(context);
                    else if (this._skyRenderer._isAvailable())
                        this._skyRenderer._render(context);
                }
                break;
            case Scene3D.SCENERENDERFLAG_RENDERTRANSPARENT:
                Stat.transDrawCall += this._transparentQueue.renderQueue(context);
                if (Config3D.debugFrustumCulling) {
                }
                break;
        }
    }
    _parse(data, spriteMap) {
        var lightMapsData = data.lightmaps;
        if (lightMapsData) {
            var lightMapCount = lightMapsData.length;
            var lightmaps = new Array(lightMapCount);
            for (var i = 0; i < lightMapCount; i++) {
                var lightMap = new Lightmap();
                var lightMapData = lightMapsData[i];
                if (lightMapData.path) {
                    lightMap.lightmapColor = Loader.getTexture2D(lightMapData.path);
                }
                else {
                    lightMap.lightmapColor = Loader.getTexture2D(lightMapData.color.path);
                    if (lightMapData.direction)
                        lightMap.lightmapDirection = Loader.getTexture2D(lightMapData.direction.path);
                }
                lightmaps[i] = lightMap;
            }
            this.lightmaps = lightmaps;
        }
        var skyData = data.sky;
        if (skyData) {
            this._skyRenderer.material = Loader.getRes(skyData.material.path);
            switch (skyData.mesh) {
                case "SkyBox":
                    this._skyRenderer.mesh = SkyBox.instance;
                    break;
                case "SkyDome":
                    this._skyRenderer.mesh = SkyDome.instance;
                    break;
                default:
                    this.skyRenderer.mesh = SkyBox.instance;
            }
        }
        this.enableFog = data.enableFog;
        this.fogStart = data.fogStart;
        this.fogRange = data.fogRange;
        var fogColorData = data.fogColor;
        if (fogColorData) {
            var fogCol = this.fogColor;
            fogCol.fromArray(fogColorData);
            this.fogColor = fogCol;
        }
        var ambientModeData = data.ambientMode;
        var ambientColorData = data.ambientColor;
        if (ambientColorData) {
            var ambCol = this.ambientColor;
            ambCol.fromArray(ambientColorData);
            this.ambientColor = ambCol;
        }
        if (ambientModeData == AmbientMode.TripleColor) {
            let ambientSkyColor = data.ambientSkyColor;
            let tempV3sky = new Vector3();
            tempV3sky.fromArray(ambientSkyColor);
            let ambientEquatorColor = data.ambientEquatorColor;
            let tempV3Equaltor = new Vector3();
            tempV3Equaltor.fromArray(ambientEquatorColor);
            let ambientGroundColor = data.ambientGroundColor;
            let tempV3Ground = new Vector3();
            tempV3Ground.fromArray(ambientGroundColor);
            this._sceneReflectionProb.setGradientAmbient(tempV3sky, tempV3Equaltor, tempV3Ground);
        }
        var ambientSphericalHarmonicsData = data.ambientSphericalHarmonics;
        if (ambientSphericalHarmonicsData) {
            var ambientSH = new SphericalHarmonicsL2();
            for (var i = 0; i < 3; i++) {
                var off = i * 9;
                ambientSH.setCoefficients(i, ambientSphericalHarmonicsData[off], ambientSphericalHarmonicsData[off + 1], ambientSphericalHarmonicsData[off + 2], ambientSphericalHarmonicsData[off + 3], ambientSphericalHarmonicsData[off + 4], ambientSphericalHarmonicsData[off + 5], ambientSphericalHarmonicsData[off + 6], ambientSphericalHarmonicsData[off + 7], ambientSphericalHarmonicsData[off + 8]);
            }
            this._sceneReflectionProb.ambientSphericalHarmonics = ambientSH;
        }
        (ambientModeData != undefined) && (this.ambientMode = ambientModeData);
        var reflectionData = data.reflection;
        (reflectionData != undefined) && (this._sceneReflectionProb.reflectionTexture = Loader.getRes(reflectionData));
        var reflectionDecodingFormatData = data.reflectionDecodingFormat;
        (reflectionDecodingFormatData != undefined) && (this._sceneReflectionProb.reflectionDecodingFormat = reflectionDecodingFormatData);
        var ambientSphericalHarmonicsIntensityData = data.ambientSphericalHarmonicsIntensity;
        (ambientSphericalHarmonicsIntensityData != undefined) && (this._sceneReflectionProb.ambientIntensity = ambientSphericalHarmonicsIntensityData);
        var reflectionIntensityData = data.reflectionIntensity;
        (reflectionIntensityData != undefined) && (this._sceneReflectionProb.reflectionIntensity = reflectionIntensityData);
    }
    _addRenderObject(render) {
        this._sceneRenderManager.addRenderObject(render);
        render._addReflectionProbeUpdate();
    }
    _removeRenderObject(render) {
        this._sceneRenderManager.removeRenderObject(render);
    }
    _getRenderQueue(index) {
        if (index <= 2500)
            return this._opaqueQueue;
        else
            return this._transparentQueue;
    }
    _clearRenderQueue() {
        this._opaqueQueue.clear();
        this._transparentQueue.clear();
    }
    destroy(destroyChild = true) {
        if (this._destroyed)
            return;
        super.destroy(destroyChild);
        this._nativeObj = null;
        this._skyRenderer.destroy();
        this._skyRenderer = null;
        this._directionLights = null;
        this._pointLights = null;
        this._spotLights = null;
        this._alternateLights = null;
        this._shaderValues.destroy();
        this._opaqueQueue.destroy();
        this._transparentQueue.destroy();
        (RenderContext3D._instance.scene == this) && (RenderContext3D._instance.scene = null);
        this._shaderValues = null;
        this.sceneRenderableManager.destroy();
        this._sceneRenderManager = null;
        this._cameraPool = null;
        this._physicsSimulation && this._physicsSimulation._destroy();
        var maps = this._lightmaps;
        if (maps) {
            for (var i = 0, n = maps.length; i < n; i++) {
                var map = maps[i];
                map.lightmapColor && map.lightmapColor._removeReference();
                map.lightmapDirection && map.lightmapDirection._removeReference();
            }
        }
        this._lightmaps = null;
        this._volumeManager.destroy();
        this._componentDriver.callDestroy();
    }
    render(ctx) {
        if (this._children.length > 0) {
            ctx.addRenderObject3D(this);
        }
    }
    renderSubmit() {
        if (this._renderByEditor)
            return 1;
        BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
        this._prepareSceneToRender();
        var i, n, n1;
        Scene3D._updateMark++;
        for (i = 0, n = this._cameraPool.length, n1 = n - 1; i < n; i++) {
            var camera = this._cameraPool[i];
            if (camera.renderTarget)
                (camera.enableBuiltInRenderTexture = false);
            else
                camera.enableBuiltInRenderTexture = true;
            camera.enableRender && camera.render();
            Scene3D._blitTransRT = null;
            if (camera.enableRender && !camera.renderTarget) {
                (Scene3D._blitTransRT = camera._internalRenderTexture);
                var canvasWidth = camera._getCanvasWidth(), canvasHeight = camera._getCanvasHeight();
                Scene3D._blitOffset.setValue(camera.viewport.x / canvasWidth, camera.viewport.y / canvasHeight, camera.viewport.width / canvasWidth, camera.viewport.height / canvasHeight);
                this.blitMainCanvans(Scene3D._blitTransRT, camera.normalizedViewport, camera);
            }
            if (!camera._cacheDepth) {
                camera.enableRender && camera._needInternalRenderTexture() && (!camera._internalRenderTexture._inPool) && RenderTexture.recoverToPool(camera._internalRenderTexture);
            }
        }
        Context.set2DRenderConfig();
        RenderTexture.clearPool();
        return 1;
    }
    blitMainCanvans(source, normalizeViewPort, camera) {
        if (!source)
            return;
        Scene3D.mainCavansViewPort.x = RenderContext3D.clientWidth * normalizeViewPort.x | 0;
        Scene3D.mainCavansViewPort.y = RenderContext3D.clientHeight * normalizeViewPort.y | 0;
        Scene3D.mainCavansViewPort.width = RenderContext3D.clientWidth * normalizeViewPort.width | 0;
        Scene3D.mainCavansViewPort.height = RenderContext3D.clientHeight * normalizeViewPort.height | 0;
        source.filterMode = FilterMode.Bilinear;
        if (camera.fxaa)
            BlitFrameBufferCMD.shaderdata.addDefine(BaseCamera.SHADERDEFINE_FXAA);
        var cmd = BlitFrameBufferCMD.create(source, null, Scene3D.mainCavansViewPort, null, null, BlitFrameBufferCMD.shaderdata);
        cmd.run();
        cmd.recover();
        BlitFrameBufferCMD.shaderdata.removeDefine(BaseCamera.SHADERDEFINE_FXAA);
    }
    getRenderType() {
        return 0;
    }
    releaseRender() {
    }
    reUse(context, pos) {
        return 0;
    }
    setGlobalShaderValue(name, type, value) {
        var shaderOffset = Shader3D.propertyNameToID(name);
        this._shaderValues.setShaderData(shaderOffset, type, value);
    }
    get fogRange() {
        return this._fogParams.y - this.fogParams.x;
    }
    set fogRange(value) {
        this._fogParams.y = value + this.fogParams.x;
        this.fogParams = this._fogParams;
    }
    setlightmaps(value) {
        var maps = this._lightmaps;
        for (var i = 0, n = maps.length; i < n; i++)
            maps[i].lightmapColor._removeReference();
        if (value) {
            var count = value.length;
            maps.length = count;
            for (i = 0; i < count; i++) {
                var lightMap = value[i];
                lightMap._addReference();
                (maps[i]) || (maps[i] = new Lightmap());
                maps[i].lightmapColor = lightMap;
            }
        }
        else {
            throw new Error("Scene3D: value value can't be null.");
        }
    }
    getlightmaps() {
        var lightmapColors = new Array(this._lightmaps.length);
        for (var i = 0; i < this._lightmaps.length; i++) {
            lightmapColors[i] = this._lightmaps[i].lightmapColor;
        }
        return lightmapColors;
    }
}
Scene3D.REFLECTIONMODE_SKYBOX = 0;
Scene3D.REFLECTIONMODE_CUSTOM = 1;
Scene3D.SCENERENDERFLAG_RENDERQPAQUE = 0;
Scene3D.SCENERENDERFLAG_SKYBOX = 1;
Scene3D.SCENERENDERFLAG_RENDERTRANSPARENT = 2;
Scene3D.__updateMark = 0;
Scene3D._blitOffset = new Vector4();
Scene3D.mainCavansViewPort = new Viewport(0, 0, 1, 1);

//# sourceMappingURL=Scene3D.js.map
