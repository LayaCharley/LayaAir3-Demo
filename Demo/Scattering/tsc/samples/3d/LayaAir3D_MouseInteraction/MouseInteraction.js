import { Laya } from "Laya";
import { Script } from "laya/components/Script";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshFilter } from "laya/d3/core/MeshFilter";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { Ray } from "laya/d3/math/Ray";
import { HitResult } from "laya/d3/physics/HitResult";
import { PhysicsCollider } from "laya/d3/physics/PhysicsCollider";
import { MeshColliderShape } from "laya/d3/physics/shape/MeshColliderShape";
import { Stage } from "laya/display/Stage";
import { Text } from "laya/display/Text";
import { Color } from "laya/maths/Color";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector2 } from "laya/maths/Vector2";
import { Vector3 } from "laya/maths/Vector3";
import { Loader } from "laya/net/Loader";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Event } from "laya/events/Event";
/**
 * ...
 * @author ...
 */
export class MouseInteraction {
    constructor() {
        this._outHitResult = new HitResult();
        this.posX = 0.0;
        this.posY = 0.0;
        this.point = new Vector2();
        this.text = new Text();
        this.tmpVector = new Vector3(0, 0, 0);
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //创建场景
            this._scene = Laya.stage.addChild(new Scene3D());
            //添加相机
            this._camera = (this._scene.addChild(new Camera(0, 0.1, 100)));
            this._camera.transform.translate(new Vector3(0, 0.7, 5));
            this._camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            this._camera.addComponent(CameraMoveScript);
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
        //指定精灵的图层
        grid.layer = 10;
        //加载静态小猴子
        var staticLayaMonkey = this._scene.addChild(new MeshSprite3D(Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm")));
        //设置材质
        staticLayaMonkey.meshRenderer.material = Loader.getRes("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/Materials/T_Diffuse.lmat");
        //设置位置
        staticLayaMonkey.transform.position = new Vector3(0, 0, 0.5);
        //设置缩放
        staticLayaMonkey.transform.localScale = new Vector3(0.3, 0.3, 0.3);
        //设置旋转
        staticLayaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
        //克隆sprite3d
        this.tmpVector.setValue(0.0, 0, 0.5);
        var layaMonkey_clone1 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this.tmpVector);
        var layaMonkey_clone2 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this.tmpVector);
        var layaMonkey_clone3 = Sprite3D.instantiate(staticLayaMonkey, this._scene, false, this.tmpVector);
        //设置精灵名字
        staticLayaMonkey.name = "大熊";
        layaMonkey_clone1.name = "二熊";
        layaMonkey_clone2.name = "三熊";
        layaMonkey_clone3.name = "小小熊";
        //平移
        this.tmpVector.setValue(1.5, 0, 0.0);
        layaMonkey_clone1.transform.translate(this.tmpVector);
        this.tmpVector.setValue(-1.5, 0, 0.0);
        layaMonkey_clone2.transform.translate(this.tmpVector);
        this.tmpVector.setValue(2.5, 0, 0.0);
        layaMonkey_clone3.transform.translate(this.tmpVector);
        //旋转
        this.tmpVector.setValue(0, 60, 0);
        layaMonkey_clone2.transform.rotate(this.tmpVector, false, false);
        //缩放
        this.tmpVector.setValue(0.1, 0.1, 0.1);
        var scale = new Vector3(0.1, 0.1, 0.1);
        layaMonkey_clone3.transform.localScale = this.tmpVector;
        //给模型添加碰撞组件
        var meshCollider = staticLayaMonkey.addComponent(PhysicsCollider);
        //创建网格碰撞器
        var meshShape = new MeshColliderShape();
        //获取模型的mesh
        meshShape.mesh = staticLayaMonkey.meshFilter.sharedMesh;
        //设置模型的碰撞形状
        meshCollider.colliderShape = meshShape;
        var meshCollider1 = layaMonkey_clone1.addComponent(PhysicsCollider);
        var meshShape1 = new MeshColliderShape();
        meshShape1.mesh = layaMonkey_clone1.getComponent(MeshFilter).sharedMesh;
        meshCollider1.colliderShape = meshShape1;
        var meshCollider2 = layaMonkey_clone2.addComponent(PhysicsCollider);
        var meshShape2 = new MeshColliderShape();
        meshShape2.mesh = layaMonkey_clone2.getComponent(MeshFilter).sharedMesh;
        meshCollider2.colliderShape = meshShape2;
        var meshCollider3 = layaMonkey_clone3.addComponent(PhysicsCollider);
        var meshShape3 = new MeshColliderShape();
        meshShape3.mesh = layaMonkey_clone3.getComponent(MeshFilter).sharedMesh;
        meshCollider3.colliderShape = meshShape3;
        //设置文本显示框位置
        this.text.x = Laya.stage.width / 2 - 50;
        this.text.y = 50;
        //射线初始化（必须初始化）
        this._ray = new Ray(new Vector3(0, 0, 0), new Vector3(0, 0, 0));
        //添加鼠标事件
        this.addMouseEvent();
        //显示文本显示框
        this.text.name = "text";
        this.text.overflow = Text.HIDDEN;
        this.text.color = "#FFFFFF";
        this.text.font = "Impact";
        this.text.fontSize = 20;
        this.text.x = Laya.stage.width / 2;
        Laya.stage.addChild(this.text);
        staticLayaMonkey.addComponent(SceneScript);
        layaMonkey_clone1.addComponent(SceneScript);
        layaMonkey_clone2.addComponent(SceneScript);
        layaMonkey_clone3.addComponent(SceneScript);
    }
    addMouseEvent() {
        //鼠标事件监听
        Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
    }
    onMouseDown() {
        this.posX = this.point.x = Laya.stage.mouseX;
        this.posY = this.point.y = Laya.stage.mouseY;
        //产生射线
        this._camera.viewportPointToRay(this.point, this._ray);
        //拿到射线碰撞的物体
        this._scene.physicsSimulation.rayCast(this._ray, this._outHitResult);
        //如果碰撞到物体
        if (this._outHitResult.succeeded) {
            //删除碰撞到的物体
            this.text.text = "碰撞到了" + this._outHitResult.collider.owner.name;
            console.log("碰撞到物体！！");
        }
    }
}
class SceneScript extends Script {
    constructor() {
        super();
        this._albedoColor = new Color(0.0, 0.0, 0.0, 1.0);
    }
    /**
     * 覆写3D对象组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
     */
    onAwake() {
        this.meshSprite = this.owner;
        this.text = Laya.stage.getChildByName("text");
    }
    /**
     * 覆写组件更新方法（相当于帧循环）
     */
    onUpdate() {
    }
    //物体必须拥有碰撞组件（Collider）
    //当被鼠标点击
    onMouseDown() {
        this.text.text = "碰撞到了" + this.owner.name;
        //从父容器销毁我自己
        //box.removeSelf();
    }
    //当产生碰撞
    onCollisionEnter(collision) {
        this.meshSprite.meshRenderer.sharedMaterial.albedoColor = this._albedoColor;
        // box.removeSelf();
    }
}
