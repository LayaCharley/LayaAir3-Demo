import { SubmitKey } from "./SubmitKey";
import { BlendMode } from "../canvas/BlendMode";
import { RenderStateContext } from "../../RenderEngine/RenderStateContext";
import { LayaGL } from "../../layagl/LayaGL";
import { MeshTopology } from "../../RenderEngine/RenderEnum/RenderPologyMode";
import { IndexFormat } from "../../RenderEngine/RenderEnum/IndexFormat";
import { Const } from "../../Const";
export class SubmitTarget {
    constructor() {
        this.blendType = 0;
        this._ref = 1;
        this._key = new SubmitKey();
    }
    renderSubmit() {
        this._mesh.useMesh();
        var target = this.srcRT;
        if (target) {
            this.shaderValue.texture = target._getSource();
            this.shaderValue.upload();
            this.blend();
            LayaGL.renderDrawContext.drawElements2DTemp(MeshTopology.Triangles, this._numEle, IndexFormat.UInt16, this._startIdx);
        }
        return 1;
    }
    blend() {
        if (BlendMode.activeBlendFunction !== BlendMode.fns[this.blendType]) {
            RenderStateContext.setBlend(true);
            BlendMode.fns[this.blendType]();
            BlendMode.activeBlendFunction = BlendMode.fns[this.blendType];
        }
    }
    getRenderType() {
        return 0;
    }
    releaseRender() {
        if ((--this._ref) < 1) {
            var pool = SubmitTarget.POOL;
            pool[pool._length++] = this;
        }
    }
    static create(context, mesh, sv, rt) {
        var o = SubmitTarget.POOL._length ? SubmitTarget.POOL[--SubmitTarget.POOL._length] : new SubmitTarget();
        o._mesh = mesh;
        o.srcRT = rt;
        o._startIdx = mesh.indexNum * Const.BYTES_PIDX;
        o._ref = 1;
        o._key.clear();
        o._numEle = 0;
        o.blendType = context._nBlendType;
        o._key.blendShader = o.blendType;
        o.shaderValue = sv;
        o.shaderValue.setValue(context._shader2D);
        if (context._colorFiler) {
            var ft = context._colorFiler;
            sv.defines.add(ft.type);
            sv.colorMat = ft._mat;
            sv.colorAlpha = ft._alpha;
        }
        return o;
    }
}
SubmitTarget.POOL = [];
{
    SubmitTarget.POOL._length = 0;
}

//# sourceMappingURL=SubmitTarget.js.map
