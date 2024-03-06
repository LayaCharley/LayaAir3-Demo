import { Event } from "../events/Event";
import { UIComponent } from "./UIComponent";
import { Image } from "./Image";
import { HideFlags } from "../Const";
import { URL } from "../net/URL";
import { Utils } from "../utils/Utils";
import { AssetDb } from "../resource/AssetDb";
export class ProgressBar extends UIComponent {
    constructor(skin = null) {
        super();
        this._value = 0.5;
        this.skin = skin;
    }
    destroy(destroyChild = true) {
        super.destroy(destroyChild);
        this._bg && this._bg.destroy(destroyChild);
        this._bar && this._bar.destroy(destroyChild);
        this._bg = this._bar = null;
        this.changeHandler = null;
    }
    createChildren() {
        this._bg = new Image();
        this._bg.left = 0;
        this._bg.right = 0;
        this._bg.top = 0;
        this._bg.bottom = 0;
        this._bg.hideFlags = HideFlags.HideAndDontSave;
        this.addChild(this._bg);
        this._bar = new Image();
        this._bar.hideFlags = HideFlags.HideAndDontSave;
        this._bar.top = 0;
        this._bar.bottom = 0;
        this.addChild(this._bar);
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
            return AssetDb.inst.resolveURL(url).then(url => {
                if (this._destroyed)
                    return null;
                if (this._skinBaseUrl)
                    url = URL.formatURL(url, this._skinBaseUrl);
                return Promise.all([
                    this._bg._setSkin(url),
                    this._bar._setSkin(Utils.replaceFileExtension(url, "$bar.png", true))
                ]).then(() => this._skinLoaded());
            });
        }
        else {
            this._bg.skin = null;
            this._bar.skin = null;
            this._skinLoaded();
            return Promise.resolve();
        }
    }
    _skinLoaded() {
        if (this._destroyed)
            return;
        this.callLater(this.changeValue);
        this._sizeChanged();
        this.event(Event.LOADED);
    }
    measureWidth() {
        return this._bg.width;
    }
    measureHeight() {
        return this._bg.height;
    }
    get value() {
        return this._value;
    }
    set value(num) {
        if (this._value != num) {
            num = num > 1 ? 1 : num < 0 ? 0 : num;
            this._value = num;
            this.callLater(this.changeValue);
            this.event(Event.CHANGE);
            this.changeHandler && this.changeHandler.runWith(num);
        }
    }
    changeValue() {
        if (this.sizeGrid) {
            let grid = this.sizeGrid.split(",");
            let left = parseInt(grid[3]);
            if (isNaN(left))
                left = 0;
            let right = parseInt(grid[1]);
            if (isNaN(right))
                right = 0;
            let max = this.width - left - right;
            let sw = max * this._value;
            this._bar.width = left + right + sw;
            this._bar.visible = this._bar.width > left + right;
        }
        else {
            this._bar.width = this.width * this._value;
        }
    }
    get bar() {
        return this._bar;
    }
    get bg() {
        return this._bg;
    }
    get sizeGrid() {
        return this._bg.sizeGrid;
    }
    set sizeGrid(value) {
        this._bg.sizeGrid = this._bar.sizeGrid = value;
    }
    set_width(value) {
        super.set_width(value);
        this.callLater(this.changeValue);
    }
    set_dataSource(value) {
        this._dataSource = value;
        if (typeof (value) == 'number' || typeof (value) == 'string')
            this.value = Number(value);
        else
            super.set_dataSource(value);
    }
}

//# sourceMappingURL=ProgressBar.js.map
