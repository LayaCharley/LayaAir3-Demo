import { LayaGL } from "../../../layagl/LayaGL";
import { BlendType } from "../../../RenderEngine/RenderEnum/BlendType";
import { RenderStateType } from "../../../RenderEngine/RenderEnum/RenderStateType";
import { RenderStateCommand } from "../../../RenderEngine/RenderStateCommand";
export class NativeRenderStateCommand extends RenderStateCommand {
    constructor() {
        super();
        this._nativeObj = new window.conchRenderStateCommand();
    }
    addCMD(renderstate, value) {
        switch (renderstate) {
            case RenderStateType.DepthTest:
            case RenderStateType.DepthMask:
            case RenderStateType.DepthFunc:
            case RenderStateType.StencilTest:
            case RenderStateType.StencilMask:
            case RenderStateType.BlendEquation:
            case RenderStateType.CullFace:
            case RenderStateType.FrontFace:
                this._nativeObj.addCMDInt1(renderstate, value);
                break;
            case RenderStateType.StencilFunc:
            case RenderStateType.BlendFunc:
            case RenderStateType.BlendEquationSeparate:
                this._nativeObj.addCMDInt2(renderstate, value[0], value[1]);
                break;
            case RenderStateType.StencilOp:
                this._nativeObj.addCMDInt3(renderstate, value[0], value[1], value[2]);
                break;
            case RenderStateType.BlendType:
                this._nativeObj.addCMDInt1(renderstate, value != BlendType.BLEND_DISABLE ? 1 : 0);
                break;
            case RenderStateType.BlendFuncSeperate:
                this._nativeObj.addCMDInt4(renderstate, value[0], value[1], value[2], value[3]);
                break;
            default:
                throw "unknow type of renderStateType";
                break;
        }
    }
    applyCMD() {
        LayaGL.renderEngine.applyRenderStateCMD(this);
    }
    clear() {
        this._nativeObj.clear();
    }
}

//# sourceMappingURL=NativeRenderStateCommand.js.map
