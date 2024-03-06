import { LayaGL } from "../../../layagl/LayaGL";
import { VertexBuffer3D } from "../../graphics/VertexBuffer3D";
export class NativeVertexBuffer3D extends VertexBuffer3D {
    constructor(byteLength, bufferUsage, canRead = false) {
        super(byteLength, bufferUsage, canRead);
        this._conchVertexBuffer3D = null;
        this._conchVertexBuffer3D = new window.conchVertexBuffer3D(LayaGL.renderEngine._nativeObj, byteLength, bufferUsage, false);
        this._conchVertexBuffer3D.setGLBuffer(this._glBuffer);
    }
    get vertexDeclaration() {
        return this._vertexDeclaration;
    }
    set vertexDeclaration(value) {
        this._vertexDeclaration = value;
        this._conchVertexBuffer3D.setVertexDeclaration(this.serilizeVertexDeclaration(value));
    }
    serilizeVertexDeclaration(value) {
        let array = new Int32Array(value._vertexElements.length * 6);
        let offset = 0;
        var valueData = value._shaderValues;
        for (var k in valueData) {
            var loc = parseInt(k);
            var attribute = valueData[k];
            array[offset++] = loc;
            array.set(attribute, offset);
            offset += 5;
        }
        return array;
    }
    get instanceBuffer() {
        return this._conchVertexBuffer3D._instanceBuffer;
    }
    set instanceBuffer(value) {
        this._conchVertexBuffer3D._instanceBuffer = value;
    }
}

//# sourceMappingURL=NativeVertexBuffer3D.js.map
