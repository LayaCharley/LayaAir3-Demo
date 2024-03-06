import { Laya } from "Laya";
import { CameraEventFlags } from "laya/d3/core/Camera";
import { CommandBuffer } from "laya/d3/core/render/command/CommandBuffer";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { ShurikenParticleMaterial } from "laya/d3/core/particleShuriKen/ShurikenParticleMaterial";
import { BlurEffect, BlurMaterial } from "../LayaAir3D_PostProcess/BlurShader/BlurEffect";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Event } from "laya/events/Event";
import Client from "../../Client";
import { FilterMode } from "laya/RenderEngine/RenderEnum/FilterMode";
import { RenderTargetFormat } from "laya/RenderEngine/RenderEnum/RenderTargetFormat";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { Color } from "laya/maths/Color";
import { Vector4 } from "laya/maths/Vector4";
import { RenderTexture } from "laya/resource/RenderTexture";
export class CommandBuffer_Outline {
    constructor() {
        this.cameraEventFlag = CameraEventFlags.BeforeImageEffect;
        this.enableCommandBuffer = false;
        /**实例类型*/
        this.btype = "CommandBuffer_Outline";
        /**场景内按钮类型*/
        this.stype = 0;
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            BlurEffect.init();
            var unlitMaterial = new UnlitMaterial();
            unlitMaterial.albedoColor = new Color(255, 0, 0, 255);
            var shurikenMaterial = new ShurikenParticleMaterial();
            shurikenMaterial.color = new Color(255, 0, 0, 255);
            Shader3D.debugMode = true;
            //加载场景
            Scene3D.load("res/threeDimen/OutlineEdgeScene/Conventional/OutlineEdgeScene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                //获取场景中的相机
                this.camera = scene.getChildByName("Main Camera");
                // //加入摄像机移动控制脚本
                this.camera.addComponent(CameraMoveScript);
                var renders = [];
                var materials = [];
                renders.push(scene.getChildByName("Cube").meshRenderer);
                materials.push(unlitMaterial);
                renders.push(scene.getChildByName("Particle").particleRenderer);
                materials.push(shurikenMaterial);
                renders.push(scene.getChildByName("LayaMonkey").getChildByName("LayaMonkey").skinnedMeshRenderer);
                materials.push(unlitMaterial);
                //创建commandBuffer
                this.commandBuffer = this.createDrawMeshCommandBuffer(this.camera, renders, materials);
                //将commandBuffer加入渲染流程
                this.camera.addCommandBuffer(this.cameraEventFlag, this.commandBuffer);
                //加载UI
                this.loadUI();
            }));
        });
    }
    createDrawMeshCommandBuffer(camera, renders, materials) {
        var buf = new CommandBuffer();
        //当需要在流程中拿摄像机渲染效果的时候 设置true
        camera.enableBuiltInRenderTexture = true;
        //创建和屏幕一样大的Rendertexture
        var viewPort = camera.viewport;
        var renderTexture = RenderTexture.createFromPool(viewPort.width, viewPort.height, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None, false, 1);
        //将RenderTexture设置为渲染目标
        buf.setRenderTarget(renderTexture);
        //清楚渲染目标的颜色为黑色，不清理深度
        buf.clearRenderTarget(true, false, new Color(0, 0, 0, 0));
        //将传入的Render渲染到纹理上
        for (var i = 0, n = renders.length; i < n; i++) {
            buf.drawRender(renders[i], materials[i], 0);
        }
        //创建新的RenderTexture
        var subRendertexture = RenderTexture.createFromPool(viewPort.width, viewPort.height, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None, false, 1);
        //将renderTexture的结果复制到subRenderTexture
        buf.blitScreenQuad(renderTexture, subRendertexture);
        //设置模糊的参数
        var downSampleFactor = 2;
        var downSampleWidth = viewPort.width / downSampleFactor;
        var downSampleheigh = viewPort.height / downSampleFactor;
        var texSize = new Vector4(1.0 / viewPort.width, 1.0 / viewPort.height, viewPort.width, downSampleheigh);
        //创建模糊材质
        var blurMaterial = new BlurMaterial(texSize, 1);
        blurMaterial.lock = true;
        //创建降采样RenderTexture1
        var downRenderTexture = RenderTexture.createFromPool(downSampleWidth, downSampleheigh, RenderTargetFormat.R8G8B8, RenderTargetFormat.None, false, 1);
        //降采样  使用blurMaterial材质的0SubShader将Rendertexture渲染到DownRendertexture
        buf.blitScreenQuadByMaterial(renderTexture, downRenderTexture, null, blurMaterial, 0);
        //创建降采样RenderTexture2
        var blurTexture = RenderTexture.createFromPool(downSampleWidth, downSampleheigh, RenderTargetFormat.R8G8B8, RenderTargetFormat.None, false, 1);
        blurTexture.filterMode = FilterMode.Bilinear;
        //Horizontal blur 使用blurMaterial材质的1SubShader
        buf.blitScreenQuadByMaterial(downRenderTexture, blurTexture, null, blurMaterial, 1);
        //vertical blur	使用blurMaterial材质的2SubShader
        buf.blitScreenQuadByMaterial(blurTexture, downRenderTexture, null, blurMaterial, 2);
        //Horizontal blur 使用blurMaterial材质的1SubShader
        buf.blitScreenQuadByMaterial(downRenderTexture, blurTexture, null, blurMaterial, 1);
        //vertical blur   使用blurMaterial材质的2SubShader
        buf.blitScreenQuadByMaterial(blurTexture, downRenderTexture, null, blurMaterial, 2);
        //在命令流里面插入设置图片命令流，在调用的时候会设置blurMaterial的图片数据
        buf.setShaderDataTexture(blurMaterial._shaderValues, BlurMaterial.SHADERVALUE_SOURCETEXTURE0, downRenderTexture);
        buf.setShaderDataTexture(blurMaterial._shaderValues, BlurMaterial.ShADERVALUE_SOURCETEXTURE1, subRendertexture);
        //caculate edge计算边缘图片
        buf.blitScreenQuadByMaterial(blurTexture, renderTexture, null, blurMaterial, 3);
        //重新传入图片
        buf.setShaderDataTexture(blurMaterial._shaderValues, BlurMaterial.SHADERVALUE_SOURCETEXTURE0, renderTexture);
        //将camera渲染结果复制到subRendertexture，使用blurMaterial的4通道shader
        buf.blitScreenQuadByMaterial(null, subRendertexture, null, blurMaterial, 4);
        //将subRenderTexture重新赋值到camera的渲染结果上面
        buf.blitScreenQuadByMaterial(subRendertexture, null);
        return buf;
    }
    /**
 *@private
 */
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.button = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "关闭描边"));
            this.button.size(200, 40);
            this.button.labelBold = true;
            this.button.labelSize = 30;
            this.button.sizeGrid = "4,4,4,4";
            this.button.scale(Browser.pixelRatio, Browser.pixelRatio);
            this.button.pos(Laya.stage.width / 2 - this.button.width * Browser.pixelRatio / 2, Laya.stage.height - 60 * Browser.pixelRatio);
            this.button.on(Event.CLICK, this, this.stypeFun0);
        }));
    }
    stypeFun0(label = "关闭描边") {
        this.enableCommandBuffer = !this.enableCommandBuffer;
        if (this.enableCommandBuffer) {
            this.button.label = "开启描边";
            this.camera.removeCommandBuffer(this.cameraEventFlag, this.commandBuffer);
        }
        else {
            this.button.label = "关闭描边";
            this.camera.addCommandBuffer(this.cameraEventFlag, this.commandBuffer);
        }
        label = this.button.label;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: label });
    }
}
