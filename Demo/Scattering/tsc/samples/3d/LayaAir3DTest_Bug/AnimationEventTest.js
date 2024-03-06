import { Laya } from "Laya";
import { Script } from "laya/components/Script";
import { Animator } from "laya/d3/component/Animator/Animator";
import { Camera } from "laya/d3/core/Camera";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
export class AnimationEventTest {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            var scene = Laya.stage.addChild(new Scene3D());
            scene.ambientColor = new Color(1, 1, 1);
            var camera = scene.addChild(new Camera(0, 0.1, 100));
            camera.transform.translate(new Vector3(0, 0.5, 3));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            Sprite3D.load("Test/res3d/Conventional/Character.lh", Handler.create(null, function (sprite) {
                scene.addChild(sprite);
                var sp = sprite.getChildAt(0).getChildAt(1).getChildAt(0);
                var ani = sp.getComponent(Animator);
                sp.addComponent(SceneScript);
                ani.play("idle01_01_ani");
            }));
        });
    }
}
class SceneScript extends Script {
    constructor() {
        super();
    }
    //对应unity添加的AnimationEvent的动画事件函数，名字是可以对应上的
    switch_ani() {
        console.log("TTTTTTT");
    }
}
