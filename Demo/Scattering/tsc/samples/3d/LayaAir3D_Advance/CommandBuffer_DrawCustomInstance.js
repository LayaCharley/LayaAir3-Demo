import { Laya } from "Laya";
import { Camera, CameraEventFlags } from "laya/d3/core/Camera";
import { DirectionLight } from "laya/d3/core/light/DirectionLight";
import { CommandBuffer } from "laya/d3/core/render/command/CommandBuffer";
import { InstanceLocation, MaterialInstancePropertyBlock } from "laya/d3/core/render/command/MaterialInstancePropertyBlock";
import { Scene3D } from "laya/d3/core/scene/Scene3D";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { Stage } from "laya/display/Stage";
import { Button } from "laya/ui/Button";
import { Browser } from "laya/utils/Browser";
import { Handler } from "laya/utils/Handler";
import { Stat } from "laya/utils/Stat";
import { Event } from "laya/events/Event";
import { CameraMoveScript } from "../common/CameraMoveScript";
import { CustomInstanceMaterial } from "./DrawCustomInstanceDemo/CustomInstanceMaterial";
import Client from "../../Client";
import { Shader3D } from "laya/RenderEngine/RenderShader/Shader3D";
import { Color } from "laya/maths/Color";
import { Matrix4x4 } from "laya/maths/Matrix4x4";
import { Quaternion } from "laya/maths/Quaternion";
import { Vector3 } from "laya/maths/Vector3";
import { Vector4 } from "laya/maths/Vector4";
export class CommandBuffer_DrawCustomInstance {
    constructor() {
        this.matrixs = [];
        this.matrixs1 = [];
        this.colors = [];
        this.colors1 = [];
        this.currentColor = [];
        this.currentMatrix = [];
        /**实例类型*/
        this.btype = "CommandBuffer_DrawCustomInstance";
        /**场景内按钮类型*/
        this.stype = 0;
        this.timer = 0;
        this.delta = 0.01;
        this.curStateIndex = 0;
        Laya.init(0, 0);
        Stat.show();
        //初始化引擎
        Laya.init(100, 100).then(() => {
            Stat.show();
            Shader3D.debugMode = true;
            Laya.stage.scaleMode = Stage.SCALE_FULL;
            Laya.stage.screenMode = Stage.SCREEN_NONE;
            //材质初始化
            CustomInstanceMaterial.init();
            let scene = Laya.stage.addChild(new Scene3D());
            let camera = scene.addChild(new Camera(0, 0.1, 100));
            camera.transform.position = new Vector3(14.85, 17.08, 35.89);
            camera.transform.rotation = new Quaternion(0, 0, 0, 1);
            camera.addComponent(CameraMoveScript);
            camera.clearColor = new Color(0.8, 0.4, 0.2, 1.0);
            this.mat = new CustomInstanceMaterial();
            //camera.enableHDR = true;
            //创建方向光
            let directionLight = scene.addChild(new DirectionLight());
            //方向光的颜色
            directionLight.color = new Color(1, 1, 1, 1);
            //设置平行光的方向
            let mat = directionLight.transform.worldMatrix;
            mat.setForward(new Vector3(-1.0, -1.0, -1.0));
            directionLight.transform.worldMatrix = mat;
            //创建CommandBuffer命令流
            this.createCommandBuffer(camera);
            //UI
            this.loadUI();
            //初始化动作
            Laya.timer.frameLoop(1, this, this.changetwoon);
        });
    }
    /**
     * 创建CommandBuffer命令缓存流
     * @param camera
     */
    createCommandBuffer(camera) {
        //创建渲染命令流
        let buf = new CommandBuffer();
        //初始化数矩阵数组和颜色数组
        this.createMatrixArray();
        //创建材质instance属性块
        this.materialBlock = new MaterialInstancePropertyBlock();
        //设置属性
        this.materialBlock.setVectorArray("a_InstanceColor", this.colors1, InstanceLocation.CUSTOME0);
        //创建渲染命令  渲染900个小球
        this.instanceCMD = buf.drawMeshInstance(PrimitiveMesh.createSphere(0.5), 0, this.matrixs1, this.mat, 0, this.materialBlock, 900);
        camera.addCommandBuffer(CameraEventFlags.BeforeTransparent, buf);
        return;
    }
    createMatrixArray() {
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                let ind = j * 30 + i;
                if (ind > 1023)
                    break;
                this.matrixs[ind] = new Matrix4x4();
                this.matrixs1[ind] = new Matrix4x4();
                this.currentMatrix[ind] = new Matrix4x4();
                Matrix4x4.createTranslate(new Vector3(i, j, 0), this.matrixs[ind]);
                Matrix4x4.createTranslate(new Vector3(ind % 10 + 10, Math.floor(ind / 100) + 10, Math.floor(ind / 10) % 10 - 5), this.matrixs1[ind]);
                this.colors[ind] = new Vector4(1 - i / 30.0, 1 - j / 30.0, 1.0, 1.0);
                this.colors1[ind] = new Vector4(1 - i / 30.0, 1 - j / 30.0, 0.0, 1.0);
                this.currentColor[ind] = new Vector4();
            }
        }
        return null;
    }
    changePositionColor(sourceColor, sourceMatrix, destColor, destMatrix, lerp) {
        //根据lerp插值颜色和矩阵
        var lep = lerp;
        var invert = 1 - lerp;
        for (let i = 0; i < 30; i++) {
            for (let j = 0; j < 30; j++) {
                let ind = j * 30 + i;
                this.currentColor[ind].setValue(sourceColor[ind].x * lep + destColor[ind].x * invert, sourceColor[ind].y * lep + destColor[ind].y * invert, sourceColor[ind].z * lep + destColor[ind].z * invert, 1.0);
                var mat = this.currentMatrix[ind].elements;
                var sourcemat = sourceMatrix[ind].elements;
                var destmat = destMatrix[ind].elements;
                mat[12] = sourcemat[12] * lep + destmat[12] * invert;
                mat[13] = sourcemat[13] * lep + destmat[13] * invert;
                mat[14] = sourcemat[14] * lep + destmat[14] * invert;
            }
        }
    }
    changetwoon() {
        //修改渲染属性
        this.timer += this.delta;
        if (this.timer < 0 || this.timer > 1) {
            this.timer = Math.round(this.timer);
            return;
        }
        this.changePositionColor(this.colors, this.matrixs, this.colors1, this.matrixs1, this.timer);
        //改变900小球的矩阵
        this.instanceCMD.setWorldMatrix(this.currentMatrix);
        //改变900小球的颜色
        this.materialBlock.setVectorArray("a_InstanceColor", this.currentColor, InstanceLocation.CUSTOME0);
    }
    loadUI() {
        Laya.loader.load(["res/threeDimen/ui/button.png"], Handler.create(this, function () {
            this.changeActionButton = Laya.stage.addChild(new Button("res/threeDimen/ui/button.png", "切换颜色位置1"));
            this.changeActionButton.size(160, 40);
            this.changeActionButton.labelBold = true;
            this.changeActionButton.labelSize = 30;
            this.changeActionButton.sizeGrid = "4,4,4,4";
            this.changeActionButton.scale(Browser.pixelRatio, Browser.pixelRatio);
            this.changeActionButton.pos(Laya.stage.width / 2 - this.changeActionButton.width * Browser.pixelRatio / 2, Laya.stage.height - 100 * Browser.pixelRatio);
            this.changeActionButton.on(Event.CLICK, this, this.stypeFun0);
        }));
    }
    stypeFun0(label = "颜色位置2") {
        if (++this.curStateIndex % 2 == 1) {
            this.changeActionButton.label = "颜色位置1";
            this.delta = -0.01;
        }
        else {
            this.changeActionButton.label = "颜色位置2";
            this.delta = 0.01;
        }
        label = this.changeActionButton.label;
        Client.instance.send({ type: "next", btype: this.btype, stype: 0, value: label });
    }
}
