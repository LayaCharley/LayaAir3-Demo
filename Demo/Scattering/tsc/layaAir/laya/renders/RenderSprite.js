import { NodeFlags } from "../Const";
import { SpriteConst } from "../display/SpriteConst";
import { Filter } from "../filters/Filter";
import { Matrix } from "../maths/Matrix";
import { Rectangle } from "../maths/Rectangle";
import { Texture } from "../resource/Texture";
import { WebGLRTMgr } from "../resource/WebGLRTMgr";
import { Stat } from "../utils/Stat";
import { BlendMode } from "../webgl/canvas/BlendMode";
import { WebGLCacheAsNormalCanvas } from "../webgl/canvas/WebGLCacheAsNormalCanvas";
import { ShaderDefines2D } from "../webgl/shader/d2/ShaderDefines2D";
import { Value2D } from "../webgl/shader/d2/value/Value2D";
import { SubmitCMD } from "../webgl/submit/SubmitCMD";
import { LayaGLQuickRunner } from "./LayaGLQuickRunner";
import { ILaya } from "../../ILaya";
import { NativeFilter } from "../filters/NativeFilter";
import { LayaEnv } from "../../LayaEnv";
const INIT = 0x11111;
export class RenderSprite {
    constructor(type, next) {
        if (LayaGLQuickRunner.map[type] && LayaEnv.isPlaying) {
            this._fun = LayaGLQuickRunner.map[type];
            this._next = RenderSprite.NORENDER;
            return;
        }
        this._next = next || RenderSprite.NORENDER;
        switch (type) {
            case 0:
                this._fun = this._no;
                return;
            case SpriteConst.ALPHA:
                this._fun = this._alpha;
                return;
            case SpriteConst.TRANSFORM:
                this._fun = this._transform;
                return;
            case SpriteConst.BLEND:
                this._fun = this._blend;
                return;
            case SpriteConst.CANVAS:
                this._fun = this._canvas;
                return;
            case SpriteConst.MASK:
                if (LayaEnv.isConch && !window.conchConfig.conchWebGL) {
                    this._fun = this._maskNative;
                }
                else {
                    this._fun = this._mask;
                }
                return;
            case SpriteConst.CLIP:
                this._fun = this._clip;
                return;
            case SpriteConst.STYLE:
                this._fun = this._style;
                return;
            case SpriteConst.GRAPHICS:
                this._fun = this._graphics;
                return;
            case SpriteConst.CHILDS:
                this._fun = this._children;
                return;
            case SpriteConst.CUSTOM:
                this._fun = this._custom;
                return;
            case SpriteConst.TEXTURE:
                this._fun = this._texture;
                return;
            case SpriteConst.FILTERS:
                if (LayaEnv.isConch && !window.conchConfig.conchWebGL) {
                    this._fun = NativeFilter._filter;
                }
                else {
                    this._fun = Filter._filter;
                }
                return;
            case SpriteConst.HITAREA:
                this._fun = this._hitarea;
                return;
            case INIT:
                this._fun = RenderSprite._initRenderFun;
                return;
        }
        this.onCreate(type);
    }
    static __init__() {
        LayaGLQuickRunner.__init__();
        var i, len;
        var initRender;
        initRender = new RenderSprite(INIT, null);
        len = RenderSprite.renders.length = SpriteConst.CHILDS * 2;
        for (i = 0; i < len; i++)
            RenderSprite.renders[i] = initRender;
        RenderSprite.renders[0] = new RenderSprite(0, null);
    }
    static _initRenderFun(sprite, context, x, y) {
        var type = sprite._renderType;
        var r = RenderSprite.renders[type] = RenderSprite._getTypeRender(type);
        r._fun(sprite, context, x, y);
    }
    static _getTypeRender(type) {
        if (LayaGLQuickRunner.map[type] && LayaEnv.isPlaying)
            return new RenderSprite(type, null);
        var rst = null;
        var tType = SpriteConst.CHILDS;
        while (tType > 0) {
            if (tType & type)
                rst = new RenderSprite(tType, rst);
            tType = tType >> 1;
        }
        return rst;
    }
    onCreate(type) {
    }
    _style(sprite, context, x, y) {
    }
    _no(sprite, context, x, y) {
    }
    _custom(sprite, context, x, y) {
        sprite.customRender(context, x, y);
        this._next._fun.call(this._next, sprite, context, 0, 0);
    }
    _clip(sprite, context, x, y) {
        let next = this._next;
        if (next == RenderSprite.NORENDER)
            return;
        if (sprite._getBit(NodeFlags.DISABLE_INNER_CLIPPING) && !context._drawingToTexture) {
            next._fun.call(next, sprite, context, x, y);
            return;
        }
        let r = sprite._style.scrollRect;
        let width = r.width;
        let height = r.height;
        if (width === 0)
            width = 0.001;
        if (height === 0)
            height = 0.001;
        context.save();
        context.clipRect(x, y, width, height);
        next._fun.call(next, sprite, context, x - r.x, y - r.y);
        context.restore();
    }
    _texture(sprite, context, x, y) {
        if (!sprite._getBit(NodeFlags.HIDE_BY_EDITOR)) {
            var tex = sprite.texture;
            if (tex._getSource()) {
                var width = sprite._isWidthSet ? sprite._width : tex.sourceWidth;
                var height = sprite._isHeightSet ? sprite._height : tex.sourceHeight;
                var wRate = width / tex.sourceWidth;
                var hRate = height / tex.sourceHeight;
                width = tex.width * wRate;
                height = tex.height * hRate;
                if (width > 0 && height > 0) {
                    let px = x - sprite.pivotX + tex.offsetX * wRate;
                    let py = y - sprite.pivotY + tex.offsetY * hRate;
                    context.drawTexture(tex, px, py, width, height, 0xffffffff);
                }
            }
        }
        var next = this._next;
        if (next != RenderSprite.NORENDER)
            next._fun.call(next, sprite, context, x, y);
    }
    _graphics(sprite, context, x, y) {
        if (!sprite._getBit(NodeFlags.HIDE_BY_EDITOR)) {
            var style = sprite._style;
            var g = sprite._graphics;
            g && g._render(sprite, context, x - style.pivotX, y - style.pivotY);
        }
        var next = this._next;
        if (next != RenderSprite.NORENDER)
            next._fun.call(next, sprite, context, x, y);
    }
    _hitarea(sprite, context, x, y) {
        if (!context._drawingToTexture && sprite.hitArea) {
            var style = sprite._style;
            var g = sprite.hitArea._hit;
            var temp = context.globalAlpha;
            context.globalAlpha *= 0.5;
            g && g._render(sprite, context, x - style.pivotX, y - style.pivotY);
            g = sprite.hitArea._unHit;
            g && g._render(sprite, context, x - style.pivotX, y - style.pivotY);
            context.globalAlpha = temp;
        }
        var next = this._next;
        if (next != RenderSprite.NORENDER)
            next._fun.call(next, sprite, context, x, y);
    }
    _alpha(sprite, context, x, y) {
        var style = sprite._style;
        var alpha;
        if ((alpha = style.alpha) > 0.01 || sprite._needRepaint()) {
            var temp = context.globalAlpha;
            context.globalAlpha *= alpha;
            var next = this._next;
            next._fun.call(next, sprite, context, x, y);
            context.globalAlpha = temp;
        }
    }
    _transform(sprite, context, x, y) {
        var transform = sprite.transform, _next = this._next;
        if (transform && _next != RenderSprite.NORENDER) {
            context.save();
            context.transform(transform.a, transform.b, transform.c, transform.d, transform.tx + x, transform.ty + y);
            _next._fun.call(_next, sprite, context, 0, 0);
            context.restore();
        }
        else {
            if (_next != RenderSprite.NORENDER)
                _next._fun.call(_next, sprite, context, x, y);
        }
    }
    _children(sprite, context, x, y) {
        let style = sprite._style;
        let childs = sprite._children, n = childs.length;
        x = x - sprite.pivotX;
        y = y - sprite.pivotY;
        let textLastRender = sprite._getBit(NodeFlags.DRAWCALL_OPTIMIZE) && context.drawCallOptimize(true);
        let drawingToTexture = context._drawingToTexture;
        let rect;
        let left, top, right, bottom, x2, y2;
        if (style.viewport) {
            rect = style.viewport;
            left = rect.x;
            top = rect.y;
            right = rect.right;
            bottom = rect.bottom;
        }
        for (let i = 0; i < n; ++i) {
            let ele = childs[i];
            let visFlag;
            if (drawingToTexture)
                visFlag = ele._visible && !ele._getBit(NodeFlags.ESCAPE_DRAWING_TO_TEXTURE);
            else
                visFlag = ele._visible || ele._getBit(NodeFlags.DISABLE_VISIBILITY);
            if (visFlag) {
                if (rect && ((x2 = ele._x) >= right || (x2 + ele.width) <= left || (y2 = ele._y) >= bottom || (y2 + ele.height) <= top))
                    visFlag = false;
                else if (sprite._cacheStyle.mask == ele && !ele._getBit(NodeFlags.DISABLE_VISIBILITY))
                    visFlag = false;
            }
            if (visFlag) {
                if (ele._getBit(NodeFlags.DISABLE_OUTER_CLIPPING))
                    context.clipRect(0, 0, 1, 1, true);
                ele.render(context, x, y);
            }
        }
        textLastRender && context.drawCallOptimize(false);
    }
    _canvas(sprite, context, x, y) {
        var _cacheStyle = sprite._cacheStyle;
        var _next = this._next;
        if (!_cacheStyle.enableCanvasRender || !context._drawingToTexture && _cacheStyle.mask && _cacheStyle.mask._getBit(NodeFlags.DISABLE_VISIBILITY)) {
            _next._fun.call(_next, sprite, context, x, y);
            return;
        }
        _cacheStyle.cacheAs === 'bitmap' ? (Stat.canvasBitmap++) : (Stat.canvasNormal++);
        var cacheNeedRebuild = false;
        var textNeedRestore = false;
        if (_cacheStyle.canvas) {
            var canv = _cacheStyle.canvas;
            textNeedRestore = canv.isTextNeedRestore && canv.isTextNeedRestore();
            cacheNeedRebuild = canv.isCacheValid && !canv.isCacheValid();
        }
        if (sprite._needRepaint() || (!_cacheStyle.canvas) || textNeedRestore || cacheNeedRebuild || ILaya.stage.isGlobalRepaint()) {
            if (_cacheStyle.cacheAs === 'normal') {
                if (context._targets) {
                    _next._fun.call(_next, sprite, context, x, y);
                    return;
                }
                else {
                    this._canvas_webgl_normal_repaint(sprite, context);
                }
            }
            else {
                this._canvas_repaint(sprite, context, x, y);
            }
        }
        var tRec = _cacheStyle.cacheRect;
        context.drawCanvas(_cacheStyle.canvas, x + tRec.x, y + tRec.y, tRec.width, tRec.height);
    }
    _canvas_repaint(sprite, context, x, y) {
        var _cacheStyle = sprite._cacheStyle;
        var _next = this._next;
        var tx;
        var canvas = _cacheStyle.canvas;
        var left;
        var top;
        var tRec;
        var tCacheType = _cacheStyle.cacheAs;
        var w, h;
        var scaleX, scaleY;
        var scaleInfo;
        scaleInfo = _cacheStyle._calculateCacheRect(sprite, tCacheType, x, y);
        scaleX = scaleInfo.x;
        scaleY = scaleInfo.y;
        tRec = _cacheStyle.cacheRect;
        w = tRec.width * scaleX;
        h = tRec.height * scaleY;
        left = tRec.x;
        top = tRec.y;
        if (tCacheType === 'bitmap' && (w > 2048 || h > 2048)) {
            console.warn("cache bitmap size larger than 2048, cache ignored");
            _cacheStyle.releaseContext();
            _next._fun.call(_next, sprite, context, x, y);
            return;
        }
        if (!canvas) {
            _cacheStyle.createContext();
            canvas = _cacheStyle.canvas;
        }
        tx = canvas.context;
        tx.sprite = sprite;
        (canvas.width != w || canvas.height != h) && canvas.size(w, h);
        if (tCacheType === 'bitmap')
            tx.asBitmap = true;
        else if (tCacheType === 'normal')
            tx.asBitmap = false;
        tx.clear();
        if (scaleX != 1 || scaleY != 1) {
            var ctx = tx;
            ctx.save();
            ctx.scale(scaleX, scaleY);
            _next._fun.call(_next, sprite, tx, -left, -top);
            ctx.restore();
            sprite._applyFilters();
        }
        else {
            ctx = tx;
            _next._fun.call(_next, sprite, tx, -left, -top);
            sprite._applyFilters();
        }
        if (_cacheStyle.staticCache)
            _cacheStyle.reCache = false;
        Stat.canvasReCache++;
    }
    _canvas_webgl_normal_repaint(sprite, context) {
        var _cacheStyle = sprite._cacheStyle;
        var _next = this._next;
        var canvas = _cacheStyle.canvas;
        var tCacheType = _cacheStyle.cacheAs;
        _cacheStyle._calculateCacheRect(sprite, tCacheType, 0, 0);
        if (!canvas) {
            canvas = new WebGLCacheAsNormalCanvas(context, sprite);
            _cacheStyle.canvas = canvas;
        }
        var tx = canvas.context;
        canvas.startRec();
        _next._fun.call(_next, sprite, tx, sprite.pivotX, sprite.pivotY);
        sprite._applyFilters();
        Stat.canvasReCache++;
        canvas.endRec();
    }
    _blend(sprite, context, x, y) {
        var style = sprite._style;
        var next = this._next;
        if (style.blendMode) {
            context.save();
            context.globalCompositeOperation = style.blendMode;
            next._fun.call(next, sprite, context, x, y);
            context.restore();
        }
        else {
            next._fun.call(next, sprite, context, x, y);
        }
    }
    _mask(sprite, ctx, x, y) {
        let next = this._next;
        let mask = sprite.mask;
        if (mask && (!mask._getBit(NodeFlags.DISABLE_VISIBILITY) || ctx._drawingToTexture)) {
            ctx.save();
            let preBlendMode = ctx.globalCompositeOperation;
            let tRect = new Rectangle();
            tRect.copyFrom(mask.getBounds());
            let w = tRect.width = Math.round(tRect.width);
            let h = tRect.height = Math.round(tRect.height);
            tRect.x = Math.round(tRect.x);
            tRect.y = Math.round(tRect.y);
            if (w > 0 && h > 0) {
                let tmpRT = WebGLRTMgr.getRT(w, h);
                ctx.breakNextMerge();
                ctx.pushRT();
                ctx.addRenderObject(SubmitCMD.create([ctx, tmpRT, w, h], RenderSprite.tmpTarget, this));
                mask.render(ctx, -tRect.x, -tRect.y);
                ctx.breakNextMerge();
                ctx.popRT();
                ctx.save();
                let shrink = 0.1;
                ctx.clipRect(x + tRect.x - sprite.getStyle().pivotX + shrink, y + tRect.y - sprite.getStyle().pivotY + shrink, w - shrink * 2, h - shrink * 2);
                next._fun.call(next, sprite, ctx, x, y);
                ctx.restore();
                preBlendMode = ctx.globalCompositeOperation;
                ctx.addRenderObject(SubmitCMD.create(["mask"], RenderSprite.setBlendMode, this));
                let shaderValue = Value2D.create(ShaderDefines2D.TEXTURE2D, 0);
                let uv = Texture.INV_UV;
                ctx.drawTarget(tmpRT, x + tRect.x - sprite.getStyle().pivotX, y + tRect.y - sprite.getStyle().pivotY, w, h, Matrix.TEMP.identity(), shaderValue, uv, 6);
                ctx.addRenderObject(SubmitCMD.create([tmpRT], RenderSprite.recycleTarget, this));
            }
            ctx.addRenderObject(SubmitCMD.create([preBlendMode], RenderSprite.setBlendMode, this));
            ctx.restore();
        }
        else {
            next._fun.call(next, sprite, ctx, x, y);
        }
    }
    _maskNative(sprite, ctx, x, y) {
        var next = this._next;
        var mask = sprite.mask;
        if (mask) {
            ctx.save();
            var preBlendMode = ctx.globalCompositeOperation;
            var tRect = new Rectangle();
            tRect.copyFrom(mask.getBounds());
            let w = tRect.width = Math.round(tRect.width);
            let h = tRect.height = Math.round(tRect.height);
            tRect.x = Math.round(tRect.x);
            tRect.y = Math.round(tRect.y);
            if (w > 0 && h > 0) {
                let tmpRT = ctx.drawMask(w, h);
                mask.render(ctx, -tRect.x, -tRect.y);
                let shrink = 0.1;
                ctx.drawMasked(x + tRect.x - sprite.getStyle().pivotX + shrink, y + tRect.y - sprite.getStyle().pivotY + shrink, w - shrink * 2, h - shrink * 2);
                next._fun.call(next, sprite, ctx, x, y);
                ctx.drawMaskComposite(tmpRT, x + tRect.x - sprite.getStyle().pivotX, y + tRect.y - sprite.getStyle().pivotY, w, h);
            }
            ctx.restore();
        }
        else {
            next._fun.call(next, sprite, ctx, x, y);
        }
    }
    static tmpTarget(ctx, rt, w, h) {
        rt.start();
        rt.clear(0, 0, 0, 0);
    }
    static recycleTarget(rt) {
        WebGLRTMgr.releaseRT(rt);
    }
    static setBlendMode(blendMode) {
        BlendMode.targetFns[BlendMode.TOINT[blendMode]]();
    }
}
RenderSprite.renders = [];
RenderSprite.NORENDER = new RenderSprite(0, null);

//# sourceMappingURL=RenderSprite.js.map
