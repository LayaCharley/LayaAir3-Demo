import { Config3D } from "../../../Config3D";
import { LayaGL } from "../../layagl/LayaGL";
import { RenderTargetFormat } from "../../RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { UniformBufferObject } from "../../RenderEngine/UniformBufferObject";
import { RenderClearFlag } from "../../RenderEngine/RenderEnum/RenderClearFlag";
import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { Stat } from "../../utils/Stat";
import { DepthCasterData } from "./DepthCasterData";
import { Color } from "../../maths/Color";
import { Vector4 } from "../../maths/Vector4";
import { RenderTexture } from "../../resource/RenderTexture";
export var DepthTextureMode;
(function (DepthTextureMode) {
    DepthTextureMode[DepthTextureMode["None"] = 0] = "None";
    DepthTextureMode[DepthTextureMode["Depth"] = 1] = "Depth";
    DepthTextureMode[DepthTextureMode["DepthNormals"] = 2] = "DepthNormals";
    DepthTextureMode[DepthTextureMode["DepthAndDepthNormals"] = 3] = "DepthAndDepthNormals";
    DepthTextureMode[DepthTextureMode["MotionVectors"] = 4] = "MotionVectors";
})(DepthTextureMode || (DepthTextureMode = {}));
export class DepthPass {
    constructor() {
        this._defaultNormalDepthColor = new Color(0.5, 0.5, 1.0, 0.0);
        this._zBufferParams = new Vector4();
        if (Config3D._uniformBlock) {
            this._castDepthData = DepthCasterData.createDepthCasterUniformBlock();
            this._castDepthUBO = UniformBufferObject.getBuffer(UniformBufferObject.UBONAME_SHADOW, 0);
            if (!this._castDepthUBO) {
                this._castDepthUBO = UniformBufferObject.create(UniformBufferObject.UBONAME_SHADOW, BufferUsage.Dynamic, this._castDepthData.getbyteLength(), true);
            }
        }
    }
    static __init__() {
        DepthPass.DEPTHPASS = Shader3D.getDefineByName("DEPTHPASS");
        DepthPass.DEFINE_SHADOW_BIAS = Shader3D.propertyNameToID("u_ShadowBias");
        DepthPass.DEPTHTEXTURE = Shader3D.propertyNameToID("u_CameraDepthTexture");
        DepthPass.DEPTHNORMALSTEXTURE = Shader3D.propertyNameToID("u_CameraDepthNormalsTexture");
        DepthPass.DEPTHZBUFFERPARAMS = Shader3D.propertyNameToID("u_ZBufferParams");
        DepthPass.SHADOWUNIFORMBLOCK = Shader3D.propertyNameToID(UniformBufferObject.UBONAME_SHADOW);
    }
    update(camera, depthType, depthTextureFormat) {
        this._viewPort = camera.viewport;
        this._camera = camera;
        switch (depthType) {
            case DepthTextureMode.Depth:
                camera.depthTexture = this._depthTexture = RenderTexture.createFromPool(this._viewPort.width, this._viewPort.height, depthTextureFormat, RenderTargetFormat.None, false, 1);
                break;
            case DepthTextureMode.DepthNormals:
                camera.depthNormalTexture = this._depthNormalsTexture = RenderTexture.createFromPool(this._viewPort.width, this._viewPort.height, RenderTargetFormat.R8G8B8A8, depthTextureFormat, false, 1);
                break;
            case DepthTextureMode.MotionVectors:
                break;
            default:
                throw ("there is UnDefined type of DepthTextureMode");
        }
    }
    render(context, depthType) {
        var scene = context.scene;
        var shaderValues = scene._shaderValues;
        switch (depthType) {
            case DepthTextureMode.Depth:
                context.pipelineMode = "ShadowCaster";
                shaderValues.addDefine(DepthPass.DEPTHPASS);
                shaderValues.setVector(DepthPass.DEFINE_SHADOW_BIAS, DepthPass.SHADOW_BIAS);
                var offsetX = this._viewPort.x;
                var offsetY = this._viewPort.y;
                this._depthTexture._start();
                LayaGL.renderEngine.viewport(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                LayaGL.renderEngine.scissor(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Depth, null, 1);
                context.changeViewport(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                context.changeScissor(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                context.destTarget = this._depthTexture;
                Stat.depthCastDrawCall += scene._opaqueQueue.renderQueue(context);
                this._depthTexture._end();
                this._setupDepthModeShaderValue(depthType, this._camera);
                context.pipelineMode = context.configPipeLineMode;
                shaderValues.removeDefine(DepthPass.DEPTHPASS);
                break;
            case DepthTextureMode.DepthNormals:
                context.pipelineMode = "DepthNormal";
                this._depthNormalsTexture._start();
                var offsetX = this._viewPort.x;
                var offsetY = this._viewPort.y;
                LayaGL.renderEngine.viewport(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                LayaGL.renderEngine.scissor(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                LayaGL.renderEngine.clearRenderTexture(RenderClearFlag.Color | RenderClearFlag.Depth, this._defaultNormalDepthColor, 1);
                context.destTarget = this._depthNormalsTexture;
                context.changeViewport(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                context.changeScissor(offsetX, offsetY, this._viewPort.width, this._viewPort.height);
                Stat.depthCastDrawCall += scene._opaqueQueue.renderQueue(context);
                this._depthNormalsTexture._end();
                this._setupDepthModeShaderValue(depthType, this._camera);
                context.pipelineMode = context.configPipeLineMode;
                break;
            case DepthTextureMode.MotionVectors:
                break;
            default:
                throw ("there is UnDefined type of DepthTextureMode");
        }
    }
    _setupDepthModeShaderValue(depthType, camera) {
        switch (depthType) {
            case DepthTextureMode.Depth:
                var far = camera.farPlane;
                var near = camera.nearPlane;
                this._zBufferParams.setValue(1.0 - far / near, far / near, (near - far) / (near * far), 1 / near);
                camera._shaderValues.setVector(DepthPass.DEFINE_SHADOW_BIAS, DepthPass.SHADOW_BIAS);
                camera._shaderValues.setTexture(DepthPass.DEPTHTEXTURE, this._depthTexture);
                camera._shaderValues.setVector(DepthPass.DEPTHZBUFFERPARAMS, this._zBufferParams);
                break;
            case DepthTextureMode.DepthNormals:
                camera._shaderValues.setTexture(DepthPass.DEPTHNORMALSTEXTURE, this._depthNormalsTexture);
                break;
            case DepthTextureMode.MotionVectors:
                break;
            default:
                throw ("there is UnDefined type of DepthTextureMode");
        }
    }
    cleanUp() {
        (this._depthTexture instanceof RenderTexture) && this._depthTexture && RenderTexture.recoverToPool(this._depthTexture);
        this._depthNormalsTexture && RenderTexture.recoverToPool(this._depthNormalsTexture);
        this._depthTexture = null;
        this._depthNormalsTexture = null;
    }
}
DepthPass.SHADOW_BIAS = new Vector4();

//# sourceMappingURL=DepthPass.js.map
