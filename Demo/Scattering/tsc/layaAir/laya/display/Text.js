import { Sprite } from "./Sprite";
import { BitmapFont } from "./BitmapFont";
import { TextStyle } from "./css/TextStyle";
import { Event } from "../events/Event";
import { Point } from "../maths/Point";
import { Rectangle } from "../maths/Rectangle";
import { WordText } from "../utils/WordText";
import { ILaya } from "../../ILaya";
import { LayaEnv } from "../../LayaEnv";
import { Config } from "../../Config";
import { Utils } from "../utils/Utils";
import { DrawRectCmd } from "./cmd/DrawRectCmd";
import { HtmlElement, HtmlElementType } from "../html/HtmlElement";
import { Pool } from "../utils/Pool";
import { HideFlags } from "../Const";
import { HtmlParser } from "../html/HtmlParser";
import { UBBParser } from "../html/UBBParser";
export class Text extends Sprite {
    constructor() {
        super();
        this._overflow = Text.VISIBLE;
        this._singleCharRender = false;
        this._prompt = '';
        this._textWidth = 0;
        this._textHeight = 0;
        this._textStyle = new TextStyle();
        this._textStyle.fontSize = Config.defaultFontSize;
        this._text = "";
        this.font = "";
        this._elements = [];
        this._lines = [];
        this._padding = [0, 0, 0, 0];
        this._fontSizeScale = 1;
    }
    static registerBitmapFont(name, bitmapFont) {
        bitmapFont._addReference();
        Text._bitmapFonts[name] = bitmapFont;
    }
    static unregisterBitmapFont(name, destroy = true) {
        let font = Text._bitmapFonts[name];
        if (font) {
            font._removeReference();
            if (destroy)
                font.destroy();
            delete Text._bitmapFonts[name];
        }
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        recoverLines(this._lines);
        HtmlElement.returnToPool(this._elements);
    }
    _getBoundPointsM(ifRotate = false) {
        var rec = Rectangle.TEMP;
        rec.setTo(0, 0, this.width, this.height);
        return rec._getBoundPoints();
    }
    getGraphicBounds(realSize = false) {
        var rec = Rectangle.TEMP;
        rec.setTo(0, 0, this.width, this.height);
        return rec;
    }
    get_width() {
        if (this._isWidthSet)
            return this._width;
        return this.textWidth;
    }
    _setWidth(value) {
        super._setWidth(value);
        if (!this._updatingLayout)
            this.markChanged();
        else
            this.drawBg();
    }
    get_height() {
        if (this._isHeightSet)
            return this._height;
        return this.textHeight;
    }
    _setHeight(value) {
        super._setHeight(value);
        if (!this._updatingLayout)
            this.markChanged();
        else
            this.drawBg();
    }
    get textWidth() {
        this.typeset();
        return this._textWidth;
    }
    get textHeight() {
        this.typeset();
        return this._textHeight;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        if (value == null)
            value = "";
        else if (typeof (value) !== "string")
            value = '' + value;
        if (!this.ignoreLang && Text.langPacks)
            value = Text.langPacks[value] || value;
        if (this._text != value) {
            this._text = value;
            this.markChanged();
            this.event(Event.CHANGE);
        }
    }
    changeText(text) {
        this.text = text;
    }
    get font() {
        return this._textStyle.font;
    }
    set font(value) {
        this._textStyle.font = value;
        if (!value) {
            value = Config.defaultFont;
            if (!value)
                value = "Arial";
        }
        this._realFont = value;
        this._bitmapFont = Text._bitmapFonts[value];
        if (this._bitmapFont) {
            if (this._text)
                this.markChanged();
        }
        else if (value && (Utils.getFileExtension(value) || value.startsWith("res://"))) {
            let t = value;
            ILaya.loader.load(value).then(fontObj => {
                if (!fontObj || this._realFont != t)
                    return;
                if (fontObj instanceof BitmapFont)
                    this._bitmapFont = fontObj;
                else
                    this._realFont = fontObj.family;
                if (this._text)
                    this.markChanged();
            });
        }
        else {
            this._realFont = (ILaya.Browser.onIPhone ? (Config.fontFamilyMap[value] || value) : value);
            if (this._text)
                this.markChanged();
        }
    }
    get fontSize() {
        return this._textStyle.fontSize;
    }
    set fontSize(value) {
        if (this._textStyle.fontSize != value) {
            this._textStyle.fontSize = value;
            this.markChanged();
        }
    }
    get color() {
        return this._textStyle.color;
    }
    set color(value) {
        this.set_color(value);
    }
    set_color(value) {
        if (this._textStyle.color != value) {
            this._textStyle.color = value;
            if (!this._isChanged && this._graphics && this._elements.length == 0)
                this._graphics.replaceTextColor(this._textStyle.color);
            else
                this.markChanged();
        }
    }
    get bold() {
        return this._textStyle.bold;
    }
    set bold(value) {
        if (this._textStyle.bold != value) {
            this._textStyle.bold = value;
            this.markChanged();
        }
    }
    get italic() {
        return this._textStyle.italic;
    }
    set italic(value) {
        if (this._textStyle.italic != value) {
            this._textStyle.italic = value;
            this.markChanged();
        }
    }
    get align() {
        return this._textStyle.align;
    }
    set align(value) {
        if (this._textStyle.align != value) {
            this._textStyle.align = value;
            this.markChanged();
        }
    }
    get valign() {
        return this._textStyle.valign;
    }
    set valign(value) {
        if (this._textStyle.valign != value) {
            this._textStyle.valign = value;
            this.markChanged();
        }
    }
    get wordWrap() {
        return this._wordWrap;
    }
    set wordWrap(value) {
        if (this._wordWrap != value) {
            this._wordWrap = value;
            this.markChanged();
        }
    }
    get leading() {
        return this._textStyle.leading;
    }
    set leading(value) {
        if (this._textStyle.leading != value) {
            this._textStyle.leading = value;
            this.markChanged();
        }
    }
    get padding() {
        return this._padding;
    }
    set padding(value) {
        if (typeof (value) == 'string') {
            let arr = value.split(",");
            this._padding.length = 0;
            for (let i = 0; i < 4; i++) {
                let v = parseFloat(arr[i]);
                if (isNaN(v))
                    v = 0;
                this._padding.push(v);
            }
        }
        else
            this._padding = value;
        this.markChanged();
    }
    get bgColor() {
        return this._bgColor;
    }
    set bgColor(value) {
        this._bgColor = value;
        this.drawBg();
    }
    get borderColor() {
        return this._borderColor;
    }
    set borderColor(value) {
        this._borderColor = value;
        this.drawBg();
    }
    get stroke() {
        return this._textStyle.stroke;
    }
    set stroke(value) {
        if (this._textStyle.stroke != value) {
            this._textStyle.stroke = value;
            this.markChanged();
        }
    }
    get strokeColor() {
        return this._textStyle.strokeColor;
    }
    set strokeColor(value) {
        if (this._textStyle.strokeColor != value) {
            this._textStyle.strokeColor = value;
            this.markChanged();
        }
    }
    get overflow() {
        return this._overflow;
    }
    set overflow(value) {
        if (this._overflow != value) {
            this._overflow = value;
            this.markChanged();
        }
    }
    get underline() {
        return this._textStyle.underline;
    }
    set underline(value) {
        if (this._textStyle.underline != value) {
            this._textStyle.underline = value;
            this.markChanged();
        }
    }
    get underlineColor() {
        return this._textStyle.underlineColor;
    }
    set underlineColor(value) {
        if (this._textStyle.underlineColor != value) {
            this._textStyle.underlineColor = value;
            this.markChanged();
        }
    }
    get singleCharRender() {
        return this._singleCharRender;
    }
    set singleCharRender(value) {
        this._singleCharRender = value;
    }
    get html() {
        return this._html;
    }
    set html(value) {
        if (this._html != value) {
            this._html = value;
            this.markChanged();
        }
    }
    get ubb() {
        return this._ubb;
    }
    set ubb(value) {
        if (this._ubb != value) {
            this._ubb = value;
            this.markChanged();
        }
    }
    get maxWidth() {
        return this._maxWidth;
    }
    set maxWidth(value) {
        if (this._maxWidth != value) {
            this._maxWidth = value;
            this.markChanged();
        }
    }
    get htmlParseOptions() {
        return this._htmlParseOptions;
    }
    set htmlParseOptions(value) {
        this._htmlParseOptions = value;
    }
    parseTemplate(template) {
        let pos1 = 0, pos2, pos3;
        let tag;
        let value;
        let result = "";
        while ((pos2 = template.indexOf("{", pos1)) != -1) {
            if (pos2 > 0 && template.charCodeAt(pos2 - 1) == 92) {
                result += template.substring(pos1, pos2 - 1);
                result += "{";
                pos1 = pos2 + 1;
                continue;
            }
            result += template.substring(pos1, pos2);
            pos1 = pos2;
            pos2 = template.indexOf("}", pos1);
            if (pos2 == -1)
                break;
            if (pos2 == pos1 + 1) {
                result += template.substring(pos1, pos1 + 2);
                pos1 = pos2 + 1;
                continue;
            }
            tag = template.substring(pos1 + 1, pos2);
            pos3 = tag.indexOf("=");
            if (pos3 != -1) {
                value = this._templateVars[tag.substring(0, pos3)];
                if (value == null)
                    result += tag.substring(pos3 + 1);
                else
                    result += value;
            }
            else {
                value = this._templateVars[tag];
                if (value != null)
                    result += value;
            }
            pos1 = pos2 + 1;
        }
        if (pos1 < template.length)
            result += template.substring(pos1);
        return result;
    }
    get templateVars() {
        return this._templateVars;
    }
    set templateVars(value) {
        if (!this._templateVars && !value)
            return;
        if (value === true)
            this._templateVars = {};
        else if (value === false)
            this._templateVars = null;
        else
            this._templateVars = value;
        this.markChanged();
    }
    setVar(name, value) {
        if (!this._templateVars)
            this._templateVars = {};
        this._templateVars[name] = value;
        this.markChanged();
        return this;
    }
    set scrollX(value) {
        this.typeset();
        if (!this._scrollPos)
            return;
        let maxScrollX = this.maxScrollX;
        value = value < 0 ? 0 : value;
        value = value > maxScrollX ? maxScrollX : value;
        this._scrollPos.x = value;
        this.renderText();
    }
    get scrollX() {
        if (!this._scrollPos)
            return 0;
        return this._scrollPos.x;
    }
    set scrollY(value) {
        this.typeset();
        if (!this._scrollPos)
            return;
        let maxScrollY = this.maxScrollY;
        value = value < 0 ? 0 : value;
        value = value > maxScrollY ? maxScrollY : value;
        this._scrollPos.y = value;
        this.renderText();
    }
    get scrollY() {
        if (!this._scrollPos)
            return 0;
        return this._scrollPos.y;
    }
    get maxScrollX() {
        let r = this.textWidth - this._width;
        return r < 0 ? 0 : r;
    }
    get maxScrollY() {
        let r = this.textHeight - this._height;
        return r < 0 ? 0 : r;
    }
    get lines() {
        this.typeset();
        return this._lines;
    }
    markChanged() {
        if (!this._isChanged) {
            this._isChanged = true;
            ILaya.systemTimer.callLater(this, this._typeset);
        }
    }
    typeset() {
        this._isChanged && ILaya.systemTimer.runCallLater(this, this._typeset);
    }
    refreshLayout() {
        ILaya.systemTimer.callLater(this, this.doLayout);
    }
    get objContainer() {
        if (!this._objContainer) {
            this._objContainer = new Sprite();
            this._objContainer.hideFlags |= HideFlags.HideAndDontSave;
            this.addChild(this._objContainer);
        }
        return this._objContainer;
    }
    _typeset() {
        this._isChanged = false;
        if (this._hideText || this._destroyed)
            return;
        HtmlElement.returnToPool(this._elements);
        if (this._objContainer)
            this._objContainer.removeChildren();
        let text = this._text;
        let isPrompt;
        if (!text && this._prompt) {
            text = this._prompt;
            isPrompt = true;
        }
        if (!text) {
            this.graphics.clear(true);
            this.drawBg();
            this._textWidth = this._textHeight = 0;
            this._scrollPos = null;
            if (this._onPostLayout) {
                this._updatingLayout = true;
                this._onPostLayout();
                this._updatingLayout = false;
            }
            return;
        }
        let html = this._html;
        text = text.replace(normalizeCR, "\n");
        if (this._parseEscapeChars)
            text = text.replace(escapeCharsPattern, getReplaceStr);
        if (!isPrompt && this._templateVars)
            text = this.parseTemplate(text);
        if (this._ubb) {
            text = UBBParser.defaultParser.parse(text);
            html = true;
        }
        if (!isPrompt && this._asPassword)
            text = Text._passwordChar.repeat(text.length);
        let saveColor;
        if (isPrompt) {
            saveColor = this._textStyle.color;
            this._textStyle.color = this._promptColor;
        }
        if (html)
            HtmlParser.defaultParser.parse(text, this._textStyle, this._elements, this._htmlParseOptions);
        else {
            let ele = HtmlElement.getFromPool(HtmlElementType.Text);
            Object.assign(ele.style, this._textStyle);
            ele.text = text;
            this._elements.push(ele);
        }
        if (isPrompt)
            this._textStyle.color = saveColor;
        this.doLayout();
    }
    doLayout() {
        if (this._destroyed)
            return;
        this._updatingLayout = true;
        this._fontSizeScale = 1;
        let wordWrap = this._wordWrap || this._overflow == Text.ELLIPSIS;
        let padding = this._padding;
        let rectWidth;
        if (this._isWidthSet)
            rectWidth = this._width - padding[3] - padding[1];
        else
            rectWidth = Number.MAX_VALUE;
        if (this._maxWidth > 0) {
            let m = this._maxWidth - padding[3] - padding[1];
            if (!wordWrap || m < rectWidth)
                rectWidth = m;
            wordWrap = true;
        }
        let rectHeight = this._isHeightSet ? (this._height - padding[0] - padding[2]) : Number.MAX_VALUE;
        let bfont = this._bitmapFont;
        let lineX, lineY;
        let curLine;
        let lastCmd;
        let charWidth, charHeight;
        let fontSize;
        let getTextWidth = (text) => {
            if (bfont)
                return bfont.getTextWidth(text, fontSize);
            else {
                if (LayaEnv.isConch)
                    return window.conchTextCanvas.measureText(text).width;
                else {
                    let ret = ILaya.Browser.context.measureText(text);
                    return ret ? ret.width : 100;
                }
            }
        };
        let buildLines = (text, style) => {
            if (bfont) {
                charWidth = bfont.getMaxWidth(fontSize);
                charHeight = bfont.getMaxHeight(fontSize);
            }
            else {
                let ctxFont = (style.italic ? "italic " : "") + (style.bold ? "bold " : "") + fontSize + "px " + this._realFont;
                style._ctxFont = ctxFont;
                let mr;
                if (LayaEnv.isConch) {
                    window.conchTextCanvas.font = ctxFont;
                    mr = window.conchTextCanvas.measureText(Text._testWord);
                }
                else {
                    ILaya.Browser.context.font = ctxFont;
                    mr = ILaya.Browser.context.measureText(Text._testWord);
                }
                if (mr) {
                    charWidth = mr.width;
                    charHeight = Math.ceil(mr.height || fontSize);
                }
                else {
                    charWidth = 100;
                    charHeight = fontSize;
                }
            }
            let lines = text.split("\n");
            if (wordWrap) {
                for (let i = 0, n = lines.length; i < n; i++) {
                    let line = lines[i];
                    if (line.length > 0)
                        wrapText(line, style);
                    if (i != n - 1) {
                        endLine();
                        startLine();
                    }
                }
            }
            else {
                for (let i = 0, n = lines.length; i < n; i++) {
                    let line = lines[i];
                    if (line.length > 0)
                        addCmd(line, style, null);
                    if (i != n - 1) {
                        endLine();
                        startLine();
                    }
                }
            }
        };
        let addCmd = (target, style, width) => {
            let cmd = cmdPool.length > 0 ? cmdPool.pop() : {};
            cmd.x = lineX;
            cmd.y = lineY;
            if (typeof (target) === "string") {
                if (!width)
                    width = getTextWidth(target);
                if (!cmd.wt)
                    cmd.wt = new WordText();
                cmd.wt.setText(target);
                cmd.wt.width = width;
                cmd.wt.splitRender = this._singleCharRender;
                cmd.width = width;
                cmd.height = charHeight;
            }
            else {
                cmd.obj = target;
                cmd.x++;
                cmd.width = target.width + 2;
                cmd.height = target.height;
            }
            cmd.style = style;
            cmd.linkEnd = false;
            cmd.next = null;
            lineX += Math.round(cmd.width);
            if (!curLine.cmd)
                curLine.cmd = cmd;
            else
                lastCmd.next = cmd;
            lastCmd = cmd;
        };
        let endLine = () => {
            let lineHeight = 0;
            let cmd = curLine.cmd;
            while (cmd) {
                if (cmd.height > lineHeight)
                    lineHeight = cmd.height;
                cmd = cmd.next;
            }
            cmd = curLine.cmd;
            while (cmd) {
                cmd.y = Math.floor((lineHeight - cmd.height) * 0.5);
                cmd = cmd.next;
            }
            if (lineHeight == 0)
                lineHeight = charHeight;
            lineHeight++;
            curLine.height = lineHeight;
            curLine.width = lineX;
        };
        let startLine = () => {
            lineX = 0;
            if (curLine)
                lineY += curLine.height + Math.floor(this._textStyle.leading * this._fontSizeScale);
            curLine = linePool.length > 0 ? linePool.pop() : { cmds: [] };
            curLine.x = 0;
            curLine.y = lineY;
            this._lines.push(curLine);
            return curLine;
        };
        let wrapText = (text, style) => {
            let remainWidth = Math.max(0, rectWidth - lineX);
            let tw = getTextWidth(text);
            if (tw <= remainWidth) {
                addCmd(text, style, tw);
                return;
            }
            let maybeIndex = 0;
            let wordWidth = 0;
            let startIndex = 0;
            let isEmoji = testEmoji(text);
            if (!bfont && !isEmoji) {
                maybeIndex = Math.floor(remainWidth / charWidth);
                (maybeIndex == 0) && (maybeIndex = 1);
                wordWidth = getTextWidth(text.substring(0, maybeIndex));
                if (remainWidth < wordWidth && lineX != 0) {
                    endLine();
                    startLine();
                    remainWidth = rectWidth;
                }
            }
            let len = text.length;
            for (let j = maybeIndex; j < len; j++) {
                tw = getTextWidth(text.charAt(j));
                wordWidth += tw;
                let isEmojiChar = false;
                if (isEmoji && j + 1 < len && testEmoji(text.charAt(j) + text.charAt(j + 1))) {
                    wordWidth += tw >> 1;
                    j++;
                    isEmojiChar = true;
                }
                if (wordWidth > remainWidth) {
                    if (isEmojiChar) {
                        if (wordWidth == tw + (tw >> 1)) {
                            j++;
                        }
                        else {
                            j--;
                        }
                    }
                    if (j == 0) {
                        if (lineX > 0) {
                            endLine();
                            startLine();
                            remainWidth = rectWidth;
                        }
                        continue;
                    }
                    let newLine = text.substring(startIndex, j);
                    wordWidth -= tw;
                    let ccode = newLine.charCodeAt(newLine.length - 1);
                    if (ccode < 0x4e00 || ccode > 0x9fa5) {
                        let execResult = wordBoundaryTest.exec(newLine);
                        if (execResult) {
                            j = execResult.index + startIndex;
                            if (execResult.index == 0)
                                j += newLine.length;
                            else {
                                wordWidth = null;
                                newLine = text.substring(startIndex, j);
                            }
                        }
                    }
                    addCmd(newLine, style, wordWidth);
                    endLine();
                    startLine();
                    remainWidth = rectWidth;
                    startIndex = j;
                    if (j + maybeIndex < len) {
                        if (maybeIndex != 0)
                            j += maybeIndex - 1;
                        wordWidth = getTextWidth(text.substring(startIndex, j + 1));
                    }
                    else {
                        addCmd(text.substring(startIndex, len), style);
                        startIndex = -1;
                        break;
                    }
                }
            }
            if (startIndex != -1)
                addCmd(text.substring(startIndex, len), style);
        };
        let calcTextSize = () => {
            let nw = 0, nh = 0;
            for (let line of this._lines) {
                if (line.width > nw)
                    nw = line.width;
            }
            if (nw > 0)
                nw += padding[1] + padding[3];
            this._textWidth = nw;
            let lastLine = this._lines[this._lines.length - 1];
            if (lastLine)
                nh = lastLine.y + lastLine.height;
            if (nh > 0)
                nh += padding[0] + padding[2];
            this._textHeight = nh;
        };
        let run = () => {
            lineX = lineY = charWidth = charHeight = 0;
            curLine = null;
            lastCmd = null;
            recoverLines(this._lines);
            startLine();
            let elements = this._elements;
            for (let i = 0, n = elements.length; i < n; i++) {
                let ele = elements[i];
                if (ele.type == HtmlElementType.Text) {
                    fontSize = Math.floor(ele.style.fontSize * this._fontSizeScale);
                    if (fontSize == 0)
                        fontSize = 1;
                    buildLines(ele.text, ele.style);
                }
                else if (ele.type == HtmlElementType.LinkEnd) {
                    if (lastCmd)
                        lastCmd.linkEnd = true;
                }
                else {
                    let htmlObj = ele.obj;
                    if (!htmlObj) {
                        let cls = HtmlParser.classMap[ele.type];
                        if (cls) {
                            htmlObj = Pool.createByClass(cls);
                            htmlObj.create(this, ele);
                            ele.obj = htmlObj;
                        }
                    }
                    if (htmlObj) {
                        if (wordWrap) {
                            let remainWidth = rectWidth - lineX;
                            if (remainWidth < htmlObj.width + 1) {
                                if (lineX > 0) {
                                    endLine();
                                    startLine();
                                }
                            }
                        }
                        addCmd(htmlObj, ele.style);
                    }
                }
            }
            endLine();
            calcTextSize();
        };
        run();
        if (this._overflow == Text.SHRINK) {
            if (this._lines.length > 1 && this._textHeight > rectHeight) {
                let low = 0;
                let high = this._textStyle.fontSize;
                this._fontSizeScale = Math.sqrt(rectHeight / this._textHeight);
                let cur = Math.floor(this._fontSizeScale * this._textStyle.fontSize);
                while (true) {
                    run();
                    if (this._textWidth > rectWidth || this._textHeight > rectHeight)
                        high = cur;
                    else
                        low = cur;
                    if (high - low > 1 || high != low && cur == high) {
                        cur = low + (high - low) / 2;
                        this._fontSizeScale = cur / this._textStyle.fontSize;
                    }
                    else
                        break;
                }
            }
            else if (this._textWidth > rectWidth) {
                this._fontSizeScale = rectWidth / this._textWidth;
                run();
                if (this._textWidth > rectWidth) {
                    let size = Math.floor(this._textStyle.fontSize * this._fontSizeScale);
                    size--;
                    this._fontSizeScale = size / this._textStyle.fontSize;
                    run();
                }
            }
        }
        else if (this._overflow == Text.ELLIPSIS && (this._textWidth > rectWidth || this._textHeight > rectHeight)) {
            let i = this._lines.findIndex(line => line.y + line.height > rectHeight);
            if (i == 0)
                i = 1;
            let linesDeleted = false;
            if (i != -1 && this._lines.length > i) {
                recoverLines(this._lines.splice(i, this._lines.length - i));
                linesDeleted = true;
            }
            let lastLine = this._lines[this._lines.length - 1];
            let cmd = lastLine.cmd;
            let next;
            let done = false;
            while (cmd) {
                next = cmd.next;
                if (done) {
                    if (cmd.obj)
                        cmd.obj = null;
                    else if (cmd.wt)
                        cmd.wt.cleanCache();
                    cmdPool.push(cmd);
                }
                else if ((!next && linesDeleted) || cmd.x + cmd.width > rectWidth) {
                    if (cmd.obj)
                        cmd.obj = null;
                    if (!cmd.wt)
                        cmd.wt = new WordText();
                    cmd.wt.setText(cmd.wt.text.substring(0, Math.max(0, cmd.wt.text.length - 2)) + ellipsisStr);
                    fontSize = cmd.style.fontSize;
                    cmd.width = cmd.wt.width = getTextWidth(cmd.wt.text);
                    cmd.wt.splitRender = this._singleCharRender;
                    cmd.next = null;
                    done = true;
                }
                cmd = next;
            }
            if (done)
                calcTextSize();
        }
        if (this._onPostLayout)
            this._onPostLayout();
        let align = this._textStyle.align == "center" ? 1 : (this._textStyle.align == "right" ? 2 : 0);
        if (align != 0 && this._isWidthSet) {
            let rectWidth = this._width - padding[3] - padding[1];
            for (let line of this._lines) {
                let offsetX = 0;
                if (align == 1)
                    offsetX = Math.floor((rectWidth - line.width) * 0.5);
                else if (align == 2)
                    offsetX = rectWidth - line.width;
                if (offsetX > 0)
                    line.x = offsetX;
            }
        }
        if (this._isHeightSet && this._textHeight < this._height) {
            let offsetY = 0;
            if (this._textStyle.valign === "middle")
                offsetY = Math.floor((this._height - this._textHeight) * 0.5);
            else if (this._textStyle.valign === "bottom")
                offsetY = this._height - this._textHeight;
            if (offsetY > 0) {
                for (let line of this._lines) {
                    line.y += offsetY;
                }
            }
        }
        if (this._overflow == Text.SCROLL
            && (this._isWidthSet && this._textWidth > this._width || this._isHeightSet && this._textHeight > this._height)) {
            if (!this._scrollPos)
                this._scrollPos = new Point(0, 0);
            else {
                let maxScrollX = this.maxScrollX;
                let maxScrollY = this.maxScrollY;
                if (this._scrollPos.x > maxScrollX)
                    this._scrollPos.x = maxScrollX;
                if (this._scrollPos.y > maxScrollY)
                    this._scrollPos.y = maxScrollY;
            }
        }
        else
            this._scrollPos = null;
        if (this._objContainer) {
            this._objContainer.size(this._width, this._height);
            if (this._scrollPos || this._overflow == Text.HIDDEN && this._objContainer.numChildren > 0) {
                if (!this._objContainer.scrollRect)
                    this._objContainer.scrollRect = new Rectangle();
                this._objContainer.scrollRect.setTo(0, 0, this._width, this._height);
            }
            else
                this._objContainer.scrollRect = null;
        }
        this._updatingLayout = false;
        this.renderText();
    }
    renderText() {
        let graphics = this.graphics;
        graphics.clear(true);
        this.drawBg();
        let padding = this._padding;
        let paddingLeft = padding[3];
        let paddingTop = padding[0];
        let bfont = this._bitmapFont;
        let scrollPos = this._scrollPos;
        let rectWidth = (this._isWidthSet ? this._width : this._textWidth) - padding[3] - padding[1];
        let rectHeight = (this._isHeightSet ? this._height : this._textHeight) - padding[0] - padding[2];
        let bottom = paddingTop + rectHeight;
        let clipped = this._overflow == Text.HIDDEN || this._overflow == Text.SCROLL;
        if (clipped) {
            graphics.save();
            graphics.clipRect(paddingLeft, paddingTop, rectWidth, rectHeight);
            this.repaint();
        }
        let x = 0, y = 0;
        let lines = this._lines;
        let lineCnt = lines.length;
        let curLink;
        let linkStartX;
        for (let i = 0; i < lineCnt; i++) {
            let line = lines[i];
            x = paddingLeft + line.x;
            y = paddingTop + line.y;
            if (scrollPos) {
                x -= scrollPos.x;
                y -= scrollPos.y;
            }
            let lineClipped = clipped && ((y + line.height) <= paddingTop || y >= bottom);
            let cmd = line.cmd;
            while (cmd) {
                if (cmd.linkEnd) {
                    if (curLink) {
                        curLink.addRect(linkStartX, y, x + cmd.x + cmd.width - linkStartX, line.height);
                        curLink = null;
                    }
                }
                if (cmd.obj) {
                    cmd.obj.pos(x + cmd.x, y + cmd.y);
                    if (cmd.obj.element.type == HtmlElementType.Link) {
                        curLink = cmd.obj;
                        curLink.resetArea();
                        linkStartX = x + cmd.x;
                    }
                }
                else if (!lineClipped) {
                    if (bfont) {
                        let tx = 0;
                        let str = cmd.wt.text;
                        let color = bfont.tint ? cmd.style.color : "#FFFFFF";
                        let scale = Math.floor((bfont.autoScaleSize ? cmd.style.fontSize : bfont.fontSize) * this._fontSizeScale) / bfont.fontSize;
                        for (let i = 0, n = str.length; i < n; i++) {
                            let c = str.charCodeAt(i);
                            let g = bfont.dict[c];
                            if (g) {
                                if (g.texture)
                                    graphics.drawImage(g.texture, x + cmd.x + tx + g.x * scale, y + cmd.y + g.y * scale, g.width * scale, g.height * scale, color);
                                tx += Math.round(g.advance * scale);
                            }
                        }
                    }
                    else {
                        let ctxFont = cmd.style._ctxFont;
                        if (cmd.style.stroke)
                            graphics.fillBorderText(cmd.wt, x + cmd.x, y + cmd.y, ctxFont, cmd.style.color, null, cmd.style.stroke, cmd.style.strokeColor);
                        else
                            graphics.fillText(cmd.wt, x + cmd.x, y + cmd.y, ctxFont, cmd.style.color, null);
                    }
                }
                if (!lineClipped && cmd.style.underline) {
                    let thickness = Math.max(1, cmd.style.fontSize * this._fontSizeScale / 16);
                    graphics.drawLine(x + cmd.x, y + line.height - thickness, x + cmd.x + cmd.width, y + line.height - thickness, cmd.style.underlineColor || cmd.style.color, thickness);
                }
                cmd = cmd.next;
            }
            if (curLink) {
                curLink.addRect(linkStartX, y, rectWidth - linkStartX + paddingLeft, line.height);
                linkStartX = paddingLeft;
            }
        }
        if (clipped)
            graphics.restore();
    }
    drawBg() {
        let cmd = this._bgDrawCmd;
        if (this._bgColor || this._borderColor) {
            if (!cmd) {
                cmd = new DrawRectCmd();
                cmd.x = cmd.y = 0;
                cmd.width = cmd.height = 1;
                cmd.percent = true;
                this._bgDrawCmd = cmd;
            }
            cmd.fillColor = this._bgColor;
            cmd.lineColor = this._borderColor;
            cmd.lineWidth = this._borderColor ? 1 : 0;
            let cmds = this.graphics.cmds;
            let i = cmds.indexOf(cmd);
            if (i != 0) {
                if (i != -1)
                    cmds.splice(i, 1);
                cmds.unshift(cmd);
                this.graphics.cmds = cmds;
            }
        }
        else if (cmd) {
            this.graphics.removeCmd(cmd);
        }
    }
}
Text.VISIBLE = "visible";
Text.SCROLL = "scroll";
Text.HIDDEN = "hidden";
Text.SHRINK = "shrink";
Text.ELLIPSIS = "ellipsis";
Text.RightToLeft = false;
Text._testWord = "游";
Text._passwordChar = "●";
Text._bitmapFonts = {};
const cmdPool = [];
const linePool = [];
function recoverLines(lines) {
    for (let line of lines) {
        let cmd = line.cmd;
        while (cmd) {
            if (cmd.obj)
                cmd.obj = null;
            else if (cmd.wt)
                cmd.wt.cleanCache();
            cmdPool.push(cmd);
            cmd = cmd.next;
        }
        line.cmd = null;
    }
    linePool.push(...lines);
    lines.length = 0;
}
const emojiTest = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function testEmoji(str) {
    if (null == str)
        return false;
    return emojiTest.test(str);
}
const wordBoundaryTest = /(?:[^\s\!-\/])+$/;
const normalizeCR = /\r\n/g;
const escapeCharsPattern = /\\(\w)/g;
const escapeSequence = { "\\n": "\n", "\\t": "\t" };
const ellipsisStr = "…";
function getReplaceStr(word) {
    return escapeSequence[word];
}

//# sourceMappingURL=Text.js.map
