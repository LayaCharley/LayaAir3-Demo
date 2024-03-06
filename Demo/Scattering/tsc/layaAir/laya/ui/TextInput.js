import { Label } from "./Label";
import { Input } from "../display/Input";
import { Event } from "../events/Event";
import { Loader } from "../net/Loader";
import { AutoBitmap } from "./AutoBitmap";
import { Styles } from "./Styles";
import { UIUtils } from "./UIUtils";
import { ILaya } from "../../ILaya";
import { HideFlags } from "../Const";
import { URL } from "../net/URL";
export class TextInput extends Label {
    constructor(text) {
        super();
        if (text != null)
            this.text = text;
        this.skin = this.skin;
    }
    preinitialize() {
        this.mouseEnabled = true;
    }
    createChildren() {
        this.graphics = new AutoBitmap();
        this._tf = new Input();
        this._tf.hideFlags = HideFlags.HideAndDontSave;
        this._tf.padding = Styles.inputLabelPadding;
        this._tf._onPostLayout = () => this._onPostLayout();
        this._tf.on(Event.INPUT, () => this.event(Event.INPUT));
        this._tf.on(Event.ENTER, () => this.event(Event.ENTER));
        this._tf.on(Event.BLUR, () => this.event(Event.BLUR));
        this._tf.on(Event.FOCUS, () => this.event(Event.FOCUS));
        this.addChild(this._tf);
    }
    initialize() {
        this.width = 128;
        this.height = 22;
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (value == "")
            value = null;
        if (this._skin == value)
            return;
        this._setSkin(value);
    }
    _setSkin(url) {
        this._skin = url;
        if (url) {
            if (this._skinBaseUrl)
                url = URL.formatURL(url, this._skinBaseUrl);
            let source = Loader.getRes(url);
            if (source) {
                this._skinLoaded(source);
                return Promise.resolve();
            }
            else
                return ILaya.loader.load(url, Loader.IMAGE).then(tex => this._skinLoaded(tex));
        }
        else {
            this._skinLoaded(null);
            return Promise.resolve();
        }
    }
    _skinLoaded(source) {
        this._graphics.source = source;
        this._sizeChanged();
        this.event(Event.LOADED);
    }
    get sizeGrid() {
        return this._graphics && this._graphics.sizeGrid ? this._graphics.sizeGrid.join(",") : null;
    }
    set sizeGrid(value) {
        if (value)
            this._graphics.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
        else
            this._graphics.sizeGrid = null;
    }
    _setWidth(value) {
        super._setWidth(value);
        this._graphics && (this._graphics.width = value);
    }
    _setHeight(value) {
        super._setHeight(value);
        this._graphics && (this._graphics.height = value);
    }
    get multiline() {
        return this._tf.multiline;
    }
    set multiline(value) {
        this._tf.multiline = value;
    }
    set editable(value) {
        this._tf.editable = value;
    }
    get editable() {
        return this._tf.editable;
    }
    select() {
        this._tf.select();
    }
    get restrict() {
        return this._tf.restrict;
    }
    set restrict(pattern) {
        this._tf.restrict = pattern;
    }
    get prompt() {
        return this._tf.prompt;
    }
    set prompt(value) {
        this._tf.prompt = value;
    }
    get promptColor() {
        return this._tf.promptColor;
    }
    set promptColor(value) {
        this._tf.promptColor = value;
    }
    get maxChars() {
        return this._tf.maxChars;
    }
    set maxChars(value) {
        this._tf.maxChars = value;
    }
    get focus() {
        return this._tf.focus;
    }
    set focus(value) {
        this._tf.focus = value;
    }
    get type() {
        return this._tf.type;
    }
    set type(value) {
        this._tf.type = value;
    }
    setSelection(startIndex, endIndex) {
        this._tf.setSelection(startIndex, endIndex);
    }
}

//# sourceMappingURL=TextInput.js.map
