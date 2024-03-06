import { IndexBuffer2D } from "../../../utils/IndexBuffer2D";
import { VertexBuffer2D } from "../../../utils/VertexBuffer2D";
import { BufferUsage } from "../../../../RenderEngine/RenderEnum/BufferTargetType";
export class SkinMeshBuffer {
    constructor() {
        this.ib = IndexBuffer2D.create(BufferUsage.Dynamic);
        this.vb = VertexBuffer2D.create(8);
    }
    static getInstance() {
        return SkinMeshBuffer.instance = SkinMeshBuffer.instance || new SkinMeshBuffer();
    }
    addSkinMesh(skinMesh) {
        skinMesh.getData2(this.vb, this.ib, this.vb._byteLength / 32);
    }
    reset() {
        this.vb.buffer2D.clear();
        this.ib.buffer2D.clear();
    }
}

//# sourceMappingURL=SkinMeshBuffer.js.map
