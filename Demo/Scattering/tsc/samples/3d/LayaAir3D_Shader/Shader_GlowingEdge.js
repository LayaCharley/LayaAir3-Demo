import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { Texture2D } from "laya/resource/Texture2D";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { CameraMoveScript } from "../common/CameraMoveScript";
import GlowingEdgeShaderFS from "./customShader/glowingEdgeShader.fs";
import GlowingEdgeShaderVS from "./customShader/glowingEdgeShader.vs";
import { GlowingEdgeMaterial } from "./customMaterials/GlowingEdgeMaterial";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { SubShader } from "laya/RenderEngine/RenderShader/SubShader";
/**
 * ...
 * @author
 */
export class Shader_GlowingEdge {
    constructor() {
        this.rotation = new Vector3(0, 0.01, 0);
        //初始化引擎
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Stat.show();
            //初始化shader
            this.initShader();
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
            scene.ambientColor = new Color(1.0, 0.0, 0.0);
            //加载精灵
            Sprite3D.load("res/threeDimen/skinModel/dude/dude.lh", Handler.create(this, function (dude) {
                scene.addChild(dude);
                //使用自定义的材质
                var glowingEdgeMaterial1 = new GlowingEdgeMaterial();
                //加载纹理
                Texture2D.load("res/threeDimen/skinModel/dude/Assets/dude/head.png", Handler.create(this, function (tex) {
                    glowingEdgeMaterial1.diffuseTexture = tex;
                }));
                //设置边缘颜色
                glowingEdgeMaterial1.marginalColor = new Vector3(1, 0.7, 0);
                var glowingEdgeMaterial2 = new GlowingEdgeMaterial();
                Texture2D.load("res/threeDimen/skinModel/dude/Assets/dude/jacket.png", Handler.create(this, function (tex) {
                    glowingEdgeMaterial2.diffuseTexture = tex;
                }));
                glowingEdgeMaterial2.marginalColor = new Vector3(1, 0.7, 0);
                var glowingEdgeMaterial3 = new GlowingEdgeMaterial();
                Texture2D.load("res/threeDimen/skinModel/dude/Assets/dude/pants.png", Handler.create(this, function (tex) {
                    glowingEdgeMaterial3.diffuseTexture = tex;
                }));
                glowingEdgeMaterial3.marginalColor = new Vector3(1, 0.7, 0);
                var glowingEdgeMaterial4 = new GlowingEdgeMaterial();
                Texture2D.load("res/threeDimen/skinModel/dude/Assets/dude/upBodyC.png", Handler.create(this, function (tex) {
                    glowingEdgeMaterial4.diffuseTexture = tex;
                }));
                glowingEdgeMaterial4.marginalColor = new Vector3(1, 0.7, 0);
                var baseMaterials = [];
                baseMaterials[0] = glowingEdgeMaterial1;
                baseMaterials[1] = glowingEdgeMaterial2;
                baseMaterials[2] = glowingEdgeMaterial3;
                baseMaterials[3] = glowingEdgeMaterial4;
                baseMaterials[4] = glowingEdgeMaterial4;
                dude.getChildAt(0).getChildAt(0).skinnedMeshRenderer.materials = baseMaterials;
                dude.transform.position = new Vector3(0, 0.5, 0);
                dude.transform.setWorldLossyScale(new Vector3(0.2, 0.2, 0.2));
                dude.transform.rotate(new Vector3(0, 180, 0), false, false);
            }));
            //加载地球精灵
            var earth = scene.addChild(new MeshSprite3D(PrimitiveMesh.createSphere(0.5, 128, 128)));
            var glowingEdgeMaterial = new GlowingEdgeMaterial();
            Texture2D.load("res/threeDimen/texture/earth.png", Handler.create(this, function (tex) {
                glowingEdgeMaterial.diffuseTexture = tex;
            }));
            glowingEdgeMaterial.marginalColor = new Vector3(0.0, 0.3, 1.0);
            earth.meshRenderer.sharedMaterial = glowingEdgeMaterial;
            Laya.timer.frameLoop(1, this, function () {
                earth.transform.rotate(this.rotation, true);
            });
        });
    }
    //初始化shader
    initShader() {
        //创建自定义shader
        var glowingEdgeShader = Shader3D.add("GlowingEdgeMaterial", true, true);
        //为当前自定义的shader添加SubShader
        var subShader = new SubShader();
        glowingEdgeShader.addSubShader(subShader);
        //SubShader添加ShaderPass
        subShader.addShaderPass(GlowingEdgeShaderVS, GlowingEdgeShaderFS);
    }
}
