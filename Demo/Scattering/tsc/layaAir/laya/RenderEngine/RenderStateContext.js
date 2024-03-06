import { LayaGL } from "../layagl/LayaGL";
export class RenderStateContext {
    static __init__() {
        RenderStateContext.DepthTestCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.DepthMaskCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.DepthFuncCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.StencilTestCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.StencilMaskCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.StencilFuncCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.stencilOpCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.BlendCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.BlendEquationCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.BlendEquationSeparateCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.BlendFuncCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.BlendFuncSeperateCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.CullFaceCMD = LayaGL.renderEngine.createRenderStateComand();
        RenderStateContext.FrontFaceCMD = LayaGL.renderEngine.createRenderStateComand();
    }
    static setDepthTest(value) {
        LayaGL.renderEngine._GLRenderState.setDepthTest(value);
    }
    static setDepthMask(value) {
        LayaGL.renderEngine._GLRenderState.setDepthMask(value);
    }
    static setDepthFunc(value) {
        LayaGL.renderEngine._GLRenderState.setDepthFunc(value);
    }
    static setStencilTest(value) {
        LayaGL.renderEngine._GLRenderState.setStencilTest(value);
    }
    static setStencilMask(value) {
        LayaGL.renderEngine._GLRenderState.setStencilMask(value);
    }
    static setStencilFunc(fun, ref) {
        LayaGL.renderEngine._GLRenderState.setStencilFunc(fun, ref);
    }
    static setstencilOp(fail, zfail, zpass) {
        LayaGL.renderEngine._GLRenderState.setstencilOp(fail, zfail, zpass);
    }
    static setBlend(value) {
        LayaGL.renderEngine._GLRenderState.setBlend(value);
    }
    static setBlendEquation(blendEquation) {
        LayaGL.renderEngine._GLRenderState.setBlendEquation(blendEquation);
    }
    static setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha) {
        LayaGL.renderEngine._GLRenderState.setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha);
    }
    static setBlendFunc(sFactor, dFactor) {
        LayaGL.renderEngine._GLRenderState.setBlendFunc(sFactor, dFactor);
    }
    static setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha) {
        LayaGL.renderEngine._GLRenderState.setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha);
    }
    static setCullFace(value) {
        LayaGL.renderEngine._GLRenderState.setCullFace(value);
    }
    static setFrontFace(value) {
        LayaGL.renderEngine._GLRenderState.setFrontFace(value);
    }
}
RenderStateContext.stencilFuncArray = new Array(2);
RenderStateContext.blendEquationSeparateArray = new Array(2);
RenderStateContext.blenfunArray = new Array(2);
RenderStateContext.blendFuncSeperateArray = new Array(4);
RenderStateContext.stencilOpArray = new Array(3);

//# sourceMappingURL=RenderStateContext.js.map
