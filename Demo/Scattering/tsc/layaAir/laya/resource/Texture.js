import { Event } from "../events/Event";
import { Rectangle } from "../maths/Rectangle";
import { ILaya } from "../../ILaya";
import { Resource } from "./Resource";
const _rect1 = new Rectangle();
const _rect2 = new Rectangle();
export class Texture extends Resource {
    constructor(source = null, uv = null, sourceWidth = 0, sourceHeight = 0) {
        super(false);
        this.uvrect = [0, 0, 1, 1];
        this._w = 0;
        this._h = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.scaleRate = 1;
        let bitmap = (source instanceof Texture) ? source.bitmap : source;
        this.setTo(bitmap, uv, sourceWidth, sourceHeight);
    }
    static create(source, x, y, width, height, offsetX = 0, offsetY = 0, sourceWidth = 0, sourceHeight = 0) {
        return Texture._create(source, x, y, width, height, offsetX, offsetY, sourceWidth, sourceHeight);
    }
    static _create(source, x, y, width, height, offsetX = 0, offsetY = 0, sourceWidth = 0, sourceHeight = 0, outTexture = null) {
        var btex = source instanceof Texture;
        var uv = btex ? source.uv : Texture.DEF_UV;
        var bitmap = btex ? source.bitmap : source;
        if (bitmap.width && (x + width) > bitmap.width)
            width = bitmap.width - x;
        if (bitmap.height && (y + height) > bitmap.height)
            height = bitmap.height - y;
        var tex;
        if (outTexture) {
            tex = outTexture;
            tex.setTo(bitmap, null, sourceWidth || width, sourceHeight || height);
        }
        else {
            tex = new Texture(bitmap, null, sourceWidth || width, sourceHeight || height);
        }
        tex.width = width;
        tex.height = height;
        tex.offsetX = offsetX;
        tex.offsetY = offsetY;
        var dwidth = 1 / bitmap.width;
        var dheight = 1 / bitmap.height;
        x *= dwidth;
        y *= dheight;
        width *= dwidth;
        height *= dheight;
        var u1 = tex.uv[0], v1 = tex.uv[1], u2 = tex.uv[4], v2 = tex.uv[5];
        var inAltasUVWidth = (u2 - u1), inAltasUVHeight = (v2 - v1);
        var oriUV = moveUV(uv[0], uv[1], [x, y, x + width, y, x + width, y + height, x, y + height]);
        tex.uv = new Float32Array([u1 + oriUV[0] * inAltasUVWidth, v1 + oriUV[1] * inAltasUVHeight,
            u2 - (1 - oriUV[2]) * inAltasUVWidth, v1 + oriUV[3] * inAltasUVHeight,
            u2 - (1 - oriUV[4]) * inAltasUVWidth, v2 - (1 - oriUV[5]) * inAltasUVHeight,
            u1 + oriUV[6] * inAltasUVWidth, v2 - (1 - oriUV[7]) * inAltasUVHeight]);
        var bitmapScale = bitmap.scaleRate;
        if (bitmapScale && bitmapScale != 1) {
            tex.sourceWidth /= bitmapScale;
            tex.sourceHeight /= bitmapScale;
            tex.width /= bitmapScale;
            tex.height /= bitmapScale;
            tex.scaleRate = bitmapScale;
            tex.offsetX /= bitmapScale;
            tex.offsetY /= bitmapScale;
        }
        else {
            tex.scaleRate = 1;
        }
        return tex;
    }
    static createFromTexture(texture, x, y, width, height) {
        var texScaleRate = texture.scaleRate;
        if (texScaleRate != 1) {
            x *= texScaleRate;
            y *= texScaleRate;
            width *= texScaleRate;
            height *= texScaleRate;
        }
        var rect = Rectangle.TEMP.setTo(x - texture.offsetX, y - texture.offsetY, width, height);
        var result = rect.intersection(_rect1.setTo(0, 0, texture.width, texture.height), _rect2);
        if (result)
            return Texture.create(texture, result.x, result.y, result.width, result.height, result.x - rect.x, result.y - rect.y, width, height);
        else
            return null;
    }
    get uv() {
        return this._uv;
    }
    set uv(value) {
        this.uvrect[0] = Math.min(value[0], value[2], value[4], value[6]);
        this.uvrect[1] = Math.min(value[1], value[3], value[5], value[7]);
        this.uvrect[2] = Math.max(value[0], value[2], value[4], value[6]) - this.uvrect[0];
        this.uvrect[3] = Math.max(value[1], value[3], value[5], value[7]) - this.uvrect[1];
        this._uv = value;
    }
    get width() {
        if (this._w)
            return this._w;
        if (!this.bitmap)
            return 0;
        return (this.uv && this.uv !== Texture.DEF_UV) ? (this.uv[2] - this.uv[0]) * this.bitmap.width : this.bitmap.width;
    }
    set width(value) {
        this._w = value;
        this.sourceWidth || (this.sourceWidth = value);
    }
    get height() {
        if (this._h)
            return this._h;
        if (!this.bitmap)
            return 0;
        return (this.uv && this.uv !== Texture.DEF_UV) ? (this.uv[5] - this.uv[1]) * this.bitmap.height : this.bitmap.height;
    }
    set height(value) {
        this._h = value;
        this.sourceHeight || (this.sourceHeight = value);
    }
    get bitmap() {
        return this._bitmap;
    }
    set bitmap(value) {
        if (this._bitmap == value)
            return;
        this._bitmap && this._bitmap._removeReference(this._referenceCount);
        this._bitmap = value;
        value && (value._addReference(this._referenceCount));
    }
    _addReference(count = 1) {
        super._addReference(count);
        this._bitmap && this._bitmap._addReference(count);
    }
    _removeReference(count = 1) {
        super._removeReference(count);
        this._bitmap && this._bitmap._removeReference(count);
    }
    _getSource(cb = null) {
        if (this._destroyed || !this._bitmap)
            return null;
        this.recoverBitmap(cb);
        return this._bitmap.destroyed ? null : this.bitmap._getSource();
    }
    setTo(bitmap = null, uv = null, sourceWidth = 0, sourceHeight = 0) {
        this.bitmap = bitmap;
        this.sourceWidth = sourceWidth;
        this.sourceHeight = sourceHeight;
        if (bitmap) {
            this._w = bitmap.width;
            this._h = bitmap.height;
            this.sourceWidth = this.sourceWidth || bitmap.width;
            this.sourceHeight = this.sourceHeight || bitmap.height;
        }
        this.uv = uv || Texture.DEF_UV;
    }
    load(url, complete) {
        if (this._destroyed)
            return Promise.resolve();
        return ILaya.loader.load(url).then((tex) => {
            let bit = tex.bitmap;
            this.bitmap = bit;
            this.sourceWidth = this._w = bit.width;
            this.sourceHeight = this._h = bit.height;
            complete && complete.run();
            this.event(Event.READY, this);
        });
    }
    getTexturePixels(x, y, width, height) {
        var st, dst, i;
        var tex2d = this.bitmap;
        var texw = this._w;
        var texh = this._h;
        var sourceWidth = this.sourceWidth;
        var sourceHeight = this.sourceHeight;
        var tex2dw = tex2d.width;
        var tex2dh = tex2d.height;
        var offsetX = this.offsetX;
        var offsetY = this.offsetY;
        let draww = width;
        let drawh = height;
        if (x + width > texw + offsetX)
            draww -= (x + width) - texw - offsetX;
        if (x + width > sourceWidth)
            width -= (x + width) - sourceWidth;
        if (y + height > texh + offsetY)
            drawh -= (y + height) - texh - offsetY;
        if (y + height > sourceHeight)
            height -= (y + height) - sourceHeight;
        if (width <= 0 || height <= 0)
            return null;
        let marginL = offsetX > x ? offsetX - x : 0;
        let marginT = offsetY > y ? offsetY - y : 0;
        let rePosX = x > offsetX ? x - offsetX : 0;
        let rePosY = y > offsetY ? y - offsetY : 0;
        draww -= marginL;
        drawh -= marginT;
        var wstride = width * 4;
        var pix = null;
        try {
            pix = tex2d.getPixels();
        }
        catch (e) {
        }
        if (pix) {
            if (x == 0 && y == 0 && width == tex2dw && height == tex2dh)
                return pix;
            let uv = this._uv.slice();
            let atlasPosX = Math.round(uv[0] * tex2dw);
            let atlasPosY = Math.round(uv[1] * tex2dh);
            var ret = new Uint8Array(width * height * 4);
            wstride = tex2dw * 4;
            dst = (atlasPosY + rePosY) * wstride;
            st = atlasPosX * 4 + rePosX * 4 + dst;
            for (i = 0; i < drawh; i++) {
                ret.set(pix.slice(st, st + draww * 4), width * 4 * (i + marginT) + marginL * 4);
                st += wstride;
            }
            return ret;
        }
        var ctx = new ILaya.Context();
        ctx.size(width, height);
        ctx.asBitmap = true;
        var uv = null;
        if (x != 0 || y != 0 || width != tex2dw || height != tex2dh) {
            uv = this._uv.slice();
            var stu = uv[0];
            var stv = uv[1];
            var uvw = uv[2] - stu;
            var uvh = uv[7] - stv;
            var uk = uvw / texw;
            var vk = uvh / texh;
            uv = [stu + rePosX * uk, stv + rePosY * vk,
                stu + (rePosX + draww) * uk, stv + rePosY * vk,
                stu + (rePosX + draww) * uk, stv + (rePosY + drawh) * vk,
                stu + rePosX * uk, stv + (rePosY + drawh) * vk];
        }
        ctx._drawTextureM(this, marginL, marginT, draww, drawh, null, 1.0, uv, 0xffffffff);
        ctx._targets.start();
        ctx.flush();
        ctx._targets.end();
        ctx._targets.restore();
        var dt = ctx._targets.getData(0, 0, width, height);
        ctx.destroy();
        ret = new Uint8Array(width * height * 4);
        st = 0;
        dst = (height - 1) * wstride;
        for (i = height - 1; i >= 0; i--) {
            ret.set(dt.slice(dst, dst + wstride), st);
            st += wstride;
            dst -= wstride;
        }
        return ret;
    }
    getPixels(x, y, width, height) {
        return this.getTexturePixels(x, y, width, height);
    }
    recoverBitmap(onok = null) {
        var url = this._bitmap.url;
        if (!this._destroyed && (!this._bitmap || this._bitmap.destroyed) && url) {
            ILaya.loader.load(url).then((tex) => {
                this.bitmap = tex.bitmap;
                onok && onok();
            });
        }
    }
    disposeBitmap() {
        if (!this._destroyed && this._bitmap) {
            this._bitmap.destroy();
        }
    }
    get valid() {
        return !this._destroyed && this._bitmap && !this._bitmap.destroyed;
    }
    get obsolute() {
        return this._obsolute || !this._bitmap || this._bitmap.destroyed || this._bitmap.obsolute;
    }
    set obsolute(value) {
        this._obsolute = value;
    }
    _disposeResource() {
        let bit = this._bitmap;
        this._bitmap = null;
        if (bit)
            bit._removeReference(this._referenceCount);
    }
    getCachedClip(x, y, width, height) {
        let key = `${x}_${y}_${width}_${height}`;
        if (!this._clipCache)
            this._clipCache = new Map();
        let tex = this._clipCache.get(key);
        if (tex)
            return tex;
        tex = Texture.createFromTexture(this, x, y, width, height);
        if (tex)
            tex._sizeGrid = this._sizeGrid;
        if (this._clipCache.size > 100)
            this._clipCache.clear();
        this._clipCache.set(key, tex);
        return tex;
    }
}
Texture.DEF_UV = new Float32Array([0, 0, 1.0, 0, 1.0, 1.0, 0, 1.0]);
Texture.NO_UV = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]);
Texture.INV_UV = new Float32Array([0, 1, 1.0, 1, 1.0, 0.0, 0, 0.0]);
function moveUV(offsetX, offsetY, uv) {
    for (var i = 0; i < 8; i += 2) {
        uv[i] += offsetX;
        uv[i + 1] += offsetY;
    }
    return uv;
}

//# sourceMappingURL=Texture.js.map
