import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Material } from "laya/d3/core/material/Material";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Mesh } from "laya/d3/resource/models/Mesh";
import { Stage } from "laya/display/Stage";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector3 } from "laya/maths/Vector3";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
/**
 * ...
 * @author
 */
export class BlinnPhongMaterialLoad {
    constructor() {
        this.rotation = new Vector3(0, 0.01, 0);
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            var scene = Laya.stage.addChild(new Scene3D());
            var camera = scene.addChild(new Camera(0, 0.1, 100));
            camera.transform.translate(new Vector3(0, 0.9, 1.5));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            var directionLight = scene.addChild(new DirectionLight());
            directionLight.color.setValue(0.6, 0.6, 0.6, 1);
            Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function (mesh) {
                var layaMonkey = scene.addChild(new MeshSprite3D(mesh));
                layaMonkey.transform.localScale = new Vector3(0.3, 0.3, 0.3);
                layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
                //加载材质
                Material.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/Materials/T_Diffuse.lmat", Handler.create(this, function (mat) {
                    layaMonkey.meshRenderer.material = mat;
                }));
                Laya.timer.frameLoop(1, this, function () {
                    layaMonkey.transform.rotate(this.rotation, false);
                });
            }));
        });
    }
}
