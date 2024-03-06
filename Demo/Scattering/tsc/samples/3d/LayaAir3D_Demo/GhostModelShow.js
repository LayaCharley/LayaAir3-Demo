import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ghost Model show,this model use PBR material.
 */
export class GhostModelShow {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            Scene3D.load("res/threeDimen/scene/PBRScene/Demo.ls", Handler.create(null, function (scene) {
                Laya.stage.addChild(scene);
                var camera = scene.getChildByName("Camera");
                camera.addComponent(CameraMoveScript);
            }));
        });
    }
}
