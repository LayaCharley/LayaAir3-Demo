import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Vector4 } from "laya/maths/Vector4";
import { Loader } from "laya/net/Loader";
import { Image } from "laya/ui/Image";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
export class Secne3DPlayer2D {
    constructor() {
        this._position = new Vector3();
        this._outPos = new Vector4();
        this._translate = new Vector3(0, 0.35, 1);
        this._rotation = new Vector3(-3.14 / 3, 0, 0);
        this.scaleDelta = 0;
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //创建场景
            this._scene = Laya.stage.addChild(new Scene3D());
            //创建相机
            this._camera = this._scene.addChild(new Camera(0, 0.1, 100));
            this._camera.transform.translate(this._translate);
            this._camera.transform.rotate(this._rotation, true, false);
            //创建平行光
            var directionLight = this._scene.addChild(new DirectionLight());
            directionLight.color = new Color(1, 1, 1, 1);
            directionLight.transform.rotate(this._rotation);
            //加载精灵
            Laya.loader.load("res/threeDimen/staticModel/grid/plane.lh", Handler.create(this, this.onComplete));
        });
    }
    onComplete() {
        //加载三维地面
        var grid = this._scene.addChild(Loader.createNodes("res/threeDimen/staticModel/grid/plane.lh"));
        //加载二维猴子
        this._layaMonkey2D = Laya.stage.addChild(new Image("res/threeDimen/monkey.png"));
        //开启定时器循环
        Laya.timer.frameLoop(1, this, this.animate);
    }
    animate() {
        //变换位置
        this._position.x = Math.sin(this.scaleDelta += 0.01);
        //计算位置
        var outPos = this._outPos;
        this._camera.viewport.project(this._position, this._camera.projectionViewMatrix, outPos);
        this._layaMonkey2D.pos(outPos.x / Laya.stage.clientScaleX, outPos.y / Laya.stage.clientScaleY);
    }
}
