import { Laya } from "Laya";
import { Stat } from "laya/utils/Stat";
import { Stage } from "laya/display/Stage";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Handler } from "laya/utils/Handler";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { SpotLight } from "laya/d3/core/light/SpotLight";
import { ShadowMode } from "laya/d3/core/light/ShadowMode";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
export class SpotLightShadowMap {
    constructor() {
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Shader3D.debugMode = true;
            Scene3D.load("res/threeDimen/testNewFunction/LayaScene_depthScene/Conventional/depthScene.ls", Handler.create(this, function (scene) {
                this.demoScene = Laya.stage.addChild(scene);
                this.camera = scene.getChildByName("Camera");
                this.camera.addComponent(CameraMoveScript);
                this.camera.active = true;
                this.receaveRealShadow(this.demoScene);
            }));
        });
    }
    receaveRealShadow(scene3d) {
        var childLength = scene3d.numChildren;
        for (var i = 0; i < childLength; i++) {
            var childSprite = scene3d.getChildAt(i);
            if (childSprite instanceof MeshSprite3D) {
                childSprite.meshRenderer.receiveShadow = true;
                childSprite.meshRenderer.castShadow = true;
            }
            else if (childSprite instanceof SpotLight) {
                childSprite.shadowMode = ShadowMode.Hard;
                // Set shadow max distance from camera.
                childSprite.shadowDistance = 3;
                // Set shadow resolution.
                childSprite.shadowResolution = 512;
                // set shadow Bias
                childSprite.shadowDepthBias = 1.0;
            }
        }
        return;
    }
}
