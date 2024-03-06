import { LayaGL } from "../../../layagl/LayaGL";
import { UniformBufferObject } from "../../../RenderEngine/UniformBufferObject";
export class NativeUniformBufferObject extends UniformBufferObject {
    constructor(glPointer, name, bufferUsage, byteLength, isSingle) {
        super(glPointer, name, bufferUsage, byteLength, isSingle);
        this._conchUniformBufferObject = null;
        this._conchUniformBufferObject = new window.conchUniformBufferObject(LayaGL.renderEngine._nativeObj, glPointer);
        this._conchUniformBufferObject.setGLBuffer(this._glBuffer);
    }
}

//# sourceMappingURL=NativeUniformBufferObject.js.map
