import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { PointLight } from "laya/d3/core/light/PointLight";
import { SpotLight } from "laya/d3/core/light/SpotLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Script } from "laya/components/Script";
import { Vector3 } from "laya/maths/Vector3";
class LightMoveScript extends Script {
    constructor() {
        super(...arguments);
        this.forward = new Vector3();
        this.lights = [];
        this.offsets = [];
        this.moveRanges = [];
    }
    onUpdate() {
        var seed = Laya.timer.currTimer * 0.002;
        for (var i = 0, n = this.lights.length; i < n; i++) {
            var transform = this.lights[i].transform;
            var pos = transform.localPosition;
            var off = this.offsets[i];
            var ran = this.moveRanges[i];
            pos.x = off.x + Math.sin(seed) * ran.x;
            pos.y = off.y + Math.sin(seed) * ran.y;
            pos.z = off.z + Math.sin(seed) * ran.z;
            transform.localPosition = pos;
        }
    }
}
export class MultiLight {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            Scene3D.load("res/threeDimen/scene/MultiLightScene/InventoryScene_Forest.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                var camera = scene.getChildByName("Main Camera");
                camera.addComponent(CameraMoveScript);
                camera.transform.localPosition = new Vector3(8.937199060699333, 61.364798067809126, -66.77836086472654);
                var moveScript = camera.addComponent(LightMoveScript);
                var moverLights = moveScript.lights;
                var offsets = moveScript.offsets;
                var moveRanges = moveScript.moveRanges;
                moverLights.length = 15;
                for (var i = 0; i < 15; i++) {
                    var pointLight = scene.addChild(new PointLight());
                    pointLight.range = 2.0 + Math.random() * 8.0;
                    pointLight.color.setValue(Math.random(), Math.random(), Math.random(), 1);
                    pointLight.intensity = 6.0 + Math.random() * 8;
                    moverLights[i] = pointLight;
                    offsets[i] = new Vector3((Math.random() - 0.5) * 10, pointLight.range * 0.75, (Math.random() - 0.5) * 10);
                    moveRanges[i] = new Vector3((Math.random() - 0.5) * 40, 0, (Math.random() - 0.5) * 40);
                }
                var spotLight = scene.addChild(new SpotLight());
                spotLight.transform.localPosition = new Vector3(0.0, 9.0, -35.0);
                spotLight.transform.localRotationEuler = new Vector3(-15.0, 180.0, 0.0);
                spotLight.color.setValue(Math.random(), Math.random(), Math.random(), 1);
                spotLight.range = 50;
                spotLight.intensity = 15;
                spotLight.spotAngle = 60;
            }));
        });
    }
}
