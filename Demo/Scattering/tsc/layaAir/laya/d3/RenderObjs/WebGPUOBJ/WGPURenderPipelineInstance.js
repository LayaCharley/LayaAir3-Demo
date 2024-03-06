import { WebGPUShaderInstance } from "../../../RenderEngine/RenderEngine/WebGPUEngine/WebGPUShaderInstance";
import { CullMode } from "../../../RenderEngine/RenderEnum/CullMode";
import { RenderState } from "../../../RenderEngine/RenderShader/RenderState";
import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { CommandEncoder } from "../../../layagl/CommandEncoder";
import { LayaGL } from "../../../layagl/LayaGL";
import { WGPUBlendState, WGPUDepthStencilState, WGPUPrimitiveState, WGPURenderPipeline, WGPUVertexBufferLayouts } from "./WebGPURenderPipelineHelper";
export class WGPURenderPipelineInstance {
    constructor(shaderProcessInfo, shaderPass) {
        this._sceneUniformParamsMap = new CommandEncoder();
        this._cameraUniformParamsMap = new CommandEncoder();
        this._spriteUniformParamsMap = new CommandEncoder();
        this._materialUniformParamsMap = new CommandEncoder();
        this._uploadMark = -1;
        this._uploadRenderType = -1;
        this.engine = LayaGL.renderEngine;
        this._shaderInstance = new WebGPUShaderInstance(this.engine);
        this._shaderInstance._WGSLShaderLanguageProcess3D(shaderProcessInfo.vs, shaderProcessInfo.ps);
        if (true) {
            this.testCreateSceneCommandEncoder();
            this.testCreateCameraCommandEncoder();
            this.testCreateSpriteCommandEncoder();
            this.testMaterialUniformParamsMap(shaderProcessInfo.uniformMap);
        }
        this._shaderPass = shaderPass;
        this.cachePool = {};
    }
    get complete() {
        return true;
    }
    _disposeResource() {
    }
    _getRenderState(shaderDatas, stateIndex) {
    }
    _getData(key, data) {
        if (!data[key]) {
            data[key] = {};
        }
        return data[key];
    }
    bind() {
        return true;
    }
    getBlendState(shaderDatas) {
        var renderState = this._shaderPass.renderState;
        var datas = shaderDatas.getData();
        var blend = this._getRenderState(datas, Shader3D.BLEND);
        renderState.blend != null ? blend = renderState.blend : 0;
        if (this._shaderPass.statefirst) {
            renderState.blend != null ? blend = renderState.blend : 0;
        }
        else {
            blend = blend !== null && blend !== void 0 ? blend : renderState.blend;
        }
        blend = blend !== null && blend !== void 0 ? blend : RenderState.Default.blend;
        let blenstate;
        switch (blend) {
            case RenderState.BLEND_DISABLE:
                blenstate = WGPUBlendState.getBlendState(blend);
                break;
            case RenderState.BLEND_ENABLE_ALL:
                var blendEquation = this._getRenderState(datas, Shader3D.BLEND_EQUATION);
                var srcBlend = this._getRenderState(datas, Shader3D.BLEND_SRC);
                var dstBlend = this._getRenderState(datas, Shader3D.BLEND_DST);
                if (this._shaderPass.statefirst) {
                    renderState.blendEquation != null ? blendEquation = renderState.blendEquation : 0;
                    renderState.srcBlend != null ? srcBlend = renderState.srcBlend : 0;
                    renderState.dstBlend != null ? dstBlend = renderState.dstBlend : 0;
                }
                else {
                    blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : renderState.blendEquation;
                    srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : renderState.srcBlend;
                    dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : renderState.dstBlend;
                }
                blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : RenderState.Default.blendEquation;
                srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : RenderState.Default.srcBlend;
                dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : RenderState.Default.dstBlend;
                blenstate = WGPUBlendState.getBlendState(blend, blendEquation, srcBlend, dstBlend, blendEquation, srcBlend, dstBlend);
                break;
            case RenderState.BLEND_ENABLE_SEPERATE:
                var blendEquationRGB = this._getRenderState(datas, Shader3D.BLEND_EQUATION_RGB);
                var blendEquationAlpha = this._getRenderState(datas, Shader3D.BLEND_EQUATION_ALPHA);
                var srcRGB = this._getRenderState(datas, Shader3D.BLEND_SRC_RGB);
                var dstRGB = this._getRenderState(datas, Shader3D.BLEND_DST_RGB);
                var srcAlpha = this._getRenderState(datas, Shader3D.BLEND_SRC_ALPHA);
                var dstAlpha = this._getRenderState(datas, Shader3D.BLEND_DST_ALPHA);
                if (this._shaderPass.statefirst) {
                    renderState.blendEquationRGB != null ? blendEquationRGB = renderState.blendEquationRGB : 0;
                    renderState.blendEquationAlpha != null ? blendEquationAlpha = renderState.blendEquationAlpha : 0;
                    renderState.srcBlendRGB != null ? srcRGB = renderState.srcBlendRGB : 0;
                    renderState.dstBlendRGB != null ? dstRGB = renderState.dstBlendRGB : 0;
                    renderState.srcBlendAlpha != null ? srcAlpha = renderState.srcBlendAlpha : 0;
                    renderState.dstBlendAlpha != null ? dstAlpha = renderState.dstBlendAlpha : 0;
                }
                else {
                    blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : renderState.blendEquationRGB;
                    blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : renderState.blendEquationAlpha;
                    srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : renderState.srcBlendRGB;
                    dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : renderState.dstBlendRGB;
                    srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : renderState.srcBlendAlpha;
                    dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : renderState.dstBlendAlpha;
                }
                blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : RenderState.Default.blendEquationRGB;
                blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : RenderState.Default.blendEquationAlpha;
                srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : RenderState.Default.srcBlendRGB;
                dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : RenderState.Default.dstBlendRGB;
                srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : RenderState.Default.srcBlendAlpha;
                dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : RenderState.Default.dstBlendAlpha;
                blenstate = WGPUBlendState.getBlendState(blend, blendEquationRGB, srcRGB, dstRGB, blendEquationAlpha, srcAlpha, dstAlpha);
                break;
        }
        return blenstate;
    }
    getDepthStencilState(shaderDatas, depthTexture) {
        var renderState = this._shaderPass.renderState;
        var datas = shaderDatas.getData();
        var depthWrite = this._getRenderState(datas, Shader3D.DEPTH_WRITE);
        var depthTest = this._getRenderState(datas, Shader3D.DEPTH_TEST);
        var stencilRef = this._getRenderState(datas, Shader3D.STENCIL_Ref);
        var stencilTest = this._getRenderState(datas, Shader3D.STENCIL_TEST);
        var stencilWrite = this._getRenderState(datas, Shader3D.STENCIL_WRITE);
        var stencilOp = this._getRenderState(datas, Shader3D.STENCIL_Op);
        if (this._shaderPass.statefirst) {
            renderState.depthWrite != null ? depthWrite = renderState.depthWrite : 0;
            renderState.depthTest != null ? depthTest = renderState.depthTest : 0;
            renderState.stencilRef != null ? stencilRef = renderState.stencilRef : 0;
            renderState.stencilTest != null ? stencilTest = renderState.stencilTest : 0;
            renderState.stencilWrite != null ? stencilWrite = renderState.stencilWrite : 0;
            renderState.stencilOp != null ? stencilOp = renderState.stencilOp : 0;
        }
        else {
            depthWrite = depthWrite !== null && depthWrite !== void 0 ? depthWrite : renderState.depthWrite;
            depthTest = depthTest !== null && depthTest !== void 0 ? depthTest : renderState.depthTest;
            stencilRef = stencilRef !== null && stencilRef !== void 0 ? stencilRef : renderState.stencilRef;
            stencilTest = stencilTest !== null && stencilTest !== void 0 ? stencilTest : renderState.stencilTest;
            stencilWrite = stencilWrite !== null && stencilWrite !== void 0 ? stencilWrite : renderState.stencilWrite;
            stencilOp = stencilOp !== null && stencilOp !== void 0 ? stencilOp : renderState.stencilOp;
        }
        depthWrite = depthWrite !== null && depthWrite !== void 0 ? depthWrite : RenderState.Default.depthWrite;
        depthTest = depthTest !== null && depthTest !== void 0 ? depthTest : RenderState.Default.depthTest;
        stencilRef = stencilRef !== null && stencilRef !== void 0 ? stencilRef : RenderState.Default.stencilRef;
        stencilTest = stencilTest !== null && stencilTest !== void 0 ? stencilTest : RenderState.Default.stencilTest;
        stencilWrite = stencilWrite !== null && stencilWrite !== void 0 ? stencilWrite : RenderState.Default.stencilWrite;
        stencilOp = stencilOp !== null && stencilOp !== void 0 ? stencilOp : RenderState.Default.stencilOp;
        return WGPUDepthStencilState.getDepthStencilState(depthTexture.depthStencilFormat, depthTest === RenderState.DEPTHTEST_OFF, depthTest);
    }
    getPrimitiveState(shaderDatas, isTarget, invertFront, mode, indexformat) {
        var _a;
        var renderState = this._shaderPass.renderState;
        var datas = shaderDatas.getData();
        var cull = this._getRenderState(datas, Shader3D.CULL);
        if (this._shaderPass.statefirst) {
            cull = (_a = renderState.cull) !== null && _a !== void 0 ? _a : cull;
        }
        cull = cull !== null && cull !== void 0 ? cull : RenderState.Default.cull;
        var forntFace = CullMode.Off;
        switch (cull) {
            case RenderState.CULL_NONE:
                forntFace = CullMode.Off;
                break;
            case RenderState.CULL_FRONT:
                if (isTarget == invertFront)
                    forntFace = CullMode.Front;
                else
                    forntFace = CullMode.Back;
                break;
            case RenderState.CULL_BACK:
                if (isTarget != invertFront)
                    forntFace = CullMode.Front;
                else
                    forntFace = CullMode.Back;
                break;
        }
        return WGPUPrimitiveState.getPrimitiveState(mode, indexformat, forntFace, false);
    }
    getVertexAttributeLayout(vertexLayout) {
        return WGPUVertexBufferLayouts.getVertexBufferLayouts(vertexLayout);
    }
    getGPURenderPipeline(blendState, depthStencilState, primitiveState, vertexBufferLayouts, destTexture) {
        let data = this._getData(blendState.mapId, this.cachePool);
        data = this._getData(depthStencilState.mapId, data);
        data = this._getData(primitiveState.mapId, data);
        data = this._getData(vertexBufferLayouts.mapID, data);
        let pipline = data[destTexture.colorFormat];
        if (!pipline) {
            pipline = data[destTexture.colorFormat] = new WGPURenderPipeline(this.engine, this._shaderInstance.getWGPUPipelineLayout(), this._shaderInstance.getVertexModule(), this._shaderInstance.getFragmentModule(), vertexBufferLayouts, destTexture, blendState, depthStencilState, primitiveState);
        }
        return pipline;
    }
    uploadUniforms(shaderUniform, shaderDatas, renderEncoder) {
        var shaderUniforms = shaderUniform.getArrayData();
        shaderDatas.updateBindGroup();
        for (var i = 0, n = shaderUniforms.length; i < n; i++) {
            let shaderVariable = shaderUniforms[i];
            renderEncoder.setBindGroup(shaderVariable.location, shaderDatas.getBindGroup(shaderVariable));
        }
    }
    testCreateSceneCommandEncoder() {
        let uniformmap = LayaGL.renderOBJCreate.createGlobalUniformMap("testScene");
        this._shaderInstance.applyBindGroupLayout(uniformmap, this._sceneUniformParamsMap);
    }
    testCreateCameraCommandEncoder() {
        let uniformmap = LayaGL.renderOBJCreate.createGlobalUniformMap("testCamera");
        uniformmap.addShaderUniform(Shader3D.propertyNameToID("u_ViewProjection"), "u_ViewProjection", ShaderDataType.Matrix4x4);
        this._shaderInstance.applyBindGroupLayout(uniformmap, this._cameraUniformParamsMap);
    }
    testCreateSpriteCommandEncoder() {
        let uniformmap = LayaGL.renderOBJCreate.createGlobalUniformMap("testSprite3D");
        uniformmap.addShaderUniform(Shader3D.propertyNameToID("u_WorldMat"), "u_WorldMat", ShaderDataType.Matrix4x4);
        this._shaderInstance.applyBindGroupLayout(uniformmap, this._spriteUniformParamsMap);
    }
    testMaterialUniformParamsMap(uniformMap) {
        let destuniformMap = {};
        for (const key in uniformMap) {
            if (typeof uniformMap[key] == "object") {
                let block = (uniformMap[key]);
                for (const uniformName in block) {
                    destuniformMap[uniformName] = block[uniformName];
                }
            }
            else {
                let unifromType = uniformMap[key];
                destuniformMap[key] = unifromType;
            }
        }
        this._shaderInstance.applyBindGroupLayoutByUniformMap(destuniformMap, this._materialUniformParamsMap);
    }
}

//# sourceMappingURL=WGPURenderPipelineInstance.js.map
