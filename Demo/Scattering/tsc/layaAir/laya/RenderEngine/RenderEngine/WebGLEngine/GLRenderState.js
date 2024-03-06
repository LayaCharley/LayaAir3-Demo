import { BlendEquationSeparate } from "../../RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../../RenderEnum/BlendFactor";
import { BlendType } from "../../RenderEnum/BlendType";
import { CompareFunction } from "../../RenderEnum/CompareFunction";
import { CullMode } from "../../RenderEnum/CullMode";
import { RenderStateType } from "../../RenderEnum/RenderStateType";
import { StencilOperation } from "../../RenderEnum/StencilOperation";
export class GLRenderState {
    constructor(engine) {
        this._depthTest = true;
        this._depthMask = true;
        this._stencilTest = false;
        this._blend = false;
        this._cullFace = false;
        this._engine = engine;
        this._gl = this._engine.gl;
        this._initState();
    }
    _initState() {
        const gl = this._gl;
        this.setDepthFunc(CompareFunction.Less);
        this.setBlendEquationSeparate(BlendEquationSeparate.ADD, BlendEquationSeparate.ADD);
        this._blendEquation = BlendEquationSeparate.ADD;
        this._sFactor = BlendFactor.One;
        this._dFactor = BlendFactor.Zero;
        this._sFactorAlpha = BlendFactor.One;
        this._dFactorAlpha = BlendFactor.One;
    }
    _getBlendFactor(factor) {
        const gl = this._gl;
        switch (factor) {
            case BlendFactor.Zero:
                return gl.ZERO;
            case BlendFactor.One:
                return gl.ONE;
            case BlendFactor.SourceColor:
                return gl.SRC_COLOR;
            case BlendFactor.OneMinusSourceColor:
                return gl.ONE_MINUS_SRC_COLOR;
            case BlendFactor.DestinationColor:
                return gl.DST_COLOR;
            case BlendFactor.OneMinusDestinationColor:
                return gl.ONE_MINUS_DST_COLOR;
            case BlendFactor.SourceAlpha:
                return gl.SRC_ALPHA;
            case BlendFactor.OneMinusSourceAlpha:
                return gl.ONE_MINUS_SRC_ALPHA;
            case BlendFactor.DestinationAlpha:
                return gl.DST_ALPHA;
            case BlendFactor.OneMinusDestinationAlpha:
                return gl.ONE_MINUS_DST_ALPHA;
            case BlendFactor.SourceAlphaSaturate:
                return gl.SRC_ALPHA_SATURATE;
            case BlendFactor.BlendColor:
                return gl.CONSTANT_COLOR;
            case BlendFactor.OneMinusBlendColor:
                return gl.ONE_MINUS_CONSTANT_COLOR;
        }
    }
    _getBlendOperation(factor) {
        const gl = this._gl;
        switch (factor) {
            case BlendEquationSeparate.ADD:
                return gl.FUNC_ADD;
            case BlendEquationSeparate.SUBTRACT:
                return gl.FUNC_SUBTRACT;
            case BlendEquationSeparate.REVERSE_SUBTRACT:
                return gl.FUNC_REVERSE_SUBTRACT;
            default:
                throw "Unknow type";
        }
    }
    _getGLCompareFunction(compareFunction) {
        const gl = this._gl;
        switch (compareFunction) {
            case CompareFunction.Never:
                return gl.NEVER;
            case CompareFunction.Less:
                return gl.LESS;
            case CompareFunction.Equal:
                return gl.EQUAL;
            case CompareFunction.LessEqual:
                return gl.LEQUAL;
            case CompareFunction.Greater:
                return gl.GREATER;
            case CompareFunction.NotEqual:
                return gl.NOTEQUAL;
            case CompareFunction.GreaterEqual:
                return gl.GEQUAL;
            case CompareFunction.Always:
                return gl.ALWAYS;
        }
    }
    _getGLStencilOperation(compareFunction) {
        const gl = this._gl;
        switch (compareFunction) {
            case StencilOperation.Keep:
                return gl.KEEP;
            case StencilOperation.Zero:
                return gl.ZERO;
            case StencilOperation.Replace:
                return gl.REPLACE;
            case StencilOperation.IncrementSaturate:
                return gl.INCR;
            case StencilOperation.DecrementSaturate:
                return gl.DECR;
            case StencilOperation.Invert:
                return gl.INVERT;
            case StencilOperation.IncrementWrap:
                return gl.INCR_WRAP;
            case StencilOperation.DecrementWrap:
                return gl.DECR_WRAP;
        }
    }
    _getGLFrontfaceFactor(cullmode) {
        if (cullmode == CullMode.Front)
            return this._gl.CCW;
        else
            return this._gl.CW;
    }
    setDepthTest(value) {
        value !== this._depthTest && (this._depthTest = value, value ? this._gl.enable(this._gl.DEPTH_TEST) : this._gl.disable(this._gl.DEPTH_TEST));
    }
    setDepthMask(value) {
        value !== this._depthMask && (this._depthMask = value, this._gl.depthMask(value));
    }
    setDepthFunc(value) {
        value !== this._depthFunc && (this._depthFunc = value, this._gl.depthFunc(this._getGLCompareFunction(value)));
    }
    setStencilTest(value) {
        value !== this._stencilTest && (this._stencilTest = value, value ? this._gl.enable(this._gl.STENCIL_TEST) : this._gl.disable(this._gl.STENCIL_TEST));
    }
    setStencilMask(value) {
        value !== this._stencilMask && (this._stencilMask = value, value ? this._gl.stencilMask(0xff) : this._gl.stencilMask(0x00));
    }
    setStencilFunc(fun, ref) {
        if (fun != this._stencilFunc || ref != this._stencilRef) {
            this._stencilFunc = fun;
            this._stencilRef = ref;
            this._gl.stencilFunc(this._getGLCompareFunction(fun), ref, 0xff);
        }
    }
    setstencilOp(fail, zfail, zpass) {
        if (this._stencilOp_fail != fail || this._stencilOp_zfail != zfail || this._stencilOp_zpass != zpass) {
            this._stencilOp_fail = fail;
            this._stencilOp_zfail = zfail;
            this._stencilOp_zpass = zpass;
            this._gl.stencilOp(this._getGLStencilOperation(fail), this._getGLStencilOperation(zfail), this._getGLStencilOperation(zpass));
        }
    }
    setBlend(value) {
        value !== this._blend && (this._blend = value, value ? this._gl.enable(this._gl.BLEND) : this._gl.disable(this._gl.BLEND));
    }
    setBlendEquation(blendEquation) {
        if (blendEquation !== this._blendEquation) {
            this._blendEquation = blendEquation;
            this._blendEquationRGB = this._blendEquationAlpha = null;
            this._gl.blendEquation(this._getBlendOperation(blendEquation));
        }
    }
    setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha) {
        if (blendEquationRGB !== this._blendEquationRGB || blendEquationAlpha !== this._blendEquationAlpha) {
            this._blendEquationRGB = blendEquationRGB;
            this._blendEquationAlpha = blendEquationAlpha;
            this._blendEquation = null;
            this._gl.blendEquationSeparate(this._getBlendOperation(blendEquationRGB), this._getBlendOperation(blendEquationAlpha));
        }
    }
    setBlendFunc(sFactor, dFactor, force = false) {
        if (force || sFactor !== this._sFactor || dFactor !== this._dFactor) {
            this._sFactor = sFactor;
            this._dFactor = dFactor;
            this._sFactorRGB = null;
            this._dFactorRGB = null;
            this._sFactorAlpha = null;
            this._dFactorAlpha = null;
            this._gl.blendFunc(this._getBlendFactor(sFactor), this._getBlendFactor(dFactor));
        }
    }
    setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha) {
        if (srcRGB !== this._sFactorRGB || dstRGB !== this._dFactorRGB || srcAlpha !== this._sFactorAlpha || dstAlpha !== this._dFactorAlpha) {
            this._sFactorRGB = srcRGB;
            this._dFactorRGB = dstRGB;
            this._sFactorAlpha = srcAlpha;
            this._dFactorAlpha = dstAlpha;
            this._sFactor = null;
            this._dFactor = null;
            this._gl.blendFuncSeparate(this._getBlendFactor(srcRGB), this._getBlendFactor(dstRGB), this._getBlendFactor(srcAlpha), this._getBlendFactor(dstAlpha));
        }
    }
    setCullFace(value) {
        value !== this._cullFace && (this._cullFace = value, value ? this._gl.enable(this._gl.CULL_FACE) : this._gl.disable(this._gl.CULL_FACE));
    }
    setFrontFace(value) {
        value !== this._frontFace && (this._frontFace = value, this._gl.frontFace(this._getGLFrontfaceFactor(value)));
    }
    applyRenderStateCommand(cmd) {
        let cmdArray = cmd.cmdArray;
        cmdArray.forEach((value, key) => {
            switch (key) {
                case RenderStateType.DepthTest:
                    this.setDepthTest(value);
                    break;
                case RenderStateType.DepthMask:
                    this.setDepthMask(value);
                    break;
                case RenderStateType.DepthFunc:
                    this.setDepthFunc(value);
                    break;
                case RenderStateType.StencilTest:
                    this.setStencilTest(value);
                    break;
                case RenderStateType.StencilMask:
                    this.setStencilMask(value);
                    break;
                case RenderStateType.StencilFunc:
                    this.setStencilFunc(value[0], value[1]);
                    break;
                case RenderStateType.StencilOp:
                    this.setstencilOp(value[0], value[1], value[2]);
                    break;
                case RenderStateType.BlendType:
                    this.setBlend(value != BlendType.BLEND_DISABLE);
                    break;
                case RenderStateType.BlendEquation:
                    this.setBlendEquation(value);
                    break;
                case RenderStateType.BlendEquationSeparate:
                    this.setBlendEquationSeparate(value[0], value[1]);
                    break;
                case RenderStateType.BlendFunc:
                    this.setBlendFunc(value[0], value[1]);
                    break;
                case RenderStateType.BlendFuncSeperate:
                    this.setBlendFuncSeperate(value[0], value[1], value[2], value[3]);
                    break;
                case RenderStateType.CullFace:
                    this.setCullFace(value);
                    break;
                case RenderStateType.FrontFace:
                    this.setFrontFace(value);
                    break;
                default:
                    throw "unknow type of renderStateType";
                    break;
            }
        });
    }
}

//# sourceMappingURL=GLRenderState.js.map
