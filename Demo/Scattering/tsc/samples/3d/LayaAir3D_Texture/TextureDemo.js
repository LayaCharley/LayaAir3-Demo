import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { FilterMode } from "laya/RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "laya/RenderEngine/RenderEnum/WrapMode";
import { Texture2D } from "laya/resource/Texture2D";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
/**
 * ...
 * @author ...
 */
export class TextureDemo {
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
            //正方体
            var box = this.sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createBox(0.5, 0.5, 0.5)));
            box.transform.position = new Vector3(0.0, 1.0, 2.5);
            box.transform.rotate(new Vector3(0, 0, 0), false, false);
            var mat1 = new BlinnPhongMaterial();
            //漫反射贴图
            Texture2D.load("res/threeDimen/texture/layabox.png", Handler.create(this, function (texture) {
                //在U方向上使用WRAPMODE_CLAMP
                texture.wrapModeU = WrapMode.Clamp;
                //在V方向使用WRAPMODE_REPEAT
                texture.wrapModeV = WrapMode.Repeat;
                //设置过滤方式
                texture.filterMode = FilterMode.Bilinear;
                //设置各向异性等级
                texture.anisoLevel = 2;
                mat1.albedoTexture = texture;
                //修改材质贴图的平铺和偏移
                var tilingOffset = mat1.tilingOffset;
                tilingOffset.setValue(3, 3, 0.0, 0.0);
                mat1.tilingOffset = tilingOffset;
                box.meshRenderer.material = mat1;
            }));
        });
    }
}
