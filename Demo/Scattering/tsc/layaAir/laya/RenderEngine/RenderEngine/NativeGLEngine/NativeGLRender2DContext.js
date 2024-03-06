import { NativeGLObject } from "./NativeGLObject";
export class NativeGLRender2DContext extends NativeGLObject {
    constructor(engine) {
        super(engine);
    }
    activeTexture(textureID) {
    }
    bindTexture(target, texture) {
    }
    bindUseProgram(webglProgram) {
        return true;
    }
}

//# sourceMappingURL=NativeGLRender2DContext.js.map
