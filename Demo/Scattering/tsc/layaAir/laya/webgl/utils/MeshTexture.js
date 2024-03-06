import { VertexDeclaration } from "../../RenderEngine/VertexDeclaration";
import { VertexElement } from "../../renders/VertexElement";
import { VertexElementFormat } from "../../renders/VertexElementFormat";
import { Mesh2D } from "./Mesh2D";
export class MeshTexture extends Mesh2D {
    constructor() {
        super(MeshTexture.const_stride, 4, 4);
        this.canReuse = true;
        this.setAttributes(MeshTexture._fixattriInfo);
        if (!MeshTexture.VertexDeclarition)
            MeshTexture.VertexDeclarition = new VertexDeclaration(24, [
                new VertexElement(0, VertexElementFormat.Vector4, 0),
                new VertexElement(16, VertexElementFormat.Byte4, 1),
                new VertexElement(20, VertexElementFormat.Byte4, 2),
            ]);
        this._vb.vertexDeclaration = MeshTexture.VertexDeclarition;
    }
    static __init__() {
        MeshTexture._fixattriInfo = [5126, 4, 0,
            5121, 4, 16,
            5121, 4, 20];
    }
    static getAMesh(mainctx) {
        var ret;
        if (MeshTexture._POOL.length) {
            ret = MeshTexture._POOL.pop();
        }
        else
            ret = new MeshTexture();
        mainctx && ret._vb.buffer2D._resizeBuffer(64 * 1024 * MeshTexture.const_stride, false);
        return ret;
    }
    addData(vertices, uvs, idx, matrix, rgba) {
        var vb = this._vb;
        var ib = this._ib;
        var vertsz = vertices.length >> 1;
        var startpos = vb.buffer2D.needSize(vertsz * MeshTexture.const_stride);
        var f32pos = startpos >> 2;
        var vbdata = vb._floatArray32 || vb.getFloat32Array();
        var vbu32Arr = vb._uint32Array;
        var ci = 0;
        var m00 = matrix.a;
        var m01 = matrix.b;
        var m10 = matrix.c;
        var m11 = matrix.d;
        var tx = matrix.tx;
        var ty = matrix.ty;
        var i = 0;
        for (i = 0; i < vertsz; i++) {
            var x = vertices[ci], y = vertices[ci + 1];
            vbdata[f32pos] = x * m00 + y * m10 + tx;
            vbdata[f32pos + 1] = x * m01 + y * m11 + ty;
            vbdata[f32pos + 2] = uvs[ci];
            vbdata[f32pos + 3] = uvs[ci + 1];
            vbu32Arr[f32pos + 4] = rgba;
            vbu32Arr[f32pos + 5] = 0xff;
            f32pos += 6;
            ci += 2;
        }
        vb.buffer2D.setNeedUpload();
        var vertN = this.vertNum;
        var sz = idx.length;
        var stib = ib.buffer2D.needSize(idx.byteLength);
        var cidx = ib.buffer2D._uint16Array;
        var stibid = stib >> 1;
        if (vertN > 0) {
            var end = stibid + sz;
            var si = 0;
            for (i = stibid; i < end; i++, si++) {
                cidx[i] = idx[si] + vertN;
            }
        }
        else {
            cidx.set(idx, stibid);
        }
        ib.buffer2D.setNeedUpload();
        this.vertNum += vertsz;
        this.indexNum += idx.length;
    }
    releaseMesh() {
        this._vb.buffer2D.setByteLength(0);
        this._ib.buffer2D.setByteLength(0);
        this.vertNum = 0;
        this.indexNum = 0;
        MeshTexture._POOL.push(this);
    }
    destroy() {
        this._ib.destroy();
        this._vb.destroy();
        this._ib.disposeResource();
        this._vb.deleteBuffer();
    }
}
MeshTexture.const_stride = 24;
MeshTexture._POOL = [];

//# sourceMappingURL=MeshTexture.js.map
