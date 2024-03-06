import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Loader } from "laya/net/Loader";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
/**
 * ...
 * @author ...
 */
export class TransformDemo {
    constructor() {
        this.tmpVector = new Vector3(0, 0, 0);
        this._position = new Vector3(0, 0, 0);
        this._position1 = new Vector3(0, 0, 0);
        this._rotate = new Vector3(0, 1, 0);
        this._rotate1 = new Vector3(0, 0, 0);
        this._scale = new Vector3();
        this.scaleDelta = 0;
        this.scaleValue = 0;
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //创建场景
            this._scene = Laya.stage.addChild(new Scene3D());
            //添加相机
            var camera = (this._scene.addChild(new Camera(0, 0.1, 100)));
            camera.transform.translate(new Vector3(0, 2.0, 5));
            camera.transform.rotate(new Vector3(-30, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //添加光照
            var directionLight = this._scene.addChild(new DirectionLight());
            directionLight.color = new Color(1, 1, 1, 1);
            directionLight.transform.rotate(new Vector3(-3.14 / 3, 0, 0));
            //批量预加载资源
            Laya.loader.load(["res/threeDimen/staticModel/grid/plane.lh", "res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh"], Handler.create(this, this.onComplete));
        });
    }
    onComplete() {
        //加载地面
        var grid = this._scene.addChild(Loader.createNodes("res/threeDimen/staticModel/grid/plane.lh"));
        //加载静态小猴子
        var staticLayaMonkey = Loader.createNodes("res/threeDimen/skinModel/LayaMonkey/LayaMonkey.lh");
        //设置缩放
        var staticMonkeyTransform = staticLayaMonkey.transform;
        var staticMonkeyScale = staticMonkeyTransform.localScale;
        staticMonkeyScale.setValue(1.5, 1.5, 1.5);
        staticMonkeyTransform.localScale = staticMonkeyScale;
        //克隆sprite3d
        this.layaMonkey_clone1 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this._position1);
        this.layaMonkey_clone2 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this._position1);
        this.layaMonkey_clone3 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this._position1);
        //得到三个Transform
        this.clone1Transform = this.layaMonkey_clone1.transform;
        this.clone2Transform = this.layaMonkey_clone2.transform;
        this.clone3Transform = this.layaMonkey_clone3.transform;
        //平移
        this._position1.setValue(0.0, 0, 0.0);
        this.clone1Transform.translate(this._position1);
        this._position1.setValue(-1.5, 0, 0.0);
        this.clone2Transform.translate(this._position1);
        this._position1.setValue(1.0, 0, 0.0);
        this.clone3Transform.translate(this._position1);
        //旋转
        this._rotate1.setValue(0, 60, 0);
        this.clone2Transform.rotate(this._rotate1, false, false);
        //缩放
        var scale = this.clone3Transform.localScale;
        scale.setValue(1.2, 1.2, 1.2);
        this.layaMonkey_clone3.transform.localScale = scale;
        staticLayaMonkey.destroy();
        //设置定时器执行,定时重复执行(基于帧率)
        Laya.timer.frameLoop(1, this, this.animate);
    }
    animate() {
        this.scaleValue = Math.sin(this.scaleDelta += 0.1);
        this._position.y = Math.max(0, this.scaleValue / 2);
        this.clone1Transform.position = this._position;
        this.clone2Transform.rotate(this._rotate, false, false);
        this._scale.x = this._scale.y = this._scale.z = Math.abs(this.scaleValue);
        this.clone3Transform.localScale = this._scale;
    }
}
