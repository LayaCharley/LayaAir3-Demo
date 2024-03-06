import { Laya } from "Laya";
import { PBRStandardMaterial } from "laya/d3/core/material/PBRStandardMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { Handler } from "laya/utils/Handler";
import { CameraMoveScript } from "../common/CameraMoveScript";
export class PBRMaterialDemo {
    constructor() {
        Shader3D.debugMode = true;
        Laya.init(0, 0).then(() => {
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            Scene3D.load("res/threeDimen/scene/LayaScene_EmptyScene/Conventional/EmptyScene.ls", Handler.create(this, function (scene) {
                Laya.stage.addChild(scene);
                var camera = scene.getChildByName("Main Camera");
                var moveScript = camera.addComponent(CameraMoveScript);
                moveScript.speed = 0.005;
                var sphereMesh = PrimitiveMesh.createSphere(0.25, 32, 32);
                const row = 6;
                this.addSpheresSpecialMetallic(sphereMesh, new Vector3(0, 1.5, 0), scene, row, new Color(186 / 255, 110 / 255, 64 / 255, 1.0), 1.0);
                this.addSpheresSmoothnessMetallic(sphereMesh, new Vector3(0, 0, 0), scene, 3, row, new Color(1.0, 1.0, 1.0, 1.0));
                this.addSpheresSpecialMetallic(sphereMesh, new Vector3(0, -1.5, 0), scene, row, new Color(0.0, 0.0, 0.0, 1.0), 0.0);
            }));
        });
    }
    /**
     * Add one with smoothness and metallic sphere.
     */
    addPBRSphere(sphereMesh, position, scene, color, smoothness, metallic) {
        var mat = new PBRStandardMaterial();
        mat.albedoColor = color;
        mat.smoothness = smoothness;
        mat.metallic = metallic;
        var meshSprite = new MeshSprite3D(sphereMesh);
        meshSprite.meshRenderer.sharedMaterial = mat;
        var transform = meshSprite.transform;
        transform.localPosition = position;
        scene.addChild(meshSprite);
        return mat;
    }
    /**
     * Add some different smoothness and metallic sphere.
     */
    addSpheresSmoothnessMetallic(sphereMesh, offset, scene, row, col, color) {
        const width = col * 0.5;
        const height = row * 0.5;
        for (var i = 0, n = col; i < n; i++) { //diffenent smoothness
            for (var j = 0, m = row; j < m; j++) { //diffenent metallic
                var smoothness = i / (n - 1);
                var metallic = 1.0 - j / (m - 1);
                var pos = PBRMaterialDemo._tempPos;
                pos.setValue(-width / 2 + i * width / (n - 1), height / 2 - j * height / (m - 1), 3.0);
                Vector3.add(offset, pos, pos);
                this.addPBRSphere(sphereMesh, pos, scene, color, smoothness, metallic);
            }
        }
    }
    /**
     * Add some different smoothness with special metallic sphere.
     */
    addSpheresSpecialMetallic(sphereMesh, offset, scene, col, color, metallic = 0) {
        const width = col * 0.5;
        for (var i = 0, n = col; i < n; i++) { //diffenent smoothness
            var smoothness = i / (n - 1);
            // var metallic: number = metallic;
            var pos = PBRMaterialDemo._tempPos;
            pos.setValue(-width / 2 + i * width / (n - 1), 0, 3.0);
            Vector3.add(offset, pos, pos);
            this.addPBRSphere(sphereMesh, pos, scene, color, smoothness, metallic);
        }
    }
}
PBRMaterialDemo._tempPos = new Vector3();
