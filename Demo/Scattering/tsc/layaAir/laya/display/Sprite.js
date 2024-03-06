import { ILaya } from "../../ILaya";
import { NodeFlags } from "../Const";
import { ColorFilter } from "../filters/ColorFilter";
import { Filter } from "../filters/Filter";
import { GrahamScan } from "../maths/GrahamScan";
import { Matrix } from "../maths/Matrix";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { RenderSprite } from "../renders/RenderSprite";
import { Context } from "../resource/Context";
import { HTMLCanvas } from "../resource/HTMLCanvas";
import { Texture } from "../resource/Texture";
import { Utils } from "../utils/Utils";
import { BoundsStyle } from "./css/BoundsStyle";
import { CacheStyle } from "./css/CacheStyle";
import { SpriteStyle } from "./css/SpriteStyle";
import { Graphics } from "./Graphics";
import { Node } from "./Node";
import { SpriteConst } from "./SpriteConst";
import { RenderTexture2D } from "../resource/RenderTexture2D";
import { Event } from "../events/Event";
import { Dragging } from "../utils/Dragging";
import { URL } from "../net/URL";
import { LayaEnv } from "../../LayaEnv";
import { SpriteUtils } from "../utils/SpriteUtils";
export class Sprite extends Node {
    constructor() {
        super();
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._anchorX = 0;
        this._anchorY = 0;
        this._visible = true;
        this._mouseState = 0;
        this._zOrder = 0;
        this._renderType = 0;
        this._transform = null;
        this._tfChanged = false;
        this._repaint = SpriteConst.REPAINT_NONE;
        this._texture = null;
        this._sizeFlag = 0;
        this._style = SpriteStyle.EMPTY;
        this._cacheStyle = CacheStyle.EMPTY;
        this._boundStyle = null;
        this._graphics = null;
        this._ownGraphics = false;
        this.mouseThrough = false;
        this.autoSize = false;
        this.hitTestPrior = false;
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._style && this._style.recover();
        this._cacheStyle && this._cacheStyle.recover();
        this._boundStyle && this._boundStyle.recover();
        this._transform && this._transform.recover();
        this._style = null;
        this._cacheStyle = null;
        this._boundStyle = null;
        this._transform = null;
        this._texture && this._texture._removeReference();
        this._texture = null;
        this._graphics && this._ownGraphics && this._graphics.destroy();
        this._graphics = null;
    }
    get scene() {
        return this._scene;
    }
    updateZOrder() {
        SpriteUtils.updateOrder(this._children) && this.repaint();
    }
    _getBoundsStyle() {
        if (!this._boundStyle)
            this._boundStyle = BoundsStyle.create();
        return this._boundStyle;
    }
    _setCustomRender() {
    }
    set customRenderEnable(b) {
        if (b) {
            this._renderType |= SpriteConst.CUSTOM;
            this._setCustomRender();
        }
    }
    get cacheAs() {
        return this._cacheStyle.userSetCache;
    }
    _setCacheAs(value) {
    }
    set cacheAs(value) {
        if (value === this._cacheStyle.userSetCache)
            return;
        if ('bitmap' == value && !(this._cacheStyle.canvas instanceof HTMLCanvas)) {
            this._cacheStyle.canvas = null;
        }
        this._getCacheStyle().userSetCache = value;
        if (this.mask && value === 'normal')
            return;
        this._setCacheAs(value);
        this._checkCanvasEnable();
        this.repaint();
    }
    _checkCanvasEnable() {
        var tEnable = this._cacheStyle.needEnableCanvasRender();
        this._getCacheStyle().enableCanvasRender = tEnable;
        if (tEnable) {
            if (this._cacheStyle.needBitmapCache()) {
                this._cacheStyle.cacheAs = "bitmap";
            }
            else {
                this._cacheStyle.cacheAs = this._cacheStyle.userSetCache;
            }
            this._cacheStyle.reCache = true;
            this._renderType |= SpriteConst.CANVAS;
        }
        else {
            this._cacheStyle.cacheAs = "none";
            this._cacheStyle.releaseContext();
            this._renderType &= ~SpriteConst.CANVAS;
        }
        this._setCacheAs(this._cacheStyle.cacheAs);
    }
    get staticCache() {
        return this._cacheStyle.staticCache;
    }
    set staticCache(value) {
        this._getCacheStyle().staticCache = value;
        if (!value)
            this.reCache();
    }
    reCache() {
        this._cacheStyle.reCache = true;
        this._repaint |= SpriteConst.REPAINT_CACHE;
    }
    getRepaint() {
        return this._repaint;
    }
    _setX(value) {
        this._x = value;
    }
    _setY(value) {
        this._y = value;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        if (this._destroyed)
            return;
        if (this._x !== value) {
            this._setX(value);
            this.parentRepaint(SpriteConst.REPAINT_CACHE);
            var p = this._cacheStyle.maskParent;
            if (p) {
                p.repaint(SpriteConst.REPAINT_CACHE);
            }
        }
    }
    get y() {
        return this._y;
    }
    set y(value) {
        if (this._destroyed)
            return;
        if (this._y !== value) {
            this._setY(value);
            this.parentRepaint(SpriteConst.REPAINT_CACHE);
            var p = this._cacheStyle.maskParent;
            if (p) {
                p.repaint(SpriteConst.REPAINT_CACHE);
            }
        }
    }
    get width() {
        return this.get_width();
    }
    set width(value) {
        this.set_width(value);
    }
    set_width(value) {
        let flag = this._sizeFlag;
        if (value == null) {
            value = 0;
            this._sizeFlag &= ~1;
        }
        else if (value == 0)
            this._sizeFlag |= 1;
        else
            this._sizeFlag &= ~1;
        if (this._width !== value || flag != this._sizeFlag) {
            this._width = value;
            this._setWidth(value);
            this._setPivotX(this._anchorX * value);
            if (this._graphics)
                this._graphics._clearBoundsCache(true);
            this._setTranformChange();
            this._shouldRefreshLayout();
        }
    }
    get_width() {
        if (!this.autoSize)
            return (this._width == 0 && (this._sizeFlag & 1) == 0 && this.texture) ? this.texture.width : this._width;
        if (this.texture)
            return this.texture.width;
        if (!this._graphics && this._children.length === 0)
            return 0;
        return this.getSelfBounds().width;
    }
    get height() {
        return this.get_height();
    }
    set height(value) {
        this.set_height(value);
    }
    set_height(value) {
        let flag = this._sizeFlag;
        if (value == null) {
            value = 0;
            this._sizeFlag &= ~2;
        }
        else if (value == 0)
            this._sizeFlag |= 2;
        else
            this._sizeFlag &= ~2;
        if (this._height !== value || flag != this._sizeFlag) {
            this._height = value;
            this._setHeight(value);
            this._setPivotY(this._anchorY * value);
            if (this._graphics)
                this._graphics._clearBoundsCache(true);
            this._setTranformChange();
            this._shouldRefreshLayout();
        }
    }
    get_height() {
        if (!this.autoSize)
            return (this._height == 0 && (this._sizeFlag & 2) == 0 && this.texture) ? this.texture.height : this._height;
        if (this.texture)
            return this.texture.height;
        if (!this._graphics && this._children.length === 0)
            return 0;
        return this.getSelfBounds().height;
    }
    get _isWidthSet() {
        return this._width != 0 || (this._sizeFlag & 1) != 0;
    }
    get _isHeightSet() {
        return this._height != 0 || (this._sizeFlag & 2) != 0;
    }
    _setWidth(value) {
    }
    _setHeight(value) {
    }
    _shouldRefreshLayout() {
    }
    get displayWidth() {
        return this.width * this.scaleX;
    }
    get displayHeight() {
        return this.height * this.scaleY;
    }
    setSelfBounds(bound) {
        this._getBoundsStyle().userBounds = bound;
    }
    getBounds() {
        return this._getBoundsStyle().bounds = Rectangle._getWrapRec(this._boundPointsToParent());
    }
    getSelfBounds() {
        if (this._boundStyle && this._boundStyle.userBounds)
            return this._boundStyle.userBounds;
        if (!this._graphics && this._children.length === 0 && !this._texture)
            return Rectangle.TEMP.setTo(0, 0, this.width, this.height);
        return this._getBoundsStyle().bounds = Rectangle._getWrapRec(this._getBoundPointsM(false));
    }
    _boundPointsToParent(ifRotate = false) {
        let pX = 0, pY = 0;
        if (this._style) {
            pX = this.pivotX;
            pY = this.pivotY;
            ifRotate = ifRotate || (this._style.rotation !== 0);
            if (this._style.scrollRect) {
                pX += this._style.scrollRect.x;
                pY += this._style.scrollRect.y;
            }
        }
        let pList = this._getBoundPointsM(ifRotate);
        if (!pList || pList.length < 1)
            return pList;
        if (pList.length != 8) {
            pList = ifRotate ? GrahamScan.scanPList(pList) : Rectangle._getWrapRec(pList, Rectangle.TEMP)._getBoundPoints();
        }
        if (!this.transform) {
            Utils.transPointList(pList, this._x - pX, this._y - pY);
            return pList;
        }
        let tPoint = Point.TEMP;
        let len = pList.length;
        for (let i = 0; i < len; i += 2) {
            tPoint.x = pList[i];
            tPoint.y = pList[i + 1];
            this.toParentPoint(tPoint);
            pList[i] = tPoint.x;
            pList[i + 1] = tPoint.y;
        }
        return pList;
    }
    getGraphicBounds(realSize = false) {
        if (!this._graphics)
            return Rectangle.TEMP.setTo(0, 0, 0, 0);
        return this._graphics.getBounds(realSize);
    }
    _getBoundPointsM(ifRotate = false) {
        if (this._boundStyle && this._boundStyle.userBounds)
            return this._boundStyle.userBounds._getBoundPoints();
        if (!this._boundStyle)
            this._getBoundsStyle();
        let rst = this._boundStyle.temBM;
        if (!rst)
            rst = this._boundStyle.temBM = [];
        if (this._style.scrollRect) {
            rst.length = 0;
            var rec = Rectangle.TEMP;
            rec.copyFrom(this._style.scrollRect);
            rst.push(...rec._getBoundPoints());
            return rst;
        }
        let pList;
        if (this._graphics) {
            pList = this._graphics.getBoundPoints();
        }
        else {
            rst.length = 0;
            pList = rst;
        }
        if (this._texture) {
            rec = Rectangle.TEMP;
            rec.setTo(0, 0, this.width || this._texture.width, this.height || this._texture.height);
            pList.push(...rec._getBoundPoints());
        }
        let chidren = this._children;
        for (let i = 0, n = chidren.length; i < n; i++) {
            let child = chidren[i];
            if (child._visible === true && child._cacheStyle.maskParent != this) {
                let cList = child._boundPointsToParent(ifRotate);
                if (cList) {
                    if (pList)
                        pList.push(...cList);
                    else
                        pList = cList;
                }
            }
        }
        return pList;
    }
    _getCacheStyle() {
        this._cacheStyle === CacheStyle.EMPTY && (this._cacheStyle = CacheStyle.create());
        return this._cacheStyle;
    }
    getStyle() {
        this._style === SpriteStyle.EMPTY && (this._style = SpriteStyle.create());
        return this._style;
    }
    setStyle(value) {
        this._style = value;
    }
    get scaleX() {
        return this._style.scaleX;
    }
    set scaleX(value) {
        this.set_scaleX(value);
    }
    get scaleY() {
        return this._style.scaleY;
    }
    set scaleY(value) {
        this.set_scaleY(value);
    }
    set_scaleX(value) {
        var style = this.getStyle();
        if (style.scaleX !== value) {
            this._setScaleX(value);
            this._setTranformChange();
            this._shouldRefreshLayout();
        }
    }
    get_scaleX() {
        return this._style.scaleX;
    }
    set_scaleY(value) {
        var style = this.getStyle();
        if (style.scaleY !== value) {
            this._setScaleY(value);
            this._setTranformChange();
            this._shouldRefreshLayout();
        }
    }
    get_scaleY() {
        return this._style.scaleY;
    }
    _setScaleX(value) {
        this._style.scaleX = value;
    }
    _setScaleY(value) {
        this._style.scaleY = value;
    }
    get rotation() {
        return this._style.rotation;
    }
    set rotation(value) {
        var style = this.getStyle();
        if (style.rotation !== value) {
            this._setRotation(value);
            this._setTranformChange();
        }
    }
    _setRotation(value) {
        this._style.rotation = value;
    }
    get skewX() {
        return this._style.skewX;
    }
    set skewX(value) {
        var style = this.getStyle();
        if (style.skewX !== value) {
            this._setSkewX(value);
            this._setTranformChange();
        }
    }
    _setSkewX(value) {
        this._style.skewX = value;
    }
    get skewY() {
        return this._style.skewY;
    }
    set skewY(value) {
        var style = this.getStyle();
        if (style.skewY !== value) {
            this._setSkewY(value);
            this._setTranformChange();
        }
    }
    _setSkewY(value) {
        this._style.skewY = value;
    }
    _createTransform() {
        return Matrix.create();
    }
    _adjustTransform() {
        this._tfChanged = false;
        var style = this._style;
        var sx = style.scaleX, sy = style.scaleY;
        var sskx = style.skewX;
        var ssky = style.skewY;
        var rot = style.rotation;
        var m = this._transform || (this._transform = this._createTransform());
        if (rot || sx !== 1 || sy !== 1 || sskx !== 0 || ssky !== 0) {
            m._bTransform = true;
            var skx = (rot - sskx) * 0.0174532922222222;
            var sky = (rot + ssky) * 0.0174532922222222;
            var cx = Math.cos(sky);
            var ssx = Math.sin(sky);
            var cy = Math.sin(skx);
            var ssy = Math.cos(skx);
            m.a = sx * cx;
            m.b = sx * ssx;
            m.c = -sy * cy;
            m.d = sy * ssy;
            m.tx = m.ty = 0;
        }
        else {
            m.identity();
            this._renderType &= ~SpriteConst.TRANSFORM;
        }
        return m;
    }
    _setTransform(value) {
    }
    get transform() {
        return this._tfChanged ? this._adjustTransform() : this._transform;
    }
    set transform(value) {
        this.set_transform(value);
    }
    get_transform() {
        return this._tfChanged ? this._adjustTransform() : this._transform;
    }
    set_transform(value) {
        this._tfChanged = false;
        var m = this._transform || (this._transform = this._createTransform());
        value.copyTo(m);
        this._setTransform(m);
        if (value) {
            this._x = m.tx;
            this._y = m.ty;
            m.tx = m.ty = 0;
        }
        if (value)
            this._renderType |= SpriteConst.TRANSFORM;
        else {
            this._renderType &= ~SpriteConst.TRANSFORM;
        }
        this.parentRepaint();
    }
    _setPivotX(value) {
        var style = this.getStyle();
        style.pivotX = value;
    }
    _getPivotX() {
        return this._style.pivotX;
    }
    _setPivotY(value) {
        var style = this.getStyle();
        style.pivotY = value;
    }
    _getPivotY() {
        return this._style.pivotY;
    }
    get pivotX() {
        return this._getPivotX();
    }
    set pivotX(value) {
        var style = this.getStyle();
        if (style.pivotX != value) {
            this._setPivotX(value);
            let t = this.width;
            if (t != 0)
                this._anchorX = value / t;
            this._shouldRefreshLayout();
            this.repaint();
        }
    }
    get pivotY() {
        return this._getPivotY();
    }
    set pivotY(value) {
        var style = this.getStyle();
        if (style.pivotY != value) {
            this._setPivotY(value);
            let t = this.height;
            if (t != 0)
                this._anchorY = value / t;
            this._shouldRefreshLayout();
            this.repaint();
        }
    }
    get anchorX() {
        return this.get_anchorX();
    }
    get_anchorX() {
        return this._anchorX;
    }
    set anchorX(value) {
        this.set_anchorX(value);
    }
    set_anchorX(value) {
        if (isNaN(value))
            value = null;
        if (this._anchorX != value) {
            this._anchorX = value;
            if (value != null) {
                this._setPivotX(value * this.width);
                this._shouldRefreshLayout();
                this.repaint();
            }
        }
    }
    get anchorY() {
        return this.get_anchorY();
    }
    get_anchorY() {
        return this._anchorY;
    }
    set anchorY(value) {
        this.set_anchorY(value);
    }
    set_anchorY(value) {
        if (isNaN(value))
            value = null;
        if (this._anchorY != value) {
            this._anchorY = value;
            if (value != null) {
                this._setPivotY(value * this.height);
                this._shouldRefreshLayout();
                this.repaint();
            }
        }
    }
    _setAlpha(value) {
        if (this._style.alpha !== value) {
            var style = this.getStyle();
            style.alpha = value;
            if (value !== 1)
                this._renderType |= SpriteConst.ALPHA;
            else
                this._renderType &= ~SpriteConst.ALPHA;
            this.parentRepaint();
        }
    }
    _getAlpha() {
        return this._style.alpha;
    }
    get alpha() {
        return this._getAlpha();
    }
    set alpha(value) {
        value = value < 0 ? 0 : (value > 1 ? 1 : value);
        this._setAlpha(value);
    }
    get visible() {
        return this.get_visible();
    }
    set visible(value) {
        this.set_visible(value);
    }
    get_visible() {
        return this._visible;
    }
    set_visible(value) {
        if (this._visible !== value) {
            this._visible = value;
            this.parentRepaint(SpriteConst.REPAINT_ALL);
        }
    }
    get blendMode() {
        return this._style.blendMode;
    }
    set blendMode(value) {
        if (this.getStyle().blendMode != value) {
            this.getStyle().blendMode = value;
            if (value && value != "source-over")
                this._renderType |= SpriteConst.BLEND;
            else
                this._renderType &= ~SpriteConst.BLEND;
            this.parentRepaint();
        }
    }
    get graphics() {
        if (!this._graphics) {
            this.graphics = new Graphics();
            this._ownGraphics = true;
        }
        return this._graphics;
    }
    set graphics(value) {
        if (this._graphics)
            this._graphics._sp = null;
        this._graphics = value;
        if (value) {
            this._renderType |= SpriteConst.GRAPHICS;
            value._sp = this;
        }
        else {
            this._renderType &= ~SpriteConst.GRAPHICS;
        }
        this.repaint();
    }
    get scrollRect() {
        return this._style.scrollRect;
    }
    set scrollRect(value) {
        if (this.getStyle().scrollRect == null && value == null)
            return;
        this.getStyle().scrollRect = value;
        if (value) {
            this._renderType |= SpriteConst.CLIP;
        }
        else {
            this._renderType &= ~SpriteConst.CLIP;
        }
        this.repaint();
    }
    pos(x, y, speedMode = false) {
        if (this._x !== x || this._y !== y) {
            if (this._destroyed)
                return this;
            if (speedMode) {
                this._setX(x);
                this._setY(y);
                this.parentRepaint(SpriteConst.REPAINT_CACHE);
                var p = this._cacheStyle.maskParent;
                if (p) {
                    p.repaint(SpriteConst.REPAINT_CACHE);
                }
            }
            else {
                this.x = x;
                this.y = y;
            }
        }
        return this;
    }
    pivot(x, y) {
        this.pivotX = x;
        this.pivotY = y;
        return this;
    }
    size(width, height) {
        this.width = width;
        this.height = height;
        return this;
    }
    scale(scaleX, scaleY, speedMode) {
        if (this._destroyed)
            return this;
        var style = this.getStyle();
        if (style.scaleX != scaleX || style.scaleY != scaleY) {
            if (speedMode) {
                this._setScaleX(scaleX);
                this._setScaleY(scaleY);
                this._setTranformChange();
                this._shouldRefreshLayout();
            }
            else {
                this.scaleX = scaleX;
                this.scaleY = scaleY;
            }
        }
        return this;
    }
    skew(skewX, skewY) {
        this.skewX = skewX;
        this.skewY = skewY;
        return this;
    }
    render(ctx, x, y) {
        RenderSprite.renders[this._renderType]._fun(this, ctx, x + this._x, y + this._y);
        this._repaint = 0;
    }
    drawToCanvas(canvasWidth, canvasHeight, offsetX, offsetY) {
        return Sprite.drawToCanvas(this, this._renderType, canvasWidth, canvasHeight, offsetX, offsetY);
    }
    drawToTexture(canvasWidth, canvasHeight, offsetX, offsetY, rt = null) {
        let res = Sprite.drawToTexture(this, this._renderType, canvasWidth, canvasHeight, offsetX, offsetY, rt);
        return res;
    }
    drawToTexture3D(offx, offy, tex) {
        throw 'not implement';
    }
    static drawToCanvas(sprite, _renderType, canvasWidth, canvasHeight, offsetX, offsetY) {
        offsetX -= sprite.x;
        offsetY -= sprite.y;
        offsetX |= 0;
        offsetY |= 0;
        canvasWidth |= 0;
        canvasHeight |= 0;
        var ctx = new Context();
        ctx.size(canvasWidth, canvasHeight);
        ctx.asBitmap = true;
        ctx._targets.start();
        ctx._targets.clear(0, 0, 0, 0);
        RenderSprite.renders[_renderType]._fun(sprite, ctx, offsetX, offsetY);
        ctx.flush();
        ctx._targets.end();
        ctx._targets.restore();
        var dt = ctx._targets.getData(0, 0, canvasWidth, canvasHeight);
        ctx.destroy();
        var imgdata = new ImageData(canvasWidth, canvasHeight);
        ;
        var lineLen = canvasWidth * 4;
        var temp = new Uint8Array(lineLen);
        var dst = imgdata.data;
        var y = canvasHeight - 1;
        var off = y * lineLen;
        var srcoff = 0;
        for (; y >= 0; y--) {
            dst.set(dt.subarray(srcoff, srcoff + lineLen), off);
            off -= lineLen;
            srcoff += lineLen;
        }
        var canv = new HTMLCanvas(true);
        canv.size(canvasWidth, canvasHeight);
        var ctx2d = canv.getContext('2d');
        ctx2d.putImageData(imgdata, 0, 0);
        ;
        return canv;
    }
    static drawToTexture(sprite, _renderType, canvasWidth, canvasHeight, offsetX, offsetY, rt = null) {
        if (!Sprite.drawtocanvCtx) {
            Sprite.drawtocanvCtx = new Context();
        }
        offsetX -= sprite.x;
        offsetY -= sprite.y;
        offsetX |= 0;
        offsetY |= 0;
        canvasWidth |= 0;
        canvasHeight |= 0;
        var ctx = rt ? Sprite.drawtocanvCtx : new Context();
        ctx.clear();
        ctx.size(canvasWidth, canvasHeight);
        if (rt) {
            ctx._targets = rt;
        }
        else {
            ctx.asBitmap = true;
        }
        let texRT;
        if (ctx._targets) {
            ctx._targets.start();
            let color = RenderTexture2D._clearColor;
            ctx._targets.clear(color.r, color.g, color.b, color.a);
            ctx._drawingToTexture = true;
            RenderSprite.renders[_renderType]._fun(sprite, ctx, offsetX, offsetY);
            ctx._drawingToTexture = false;
            ctx.flush();
            ctx._targets.end();
            ctx._targets.restore();
            if (!rt)
                texRT = ctx._targets;
            ctx._targets = null;
        }
        if (!rt) {
            var rtex = new Texture(ctx._targets ? ctx._targets : texRT, Texture.INV_UV);
            ctx.destroy(true);
            return rtex;
        }
        sprite._repaint = 0;
        return rt;
    }
    customRender(context, x, y) {
        this._repaint = SpriteConst.REPAINT_ALL;
    }
    _applyFilters() {
    }
    get filters() {
        return this._cacheStyle.filters;
    }
    set filters(value) {
        value && value.length === 0 && (value = null);
        this._getCacheStyle().filters = value ? value.slice() : null;
        if (value)
            this._renderType |= SpriteConst.FILTERS;
        else
            this._renderType &= ~SpriteConst.FILTERS;
        if (value && value.length > 0) {
            if (!this._getBit(NodeFlags.DISPLAY))
                this._setBitUp(NodeFlags.DISPLAY);
            if (!(value.length == 1 && (value[0] instanceof ColorFilter))) {
                this._getCacheStyle().cacheForFilters = true;
                this._checkCanvasEnable();
            }
        }
        else {
            if (this._cacheStyle.cacheForFilters) {
                this._cacheStyle.cacheForFilters = false;
                this._checkCanvasEnable();
            }
        }
        this._getCacheStyle().hasGlowFilter = this._isHaveGlowFilter();
        this.repaint();
    }
    _isHaveGlowFilter() {
        var i, len;
        if (this.filters) {
            for (i = 0; i < this.filters.length; i++) {
                if (this.filters[i].type == Filter.GLOW) {
                    return true;
                }
            }
        }
        for (i = 0, len = this._children.length; i < len; i++) {
            if (this._children[i]._isHaveGlowFilter()) {
                return true;
            }
        }
        return false;
    }
    localToGlobal(point, createNewPoint = false, globalNode = null) {
        if (createNewPoint === true) {
            point = new Point(point.x, point.y);
        }
        var ele = this;
        globalNode = globalNode || ILaya.stage;
        while (ele && !ele._destroyed) {
            if (ele == globalNode)
                break;
            point = ele.toParentPoint(point);
            ele = ele.parent;
        }
        return point;
    }
    globalToLocal(point, createNewPoint = false, globalNode = null) {
        if (createNewPoint) {
            point = new Point(point.x, point.y);
        }
        var ele = this;
        var list = [];
        globalNode = globalNode || ILaya.stage;
        while (ele && !ele._destroyed) {
            if (ele == globalNode)
                break;
            list.push(ele);
            ele = ele.parent;
        }
        var i = list.length - 1;
        while (i >= 0) {
            ele = list[i];
            point = ele.fromParentPoint(point);
            i--;
        }
        return point;
    }
    toParentPoint(point) {
        if (!point)
            return point;
        point.x -= this.pivotX;
        point.y -= this.pivotY;
        if (this.transform) {
            this._transform.transformPoint(point);
        }
        point.x += this._x;
        point.y += this._y;
        var scroll = this._style.scrollRect;
        if (scroll) {
            point.x -= scroll.x;
            point.y -= scroll.y;
        }
        return point;
    }
    fromParentPoint(point) {
        if (!point)
            return point;
        point.x -= this._x;
        point.y -= this._y;
        var scroll = this._style.scrollRect;
        if (scroll) {
            point.x += scroll.x;
            point.y += scroll.y;
        }
        if (this.transform) {
            this._transform.invertTransformPoint(point);
        }
        point.x += this.pivotX;
        point.y += this.pivotY;
        return point;
    }
    onStartListeningToType(type) {
        super.onStartListeningToType(type);
        if (this._mouseState !== 1 && Event.isMouseEvent(type)) {
            this.mouseEnabled = true;
            this._setBit(NodeFlags.HAS_MOUSE, true);
            if (this._parent) {
                this._onDisplay();
            }
        }
    }
    _onDisplay(v) {
        if (this._mouseState !== 1) {
            var ele = this;
            ele = ele.parent;
            while (ele && ele._mouseState !== 1) {
                if (ele._getBit(NodeFlags.HAS_MOUSE))
                    break;
                ele.mouseEnabled = true;
                ele._setBit(NodeFlags.HAS_MOUSE, true);
                ele = ele.parent;
            }
        }
    }
    _setParent(value) {
        super._setParent(value);
        if (value && this._getBit(NodeFlags.HAS_MOUSE)) {
            this._onDisplay();
        }
    }
    loadImage(url, complete = null) {
        if (!url) {
            this.texture = null;
            this.repaint(SpriteConst.REPAINT_ALL);
            complete && complete.run();
        }
        else {
            let tex = ILaya.loader.getRes(url);
            if (tex) {
                this.texture = tex;
                this.repaint(SpriteConst.REPAINT_ALL);
                complete && complete.run();
            }
            else {
                if (this._skinBaseUrl)
                    url = URL.formatURL(url, this._skinBaseUrl);
                ILaya.loader.load(url).then((tex) => {
                    this.texture = tex;
                    this.repaint(SpriteConst.REPAINT_ALL);
                    complete && complete.run();
                });
            }
        }
        return this;
    }
    static fromImage(url) {
        return new Sprite().loadImage(url);
    }
    repaint(type = SpriteConst.REPAINT_CACHE) {
        if (!(this._repaint & type)) {
            this._repaint |= type;
            this.parentRepaint(type);
        }
        if (this._cacheStyle && this._cacheStyle.maskParent) {
            this._cacheStyle.maskParent.repaint(type);
        }
    }
    _needRepaint() {
        return (this._repaint & SpriteConst.REPAINT_CACHE) && this._cacheStyle.enableCanvasRender && this._cacheStyle.reCache;
    }
    _childChanged(child = null) {
        super._childChanged(child);
        if (this._children.length)
            this._renderType |= SpriteConst.CHILDS;
        else
            this._renderType &= ~SpriteConst.CHILDS;
        if (child && this._getBit(NodeFlags.HAS_ZORDER))
            ILaya.systemTimer.callLater(this, this.updateZOrder);
        this.repaint(SpriteConst.REPAINT_ALL);
    }
    parentRepaint(type = SpriteConst.REPAINT_CACHE) {
        var p = this._parent;
        if (p && !(p._repaint & type)) {
            p._repaint |= type;
            p.parentRepaint(type);
        }
    }
    get stage() {
        return ILaya.stage;
    }
    get hitArea() {
        return this._style.hitArea;
    }
    set hitArea(value) {
        this.getStyle().hitArea = value;
    }
    _setMask(value) {
    }
    get mask() {
        return this._cacheStyle.mask;
    }
    set mask(value) {
        if (value && this.mask == value && value._cacheStyle.maskParent == this)
            return;
        if (this.mask)
            this.mask._getCacheStyle().maskParent = null;
        this._getCacheStyle().mask = value;
        this._setMask(value);
        this._checkCanvasEnable();
        if (value) {
            value._getCacheStyle().maskParent = this;
            this._renderType |= SpriteConst.MASK;
        }
        else
            this._renderType &= ~SpriteConst.MASK;
        this.repaint();
    }
    get mouseEnabled() {
        return this._mouseState > 1;
    }
    set mouseEnabled(value) {
        this._mouseState = value ? 2 : 1;
    }
    startDrag(area = null, hasInertia = false, elasticDistance = 0, elasticBackTime = 300, data = null, ratio = 0.92) {
        this._style.dragging || (this.getStyle().dragging = new Dragging());
        this._style.dragging.start(this, area, hasInertia, elasticDistance, elasticBackTime, data, ratio);
    }
    stopDrag() {
        this._style.dragging && this._style.dragging.stop();
    }
    _setDisplay(value) {
        if (!value) {
            if (this._cacheStyle) {
                this._cacheStyle.releaseContext();
                this._cacheStyle.releaseFilterCache();
                if (this._cacheStyle.hasGlowFilter) {
                    this._cacheStyle.hasGlowFilter = false;
                }
            }
        }
        super._setDisplay(value);
    }
    hitTestPoint(x, y) {
        var point = this.globalToLocal(Point.TEMP.setTo(x, y));
        x = point.x;
        y = point.y;
        var rect = this._style.hitArea ? this._style.hitArea : (this._isWidthSet && this._isHeightSet) ? Rectangle.TEMP.setTo(0, 0, this._width, this._height) : this.getSelfBounds();
        return rect.contains(x, y);
    }
    getMousePoint() {
        return this.globalToLocal(Point.TEMP.setTo(ILaya.stage.mouseX, ILaya.stage.mouseY));
    }
    get globalScaleX() {
        var scale = 1;
        var ele = this;
        while (ele) {
            if (ele === ILaya.stage)
                break;
            scale *= ele.scaleX;
            ele = ele.parent;
        }
        return scale;
    }
    get globalRotation() {
        var angle = 0;
        var ele = this;
        while (ele) {
            if (ele === ILaya.stage)
                break;
            angle += ele.rotation;
            ele = ele.parent;
        }
        return angle;
    }
    get globalScaleY() {
        var scale = 1;
        var ele = this;
        while (ele) {
            if (ele === ILaya.stage)
                break;
            scale *= ele.scaleY;
            ele = ele.parent;
        }
        return scale;
    }
    get mouseX() {
        return this.getMousePoint().x;
    }
    get mouseY() {
        return this.getMousePoint().y;
    }
    get zOrder() {
        return this._zOrder;
    }
    set zOrder(value) {
        if (this._zOrder != value) {
            this._zOrder = value;
            if (this._parent) {
                value && this._parent._setBit(NodeFlags.HAS_ZORDER, true);
                ILaya.systemTimer.callLater(this._parent, this.updateZOrder);
            }
        }
    }
    get texture() {
        return this._texture;
    }
    _setTexture(value) {
    }
    set texture(value) {
        if (typeof (value) == 'string') {
            this.loadImage(value);
        }
        else if (this._texture != value) {
            this._texture && this._texture._removeReference();
            this._texture = value;
            value && value._addReference();
            this._setTexture(value);
            this._setWidth(this.width);
            this._setHeight(this.height);
            if (value)
                this._renderType |= SpriteConst.TEXTURE;
            else
                this._renderType &= ~SpriteConst.TEXTURE;
            this.repaint();
        }
    }
    get viewport() {
        return this._style.viewport;
    }
    set viewport(value) {
        if (typeof (value) == 'string') {
            let recArr = value.split(",");
            if (recArr.length > 3) {
                value = new Rectangle(parseFloat(recArr[0]), parseFloat(recArr[1]), parseFloat(recArr[2]), parseFloat(recArr[3]));
            }
        }
        this.getStyle().viewport = value;
    }
    _setTranformChange() {
        this._tfChanged = true;
        this._renderType |= SpriteConst.TRANSFORM;
        this.parentRepaint(SpriteConst.REPAINT_CACHE);
    }
    set drawCallOptimize(value) {
        this._setBit(NodeFlags.DRAWCALL_OPTIMIZE, value);
    }
    get drawCallOptimize() {
        return this._getBit(NodeFlags.DRAWCALL_OPTIMIZE);
    }
    onAfterDeserialize() {
        super.onAfterDeserialize();
        if (LayaEnv.isPlaying) {
            if (this._gcmds) {
                this.graphics.cmds = this._gcmds;
                delete this._gcmds;
            }
            if (this._filters) {
                this.filters = this._filters;
                delete this._filters;
            }
        }
    }
}

//# sourceMappingURL=Sprite.js.map
