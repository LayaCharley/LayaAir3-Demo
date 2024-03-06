import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { ChinarMirrorPlane } from "../common/ChinarMirrorPlane";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { VideoTexture } from "laya/media/VideoTexture";
import { Event } from "laya/events/Event";
export class VideoPlayIn3DWorld {
    constructor() {
        this.isoneVideo = false;
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //加载场景
            Scene3D.load("res/threeDimen/moveClipSample/moveclip/Conventional/moveclip.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                //获取场景中的相机
                var camera = scene.getChildByName("Main Camera");
                camera.enableHDR = false;
                camera.addComponent(CameraMoveScript);
                var mirrorFloor = camera.addComponent(ChinarMirrorPlane);
                mirrorFloor.onlyMainCamera = camera;
                mirrorFloor.mirrorPlane = scene.getChildByName("reflectionPlan");
                //camera.active = false;    
                //增加视频
                this.videoPlane = scene.getChildByName("moveclip");
                Laya.stage.on(Event.MOUSE_DOWN, this, this.createVideo, ["res/av/mov_bbb.mp4"]);
                // this.createVideo("res/av/mov_bbb.mp4");
            }));
        });
    }
    createVideo(url) {
        if (!this.isoneVideo) {
            var videoTexture = new VideoTexture();
            videoTexture.source = url;
            videoTexture.play();
            videoTexture.loop = true;
            let mat = new UnlitMaterial();
            mat.albedoTexture = videoTexture;
            this.videoPlane.meshRenderer.sharedMaterial = mat;
            this.isoneVideo = true;
        }
    }
}
