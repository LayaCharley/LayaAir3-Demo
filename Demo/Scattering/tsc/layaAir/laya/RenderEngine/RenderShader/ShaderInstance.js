import { Config3D } from "../../../Config3D";
import { CommandEncoder } from "../../layagl/CommandEncoder";
import { LayaGL } from "../../layagl/LayaGL";
import { CullMode } from "../../RenderEngine/RenderEnum/CullMode";
import { Shader3D } from "../../RenderEngine/RenderShader/Shader3D";
import { RenderParams } from "../RenderEnum/RenderParams";
import { GLSLCodeGenerator } from "./GLSLCodeGenerator";
import { RenderStateContext } from "../../RenderEngine/RenderStateContext";
import { Stat } from "../../utils/Stat";
import { RenderState } from "./RenderState";
export class ShaderInstance {
    constructor(shaderProcessInfo, shaderPass) {
        this._customUniformParamsMap = [];
        this._uploadMark = -1;
        this._uploadRenderType = -1;
        shaderProcessInfo.is2D ? this._webGLShaderLanguageProcess2D(shaderProcessInfo.defineString, shaderProcessInfo.attributeMap, shaderProcessInfo.uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps)
            : this._webGLShaderLanguageProcess3D(shaderProcessInfo.defineString, shaderProcessInfo.attributeMap, shaderProcessInfo.uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps);
        if (this._renderShaderInstance._complete) {
            this._shaderPass = shaderPass;
            this._create();
        }
    }
    get complete() {
        return this._renderShaderInstance._complete;
    }
    _webGLShaderLanguageProcess3D(defineString, attributeMap, uniformMap, VS, FS) {
        var clusterSlices = Config3D.lightClusterCount;
        var defMap = {};
        var vertexHead;
        var fragmentHead;
        var defineStr = "";
        let useUniformBlock = Config3D._uniformBlock;
        let attributeglsl = GLSLCodeGenerator.glslAttributeString(attributeMap);
        let uniformglsl = GLSLCodeGenerator.glslUniformString(uniformMap, useUniformBlock);
        if (LayaGL.renderEngine.isWebGL2) {
            defineString.push("GRAPHICS_API_GLES3");
            vertexHead =
                `#version 300 es
#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
    precision highp int;
    precision highp sampler2DArray;
#else
    precision mediump float;
    precision mediump int;
    precision mediump sampler2DArray;
#endif
layout(std140, column_major) uniform;
#define attribute in
#define varying out
#define textureCube texture
#define texture2D texture
${attributeglsl}
${uniformglsl}
`;
            fragmentHead =
                `#version 300 es
#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
    precision highp int;
    precision highp sampler2DArray;
#else
    precision mediump float;
    precision mediump int;
    precision mediump sampler2DArray;
#endif
layout(std140, column_major) uniform;
#define varying in
out highp vec4 pc_fragColor;
#define gl_FragColor pc_fragColor
#define gl_FragDepthEXT gl_FragDepth
#define texture2D texture
#define textureCube texture
#define texture2DProj textureProj
#define texture2DLodEXT textureLod
#define texture2DProjLodEXT textureProjLod
#define textureCubeLodEXT textureLod
#define texture2DGradEXT textureGrad
#define texture2DProjGradEXT textureProjGrad
#define textureCubeGradEXT textureGrad
${uniformglsl}`;
        }
        else {
            vertexHead =
                `#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
    precision highp int;
#else
    precision mediump float;
    precision mediump int;
#endif
${attributeglsl}
${uniformglsl}`;
            fragmentHead =
                `#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif

#ifdef GL_OES_standard_derivatives
	#extension GL_OES_standard_derivatives : enable 
#endif

#if defined(GL_FRAGMENT_PRECISION_HIGH)
    precision highp float;
    precision highp int;
#else
    precision mediump float;
    precision mediump int;
#endif

#if !defined(GL_EXT_shader_texture_lod)
    #define texture1DLodEXT texture1D
    #define texture2DLodEXT texture2D
    #define texture2DProjLodEXT texture2DProj
    #define texture3DLodEXT texture3D
    #define textureCubeLodEXT textureCube
#endif
${uniformglsl}`;
        }
        defineStr += "#define MAX_LIGHT_COUNT " + Config3D.maxLightCount + "\n";
        defineStr += "#define MAX_LIGHT_COUNT_PER_CLUSTER " + Config3D._maxAreaLightCountPerClusterAverage + "\n";
        defineStr += "#define CLUSTER_X_COUNT " + clusterSlices.x + "\n";
        defineStr += "#define CLUSTER_Y_COUNT " + clusterSlices.y + "\n";
        defineStr += "#define CLUSTER_Z_COUNT " + clusterSlices.z + "\n";
        defineStr += "#define MORPH_MAX_COUNT " + Config3D.maxMorphTargetCount + "\n";
        defineStr += "#define SHADER_CAPAILITY_LEVEL " + LayaGL.renderEngine.getParams(RenderParams.SHADER_CAPAILITY_LEVEL) + "\n";
        for (var i = 0, n = defineString.length; i < n; i++) {
            var def = defineString[i];
            defineStr += "#define " + def + "\n";
            defMap[def] = true;
        }
        var vs = VS.toscript(defMap, []);
        var vsVersion = '';
        if (vs[0].indexOf('#version') == 0) {
            vsVersion = vs[0] + '\n';
            vs.shift();
        }
        var ps = FS.toscript(defMap, []);
        var psVersion = '';
        if (ps[0].indexOf('#version') == 0) {
            psVersion = ps[0] + '\n';
            ps.shift();
        }
        ;
        let dstVS = vsVersion + vertexHead + defineStr + vs.join('\n');
        let detFS = psVersion + fragmentHead + defineStr + ps.join('\n');
        this._renderShaderInstance = LayaGL.renderEngine.createShaderInstance(dstVS, detFS, attributeMap);
    }
    _webGLShaderLanguageProcess2D(defineString, attributeMap, uniformMap, VS, FS) {
        var defMap = {};
        var vertexHead;
        var fragmentHead;
        var defineStr = "";
        if (LayaGL.renderEngine.isWebGL2) {
            vertexHead =
                `#version 300 es\n
                #define attribute in
                #define varying out
                #define textureCube texture
                #define texture2D texture\n`;
            fragmentHead =
                `#version 300 es\n
                #define varying in
                out highp vec4 pc_fragColor;
                #define gl_FragColor pc_fragColor
                #define gl_FragDepthEXT gl_FragDepth
                #define texture2D texture
                #define textureCube texture
                #define texture2DProj textureProj
                #define texture2DLodEXT textureLod
                #define texture2DProjLodEXT textureProjLod
                #define textureCubeLodEXT textureLod
                #define texture2DGradEXT textureGrad
                #define texture2DProjGradEXT textureProjGrad
                #define textureCubeGradEXT textureGrad\n`;
        }
        else {
            vertexHead = "";
            fragmentHead =
                `#ifdef GL_EXT_shader_texture_lod
                    #extension GL_EXT_shader_texture_lod : enable
                #endif
                #if !defined(GL_EXT_shader_texture_lod)
                    #define texture1DLodEXT texture1D
                    #define texture2DLodEXT texture2D
                    #define texture2DProjLodEXT texture2DProj
                    #define texture3DLodEXT texture3D
                    #define textureCubeLodEXT textureCube
                #endif\n`;
        }
        for (var i = 0, n = defineString.length; i < n; i++) {
            var def = defineString[i];
            defineStr += "#define " + def + "\n";
            defMap[def] = true;
        }
        var vs = VS.toscript(defMap, []);
        var vsVersion = '';
        if (vs[0].indexOf('#version') == 0) {
            vsVersion = vs[0] + '\n';
            vs.shift();
        }
        var ps = FS.toscript(defMap, []);
        var psVersion = '';
        if (ps[0].indexOf('#version') == 0) {
            psVersion = ps[0] + '\n';
            ps.shift();
        }
        let dstVS = vsVersion + vertexHead + defineStr + vs.join('\n');
        let detFS = psVersion + fragmentHead + defineStr + ps.join('\n');
        this._renderShaderInstance = LayaGL.renderEngine.createShaderInstance(dstVS, detFS, attributeMap);
    }
    _create() {
        this._sceneUniformParamsMap = new CommandEncoder();
        this._cameraUniformParamsMap = new CommandEncoder();
        this._spriteUniformParamsMap = new CommandEncoder();
        this._materialUniformParamsMap = new CommandEncoder();
        const sceneParams = LayaGL.renderOBJCreate.createGlobalUniformMap("Scene3D");
        const cameraParams = LayaGL.renderOBJCreate.createGlobalUniformMap("BaseCamera");
        const customParams = LayaGL.renderOBJCreate.createGlobalUniformMap("Custom");
        let i, n;
        let data = this._renderShaderInstance.getUniformMap();
        for (i = 0, n = data.length; i < n; i++) {
            let one = data[i];
            if (sceneParams.hasPtrID(one.dataOffset)) {
                this._sceneUniformParamsMap.addShaderUniform(one);
            }
            else if (cameraParams.hasPtrID(one.dataOffset)) {
                this._cameraUniformParamsMap.addShaderUniform(one);
            }
            else if (this.hasSpritePtrID(one.dataOffset)) {
                this._spriteUniformParamsMap.addShaderUniform(one);
            }
            else if (customParams.hasPtrID(one.dataOffset)) {
                this._customUniformParamsMap || (this._customUniformParamsMap = []);
                this._customUniformParamsMap[one.dataOffset] = one;
            }
            else {
                this._materialUniformParamsMap.addShaderUniform(one);
            }
        }
    }
    hasSpritePtrID(dataOffset) {
        let commap = this._shaderPass.nodeCommonMap;
        if (!commap) {
            return false;
        }
        else {
            for (let i = 0, n = commap.length; i < n; i++) {
                if (LayaGL.renderOBJCreate.createGlobalUniformMap(commap[i]).hasPtrID(dataOffset))
                    return true;
            }
            return false;
        }
    }
    _disposeResource() {
        this._renderShaderInstance.destroy();
        this._sceneUniformParamsMap = null;
        this._cameraUniformParamsMap = null;
        this._spriteUniformParamsMap = null;
        this._materialUniformParamsMap = null;
        this._customUniformParamsMap = null;
        this._uploadMaterial = null;
        this._uploadRender = null;
        this._uploadCameraShaderValue = null;
        this._uploadScene = null;
    }
    bind() {
        return this._renderShaderInstance.bind();
    }
    uploadUniforms(shaderUniform, shaderDatas, uploadUnTexture) {
        Stat.uploadUniform += LayaGL.renderEngine.uploadUniforms(this._renderShaderInstance, shaderUniform, shaderDatas, uploadUnTexture);
    }
    uploadRenderStateBlendDepth(shaderDatas) {
        if (this._shaderPass.statefirst)
            this.uploadRenderStateBlendDepthByShader(shaderDatas);
        else
            this.uploadRenderStateBlendDepthByMaterial(shaderDatas);
    }
    uploadRenderStateBlendDepthByShader(shaderDatas) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
        var datas = shaderDatas.getData();
        var renderState = this._shaderPass.renderState;
        var depthWrite = (_b = ((_a = renderState.depthWrite) !== null && _a !== void 0 ? _a : datas[Shader3D.DEPTH_WRITE])) !== null && _b !== void 0 ? _b : RenderState.Default.depthWrite;
        RenderStateContext.setDepthMask(depthWrite);
        if (depthTest === RenderState.DEPTHTEST_OFF)
            RenderStateContext.setDepthTest(false);
        else {
            RenderStateContext.setDepthTest(true);
            var depthTest = (_d = ((_c = renderState.depthTest) !== null && _c !== void 0 ? _c : datas[Shader3D.DEPTH_TEST])) !== null && _d !== void 0 ? _d : RenderState.Default.depthTest;
            RenderStateContext.setDepthFunc(depthTest);
        }
        var stencilWrite = (_f = ((_e = renderState.stencilWrite) !== null && _e !== void 0 ? _e : datas[Shader3D.STENCIL_WRITE])) !== null && _f !== void 0 ? _f : RenderState.Default.stencilWrite;
        var stencilTest = (_h = ((_g = renderState.stencilTest) !== null && _g !== void 0 ? _g : datas[Shader3D.STENCIL_TEST])) !== null && _h !== void 0 ? _h : RenderState.Default.stencilTest;
        RenderStateContext.setStencilMask(stencilWrite);
        if (stencilWrite) {
            var stencilOp = (_k = ((_j = renderState.stencilOp) !== null && _j !== void 0 ? _j : datas[Shader3D.STENCIL_Op])) !== null && _k !== void 0 ? _k : RenderState.Default.stencilOp;
            RenderStateContext.setstencilOp(stencilOp.x, stencilOp.y, stencilOp.z);
        }
        if (stencilTest == RenderState.STENCILTEST_OFF) {
            RenderStateContext.setStencilTest(false);
        }
        else {
            var stencilRef = (_m = ((_l = renderState.stencilRef) !== null && _l !== void 0 ? _l : datas[Shader3D.STENCIL_Ref])) !== null && _m !== void 0 ? _m : RenderState.Default.stencilRef;
            RenderStateContext.setStencilTest(true);
            RenderStateContext.setStencilFunc(stencilTest, stencilRef);
        }
        var blend = (_p = ((_o = renderState.blend) !== null && _o !== void 0 ? _o : datas[Shader3D.BLEND])) !== null && _p !== void 0 ? _p : RenderState.Default.blend;
        switch (blend) {
            case RenderState.BLEND_DISABLE:
                RenderStateContext.setBlend(false);
                break;
            case RenderState.BLEND_ENABLE_ALL:
                var blendEquation = (_r = ((_q = renderState.blendEquation) !== null && _q !== void 0 ? _q : datas[Shader3D.BLEND_EQUATION])) !== null && _r !== void 0 ? _r : RenderState.Default.blendEquation;
                var srcBlend = (_t = ((_s = renderState.srcBlend) !== null && _s !== void 0 ? _s : datas[Shader3D.BLEND_SRC])) !== null && _t !== void 0 ? _t : RenderState.Default.srcBlend;
                var dstBlend = (_v = ((_u = renderState.dstBlend) !== null && _u !== void 0 ? _u : datas[Shader3D.BLEND_DST])) !== null && _v !== void 0 ? _v : RenderState.Default.dstBlend;
                RenderStateContext.setBlend(true);
                RenderStateContext.setBlendEquation(blendEquation);
                RenderStateContext.setBlendFunc(srcBlend, dstBlend);
                break;
            case RenderState.BLEND_ENABLE_SEPERATE:
                var blendEquationRGB = (_x = ((_w = renderState.blendEquationRGB) !== null && _w !== void 0 ? _w : datas[Shader3D.BLEND_EQUATION_RGB])) !== null && _x !== void 0 ? _x : RenderState.Default.blendEquationRGB;
                var blendEquationAlpha = (_z = ((_y = renderState.blendEquationAlpha) !== null && _y !== void 0 ? _y : datas[Shader3D.BLEND_EQUATION_ALPHA])) !== null && _z !== void 0 ? _z : RenderState.Default.blendEquationAlpha;
                var srcRGB = (_1 = ((_0 = renderState.srcBlendRGB) !== null && _0 !== void 0 ? _0 : datas[Shader3D.BLEND_SRC_RGB])) !== null && _1 !== void 0 ? _1 : RenderState.Default.srcBlendRGB;
                var dstRGB = (_3 = ((_2 = renderState.dstBlendRGB) !== null && _2 !== void 0 ? _2 : datas[Shader3D.BLEND_DST_RGB])) !== null && _3 !== void 0 ? _3 : RenderState.Default.dstBlendRGB;
                var srcAlpha = (_5 = ((_4 = renderState.srcBlendAlpha) !== null && _4 !== void 0 ? _4 : datas[Shader3D.BLEND_SRC_ALPHA])) !== null && _5 !== void 0 ? _5 : RenderState.Default.srcBlendAlpha;
                var dstAlpha = (_7 = ((_6 = renderState.dstBlendAlpha) !== null && _6 !== void 0 ? _6 : datas[Shader3D.BLEND_DST_ALPHA])) !== null && _7 !== void 0 ? _7 : RenderState.Default.dstBlendAlpha;
                RenderStateContext.setBlend(true);
                RenderStateContext.setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha);
                RenderStateContext.setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha);
                break;
        }
    }
    uploadRenderStateBlendDepthByMaterial(shaderDatas) {
        var datas = shaderDatas.getData();
        var depthWrite = datas[Shader3D.DEPTH_WRITE];
        depthWrite = depthWrite !== null && depthWrite !== void 0 ? depthWrite : false;
        RenderStateContext.setDepthMask(depthWrite);
        var depthTest = datas[Shader3D.DEPTH_TEST];
        depthTest = depthTest !== null && depthTest !== void 0 ? depthTest : RenderState.Default.depthTest;
        if (depthTest === RenderState.DEPTHTEST_OFF)
            RenderStateContext.setDepthTest(false);
        else {
            RenderStateContext.setDepthTest(true);
            RenderStateContext.setDepthFunc(depthTest);
        }
        var stencilWrite = datas[Shader3D.STENCIL_WRITE];
        stencilWrite = stencilWrite !== null && stencilWrite !== void 0 ? stencilWrite : false;
        var stencilTest = datas[Shader3D.STENCIL_TEST];
        stencilTest = stencilTest !== null && stencilTest !== void 0 ? stencilTest : RenderState.Default.stencilTest;
        RenderStateContext.setStencilMask(stencilWrite);
        if (stencilWrite) {
            var stencilOp = datas[Shader3D.STENCIL_Op];
            stencilOp = stencilOp !== null && stencilOp !== void 0 ? stencilOp : RenderState.Default.stencilOp;
            RenderStateContext.setstencilOp(stencilOp.x, stencilOp.y, stencilOp.z);
        }
        if (stencilTest == RenderState.STENCILTEST_OFF) {
            RenderStateContext.setStencilTest(false);
        }
        else {
            var stencilRef = datas[Shader3D.STENCIL_Ref];
            stencilRef = stencilRef !== null && stencilRef !== void 0 ? stencilRef : RenderState.Default.stencilRef;
            RenderStateContext.setStencilTest(true);
            RenderStateContext.setStencilFunc(stencilTest, stencilRef);
        }
        var blend = datas[Shader3D.BLEND];
        switch (blend) {
            case RenderState.BLEND_DISABLE:
                RenderStateContext.setBlend(false);
                break;
            case RenderState.BLEND_ENABLE_ALL:
                var blendEquation = datas[Shader3D.BLEND_EQUATION];
                var srcBlend = datas[Shader3D.BLEND_SRC];
                var dstBlend = datas[Shader3D.BLEND_DST];
                blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : RenderState.Default.blendEquation;
                srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : RenderState.Default.srcBlend;
                dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : RenderState.Default.dstBlend;
                RenderStateContext.setBlend(true);
                RenderStateContext.setBlendEquation(blendEquation);
                RenderStateContext.setBlendFunc(srcBlend, dstBlend);
                break;
            case RenderState.BLEND_ENABLE_SEPERATE:
                var blendEquationRGB = datas[Shader3D.BLEND_EQUATION_RGB];
                var blendEquationAlpha = datas[Shader3D.BLEND_EQUATION_ALPHA];
                var srcRGB = datas[Shader3D.BLEND_SRC_RGB];
                var dstRGB = datas[Shader3D.BLEND_DST_RGB];
                var srcAlpha = datas[Shader3D.BLEND_SRC_ALPHA];
                var dstAlpha = datas[Shader3D.BLEND_DST_ALPHA];
                blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : RenderState.Default.blendEquationRGB;
                blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : RenderState.Default.blendEquationAlpha;
                srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : RenderState.Default.srcBlendRGB;
                dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : RenderState.Default.dstBlendRGB;
                srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : RenderState.Default.srcBlendAlpha;
                dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : RenderState.Default.dstBlendAlpha;
                RenderStateContext.setBlend(true);
                RenderStateContext.setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha);
                RenderStateContext.setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha);
                break;
        }
    }
    uploadRenderStateFrontFace(shaderDatas, isTarget, invertFront) {
        var _a;
        var renderState = this._shaderPass.renderState;
        var datas = shaderDatas.getData();
        var cull = datas[Shader3D.CULL];
        if (this._shaderPass.statefirst) {
            cull = (_a = renderState.cull) !== null && _a !== void 0 ? _a : cull;
        }
        cull = cull !== null && cull !== void 0 ? cull : RenderState.Default.cull;
        var forntFace;
        switch (cull) {
            case RenderState.CULL_NONE:
                RenderStateContext.setCullFace(false);
                if (isTarget != invertFront)
                    forntFace = CullMode.Front;
                else
                    forntFace = CullMode.Back;
                RenderStateContext.setFrontFace(forntFace);
                break;
            case RenderState.CULL_FRONT:
                RenderStateContext.setCullFace(true);
                if (isTarget == invertFront)
                    forntFace = CullMode.Front;
                else
                    forntFace = CullMode.Back;
                RenderStateContext.setFrontFace(forntFace);
                break;
            case RenderState.CULL_BACK:
                RenderStateContext.setCullFace(true);
                if (isTarget != invertFront)
                    forntFace = CullMode.Front;
                else
                    forntFace = CullMode.Back;
                RenderStateContext.setFrontFace(forntFace);
                break;
        }
    }
    uploadCustomUniform(index, data) {
        LayaGL.renderEngine.uploadCustomUniforms(this._renderShaderInstance, this._customUniformParamsMap, index, data);
    }
}

//# sourceMappingURL=ShaderInstance.js.map
