import { BaseScript } from "../../BaseScript";
import { CustomMaterial } from "../Shader/customMaterials/CustomMaterial";
import { GlowingEdgeMaterial } from "../Shader/customMaterials/GlowingEdgeMaterial";

import Scene3D = Laya.Scene3D;
import Camera = Laya.Camera;
import DirectionLight = Laya.DirectionLight;
import Material = Laya.Material;
import SkyRenderer = Laya.SkyRenderer;
import Sprite3D = Laya.Sprite3D;
import MeshSprite3D = Laya.MeshSprite3D;
import Vector3 = Laya.Vector3;
import BlinnPhongMaterial = Laya.BlinnPhongMaterial;
import Animator = Laya.Animator;
import Mesh = Laya.Mesh;
import Texture2D = Laya.Texture2D;
import Quaternion = Laya.Quaternion;
import AnimationClip = Laya.AnimationClip;
import AnimatorState = Laya.AnimatorState;
import PrimitiveMesh = Laya.PrimitiveMesh;
import SkyBoxMaterial = Laya.SkyBoxMaterial;
import CameraClearFlags = Laya.CameraClearFlags;
import SkyBox = Laya.SkyBox;
import PBRStandardMaterial = Laya.PBRStandardMaterial;

import Handler = Laya.Handler;

const { regClass, property } = Laya;

@regClass()
export class PostProcessDoF extends BaseScript {

    @property()
    private camera: Laya.Camera;  
    @property()
    private scene: Scene3D;
    @property()
    private directionLight: DirectionLight;

    constructor() {
        super();
        
    }

    /**
     * 组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
     */
    onAwake(): void {
        super.base(this.camera);
        
	}
}