import { Mesh2D } from "./Mesh2D";
import { LayaGL } from "../../layagl/LayaGL";
import { RenderParams } from "../../RenderEngine/RenderEnum/RenderParams";
import { VertexDeclaration } from "../../RenderEngine/VertexDeclaration";
import { VertexElementFormat } from "../../renders/VertexElementFormat";
import { VertexElement } from "../../renders/VertexElement";
export class MeshParticle2D extends Mesh2D {
    constructor(maxNum) {
        super(MeshParticle2D.const_stride, maxNum * 4 * MeshParticle2D.const_stride, 4);
        this.canReuse = true;
        this.setAttributes(MeshParticle2D._fixattriInfo);
        this.createQuadIB(maxNum);
        this._quadNum = maxNum;
        if (!MeshParticle2D.vertexDeclaration) {
            MeshParticle2D.vertexDeclaration = new VertexDeclaration(116, [
                new VertexElement(0, VertexElementFormat.Vector4, 0),
                new VertexElement(16, VertexElementFormat.Vector3, 1),
                new VertexElement(28, VertexElementFormat.Vector3, 2),
                new VertexElement(40, VertexElementFormat.Vector4, 3),
                new VertexElement(56, VertexElementFormat.Vector4, 4),
                new VertexElement(72, VertexElementFormat.Vector3, 5),
                new VertexElement(84, VertexElementFormat.Vector2, 6),
                new VertexElement(92, VertexElementFormat.Vector4, 7),
                new VertexElement(108, VertexElementFormat.Single, 8),
                new VertexElement(112, VertexElementFormat.Single, 9)
            ]);
        }
        this._vb.vertexDeclaration = MeshParticle2D.vertexDeclaration;
    }
    static __init__() {
        const glfloat = LayaGL.renderEngine.getParams(RenderParams.FLOAT);
        MeshParticle2D._fixattriInfo = [
            glfloat, 4, 0,
            glfloat, 3, 16,
            glfloat, 3, 28,
            glfloat, 4, 40,
            glfloat, 4, 56,
            glfloat, 3, 72,
            glfloat, 2, 84,
            glfloat, 4, 92,
            glfloat, 1, 108,
            glfloat, 1, 112
        ];
    }
    setMaxParticleNum(maxNum) {
        this._vb.buffer2D._resizeBuffer(maxNum * 4 * MeshParticle2D.const_stride, false);
        this.createQuadIB(maxNum);
    }
    static getAMesh(maxNum) {
        if (MeshParticle2D._POOL.length) {
            var ret = MeshParticle2D._POOL.pop();
            ret.setMaxParticleNum(maxNum);
            return ret;
        }
        return new MeshParticle2D(maxNum);
    }
    releaseMesh() {
        this._vb.buffer2D.setByteLength(0);
        this.vertNum = 0;
        this.indexNum = 0;
        MeshParticle2D._POOL.push(this);
    }
    destroy() {
        this._ib.destroy();
        this._vb.destroy();
        this._vb.deleteBuffer();
    }
}
MeshParticle2D.const_stride = 116;
MeshParticle2D._POOL = [];
MeshParticle2D.vertexDeclaration = null;

//# sourceMappingURL=MeshParticle2D.js.map
