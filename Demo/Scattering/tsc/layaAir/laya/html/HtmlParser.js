import { TextStyle } from "../display/css/TextStyle";
import { HtmlElement, HtmlElementType } from "./HtmlElement";
import { HtmlImage } from "./HtmlImage";
import { HtmlLink } from "./HtmlLink";
import { HtmlParseOptions } from "./HtmlParseOptions";
import { XMLIterator, XMLTagType } from "./XMLIterator";
import { XMLUtils } from "./XMLUtils";
const s_list1 = new Array();
const s_list2 = new Array();
export class HtmlParser {
    constructor() {
        this._styleStack = new Array();
        this._style = new TextStyle();
        this._options = new HtmlParseOptions();
    }
    parse(aSource, style, out, options) {
        if (options == null)
            options = this._options;
        this._elements = out;
        this._styleStackTop = 0;
        Object.assign(this._style, style);
        this._style.colorChanged = false;
        let skipText = 0;
        let ignoreWhiteSpace = options.ignoreWhiteSpace;
        let skipNextCR = false;
        let text;
        XMLIterator.begin(aSource, true);
        while (XMLIterator.nextTag()) {
            if (skipText == 0) {
                text = XMLIterator.getText(ignoreWhiteSpace);
                if (text.length > 0) {
                    if (skipNextCR && text[0] == '\n')
                        text = text.substring(1);
                    this.appendText(text);
                }
            }
            skipNextCR = false;
            switch (XMLIterator.tagName) {
                case "b":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.bold = true;
                    }
                    else
                        this.popStyle();
                    break;
                case "i":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.italic = true;
                    }
                    else
                        this.popStyle();
                    break;
                case "u":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.underline = true;
                    }
                    else
                        this.popStyle();
                    break;
                case "strike":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.strikethrough = true;
                    }
                    else
                        this.popStyle();
                    break;
                case "font":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.fontSize = XMLUtils.getInt(XMLIterator.attributes, "size", this._style.fontSize);
                        let color = XMLIterator.getAttribute("color");
                        if (color != null) {
                            this._style.color = color;
                            this._style.colorChanged = true;
                        }
                    }
                    else if (XMLIterator.tagType == XMLTagType.End)
                        this.popStyle();
                    break;
                case "br":
                    this.appendText("\n");
                    break;
                case "img":
                    if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                        let element = HtmlElement.getFromPool(HtmlElementType.Image);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.style.align = this._style.align;
                        element.style.underline = this._style.underline;
                        element.style.underlineColor = this._style.underlineColor;
                        this._elements.push(element);
                    }
                    break;
                case "a":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.underline = this._style.underline || options.linkUnderline;
                        if (!this._style.colorChanged && options.linkColor != null)
                            this._style.color = options.linkColor;
                        let element = HtmlElement.getFromPool(HtmlElementType.Link);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        element.style.align = this._style.align;
                        this._elements.push(element);
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.popStyle();
                        let element = HtmlElement.getFromPool(HtmlElementType.LinkEnd);
                        this._elements.push(element);
                    }
                    break;
                case "input":
                    {
                        let element = HtmlElement.getFromPool(HtmlElementType.Input);
                        element.fetchAttributes();
                        element.name = element.getAttrString("name");
                        Object.assign(element.style, this._style);
                        this._elements.push(element);
                    }
                    break;
                case "select":
                    {
                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void) {
                            let element = HtmlElement.getFromPool(HtmlElementType.Select);
                            element.fetchAttributes();
                            if (XMLIterator.tagType == XMLTagType.Start) {
                                s_list1.length = 0;
                                s_list2.length = 0;
                                while (XMLIterator.nextTag()) {
                                    if (XMLIterator.tagName == "select")
                                        break;
                                    if (XMLIterator.tagName == "option") {
                                        if (XMLIterator.tagType == XMLTagType.Start || XMLIterator.tagType == XMLTagType.Void)
                                            s_list2.push(XMLUtils.getString(XMLIterator.attributes, "value", ""));
                                        else
                                            s_list1.push(XMLIterator.getText());
                                    }
                                }
                                element.setAttr("items", s_list1.slice());
                                element.setAttr("values", s_list2.slice());
                            }
                            element.name = element.getAttrString("name");
                            Object.assign(element.style, this._style);
                            this._elements.push(element);
                        }
                    }
                    break;
                case "p":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        this.pushStyle();
                        this._style.align = XMLIterator.getAttribute("align");
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else if (XMLIterator.tagType == XMLTagType.End) {
                        this.appendText("\n");
                        skipNextCR = true;
                        this.popStyle();
                    }
                    break;
                case "ui":
                case "div":
                case "li":
                    if (XMLIterator.tagType == XMLTagType.Start) {
                        if (!this.isNewLine())
                            this.appendText("\n");
                    }
                    else {
                        this.appendText("\n");
                        skipNextCR = true;
                    }
                    break;
                case "html":
                case "body":
                    ignoreWhiteSpace = true;
                    break;
                case "head":
                case "style":
                case "script":
                case "form":
                    if (XMLIterator.tagType == XMLTagType.Start)
                        skipText++;
                    else if (XMLIterator.tagType == XMLTagType.End)
                        skipText--;
                    break;
            }
        }
        if (skipText == 0) {
            text = XMLIterator.getText(ignoreWhiteSpace);
            if (text.length > 0) {
                if (skipNextCR && text[0] == '\n')
                    text = text.substring(1);
                this.appendText(text);
            }
        }
        this._elements = null;
    }
    pushStyle() {
        let tf;
        if (this._styleStack.length <= this._styleStackTop) {
            tf = new TextStyle();
            this._styleStack.push(tf);
        }
        else
            tf = this._styleStack[this._styleStackTop];
        Object.assign(tf, this._style);
        this._styleStackTop++;
    }
    popStyle() {
        if (this._styleStackTop > 0) {
            let tf = this._styleStack[this._styleStackTop - 1];
            Object.assign(this._style, tf);
            this._styleStackTop--;
        }
    }
    isNewLine() {
        if (this._elements.length > 0) {
            let element = this._elements[this._elements.length - 1];
            if (element && element.type == HtmlElementType.Text)
                return element.text.endsWith("\n");
            else
                return false;
        }
        return true;
    }
    appendText(text) {
        let element;
        if (this._elements.length > 0) {
            element = this._elements[this._elements.length - 1];
            if (element.type == HtmlElementType.Text && equalStyle(element.style, this._style)) {
                element.text += text;
                return;
            }
        }
        element = HtmlElement.getFromPool(HtmlElementType.Text);
        element.text = text;
        Object.assign(element.style, this._style);
        this._elements.push(element);
    }
}
HtmlParser.defaultParser = new HtmlParser();
HtmlParser.classMap = {
    [HtmlElementType.Image]: HtmlImage,
    [HtmlElementType.Link]: HtmlLink
};
function equalStyle(s1, s2) {
    for (let k in s1) {
        if (!k.startsWith("_") && s1[k] != s2[k])
            return false;
    }
    return true;
}

//# sourceMappingURL=HtmlParser.js.map
