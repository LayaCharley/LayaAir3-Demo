import { LayaGL } from "../layagl/LayaGL";
import { RenderStatisticsInfo } from "../RenderEngine/RenderEnum/RenderStatInfo";
export class Stat {
    static show(x = 0, y = 0, views = Stat.AllShow) {
        Stat._currentShowArray = views;
        Stat._StatRender.show(x, y, views);
    }
    static showToggle(x = 0, y = 0, views = Stat.AllToggle) {
        Stat._currentToggleArray = views;
        Stat._StatRender.showToggle(x, y, views);
    }
    static setStat(stat, value) {
        if (!Stat[stat])
            Stat[stat] = 0;
        Stat[stat] += value;
    }
    static enable() {
        Stat._StatRender.enable();
    }
    static hide() {
        Stat._StatRender.hide();
    }
    static updateEngineData() {
        Stat.trianglesFaces = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.Triangle);
        Stat.drawCall = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.DrawCall);
        Stat.instanceDrawCall = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.InstanceDrawCall);
        Stat.gpuMemory = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.GPUMemory);
        Stat.textureMemory = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.TextureMemeory);
        Stat.renderTextureMemory = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.RenderTextureMemory);
        Stat.bufferMemory = LayaGL.renderEngine.getStatisticsInfo(RenderStatisticsInfo.BufferMemory);
    }
    static clear() {
        if (!Stat._currentShowArray)
            return;
        Stat._currentShowArray.forEach(element => {
            if (element.mode == "average")
                Stat[element.value] = 0;
        });
        LayaGL.renderEngine.clearStatisticsInfo(RenderStatisticsInfo.Triangle);
        LayaGL.renderEngine.clearStatisticsInfo(RenderStatisticsInfo.DrawCall);
        LayaGL.renderEngine.clearStatisticsInfo(RenderStatisticsInfo.InstanceDrawCall);
    }
    static set onclick(fn) {
        Stat._StatRender.set_onclick(fn);
    }
}
Stat.FPSStatUIParams = { title: "FPS(WebGL)", value: "_fpsStr", color: "yellow", units: "int", mode: "summit" };
Stat.NodeStatUIParams = { title: "NodeNums", value: "spriteCount", color: "white", units: "int", mode: "summit" };
Stat.Sprite3DStatUIParams = { title: "Sprite3D", value: "sprite3DCount", color: "white", units: "int", mode: "summit" };
Stat.DrawCall = { title: "DrawCall", value: "drawCall", color: "white", units: "int", mode: "average" };
Stat.TriangleFace = { title: "TriangleFace", value: "trianglesFaces", color: "white", units: "int", mode: "average" };
Stat.RenderNode = { title: "RenderNode", value: "renderNode", color: "white", units: "int", mode: "summit" };
Stat.SkinRenderNode = { title: "SkinRenderNode", value: "skinRenderNode", color: "white", units: "int", mode: "summit" };
Stat.ParticleRenderNode = { title: "ParticleRenderNode", value: "particleRenderNode", color: "white", units: "int", mode: "summit" };
Stat.FrustumCulling = { title: "FrustumCulling", value: "frustumCulling", color: "white", units: "int", mode: "average" };
Stat.UniformUpload = { title: "UniformUpload", value: "uniformUpload", color: "white", units: "int", mode: "average" };
Stat.OpaqueDrawCall = { title: "OpaqueDrawCall", value: "opaqueDrawCall", color: "white", units: "int", mode: "average" };
Stat.TransDrawCall = { title: "TransDrawCall", value: "transDrawCall", color: "white", units: "int", mode: "average" };
Stat.DepthCastDrawCall = { title: "DepthCastDrawCall", value: "depthCastDrawCall", color: "white", units: "int", mode: "average" };
Stat.InstanceDrawCall = { title: "InstanceDrawCall", value: "instanceDrawCall", color: "white", units: "int", mode: "average" };
Stat.CMDDrawCall = { title: "CMDDrawCall", value: "cmdDrawCall", color: "white", units: "int", mode: "average" };
Stat.BlitDrawCall = { title: "BlitDrawCall", value: "blitDrawCall", color: "white", units: "int", mode: "average" };
Stat.GPUMemory = { title: "GPUMemory", value: "gpuMemory", color: "white", units: "M", mode: "summit" };
Stat.TextureMemeory = { title: "TextureMemory", value: "textureMemory", color: "white", units: "M", mode: "summit" };
Stat.RenderTextureMemory = { title: "RenderTextureMemory", value: "renderTextureMemory", color: "white", units: "M", mode: "summit" };
Stat.BufferMemory = { title: "BufferMemory", value: "bufferMemory", color: "white", units: "M", mode: "summit" };
Stat.uploadUniformNum = { title: "uploadUniformNum", value: "uploadUniform", color: "white", units: "int", mode: "average" };
Stat.AllShow = [Stat.FPSStatUIParams, Stat.NodeStatUIParams, Stat.Sprite3DStatUIParams, Stat.DrawCall, Stat.TriangleFace, Stat.RenderNode, Stat.SkinRenderNode, Stat.ParticleRenderNode,
    Stat.FrustumCulling, Stat.OpaqueDrawCall, Stat.TransDrawCall, Stat.DepthCastDrawCall, Stat.InstanceDrawCall, Stat.CMDDrawCall, Stat.BlitDrawCall, Stat.GPUMemory, Stat.TextureMemeory, Stat.RenderTextureMemory, Stat.BufferMemory, Stat.uploadUniformNum];
Stat.memoryShow = [Stat.GPUMemory, Stat.TextureMemeory, Stat.RenderTextureMemory, Stat.BufferMemory];
Stat.renderShow = [Stat.DrawCall, Stat.TriangleFace, Stat.OpaqueDrawCall, Stat.TransDrawCall, Stat.DepthCastDrawCall, Stat.InstanceDrawCall, Stat.CMDDrawCall, Stat.BlitDrawCall];
Stat.toogle_Shadow = { title: "Shadow", value: "enableShadow", color: "white" };
Stat.toogle_MulLight = { title: "MulLight", value: "enableMulLight", color: "white" };
Stat.toogle_Light = { title: "Light", value: "enableLight", color: "white" };
Stat.toogle_Postprocess = { title: "Postprocess", value: "enablePostprocess", color: "white" };
Stat.toogle_AnimatorUpdate = { title: "AnimatorUpdate", value: "enableAnimatorUpdate", color: "white" };
Stat.toogle_PhysicsUpdate = { title: "PhysicsUpdate", value: "enablePhysicsUpdate", color: "white" };
Stat.toogle_Skin = { title: "Skin", value: "enableSkin", color: "white" };
Stat.toogle_Transparent = { title: "Transparent", value: "enableTransparent", color: "white" };
Stat.toogle_Particle = { title: "Particle", value: "enableParticle", color: "white" };
Stat.toogle_msaa = { title: "MSAA", value: "enablemsaa", color: "white" };
Stat.toogle_CameraCMD = { title: "CameraCMD", value: "enableCameraCMD", color: "white" };
Stat.toogle_Opaque = { title: "Opaque", value: "enableOpaque", color: "white" };
Stat.AllToggle = [Stat.toogle_Shadow, Stat.toogle_Light, Stat.toogle_MulLight, Stat.toogle_Postprocess, Stat.toogle_AnimatorUpdate, Stat.toogle_PhysicsUpdate, Stat.toogle_Opaque, Stat.toogle_Transparent, Stat.toogle_CameraCMD, Stat.toogle_Skin, Stat.toogle_Particle, Stat.toogle_msaa];
Stat.RenderModeToggle = [Stat.toogle_Shadow, Stat.toogle_Light, Stat.toogle_MulLight, Stat.toogle_Postprocess, Stat.toogle_AnimatorUpdate, Stat.toogle_PhysicsUpdate];
Stat.RenderFuncToggle = [Stat.toogle_Opaque, Stat.toogle_Transparent, Stat.toogle_CameraCMD, Stat.toogle_Skin, Stat.toogle_Particle, Stat.toogle_msaa];
Stat.FPS = 0;
Stat.loopCount = 0;
Stat.spriteRenderUseCacheCount = 0;
Stat.canvasNormal = 0;
Stat.canvasBitmap = 0;
Stat.canvasReCache = 0;
Stat.renderSlow = false;
Stat._fpsData = [];
Stat._timer = 0;
Stat._count = 0;
Stat._fpsStr = "";
Stat.spriteCount = 0;
Stat.sprite3DCount = 0;
Stat.drawCall = 0;
Stat.trianglesFaces = 0;
Stat.renderNode = 0;
Stat.skinRenderNode = 0;
Stat.particleRenderNode = 0;
Stat.frustumCulling = 0;
Stat.uniformUpload = 0;
Stat.opaqueDrawCall = 0;
Stat.transDrawCall = 0;
Stat.depthCastDrawCall = 0;
Stat.instanceDrawCall = 0;
Stat.cmdDrawCall = 0;
Stat.blitDrawCall = 0;
Stat.textureMemory = 0;
Stat.renderTextureMemory = 0;
Stat.bufferMemory = 0;
Stat.uploadUniform = 0;
Stat.enableShadow = true;
Stat.enableMulLight = true;
Stat.enableLight = true;
Stat.enableCameraCMD = true;
Stat.enablePostprocess = true;
Stat.enableSkin = true;
Stat.enableTransparent = true;
Stat.enableParticle = true;
Stat.enableAnimatorUpdate = true;
Stat.enablePhysicsUpdate = true;
Stat.enablemsaa = true;
Stat.enableOpaque = true;
window.Stat = Stat;

//# sourceMappingURL=Stat.js.map
