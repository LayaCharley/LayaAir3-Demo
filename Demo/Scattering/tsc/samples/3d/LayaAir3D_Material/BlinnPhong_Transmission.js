import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Loader } from "laya/net/Loader";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
export class Blinnphong_Transmission {
    constructor() {
        this.resource = [
            "res/threeDimen/LayaScene_TransmissionScene/Conventional/Assets/monkeyThinkness.png",
            "res/threeDimen/LayaScene_TransmissionScene/Conventional/Assets/rabbitthickness.jpg"
        ];
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            //加载场景
            Scene3D.load("res/threeDimen/LayaScene_TransmissionScene/Conventional/TransmissionScene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                //获取场景中的相机
                var camera = scene.getChildByName("Main Camera");
                //加入摄像机移动控制脚本
                camera.addComponent(CameraMoveScript);
                this.rabbitModel = scene.getChildByName("rabbit");
                this.monkeyModel = scene.getChildByName("monkey");
                this.rabbitMaterial = this.rabbitModel.meshRenderer.sharedMaterial;
                this.monkeyMaterial = this.monkeyModel.meshRenderer.sharedMaterial;
                this.loadThinkNessTexture();
            }));
        });
    }
    loadThinkNessTexture() {
        Laya.loader.load(this.resource, Handler.create(this, this.onPreLoadFinish));
    }
    onPreLoadFinish() {
        this.monkeyMaterial.thinknessTexture = Loader.getTexture2D("res/threeDimen/LayaScene_TransmissionScene/Conventional/Assets/monkeyThinkness.png");
        this.rabbitMaterial.thinknessTexture = Loader.getTexture2D("res/threeDimen/LayaScene_TransmissionScene/Conventional/Assets/rabbitthickness.jpg");
        this.rabbitMaterial.enableTransmission = true;
        this.rabbitMaterial.transmissionRata = 0.0;
        this.rabbitMaterial.backDiffuse = 4.88;
        this.rabbitMaterial.transmissionColor = new Color(1.0, 1.0, 1.0, 1.0);
        this.rabbitMaterial.backScale = 1.0;
        this.monkeyMaterial.enableTransmission = true;
        this.monkeyMaterial.transmissionRata = 0.0;
        this.monkeyMaterial.backDiffuse = 1.0;
        this.monkeyMaterial.transmissionColor = new Color(0.2, 1.0, 0.0, 1.0);
        this.monkeyMaterial.backScale = 1.0;
    }
}
