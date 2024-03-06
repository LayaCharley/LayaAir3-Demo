import { SubmitBase } from "./SubmitBase";
import { BlendMode } from "../canvas/BlendMode";
import { BaseShader } from "../shader/BaseShader";
import { ShaderDefines2D } from "../shader/d2/ShaderDefines2D";
import { RenderStateContext } from "../../RenderEngine/RenderStateContext";
import { LayaGL } from "../../layagl/LayaGL";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { Const } from "../../Const";
export class SubmitTexture extends SubmitBase {
    constructor(renderType = SubmitBase.TYPE_2D) {
        super(renderType);
    }
    releaseRender() {
        if ((--this._ref) < 1) {
            SubmitTexture.POOL[SubmitTexture._poolSize++] = this;
            this.shaderValue.release();
            this._mesh = null;
            this._parent && (this._parent.releaseRender(), this._parent = null);
        }
    }
    renderSubmit() {
        if (this._numEle === 0)
            return 1;
        var tex = this.shaderValue.textureHost;
        if (tex) {
            var source = tex ? tex._getSource() : null;
            if (!source)
                return 1;
        }
        this._mesh.useMesh();
        this.shaderValue.updateShaderData();
        var lastSubmit = SubmitBase.preRender;
        var prekey = SubmitBase.preRender._key;
        if (this._key.blendShader === 0 && (this._key.submitType === prekey.submitType && this._key.blendShader === prekey.blendShader) && BaseShader.activeShader &&
            SubmitBase.preRender.clipInfoID == this.clipInfoID &&
            lastSubmit.shaderValue.defines._value === this.shaderValue.defines._value &&
            (this.shaderValue.defines._value & ShaderDefines2D.NOOPTMASK) == 0) {
            BaseShader.activeShader.uploadTexture2D(source);
        }
        else {
            if (BlendMode.activeBlendFunction !== this._blendFn) {
                RenderStateContext.setBlend(true);
                this._blendFn();
                BlendMode.activeBlendFunction = this._blendFn;
            }
            this.shaderValue.texture = source;
            this.shaderValue.upload();
        }
        LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, this._numEle, IndexFormat.UInt16, this._startIdx);
        return 1;
    }
    static create(context, mesh, sv) {
        var o = SubmitTexture._poolSize ? SubmitTexture.POOL[--SubmitTexture._poolSize] : new SubmitTexture(SubmitBase.TYPE_TEXTURE);
        o._mesh = mesh;
        o._key.clear();
        o._key.submitType = SubmitBase.KEY_DRAWTEXTURE;
        o._ref = 1;
        o._startIdx = mesh.indexNum * Const.BYTES_PIDX;
        o._numEle = 0;
        var blendType = context._nBlendType;
        o._key.blendShader = blendType;
        o._blendFn = context._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
        o.shaderValue = sv;
        if (context._colorFiler) {
            var ft = context._colorFiler;
            sv.defines.add(ft.type);
            sv.colorMat = ft._mat;
            sv.colorAlpha = ft._alpha;
        }
        return o;
    }
}
SubmitTexture._poolSize = 0;
SubmitTexture.POOL = [];

//# sourceMappingURL=SubmitTexture.js.map
