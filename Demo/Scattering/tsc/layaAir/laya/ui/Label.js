import { Styles } from "./Styles";
import { Text } from "../display/Text";
import { Event } from "../events/Event";
import { UIComponent } from "./UIComponent";
import { UIUtils } from "./UIUtils";
import { HideFlags } from "../Const";
import { SerializeUtil } from "../loaders/SerializeUtil";
import { LayaEnv } from "../../LayaEnv";
export class Label extends UIComponent {
    constructor(text) {
        super();
        this._fitContent = "no";
        if (text != null)
            this.text = text;
    }
    createChildren() {
        this._tf = new Text();
        this._tf.hideFlags = HideFlags.HideAndDontSave;
        this._tf._parseEscapeChars = true;
        this._tf._onPostLayout = () => this._onPostLayout();
        this._tf.on(Event.CHANGE, () => {
            this.event(Event.CHANGE);
            if (!this._isWidthSet || !this._isHeightSet)
                this.onCompResize();
        });
        this.addChild(this._tf);
    }
    _onPostLayout() {
        if ((this._fitContent == "yes" || this._fitContent == "height") && (LayaEnv.isPlaying || this._tf.textWidth > 0 && this._tf.textHeight > 0)) {
            this._fitFlag = true;
            if (this._fitContent == "height")
                this.height = this._tf.textHeight;
            else
                this.size(this._tf.textWidth, this._tf.textHeight);
            this._fitFlag = false;
        }
    }
    get text() {
        return this._tf.text;
    }
    set text(value) {
        this._tf.text = value;
    }
    get wordWrap() {
        return this._tf.wordWrap;
    }
    set wordWrap(value) {
        this._tf.wordWrap = value;
    }
    get color() {
        return this._tf.color;
    }
    set color(value) {
        this._tf.color = value;
    }
    get font() {
        return this._tf.font;
    }
    set font(value) {
        this._tf.font = value;
    }
    get align() {
        return this._tf.align;
    }
    set align(value) {
        this._tf.align = value;
    }
    get valign() {
        return this._tf.valign;
    }
    set valign(value) {
        this._tf.valign = value;
    }
    get bold() {
        return this._tf.bold;
    }
    set bold(value) {
        this._tf.bold = value;
    }
    get italic() {
        return this._tf.italic;
    }
    set italic(value) {
        this._tf.italic = value;
    }
    get leading() {
        return this._tf.leading;
    }
    set leading(value) {
        this._tf.leading = value;
    }
    get fontSize() {
        return this._tf.fontSize;
    }
    set fontSize(value) {
        this._tf.fontSize = value;
    }
    get padding() {
        return this._tf.padding.join(",");
    }
    set padding(value) {
        this._tf.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
    }
    get bgColor() {
        return this._tf.bgColor;
    }
    set bgColor(value) {
        this._tf.bgColor = value;
    }
    get borderColor() {
        return this._tf.borderColor;
    }
    set borderColor(value) {
        this._tf.borderColor = value;
    }
    get stroke() {
        return this._tf.stroke;
    }
    set stroke(value) {
        this._tf.stroke = value;
    }
    get strokeColor() {
        return this._tf.strokeColor;
    }
    set strokeColor(value) {
        this._tf.strokeColor = value;
    }
    get html() {
        return this._tf.html;
    }
    set html(value) {
        this._tf.html = value;
    }
    get ubb() {
        return this._tf.ubb;
    }
    set ubb(value) {
        this._tf.ubb = value;
    }
    get maxWidth() {
        return this._tf.maxWidth;
    }
    set maxWidth(value) {
        this._tf.maxWidth = value;
    }
    get fitContent() {
        return this._fitContent;
    }
    set fitContent(value) {
        if (typeof (value) === "boolean")
            value = value ? "yes" : "no";
        if (this._fitContent != value) {
            if ((value == "yes" || value == "height") && !SerializeUtil.isDeserializing && (LayaEnv.isPlaying || this._tf.textWidth > 0 && this._tf.textHeight > 0)) {
                if (value == "height")
                    this.height = this._tf.textHeight;
                else
                    this.size(this._tf.textWidth, this._tf.textHeight);
            }
            this._fitContent = value;
        }
    }
    get textField() {
        return this._tf;
    }
    measureWidth() {
        return this._tf.width;
    }
    measureHeight() {
        return this._tf.height;
    }
    get_width() {
        if (this._isWidthSet || this._tf.text)
            return super.get_width();
        return 0;
    }
    set_width(value) {
        if (this._fitContent == "yes" && !this._fitFlag)
            return;
        super.set_width(value);
    }
    _setWidth(value) {
        super._setWidth(value);
        this._tf.width = value;
    }
    get_height() {
        if (this._isHeightSet || this._tf.text)
            return super.get_height();
        return 0;
    }
    set_height(value) {
        if ((this._fitContent == "yes" || this._fitContent == "height") && !this._fitFlag)
            return;
        super.set_height(value);
    }
    _setHeight(value) {
        super._setHeight(value);
        this._tf.height = value;
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.text = value + "";
        else
            super.set_dataSource(value);
    }
    get overflow() {
        return this._tf.overflow;
    }
    set overflow(value) {
        this._tf.overflow = value;
    }
    get underline() {
        return this._tf.underline;
    }
    set underline(value) {
        this._tf.underline = value;
    }
    get underlineColor() {
        return this._tf.underlineColor;
    }
    set underlineColor(value) {
        this._tf.underlineColor = value;
    }
    get ignoreLang() {
        return this._tf.ignoreLang;
    }
    set ignoreLang(value) {
        this._tf.ignoreLang = value;
    }
    get templateVars() {
        return this._tf.templateVars;
    }
    set templateVars(value) {
        this._tf.templateVars = value;
    }
    setVar(name, value) {
        this._tf.setVar(name, value);
        return this;
    }
}

//# sourceMappingURL=Label.js.map
