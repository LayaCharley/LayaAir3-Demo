import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
/**
 * ...
 * @author sss
 */
export class TestAbc {
    constructor() {
        //初始化引擎
        Laya.init(720, 1280).then(() => {
            //适配模式
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //开启统计信息
            Stat.show();
            //预加载所有资源
            var resource = ["res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"];
            Laya.loader.load(resource, Handler.create(this, this.onLoadFinish));
        });
    }
    onLoadFinish() {
        //添加3D场景
        var scene = Laya.stage.addChild(new Scene3D());
        //添加照相机
        var camera = (scene.addChild(new Camera(0, 0.1, 100)));
        camera.transform.translate(new Vector3(0, 3, 3));
        camera.transform.rotate(new Vector3(-30, 0, 0), true, false);
        //添加方向光
        var directionLight = scene.addChild(new DirectionLight());
        directionLight.color = new Color(0.6, 0.6, 0.6, 1);
        var mat = directionLight.transform.worldMatrix;
        mat.setForward(new Vector3(1, -1, 0));
        directionLight.transform.worldMatrix = mat;
        var sp = Laya.loader.getRes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        scene.addChild(sp);
    }
}
