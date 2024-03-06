import { Vector3 } from "../../maths/Vector3";
import { BlendEquationSeparate } from "../RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../RenderEnum/BlendFactor";
import { BlendType } from "../RenderEnum/BlendType";
import { CompareFunction } from "../RenderEnum/CompareFunction";
import { CullMode } from "../RenderEnum/CullMode";
import { StencilOperation } from "../RenderEnum/StencilOperation";
export class RenderState {
    constructor() {
        this.cull = RenderState.CULL_BACK;
        this.blend = RenderState.BLEND_DISABLE;
        this.srcBlend = RenderState.BLENDPARAM_ONE;
        this.dstBlend = RenderState.BLENDPARAM_ZERO;
        this.srcBlendRGB = RenderState.BLENDPARAM_ONE;
        this.dstBlendRGB = RenderState.BLENDPARAM_ZERO;
        this.srcBlendAlpha = RenderState.BLENDPARAM_ONE;
        this.dstBlendAlpha = RenderState.BLENDPARAM_ZERO;
        this.blendEquation = RenderState.BLENDEQUATION_ADD;
        this.blendEquationRGB = RenderState.BLENDEQUATION_ADD;
        this.blendEquationAlpha = RenderState.BLENDEQUATION_ADD;
        this.depthTest = RenderState.DEPTHTEST_LEQUAL;
        this.depthWrite = true;
        this.stencilRef = 1;
        this.stencilTest = RenderState.STENCILTEST_OFF;
        this.stencilWrite = false;
        this.stencilOp = new Vector3(RenderState.STENCILOP_KEEP, RenderState.STENCILOP_KEEP, RenderState.STENCILOP_REPLACE);
    }
    setNull() {
        this.cull = null;
        this.blend = null;
        this.srcBlend = null;
        this.dstBlend = null;
        this.srcBlendRGB = null;
        this.dstBlendRGB = null;
        this.srcBlendAlpha = null;
        this.dstBlendAlpha = null;
        this.blendEquation = null;
        this.blendEquationRGB = null;
        this.blendEquationAlpha = null;
        this.depthTest = null;
        this.depthWrite = null;
        this.stencilRef = null;
        this.stencilTest = null;
        this.stencilWrite = null;
        this.stencilOp = null;
    }
}
RenderState.CULL_NONE = CullMode.Off;
RenderState.CULL_FRONT = CullMode.Front;
RenderState.CULL_BACK = CullMode.Back;
RenderState.BLEND_DISABLE = BlendType.BLEND_DISABLE;
RenderState.BLEND_ENABLE_ALL = BlendType.BLEND_ENABLE_ALL;
RenderState.BLEND_ENABLE_SEPERATE = BlendType.BLEND_ENABLE_SEPERATE;
RenderState.BLENDPARAM_ZERO = BlendFactor.Zero;
RenderState.BLENDPARAM_ONE = BlendFactor.One;
RenderState.BLENDPARAM_SRC_COLOR = BlendFactor.SourceColor;
RenderState.BLENDPARAM_ONE_MINUS_SRC_COLOR = BlendFactor.OneMinusSourceColor;
RenderState.BLENDPARAM_DST_COLOR = BlendFactor.DestinationColor;
RenderState.BLENDPARAM_ONE_MINUS_DST_COLOR = BlendFactor.OneMinusDestinationColor;
RenderState.BLENDPARAM_SRC_ALPHA = BlendFactor.SourceAlpha;
RenderState.BLENDPARAM_ONE_MINUS_SRC_ALPHA = BlendFactor.OneMinusSourceAlpha;
RenderState.BLENDPARAM_DST_ALPHA = BlendFactor.DestinationAlpha;
RenderState.BLENDPARAM_ONE_MINUS_DST_ALPHA = BlendFactor.OneMinusDestinationAlpha;
RenderState.BLENDPARAM_SRC_ALPHA_SATURATE = BlendFactor.SourceAlphaSaturate;
RenderState.BLENDPARAM_BLENDCOLOR = BlendFactor.BlendColor;
RenderState.BLENDPARAM_BLEND_ONEMINUS_COLOR = BlendFactor.OneMinusBlendColor;
RenderState.BLENDEQUATION_ADD = BlendEquationSeparate.ADD;
RenderState.BLENDEQUATION_SUBTRACT = BlendEquationSeparate.SUBTRACT;
RenderState.BLENDEQUATION_REVERSE_SUBTRACT = BlendEquationSeparate.REVERSE_SUBTRACT;
RenderState.BLENDEQUATION_MIN = BlendEquationSeparate.MIN;
RenderState.BLENDEQUATION_MAX = BlendEquationSeparate.MAX;
RenderState.DEPTHTEST_OFF = 0;
RenderState.DEPTHTEST_NEVER = CompareFunction.Never;
RenderState.DEPTHTEST_LESS = CompareFunction.Less;
RenderState.DEPTHTEST_EQUAL = CompareFunction.Equal;
RenderState.DEPTHTEST_LEQUAL = CompareFunction.LessEqual;
RenderState.DEPTHTEST_GREATER = CompareFunction.Greater;
RenderState.DEPTHTEST_NOTEQUAL = CompareFunction.NotEqual;
RenderState.DEPTHTEST_GEQUAL = CompareFunction.GreaterEqual;
RenderState.DEPTHTEST_ALWAYS = CompareFunction.Always;
RenderState.STENCILTEST_OFF = 0;
RenderState.STENCILTEST_NEVER = CompareFunction.Never;
RenderState.STENCILTEST_LESS = CompareFunction.Less;
RenderState.STENCILTEST_EQUAL = CompareFunction.Equal;
RenderState.STENCILTEST_LEQUAL = CompareFunction.LessEqual;
RenderState.STENCILTEST_GREATER = CompareFunction.Greater;
RenderState.STENCILTEST_NOTEQUAL = CompareFunction.NotEqual;
RenderState.STENCILTEST_GEQUAL = CompareFunction.GreaterEqual;
RenderState.STENCILTEST_ALWAYS = CompareFunction.Always;
RenderState.STENCILOP_KEEP = StencilOperation.Keep;
RenderState.STENCILOP_ZERO = StencilOperation.Zero;
RenderState.STENCILOP_REPLACE = StencilOperation.Replace;
RenderState.STENCILOP_INCR = StencilOperation.IncrementSaturate;
RenderState.STENCILOP_INCR_WRAP = StencilOperation.IncrementWrap;
RenderState.STENCILOP_DECR = StencilOperation.DecrementSaturate;
RenderState.STENCILOP_DECR_WRAP = StencilOperation.DecrementWrap;
RenderState.STENCILOP_INVERT = StencilOperation.Invert;
RenderState.Default = new RenderState();

//# sourceMappingURL=RenderState.js.map
