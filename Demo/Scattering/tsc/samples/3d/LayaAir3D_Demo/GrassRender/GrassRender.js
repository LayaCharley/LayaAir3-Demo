import { CameraEventFlags } from "laya/d3/core/Camera";
import { CommandBuffer } from "laya/d3/core/render/command/CommandBuffer";
import { DrawMeshInstancedCMD } from "laya/d3/core/render/command/DrawMeshInstancedCMD";
import { InstanceLocation, MaterialInstancePropertyBlock } from "laya/d3/core/render/command/MaterialInstancePropertyBlock";
import { PrimitiveMesh } from "laya/d3/resource/models/PrimitiveMesh";
import { VertexMesh } from "laya/RenderEngine/RenderShader/VertexMesh";
import { GrassMaterial } from "./GrassMaterial";
export class GlassRender {
    constructor(manager, camera) {
        this.grassManager = manager;
        this.createCommandBuffer();
        this.camera = camera;
    }
    /**
     * @internal
     */
    creatGrassMesh() {
        // 生成 单片 grass (一个 三角形)
        var vertexArray = new Float32Array(3 * 3);
        vertexArray[0] = -0.25; // p1.x
        vertexArray[3] = 0.25; // p2.x
        vertexArray[7] = 1; // p3.y
        var indexArray = new Uint16Array([2, 1, 0]);
        var vertexDeclaration = VertexMesh.getVertexDeclaration("POSITION");
        //@ts-ignore
        var mesh = PrimitiveMesh._createMesh(vertexDeclaration, vertexArray, indexArray);
        return mesh;
    }
    /**
     * @internal
     */
    createMaterial() {
        var mat = new GrassMaterial();
        this.grassMaterial = mat;
        //set mat Property
        return mat;
    }
    /**
     * 创建CommandBuffer命令缓存流
     * @param camera
     */
    createCommandBuffer() {
        DrawMeshInstancedCMD.maxInstanceCount = 1000000;
        //创建渲染命令流
        this.buf = new CommandBuffer();
        //创建材质instance属性块
        this.materialBlock = new MaterialInstancePropertyBlock();
        //设置属性
        this.materialBlock.setVector3Array("a_privotPosition", this.grassManager.dataArrayBuffer, InstanceLocation.CUSTOME0);
        // let matrixs =new Array<Matrix4x4>();
        // for(var i = 0;i<1000000;i++){
        //     matrixs.push(new Matrix4x4());
        // }
        this.instanceCMD = this.buf.drawMeshInstance(this.creatGrassMesh(), 0, null, this.createMaterial(), 0, this.materialBlock, this.grassManager.drawArrayLength);
        return;
    }
    removeCommandBuffer() {
        this.camera.removeCommandBuffer(CameraEventFlags.BeforeTransparent, this.buf);
    }
    addCommandBuffer() {
        this.camera.addCommandBuffer(CameraEventFlags.BeforeTransparent, this.buf);
    }
    changeDrawNums() {
        this.materialBlock.setVector3Array("a_privotPosition", this.grassManager.dataArrayBuffer, InstanceLocation.CUSTOME0);
        this.instanceCMD.setDrawNums(this.grassManager.drawArrayLength);
    }
}
