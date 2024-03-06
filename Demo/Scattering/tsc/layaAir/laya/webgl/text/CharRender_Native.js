import { ICharRender } from "./ICharRender";
import { ColorUtils } from "../../utils/ColorUtils";
export class CharRender_Native extends ICharRender {
    constructor() {
        super();
        this.lastFont = '';
        this.lastScaleX = 1.0;
        this.lastScaleY = 1.0;
    }
    getWidth(font, str) {
        if (!window.conchTextCanvas)
            return 0;
        window.conchTextCanvas.font = font;
        this.lastFont = font;
        return window.conchTextCanvas.measureText(str).width;
    }
    scale(sx, sy) {
        this.lastScaleX = sx;
        this.lastScaleY = sy;
    }
    getCharBmp(char, font, lineWidth, colStr, strokeColStr, size, margin_left, margin_top, margin_right, margin_bottom, rect = null) {
        if (!window.conchTextCanvas)
            return null;
        window.conchTextCanvas.font = font;
        this.lastFont = font;
        var w = size.width = window.conchTextCanvas.measureText(char).width;
        var h = size.height;
        w += (margin_left + margin_right);
        h += (margin_top + margin_bottom);
        window.conchTextCanvas.scale && window.conchTextCanvas.scale(this.lastScaleX, this.lastScaleY);
        var c1 = ColorUtils.create(strokeColStr);
        var nStrokeColor = c1.numColor;
        var c2 = ColorUtils.create(colStr);
        var nTextColor = c2.numColor;
        var textInfo = window.conchTextCanvas.getTextBitmapData(char, nTextColor, lineWidth > 2 ? 2 : lineWidth, nStrokeColor);
        size.bmpWidth = textInfo.width;
        size.bmpHeight = textInfo.height;
        return textInfo;
    }
}

//# sourceMappingURL=CharRender_Native.js.map
