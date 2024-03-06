import { Matrix } from "../../maths/Matrix";
import { SubmitBase } from "../submit/SubmitBase";
import { MeshQuadTexture } from "../utils/MeshQuadTexture";
import { MeshTexture } from "../utils/MeshTexture";
import { MeshVG } from "../utils/MeshVG";
import { NativeWebGLCacheAsNormalCanvas } from "./NativeWebGLCacheAsNormalCanvas";
export class WebGLCacheAsNormalCanvas {
    constructor(ctx, sp) {
        this.submitStartPos = 0;
        this.submitEndPos = 0;
        this.touches = [];
        this.submits = [];
        this.sprite = null;
        this.meshlist = [];
        this.cachedClipInfo = new Matrix();
        this.oldTx = 0;
        this.oldTy = 0;
        this.invMat = new Matrix();
        this.context = ctx;
        this.sprite = sp;
        ctx._globalClipMatrix.copyTo(this.cachedClipInfo);
    }
    startRec() {
        let context = this.context;
        if (context._charSubmitCache && context._charSubmitCache._enable) {
            context._charSubmitCache.enable(false, context);
            context._charSubmitCache.enable(true, context);
        }
        context._incache = true;
        this.touches.length = 0;
        context.touches = this.touches;
        context._globalClipMatrix.copyTo(this.cachedClipInfo);
        this.submits.length = 0;
        this.submitStartPos = context._submits._length;
        for (var i = 0, sz = this.meshlist.length; i < sz; i++) {
            var curm = this.meshlist[i];
            curm.canReuse ? (curm.releaseMesh()) : (curm.destroy());
        }
        this.meshlist.length = 0;
        this._mesh = MeshQuadTexture.getAMesh(false);
        this._pathMesh = MeshVG.getAMesh(false);
        this._triangleMesh = MeshTexture.getAMesh(false);
        this.meshlist.push(this._mesh);
        this.meshlist.push(this._pathMesh);
        this.meshlist.push(this._triangleMesh);
        context._curSubmit = SubmitBase.RENDERBASE;
        this._oldMesh = context._mesh;
        this._oldPathMesh = context._pathMesh;
        this._oldTriMesh = context._triangleMesh;
        this._oldMeshList = context.meshlist;
        context._mesh = this._mesh;
        context._pathMesh = this._pathMesh;
        context._triangleMesh = this._triangleMesh;
        context.meshlist = this.meshlist;
        this.oldTx = context._curMat.tx;
        this.oldTy = context._curMat.ty;
        context._curMat.tx = 0;
        context._curMat.ty = 0;
        context._curMat.copyTo(this.invMat);
        this.invMat.invert();
    }
    endRec() {
        let context = this.context;
        if (context._charSubmitCache && context._charSubmitCache._enable) {
            context._charSubmitCache.enable(false, context);
            context._charSubmitCache.enable(true, context);
        }
        var parsubmits = context._submits;
        this.submitEndPos = parsubmits._length;
        var num = this.submitEndPos - this.submitStartPos;
        for (var i = 0; i < num; i++) {
            this.submits.push(parsubmits[this.submitStartPos + i]);
        }
        parsubmits._length -= num;
        context._mesh = this._oldMesh;
        context._pathMesh = this._oldPathMesh;
        context._triangleMesh = this._oldTriMesh;
        context.meshlist = this._oldMeshList;
        context._curSubmit = SubmitBase.RENDERBASE;
        context._curMat.tx = this.oldTx;
        context._curMat.ty = this.oldTy;
        context.touches = null;
        context._incache = false;
    }
    isCacheValid() {
        var curclip = this.context._globalClipMatrix;
        if (curclip.a != this.cachedClipInfo.a || curclip.b != this.cachedClipInfo.b || curclip.c != this.cachedClipInfo.c
            || curclip.d != this.cachedClipInfo.d || curclip.tx != this.cachedClipInfo.tx || curclip.ty != this.cachedClipInfo.ty)
            return false;
        return true;
    }
    isTextNeedRestore() {
        var textNeedRestore = false;
        var charRIs = this.touches;
        if (charRIs) {
            for (var ci = 0; ci < charRIs.length; ci++) {
                if (charRIs[ci].deleted) {
                    textNeedRestore = true;
                    break;
                }
            }
        }
        return textNeedRestore;
    }
    flushsubmit() {
        var curSubmit = SubmitBase.RENDERBASE;
        this.submits.forEach(function (subm) {
            if (subm == SubmitBase.RENDERBASE)
                return;
            SubmitBase.preRender = curSubmit;
            curSubmit = subm;
            subm.renderSubmit();
        });
    }
    releaseMem() {
    }
}
WebGLCacheAsNormalCanvas.matI = new Matrix();
if (window.conch && !window.conchConfig.conchWebGL) {
    WebGLCacheAsNormalCanvas = NativeWebGLCacheAsNormalCanvas;
}

//# sourceMappingURL=WebGLCacheAsNormalCanvas.js.map
