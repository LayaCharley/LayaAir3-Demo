import { GLObject } from "./GLObject";
export class GLRender2DContext extends GLObject {
    constructor(engine) {
        super(engine);
    }
    activeTexture(textureID) {
        if (this._engine._activedTextureID !== textureID) {
            this._gl.activeTexture(textureID);
            this._engine._activedTextureID = textureID;
        }
    }
    bindTexture(target, texture) {
        this._engine._bindTexture(target, texture);
    }
    bindUseProgram(webglProgram) {
        if (this.cacheShaderProgram == webglProgram)
            return false;
        this._gl.useProgram(webglProgram);
        this._engine._glUseProgram = null;
        ;
        return true;
    }
}

//# sourceMappingURL=GLRender2DContext.js.map
