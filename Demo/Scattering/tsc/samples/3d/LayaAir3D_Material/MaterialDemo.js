import { Laya } from "Laya";
import { Material } from "laya/d3/core/material/Material";
import { PBRStandardMaterial } from "laya/d3/core/material/PBRStandardMaterial";
import { Stage } from "laya/display/Stage";
import { Event } from "laya/events/Event";
import { Loader } from "laya/net/Loader";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import Client from "../../Client";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ...
 * @author ...
 */
export class MaterialDemo {
    constructor() {
        this.index = 0;
        /**实例类型*/
        this.btype = "MaterialDemo";
        /**场景内按钮类型*/
        this.stype = 0;
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
        //为相机添加视角控制组件(脚本)
        camera.addComponent(CameraMoveScript);
        //获取球型精灵
        this.sphere = scene.getChildByName("Sphere");
        //加载UI
        this.loadUI();
    }
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.changeActionButton = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "切换材质"));
            this.changeActionButton.size(160, 40);
            this.changeActionButton.labelBold = true;
            this.changeActionButton.labelSize = 30;
            this.changeActionButton.sizeGrid = "4,4,4,4";
            this.changeActionButton.scale(Browser.pixelRatio, Browser.pixelRatio);
            this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Browser.pixelRatio / 2, Laya.stage.height - 100 * Browser.pixelRatio);
            this.changeActionButton.on(Event.CLICK, this, this.stypeFun0);
        }));
    }
    stypeFun0(index = 0) {
        this.index++;
        if (this.index % 2 === 1) {
            Laya.loader.load("res/threeDimen/texture/earth.png").then(() => {
                var pbrStandardMaterial = new PBRStandardMaterial();
                //获取新的纹理
                var pbrTexture = Loader.getTexture2D("res/threeDimen/texture/earth.png");
                //为PBRStandard材质设置漫反射贴图
                pbrStandardMaterial.albedoTexture = pbrTexture;
                //切换至PBRStandard材质
                this.sphere.meshRenderer.material = pbrStandardMaterial;
            });
        }
        else {
            Material.load("res/threeDimen/scene/ChangeMaterialDemo/Conventional/Assets/Materials/layabox.lmat", Handler.create(this, function (mat) {
                //切换至BlinnPhong材质
                this.sphere.meshRenderer.material = mat;
            }));
        }
        index = this.index;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: index });
    }
}
