import { Laya } from "Laya";
import { Camera, CameraClearFlags } from "laya/d3/core/Camera";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Material } from "laya/d3/core/material/Material";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { SkyDome } from "laya/d3/resource/models/SkyDome";
import { Vector3 } from "laya/maths/Vector3";
import { URL } from "laya/net/URL";
export class Sky_SkyBox {
    constructor() {
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            URL.basePath += "sample-resource/";
            //显示性能面板
            Stat.show();
            //创建场景
            var scene = Laya.stage.addChild(new Scene3D());
            //创建相机
            var camera = scene.addChild(new Camera(0, 0.1, 100));
            camera.transform.rotate(new Vector3(10, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //设置相机的清除标识为天空盒(这个参数必须设置为CLEARFLAG_SKY，否则无法使用天空盒)
            camera.clearFlag = CameraClearFlags.Sky;
            this.camerad = camera;
            //天空盒
            Material.load("res/threeDimen/skyBox/DawnDusk/SkyBox.lmat", Handler.create(this, function (mat) {
                //获取相机的天空渲染器
                var skyRenderer = camera.skyRenderer;
                //创建天空盒的mesh
                skyRenderer.mesh = SkyDome.instance;
                // 设置曝光值
                var exposureNumber = 1.0;
                mat.exposure = exposureNumber;
                //设置天空盒材质
                skyRenderer.material = mat;
            }));
        });
    }
}
