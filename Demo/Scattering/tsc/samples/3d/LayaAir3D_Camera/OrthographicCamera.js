import { Laya } from "Laya";
import { Camera, CameraClearFlags } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Stage } from "laya/display/Stage";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
export class OrthographicCamera {
    constructor() {
        /**
         * (pos.x pos.y) 屏幕位置
         *  pos.z 深度取值范围(-1,1);
         * */
        this.pos = new Vector3(310, 500, 0);
        this._translate = new Vector3(0, 0, 0);
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            var scene = Laya.stage.addChild(new Scene3D());
            var camera = scene.addChild(new Camera(0, 0.1, 1000));
            camera.transform.rotate(new Vector3(0, 0, 0), false, false);
            camera.transform.translate(new Vector3(0, 1, 3));
            camera.orthographic = true;
            camera.clearFlag = CameraClearFlags.SolidColor;
            //正交投影垂直矩阵尺寸
            camera.orthographicVerticalSize = 10;
            var directionLight = scene.addChild(new DirectionLight());
            Sprite3D.load("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh", Handler.create(this, function (layaMonkey) {
                scene.addChild(layaMonkey);
                layaMonkey.transform.localScale = new Vector3(10, 10, 10);
                layaMonkey.transform.localPosition = new Vector3(0, 0, 0);
            }));
        });
    }
}
