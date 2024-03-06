import { Laya } from "Laya";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Handler } from "laya/utils/Handler";
import { Stage } from "laya/display/Stage";
import { Stat } from "laya/utils/Stat";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Rigidbody3D } from "laya/d3/physics/Rigidbody3D";
import { BoxColliderShape } from "laya/d3/physics/shape/BoxColliderShape";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { Texture2D } from "laya/resource/Texture2D";
import { SphereColliderShape } from "laya/d3/physics/shape/SphereColliderShape";
import { ConfigurableConstraint } from "laya/d3/physics/constraints/ConfigurableConstraint";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
export class PhysicsWorld_ConfigurableJoint {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            Shader3D.debugMode = true;
            this.scene = Laya.stage.addChild(new Scene3D());
            this.camera = this.scene.addChild(new Camera(0, 0.1, 100));
            this.camera.transform.translate(new Vector3(0, 3, 30));
            this.camera.addComponent(CameraMoveScript);
            var directionLight = this.scene.addChild(new DirectionLight());
            directionLight.color = new Color(1, 1, 1, 1);
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Vector3(-1.0, -1.0, 1.0));
            directionLight.transform.worldMatrix = mat;
            //平面
            var plane = this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(40, 40, 40, 40)));
            plane.transform.position = new Vector3(0, -2.0, 0);
            var planeMat = new BlinnPhongMaterial();
            Texture2D.load("res/threeDimen/Physics/grass.png", Handler.create(this, function (tex) {
                planeMat.albedoTexture = tex;
            }));
            //设置纹理平铺和偏移
            var tilingOffset = planeMat.tilingOffset;
            tilingOffset.setValue(5, 5, 0, 0);
            planeMat.tilingOffset = tilingOffset;
            //设置材质
            plane.meshRenderer.material = planeMat;
            this.springTest();
            this.bounceTest();
            // this.bounceTestY();
            this.alongZAixs();
            //this.alongXAixs();
            //this.alongYAixs();
            this.freeRotate();
            this.rotateAngularX();
            // this.rotateAngularZ();
            // this.rotateAngularY();
            this.rotateAngularPoint();
        });
    }
    springTest() {
        var boxA = this.addRigidBodySphere(new Vector3(7, 3, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        boxARigid.overrideGravity = true;
        boxARigid.isKinematic = true;
        var boxB = this.addRigidBodyBox(new Vector3(10, 0, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -3, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minLinearLimit = new Vector3(-3, 0, 0);
        configurableJoint.maxLinearLimit = new Vector3(3, 0, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.linearLimitSpring = new Vector3(100, 0, 0);
        configurableJoint.linearDamp = new Vector3(0, 0, 0);
    }
    bounceTest() {
        var boxA = this.addRigidBodySphere(new Vector3(7, 3, 3), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(7, 0, 3), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -3, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minLinearLimit = new Vector3(-2, 0, 0);
        configurableJoint.maxLinearLimit = new Vector3(2, 0, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.linearBounce = new Vector3(0.5, 0, 0);
        boxBRigid.applyImpulse(new Vector3(100, 0, 0));
    }
    bounceTestY() {
        var boxA = this.addRigidBodySphere(new Vector3(0, 4, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(0, 2, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -2, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minLinearLimit = new Vector3(0, -2, 0);
        configurableJoint.maxLinearLimit = new Vector3(0, 10, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
    }
    rotateAngularX() {
        var boxA = this.addRigidBodySphere(new Vector3(-2, 3, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(-2, 1, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -2, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minAngularLimit = new Vector3(-2, 0, 0);
        configurableJoint.maxAngularLimit = new Vector3(2, 0, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        boxBRigid.angularVelocity = new Vector3(5, 0, 0);
    }
    rotateAngularZ() {
        var boxA = this.addRigidBodySphere(new Vector3(-7, 6, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(-7, 4, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -2, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minAngularLimit = new Vector3(0, 0, -1);
        configurableJoint.maxAngularLimit = new Vector3(0, 0, 1);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        boxBRigid.angularVelocity = new Vector3(0.0, 0, 0.5);
    }
    rotateAngularY() {
        var boxA = this.addRigidBodySphere(new Vector3(-5, 6, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(-5, 4, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -2, 0);
        configurableJoint.connectAnchor = new Vector3(0, 0, 0);
        configurableJoint.minAngularLimit = new Vector3(0, -1, 0);
        configurableJoint.maxAngularLimit = new Vector3(0, 1, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        boxBRigid.angularVelocity = new Vector3(0.0, 0.5, 0);
    }
    freeRotate() {
        var boxA = this.addRigidBodySphere(new Vector3(-6, 3, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(-6, 1, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, -1, 0);
        configurableJoint.connectAnchor = new Vector3(0, 1, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
        boxBRigid.angularVelocity = new Vector3(20, 2, 10);
    }
    rotateAngularPoint() {
        var boxA = this.addRigidBodySphere(new Vector3(0, 15, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(6, 15, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, 0, 0);
        configurableJoint.connectAnchor = new Vector3(-6, 0, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_FREE;
    }
    alongXAixs() {
        var boxA = this.addRigidBodySphere(new Vector3(0, 0, -4), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(5, 0, -4), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, 0, 0);
        configurableJoint.connectAnchor = new Vector3(-5, 0, 0);
        configurableJoint.minLinearLimit = new Vector3(-2, 0, 0);
        configurableJoint.maxLinearLimit = new Vector3(2, 0, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        boxBRigid.linearVelocity = new Vector3(1.0, 0.0, 0);
    }
    alongYAixs() {
        var boxA = this.addRigidBodySphere(new Vector3(0, 0, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(5, 0, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, 0, 0);
        configurableJoint.connectAnchor = new Vector3(-5, 0, 0);
        configurableJoint.minLinearLimit = new Vector3(0, -3, 0);
        configurableJoint.maxLinearLimit = new Vector3(0, 3, 0);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        boxBRigid.linearVelocity = new Vector3(0.0, 1.0, 0);
    }
    alongZAixs() {
        var boxA = this.addRigidBodySphere(new Vector3(2, 3, 0), 1);
        var boxARigid = boxA.getComponent(Rigidbody3D);
        var boxB = this.addRigidBodyBox(new Vector3(2, 0, 0), 1);
        boxB.meshRenderer.material.albedoColor = new Color(1, 0, 0, 1);
        var boxBRigid = boxB.getComponent(Rigidbody3D);
        var configurableJoint = boxA.addComponent(ConfigurableConstraint);
        configurableJoint.setConnectRigidBody(boxARigid, boxBRigid);
        configurableJoint.anchor = new Vector3(0, 0, 0);
        configurableJoint.connectAnchor = new Vector3(0, 3, 0);
        configurableJoint.minLinearLimit = new Vector3(0, 0, -4);
        configurableJoint.maxLinearLimit = new Vector3(0, 0, 4);
        configurableJoint.XMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.YMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.ZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LIMITED;
        configurableJoint.angularXMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularYMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        configurableJoint.angularZMotion = ConfigurableConstraint.CONFIG_MOTION_TYPE_LOCKED;
        boxBRigid.linearVelocity = new Vector3(0.0, 0.0, 4);
    }
    addRigidBodyBox(pos, scale) {
        //创建盒型MeshSprite3D
        var box = this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(scale, scale, scale)));
        box.transform.position = pos;
        //box.addComponent(TriggerCollisionScript);
        var mat = new BlinnPhongMaterial();
        box.meshRenderer.material = mat;
        //创建刚体碰撞器
        var rigidBody = box.addComponent(Rigidbody3D);
        //创建盒子形状碰撞器
        var boxShape = new BoxColliderShape(scale, scale, scale);
        //设置盒子的碰撞形状
        rigidBody.colliderShape = boxShape;
        //设置刚体的质量
        rigidBody.mass = 1;
        //物理碰撞体设置摩擦力
        rigidBody.friction = 0.5;
        //物理碰撞体设置弹力
        rigidBody.restitution = 10.0;
        return box;
    }
    addRigidBodySphere(pos, scale) {
        //创建盒型MeshSprite3D
        var sphere = this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.2)));
        sphere.transform.position = pos;
        var mat = new BlinnPhongMaterial();
        mat.albedoColor = new Color(0, 1, 0, 1);
        sphere.meshRenderer.material = mat;
        //创建刚体碰撞器
        var rigidBody = sphere.addComponent(Rigidbody3D);
        //创建盒子形状碰撞器
        var boxShape = new SphereColliderShape(0.2);
        //设置盒子的碰撞形状
        rigidBody.colliderShape = boxShape;
        //设置刚体的质量
        rigidBody.mass = 1;
        //物理碰撞体设置摩擦力
        rigidBody.friction = 0.5;
        //物理碰撞体设置弹力
        rigidBody.restitution = 0.0;
        rigidBody.isKinematic = true;
        return sphere;
    }
}
