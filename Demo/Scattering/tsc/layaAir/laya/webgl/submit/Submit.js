import { Const } from "../../Const";
import { LayaGL } from "../../layagl/LayaGL";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { RenderStateContext } from "../../RenderEngine/RenderStateContext";
import { BlendMode } from "../canvas/BlendMode";
import { SubmitBase } from "./SubmitBase";
export class Submit extends SubmitBase {
    constructor(renderType = SubmitBase.TYPE_2D) {
        super(renderType);
    }
    renderSubmit() {
        if (this._numEle === 0 || !this._mesh || this._numEle == 0)
            return 1;
        var _tex = this.shaderValue.textureHost;
        if (_tex) {
            var source = _tex._getSource();
            if (!source)
                return 1;
            this.shaderValue.texture = source;
        }
        this._mesh.useMesh();
        this.shaderValue.upload();
        if (BlendMode.activeBlendFunction !== this._blendFn) {
            RenderStateContext.setBlend(true);
            this._blendFn();
            BlendMode.activeBlendFunction = this._blendFn;
        }
        LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, this._numEle, IndexFormat.UInt16, this._startIdx);
        return 1;
    }
    releaseRender() {
        if (SubmitBase.RENDERBASE == this)
            return;
        if ((--this._ref) < 1) {
            Submit.POOL[Submit._poolSize++] = this;
            this.shaderValue.release();
            this.shaderValue = null;
            this._mesh = null;
            this._parent && (this._parent.releaseRender(), this._parent = null);
        }
    }
    static create(context, mesh, sv) {
        var o = Submit._poolSize ? Submit.POOL[--Submit._poolSize] : new Submit();
        o._ref = 1;
        o._mesh = mesh;
        o._key.clear();
        o._startIdx = mesh.indexNum * Const.BYTES_PIDX;
        o._numEle = 0;
        var blendType = context._nBlendType;
        o._blendFn = context._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
        o.shaderValue = sv;
        o.shaderValue.setValue(context._shader2D);
        var filters = context._shader2D.filters;
        filters && o.shaderValue.setFilters(filters);
        return o;
    }
    static createShape(ctx, mesh, numEle, sv) {
        var o = Submit._poolSize ? Submit.POOL[--Submit._poolSize] : (new Submit());
        o._mesh = mesh;
        o._numEle = numEle;
        o._startIdx = mesh.indexNum * 2;
        o._ref = 1;
        o.shaderValue = sv;
        o.shaderValue.setValue(ctx._shader2D);
        var blendType = ctx._nBlendType;
        o._key.blendShader = blendType;
        o._blendFn = ctx._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
        return o;
    }
}
Submit._poolSize = 0;
Submit.POOL = [];

//# sourceMappingURL=Submit.js.map
