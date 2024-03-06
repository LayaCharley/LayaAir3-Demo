import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Stage } from "laya/display/Stage";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ...
 * @author ...
 */
export class DirectionLightDemo {
    constructor() {
        this._quaternion = new Quaternion();
        this._direction = new Vector3();
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //添加场景
            var scene = Laya.stage.addChild(new Scene3D());
            //添加相机
            var camera = (scene.addChild(new Camera(0, 0.1, 1000)));
            camera.transform.translate(new Vector3(0, 0.7, 1.3));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //创建方向光
            var directionLight = scene.addChild(new DirectionLight());
            //方向光的颜色
            directionLight.color.setValue(1, 1, 1, 1);
            //设置平行光的方向
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
            //加载地面
            Sprite3D.load("res/threeDimen/staticModel/grid/plane.lh", Handler.create(this, function (sprite) {
                var grid = scene.addChild(sprite);
                //加载猴子精灵
                Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey) {
                    var layaMonkey = scene.addChild(layaMonkey);
                    //设置时钟定时执行
                    Laya.timer.frameLoop(1, this, function () {
                        //从欧拉角生成四元数（顺序为Yaw、Pitch、Roll）
                        Quaternion.createFromYawPitchRoll(0.025, 0, 0, this._quaternion);
                        //根据四元数旋转三维向量
                        directionLight.transform.worldMatrix.getForward(this._direction);
                        Vector3.transformQuat(this._direction, this._quaternion, this._direction);
                        var mat = directionLight.transform.worldMatrix;
                        mat.setForward(this._direction);
                        directionLight.transform.worldMatrix = mat;
                    });
                }));
            }));
        });
    }
}
