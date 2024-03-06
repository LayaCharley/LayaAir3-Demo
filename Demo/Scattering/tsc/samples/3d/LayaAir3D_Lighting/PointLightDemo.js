import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { PointLight } from "laya/d3/core/light/PointLight";
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
export class PointLightDemo {
    constructor() {
        this._temp_position = new Vector3();
        this._temp_quaternion = new Quaternion();
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //创建场景
            var scene = Laya.stage.addChild(new Scene3D());
            //设置场景环境光颜色
            scene.ambientColor = new Color(0.1, 0.1, 0.1);
            //创建相机
            var camera = (scene.addChild(new Camera(0, 0.1, 1000)));
            camera.transform.translate(new Vector3(0, 0.7, 1.3));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //创建点光源
            var pointLight = scene.addChild(new PointLight());
            //点光源的颜色
            pointLight.color = new Color(1.0, 0.5, 0.0, 1);
            pointLight.transform.position = new Vector3(0.4, 0.4, 0.0);
            //设置点光源的范围
            pointLight.range = 3.0;
            //加载地面
            Sprite3D.load("res/threeDimen/staticModel/grid/plane.lh", Handler.create(this, function (sprite) {
                var grid = scene.addChild(sprite);
                //加载猴子精灵
                Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey) {
                    scene.addChild(layaMonkey);
                    //设置时钟定时执行
                    Laya.timer.frameLoop(1, this, function () {
                        //从欧拉角生成四元数（顺序为Yaw、Pitch、Roll）
                        Quaternion.createFromYawPitchRoll(0.025, 0, 0, this._temp_quaternion);
                        //根据四元数旋转三维向量
                        Vector3.transformQuat(pointLight.transform.position, this._temp_quaternion, this._temp_position);
                        pointLight.transform.position = this._temp_position;
                    });
                }));
            }));
        });
    }
}
