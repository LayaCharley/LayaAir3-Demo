import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { LayaGL } from "../layagl/LayaGL";
import { RenderTexture } from "./RenderTexture";
export class RenderTextureCube extends RenderTexture {
    constructor(size, colorFormat, depthFormat, generateMipmap, multiSamples) {
        super(size, size, colorFormat, depthFormat, generateMipmap, multiSamples);
        this.faceIndex = 0;
    }
    _createRenderTarget() {
        this._dimension = TextureDimension.Cube;
        this._renderTarget = LayaGL.textureContext.createRenderTargetCubeInternal(this.width, this._format, this._depthStencilFormat, this._generateMipmap, this._gammaSpace, this._multiSamples);
        this._texture = this._renderTarget._textures[0];
    }
    _start() {
        RenderTexture._configInstance.invertY = this._isCameraTarget;
        if (RenderTexture._currentActive != this) {
            RenderTexture._currentActive && RenderTexture._currentActive._end();
            RenderTexture._currentActive = this;
            LayaGL.textureContext.bindRenderTarget(this._renderTarget, this.faceIndex);
        }
    }
}

//# sourceMappingURL=RenderTextureCube.js.map
