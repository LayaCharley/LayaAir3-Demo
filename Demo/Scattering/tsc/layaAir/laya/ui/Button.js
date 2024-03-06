import { UIComponent } from "./UIComponent";
import { Styles } from "./Styles";
import { NodeFlags, HideFlags } from "../Const";
import { Text } from "../display/Text";
import { Event } from "../events/Event";
import { Loader } from "../net/Loader";
import { AutoBitmap } from "./AutoBitmap";
import { UIUtils } from "./UIUtils";
import { ILaya } from "../../ILaya";
import { URL } from "../net/URL";
export class Button extends UIComponent {
    constructor(skin = null, label = "") {
        super();
        this._state = 0;
        this._autoSize = true;
        this._stateChanged = false;
        this._labelColors = Styles.buttonLabelColors;
        this._stateNum = Styles.buttonStateNum;
        if (skin)
            this.skin = skin;
        this.label = label;
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._text && this._text.destroy(destroyChild);
        this._text = null;
        this._clickHandler = null;
        this._labelColors = this._strokeColors = null;
    }
    createChildren() {
        this.graphics = new AutoBitmap();
    }
    createText() {
        if (!this._text) {
            this._text = new Text();
            this._text.overflow = Text.HIDDEN;
            this._text.align = "center";
            this._text.valign = "middle";
            this._text.width = this._width;
            this._text.height = this._height;
            this._text.hideFlags = HideFlags.HideAndDontSave;
        }
    }
    initialize() {
        if (this._mouseState !== 1) {
            this.mouseEnabled = true;
            this._setBit(NodeFlags.HAS_MOUSE, true);
        }
        this.on(Event.MOUSE_OVER, this, this.onMouse);
        this.on(Event.MOUSE_OUT, this, this.onMouse);
        this.on(Event.MOUSE_DOWN, this, this.onMouse);
        this.on(Event.MOUSE_UP, this, this.onMouse);
        this.on(Event.CLICK, this, this.onMouse);
    }
    onMouse(e) {
        if (this.toggle === false && this._selected)
            return;
        let type = e ? e.type : Event.CLICK;
        if (type === Event.CLICK) {
            this.toggle && (this.selected = !this._selected);
            this._clickHandler && this._clickHandler.run();
            return;
        }
        !this._selected && (this.state = stateMap[type]);
    }
    get skin() {
        return this._skin;
    }
    set skin(value) {
        if (this._skin == value)
            return;
        this._setSkin(value);
    }
    _setSkin(url) {
        this._skin = url;
        if (url) {
            if (this._skinBaseUrl)
                url = URL.formatURL(url, this._skinBaseUrl);
            let tex = Loader.getRes(url);
            if (!tex)
                return ILaya.loader.load(url, Loader.IMAGE).then(tex => this._skinLoaded(tex));
            else {
                this._skinLoaded(tex);
                return Promise.resolve();
            }
        }
        else {
            this._skinLoaded(null);
            return Promise.resolve();
        }
    }
    _skinLoaded(tex) {
        this._graphics.source = tex;
        this.callLater(this.changeClips);
        this._setStateChanged();
        this._sizeChanged();
        this.event(Event.LOADED);
    }
    get stateNum() {
        return this._stateNum;
    }
    set stateNum(value) {
        if (typeof value == 'string') {
            value = parseInt(value);
        }
        if (this._stateNum != value) {
            this._stateNum = value < 1 ? 1 : value > 3 ? 3 : value;
            this._graphics.setState(this._state, this._stateNum);
            if (this._skin) {
                this.callLater(this.changeClips);
                this._setStateChanged();
            }
        }
    }
    changeClips() {
        let width = 0, height = 0;
        let img = Loader.getRes(this._skin);
        if (!img) {
            console.log(`lose skin ${this._skin}`);
            return;
        }
        width = img.sourceWidth;
        height = img.sourceHeight / (img._stateNum || this._stateNum);
        if (this._autoSize) {
            this._graphics.width = this._isWidthSet ? this._width : width;
            this._graphics.height = this._isHeightSet ? this._height : height;
            if (this._text) {
                this._text.width = this._graphics.width;
                this._text.height = this._graphics.height;
            }
        }
        else {
            if (this._text) {
                this._text.x = width;
                this._text.height = height;
            }
        }
    }
    measureWidth() {
        if (this._skin)
            this.runCallLater(this.changeClips);
        if (this._autoSize)
            return this._graphics.width;
        this.runCallLater(this.changeState);
        return this._graphics.width + (this._text ? this._text.width : 0);
    }
    measureHeight() {
        if (this._skin)
            this.runCallLater(this.changeClips);
        return this._text ? Math.max(this._graphics.height, this._text.height) : this._graphics.height;
    }
    get label() {
        return this._text ? this._text.text : null;
    }
    set label(value) {
        if (!this._text && !value)
            return;
        this.createText();
        if (this._text.text != value) {
            value && !this._text.parent && this.addChild(this._text);
            this._text.text = (value + "").replace(/\\n/g, "\n");
            this._setStateChanged();
        }
    }
    get selected() {
        return this._selected;
    }
    set selected(value) {
        if (this._selected != value) {
            this._selected = value;
            this.state = this._selected ? 2 : 0;
            this.event(Event.CHANGE);
        }
    }
    get state() {
        return this._state;
    }
    set state(value) {
        if (this._state != value) {
            this._state = value;
            this._setStateChanged();
        }
    }
    changeState() {
        this._stateChanged = false;
        if (this._skin)
            this.runCallLater(this.changeClips);
        let index = Math.max(this._state, 0);
        this._graphics.setState(index, this._stateNum);
        if (this.label) {
            this._text.color = this._labelColors[index];
            if (this._strokeColors)
                this._text.strokeColor = this._strokeColors[index];
        }
    }
    get labelColors() {
        return this._labelColors.join(",");
    }
    set labelColors(value) {
        this._labelColors = UIUtils.fillArray(Styles.buttonLabelColors, value, String);
        this._setStateChanged();
    }
    get strokeColors() {
        return this._strokeColors ? this._strokeColors.join(",") : "";
    }
    set strokeColors(value) {
        this._strokeColors = UIUtils.fillArray(Styles.buttonLabelColors, value, String);
        this._setStateChanged();
    }
    get labelPadding() {
        this.createText();
        return this._text.padding.join(",");
    }
    set labelPadding(value) {
        this.createText();
        this._text.padding = UIUtils.fillArray(Styles.labelPadding, value, Number);
    }
    get labelSize() {
        this.createText();
        return this._text.fontSize;
    }
    set labelSize(value) {
        this.createText();
        this._text.fontSize = value;
    }
    get labelStroke() {
        this.createText();
        return this._text.stroke;
    }
    set labelStroke(value) {
        this.createText();
        this._text.stroke = value;
    }
    get labelStrokeColor() {
        this.createText();
        return this._text.strokeColor;
    }
    set labelStrokeColor(value) {
        this.createText();
        this._text.strokeColor = value;
    }
    get labelBold() {
        this.createText();
        return this._text.bold;
    }
    set labelBold(value) {
        this.createText();
        this._text.bold = value;
    }
    get labelFont() {
        this.createText();
        return this._text.font;
    }
    set labelFont(value) {
        this.createText();
        this._text.font = value;
    }
    get labelAlign() {
        this.createText();
        return this._text.align;
    }
    set labelAlign(value) {
        this.createText();
        this._text.align = value;
    }
    get labelVAlign() {
        this.createText();
        return this._text.valign;
    }
    set labelVAlign(value) {
        this.createText();
        this._text.valign = value;
    }
    get clickHandler() {
        return this._clickHandler;
    }
    set clickHandler(value) {
        this._clickHandler = value;
    }
    get text() {
        this.createText();
        return this._text;
    }
    set text(value) {
        if (typeof (value) == "string") {
            this._text && (this._text.text = value);
        }
    }
    get sizeGrid() {
        if (this._graphics.sizeGrid)
            return this._graphics.sizeGrid.join(",");
        return null;
    }
    set sizeGrid(value) {
        if (value)
            this._graphics.sizeGrid = UIUtils.fillArray(Styles.defaultSizeGrid, value, Number);
        else
            this._graphics.sizeGrid = null;
    }
    _setWidth(value) {
        super._setWidth(value);
        if (this._autoSize) {
            this._graphics.width = value;
            this._text && (this._text.width = value);
        }
    }
    _setHeight(value) {
        super._setHeight(value);
        if (this._autoSize) {
            this._graphics.height = value;
            this._text && (this._text.height = value);
        }
    }
    set_dataSource(value) {
        if (typeof (value) == 'number' || typeof (value) == 'string') {
            this._dataSource = value;
            this.label = value + "";
        }
        else
            super.set_dataSource(value);
    }
    get iconOffset() {
        return this._graphics._offset ? this._graphics._offset.join(",") : null;
    }
    set iconOffset(value) {
        if (value)
            this._graphics._offset = UIUtils.fillArray([1, 1], value, Number);
        else
            this._graphics._offset = [];
    }
    _setStateChanged() {
        if (!this._stateChanged) {
            this._stateChanged = true;
            this.callLater(this.changeState);
        }
    }
}
const stateMap = { "mouseup": 0, "mouseover": 1, "mousedown": 2, "mouseout": 0 };

//# sourceMappingURL=Button.js.map
