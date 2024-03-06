import { LayaGL } from "../layagl/LayaGL";
import { TextureDimension } from "../RenderEngine/RenderEnum/TextureDimension";
import { TextureFormat } from "../RenderEngine/RenderEnum/TextureFormat";
import { BaseTexture } from "./BaseTexture";
export var TextureCubeFace;
(function (TextureCubeFace) {
    TextureCubeFace[TextureCubeFace["PositiveX"] = 0] = "PositiveX";
    TextureCubeFace[TextureCubeFace["NegativeX"] = 1] = "NegativeX";
    TextureCubeFace[TextureCubeFace["PositiveY"] = 2] = "PositiveY";
    TextureCubeFace[TextureCubeFace["NegativeY"] = 3] = "NegativeY";
    TextureCubeFace[TextureCubeFace["PositiveZ"] = 4] = "PositiveZ";
    TextureCubeFace[TextureCubeFace["NegativeZ"] = 5] = "NegativeZ";
})(TextureCubeFace || (TextureCubeFace = {}));
const DEFAULT_PIXELS = new Uint8Array(4);
export class TextureCube extends BaseTexture {
    constructor(size, format, mipmap = true, sRGB = false) {
        super(size, size, format);
        this._dimension = TextureDimension.Cube;
        this._texture = LayaGL.textureContext.createTextureInternal(this._dimension, size, size, format, mipmap, sRGB);
        return;
    }
    static get blackTexture() {
        return TextureCube._blackTexture;
    }
    static get grayTexture() {
        return TextureCube._grayTexture;
    }
    static get whiteTexture() {
        return TextureCube._whiteTexture;
    }
    static get errorTexture() {
        return TextureCube._errorTexture;
    }
    static __init__() {
        var blackTexture = new TextureCube(1, TextureFormat.R8G8B8A8, false);
        var grayTexture = new TextureCube(1, TextureFormat.R8G8B8A8, false);
        var writeTexture = new TextureCube(1, TextureFormat.R8G8B8A8, false);
        var pixels = DEFAULT_PIXELS;
        pixels[0] = 0, pixels[1] = 0, pixels[2] = 0;
        pixels[3] = 255;
        blackTexture.setPixelsData([pixels, pixels, pixels, pixels, pixels, pixels], false, false);
        blackTexture.lock = true;
        pixels[0] = 128, pixels[1] = 128, pixels[2] = 128;
        pixels[3] = 255;
        grayTexture.setPixelsData([pixels, pixels, pixels, pixels, pixels, pixels], false, false);
        grayTexture.lock = true;
        pixels[0] = 255, pixels[1] = 255, pixels[2] = 255;
        pixels[3] = 255;
        writeTexture.setPixelsData([pixels, pixels, pixels, pixels, pixels, pixels], false, false);
        writeTexture.lock = true;
        TextureCube._grayTexture = grayTexture;
        TextureCube._blackTexture = blackTexture;
        TextureCube._whiteTexture = writeTexture;
        TextureCube._errorTexture = writeTexture;
    }
    setImageData(source, premultiplyAlpha, invertY) {
        let error = false;
        let k = source.findIndex(s => s != null);
        if (k != -1) {
            let img = source[k];
            if (!source.every(s => s != null && s.width == img.width && s.height == img.height))
                error = true;
        }
        else
            error = true;
        let texture = this._texture;
        if (!error)
            LayaGL.textureContext.setCubeImageData(texture, source, premultiplyAlpha, invertY);
        else {
            let pixels = DEFAULT_PIXELS;
            LayaGL.textureContext.setCubePixelsData(texture, [pixels, pixels, pixels, pixels, pixels, pixels], premultiplyAlpha, invertY);
        }
    }
    setPixelsData(source, premultiplyAlpha, invertY) {
        let texture = this._texture;
        LayaGL.textureContext.setCubePixelsData(texture, source, premultiplyAlpha, invertY);
    }
    updateSubPixelsData(source, xOffset, yOffset, width, height, mipmapLevel, generateMipmap, premultiplyAlpha, invertY) {
        let texture = this._texture;
        LayaGL.textureContext.setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY);
    }
    setDDSData(ddsInfo) {
        let texture = this._texture;
        LayaGL.textureContext.setCubeDDSData(texture, ddsInfo);
    }
    setKTXData(ktxInfo) {
        let texture = this._texture;
        LayaGL.textureContext.setCubeKTXData(texture, ktxInfo);
    }
    get defaultTexture() {
        return TextureCube.grayTexture;
    }
}

//# sourceMappingURL=TextureCube.js.map
