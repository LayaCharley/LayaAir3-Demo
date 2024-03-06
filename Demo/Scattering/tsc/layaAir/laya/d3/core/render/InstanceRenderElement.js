import { ILaya3D } from "../../../../ILaya3D";
import { LayaGL } from "../../../layagl/LayaGL";
import { SingletonList } from "../../../utils/SingletonList";
import { MeshInstanceGeometry } from "../../graphics/MeshInstanceGeometry";
import { Mesh } from "../../resource/models/Mesh";
import { Camera } from "../Camera";
import { MeshSprite3DShaderDeclaration } from "../MeshSprite3DShaderDeclaration";
import { BaseRender } from "./BaseRender";
import { RenderElement } from "./RenderElement";
export class InstanceRenderElement extends RenderElement {
    constructor() {
        super();
        this._InvertFront = false;
        this.setGeometry(new MeshInstanceGeometry(null));
        this._instanceBatchElementList = new SingletonList();
        this._isUpdataData = true;
        this._invertFrontFace = false;
    }
    static create() {
        let elemet = InstanceRenderElement._pool.length > 0 ? InstanceRenderElement._pool.pop() : new InstanceRenderElement();
        elemet._isInPool = false;
        elemet.clear();
        return elemet;
    }
    getInvertFront() {
        return this._invertFrontFace;
    }
    set InvertFront(value) {
        this._InvertFront = value;
    }
    _createRenderElementOBJ() {
        this._renderElementOBJ = LayaGL.renderOBJCreate.createInstanceRenderElement();
    }
    compileShader(context) {
        var passes = this._subShader._passes;
        this._renderElementOBJ._clearShaderInstance();
        for (var j = 0, m = passes.length; j < m; j++) {
            var pass = passes[j];
            if (pass._pipelineMode !== context.pipelineMode)
                continue;
            var comDef = RenderElement._compileDefine;
            context.sceneShaderData._defineDatas.cloneTo(comDef);
            if (this.render) {
                comDef.addDefineDatas(this.render._shaderValues._defineDatas);
                pass.nodeCommonMap = this.render._commonUniformMap;
            }
            else {
                pass.nodeCommonMap = null;
            }
            comDef.addDefineDatas(this._renderElementOBJ._materialShaderData._defineDatas);
            comDef.add(MeshSprite3DShaderDeclaration.SHADERDEFINE_GPU_INSTANCE);
            var shaderIns = pass.withCompile(comDef);
            this._renderElementOBJ._addShaderInstance(shaderIns);
        }
    }
    _renderUpdatePre(context) {
        var sceneMark = ILaya3D.Scene3D._updateMark;
        var transform = this.transform;
        context.renderElement = this;
        var modelDataRender = (!!this.render) ? (sceneMark !== this.render._sceneUpdateMark || this.renderType !== this.render._updateRenderType) : false;
        if (modelDataRender) {
            this.render._renderUpdate(context, transform);
            this.render._sceneUpdateMark = sceneMark;
        }
        var updateMark = Camera._updateMark;
        if (true) {
            this.render._renderUpdateWithCamera(context, transform);
            this.oriRendertype = this.render._updateRenderType;
            this.render._updateMark = updateMark;
            this.render._updateRenderType = this.renderType;
            if (this._isUpdataData) {
                let mesh = this._geometry.subMesh._mesh;
                this.updateInstanceData(mesh);
                this._isUpdataData = false;
            }
        }
        const subUbo = (!!this.render) ? this.render._subUniformBufferData : false;
        if (subUbo) {
            subUbo._needUpdate && BaseRender._transLargeUbO.updateSubData(subUbo);
        }
        this._renderElementOBJ._isRender = this._geometry._prepareRender(context);
        this._geometry._updateRenderParams(context);
        this.compileShader(context._contextOBJ);
        this._geometry.instanceCount = this._instanceBatchElementList.length;
        this._renderElementOBJ._invertFront = this.getInvertFront();
    }
    updateInstanceData(mesh) {
        mesh._setInstanceBuffer();
        this._renderElementOBJ.clear();
        this._geometry.bufferState = mesh._instanceBufferState;
        switch (mesh._instanceBufferStateType) {
            case Mesh.MESH_INSTANCEBUFFER_TYPE_SIMPLEANIMATOR:
                var worldMatrixData = this._renderElementOBJ.getUpdateData(0, 16 * InstanceRenderElement.maxInstanceCount);
                this._renderElementOBJ.addUpdateBuffer(mesh._instanceWorldVertexBuffer, 16);
                var insBatches = this._instanceBatchElementList;
                var elements = insBatches.elements;
                var count = insBatches.length;
                this._renderElementOBJ.drawCount = count;
                let bone = elements[0].render.rootBone;
                if (bone) {
                    for (var i = 0; i < count; i++) {
                        var mat = (elements[i].render).rootBone._transform.worldMatrix;
                        worldMatrixData.set(mat.elements, i * 16);
                    }
                }
                else {
                    for (var i = 0; i < count; i++)
                        worldMatrixData.set(elements[i].transform.worldMatrix.elements, i * 16);
                }
                var simpleAnimatorData = this._renderElementOBJ.getUpdateData(1, 4 * InstanceRenderElement.maxInstanceCount);
                if (bone) {
                    for (var i = 0; i < count; i++) {
                        var render = (elements[i].render);
                        render._computeAnimatorParamsData();
                        var simpleAnimatorParams = render._simpleAnimatorParams;
                        var offset = i * 4;
                        simpleAnimatorData[offset] = simpleAnimatorParams.x;
                        simpleAnimatorData[offset + 1] = simpleAnimatorParams.y;
                    }
                }
                else {
                    for (var i = 0; i < count; i++) {
                        simpleAnimatorData[offset] = 0;
                        simpleAnimatorData[offset + 1] = 0;
                    }
                }
                this._renderElementOBJ.addUpdateBuffer(mesh._instanceSimpleAniVertexBuffer, 4);
                break;
            case Mesh.MESH_INSTANCEBUFFER_TYPE_NORMAL:
                var worldMatrixData = this._renderElementOBJ.getUpdateData(0, 16 * InstanceRenderElement.maxInstanceCount);
                this._renderElementOBJ.addUpdateBuffer(mesh._instanceWorldVertexBuffer, 16);
                var insBatches = this._instanceBatchElementList;
                var elements = insBatches.elements;
                var count = insBatches.length;
                this._renderElementOBJ.drawCount = count;
                for (var i = 0; i < count; i++)
                    worldMatrixData.set(elements[i].transform.worldMatrix.elements, i * 16);
                break;
        }
    }
    clear() {
        this._instanceBatchElementList.length = 0;
    }
    recover() {
        InstanceRenderElement._pool.push(this);
        this.render._updateRenderType = this.oriRendertype;
        this._isInPool = true;
    }
}
InstanceRenderElement.maxInstanceCount = 1024;
InstanceRenderElement._pool = [];

//# sourceMappingURL=InstanceRenderElement.js.map
