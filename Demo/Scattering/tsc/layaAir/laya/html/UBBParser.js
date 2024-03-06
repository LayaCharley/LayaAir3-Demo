export class UBBParser {
    constructor() {
        this._readPos = 0;
        this.defaultImgWidth = 0;
        this.defaultImgHeight = 0;
        this._handlers = {};
        this._handlers["url"] = this.onTag_URL;
        this._handlers["img"] = this.onTag_IMG;
        this._handlers["b"] = this.onTag_B;
        this._handlers["i"] = this.onTag_I;
        this._handlers["u"] = this.onTag_U;
        this._handlers["sup"] = this.onTag_Simple;
        this._handlers["sub"] = this.onTag_Simple;
        this._handlers["color"] = this.onTag_COLOR;
        this._handlers["font"] = this.onTag_FONT;
        this._handlers["size"] = this.onTag_SIZE;
    }
    onTag_URL(tagName, end, attr) {
        if (!end) {
            if (attr != null)
                return "<a href=\"" + attr + "\">";
            else {
                var href = this.getTagText();
                return "<a href=\"" + href + "\">";
            }
        }
        else
            return "</a>";
    }
    onTag_IMG(tagName, end, attr) {
        if (!end) {
            var src = this.getTagText(true);
            if (!src)
                return null;
            if (this.defaultImgWidth)
                return "<img src=\"" + src + "\" width=\"" + this.defaultImgWidth + "\" height=\"" + this.defaultImgHeight + "\"/>";
            else
                return "<img src=\"" + src + "\"/>";
        }
        else
            return null;
    }
    onTag_B(tagName, end, attr) {
        return end ? ("</b>") : ("<b>");
    }
    onTag_I(tagName, end, attr) {
        return end ? ("</i>") : ("<i>");
    }
    onTag_U(tagName, end, attr) {
        return end ? ("</u>") : ("<u>");
    }
    onTag_Simple(tagName, end, attr) {
        return end ? ("</" + tagName + ">") : ("<" + tagName + ">");
    }
    onTag_COLOR(tagName, end, attr) {
        if (!end) {
            this.lastColor = attr;
            return "<font color=\"" + attr + "\">";
        }
        else
            return "</font>";
    }
    onTag_FONT(tagName, end, attr) {
        if (!end)
            return "<font face=\"" + attr + "\">";
        else
            return "</font>";
    }
    onTag_SIZE(tagName, end, attr) {
        if (!end) {
            this.lastSize = attr;
            return "<font size=\"" + attr + "\">";
        }
        else
            return "</font>";
    }
    getTagText(remove) {
        var pos1 = this._readPos;
        var pos2;
        var result = "";
        while ((pos2 = this._text.indexOf("[", pos1)) != -1) {
            if (this._text.charCodeAt(pos2 - 1) == 92) {
                result += this._text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
            }
            else {
                result += this._text.substring(pos1, pos2);
                break;
            }
        }
        if (pos2 == -1)
            return null;
        if (remove)
            this._readPos = pos2;
        return result;
    }
    parse(text, remove) {
        this._text = text;
        this.lastColor = null;
        this.lastSize = null;
        var pos1 = 0, pos2, pos3;
        var end;
        var tag, attr;
        var repl;
        var func;
        var result = "";
        while ((pos2 = text.indexOf("[", pos1)) != -1) {
            if (pos2 > 0 && text.charCodeAt(pos2 - 1) == 92) {
                result += text.substring(pos1, pos2 - 1);
                result += "[";
                pos1 = pos2 + 1;
                continue;
            }
            result += text.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = text.indexOf("]", pos1);
            if (pos2 == -1)
                break;
            end = text.charAt(pos1 + 1) == '/';
            tag = text.substring(end ? pos1 + 2 : pos1 + 1, pos2);
            this._readPos = pos2 + 1;
            attr = null;
            repl = null;
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                attr = tag.substring(pos3 + 1);
                tag = tag.substring(0, pos3);
            }
            tag = tag.toLowerCase();
            func = this._handlers[tag];
            if (func != null) {
                if (!remove) {
                    repl = func.call(this, tag, end, attr);
                    if (repl != null)
                        result += repl;
                }
            }
            else
                result += text.substring(pos1, this._readPos);
            pos1 = this._readPos;
        }
        if (pos1 < text.length)
            result += text.substring(pos1);
        this._text = null;
        return result;
    }
}
UBBParser.defaultParser = new UBBParser();

//# sourceMappingURL=UBBParser.js.map
