var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Laya } from "Laya";
import { WebXRExperienceHelper, WebXRCameraInfo } from "laya/d3/WebXR/core/WebXRExperienceHelper";
import { Stage } from "laya/display/Stage";
import { Loader } from "laya/net/Loader";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Event } from "laya/events/Event";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
export class WebXRStart {
    constructor() {
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Stat.show();
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            this.PreloadingRes();
        });
    }
    //批量预加载方式
    PreloadingRes() {
        //预加载所有资源
        var resource = ["res/VRscene/Conventional/SampleScene.ls",
            "res/OculusController/controller-left.gltf",
            "res/OculusController/controller.gltf"];
        Laya.loader.load(resource, Handler.create(this, this.onPreLoadFinish));
    }
    onPreLoadFinish() {
        let scene = Loader.createNodes("res/VRscene/Conventional/SampleScene.ls");
        Laya.stage.addChild(scene);
        this.scene = scene;
        //获取场景中的相机
        this.camera = scene.getChildByName("Main Camera");
        //旋转摄像机角度
        this.camera.transform.rotate(new Vector3(0, 0, 0), true, false);
        //设置摄像机视野范围（角度）
        this.camera.fieldOfView = 60;
        //设置背景颜色
        this.camera.clearColor = new Color(0.7, 0.8, 0.9, 0);
        this.camera.nearPlane = 0.01;
        //加入摄像机移动控制脚本
        this.camera.addComponent(CameraMoveScript);
        this.loadUI();
    }
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            return __awaiter(this, void 0, void 0, function* () {
                this.changeActionButton = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "正常模式"));
                this.changeActionButton.size(160, 40);
                this.changeActionButton.active = yield WebXRExperienceHelper.supportXR("immersive-vr");
                this.changeActionButton.labelBold = true;
                this.changeActionButton.labelSize = 30;
                this.changeActionButton.sizeGrid = "4,4,4,4";
                this.changeActionButton.scale(Browser.pixelRatio, Browser.pixelRatio);
                this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Browser.pixelRatio / 2, Laya.stage.height - 100 * Browser.pixelRatio);
                this.changeActionButton.on(Event.CLICK, this, this.stypeFun);
            });
        }));
    }
    stypeFun() {
        this.initXR();
    }
    initXR() {
        return __awaiter(this, void 0, void 0, function* () {
            let caInfo = new WebXRCameraInfo();
            caInfo.depthFar = this.camera.farPlane;
            caInfo.depthNear = this.camera.nearPlane;
            let webXRSessionManager = yield WebXRExperienceHelper.enterXRAsync("immersive-vr", "local", caInfo);
            let webXRCameraManager = WebXRExperienceHelper.setWebXRCamera(this.camera, webXRSessionManager);
            let WebXRInput = WebXRExperienceHelper.setWebXRInput(webXRSessionManager, webXRCameraManager);
        });
    }
}
