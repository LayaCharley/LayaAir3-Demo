import { Laya } from "Laya";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
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
export class ChangeMesh {
    constructor() {
        this.index = 0;
        /**实例类型*/
        this.btype = "ChangeMesh";
        /**场景内按钮类型*/
        this.stype = 0;
        //初始化引擎
        Laya.init(0, 0);
        Laya.stage.scaleMode = Stage.SCALE_FULL;
        Laya.stage.screenMode = Stage.SCREEN_NONE;
        //显示性能面板
        Stat.show();
        //预加载所有资源
        var resource = ["res/threeDimen/scene/ChangeMaterialDemo/Conventional/scene.ls"];
        Laya.loader.load(resource, Handler.create(this, this.onPreLoadFinish));
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
        //获取精灵的mesh
        this.sphereMesh = this.sphere.meshFilter.sharedMesh;
        //新建四个mesh
        console.log("创建mesh");
        this.box = this.createBox();
        this.capsule = this.createCapsule();
        this.cylinder = this.createCylinder();
        this.cone = this.createCone();
        //加载UI
        this.loadUI();
    }
    createBox() {
        return PrimitiveMesh.createBox(0.5, 0.5, 0.5);
    }
    createCapsule() {
        return PrimitiveMesh.createCapsule(0.25, 1, 10, 20);
    }
    createCylinder() {
        return PrimitiveMesh.createCylinder(0.25, 1, 20);
    }
    createCone() {
        return PrimitiveMesh.createCone(0.25, 0.75);
    }
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.changeActionButton = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "切换Mesh"));
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
        if (this.index % 5 === 1) {
            //切换mesh
            this.sphere.meshFilter.sharedMesh = this.createBox();
        }
        else if (this.index % 5 === 2) {
            //切换mesh
            this.sphere.meshFilter.sharedMesh = this.createCapsule();
        }
        else if (this.index % 5 === 3) {
            //切换mesh
            this.sphere.meshFilter.sharedMesh = this.createCylinder();
        }
        else if (this.index % 5 === 4) {
            //切换mesh
            this.sphere.meshFilter.sharedMesh = this.createCone();
        }
        else {
            //切换mesh
            this.sphere.meshFilter.sharedMesh = this.sphereMesh;
        }
        index = this.index;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: index });
    }
}
