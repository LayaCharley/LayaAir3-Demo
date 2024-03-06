import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
export class ReflectionProbeDemo {
    constructor() {
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //加载场景
            Scene3D.load("res/threeDimen/ReflectionProbeDemo/ReflectionProbe.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                //获取场景中的相机
                var camera = scene.getChildByName("Camera");
                camera.addComponent(CameraMoveScript);
            }));
        });
    }
}
