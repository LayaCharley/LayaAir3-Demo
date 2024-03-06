import { FontInfo } from "../../utils/FontInfo";
import { Pool } from "../../utils/Pool";
import { WordText } from "../../utils/WordText";
import { ILaya } from "../../../ILaya";
import { Const } from "../../Const";
import { ClassUtils } from "../../utils/ClassUtils";
import { Config } from "../../../Config";
export class FillTextCmd {
    static create(text, x, y, font, color, textAlign, lineWidth, borderColor) {
        var cmd = Pool.getItemByClass("FillTextCmd", FillTextCmd);
        cmd._text = null;
        cmd._wordText = null;
        cmd.x = x;
        cmd.y = y;
        cmd.font = font;
        cmd.color = color;
        cmd._lineWidth = lineWidth;
        cmd._borderColor = borderColor;
        switch (textAlign) {
            case 'center':
                cmd._textAlign = Const.ENUM_TEXTALIGN_CENTER;
                break;
            case 'right':
                cmd._textAlign = Const.ENUM_TEXTALIGN_RIGHT;
                break;
            default:
                cmd._textAlign = Const.ENUM_TEXTALIGN_DEFAULT;
        }
        if (text instanceof WordText) {
            cmd._wordText = text;
            text.cleanCache();
        }
        else
            cmd._text = text;
        return cmd;
    }
    recover() {
        Pool.recover("FillTextCmd", this);
    }
    run(context, gx, gy) {
        if (ILaya.stage.isGlobalRepaint()) {
            this._wordText && this._wordText.cleanCache();
        }
        context._fast_filltext(this._wordText || this._text, this.x + gx, this.y + gy, this._fontObj, this._color, this._borderColor, this._lineWidth, this._textAlign);
    }
    get cmdID() {
        return FillTextCmd.ID;
    }
    get font() {
        return this._font;
    }
    set font(value) {
        this._font = value;
        if (!value)
            value = Config.defaultFontSize + "px " + Config.defaultFont;
        this._fontObj = FontInfo.parse(value);
        this._wordText && this._wordText.cleanCache();
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
        this._wordText && this._wordText.cleanCache();
    }
}
FillTextCmd.ID = "FillText";
ClassUtils.regClass("FillTextCmd", FillTextCmd);

//# sourceMappingURL=FillTextCmd.js.map
