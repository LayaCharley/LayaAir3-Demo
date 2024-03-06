import { LayaGL } from "../../../../layagl/LayaGL";
import { BufferUsage } from "../../../../RenderEngine/RenderEnum/BufferTargetType";
import { Command } from "./Command";
import { RenderElement } from "../RenderElement";
import { MeshInstanceGeometry } from "../../../graphics/MeshInstanceGeometry";
import { RenderContext3D } from "../RenderContext3D";
import { BaseRender } from "../../../core/render/BaseRender";
import { MeshSprite3DShaderDeclaration } from "../../MeshSprite3DShaderDeclaration";
import { Camera } from "../../Camera";
import { BufferState } from "../../../../webgl/utils/BufferState";
import { VertexMesh } from "../../../../RenderEngine/RenderShader/VertexMesh";
export class DrawMeshInstancedCMD extends Command {
    constructor() {
        super();
        this._subShaderIndex = 0;
        this._transform = LayaGL.renderOBJCreate.createTransform(null);
        this._instanceRenderElementArray = [];
        this._instanceGeometryArray = [];
        this._instanceWorldMatrixData = new Float32Array(DrawMeshInstancedCMD.maxInstanceCount * 16);
        this._instanceWorldMatrixBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(this._instanceWorldMatrixData.length * 4, BufferUsage.Dynamic, false);
        this._instanceWorldMatrixBuffer.vertexDeclaration = VertexMesh.instanceWorldMatrixDeclaration;
        this._instanceWorldMatrixBuffer.instanceBuffer = true;
        this._render = new BaseRender();
        this._render._shaderValues.addDefine(MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE);
    }
    static create(mesh, subMeshIndex, matrixs, material, subShaderIndex, instanceProperty, drawnums, commandBuffer) {
        var cmd;
        if ((matrixs && matrixs.length > DrawMeshInstancedCMD.maxInstanceCount) || drawnums > DrawMeshInstancedCMD.maxInstanceCount) {
            throw "the number of renderings exceeds the maximum number of merges";
        }
        cmd = DrawMeshInstancedCMD._pool.length > 0 ? DrawMeshInstancedCMD._pool.pop() : new DrawMeshInstancedCMD();
        cmd._matrixs = matrixs;
        cmd.material = material;
        cmd._subMeshIndex = subMeshIndex;
        cmd._subShaderIndex = subShaderIndex;
        cmd._commandBuffer = commandBuffer;
        cmd._instanceProperty = instanceProperty;
        cmd._drawnums = drawnums;
        cmd.mesh = mesh;
        matrixs && cmd._updateWorldMatrixBuffer();
        cmd._setInstanceBuffer();
        cmd.setContext(RenderContext3D._instance);
        return cmd;
    }
    set material(value) {
        this._material && this._material._removeReference(1);
        this._material = value;
        this._material && this._material._addReference(1);
    }
    get bufferState() {
        return this._instanceWorldMatrixBuffer;
    }
    set mesh(value) {
        if (this._mesh == value)
            return;
        BaseRender.changeVertexDefine(this._mesh, value, this._render._shaderValues);
        this._mesh = value;
        if (!this._mesh)
            return;
        let submeshs = this._mesh._subMeshes;
        if (this._subMeshIndex == -1) {
            for (let i = 0, n = submeshs.length; i < n; i++) {
                let element = this._instanceRenderElementArray[i] = this._instanceRenderElementArray[i] ? this._instanceRenderElementArray[i] : new RenderElement();
                let geometry = this._instanceGeometryArray[i] = this._instanceGeometryArray[i] ? this._instanceGeometryArray[i] : new MeshInstanceGeometry(submeshs[i]);
                element.setGeometry(geometry);
                element.transform = this._transform;
                element.material = this._material;
                element.renderSubShader = this._material._shader.getSubShaderAt(this._subShaderIndex);
                element._subShaderIndex = this._subShaderIndex;
                element.render = this._render;
                geometry.bufferState = this._instanceBufferState;
                geometry.instanceCount = this._drawnums;
            }
        }
        else {
            let element = this._instanceRenderElementArray[0] = this._instanceRenderElementArray[0] ? this._instanceRenderElementArray[0] : new RenderElement();
            let geometry = this._instanceGeometryArray[0] = this._instanceGeometryArray[0] ? this._instanceGeometryArray[0] : new MeshInstanceGeometry(submeshs[this._subMeshIndex]);
            element.setGeometry(geometry);
            element.transform = this._transform;
            element.material = this._material;
            element.render = this._render;
            element.renderSubShader = this._material._shader.getSubShaderAt(this._subShaderIndex);
            geometry.bufferState = this._instanceBufferState;
            geometry.instanceCount = this._drawnums;
        }
    }
    get mesh() {
        return this._mesh;
    }
    _setInstanceBuffer() {
        if (!this._instanceBufferState) {
            this._instanceBufferState = new BufferState();
        }
        let instanceBufferState = this._instanceBufferState;
        let vertexArray = [];
        let meshVertexBuffer = this._mesh._bufferState._vertexBuffers;
        meshVertexBuffer.forEach(element => {
            vertexArray.push(element);
        });
        vertexArray.push(this._instanceWorldMatrixBuffer);
        let propertyMap = this._instanceProperty._propertyMap;
        for (let i in propertyMap) {
            vertexArray.push(propertyMap[i]._vertexBuffer);
        }
        instanceBufferState.applyState(vertexArray, this._mesh._indexBuffer);
        this._instanceGeometryArray.forEach(element => {
            element.bufferState = instanceBufferState;
        });
    }
    _updateWorldMatrixBuffer() {
        let worldMatrixData = this._instanceWorldMatrixData;
        let count = this._drawnums;
        for (let i = 0; i < count; i++) {
            worldMatrixData.set(this._matrixs[i].elements, i * 16);
        }
        let worldBuffer = this._instanceWorldMatrixBuffer;
        worldBuffer.orphanStorage();
        worldBuffer.setData(worldMatrixData.buffer, 0, 0, count * 64);
    }
    setWorldMatrix(worldMatrixArray) {
        if (worldMatrixArray.length < this._drawnums)
            throw "worldMatrixArray length is less then drawnums";
        this._matrixs = worldMatrixArray;
        this._matrixs && this._updateWorldMatrixBuffer();
    }
    setDrawNums(drawNums) {
        if (this._matrixs && this._matrixs.length < drawNums)
            throw "worldMatrixArray length is less then drawnums";
        this._drawnums = drawNums;
        let submeshs = this._mesh._subMeshes;
        if (this._subMeshIndex == -1) {
            for (let i = 0, n = submeshs.length; i < n; i++) {
                let geometry = this._instanceGeometryArray[i] ? this._instanceGeometryArray[i] : new MeshInstanceGeometry(submeshs[i]);
                geometry.instanceCount = this._drawnums;
            }
        }
        else {
            let geometry = this._instanceGeometryArray[0] ? this._instanceGeometryArray[0] : new MeshInstanceGeometry(submeshs[0]);
            geometry.instanceCount = this._drawnums;
        }
        this._matrixs && this._updateWorldMatrixBuffer();
    }
    run() {
        let context = RenderContext3D._instance;
        context._contextOBJ.applyContext(Camera._updateMark);
        let propertyMap = this._instanceProperty._propertyMap;
        for (let i in propertyMap) {
            propertyMap[i].updateVertexBufferData(this._drawnums);
        }
        let submeshs = this.mesh._subMeshes;
        if (this._subMeshIndex == -1) {
            for (let i = 0, n = submeshs.length; i < n; i++) {
                let element = this._instanceRenderElementArray[i];
                context.drawRenderElement(element);
            }
        }
        else {
            let element = this._instanceRenderElementArray[0];
            context.drawRenderElement(element);
        }
    }
    recover() {
        DrawMeshInstancedCMD._pool.push(this);
        super.recover();
        this._material && this._material._removeReference(1);
        this._material = null;
        this._instanceBufferState.destroy();
        this._instanceBufferState = null;
        delete this._instanceRenderElementArray;
        this._instanceRenderElementArray = [];
        delete this._instanceGeometryArray;
        this._instanceGeometryArray = [];
        this.mesh = null;
    }
    destroy() {
        super.destroy();
        this._material && this._material._removeReference(1);
        this._material = null;
        this._instanceBufferState.destroy();
        this._instanceBufferState = null;
        delete this._instanceRenderElementArray;
        this._instanceRenderElementArray = [];
        delete this._instanceGeometryArray;
        this._instanceGeometryArray = [];
        this.mesh = null;
    }
}
DrawMeshInstancedCMD._pool = [];
DrawMeshInstancedCMD.maxInstanceCount = 1024;

//# sourceMappingURL=DrawMeshInstancedCMD.js.map
