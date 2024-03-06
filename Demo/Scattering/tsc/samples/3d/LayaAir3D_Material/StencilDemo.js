import { Laya } from "Laya";
import { Material } from "laya/d3/core/material/Material";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { Stage } from "laya/display/Stage";
import { Loader } from "laya/net/Loader";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Event } from "laya/events/Event";
import { Button } from "laya/ui/Button";
import Client from "../../Client";
import { MeshRenderer } from "laya/d3/core/MeshRenderer";
import { RenderTargetFormat } from "laya/RenderEngine/RenderEnum/RenderTargetFormat";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { RenderState } from "laya/RenderEngine/RenderShader/RenderState";
/**
 * 模板测试示例
 * @author miner
 */
export class StencilDemo {
    constructor() {
        this.curStateIndex = 0;
        /**实例类型*/
        this.btype = "StencilDemo";
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //预加载所有资源
            var resource = ["res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls", "res/threeDimen/texture/earth.png"];
            Laya.loader.load(resource, Handler.create(this, this.onPreLoadFinish));
        });
    }
    onPreLoadFinish() {
        //初始化3D场景
        var scene = Laya.stage.addChild(Loader.createNodes("res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"));
        //获取相机
        var camera = scene.getChildByName("Main Camera");
        camera.depthTextureFormat = RenderTargetFormat.DEPTHSTENCIL_24_8;
        //为相机添加视角控制组件(脚本)
        camera.addComponent(CameraMoveScript);
        //获取球型精灵
        let sphere = scene.getChildByName("Sphere");
        let sphereClone = sphere.clone();
        scene.addChild(sphereClone);
        let matW = sphere.getComponent(MeshRenderer).sharedMaterial;
        //打开材质模板写入
        matW.stencilRef = 2;
        matW.stencilWrite = true;
        matW.stencilTest = RenderState.STENCILTEST_ALWAYS;
        matW.renderQueue = Material.RENDERQUEUE_OPAQUE;
        let tempVector3 = new Vector3();
        Vector3.scale(sphereClone.transform.localScale, 1.5, tempVector3);
        sphereClone.transform.localScale = tempVector3;
        let mat = new UnlitMaterial();
        mat.albedoColor = new Color(0.8, 0.5, 0.1);
        sphereClone.getComponent(MeshRenderer).sharedMaterial = mat;
        mat.stencilRef = 0;
        mat.stencilWrite = false;
        mat.stencilTest = RenderState.STENCILTEST_GEQUAL;
        mat.renderQueue = Material.RENDERQUEUE_OPAQUE + 1;
        this.stencilMat = mat;
        this.loadUI();
    }
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.changeActionButton = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "Stencil开启"));
            this.changeActionButton.size(160, 40);
            this.changeActionButton.labelBold = true;
            this.changeActionButton.labelSize = 30;
            this.changeActionButton.sizeGrid = "4,4,4,4";
            this.changeActionButton.scale(Browser.pixelRatio, Browser.pixelRatio);
            this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Browser.pixelRatio / 2, Laya.stage.height - 100 * Browser.pixelRatio);
            this.changeActionButton.on(Event.CLICK, this, this.stypeFun0);
        }));
    }
    stypeFun0(label = "Stencil开启") {
        if (++this.curStateIndex % 2 == 1) {
            this.changeActionButton.label = "Stencil开启";
            this.stencilMat.stencilTest = RenderState.STENCILTEST_OFF;
        }
        else {
            this.changeActionButton.label = "Stencil关闭";
            this.stencilMat.stencilTest = RenderState.STENCILTEST_GEQUAL;
        }
        label = this.changeActionButton.label;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: label });
    }
}
