import { BufferUsage } from "../../RenderEngine/RenderEnum/BufferTargetType";
import { Config } from "./../../../Config";
import { BufferState } from "./BufferState";
import { IndexBuffer2D } from "./IndexBuffer2D";
import { VertexBuffer2D } from "./VertexBuffer2D";
export class Mesh2D {
    constructor(stride, vballoc, iballoc) {
        this._stride = 0;
        this.vertNum = 0;
        this.indexNum = 0;
        this._applied = false;
        this._quadNum = 0;
        this.canReuse = false;
        this._stride = stride;
        this._vb = new VertexBuffer2D(stride, BufferUsage.Dynamic);
        if (vballoc) {
            this._vb.buffer2D._resizeBuffer(vballoc, false);
        }
        else {
            Config.webGL2D_MeshAllocMaxMem && this._vb.buffer2D._resizeBuffer(64 * 1024 * stride, false);
        }
        this._ib = new IndexBuffer2D();
        if (iballoc) {
            this._ib.buffer2D._resizeBuffer(iballoc, false);
        }
    }
    createQuadIB(QuadNum) {
        this._quadNum = QuadNum;
        this._ib.buffer2D._resizeBuffer(QuadNum * 6 * 2, false);
        this._ib.buffer2D.byteLength = this._ib.buffer2D.bufferLength;
        var bd = this._ib.buffer2D._uint16Array;
        var idx = 0;
        var curvert = 0;
        for (var i = 0; i < QuadNum; i++) {
            bd[idx++] = curvert;
            bd[idx++] = curvert + 2;
            bd[idx++] = curvert + 1;
            bd[idx++] = curvert;
            bd[idx++] = curvert + 3;
            bd[idx++] = curvert + 2;
            curvert += 4;
        }
        this._ib.buffer2D.setNeedUpload();
    }
    setAttributes(attribs) {
        this._attribInfo = attribs;
        if (this._attribInfo.length % 3 != 0) {
            throw 'Mesh2D setAttributes error!';
        }
    }
    configVAO() {
        if (this._applied)
            return;
        this._applied = true;
        if (!this._vao) {
            this._vao = new BufferState();
        }
        this._vao.applyState([this._vb], this._ib);
    }
    useMesh() {
        if ((this._vao && !this._vao.isbind()) || this._ib.buffer2D._upload || this._vb.buffer2D._upload) {
            BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
        }
        this._applied || this.configVAO();
        this._ib.buffer2D._bind_upload();
        this._vb.buffer2D._bind_upload();
        this._vao.bind();
    }
    releaseMesh() { }
    destroy() {
    }
    clearVB() {
        this._vb.buffer2D.clear();
    }
}
Mesh2D._gvaoid = 0;

//# sourceMappingURL=Mesh2D.js.map
