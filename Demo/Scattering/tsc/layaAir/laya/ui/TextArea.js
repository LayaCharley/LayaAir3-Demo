import { TextInput } from "./TextInput";
import { VScrollBar } from "./VScrollBar";
import { HScrollBar } from "./HScrollBar";
import { ScrollType } from "./Styles";
import { Event } from "../events/Event";
import { HideFlags } from "../Const";
export class TextArea extends TextInput {
    constructor(text) {
        super(text);
        this._scrollType = 0;
    }
    _onPostLayout() {
        super._onPostLayout();
        this.callLater(this.changeScroll);
    }
    destroy(destroyChild = true) {
        this._vScrollBar && this._vScrollBar.destroy();
        this._hScrollBar && this._hScrollBar.destroy();
        this._vScrollBar = null;
        this._hScrollBar = null;
        super.destroy(destroyChild);
    }
    initialize() {
        this.width = 180;
        this.height = 150;
        this._tf.wordWrap = true;
        this.multiline = true;
    }
    _setWidth(value) {
        super._setWidth(value);
        this.callLater(this.changeScroll);
    }
    _setHeight(value) {
        super._setHeight(value);
        this.callLater(this.changeScroll);
    }
    get scrollType() {
        return this._scrollType;
    }
    set scrollType(value) {
        this._scrollType = value;
        if (this._scrollType == ScrollType.None) {
            if (this._hScrollBar) {
                this._hScrollBar.destroy();
                this._hScrollBar = null;
            }
            if (this._vScrollBar) {
                this._vScrollBar.destroy();
                this._vScrollBar = null;
            }
        }
        else if (this._scrollType == ScrollType.Horizontal) {
            if (this._vScrollBar) {
                this._vScrollBar.destroy();
                this._vScrollBar = null;
            }
            if (this._hScrollBar)
                this._hScrollBar.skin = this._hScrollBarSkin;
            else
                this.createHScrollBar();
        }
        else if (this._scrollType == ScrollType.Vertical) {
            if (this._hScrollBar) {
                this._hScrollBar.destroy();
                this._hScrollBar = null;
            }
            if (this._vScrollBar)
                this._vScrollBar.skin = this._vScrollBarSkin;
            else
                this.createVScrollBar();
        }
        else {
            if (this._hScrollBar)
                this._hScrollBar.skin = this._hScrollBarSkin;
            else
                this.createHScrollBar();
            if (this._vScrollBar)
                this._vScrollBar.skin = this._vScrollBarSkin;
            else
                this.createVScrollBar();
        }
    }
    createHScrollBar() {
        this._hScrollBar = new HScrollBar();
        this._hScrollBar.hideFlags = HideFlags.HideAndDontSave;
        this._hScrollBar._skinBaseUrl = this._skinBaseUrl;
        this._hScrollBar.skin = this._hScrollBarSkin;
        this.addChild(this._hScrollBar);
        this._hScrollBar.on(Event.CHANGE, this, this.onHBarChanged);
        this._hScrollBar.on(Event.LOADED, this, this.changeScroll);
        this._hScrollBar.mouseWheelEnable = false;
        this._hScrollBar.touchScrollEnable = false;
        this._hScrollBar.target = this._tf;
        this.callLater(this.changeScroll);
    }
    createVScrollBar() {
        this._vScrollBar = new VScrollBar();
        this._vScrollBar.hideFlags = HideFlags.HideAndDontSave;
        this._vScrollBar._skinBaseUrl = this._skinBaseUrl;
        this._vScrollBar.skin = this._vScrollBarSkin;
        this.addChild(this._vScrollBar);
        this._vScrollBar.on(Event.CHANGE, this, this.onVBarChanged);
        this._vScrollBar.on(Event.LOADED, this, this.changeScroll);
        this._vScrollBar.touchScrollEnable = false;
        this._vScrollBar.target = this._tf;
        this.callLater(this.changeScroll);
    }
    get vScrollBarSkin() {
        return this._vScrollBarSkin;
    }
    set vScrollBarSkin(value) {
        if (value == "")
            value = null;
        if (this._vScrollBarSkin != value) {
            this._vScrollBarSkin = value;
            if (this._scrollType == 0)
                this.scrollType = ScrollType.Vertical;
            else if (this._scrollType == ScrollType.Horizontal)
                this.scrollType = ScrollType.Both;
            else
                this.scrollType = this._scrollType;
        }
    }
    get hScrollBarSkin() {
        return this._hScrollBarSkin;
    }
    set hScrollBarSkin(value) {
        if (value == "")
            value = null;
        if (this._hScrollBarSkin != value) {
            this._hScrollBarSkin = value;
            if (this._scrollType == 0)
                this.scrollType = ScrollType.Horizontal;
            else if (this._scrollType == ScrollType.Vertical)
                this.scrollType = ScrollType.Both;
            this.scrollType = this._scrollType;
        }
    }
    onVBarChanged(e) {
        if (this._tf.scrollY != this._vScrollBar.value) {
            this._tf.scrollY = this._vScrollBar.value;
        }
    }
    onHBarChanged(e) {
        if (this._tf.scrollX != this._hScrollBar.value) {
            this._tf.scrollX = this._hScrollBar.value;
        }
    }
    get vScrollBar() {
        return this._vScrollBar;
    }
    get hScrollBar() {
        return this._hScrollBar;
    }
    get maxScrollY() {
        return this._tf.maxScrollY;
    }
    get scrollY() {
        return this._tf.scrollY;
    }
    get maxScrollX() {
        return this._tf.maxScrollX;
    }
    get scrollX() {
        return this._tf.scrollX;
    }
    changeScroll() {
        let vShow = this._vScrollBar && this._tf.maxScrollY > 0;
        let hShow = this._hScrollBar && this._tf.maxScrollX > 0;
        let padding = this._tf.padding;
        let showWidth = vShow ? this._width - this._vScrollBar.width - padding[2] : this._width;
        let showHeight = hShow ? this._height - this._hScrollBar.height - padding[3] : this._height;
        this._tf.size(showWidth, showHeight);
        if (this._vScrollBar) {
            this._vScrollBar.x = this._width - this._vScrollBar.width - padding[2];
            this._vScrollBar.y = padding[1];
            this._vScrollBar.height = this._height - (hShow ? this._hScrollBar.height : 0) - padding[1] - padding[3];
            this._vScrollBar.scrollSize = 1;
            this._vScrollBar.thumbPercent = showHeight / Math.max(this._tf.textHeight, showHeight);
            this._vScrollBar.setScroll(1, this._tf.maxScrollY, this._tf.scrollY);
            this._vScrollBar.visible = vShow;
        }
        if (this._hScrollBar) {
            this._hScrollBar.x = padding[0];
            this._hScrollBar.y = this._height - this._hScrollBar.height - padding[3];
            this._hScrollBar.width = this._width - (vShow ? this._vScrollBar.width : 0) - padding[0] - padding[2];
            this._hScrollBar.scrollSize = Math.max(showWidth * 0.033, 1);
            this._hScrollBar.thumbPercent = showWidth / Math.max(this._tf.textWidth, showWidth);
            this._hScrollBar.setScroll(0, this.maxScrollX, this.scrollX);
            this._hScrollBar.visible = hShow;
        }
    }
    scrollTo(y) {
        this.commitMeasure();
        this._tf.scrollY = y;
    }
}

//# sourceMappingURL=TextArea.js.map
