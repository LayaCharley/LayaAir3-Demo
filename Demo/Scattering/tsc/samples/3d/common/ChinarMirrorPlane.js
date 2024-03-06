import { Camera } from "laya/d3/core/Camera";
import { UnlitMaterial } from "laya/d3/core/material/UnlitMaterial";
import { RenderTargetFormat } from "laya/RenderEngine/RenderEnum/RenderTargetFormat";
import { Script } from "laya/components/Script";
import { Color } from "laya/maths/Color";
import { Matrix4x4 } from "laya/maths/Matrix4x4";
import { Vector3 } from "laya/maths/Vector3";
import { Vector4 } from "laya/maths/Vector4";
import { RenderTexture } from "laya/resource/RenderTexture";
export class ChinarMirrorPlane extends Script {
    constructor() {
        super();
        this.mirrorCamera = new Camera(); // 镜像摄像机
        this.renderTexture = RenderTexture.createFromPool(1024, 1024, RenderTargetFormat.R8G8B8, RenderTargetFormat.DEPTH_16, false, 1);
        this.estimateViewFrustum = true;
        this.setNearClipPlane = true;
        this.nearClipDistanceOffset = -0.01;
        this.vn = new Vector3(); // 屏幕的法线
        this.pa = new Vector3(); //世界坐标系的左下角
        this.pb = new Vector3(); //世界坐标系的右下角
        this.pc = new Vector3(); //世界坐标系的左上角
        this.pe = new Vector3(); //镜像观察角度的世界坐标位置
        this.va = new Vector3(); //从镜像摄像机到左下角
        this.vb = new Vector3(); //从镜像摄像机到右下角
        this.vc = new Vector3(); //从镜像摄像机到左上角
        this.vr = new Vector3(); //屏幕的右侧旋转轴
        this.vu = new Vector3(); //屏幕的上侧旋转轴
        this.p = new Matrix4x4();
        this.rm = new Matrix4x4();
        this.tm = new Matrix4x4();
    }
    set mirrorPlane(value) {
        this._mirrorPlane = value;
        var material = new UnlitMaterial();
        value.meshRenderer.sharedMaterial = material;
        material.albedoTexture = this.renderTexture;
        material.tilingOffset = new Vector4(-1, 1, 0, 0);
    }
    set onlyMainCamera(value) {
        value.scene.addChild(this.mirrorCamera);
        this.mainCamera = value;
    }
    onStart() {
        //this.mirrorCamera = this.owner as Camera;'
        this.mirrorCamera.renderTarget = this.renderTexture;
        this.mirrorCamera.clearColor = new Color(0.0, 0.0, 0.0, 1.0);
    }
    onUpdate() {
        if (this.mirrorCamera == null || this._mirrorPlane == null || this.mainCamera == null) {
            return;
        }
        this._mirrorPlane.transform.worldMatrix.invert(ChinarMirrorPlane.tempMat);
        Vector3.transformV3ToV3(this.mainCamera.transform.position, ChinarMirrorPlane.tempMat, ChinarMirrorPlane.tempV3);
        ChinarMirrorPlane.tempV3.y = -ChinarMirrorPlane.tempV3.y;
        Vector3.transformV3ToV3(ChinarMirrorPlane.tempV3, this._mirrorPlane.transform.worldMatrix, ChinarMirrorPlane.tempV3);
        this.mirrorCamera.transform.position = ChinarMirrorPlane.tempV3;
        // todo: plane 四个角的点坐标
        Vector3.transformV3ToV3(ChinarMirrorPlane.oriPa, this._mirrorPlane.transform.worldMatrix, this.pa); // 世界坐标系的左下角
        Vector3.transformV3ToV3(ChinarMirrorPlane.oriPb, this._mirrorPlane.transform.worldMatrix, this.pb); // 世界坐标系的右下角
        Vector3.transformV3ToV3(ChinarMirrorPlane.oriPc, this._mirrorPlane.transform.worldMatrix, this.pc); // 世界坐标系的左上角
        this.pe = this.mirrorCamera.transform.position; //镜像观察角度的世界坐标位置
        this.n = this.mirrorCamera.nearPlane; // 镜像摄像机的近剪切面的距离
        this.f = this.mirrorCamera.farPlane; // 镜像摄像机的远剪切面的距离
        Vector3.subtract(this.pa, this.pe, this.va); // 从镜像摄像机到左下角
        Vector3.subtract(this.pb, this.pe, this.vb); // 从镜像摄像机到右下角
        Vector3.subtract(this.pc, this.pe, this.vc); // 从镜像摄像机到左上角
        Vector3.subtract(this.pb, this.pa, this.vr); // 屏幕的右侧旋转轴
        Vector3.subtract(this.pc, this.pa, this.vu); // 屏幕的上侧旋转轴
        // 如果看向镜子的背面
        Vector3.cross(this.va, this.vc, ChinarMirrorPlane.tempV3);
        if (Vector3.dot(ChinarMirrorPlane.tempV3, this.vb) < 0.0) {
            Vector3.scale(this.vu, -1, this.vu);
            this.pc.cloneTo(this.pa);
            Vector3.add(this.pa, this.vr, this.pb);
            Vector3.add(this.pa, this.vu, this.pc);
            Vector3.subtract(this.pa, this.pe, this.va);
            Vector3.subtract(this.pb, this.pe, this.vb);
            Vector3.subtract(this.pc, this.pe, this.vc);
        }
        Vector3.normalize(this.vr, this.vr);
        Vector3.normalize(this.vu, this.vu);
        Vector3.cross(this.vr, this.vu, ChinarMirrorPlane.tempV3);
        Vector3.normalize(ChinarMirrorPlane.tempV3, this.vn);
        this.d = Vector3.dot(this.va, this.vn);
        if (this.setNearClipPlane) {
            this.n = this.d + this.nearClipDistanceOffset;
            this.mirrorCamera.nearPlane = this.n;
        }
        this.l = Vector3.dot(this.vr, this.va) * this.n / this.d;
        this.r = Vector3.dot(this.vr, this.vb) * this.n / this.d;
        this.b = Vector3.dot(this.vu, this.va) * this.n / this.d;
        this.t = Vector3.dot(this.vu, this.vc) * this.n / this.d;
        // 投影矩阵
        this.p.elements[0] = 2.0 * this.n / (this.r - this.l);
        this.p.elements[4] = 0;
        this.p.elements[8] = (this.r + this.l) / (this.r - this.l);
        this.p.elements[12] = 0.0;
        this.p.elements[1] = 0.0;
        this.p.elements[5] = 2.0 * this.n / (this.t - this.b);
        this.p.elements[9] = (this.t + this.b) / (this.t - this.b);
        this.p.elements[13] = 0.0;
        this.p.elements[2] = 0;
        this.p.elements[6] = 0;
        this.p.elements[10] = (this.f + this.n) / (this.n - this.f);
        this.p.elements[14] = (2.0 * this.f * this.n / (this.n - this.f)) / 2;
        this.p.elements[3] = 0;
        this.p.elements[7] = 0;
        this.p.elements[11] = -1;
        this.p.elements[15] = 0;
        this.p.elements[0] *= -1;
        this.p.elements[5] *= -1;
        this.p.elements[14] *= -1;
        // 旋转 & 平移 矩阵
        this.rm.elements[0] = this.vr.x;
        this.rm.elements[4] = this.vr.y;
        this.rm.elements[8] = this.vr.z;
        this.rm.elements[12] = this.pe.x;
        this.rm.elements[1] = this.vu.x;
        this.rm.elements[5] = this.vu.y;
        this.rm.elements[9] = this.vu.z;
        this.rm.elements[13] = this.pe.z;
        this.rm.elements[2] = this.vn.x;
        this.rm.elements[6] = this.vn.y;
        this.rm.elements[10] = this.vn.z;
        this.rm.elements[14] = this.pe.y;
        this.rm.elements[3] = 0;
        this.rm.elements[7] = 0;
        this.rm.elements[11] = 0;
        this.rm.elements[15] = 1;
        this.mirrorCamera.projectionMatrix = this.p;
        this.rm.invert(ChinarMirrorPlane.tempMat);
        this.mirrorCamera.transform.worldMatrix = ChinarMirrorPlane.tempMat;
        if (!this.estimateViewFrustum)
            return;
    }
}
//这里的mesh必须是-5-5的plane板，修改了mesh的话需要修改这里
ChinarMirrorPlane.oriPa = new Vector3(5, 0, -5);
ChinarMirrorPlane.oriPb = new Vector3(-5, 0, -5);
ChinarMirrorPlane.oriPc = new Vector3(5, 0, 5);
ChinarMirrorPlane.tempMat = new Matrix4x4();
ChinarMirrorPlane.tempV3 = new Vector3();
