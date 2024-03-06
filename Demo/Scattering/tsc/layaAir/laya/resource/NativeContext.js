import { RenderTargetFormat } from "../RenderEngine/RenderEnum/RenderTargetFormat";
import { Const } from "../Const";
import { LayaGL } from "../layagl/LayaGL";
import { Matrix } from "../maths/Matrix";
import { BlendEquationSeparate } from "../RenderEngine/RenderEnum/BlendEquationSeparate";
import { BlendFactor } from "../RenderEngine/RenderEnum/BlendFactor";
import { CullMode } from "../RenderEngine/RenderEnum/CullMode";
import { RenderStateType } from "../RenderEngine/RenderEnum/RenderStateType";
import { ColorUtils } from "../utils/ColorUtils";
import { BlendMode } from "../webgl/canvas/BlendMode";
import { NativeWebGLCacheAsNormalCanvas } from "../webgl/canvas/NativeWebGLCacheAsNormalCanvas";
import { BufferState } from "../webgl/utils/BufferState";
import { RenderTexture } from "./RenderTexture";
import { NativeRenderTexture2D } from "./NativeRenderTexture2D";
var CONTEXT2D_FUNCTION_ID;
(function (CONTEXT2D_FUNCTION_ID) {
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["SIZE"] = 0] = "SIZE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["CLEAR"] = 1] = "CLEAR";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["SAVE"] = 2] = "SAVE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["TRANSFORM"] = 3] = "TRANSFORM";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["ALPHA"] = 4] = "ALPHA";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["RESTORE"] = 5] = "RESTORE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL_STYLE"] = 6] = "FILL_STYLE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL_RECT"] = 7] = "FILL_RECT";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["STROKE_STYLE"] = 8] = "STROKE_STYLE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["LINE_WIDTH"] = 9] = "LINE_WIDTH";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["STROKE_RECT"] = 10] = "STROKE_RECT";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL_WORD_TEXT"] = 11] = "FILL_WORD_TEXT";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_TEXTURE_SIZE_GRID"] = 12] = "DRAW_TEXTURE_SIZE_GRID";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_TEXTURE"] = 13] = "DRAW_TEXTURE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["CLIP_RECT"] = 14] = "CLIP_RECT";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_LINE"] = 15] = "DRAW_LINE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_LINES"] = 16] = "DRAW_LINES";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["SCALE"] = 17] = "SCALE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["TRANSLATE"] = 18] = "TRANSLATE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["ROTATE"] = 19] = "ROTATE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_CIRCLE"] = 20] = "DRAW_CIRCLE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_PIE"] = 21] = "DRAW_PIE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_POLY"] = 22] = "DRAW_POLY";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_CURVES"] = 23] = "DRAW_CURVES";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["BEGIN_PATH"] = 24] = "BEGIN_PATH";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["MOVE_TO"] = 25] = "MOVE_TO";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["LINE_TO"] = 26] = "LINE_TO";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["ARC_TO"] = 27] = "ARC_TO";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["CLOSE_PATH"] = 28] = "CLOSE_PATH";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL"] = 29] = "FILL";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["STROKE"] = 30] = "STROKE";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["SET_AS_BITMAP"] = 31] = "SET_AS_BITMAP";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_MASKED"] = 32] = "DRAW_MASKED";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["DRAW_TRANGLES"] = 33] = "DRAW_TRANGLES";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["SET_GLOBAL_COMPOSITE_OPERTAION"] = 34] = "SET_GLOBAL_COMPOSITE_OPERTAION";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL_WORDS"] = 35] = "FILL_WORDS";
    CONTEXT2D_FUNCTION_ID[CONTEXT2D_FUNCTION_ID["FILL_TEXTURE"] = 36] = "FILL_TEXTURE";
})(CONTEXT2D_FUNCTION_ID || (CONTEXT2D_FUNCTION_ID = {}));
export class NativeContext {
    constructor() {
        this._byteLen = 0;
        this.sprite = null;
        this._renderObject3DList = [];
        this._tmpMatrix = new Matrix();
        this._nativeObj = new window._conchContext(LayaGL.renderEngine._nativeObj);
        this._byteLen = 1024 * 512;
        this._tempRenderTexture2D = new NativeRenderTexture2D(0, 0, RenderTargetFormat.R8G8B8A8, RenderTargetFormat.None, false);
        this._init(false);
    }
    static __init__() {
    }
    _init(isSyncToRenderThread) {
        this._buffer = new ArrayBuffer(this._byteLen);
        this._idata = new Int32Array(this._buffer);
        this._fdata = new Float32Array(this._buffer);
        this._byteArray = new Uint8Array(this._buffer);
        var bufferConchRef = window.webglPlus.createArrayBufferRef(this._buffer, NativeContext.ARRAY_BUFFER_TYPE_CMD, isSyncToRenderThread, NativeContext.ARRAY_BUFFER_REF_REFERENCE);
        this._nativeObj.setSharedCommandBuffer(bufferConchRef);
        this._idata[0] = 1;
    }
    _need(sz) {
        if ((this._byteLen - (this._idata[0] << 2)) >= sz)
            return;
        this._nativeObj.flushCommand();
        if (sz > this._byteLen) {
            throw "too big";
        }
    }
    get lineJoin() {
        return '';
    }
    set lineJoin(value) {
    }
    get lineCap() {
        return '';
    }
    set lineCap(value) {
    }
    get miterLimit() {
        return '';
    }
    set miterLimit(value) {
    }
    clearRect(x, y, width, height) {
    }
    set isMain(value) {
        this._nativeObj.flushCommand();
        this._nativeObj.isMain = value;
    }
    get isMain() {
        this._nativeObj.flushCommand();
        return this._nativeObj.isMain;
    }
    set _targets(target) {
        if (target) {
            this._nativeObj.flushCommand();
            this._nativeObj._target = target._nativeObj;
        }
    }
    get _targets() {
        this._nativeObj.flushCommand();
        let target = this._nativeObj._target;
        if (target) {
            this._tempRenderTexture2D.width = this._nativeObj.width;
            this._tempRenderTexture2D.height = this._nativeObj.height;
            this._tempRenderTexture2D._nativeObj = target;
            this._tempRenderTexture2D._renderTarget = target._renderTarget;
            this._tempRenderTexture2D._texture = target._renderTarget._textures[0];
            return this._tempRenderTexture2D;
        }
        return null;
    }
    alpha(value) {
        this.globalAlpha *= value;
    }
    flush() {
        BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
        this._nativeObj.flushCommand();
        this._nativeObj.flush();
    }
    clear() {
        this.add_i(CONTEXT2D_FUNCTION_ID.CLEAR);
        this._nativeObj.flushCommand();
        this._renderObject3DList.length = 0;
    }
    destroy(keepRT = false) {
        this._nativeObj.flushCommand();
        if (this._tempRenderTexture2D._nativeObj) {
            this._tempRenderTexture2D._nativeObj._deleteRT = keepRT;
        }
        this._nativeObj.destroy(keepRT);
    }
    static set2DRenderConfig() {
        if (!NativeContext.const2DRenderCMD) {
            const cmd = NativeContext.const2DRenderCMD = LayaGL.renderEngine.createRenderStateComand();
            cmd.addCMD(RenderStateType.BlendType, true);
            cmd.addCMD(RenderStateType.BlendEquation, BlendEquationSeparate.ADD);
            BlendMode.activeBlendFunction = null;
            cmd.addCMD(RenderStateType.BlendFunc, [BlendFactor.One, BlendFactor.OneMinusSourceAlpha]);
            cmd.addCMD(RenderStateType.DepthTest, false);
            cmd.addCMD(RenderStateType.DepthMask, true);
            cmd.addCMD(RenderStateType.CullFace, false);
            cmd.addCMD(RenderStateType.FrontFace, CullMode.Front);
        }
        NativeContext.const2DRenderCMD.applyCMD();
        RenderTexture.currentActive && RenderTexture.currentActive._end();
        window.set2DRenderConfig();
        BufferState._curBindedBufferState && BufferState._curBindedBufferState.unBind();
    }
    set globalCompositeOperation(value) {
        this.add_i_String(CONTEXT2D_FUNCTION_ID.SET_GLOBAL_COMPOSITE_OPERTAION, value);
    }
    get globalCompositeOperation() {
        this._nativeObj.flushCommand();
        return this._nativeObj.globalCompositeOperation;
    }
    set fillStyle(value) {
        var c = ColorUtils.create(value);
        this.add_ii(CONTEXT2D_FUNCTION_ID.FILL_STYLE, c.numColor);
    }
    get fillStyle() {
        this._nativeObj.flushCommand();
        return this._nativeObj.fillStyle;
    }
    set globalAlpha(value) {
        this.add_if(CONTEXT2D_FUNCTION_ID.ALPHA, value);
    }
    get globalAlpha() {
        this._nativeObj.flushCommand();
        return this._nativeObj.globalAlpha;
    }
    save() {
        this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
    }
    restore() {
        this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
    }
    saveTransform(matrix) {
        this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
    }
    transformByMatrix(matrix, tx, ty) {
        this.add_iffffff(CONTEXT2D_FUNCTION_ID.TRANSFORM, matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx + tx, matrix.ty + ty);
    }
    restoreTransform(matrix) {
        this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
    }
    clipRect(x, y, width, height) {
        this.add_iffff(CONTEXT2D_FUNCTION_ID.CLIP_RECT, x, y, width, height);
    }
    transform(a, b, c, d, tx, ty) {
        this.add_iffffff(CONTEXT2D_FUNCTION_ID.TRANSFORM, a, b, c, d, tx, ty);
    }
    scale(scaleX, scaleY) {
        this.add_iff(CONTEXT2D_FUNCTION_ID.SCALE, scaleX, scaleY);
    }
    drawTexture(tex, x, y, width, height, color = 0xffffffff) {
        if (!this.checkTexture(tex)) {
            return;
        }
        this.add_iiffffffffffffi(CONTEXT2D_FUNCTION_ID.DRAW_TEXTURE, tex.bitmap._texture.id, x, y, width, height, tex.uv[0], tex.uv[1], tex.uv[2], tex.uv[3], tex.uv[4], tex.uv[5], tex.uv[6], tex.uv[7], color);
    }
    drawTextureWithTransform(tex, x, y, width, height, transform, tx, ty, alpha, blendMode, uv, color = 0xffffffff) {
        if (!this.checkTexture(tex)) {
            return;
        }
        this.save();
        this.alpha(alpha);
        var uvs = uv || tex.uv;
        if (transform) {
            this.add_iffffff(CONTEXT2D_FUNCTION_ID.TRANSFORM, transform.a, transform.b, transform.c, transform.d, transform.tx + tx, transform.ty + ty);
            this.add_iiffffffffffffi(CONTEXT2D_FUNCTION_ID.DRAW_TEXTURE, tex.bitmap._texture.id, x, y, width || tex.width, height || tex.height, uvs[0], uvs[1], uvs[2], uvs[3], uvs[4], uvs[5], uvs[6], uvs[7], color);
        }
        else {
            this.add_iiffffffffffffi(CONTEXT2D_FUNCTION_ID.DRAW_TEXTURE, tex.bitmap._texture.id, x + tx, y + ty, width || tex.width, height || tex.height, uvs[0], uvs[1], uvs[2], uvs[3], uvs[4], uvs[5], uvs[6], uvs[7], color);
        }
        this.restore();
    }
    drawTextureWithSizeGrid(tex, tx, ty, width, height, sizeGrid, gx, gy, color) {
        if (!this.checkTexture(tex)) {
            return;
        }
        var uv = tex.uv, w = tex.bitmap.width, h = tex.bitmap.height;
        var top = sizeGrid[0];
        var left = sizeGrid[3];
        var right = sizeGrid[1];
        var bottom = sizeGrid[2];
        var repeat = sizeGrid[4];
        this.add_iiffffffffiffffffffffi(CONTEXT2D_FUNCTION_ID.DRAW_TEXTURE_SIZE_GRID, tex.bitmap._texture.id, tx, ty, width, height, top, right, bottom, left, repeat ? 1 : 0, gx, gy, uv[0], uv[1], uv[2], uv[3], uv[4], uv[5], uv[6], uv[7], color);
    }
    _drawTextureM(tex, x, y, width, height, transform, alpha, uv, color) {
        if (!this.checkTexture(tex)) {
            return;
        }
        this.save();
        this.alpha(alpha);
        if (transform) {
            this.add_iffffff(CONTEXT2D_FUNCTION_ID.TRANSFORM, transform.a, transform.b, transform.c, transform.d, transform.tx, transform.ty);
        }
        var uvs = uv || tex.uv;
        this.add_iiffffffffffffi(CONTEXT2D_FUNCTION_ID.DRAW_TEXTURE, tex.bitmap._texture.id, x, y, width || tex.width, height || tex.height, uvs[0], uvs[1], uvs[2], uvs[3], uvs[4], uvs[5], uvs[6], uvs[7], color);
        this.restore();
    }
    translate(x, y) {
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, x, y);
    }
    _transform(mat, pivotX, pivotY) {
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, pivotX, pivotY);
        this.add_iffffff(CONTEXT2D_FUNCTION_ID.TRANSFORM, mat.a, mat.b, mat.c, mat.d, mat.tx, mat.ty);
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, -pivotX, -pivotY);
    }
    _rotate(angle, pivotX, pivotY) {
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, pivotX, pivotY);
        this.add_if(CONTEXT2D_FUNCTION_ID.ROTATE, angle);
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, -pivotX, -pivotY);
    }
    _scale(scaleX, scaleY, pivotX, pivotY) {
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, pivotX, pivotY);
        this.add_iff(CONTEXT2D_FUNCTION_ID.SCALE, scaleX, scaleY);
        this.add_iff(CONTEXT2D_FUNCTION_ID.TRANSLATE, -pivotX, -pivotY);
    }
    _drawLine(x, y, fromX, fromY, toX, toY, lineColor, lineWidth, vid) {
        var c1 = ColorUtils.create(lineColor);
        this.add_iffffffif(CONTEXT2D_FUNCTION_ID.DRAW_LINE, x, y, fromX, fromY, toX, toY, c1.numColor, lineWidth);
    }
    _drawLines(x, y, points, lineColor, lineWidth, vid) {
        var c1 = ColorUtils.create(lineColor);
        this.add_iffif_ab(CONTEXT2D_FUNCTION_ID.DRAW_LINES, x, y, c1.numColor, lineWidth, new Float32Array(points));
    }
    _drawCircle(x, y, radius, fillColor, lineColor, lineWidth, vid) {
        var c1 = ColorUtils.create(fillColor);
        var c2 = ColorUtils.create(lineColor);
        this.add_ifffiiiif(CONTEXT2D_FUNCTION_ID.DRAW_CIRCLE, x, y, radius, fillColor ? 1 : 0, c1.numColor, lineColor ? 1 : 0, c2.numColor, lineWidth);
    }
    _drawPie(x, y, radius, startAngle, endAngle, fillColor, lineColor, lineWidth, vid) {
        var c1 = ColorUtils.create(fillColor);
        var c2 = ColorUtils.create(lineColor);
        this.add_ifffffiiiif(CONTEXT2D_FUNCTION_ID.DRAW_PIE, x, y, radius, startAngle, endAngle, fillColor ? 1 : 0, c1.numColor, lineColor ? 1 : 0, c2.numColor, lineWidth);
    }
    _drawPoly(x, y, points, fillColor, lineColor, lineWidth, isConvexPolygon, vid) {
        var c1 = ColorUtils.create(fillColor);
        var c2 = ColorUtils.create(lineColor);
        this.add_iffiiiifi_ab(CONTEXT2D_FUNCTION_ID.DRAW_POLY, x, y, fillColor ? 1 : 0, c1.numColor, lineColor ? 1 : 0, c2.numColor, lineWidth, isConvexPolygon ? 1 : 0, new Float32Array(points));
    }
    fillRect(x, y, width, height, fillColor) {
        if (fillColor != null) {
            var c = ColorUtils.create(fillColor);
            this.add_ii(CONTEXT2D_FUNCTION_ID.FILL_STYLE, c.numColor);
        }
        this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
        this.add_iffff(CONTEXT2D_FUNCTION_ID.FILL_RECT, x, y, width, height);
        this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
    }
    fillTexture(texture, x, y, width, height, type, offset, color) {
        if (!this.checkTexture(texture)) {
            return;
        }
        var typeValue = 0;
        switch (type) {
            case "repeat":
                typeValue = 0;
                break;
            case "repeat-x":
                typeValue = 1;
                break;
            case "repeat-y":
                typeValue = 2;
                break;
            case "no-repeat":
                typeValue = 3;
                break;
            default: break;
        }
        this.add_iiffffiffi(CONTEXT2D_FUNCTION_ID.FILL_TEXTURE, texture.bitmap._texture.id, x, y, width, height, typeValue, offset.x, offset.y, color);
    }
    drawRect(x, y, width, height, fillColor, lineColor, lineWidth) {
        if (fillColor != null) {
            var c1 = ColorUtils.create(fillColor);
            this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
            this.add_ii(CONTEXT2D_FUNCTION_ID.FILL_STYLE, c1.numColor);
            this.add_iffff(CONTEXT2D_FUNCTION_ID.FILL_RECT, x, y, width, height);
            this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
        }
        if (lineColor != null) {
            var c2 = ColorUtils.create(lineColor);
            this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
            this.add_ii(CONTEXT2D_FUNCTION_ID.STROKE_STYLE, c2.numColor);
            this.add_if(CONTEXT2D_FUNCTION_ID.LINE_WIDTH, lineWidth);
            this.add_iffff(CONTEXT2D_FUNCTION_ID.STROKE_RECT, x, y, width, height);
            this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
        }
    }
    _drawPath(x, y, paths, brush, pen) {
        this.add_ii(CONTEXT2D_FUNCTION_ID.BEGIN_PATH, 0);
        for (var i = 0, n = paths.length; i < n; i++) {
            var path = paths[i];
            switch (path[0]) {
                case "moveTo":
                    this.add_iff(CONTEXT2D_FUNCTION_ID.MOVE_TO, x + path[1], y + path[2]);
                    break;
                case "lineTo":
                    this.add_iff(CONTEXT2D_FUNCTION_ID.LINE_TO, x + path[1], y + path[2]);
                    break;
                case "arcTo":
                    this.add_ifffff(CONTEXT2D_FUNCTION_ID.ARC_TO, x + path[1], y + path[2], x + path[3], y + path[4], path[5]);
                    break;
                case "closePath":
                    this.add_i(CONTEXT2D_FUNCTION_ID.CLOSE_PATH);
                    break;
            }
        }
        if (brush != null) {
            var c1 = ColorUtils.create(brush.fillStyle);
            this.add_ii(CONTEXT2D_FUNCTION_ID.FILL_STYLE, c1.numColor);
            this.add_i(CONTEXT2D_FUNCTION_ID.FILL);
        }
        if (pen != null) {
            var c2 = ColorUtils.create(pen.strokeStyle);
            this.add_ii(CONTEXT2D_FUNCTION_ID.STROKE_STYLE, c2.numColor);
            this.add_if(CONTEXT2D_FUNCTION_ID.LINE_WIDTH, pen.lineWidth || 1);
            this.add_i(CONTEXT2D_FUNCTION_ID.STROKE);
        }
    }
    drawCurves(x, y, points, lineColor, lineWidth) {
        var c1 = ColorUtils.create(lineColor);
        this.add_iffif_ab(CONTEXT2D_FUNCTION_ID.DRAW_CURVES, x, y, c1.numColor, lineWidth, new Float32Array(points));
    }
    drawCanvas(canvas, x, y, width, height) {
        if (!canvas)
            return;
        this._nativeObj.flushCommand();
        if (canvas instanceof (NativeWebGLCacheAsNormalCanvas)) {
            this._nativeObj.drawCanvasNormal(canvas._nativeObj, x, y, width, height);
        }
        else {
            this._nativeObj.drawCanvasBitmap(canvas.context._nativeObj, x, y, width, height);
        }
    }
    fillText(txt, x, y, fontStr, color, align, lineWidth = 0, borderColor = "") {
        var nTextAlign = 0;
        switch (align) {
            case 'center':
                nTextAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                nTextAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
        }
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(borderColor);
        if (typeof (txt) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, nTextAlign, x, y, lineWidth, txt, fontStr);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, txt._nativeObj.id, x, y, c1.numColor, c2.numColor, lineWidth, nTextAlign, fontStr);
        }
    }
    drawText(text, x, y, font, color, align) {
        var nTextAlign = 0;
        switch (align) {
            case 'center':
                nTextAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                nTextAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
        }
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(null);
        if (typeof (text) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, nTextAlign, x, y, 0, text, font);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, text._nativeObj.id, x, y, c1.numColor, c2.numColor, 0, nTextAlign, font);
        }
    }
    strokeWord(text, x, y, font, color, lineWidth, align) {
        var nTextAlign = 0;
        switch (align) {
            case 'center':
                nTextAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                nTextAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
        }
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(null);
        if (typeof (text) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, nTextAlign, x, y, lineWidth, text, font);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, text._nativeObj.id, x, y, c1.numColor, c2.numColor, lineWidth, nTextAlign, font);
        }
    }
    fillBorderText(txt, x, y, font, color, borderColor, lineWidth, align) {
        var nTextAlign = 0;
        switch (align) {
            case 'center':
                nTextAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                nTextAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
        }
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(borderColor);
        if (typeof (txt) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, nTextAlign, x, y, lineWidth, txt, font);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, txt._nativeObj.id, x, y, c1.numColor, c2.numColor, lineWidth, nTextAlign, font);
        }
    }
    filltext11(data, x, y, fontStr, color, strokeColor, lineWidth, align) {
        var nTextAlign = 0;
        switch (align) {
            case 'center':
                nTextAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                nTextAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
        }
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(strokeColor);
        if (typeof (data) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, nTextAlign, x, y, lineWidth, data, fontStr);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, data._nativeObj.id, x, y, c1.numColor, c2.numColor, lineWidth, nTextAlign, fontStr);
        }
    }
    _fast_filltext(data, x, y, fontObj, color, strokeColor, lineWidth, textAlign, underLine = 0) {
        var c1 = ColorUtils.create(color);
        var c2 = ColorUtils.create(strokeColor);
        if (typeof (data) === 'string') {
            this.add_iiiifff_String_String(CONTEXT2D_FUNCTION_ID.FILL_WORDS, c1.numColor, c2.numColor, textAlign, x, y, lineWidth, data, fontObj._font);
        }
        else {
            this.add_iiffiifi_String(CONTEXT2D_FUNCTION_ID.FILL_WORD_TEXT, data._nativeObj.id, x, y, c1.numColor, c2.numColor, lineWidth, textAlign, fontObj._font);
        }
    }
    drawTriangles(tex, x, y, vertices, uvs, indices, matrix, alpha, blendMode, colorNum = 0xffffffff) {
        if (!this.checkTexture(tex)) {
            return;
        }
        var m = matrix ? matrix : this._tmpMatrix;
        if (blendMode != null) {
            this.add_i(CONTEXT2D_FUNCTION_ID.SAVE);
            this.add_i_String(CONTEXT2D_FUNCTION_ID.SET_GLOBAL_COMPOSITE_OPERTAION, blendMode);
            this.add_iiifffffffff_ab_ab_ab(CONTEXT2D_FUNCTION_ID.DRAW_TRANGLES, tex.bitmap._texture.id, colorNum, x, y, alpha, m.a, m.b, m.c, m.d, m.tx, m.ty, (vertices instanceof Array) ? Float32Array.from(vertices) : vertices, (uvs instanceof Array) ? Float32Array.from(uvs) : uvs, (indices instanceof Array) ? Uint16Array.from(indices) : indices);
            this.add_i(CONTEXT2D_FUNCTION_ID.RESTORE);
        }
        else {
            this.add_iiifffffffff_ab_ab_ab(CONTEXT2D_FUNCTION_ID.DRAW_TRANGLES, tex.bitmap._texture.id, colorNum, x, y, alpha, m.a, m.b, m.c, m.d, m.tx, m.ty, (vertices instanceof Array) ? Float32Array.from(vertices) : vertices, (uvs instanceof Array) ? Float32Array.from(uvs) : uvs, (indices instanceof Array) ? Uint16Array.from(indices) : indices);
        }
    }
    drawMask(w, h) {
        this._nativeObj.flushCommand();
        return this._nativeObj.drawMask(w, h);
    }
    drawMasked(x, y, w, h) {
        this.add_iffff(CONTEXT2D_FUNCTION_ID.DRAW_MASKED, x, y, w, h);
    }
    drawMaskComposite(rt, x, y, w, h) {
        this._nativeObj.flushCommand();
        this._nativeObj.drawMaskComposite(rt, x, y, w, h);
    }
    set asBitmap(value) {
        this.add_ii(CONTEXT2D_FUNCTION_ID.SET_AS_BITMAP, value ? 1 : 0);
    }
    size(w, h) {
        this.add_iii(CONTEXT2D_FUNCTION_ID.SIZE, w, h);
    }
    setColorFilter(filter) {
        this._nativeObj.flushCommand();
        if (filter) {
            this._nativeObj.setColorFilter(true, filter._alpha, filter._mat);
        }
        else {
            this._nativeObj.setColorFilter(false, null, null);
        }
    }
    drawTarget(rt, x, y, width, height, matrix, shaderValue, uv = null, blend = -1) {
        this._nativeObj.flushCommand();
        return this._nativeObj.drawTarget(rt, x, y, width, height, matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty, blend);
    }
    drawTargetBlurFilter(rt, x, y, width, height, strength) {
        this._nativeObj.flushCommand();
        this._nativeObj.drawTargetBlurFilter(rt, x, y, width, height, strength);
    }
    get _curMat() {
        this._nativeObj.flushCommand();
        var data = this._nativeObj._curMat;
        var mat = Matrix.create();
        mat.a = data[0];
        mat.b = data[1];
        mat.c = data[2];
        mat.d = data[3];
        mat.tx = data[4];
        mat.ty = data[5];
        return mat;
    }
    addRenderObject3D(scene3D) {
        this._renderObject3DList.push(scene3D._nativeObj);
        this._nativeObj.flushCommand();
        this._nativeObj.addRenderObject3D(scene3D._nativeObj);
    }
    pushRT() {
        this._nativeObj.flushCommand();
        this._nativeObj.pushRT();
    }
    popRT() {
        this._nativeObj.flushCommand();
        this._nativeObj.popRT();
    }
    useRT(rt) {
        this._nativeObj.flushCommand();
        this._nativeObj.useRT(rt);
    }
    drawFilter(out, src, x, y, width, height) {
        this._nativeObj.flushCommand();
        this._nativeObj.drawFilter(out, src, x, y, width, height);
    }
    checkTexture(tex) {
        var cs = this.sprite;
        if (!tex._getSource(function () {
            if (cs) {
                cs.repaint();
            }
        })) {
            return false;
        }
        return true;
    }
    add_i(i) {
        this._need(4);
        this._idata[this._idata[0]++] = i;
    }
    add_ii(a, b) {
        this._need(8);
        var i = this._idata[0];
        this._idata[i++] = a;
        this._idata[i++] = b;
        this._idata[0] = i;
    }
    add_if(a, b) {
        this._need(8);
        var i = this._idata[0];
        this._idata[i++] = a;
        this._fdata[i++] = b;
        this._idata[0] = i;
    }
    add_iff(a, b, c) {
        this._need(12);
        var i = this._idata[0];
        this._idata[i++] = a;
        this._fdata[i++] = b;
        this._fdata[i++] = c;
        this._idata[0] = i;
    }
    add_iffif(a, b, c, d, e) {
        this._need(20);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        this._idata[i++] = d;
        fdata[i++] = e;
        this._idata[0] = i;
    }
    add_iffff(a, b, c, d, e) {
        this._need(20);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        this._idata[0] = i;
    }
    add_iii(a, b, c) {
        this._need(12);
        var idata = this._idata;
        var i = this._idata[0];
        idata[i++] = a;
        idata[i++] = b;
        idata[i++] = c;
        this._idata[0] = i;
    }
    add_iiffff(a, b, c, d, e, f) {
        this._need(24);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        this._idata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        this._idata[0] = i;
    }
    add_ifffff(a, b, c, d, e, f) {
        this._need(24);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        this._idata[0] = i;
    }
    add_iffffff(a, b, c, d, e, f, g) {
        this._need(28);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        this._idata[0] = i;
    }
    add_ifffiiiif(a, b, c, d, e, f, g, h, ii) {
        this._need(36);
        var idata = this._idata;
        var i = idata[0];
        var fdata = this._fdata;
        idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        idata[i++] = e;
        idata[i++] = f;
        idata[i++] = g;
        idata[i++] = h;
        fdata[i++] = ii;
        idata[0] = i;
    }
    add_ifffffiiiif(a, b, c, d, e, f, g, h, ii, j, k) {
        this._need(44);
        var idata = this._idata;
        var i = idata[0];
        var fdata = this._fdata;
        idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        idata[i++] = g;
        idata[i++] = h;
        idata[i++] = ii;
        idata[i++] = j;
        fdata[i++] = k;
        idata[0] = i;
    }
    add_iffffffif(a, b, c, d, e, f, g, h, ii) {
        this._need(36);
        var idata = this._idata;
        var i = idata[0];
        var fdata = this._fdata;
        idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        idata[i++] = h;
        fdata[i++] = ii;
        idata[0] = i;
    }
    add_String(ab) {
        var len = ab.byteLength;
        this._need(len + 4);
        this._idata[this._idata[0]++] = len;
        if (len == 0)
            return;
        var uint8array = new Uint8Array(ab);
        this._byteArray.set(uint8array, this._idata[0] * 4);
        this._idata[0] += len / 4;
    }
    add_iffiiiifi(a, b, c, d, e, f, g, h, ii) {
        this._need(45);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        fdata[i++] = b;
        fdata[i++] = c;
        this._idata[i++] = d;
        this._idata[i++] = e;
        this._idata[i++] = f;
        this._idata[i++] = g;
        fdata[i++] = h;
        this._idata[i++] = ii;
        this._idata[0] = i;
    }
    add_iiffiifi(a, b, c, d, e, f, g, h) {
        this._need(32);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        this._idata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        this._idata[i++] = e;
        this._idata[i++] = f;
        fdata[i++] = g;
        this._idata[i++] = h;
        this._idata[0] = i;
    }
    add_i_String(a, str) {
        var ab = window.conch.strTobufer(str);
        this._need(4 + ab.byteLength + 4);
        this.add_i(a);
        this.add_String(ab);
    }
    add_iiiifff(a, b, c, d, e, f, g) {
        this._need(28);
        var i = this._idata[0];
        var fdata = this._fdata;
        this._idata[i++] = a;
        this._idata[i++] = b;
        this._idata[i++] = c;
        this._idata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        this._idata[0] = i;
    }
    add_iiffiifi_String(a, b, c, d, e, f, g, h, str) {
        var ab = window.conch.strTobufer(str);
        this._need(32 + ab.byteLength + 4);
        this.add_iiffiifi(a, b, c, d, e, f, g, h);
        this.add_String(ab);
    }
    add_iiiifff_String_String(a, b, c, d, e, f, g, str0, str1) {
        var ab0 = window.conch.strTobufer(str0);
        var ab1 = window.conch.strTobufer(str1);
        this._need(28 + (ab0.byteLength + 4) + (ab1.byteLength + 4));
        this.add_iiiifff(a, b, c, d, e, f, g);
        this.add_String(ab0);
        this.add_String(ab1);
    }
    add_iiffffffffffffi(a, b, c, d, e, f, g, h, ii, j, k, l, m, n, o) {
        this._need(60);
        var idata = this._idata;
        var i = idata[0];
        var fdata = this._fdata;
        idata[i++] = a;
        idata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        fdata[i++] = h;
        fdata[i++] = ii;
        fdata[i++] = j;
        fdata[i++] = k;
        fdata[i++] = l;
        fdata[i++] = m;
        fdata[i++] = n;
        idata[i++] = o;
        idata[0] = i;
    }
    add_iiffffffffiffffffffffi(a, b, c, d, e, f, g, h, ii, j, k, l, m, n, o, p, q, r, s, t, u, v) {
        this._need(88);
        var idata = this._idata;
        var fdata = this._fdata;
        var i = idata[0];
        idata[i++] = a;
        idata[i++] = b;
        fdata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        fdata[i++] = h;
        fdata[i++] = ii;
        fdata[i++] = j;
        idata[i++] = k;
        fdata[i++] = l;
        fdata[i++] = m;
        fdata[i++] = n;
        fdata[i++] = o;
        fdata[i++] = p;
        fdata[i++] = q;
        fdata[i++] = r;
        fdata[i++] = s;
        fdata[i++] = t;
        fdata[i++] = u;
        idata[i++] = v;
        idata[0] = i;
    }
    add_iiifffffffff(a, b, c, d, e, f, g, h, ii, j, k, l) {
        this._need(48);
        var idata = this._idata;
        var fdata = this._fdata;
        var i = idata[0];
        idata[i++] = a;
        idata[i++] = b;
        idata[i++] = c;
        fdata[i++] = d;
        fdata[i++] = e;
        fdata[i++] = f;
        fdata[i++] = g;
        fdata[i++] = h;
        fdata[i++] = ii;
        fdata[i++] = j;
        fdata[i++] = k;
        fdata[i++] = l;
        idata[0] = i;
    }
    add_iiffffiffi(a, b, c, d, e, f, g, h, i, j) {
        this._need(40);
        let idata = this._idata;
        let fdata = this._fdata;
        var idx = idata[0];
        idata[idx++] = a;
        idata[idx++] = b;
        fdata[idx++] = c;
        fdata[idx++] = d;
        fdata[idx++] = e;
        fdata[idx++] = f;
        idata[idx++] = g;
        fdata[idx++] = h;
        fdata[idx++] = i;
        idata[idx++] = j;
        idata[0] = idx;
    }
    add_iiifffffffff_ab_ab_ab(a, b, c, d, e, f, g, h, ii, j, k, l, arraybuffer0, arraybuffer1, arraybuffer2) {
        var nAlignLength0 = this.getAlignLength(arraybuffer0);
        var nAlignLength1 = this.getAlignLength(arraybuffer1);
        var nAlignLength2 = this.getAlignLength(arraybuffer2);
        d;
        this._need(48 + (nAlignLength0 + 4) + (nAlignLength1 + 4) + (nAlignLength2 + 4));
        this.add_iiifffffffff(a, b, c, d, e, f, g, h, ii, j, k, l);
        this.wab(arraybuffer0, arraybuffer0.byteLength, nAlignLength0, 0);
        this.wab(arraybuffer1, arraybuffer1.byteLength, nAlignLength1, 0);
        this.wab(arraybuffer2, arraybuffer2.byteLength, nAlignLength2, 0);
    }
    wab(arraybuffer, length, nAlignLength, offset) {
        offset = offset ? offset : 0;
        this._need(nAlignLength + 4);
        this._idata[this._idata[0]++] = length;
        var uint8array = null;
        if (arraybuffer instanceof Float32Array && offset == 0) {
            this._fdata.set(arraybuffer, this._idata[0]);
        }
        else {
            if (arraybuffer instanceof ArrayBuffer) {
                uint8array = new Uint8Array(arraybuffer, offset, length);
            }
            else if (arraybuffer.buffer) {
                uint8array = new Uint8Array(arraybuffer.buffer, offset + arraybuffer.byteOffset, length);
            }
            else {
                console.log("not arraybuffer/dataview");
                return;
            }
            this._byteArray.set(uint8array, this._idata[0] * 4);
        }
        this._idata[0] += nAlignLength / 4;
    }
    getAlignLength(data) {
        var byteLength = data.byteLength;
        return (byteLength + 3) & 0xfffffffc;
    }
    add_iif_ab(a, b, c, arraybuffer) {
        var nAlignLength = this.getAlignLength(arraybuffer);
        this._need(12 + nAlignLength + 4);
        this.add_iff(a, b, c);
        this.wab(arraybuffer, arraybuffer.byteLength, nAlignLength, 0);
    }
    add_iffif_ab(a, b, c, d, e, arraybuffer) {
        var nAlignLength = this.getAlignLength(arraybuffer);
        this._need(20 + nAlignLength + 4);
        this.add_iffif(a, b, c, d, e);
        this.wab(arraybuffer, arraybuffer.byteLength, nAlignLength, 0);
    }
    add_iffiiiifi_ab(a, b, c, d, e, f, g, h, ii, arraybuffer) {
        var nAlignLength = this.getAlignLength(arraybuffer);
        this._need(45 + nAlignLength + 4);
        this.add_iffiiiifi(a, b, c, d, e, f, g, h, ii);
        this.wab(arraybuffer, arraybuffer.byteLength, nAlignLength, 0);
    }
}
NativeContext.ARRAY_BUFFER_TYPE_DATA = 0;
NativeContext.ARRAY_BUFFER_TYPE_CMD = 1;
NativeContext.ARRAY_BUFFER_REF_REFERENCE = 0;
NativeContext.ARRAY_BUFFER_REF_COPY = 1;
NativeContext.ENUM_TEXTALIGN_DEFAULT = 0;
NativeContext.ENUM_TEXTALIGN_CENTER = 1;
NativeContext.ENUM_TEXTALIGN_RIGHT = 2;

//# sourceMappingURL=NativeContext.js.map
