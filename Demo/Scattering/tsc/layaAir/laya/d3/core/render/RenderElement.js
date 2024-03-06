import { BaseRender } from "./BaseRender";
import { Camera } from "../Camera";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { DefineDatas } from "../../../RenderEngine/RenderShader/DefineDatas";
import { LayaGL } from "../../../layagl/LayaGL";
import { ILaya3D } from "../../../../ILaya3D";
export class RenderElement {
    constructor() {
        this._canBatch = false;
        this._subShaderIndex = 0;
        this.renderType = RenderElement.RENDERTYPE_NORMAL;
        this._createRenderElementOBJ();
    }
    set transform(value) {
        this._transform = value;
        this._renderElementOBJ._transform = value;
    }
    get transform() {
        return this._renderElementOBJ._transform;
    }
    set material(value) {
        if (value) {
            this._material = value;
            this._renderElementOBJ._materialShaderData = value.shaderData;
        }
    }
    get material() {
        return this._material;
    }
    set renderSubShader(value) {
        this._subShader = value;
    }
    get renderSubShader() {
        return this._subShader;
    }
    set subShaderIndex(value) {
        this._subShaderIndex = value;
    }
    get subShaderIndex() {
        return this._subShaderIndex;
    }
    set render(value) {
        this._baseRender = value;
        this._renderElementOBJ._renderShaderData = value._shaderValues;
    }
    get render() {
        return this._baseRender;
    }
    _createRenderElementOBJ() {
        this._renderElementOBJ = LayaGL.renderOBJCreate.createRenderElement();
    }
    getInvertFront() {
        return this.transform ? this.transform._isFrontFaceInvert : false;
    }
    setTransform(transform) {
        this.transform = transform;
    }
    setGeometry(geometry) {
        this._geometry = geometry;
        this._renderElementOBJ._geometry = geometry._geometryElementOBj;
    }
    compileShader(context) {
        var passes = this._subShader._passes;
        this._renderElementOBJ._clearShaderInstance();
        for (var j = 0, m = passes.length; j < m; j++) {
            var pass = passes[j];
            if (pass._pipelineMode !== context.pipelineMode)
                continue;
            var comDef = RenderElement._compileDefine;
            if (context.sceneShaderData) {
                context.sceneShaderData._defineDatas.cloneTo(comDef);
            }
            else {
                Shader3D._configDefineValues.cloneTo(comDef);
            }
            context.cameraShaderData && comDef.addDefineDatas(context.cameraShaderData._defineDatas);
            if (this.render) {
                comDef.addDefineDatas(this.render._shaderValues._defineDatas);
                pass.nodeCommonMap = this.render._commonUniformMap;
            }
            else {
                pass.nodeCommonMap = null;
            }
            comDef.addDefineDatas(this._renderElementOBJ._materialShaderData._defineDatas);
            var shaderIns = pass.withCompile(comDef);
            this._renderElementOBJ._addShaderInstance(shaderIns);
        }
    }
    _convertSubShader(customShader, replacementTag, subshaderIndex = 0) {
        var subShader = this.material._shader.getSubShaderAt(this._subShaderIndex);
        this.renderSubShader = null;
        if (customShader) {
            if (replacementTag) {
                var oriTag = subShader.getFlag(replacementTag);
                if (oriTag) {
                    var customSubShaders = customShader._subShaders;
                    for (var k = 0, p = customSubShaders.length; k < p; k++) {
                        var customSubShader = customSubShaders[k];
                        if (oriTag === customSubShader.getFlag(replacementTag)) {
                            this.renderSubShader = customSubShader;
                            break;
                        }
                    }
                    if (!this.renderSubShader)
                        return;
                }
                else {
                    return;
                }
            }
            else {
                this.renderSubShader = customShader.getSubShaderAt(subshaderIndex);
            }
        }
        else {
            this.renderSubShader = subShader;
        }
    }
    _update(scene, context, customShader, replacementTag, subshaderIndex = 0) {
        if (this.material) {
            this._convertSubShader(customShader, replacementTag, subshaderIndex);
            if (!this.renderSubShader)
                return;
            var renderQueue = scene._getRenderQueue(this.material.renderQueue);
            if (renderQueue._isTransparent)
                renderQueue.addRenderElement(this);
            else
                renderQueue.addRenderElement(this);
        }
    }
    _renderUpdatePre(context) {
        var sceneMark = ILaya3D.Scene3D._updateMark;
        var transform = this.transform;
        context.renderElement = this;
        var modelDataRender = (!!this._baseRender) ? (sceneMark !== this._baseRender._sceneUpdateMark || this.renderType !== this._baseRender._updateRenderType) : false;
        if (modelDataRender) {
            this._baseRender._renderUpdate(context, transform);
            this._baseRender._sceneUpdateMark = sceneMark;
        }
        var updateMark = Camera._updateMark;
        var updateRender = (!!this._baseRender) ? (updateMark !== this._baseRender._updateMark || this.renderType !== this._baseRender._updateRenderType) : false;
        if (updateRender) {
            this._baseRender._renderUpdateWithCamera(context, transform);
            this._baseRender._updateMark = updateMark;
            this._baseRender._updateRenderType = this.renderType;
        }
        const subUbo = (!!this._baseRender) ? this._baseRender._subUniformBufferData : false;
        if (subUbo) {
            subUbo._needUpdate && BaseRender._transLargeUbO.updateSubData(subUbo);
        }
        this._renderElementOBJ._isRender = this._geometry._prepareRender(context);
        this._geometry._updateRenderParams(context);
        this.compileShader(context._contextOBJ);
        this._renderElementOBJ._invertFront = this.getInvertFront();
    }
    _render(context) {
        this._renderElementOBJ._render(context);
    }
    destroy() {
        this._renderElementOBJ._destroy();
        this._renderElementOBJ = null;
        this._geometry = null;
        this._baseRender = null;
        this._material = null;
        this._baseRender = null;
        this._subShader = null;
    }
}
RenderElement.RENDERTYPE_NORMAL = 0;
RenderElement.RENDERTYPE_STATICBATCH = 1;
RenderElement.RENDERTYPE_INSTANCEBATCH = 2;
RenderElement.RENDERTYPE_VERTEXBATCH = 3;
RenderElement._compileDefine = new DefineDatas();

//# sourceMappingURL=RenderElement.js.map
