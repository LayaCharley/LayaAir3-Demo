import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import Client from "../../Client";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Event } from "laya/events/Event";
import { Vector3 } from "laya/maths/Vector3";
/**
 * ...
 * @author miner
 */
export class CameraMSAADemo {
    constructor() {
        /**实例类型*/
        this.btype = "CameraMSAADemo";
        /**场景内按钮类型*/
        /**场景内按钮类型*/
        this.stype = 0;
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            this.onResComplate();
        });
    }
    onResComplate() {
        this.scene = Laya.stage.addChild(new Scene3D());
        //this.scene.ambientColor = new Vector3(1, 1, 1);
        var camera = this.scene.addChild(new Camera(0, 0.1, 1000));
        camera.transform.translate(new Vector3(0, 1, 5));
        camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
        camera.addComponent(CameraMoveScript);
        this.camera = camera;
        var directionLight = this.scene.addChild(new DirectionLight());
        //方向光的颜色
        directionLight.color.setValue(0.5, 0.5, 0.5, 1);
        //设置平行光的方向
        var mat = directionLight.transform.worldMatrix;
        mat.setForward(new Vector3(-1.0, -1.0, -1.0));
        directionLight.transform.worldMatrix = mat;
        this.addObjectInScene(this.scene);
        camera.msaa = true;
        this.loadUI();
    }
    /**
   * 场景添加测试对象
   * @param scene
   */
    addObjectInScene(scene) {
        let sprite = new Sprite3D();
        scene.addChild(sprite);
        let planeMesh = PrimitiveMesh.createPlane(10, 10, 1, 1);
        let plane = new MeshSprite3D(planeMesh);
        scene.addChild(plane);
        let cubeMesh = PrimitiveMesh.createBox();
        let sphere = PrimitiveMesh.createSphere(0.3);
        let cube0 = new MeshSprite3D(cubeMesh);
        let cube1 = new MeshSprite3D(cubeMesh);
        let cube2 = new MeshSprite3D(cubeMesh);
        let cube3 = new MeshSprite3D(cubeMesh);
        let sphere0 = new MeshSprite3D(sphere);
        let sphere1 = new MeshSprite3D(sphere);
        let sphere2 = new MeshSprite3D(sphere);
        let sphere3 = new MeshSprite3D(sphere);
        cube0.meshRenderer.sharedMaterial = new BlinnPhongMaterial;
        sprite.addChild(cube0);
        sprite.addChild(cube1);
        sprite.addChild(cube2);
        sprite.addChild(cube3);
        sprite.addChild(sphere0);
        sprite.addChild(sphere1);
        sprite.addChild(sphere2);
        sprite.addChild(sphere3);
        cube1.transform.position = new Vector3(-1, 0, 0);
        cube2.transform.position = new Vector3(-1, 0, 1);
        cube3.transform.position = new Vector3(-1, 1, 0);
        sphere0.transform.position = new Vector3(-3, 0, 0);
        sphere1.transform.position = new Vector3(2, 0, 0);
        sphere2.transform.position = new Vector3(2, 0.5, 0);
        sphere3.transform.position = new Vector3(-1, 0, 2);
    }
    /**
   *@private
   */
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.button = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "关闭MSAA"));
            this.button.size(200, 40);
            this.button.labelBold = true;
            this.button.labelSize = 30;
            this.button.sizeGrid = "4,4,4,4";
            this.button.scale(Browser.pixelRatio, Browser.pixelRatio);
            this.button.pos(Laya.stage.width / 2 - this.button.width * Browser.pixelRatio / 2, Laya.stage.height - 60 * Browser.pixelRatio);
            this.button.on(Event.CLICK, this, this.stypeFun0);
        }));
    }
    stypeFun0(label = "关闭MSAA") {
        var enableHDR = !!this.camera.msaa;
        if (enableHDR) {
            this.button.label = "开启MSAA";
            this.camera.msaa = false;
        }
        else {
            this.button.label = "关闭MSAA";
            this.camera.msaa = true;
        }
        label = this.button.label;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: label });
    }
}
