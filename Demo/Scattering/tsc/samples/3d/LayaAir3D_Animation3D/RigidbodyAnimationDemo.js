import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
export class RigidbodyAnimationDemo {
    constructor() {
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Scene3D.load("res/threeDimen/scene/LayaScene_RigidbodyAnimation/Conventional/scene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                var camera = scene.getChildByName("Main Camera");
                camera.addComponent(CameraMoveScript);
            }));
        });
    }
}
