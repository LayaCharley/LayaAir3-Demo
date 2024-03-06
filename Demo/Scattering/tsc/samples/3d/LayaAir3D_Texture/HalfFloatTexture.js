import { Laya } from "Laya";
import { Camera } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { BlinnPhongMaterial } from "laya/d3/core/material/BlinnPhongMaterial";
import { MeshSprite3D } from "laya/d3/core/MeshSprite3D";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { Sprite3D } from "laya/d3/core/Sprite3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { HalfFloatUtils } from "laya/utils/HalfFloatUtils";
import { Stat } from "laya/utils/Stat";
import { Texture2D } from "laya/resource/Texture2D";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { FilterMode } from "laya/RenderEngine/RenderEnum/FilterMode";
import { TextureFormat } from "laya/RenderEngine/RenderEnum/TextureFormat";
import { Color } from "laya/maths/Color";
import { Vector3 } from "laya/maths/Vector3";
export class HalfFloatTexture {
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
            var box = this.sprite3D.addChild(new MeshSprite3D(PrimitiveMesh.createPlane(1, 1)));
            box.transform.position = new Vector3(0.0, 1.0, 2.5);
            box.transform.rotate(new Vector3(90, 0, 0), false, false);
            var material = new BlinnPhongMaterial();
            material.albedoTexture = this.createHalfFloatTexture();
            box.meshRenderer.sharedMaterial = material;
        });
    }
    //创建半浮点数纹理
    createHalfFloatTexture() {
        var texture = new Texture2D(64, 64, TextureFormat.R16G16B16A16, true, true);
        var pixelData = new Uint16Array(64 * 64 * 4);
        var pixelIndex;
        var step = 1.0 / 64;
        for (var x = 0, n = 64; x < n; x++) {
            for (var y = 0, m = 64; y < m; y++) {
                pixelIndex = (x + y * 64) * 4;
                pixelData[pixelIndex] = HalfFloatUtils.roundToFloat16Bits(1.0);
                pixelData[pixelIndex + 1] = HalfFloatUtils.roundToFloat16Bits(x * step);
                pixelData[pixelIndex + 2] = HalfFloatUtils.roundToFloat16Bits(y * step);
                pixelData[pixelIndex + 3] = HalfFloatUtils.roundToFloat16Bits(1.0);
            }
        }
        texture.setPixelsData(pixelData, false, false);
        texture.filterMode = FilterMode.Bilinear;
        return texture;
    }
}
