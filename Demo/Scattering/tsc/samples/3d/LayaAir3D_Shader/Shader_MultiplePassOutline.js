import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Mesh } from "laya/d3/resource/models/Mesh";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector3 } from "laya/maths/Vector3";
import { Texture2D } from "laya/resource/Texture2D";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { MultiplePassOutlineMaterial } from "./customMaterials/MultiplePassOutlineMaterial";
export class Shader_MultiplePassOutline {
    constructor() {
        this.rotation = new Vector3(0, 0.01, 0);
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //显示性能面板
            Stat.show();
            //初始化Shader
            MultiplePassOutlineMaterial.initShader();
            //创建场景
            var scene = Laya.stage.addChild(new Scene3D());
            //创建相机
            var camera = (scene.addChild(new Camera(0, 0.1, 1000)));
            camera.transform.translate(new Vector3(0, 0.85, 1.7));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            //创建平行光
            var directionLight = new DirectionLight();
            scene.addChild(directionLight);
            directionLight.color = new Color(1, 1, 1, 1);
            Mesh.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/LayaMonkey-LayaMonkey.lm", Handler.create(this, function (mesh) {
                var layaMonkey = scene.addChild(new MeshSprite3D(mesh));
                layaMonkey.transform.localScale = new Vector3(0.3, 0.3, 0.3);
                layaMonkey.transform.rotation = new Quaternion(0.7071068, 0, 0, -0.7071067);
                var customMaterial = new MultiplePassOutlineMaterial();
                //漫反射贴图
                Texture2D.load("res/threeDimen/skinModel/LayaMonkey/Assets/LayaMonkey/diffuse.png", Handler.create(this, function (texture) {
                    customMaterial.albedoTexture = texture;
                }));
                layaMonkey.meshRenderer.sharedMaterial = customMaterial;
                Laya.timer.frameLoop(1, this, function () {
                    layaMonkey.transform.rotate(this.rotation, false);
                });
            }));
        });
    }
}
