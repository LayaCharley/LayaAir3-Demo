import { Laya } from "Laya";
import { Stage } from "laya/display/Stage";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../../3d/common/CameraMoveScript";
import { PostProcess } from "laya/d3/component/PostProcess";
import { DepthTextureMode } from "laya/d3/depthMap/DepthPass";
import { Handler } from "laya/utils/Handler";
import { Loader } from "laya/net/Loader";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { GaussianDoF } from "laya/d3/core/render/PostEffect/GaussianDoF";
export class PostProcessDoF {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            Shader3D.debugMode = true;
            Laya.loader.load("res/threeDimen/LayaScene_zhuandibanben/Conventional/zhuandibanben.ls", Handler.create(this, this.onComplate));
        });
    }
    onComplate() {
        let scene = this.scene = Loader.createNodes("res/threeDimen/LayaScene_zhuandibanben/Conventional/zhuandibanben.ls");
        Laya.stage.addChild(scene);
        let camera = this.camera = scene.getChildByName("MainCamera");
        camera.addComponent(CameraMoveScript);
        let mainCamera = scene.getChildByName("BlurCamera");
        mainCamera.removeSelf();
        camera.depthTextureMode |= DepthTextureMode.Depth;
        let postProcess = new PostProcess();
        camera.postProcess = postProcess;
        let gaussianDoF = new GaussianDoF();
        console.log(gaussianDoF);
        postProcess.addEffect(gaussianDoF);
        gaussianDoF.farStart = 1;
        gaussianDoF.farEnd = 5;
        gaussianDoF.maxRadius = 1.0;
    }
}
