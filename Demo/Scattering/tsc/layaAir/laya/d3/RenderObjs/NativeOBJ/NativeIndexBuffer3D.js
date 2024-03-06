import { LayaGL } from "../../../layagl/LayaGL";
import { BufferUsage } from "../../../RenderEngine/RenderEnum/BufferTargetType";
import { IndexBuffer3D } from "../../graphics/IndexBuffer3D";
export class NativeIndexBuffer3D extends IndexBuffer3D {
    constructor(indexType, indexCount, bufferUsage = BufferUsage.Static, canRead = false) {
        super(indexType, indexCount, bufferUsage, canRead);
        this._conchIndexBuffer3D = null;
        this._conchIndexBuffer3D = new window.conchIndexBuffer3D(LayaGL.renderEngine._nativeObj, indexType, indexCount, bufferUsage, false);
        this._conchIndexBuffer3D.setGLBuffer(this._glBuffer);
    }
}

//# sourceMappingURL=NativeIndexBuffer3D.js.map
