import { LayaGL } from "../layagl/LayaGL";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { BaseTexture } from "./BaseTexture";
export class Texture2DArray extends BaseTexture {
    constructor(width, height, depth, format, mipmap = true, canRead, sRGB = false) {
        super(width, height, format);
        this._dimension = TextureDimension.Texture2DArray;
        this._gammaSpace = sRGB;
        this.depth = depth;
        this._texture = LayaGL.textureContext.createTextureInternal(this._dimension, width, height, format, mipmap, sRGB);
        return;
    }
    setImageData(sources, premultiplyAlpha, invertY) {
        let texture = this._texture;
        let context = LayaGL.textureContext;
        context.setTexture3DImageData(texture, sources, this.depth, premultiplyAlpha, invertY);
    }
    setPixlesData(source, premultiplyAlpha, invertY) {
        let texture = this._texture;
        let context = LayaGL.textureContext;
        context.setTexture3DPixlesData(texture, source, this.depth, premultiplyAlpha, invertY);
    }
    setSubPixelsData(xOffset, yOffset, zOffset, width, height, depth, pixels, mipmapLevel, generateMipmap, premultiplyAlpha, invertY) {
        let texture = this._texture;
        let context = LayaGL.textureContext;
        context.setTexture3DSubPixelsData(texture, pixels, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY);
    }
}

//# sourceMappingURL=Texture2DArray.js.map
