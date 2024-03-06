import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { SpotLight } from "laya/d3/core/light/SpotLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ...
 * @author ...
 */
export class SpotLightDemo {
    constructor() {
        this._quaternion = new Quaternion();
        this._direction = new Vector3();
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //创建场景
            var scene = Laya.stage.addChild(new Scene3D());
            //创建相机
            var camera = (scene.addChild(new Camera(0, 0.1, 1000)));
            camera.transform.translate(new Vector3(0, 0.7, 1.3));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //聚光灯
            var spotLight = scene.addChild(new SpotLight());
            //设置聚光灯颜色
            spotLight.color = new Color(1, 1, 0, 1);
            spotLight.transform.position = new Vector3(0.0, 1.2, 0.0);
            //设置聚光灯的方向
            var mat = spotLight.transform.worldMatrix;
            mat.setForward(new Vector3(0.15, -1.0, 0.0));
            spotLight.transform.worldMatrix = mat;
            //设置聚光灯范围
            spotLight.range = 1.6;
            spotLight.intensity = 8.0;
            //设置聚光灯锥形角度
            spotLight.spotAngle = 32;
            Sprite3D.load("res/threeDimen/staticModel/grid/plane.lh", Handler.create(this, function (sprite) {
                scene.addChild(sprite);
                Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey) {
                    scene.addChild(layaMonkey);
                    //设置时钟定时执行
                    Laya.timer.frameLoop(1, this, function () {
                        //从欧拉角生成四元数（顺序为Yaw、Pitch、Roll）
                        Quaternion.createFromYawPitchRoll(0.025, 0, 0, this._quaternion);
                        spotLight.transform.worldMatrix.getForward(this._direction);
                        //根据四元数旋转三维向量
                        Vector3.transformQuat(this._direction, this._quaternion, this._direction);
                        var mat = spotLight.transform.worldMatrix;
                        mat.setForward(this._direction);
                        spotLight.transform.worldMatrix = mat;
                    });
                }));
            }));
        });
    }
}
