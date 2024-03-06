import { LayaGL } from "../../layagl/LayaGL";
import { RenderInfo } from "../../renders/RenderInfo";
import { Resource } from "../../resource/Resource";
import { ILaya } from "../../../ILaya";
import { Texture2D } from "../../resource/Texture2D";
import { TextureFormat } from "../../RenderEngine/RenderEnum/TextureFormat";
import { FilterMode } from "../../RenderEngine/RenderEnum/FilterMode";
import { WrapMode } from "../../RenderEngine/RenderEnum/WrapMode";
import { TextAtlas } from "./TextAtlas";
import { LayaEnv } from "../../../LayaEnv";
import { TextRender } from "./TextRender";
export class TextTexture extends Resource {
    constructor(textureW, textureH) {
        super();
        this._texW = 0;
        this._texH = 0;
        this._discardTm = 0;
        this.genID = 0;
        this.bitmap = { id: 0, _glTexture: null };
        this.curUsedCovRate = 0;
        this.curUsedCovRateAtlas = 0;
        this.lastTouchTm = 0;
        this.ri = null;
        this._texW = textureW || TextRender.atlasWidth;
        this._texH = textureH || TextRender.atlasWidth;
        this.bitmap.id = this.id;
        this.lock = true;
        this._render2DContext = LayaGL.render2DContext;
    }
    get gammaCorrection() {
        return this.bitmap._glTexture.gammaCorrection;
    }
    recreateResource() {
        if (this._source)
            return;
        var glTex = this._source = new Texture2D(this._texW, this._texH, TextureFormat.R8G8B8A8, false, false, true);
        glTex.setPixelsData(null, true, false);
        glTex.lock = true;
        this.bitmap._glTexture = glTex;
        this._source.filterMode = FilterMode.Bilinear;
        this._source.wrapModeU = WrapMode.Clamp;
        this._source.wrapModeV = WrapMode.Clamp;
        if (TextRender.debugUV) {
            this.fillWhite();
        }
    }
    addChar(data, x, y, uv = null) {
        if (TextRender.isWan1Wan) {
            return this.addCharCanvas(data, x, y, uv);
        }
        var dt = data.data;
        if (data.data instanceof Uint8ClampedArray)
            dt = new Uint8Array(dt.buffer);
        !this._source && this.recreateResource();
        LayaGL.textureContext.setTextureSubPixelsData(this._source._texture, dt, 0, false, x, y, data.width, data.height, true, false);
        var u0;
        var v0;
        var u1;
        var v1;
        u0 = x / this._texW;
        v0 = y / this._texH;
        u1 = (x + data.width) / this._texW;
        v1 = (y + data.height) / this._texH;
        uv = uv || new Array(8);
        uv[0] = u0, uv[1] = v0;
        uv[2] = u1, uv[3] = v0;
        uv[4] = u1, uv[5] = v1;
        uv[6] = u0, uv[7] = v1;
        return uv;
    }
    addCharCanvas(canv, x, y, uv = null) {
        !this._source && this.recreateResource();
        LayaGL.textureContext.setTextureSubImageData(this._source._texture, canv, x, y, true, false);
        var u0;
        var v0;
        var u1;
        var v1;
        if (LayaEnv.isConch) {
            u0 = x / this._texW;
            v0 = y / this._texH;
            u1 = (x + canv.width) / this._texW;
            v1 = (y + canv.height) / this._texH;
        }
        else {
            u0 = (x + 1) / this._texW;
            v0 = (y + 1) / this._texH;
            u1 = (x + canv.width - 1) / this._texW;
            v1 = (y + canv.height - 1) / this._texH;
        }
        uv = uv || new Array(8);
        uv[0] = u0, uv[1] = v0;
        uv[2] = u1, uv[3] = v0;
        uv[4] = u1, uv[5] = v1;
        uv[6] = u0, uv[7] = v1;
        return uv;
    }
    fillWhite() {
        !this._source && this.recreateResource();
        var dt = new Uint8Array(this._texW * this._texH * 4);
        dt.fill(0xff);
        LayaGL.textureContext.setTextureImageData(this._source._getSource(), dt, true, false);
    }
    discard() {
        ILaya.stage.setGlobalRepaint();
        this.destroy();
        return;
    }
    static getTextTexture(w, h) {
        return new TextTexture(w, h);
    }
    _disposeResource() {
        this._source && this._source.destroy();
        this._source = null;
    }
    static clean() {
        var curtm = RenderInfo.loopStTm;
        if (TextTexture.cleanTm === 0)
            TextTexture.cleanTm = curtm;
        if (curtm - TextTexture.cleanTm >= TextRender.checkCleanTextureDt) {
            for (var i = 0; i < TextTexture.poolLen; i++) {
                var p = TextTexture.pool[i];
                if (curtm - p._discardTm >= TextRender.destroyUnusedTextureDt) {
                    p.destroy();
                    TextTexture.pool[i] = TextTexture.pool[TextTexture.poolLen - 1];
                    TextTexture.poolLen--;
                    i--;
                }
            }
            TextTexture.cleanTm = curtm;
        }
    }
    touchRect(ri, curloop) {
        if (this.lastTouchTm != curloop) {
            this.curUsedCovRate = 0;
            this.curUsedCovRateAtlas = 0;
            this.lastTouchTm = curloop;
        }
        var texw2 = TextRender.atlasWidth * TextRender.atlasWidth;
        var gridw2 = TextAtlas.atlasGridW * TextAtlas.atlasGridW;
        this.curUsedCovRate += (ri.bmpWidth * ri.bmpHeight) / texw2;
        this.curUsedCovRateAtlas += (Math.ceil(ri.bmpWidth / TextAtlas.atlasGridW) * Math.ceil(ri.bmpHeight / TextAtlas.atlasGridW)) / (texw2 / gridw2);
    }
    get texture() {
        return this;
    }
    _getSource() {
        return this._source._getSource();
    }
    drawOnScreen(x, y) {
    }
}
TextTexture.pool = new Array(10);
TextTexture.poolLen = 0;
TextTexture.cleanTm = 0;

//# sourceMappingURL=TextTexture.js.map
