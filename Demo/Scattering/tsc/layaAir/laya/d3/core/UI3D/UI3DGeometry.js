import { LayaGL } from "../../../layagl/LayaGL";
import { Vector3 } from "../../../maths/Vector3";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { DrawType } from "../../../RenderEngine/RenderEnum/DrawType";
import { IndexFormat } from "../../../RenderEngine/RenderEnum/IndexFormat";
import { MeshTopology } from "../../../RenderEngine/RenderEnum/RenderPologyMode";
import { VertexMesh } from "../../../RenderEngine/RenderShader/VertexMesh";
import { BufferState } from "../../../webgl/utils/BufferState";
import { Bounds } from "../../math/Bounds";
import { Utils3D } from "../../utils/Utils3D";
import { GeometryElement } from "../GeometryElement";
export class UI3DGeometry extends GeometryElement {
    constructor(owner) {
        super(MeshTopology.Triangles, DrawType.DrawElement);
        this._owner = owner;
        this.bufferState = new BufferState();
        this._bound = new Bounds();
        this._createBuffer();
        this.indexFormat = IndexFormat.UInt16;
        this._positionArray = [new Vector3(), new Vector3(), new Vector3(), new Vector3()];
    }
    get bounds() {
        return this._bound;
    }
    _createBuffer() {
        var vertexDeclaration = VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV");
        var halfLong = 1 / 2;
        var halfWidth = 1 / 2 * 100;
        this._vertex = new Float32Array([-halfLong, halfWidth, 0, 0, 0, 1, 0, 0,
            halfLong, halfWidth, 0, 0, 0, 1, 1, 0,
            -halfLong, -halfWidth, 0, 0, 0, 1, 0, 1,
            halfLong, -halfWidth, 0, 0, 0, 1, 1, 1]);
        this._index = new Uint16Array([0, 1, 2, 3, 2, 1]);
        this._vertexBuffer = LayaGL.renderOBJCreate.createVertexBuffer3D(this._vertex.length * 4, BufferUsage.Dynamic, false);
        this._vertexBuffer.vertexDeclaration = vertexDeclaration;
        this._vertexBuffer.setData(this._vertex.buffer);
        this._indexBuffer = LayaGL.renderOBJCreate.createIndexBuffer3D(IndexFormat.UInt16, this._index.length, BufferUsage.Static, false);
        this._indexBuffer.setData(this._index);
        this.bufferState = new BufferState();
        this.bufferState.applyState([this._vertexBuffer], this._indexBuffer);
        this._bound.setExtent(new Vector3(0.5, 0.5, 0.05));
        this._bound.setCenter(new Vector3(0, 0, 0));
    }
    _resizeViewVertexData(size, cameraDir, cameraUp, viewMode, worldPos) {
        var halfwidth = size.x / 2;
        var halfhight = size.y / 2;
        if (viewMode) {
            UI3DGeometry.tempV0.set(-halfwidth, halfhight, 0.0);
            Utils3D.billboardTrans(UI3DGeometry.tempV0, cameraDir, cameraUp, this._positionArray[0]);
            UI3DGeometry.tempV0.set(halfwidth, halfhight, 0.0);
            Utils3D.billboardTrans(UI3DGeometry.tempV0, cameraDir, cameraUp, this._positionArray[1]);
            UI3DGeometry.tempV0.set(-halfwidth, -halfhight, 0.0);
            Utils3D.billboardTrans(UI3DGeometry.tempV0, cameraDir, cameraUp, this._positionArray[2]);
            UI3DGeometry.tempV0.set(halfwidth, -halfhight, 0.0);
            Utils3D.billboardTrans(UI3DGeometry.tempV0, cameraDir, cameraUp, this._positionArray[3]);
            this._vertex[3] = this._vertex[11] = this._vertex[19] = this._vertex[27] = -cameraDir.x;
            this._vertex[4] = this._vertex[12] = this._vertex[20] = this._vertex[28] = -cameraDir.y;
            this._vertex[5] = this._vertex[13] = this._vertex[21] = this._vertex[29] = -cameraDir.z;
        }
        else {
            this._positionArray[0].set(-halfwidth, halfhight, 0.0);
            this._positionArray[1].set(halfwidth, halfhight, 0.0);
            this._positionArray[2].set(-halfwidth, -halfhight, 0.0);
            this._positionArray[3].set(halfwidth, -halfhight, 0.0);
        }
        Vector3.add(this._positionArray[0], worldPos, this._positionArray[0]);
        Vector3.add(this._positionArray[1], worldPos, this._positionArray[1]);
        Vector3.add(this._positionArray[2], worldPos, this._positionArray[2]);
        Vector3.add(this._positionArray[3], worldPos, this._positionArray[3]);
        this._changeVertex(size);
    }
    _resizeWorldVertexData(size, worldMat) {
        let applyMat = (v3, mat) => {
            Vector3.transformV3ToV3(v3, mat, v3);
            return v3;
        };
        var halfwidth = size.x / 2;
        var halfhight = size.y / 2;
        this._positionArray[0].set(-halfwidth, halfhight, 0.0);
        this._positionArray[1].set(halfwidth, halfhight, 0.0);
        this._positionArray[2].set(-halfwidth, -halfhight, 0.0);
        this._positionArray[3].set(halfwidth, -halfhight, 0.0);
        applyMat(this._positionArray[0], worldMat);
        applyMat(this._positionArray[1], worldMat);
        applyMat(this._positionArray[2], worldMat);
        applyMat(this._positionArray[3], worldMat);
        this._changeVertex(size);
    }
    _changeVertex(size) {
        this._vertex[0] = this._positionArray[0].x;
        this._vertex[1] = this._positionArray[0].y;
        this._vertex[2] = this._positionArray[0].z;
        this._vertex[8] = this._positionArray[1].x;
        this._vertex[9] = this._positionArray[1].y;
        this._vertex[10] = this._positionArray[1].z;
        this._vertex[16] = this._positionArray[2].x;
        this._vertex[17] = this._positionArray[2].y;
        this._vertex[18] = this._positionArray[2].z;
        this._vertex[24] = this._positionArray[3].x;
        this._vertex[25] = this._positionArray[3].y;
        this._vertex[26] = this._positionArray[3].z;
        this._vertexBuffer.setData(this._vertex.buffer, 0, 0, this._vertex.length * 4);
        UI3DGeometry.tempV0.setValue(size.x / 2, size.y / 2, 0.0);
        this._bound.setExtent(UI3DGeometry.tempV0);
        let halfWidth = (this._positionArray[3].x - this._positionArray[2].x) / 2;
        let halfHeight = (this._positionArray[0].y - this._positionArray[2].y) / 2;
        UI3DGeometry.tempV0.setValue(this._positionArray[2].x + halfWidth, this._positionArray[2].y + halfHeight, this._positionArray[2].z);
        this._bound.setCenter(UI3DGeometry.tempV0);
    }
    _updateRenderParams(state) {
        this.clearRenderParams();
        this.setDrawElemenParams(6, 0);
    }
    destroy() {
        super.destroy();
        this.bufferState.destroy();
        this._vertexBuffer.destroy();
        this._indexBuffer.destroy();
        this.bufferState = null;
        this._vertexBuffer = null;
        this._indexBuffer = null;
        delete this._vertex;
        delete this._index;
    }
}
UI3DGeometry.tempV0 = new Vector3();
UI3DGeometry._type = GeometryElement._typeCounter++;

//# sourceMappingURL=UI3DGeometry.js.map
