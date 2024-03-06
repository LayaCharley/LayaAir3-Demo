import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { PixelLineSprite3D } from "laya/d3/core/pixelLine/PixelLineSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Tool } from "../common/Tool";
export class PixelLineSprite3DDemo {
    constructor() {
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            var scene = Laya.stage.addChild(new Scene3D());
            var camera = scene.addChild(new Camera(0, 0.1, 100));
            camera.transform.translate(new Vector3(0, 2, 5));
            camera.transform.rotate(new Vector3(-15, 0, 0), true, false);
            camera.addComponent(CameraMoveScript);
            camera.clearColor = new Color(0.2, 0.2, 0.2, 1.0);
            var directionLight = scene.addChild(new DirectionLight());
            //设置平行光的方向
            var mat = directionLight.transform.worldMatrix;
            mat.setForward(new Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
            this.sprite3D = scene.addChild(new Sprite3D());
            this.lineSprite3D = scene.addChild(new Sprite3D());
            //球体
            var sphere = this.sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.25, 20, 20)));
            sphere.transform.position = new Vector3(0.0, 0.75, 2);
            var sphereLineSprite3D = this.lineSprite3D.addChild(new PixelLineSprite3D(3500));
            Tool.linearModel(sphere, sphereLineSprite3D, Color.GREEN);
            this.sprite3D.active = false;
            ;
            this.lineSprite3D.active = true;
        });
    }
}
