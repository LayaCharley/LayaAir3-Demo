import { BaseScript } from "../../BaseScript";

import Scene3D = Laya.Scene3D;
import Camera = Laya.Camera;
import DirectionLight = Laya.DirectionLight;
import SphereColliderShape = Laya.SphereColliderShape;
import MeshSprite3D = Laya.MeshSprite3D;
import Vector3 = Laya.Vector3;
import BlinnPhongMaterial = Laya.BlinnPhongMaterial;
import CapsuleColliderShape = Laya.CapsuleColliderShape;
import CylinderColliderShape = Laya.CylinderColliderShape;
import Texture2D = Laya.Texture2D;
import Rigidbody3D = Laya.Rigidbody3D;
import ConeColliderShape = Laya.ConeColliderShape;
import Transform3D = Laya.Transform3D;
import PrimitiveMesh = Laya.PrimitiveMesh;
import BoxColliderShape = Laya.BoxColliderShape;
import PhysicsCollider = Laya.PhysicsCollider;
import Vector4 = Laya.Vector4;
import Matrix4x4 = Laya.Matrix4x4;

const { regClass, property } = Laya;

@regClass()
export class PhysicsWorld_BaseCollider extends BaseScript {

    @property(Laya.Camera)
    private camera: Camera;  
    @property(Laya.Scene3D)
    private scene: Scene3D;
    @property(Laya.Sprite3D)
    private directionLight: Laya.Sprite3D;

    constructor() {
        super();
    }

    onAwake(): void {

        super.base(this.camera);

        this.camera.transform.position = new Vector3(0, 6, 9.5);
		this.camera.transform.rotate(new Vector3(-15, 0, 0), true, false);

        //方向光
		this.directionLight.getComponent(Laya.DirectionLightCom).color.setValue(0.6, 0.6, 0.6, 1);
		this.directionLight.transform.rotate(new Vector3(-3.14 / 3, 0, 0));

        //设置平行光的方向
        var mat: Matrix4x4 = this.directionLight.transform.worldMatrix;
        mat.setForward(new Vector3(-1.0, -1.0, -1.0));
        this.directionLight.transform.worldMatrix = mat;

		var resource:any[] = [

            "resources/res/threeDimen/Physics/rocks.jpg",
            "resources/res/threeDimen/Physics/plywood.jpg",
			"resources/res/threeDimen/Physics/wood.jpg",
			"resources/res/threeDimen/Physics/steel2.jpg",
			"resources/res/threeDimen/Physics/steel.jpg"
        ];

        Laya.loader.load(resource).then( (res:any[] )=>{

			//初始化资源
            this.onComplete(res);
        });

	}

	onComplete(res:any[]):void{

        //平面
        var plane:Laya.MeshSprite3D = this.scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createPlane(20, 20, 10, 10))) as Laya.MeshSprite3D;
        var planeMat: BlinnPhongMaterial = new BlinnPhongMaterial();
        planeMat.albedoTexture = res[2];
        //设置纹理平铺和偏移
        planeMat.tilingOffset = new Vector4(2, 2, 0, 0);
        //设置材质
        plane.meshRenderer.material = planeMat;

        //平面添加物理碰撞体组件
        var planeStaticCollider: PhysicsCollider = plane.addComponent(PhysicsCollider);
        //创建盒子形状碰撞器
        var planeShape: BoxColliderShape = new BoxColliderShape(10, 0, 10);
        //物理碰撞体设置形状
        planeStaticCollider.colliderShape = planeShape;
        //物理碰撞体设置摩擦力
        planeStaticCollider.friction = 2;
        //物理碰撞体设置弹力
        planeStaticCollider.restitution = 0.3;

		this.addBox();
        //随机生成精灵
        this.randomAddPhysicsSprite();
	}
    
	randomAddPhysicsSprite(): void {
		Laya.timer.loop(1000, this, ()=> {
			var random: number = Math.floor(Math.random() * 5) % 5;
			switch (random) {
				case 0:
					this.addBox();
					break;
				case 1:
					this.addSphere();
					break;
				case 2:
					this.addCapsule();
					break;
				case 3:
					this.addCone();
					break;
				case 4:
					this.addCylinder();
					break;
				default:
					break;
			}
		});
	}

	addBox(): void {

		//随机生成坐标值
		var sX: number = Math.random() * 0.75 + 0.25;
		var sY: number = Math.random() * 0.75 + 0.25;
		var sZ: number = Math.random() * 0.75 + 0.25;
		//创建盒型MeshSprite3D
		var box: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createBox(sX, sY, sZ))));
		//设置材质
		box.meshRenderer.material = new BlinnPhongMaterial();
		Laya.loader.load("resources/res/threeDimen/Physics/rocks.jpg").then((res)=>{
			(box.meshRenderer.material as BlinnPhongMaterial).albedoTexture = res as Texture2D;
		});
		var transform: Transform3D = box.transform;
		var pos: Vector3 = transform.position;
		pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
		transform.position = pos;
		//设置欧拉角
		var rotationEuler: Vector3 = transform.rotationEuler;
		rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
		transform.rotationEuler = rotationEuler;
		//创建刚体碰撞器
		var rigidBody: Rigidbody3D = box.addComponent(Rigidbody3D);
		//创建盒子形状碰撞器
		var boxShape: BoxColliderShape = new BoxColliderShape(sX, sY, sZ);
		//设置盒子的碰撞形状
		rigidBody.colliderShape = boxShape;
		//设置刚体的质量
		rigidBody.mass = 10;
	}

	addSphere(): void {

		//随机生成半径大小
		var radius: number = Math.random() * 0.2 + 0.2;
		//创建球型MeshSprite3D
		var sphere: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(radius))));
		//设置材质
		sphere.meshRenderer.material = new BlinnPhongMaterial();
		Laya.loader.load("resources/res/threeDimen/Physics/plywood.jpg").then((res)=>{
			(sphere.meshRenderer.material as BlinnPhongMaterial).albedoTexture = res as Texture2D;
		});		
		var pos: Vector3 = sphere.transform.position;
		pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
		sphere.transform.position = pos;

		//添加刚体碰撞器
		var rigidBody: Rigidbody3D = sphere.addComponent(Rigidbody3D);
		//创建球型碰撞器
		var sphereShape: SphereColliderShape = new SphereColliderShape(radius);
		//设置刚体碰撞器的形状
		rigidBody.colliderShape = sphereShape;
		//设置刚体的质量
		rigidBody.mass = 10;
	}

	addCapsule(): void {

		var raidius: number = Math.random() * 0.2 + 0.2;
		var height: number = Math.random() * 0.5 + 0.8;
		//创建胶囊MeshSprite3D
		var capsule: MeshSprite3D = (<MeshSprite3D>this.scene.addChild(new MeshSprite3D(PrimitiveMesh.createCapsule(raidius, height))));
		//设置材质
		capsule.meshRenderer.material = new BlinnPhongMaterial();
		Laya.loader.load("resources/res/threeDimen/Physics/wood.jpg").then((res)=>{
			(capsule.meshRenderer.material as BlinnPhongMaterial).albedoTexture = res as Texture2D;
		});	
		var transform: Transform3D = capsule.transform;
		var pos: Vector3 = transform.position;
		pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
		transform.position = pos;
		//设置胶囊MeshSprite3D的欧拉角
		var rotationEuler: Vector3 = transform.rotationEuler;
		rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
		transform.rotationEuler = rotationEuler;

		//创建刚体碰撞器
		var rigidBody: Rigidbody3D = capsule.addComponent(Rigidbody3D);
		//创建球型碰撞器
		var sphereShape: CapsuleColliderShape = new CapsuleColliderShape(raidius, height);
		//设置刚体碰撞器的形状
		rigidBody.colliderShape = sphereShape;
		//设置刚体碰撞器的质量
		rigidBody.mass = 10;
	}

	addCone(): void {

		var raidius: number = Math.random() * 0.2 + 0.2;
		var height: number = Math.random() * 0.5 + 0.8;
		//创建圆锥MeshSprite3D
		var cone: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCone(raidius, height));
		this.scene.addChild(cone);
		//设置材质
		cone.meshRenderer.material = new BlinnPhongMaterial();
		Laya.loader.load("resources/res/threeDimen/Physics/steel2.jpg").then((res)=>{
			(cone.meshRenderer.material as BlinnPhongMaterial).albedoTexture = res as Texture2D;
		});	
		//设置位置
		var pos: Vector3 = cone.transform.position;
		pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
		cone.transform.position = pos;
		//创建刚体碰撞器
		var rigidBody: Rigidbody3D = cone.addComponent(Rigidbody3D);
		//创建球型碰撞器
		var coneShape: ConeColliderShape = new ConeColliderShape(raidius, height);
		//设置刚体碰撞器的形状
		rigidBody.colliderShape = coneShape;
		//设置刚体碰撞器的质量
		rigidBody.mass = 10;
	}

	addCylinder(): void {

		var raidius: number = Math.random() * 0.2 + 0.2;
		var height: number = Math.random() * 0.5 + 0.8;
		//创建圆锥MeshSprite3D
		var cylinder: MeshSprite3D = new MeshSprite3D(PrimitiveMesh.createCylinder(raidius, height));
		this.scene.addChild(cylinder);
		//设置材质
		cylinder.meshRenderer.material = new BlinnPhongMaterial();
		Laya.loader.load("resources/res/threeDimen/Physics/steel.jpg").then((res)=>{
			(cylinder.meshRenderer.material as BlinnPhongMaterial).albedoTexture = res as Texture2D;
		});
		//设置位置
		var transform: Transform3D = cylinder.transform;
		var pos: Vector3 = transform.position;
		pos.setValue(Math.random() * 4 - 2, 10, Math.random() * 4 - 2);
		transform.position = pos;
		//设置圆柱MeshSprite3D的欧拉角
		var rotationEuler: Vector3 = transform.rotationEuler;
		rotationEuler.setValue(Math.random() * 360, Math.random() * 360, Math.random() * 360);
		transform.rotationEuler = rotationEuler;
		//创建刚体碰撞器
		var rigidBody: Rigidbody3D = cylinder.addComponent(Rigidbody3D);
		//创建球型碰撞器
		var cylinderShape: CylinderColliderShape = new CylinderColliderShape(raidius, height);
		//设置刚体碰撞器的形状
		rigidBody.colliderShape = cylinderShape;
		//设置刚体碰撞器的质量
		rigidBody.mass = 10;
	}
 
}