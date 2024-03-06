import { GraphicsBounds } from "./GraphicsBounds";
import { SpriteConst } from "./SpriteConst";
import { AlphaCmd } from "./cmd/AlphaCmd";
import { ClipRectCmd } from "./cmd/ClipRectCmd";
import { Draw9GridTextureCmd } from "./cmd/Draw9GridTextureCmd";
import { DrawCircleCmd } from "./cmd/DrawCircleCmd";
import { DrawCurvesCmd } from "./cmd/DrawCurvesCmd";
import { DrawImageCmd } from "./cmd/DrawImageCmd";
import { DrawLineCmd } from "./cmd/DrawLineCmd";
import { DrawLinesCmd } from "./cmd/DrawLinesCmd";
import { DrawPathCmd } from "./cmd/DrawPathCmd";
import { DrawPieCmd } from "./cmd/DrawPieCmd";
import { DrawPolyCmd } from "./cmd/DrawPolyCmd";
import { DrawRectCmd } from "./cmd/DrawRectCmd";
import { DrawTextureCmd } from "./cmd/DrawTextureCmd";
import { DrawTexturesCmd } from "./cmd/DrawTexturesCmd";
import { DrawTrianglesCmd } from "./cmd/DrawTrianglesCmd";
import { FillTextCmd } from "./cmd/FillTextCmd";
import { FillTextureCmd } from "./cmd/FillTextureCmd";
import { RestoreCmd } from "./cmd/RestoreCmd";
import { RotateCmd } from "./cmd/RotateCmd";
import { SaveCmd } from "./cmd/SaveCmd";
import { ScaleCmd } from "./cmd/ScaleCmd";
import { TransformCmd } from "./cmd/TransformCmd";
import { TranslateCmd } from "./cmd/TranslateCmd";
import { Point } from "../maths/Point";
import { Utils } from "../utils/Utils";
import { VectorGraphManager } from "../utils/VectorGraphManager";
import { ILaya } from "../../ILaya";
import { ColorUtils } from "../utils/ColorUtils";
export class Graphics {
    constructor() {
        this._sp = null;
        this._render = this._renderEmpty;
        this._cmds = [];
        this._vectorgraphArray = null;
        this._graphicBounds = null;
        this._createData();
    }
    _createData() {
    }
    _clearData() {
    }
    _destroyData() {
    }
    destroy() {
        this.clear(true);
        if (this._graphicBounds)
            this._graphicBounds.destroy();
        this._graphicBounds = null;
        this._vectorgraphArray = null;
        if (this._sp) {
            this._sp._renderType = 0;
            this._sp = null;
        }
        this._destroyData();
    }
    clear(recoverCmds = true) {
        if (recoverCmds) {
            for (let i = 0, len = this._cmds.length; i < len; i++) {
                this._cmds[i].recover();
            }
        }
        this._cmds.length = 0;
        this._render = this._renderEmpty;
        this._clearData();
        if (this._sp) {
            this._sp._renderType &= ~SpriteConst.GRAPHICS;
        }
        this._repaint();
        if (this._vectorgraphArray) {
            for (let i = 0, len = this._vectorgraphArray.length; i < len; i++) {
                VectorGraphManager.getInstance().deleteShape(this._vectorgraphArray[i]);
            }
            this._vectorgraphArray.length = 0;
        }
    }
    _clearBoundsCache(onSizeChanged) {
        if (this._graphicBounds) {
            if (!onSizeChanged || this._graphicBounds._affectBySize)
                this._graphicBounds.reset();
        }
    }
    _initGraphicBounds() {
        if (!this._graphicBounds) {
            this._graphicBounds = GraphicsBounds.create();
            this._graphicBounds._graphics = this;
        }
    }
    _repaint() {
        this._clearBoundsCache();
        this._sp && this._sp.repaint();
    }
    _isOnlyOne() {
        return this._cmds.length === 1;
    }
    get cmds() {
        return this._cmds;
    }
    set cmds(value) {
        if (this._sp) {
            this._sp._renderType |= SpriteConst.GRAPHICS;
        }
        this._cmds = value;
        let len = value.length;
        this._render = len === 0 ? this._renderEmpty : (len === 1 ? this._renderOne : this._renderAll);
        this._repaint();
    }
    addCmd(cmd) {
        if (cmd == null) {
            console.warn("null cmd");
            return;
        }
        if (this._sp) {
            this._sp._renderType |= SpriteConst.GRAPHICS;
        }
        this._cmds.push(cmd);
        this._render = this._cmds.length === 1 ? this._renderOne : this._renderAll;
        this._repaint();
        return cmd;
    }
    removeCmd(cmd) {
        let i = this.cmds.indexOf(cmd);
        if (i != -1) {
            this._cmds.splice(i, 1);
            let len = this._cmds.length;
            this._render = len === 0 ? this._renderEmpty : (len === 1 ? this._renderOne : this._renderAll);
            this._repaint();
        }
    }
    getBounds(realSize = false) {
        this._initGraphicBounds();
        return this._graphicBounds.getBounds(realSize);
    }
    getBoundPoints(realSize = false) {
        this._initGraphicBounds();
        return this._graphicBounds.getBoundPoints(realSize);
    }
    drawImage(texture, x = 0, y = 0, width = null, height = null, color = null) {
        if (!texture)
            return null;
        if (!texture.bitmap)
            return null;
        return this.addCmd(DrawImageCmd.create(texture, x, y, width, height, color));
    }
    drawTexture(texture, x = 0, y = 0, width = null, height = null, matrix = null, alpha = 1, color = null, blendMode = null, uv) {
        if (!texture || alpha < 0.01)
            return null;
        if (!texture.bitmap)
            return null;
        return this.addCmd(DrawTextureCmd.create(texture, x, y, width, height, matrix, alpha, color, blendMode, uv));
    }
    drawTextures(texture, pos, colors) {
        if (!texture)
            return null;
        return this.addCmd(DrawTexturesCmd.create(texture, pos, colors));
    }
    drawTriangles(texture, x, y, vertices, uvs, indices, matrix = null, alpha = 1, color = null, blendMode = null) {
        return this.addCmd(DrawTrianglesCmd.create(texture, x, y, vertices, uvs, indices, matrix, alpha, color, blendMode));
    }
    fillTexture(texture, x, y, width = 0, height = 0, type = "repeat", offset = null, color = null) {
        if (texture && texture.bitmap)
            return this.addCmd(FillTextureCmd.create(texture, x, y, width, height, type, offset || Point.EMPTY, color));
        else
            return null;
    }
    clipRect(x, y, width, height) {
        return this.addCmd(ClipRectCmd.create(x, y, width, height));
    }
    fillText(text, x, y, font, color, textAlign) {
        return this.addCmd(FillTextCmd.create(text, x, y, font, color, textAlign, 0, ""));
    }
    fillBorderText(text, x, y, font, fillColor, textAlign, lineWidth, borderColor) {
        return this.addCmd(FillTextCmd.create(text, x, y, font, fillColor, textAlign, lineWidth, borderColor));
    }
    strokeText(text, x, y, font, color, lineWidth, textAlign) {
        return this.addCmd(FillTextCmd.create(text, x, y, font, null, textAlign, lineWidth, color));
    }
    alpha(alpha) {
        return this.addCmd(AlphaCmd.create(alpha));
    }
    transform(matrix, pivotX = 0, pivotY = 0) {
        return this.addCmd(TransformCmd.create(matrix, pivotX, pivotY));
    }
    rotate(angle, pivotX = 0, pivotY = 0) {
        return this.addCmd(RotateCmd.create(angle, pivotX, pivotY));
    }
    scale(scaleX, scaleY, pivotX = 0, pivotY = 0) {
        return this.addCmd(ScaleCmd.create(scaleX, scaleY, pivotX, pivotY));
    }
    translate(tx, ty) {
        return this.addCmd(TranslateCmd.create(tx, ty));
    }
    save() {
        return this.addCmd(SaveCmd.create());
    }
    restore() {
        return this.addCmd(RestoreCmd.create());
    }
    replaceTextColor(color) {
        this._repaint();
        let cmds = this._cmds;
        for (let i = cmds.length - 1; i > -1; i--) {
            let cmd = cmds[i];
            var cmdID = cmd.cmdID;
            switch (cmdID) {
                case FillTextCmd.ID:
                    cmd.color = color;
                    break;
                case DrawImageCmd.ID:
                    cmd.color = color != null ? ColorUtils.create(color).numColor : 0xffffffff;
                    break;
            }
        }
    }
    loadImage(url, x = 0, y = 0, width = null, height = null, complete = null) {
        let tex = ILaya.loader.getRes(url);
        if (tex) {
            this.drawImage(tex, x, y, width, height);
            complete && complete.call(this._sp);
        }
        else {
            ILaya.loader.load(url).then((tex) => {
                this.drawImage(tex, x, y, width, height);
                complete && complete.call(this._sp);
            });
        }
    }
    _renderEmpty(sprite, context, x, y) {
    }
    _renderAll(sprite, context, x, y) {
        context.sprite = sprite;
        var cmds = this._cmds;
        for (let i = 0, n = cmds.length; i < n; i++) {
            cmds[i].run(context, x, y);
        }
    }
    _renderOne(sprite, context, x, y) {
        context.sprite = sprite;
        this._cmds[0].run(context, x, y);
    }
    drawLine(fromX, fromY, toX, toY, lineColor, lineWidth = 1) {
        return this.addCmd(DrawLineCmd.create(fromX, fromY, toX, toY, lineColor, lineWidth));
    }
    drawLines(x, y, points, lineColor, lineWidth = 1) {
        if (!points || points.length < 4)
            return null;
        return this.addCmd(DrawLinesCmd.create(x, y, points, lineColor, lineWidth));
    }
    drawCurves(x, y, points, lineColor, lineWidth = 1) {
        return this.addCmd(DrawCurvesCmd.create(x, y, points, lineColor, lineWidth));
    }
    drawRect(x, y, width, height, fillColor, lineColor = null, lineWidth = 1, percent) {
        return this.addCmd(DrawRectCmd.create(x, y, width, height, fillColor, lineColor, lineWidth, percent));
    }
    drawCircle(x, y, radius, fillColor, lineColor = null, lineWidth = 1) {
        return this.addCmd(DrawCircleCmd.create(x, y, radius, fillColor, lineColor, lineWidth));
    }
    drawPie(x, y, radius, startAngle, endAngle, fillColor, lineColor = null, lineWidth = 1) {
        return this.addCmd(DrawPieCmd.create(x, y, radius, Utils.toRadian(startAngle), Utils.toRadian(endAngle), fillColor, lineColor, lineWidth));
    }
    drawPoly(x, y, points, fillColor, lineColor = null, lineWidth = 1) {
        return this.addCmd(DrawPolyCmd.create(x, y, points, fillColor, lineColor, lineWidth));
    }
    drawPath(x, y, paths, brush = null, pen = null) {
        return this.addCmd(DrawPathCmd.create(x, y, paths, brush, pen));
    }
    draw9Grid(texture, x = 0, y = 0, width = 0, height = 0, sizeGrid, color) {
        this.addCmd(Draw9GridTextureCmd.create(texture, x, y, width, height, sizeGrid, false, color));
    }
}

//# sourceMappingURL=Graphics.js.map
