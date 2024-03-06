import { Laya } from "Laya";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ...
 * @author ...
 */
export class TrailDemo {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            //加载拖尾示例效果
            Scene3D.load("res/threeDimen/TrailTest/Trail.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                var camera = scene.getChildByName("Main Camera");
                camera.addComponent(CameraMoveScript);
                var directionLight = scene.addChild(new DirectionLight());
                directionLight.color = new Color(1, 1, 1, 1);
                directionLight.transform.rotate(new Vector3(-Math.PI / 3, 0, 0));
            }));
        });
    }
}
